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
  // process.env works in both environments:
  //   - Local next dev: reads from .env file via Next.js
  //   - Cloudflare Workers runtime: reads secrets/vars set in the dashboard
  // The cloudflare:workers virtual module approach cannot be used because
  // esbuild (run by opennextjs-cloudflare build) cannot resolve it at
  // bundle time and there is no way to mark it external from userland config.
  const token = process.env.GITHUB_TOKEN;

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
  if (count <= 2)  return "var(--color-md-primary-fixed-dim)";
  if (count <= 5)  return "var(--color-md-primary-fixed)";
  if (count <= 10) return "var(--color-md-primary)";
  return "var(--color-md-primary-dim)";
}
