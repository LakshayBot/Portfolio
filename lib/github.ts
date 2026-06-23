import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const GITHUB_CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

type GithubTokenEnv = {
  GITHUB_TOKEN?: string;
  github_token?: string;
};

function readGithubToken(env: Record<string, string | undefined>): string | undefined {
  return env.GITHUB_TOKEN ?? env.github_token;
}

async function getGithubToken(): Promise<string | undefined> {
  const processToken = readGithubToken(process.env);

  try {
    const { env } = await getCloudflareContext({ async: true });
    const cloudflareToken = readGithubToken(env as GithubTokenEnv);

    if (cloudflareToken) {
      return cloudflareToken;
    }
  } catch (err) {
    if (!processToken) {
      console.warn("Cloudflare env bindings were unavailable:", err);
    }
  }

  if (processToken) {
    return processToken;
  }

  return undefined;
}

export async function getContributions(
  username: string
): Promise<ContributionData> {
  const token = await getGithubToken();

  if (!token) {
    return getPublicContributions(username);
  }

  try {
    return await getGraphqlContributions(username, token);
  } catch (err) {
    console.warn("GitHub GraphQL fetch failed, using public calendar:", err);
    return getPublicContributions(username);
  }
}

async function getGraphqlContributions(
  username: string,
  token: string
): Promise<ContributionData> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "lakshay-portfolio",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GITHUB_CONTRIBUTIONS_QUERY,
      variables: { username },
    }),
    // cache: no-store — next: { revalidate } is a Next.js Node.js extension
    // unavailable in the Cloudflare Workers runtime. For edge caching,
    // configure a Cache-Control rule in the Cloudflare dashboard instead.
    cache: "no-store",
  });

  // Log rate-limit info for monitoring
  const rateLimit = response.headers.get("X-RateLimit-Remaining");
  if (rateLimit && Number(rateLimit) < 100) {
    console.warn(
      `GitHub API rate limit low: ${rateLimit} remaining. ` +
      `Resets at ${response.headers.get("X-RateLimit-Reset")}`
    );
  }

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`GitHub GraphQL error: ${json.errors[0].message}`);
  }

  return json.data.user.contributionsCollection
    .contributionCalendar as ContributionData;
}

async function getPublicContributions(username: string): Promise<ContributionData> {
  const currentYear = new Date().getUTCFullYear();
  const years = [currentYear - 1, currentYear];
  const days = new Map<string, number>();

  await Promise.all(
    years.map(async (year) => {
      const response = await fetch(
        `https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`,
        {
          headers: {
            "User-Agent": "lakshay-portfolio",
            Accept: "text/html",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          `GitHub public calendar error: ${response.status} ${response.statusText}`
        );
      }

      parseContributionHtml(await response.text()).forEach((count, date) => {
        days.set(date, count);
      });
    })
  );

  return buildRecentContributionData(days);
}

function parseContributionHtml(html: string): Map<string, number> {
  const days = new Map<string, number>();
  const cellPattern =
    /<td\b(?=[^>]*\bContributionCalendar-day\b)([^>]*)><\/td>\s*<tool-tip\b[^>]*>([\s\S]*?)<\/tool-tip>/g;

  for (const match of html.matchAll(cellPattern)) {
    const date = readHtmlAttribute(match[1], "data-date");

    if (!date) {
      continue;
    }

    days.set(date, readContributionCount(match[2]));
  }

  // Validate: a full year of data should have ~365 days. If we found fewer
  // than 10 days, the HTML structure likely changed and parsing failed silently.
  if (days.size < 10) {
    console.warn(
      `GitHub public calendar parse: only ${days.size} days found. ` +
      "The GitHub HTML structure may have changed — the heatmap may appear empty."
    );
  }

  return days;
}

function readHtmlAttribute(attributes: string, name: string): string | undefined {
  const match = attributes.match(new RegExp(`${name}="([^"]+)"`));
  return match?.[1];
}

function readContributionCount(label: string): number {
  if (label.startsWith("No contributions")) {
    return 0;
  }

  return Number(label.match(/(\d+) contribution/)?.[1] ?? 0);
}

function buildRecentContributionData(days: Map<string, number>): ContributionData {
  const today = startOfUtcDay(new Date());
  const currentWeekStart = addUtcDays(today, -today.getUTCDay());
  const firstWeekStart = addUtcDays(currentWeekStart, -25 * 7);
  const weeks: ContributionWeek[] = [];
  let totalContributions = 0;

  for (let weekIndex = 0; weekIndex < 26; weekIndex += 1) {
    const contributionDays: ContributionDay[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const date = addUtcDays(firstWeekStart, weekIndex * 7 + dayIndex);
      const dateKey = formatUtcDate(date);
      const contributionCount = date > today ? 0 : days.get(dateKey) ?? 0;

      totalContributions += contributionCount;
      contributionDays.push({ contributionCount, date: dateKey });
    }

    weeks.push({ contributionDays });
  }

  return { totalContributions, weeks };
}

function startOfUtcDay(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

function addUtcDays(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate;
}

function formatUtcDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Map a contribution count to one of the 5 intensity levels used by the heatmap.
 * Returns a CSS variable name matching the Material Design green token scale.
 */
export function getContributionColor(count: number): string {
  if (count === 0) return "var(--color-md-surface-container)";
  if (count <= 2) return "var(--color-md-primary-fixed-dim)";
  if (count <= 5) return "var(--color-md-primary-fixed)";
  if (count <= 10) return "var(--color-md-primary)";
  return "var(--color-md-primary-dim)";
}
