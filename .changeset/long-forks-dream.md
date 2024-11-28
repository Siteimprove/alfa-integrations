---
"@siteimprove/alfa-test-utils": minor
---

**Breaking:** `CommitInformation` is now optional and some of its properties have been rennamed; see the package's changelog for explanations and migration advice.

Previously, `SIP.upload` was automatically collecting some information about the latest `git` commit and sending it to the Siteimprove Intelligence Platform, unless opted out via the `includeGitInfo: false` option. This presented two main drawbacks:

1. (minor) This was heavily reliant on the directory being part of a `git` repository. For codebases that use a different version control system, not only this was useless, but no alternative was provided.
2. (major) This was heavily reliant on the Accessibility Code Checker running from a NodeJS environment, where access to the underlying filesystem and `git` was doable. Not only this prevented the Accessibility Code Checker to run seamlessly from other environments such as browser extensions or Cypress; but the mere fact of trying to bundle `SIP.upload` for such environments (e.g. with Webpack) was causing the build to fail.

As a consequence, this release reverts a bit the approach on that information. The commit information is still valuable and can be used to name or group tests in an organised way (e.g., to follow the number of issues in a feature branch), but it now has to be provided by the caller. A `git` helper is still provided since it is by far the most used version control system.

Concretely, the following changes have been made:

1. The `CommitInformation.GitOrigin` field has been renamed `CommitInformation.Origin`.
2. `SIP.upload` now accepts a `commitInformation` option, of type `CommitInformation`; this in an object that must at least contain a `BranchName` field with a string value. (note the starting uppercase in `BranchName`).
3. If no `commitInformation` is provided, but the `testName` is a function, it will resolve to the default "Unnamed" test.
4. The `includeGitInfo` options of `SIP.upload` has been removed; if a `CommitInformation` has been provided, it will automatically be uploaded.

In order to migrate from previous versions:

1.  If you were using `includeGitInfo: false` to opt-out of it, simply remove the option as it is now an opt-in information.
2.  If you were using a `testName` function; you need to provide the commit information to the call. For this, use:

    ````typescript
    import { getCommitInformation } from "@siteimprove/alfa-test-utils/git.js";

    const gitInformation = await getCommitInformation();

    SIP.upload({
      ... // other options
       commitInformation: gitInformation,
       testName: (commitInfo) => ... // same function as previously
    })
    ```
3. If you were not previously relying on the commit information but wish to keep uploading it, use:
    ````typescript
    import { getCommitInformation } from "@siteimprove/alfa-test-utils/git.js";

    const gitInformation = await getCommitInformation();

    SIP.upload({
      ... // other options
       commitInformation: gitInformation,
    })
    ```
   
Siteimprove recommends that you provide some basic commit information as it opens possibilities for filtering of the results and better reporting in the Siteimprove Intelligence Platform. As of November 2024, we are currently not relying on this information in any place, but it is likely that we will provide features using it in the future; therefore it might be easier to start providing it immediately instead of revisiting the codebase later.
