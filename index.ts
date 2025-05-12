import { Octokit } from "octokit";
import * as fs from "fs"

export default function CheckLabel(apiKey: string): Promise<string> {        
    const commit_sha = "12d52e596a859ecd09d5db8bbdafab00c9a269c4"
    const octokit = new Octokit(
        {
            auth: apiKey,
            baseUrl: "https://api.github.com"
        }
    )

    return octokit.request("GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", {
            repo: "check-for-merged-labels",
            owner: "Telmike91",
            commit_sha: commit_sha
        }
    )    
}

const apiKey = fs.readFileSync("apiKey", "utf8")

CheckLabel(apiKey)
    .then(it => console.log(it))