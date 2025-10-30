"use server";

export async function getPrs() {
  try {
    const username = "Sahil-Gupta584";
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

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
    const results = [];

    while (hasNextPage) {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { username, after: cursor },
        }),
      });

      const { data } = await res.json();
      const prData = data.user.pullRequests;

      const filtered = prData.nodes.filter(
        (pr: any) =>
          !["Sahil-Gupta584", "AdarshHatkar", "syncly-io", "Beyinc"].some((name) =>
            pr.repository.owner.login.includes(name)
          )
      );

      for (const pr of filtered) {
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

    return { ok: true, results };
  } catch (error) {
    console.error("Error fetching PRs:", error);
    return { ok: false };
  }
}
