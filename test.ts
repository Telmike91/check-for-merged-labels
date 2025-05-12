import CheckLabel from "./index.js";
import { CheckLabelRequest } from "./request";
import * as fs from "fs";

const apiKey = fs.readFileSync("apiKey", "utf8");
const commit_sha = process.argv[2];

const request: CheckLabelRequest = {
  commitSha: commit_sha,
  apiKey: apiKey,
  checkedLabel: "question"
};

CheckLabel(request).then((it) => console.log(it.length > 0));
