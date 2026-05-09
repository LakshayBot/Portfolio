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

export async function getContributions(
  username: string
): Promise<ContributionData> {
  // In the Cloudflare Workers runtime, secrets are accessed via the
  // cloudflare:workers env import — not process.env. Fall back to
  // process.env so local `next dev` (Node.js) still works with .env.
  let token: string | undefined = process.env.GITHUB_TOKEN;

  if (!token) {
    try {
      // cloudflare:workers is a virtual module only available in the Workers
      // runtime. TypeScript doesn't know about it, hence the expect-error.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error: cloudflare:workers is not in TS lib but exists at runtime
      const { env } = await import("cloudflare:workers");
      token = (env as Record<string, string | undefined>).GITHUB_TOKEN;
    } catch {
      // Not running in the Workers runtime (e.g. local next dev). Ignore.
    }
  }

  if (!token) {
    throw new Error("GITHUB_TOKEN is not set");
  }

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
    // Use standard fetch cache — next: { revalidate } is a Next.js Node.js
    // extension that is not available in the Cloudflare Workers runtime.
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
  if (count <= 2)  return "var(--color-md-primary-fixed-dim)";
  if (count <= 5)  return "var(--color-md-primary-fixed)";
  if (count <= 10) return "var(--color-md-primary)";
  return "var(--color-md-primary-dim)";
}
