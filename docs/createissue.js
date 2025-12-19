import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function createIssue() {
  const response = await octokit.issues.create({
    owner: "OWNER_NAME",
    repo: "REPO_NAME",
    title: "Bug: Something is broken",
    body: "### Description\nThis issue was created using Octokit.",
    labels: ["bug", "automation"],
    assignees: ["github-username"],
  });

  console.log("Issue created:", response.data.html_url);
}

createIssue().catch(console.error);
