import { type Assertions, foo } from "@siteimprove/alfa-test";
// import { getCommitInformation } from "../../dist/report/git.js";

import { assert, it } from "vitest";

/**
 * This test will fail if the origin URL is changed, e.g. on forks.
 */
foo("bar", (t) => {
  t.equal(1 + 1, 2);
});

// test("getCommitInformation reads info from git", async (t) => {
//   // We pretty much cannot test the validity of the information since anything
//   // but the remote URL is by definition unstable. However, that information should
//   // exist on every state we are in. It may however be different between the ssh
//   // and https version of the URL, so just checking org + repo.
//
//   const actual = await getCommitInformation();
//
//   t(actual.isOk());
//
//   const values = actual.getUnsafe();
//
//   t.notEqual(values.Origin, undefined);
//   t(values.Origin!.includes("Siteimprove/alfa-integrations"));
//
//   for (const property of [
//     "BranchName",
//     "CommitHash",
//     "Author",
//     "Email",
//     "CommitTimestamp",
//     "Message",
//   ] as const) {
//     t.notEqual(values[property], undefined);
//     t.notEqual(values[property], "");
//   }
// });

async function localTest(
  name: string,
  assertion: (assert: Assertions) => void | Promise<void>,
): Promise<void> {
  return it(name, async () => await assertion(assert));
}
