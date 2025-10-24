import { Err, Ok } from "@siteimprove/alfa-result";
import type { Result } from "@siteimprove/alfa-result";
import { simpleGit } from "simple-git";

import type { CommitInformation } from "./commit-information.js";

const git = simpleGit();

/** @internal */
export async function getCommitInformation(): Promise<
  Result<CommitInformation, string>
> {
  try {
    const origin = await git
      .getRemotes(true)
      .then((remotes) => remotes.find((remote) => remote.name === "origin"));
    const branch = await git.branchLocal();
    const latest = await git.log({ "--max-count": 1 });

    const value: CommitInformation = {
      Origin: origin?.refs?.fetch,
      BranchName: branch.current,
      CommitHash: latest?.latest?.hash,
      Author: latest?.latest?.author_name,
      Email: latest?.latest?.author_email,
      CommitTimestamp: latest?.latest?.date,
      Message: latest?.latest?.message,
    };
    return Ok.of(value);
  } catch (err) {
    return Err.of(
      err instanceof Error
        ? err.message
        : `Error, could not retrieve git information: ${String(
            err
          )}. Check your Git configuration and try again. If the issue persists, contact support.`
    );
  }
}
