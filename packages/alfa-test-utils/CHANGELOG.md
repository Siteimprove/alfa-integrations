# @siteimprove/alfa-test-utils

## 0.76.1

### Patch Changes

- **Added:** The current version number is now exported. ([#115](https://github.com/Siteimprove/alfa-integrations/pull/115))

## 0.76.0

### Minor Changes

- **Added:** `SIP.upload` now also accepts the commit information as an `Option` or `Result`. ([#114](https://github.com/Siteimprove/alfa-integrations/pull/114))

  This makes it easier to integrate with the `getCommitInformation` which provides it as a `Result`.

## 0.75.0

### Minor Changes

- **Breaking:** `SIP.upload` now requires a `siteID` parameter. ([#106](https://github.com/Siteimprove/alfa-integrations/pull/106))

  This should be the site ID of your site in the Siteimprove Intelligence Platform. It is used to group tests by site and generate more accurate metadata and aggregates.

- **Breaking:** `CommitInformation` is now optional and some of its properties have been rennamed; see the package's changelog for explanations and migration advice. ([#107](https://github.com/Siteimprove/alfa-integrations/pull/107))

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
      ````

  3.  If you were not previously relying on the commit information but wish to keep uploading it, use:

      ````typescript
      import { getCommitInformation } from "@siteimprove/alfa-test-utils/git.js";

      const gitInformation = await getCommitInformation();

      SIP.upload({
        ... // other options
         commitInformation: gitInformation,
      })
      ```
      ````

  Siteimprove recommends that you provide some basic commit information as it opens possibilities for filtering of the results and better reporting in the Siteimprove Intelligence Platform. As of November 2024, we are currently not relying on this information in any place, but it is likely that we will provide features using it in the future; therefore it might be easier to start providing it immediately instead of revisiting the codebase later.

- **Added:** A `Rules.ARIAFilter` and `Rules.bestPracticesFilter` are now available. ([#105](https://github.com/Siteimprove/alfa-integrations/pull/105))

### Patch Changes

- **Changed:** Update Alfa ([#111](https://github.com/Siteimprove/alfa-integrations/pull/111))

- **Changed:** Update Alfa to ^0.96.0 ([#113](https://github.com/Siteimprove/alfa-integrations/pull/113))

## 0.74.3

### Patch Changes

- **Changed:** Update Alfa ([#104](https://github.com/Siteimprove/alfa-integrations/pull/104))

## 0.74.2

### Patch Changes

- **Changed:** Update Alfa ([#100](https://github.com/Siteimprove/alfa-integrations/pull/100))

## 0.74.1

### Patch Changes

- **Changed:** Update Alfa ([#99](https://github.com/Siteimprove/alfa-integrations/pull/99))

## 0.74.0

### Minor Changes

- **Added:** `SIP.upload` can now be called without an user email or API key, in which case it will return an `Err`. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

  That can nonetheless be passed to `Logging.fromAudit` which will then simply discard it. This makes it simpler to write tests without checking proactively the presence of the credentials and, e.g., run them both in environments where they are available and environments where they don't exist.

- **Breaking:** `Logging.prepare` and `Logging.result` have been replaced by `Logging.fromAudit` and `Logging#print`. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

  Migration: replace the `Logging.result(Logging.prepare(audit), pageReportUrl)` calls with `Logging.fromAudit(audit, pageReportUrl).print()`.

- **Breaking:** The `Audit.Result` type has been renamed to `Audit`. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

  Migration: simply use `Audit` type wherever the `Audit.Result` type was used.

### Patch Changes

- **Changed:** Update Alfa ([#98](https://github.com/Siteimprove/alfa-integrations/pull/98))

- **Added:** An `Audit#toJSON` serialisation is now available. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

- **Added:** `Logging.fromAudit` also accepts an `Audit.JSON` input. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

- **Added:** The audit and report functionalities can now be imported separately. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

  This resolves a problem where logging functionalities, highly depending on node, would crash bundlers and injections into other Javascript worlds when trying to import the full `@siteimprove/alfa-test-utils` package.

## 0.73.4

### Patch Changes

- **Changed:** Update Alfa ([#95](https://github.com/Siteimprove/alfa-integrations/pull/95))

## 0.73.3

### Patch Changes

- **Changed:** Update Alfa ([#94](https://github.com/Siteimprove/alfa-integrations/pull/94))

## 0.73.2

### Patch Changes

- **Changed:** Update Alfa and yarn ([#87](https://github.com/Siteimprove/alfa-integrations/pull/87))

## 0.73.1

### Patch Changes

- **Changed:** Content inside `<iframe>` is not checked anymore by default. ([#81](https://github.com/Siteimprove/alfa-integrations/pull/81))

  This is often third party content, or separate pages that can be checked individually, hence it often makes less sense to re-check it as part of the full page.

  If you want to include `<ifrme>` content in the reports, pass the `{ outcomes: { includeIframe: true } }` to `Audit.run`. Content of `<iframe>` will nonetheless not be displayed in the Siteimprove Intelligence Platform Page Report, even if the uploaded result contains it.

## 0.73.0

### Minor Changes

- **Changed:** Reverting publication process. Use this version. ([`0d018f8`](https://github.com/Siteimprove/alfa-integrations/commit/0d018f84d1fe0f714f397de88c4bd3e6434cba57))

## 0.72.2

## 0.72.1

## 0.72.0

### Minor Changes

- **Changed:** Dummy minor version to experiment with publish flow, use the previous or next minor version instead. ([`4daf29d`](https://github.com/Siteimprove/alfa-integrations/commit/4daf29d55745310b6ac845f963b306a4f0e57b08))

## 0.71.2

### Patch Changes

- **Changed:** Update Alfa to ^0.92.0 ([#78](https://github.com/Siteimprove/alfa-integrations/pull/78))

## 0.71.1

## 0.71.0

## 0.70.1

### Patch Changes

- **Changed:** Update Alfa ([#75](https://github.com/Siteimprove/alfa-integrations/pull/75))

## 0.70.0

### Minor Changes

- **Changed:** Update Alfa ([#68](https://github.com/Siteimprove/alfa-integrations/pull/68))

## 0.69.1

### Patch Changes

- **Added:** Documentation for the `@siteimprove/alfa-test-utils` package. ([#66](https://github.com/Siteimprove/alfa-integrations/pull/66))

- **Added:** Add utilities for pretty-printing console output ([#64](https://github.com/Siteimprove/alfa-integrations/pull/64))

## 0.69.0

### Minor Changes

- **Added:** New package for handling test utilities and interactions with the Siteimprove Intelligence Platform. ([#59](https://github.com/Siteimprove/alfa-integrations/pull/59))

  A new package is now available, intended to wrap several test utilities. It currently contains:

  - a wrapper to upload audit results to the Siteimprove Intelligence Platform and see them in the Page Report;
  - a helper to run an audit, selecting rules to use and outcomes to keep;
  - a collection of filters to select the rules to run in the audit;
  - a collection of filters to select the outcomes to keep in the audit.
