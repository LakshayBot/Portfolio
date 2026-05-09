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
  // process.env works locally and for build-time variables.
  // On Cloudflare Pages at runtime, secrets set in the dashboard are only
  // available through the Cloudflare Workers env binding — so we fall back
  // to getCloudflareContext() when process.env doesn't have the token.
  let token = process.env.GITHUB_TOKEN;

  if (!token) {
    try {
      const { getCloudflareContext } = await import("@opennextjs/cloudflare");
      const ctx = await getCloudflareContext({ async: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      token = (ctx.env as any).GITHUB_TOKEN as string | undefined;
    } catch {
      // getCloudflareContext is unavailable outside the Cloudflare runtime —
      // ignore and let the check below throw a clear error.
    }
  }

  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
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
    // Revalidate every 6 hours
    next: { revalidate: 21600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
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
