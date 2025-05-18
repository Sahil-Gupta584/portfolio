'use server';

export async function getPrs() {
  try {
    const username = "Sahil-Gupta584";
    const token = process.env.GITHUB_TOKEN;
    console.log("token", token);

    const res = await fetch(
      `https://api.github.com/search/issues?q=is:pr+author:${username}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(token && { Authorization: `token ${token}` }),
        },
      }
    );
    const data = await res.json();

    const filtered = data.items.filter(
      (pr: { repository_url: string | string[] }) =>
        !pr.repository_url.includes("Sahil-Gupta584") &&
        !pr.repository_url.includes("AdarshHatkar")
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
      console.log('Failed to get prs at:',Date.now());
    console.log("error in getPrs", error);
    return { ok: false };
  }
}
