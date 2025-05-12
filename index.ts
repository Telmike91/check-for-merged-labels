import { CheckLabelRequest } from "./request";
import { getOctokit } from "@actions/github";

export default function CheckLabel(request: CheckLabelRequest): Promise<any> {
  const octokit = getOctokit(process.env.GITHUB_TOKEN || request.apiKey, {
    baseUrl: process.env.GITHUB_URL,
  });

  return octokit
    .request("GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", {
      repo: "check-for-merged-labels",
      owner: "Telmike91",
      commit_sha: request.commitSha,
    })
    .then((response: any) =>
      response.data.filter(
        (data: any) => data.state == "closed" && data.base.ref == "master"
      )
    )
    .then((data: Array<any>) =>
      data.sort((a: any, b: any) => b.number - a.number)
    )
    .then((data: Array<any>) => data[0])
    .then((data: any) => data.labels.filter((label: any) => label.name == request.checkedLabel));
}
