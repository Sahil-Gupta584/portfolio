"use server";

export async function getPrs() {
  try {
    const username = "Sahil-Gupta584";
    const token = process.env.GITHUB_TOKEN;

    const allItems = [];
    let page = 1;
    let hasMore = true;
    console.log('NEXT_PUBLIC_GITHUB_TOKEN', process.env.NEXT_PUBLIC_GITHUB_TOKEN)
    while (hasMore) {
      const res = await fetch(
        `https://api.github.com/search/issues?q=is:pr+author:${username}&per_page=100&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            ...(token && { Authorization: `token ${token}` }),
          },
        }
      );

      const data = await res.json();
      console.log({ data });

      if (!data.items || data.items.length === 0) {
        hasMore = false;
      } else {
        allItems.push(...data.items);
        page++;
      }
    }

    const filtered = allItems.filter(
      (pr: { repository_url: string | string[] }) =>
        !pr.repository_url.includes("Sahil-Gupta584") &&
        !pr.repository_url.includes("AdarshHatkar") &&
        !pr.repository_url.includes("Beyinc")
    );

    const results = [];

    for (const pr of filtered) {
      const prRes = await fetch(pr.pull_request.url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(token && { Authorization: `token ${token}` }),
        },
      });
      const prDetails = await prRes.json();

      const isOpen = pr.state === "open";
      const isMerged = !!prDetails.merged_at;

      if (isOpen || isMerged) {
        results.push({
          title: pr.title,
          html_url: pr.html_url,
          status: isOpen ? "Open" : "Merged",
          avatar_url: prDetails.base.user.avatar_url,
          repo_owner: prDetails.base.repo.owner.login,
        });
      }
    }
    return { ok: true, results };
  } catch (error) {
    console.log("Failed to get prs at:", Date.now());
    console.log("error in getPrs", error);
    return { ok: false };
  }
}
