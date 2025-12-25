"use server";

import { redis } from "@/lib/redis";

const CACHE_KEY = "github_prs";
const CACHE_TTL = 60 * 60 * 24; // 24 hours

export type Tpr = {
  title: string;
  html_url: string;
  status: string;
  avatar_url: string;
  repo_owner: string;
};

export async function getPrs(forceRefresh: boolean = false) {
  try {
    // 1. Try to get from Redis first (unless forceRefresh is true)
    if (!forceRefresh) {
      const cachedData = await redis.get<Tpr[]>(CACHE_KEY);
      if (cachedData) {
        console.log("Serving PRs from Redis cache");
        return { ok: true, results: cachedData };
      }
    }

    // 2. If not in cache or forceRefresh is true, fetch from GitHub
    console.log(forceRefresh ? "Forced refresh, fetching from GitHub API" : "Cache miss, fetching from GitHub API");
    const username = "Sahil-Gupta584";
    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    if (!token) throw new Error("GitHub token missing");

    const query = `
      query($username: String!, $after: String) {
        user(login: $username) {
          pullRequests(first: 100, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              title
              url
              state
              merged
              repository {
                name
                owner {
                  login
                  avatarUrl
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `;

    let hasNextPage = true;
    let cursor = null;
    const results: Tpr[] = [];

    while (hasNextPage) {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { username, after: cursor },
        }),
        cache: 'no-store'
      });

      const json = (await response.json()) as {
        data: {
          user: {
            pullRequests: {
              nodes: Array<{
                title: string;
                url: string;
                state: string;
                merged: boolean;
                repository: {
                  name: string;
                  owner: {
                    login: string;
                    avatarUrl: string;
                  };
                };
              }>;
              pageInfo: {
                hasNextPage: boolean;
                endCursor: string | null;
              };
            };
          };
        };
      };
      const data = json.data;

      if (!data?.user?.pullRequests) {
        break;
      }

      const prData = data.user.pullRequests;

      const filtered = prData.nodes.filter(
        (pr) =>
          pr && pr.repository &&
          !["Sahil-Gupta584", "AdarshHatkar", "syncly-io", "Beyinc"].some((name) =>
            pr.repository.owner.login.includes(name)
          )
      );

      for (const pr of filtered) {
        if (!pr || !pr.repository) continue;
        results.push({
          title: pr.title,
          html_url: pr.url,
          status:
            pr.state === "OPEN"
              ? "Open"
              : pr.merged
                ? "Merged"
                : "Closed",
          avatar_url: pr.repository.owner.avatarUrl,
          repo_owner: pr.repository.owner.login,
        });
      }

      hasNextPage = prData.pageInfo.hasNextPage;
      cursor = prData.pageInfo.endCursor;
    }

    // 3. Save to Redis
    if (results.length > 0) {
      await redis.set(CACHE_KEY, results, { ex: CACHE_TTL });
      console.log(`Saved ${results.length} PRs to Redis`);
    }

    return { ok: true, results };
  } catch (error) {
    console.error("Error fetching PRs:", error);
    return { ok: false };
  }
}
