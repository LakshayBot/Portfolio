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

async function getGithubToken(): Promise<string> {
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

  throw new Error(
    "GitHub token is not set. Add GITHUB_TOKEN or github_token as a Cloudflare secret."
  );
}

export async function getContributions(
  username: string
): Promise<ContributionData> {
  const token = await getGithubToken();

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GITHUB_CONTRIBUTIONS_QUERY,
      variables: { username },
    }),
    // cache: no-store — next: { revalidate } is a Next.js Node.js extension
    // unavailable in the Cloudflare Workers runtime.
    cache: "no-store",
  });

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
