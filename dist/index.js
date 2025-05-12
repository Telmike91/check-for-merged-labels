import { getOctokit } from "@actions/github";
export default function CheckLabel(request) {
    const octokit = getOctokit(process.env.GITHUB_TOKEN || request.apiKey, {
        baseUrl: process.env.GITHUB_URL,
    });
    return octokit
        .request("GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", {
        repo: "check-for-merged-labels",
        owner: "Telmike91",
        commit_sha: request.commitSha,
    })
        .then((response) => response.data.filter((data) => data.state == "closed" && data.base.ref == "master"))
        .then((data) => data.sort((a, b) => b.number - a.number))
        .then((data) => data[0])
        .then((data) => data.labels.filter((label) => label.name == request.checkedLabel));
}
