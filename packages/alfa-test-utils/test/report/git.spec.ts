import { test } from "@siteimprove/alfa-test";
import { getCommitInformation } from "../../dist/report/git.js";

/**
 * This test will fail if the origin URL is changed, e.g. on forks.
 */
test("getCommitInformation reads info from git", async (t) => {
  // We pretty much cannot test the validity of the information since anything
  // but the remote URL is by definition unstable. However, that information should
  // exist on every state we are in.

  const actual = await getCommitInformation();

  t(actual.isOk());

  const values = actual.getUnsafe();

  t.equal(values.GitOrigin, "git@github.com:Siteimprove/alfa-integrations.git");

  for (const property of [
    "Branch",
    "CommitHash",
    "Author",
    "Email",
    "CommitTimestamp",
    "Message",
  ] as const) {
    t.notEqual(values[property], undefined);
    t.notEqual(values[property], "");
  }
});
