# Configuring the reports (uploads)

This page shows some common set up for configuring what is [uploaded to Siteimprove Intelligence Platform](./basic.md#uploading-results-to-the-siteimprove-intelligence-platform) and how the results are shown in the Page Report. All options described here can be combined together in the same call.

## Including a test name

The `SIP.upload` function accepts a test name. This will be displayed in the header of the page report and can be used to separate tests:

```typescript
const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME!,
    apiKey: process.env.SI_API_KEY!,
    testName: "WCAG 2.2 Level AA conformance test",
  });
});
```

If not provided, the test name will default to "Accessibility Code Checker".

## Including a page title

Similarly, a page title can be provided and displayed in the Page Report. If none is provided, it will default to the first `<title>` element of the audited page (if any) or to "Unnamed page". It can be convenient to override it typically when testing "single component" pages of design systems.

```typescript
const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.componentFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME!,
    apiKey: process.env.SI_API_KEY!,
    pageTitle: "Paginated table component",
  });
});
```

## Including the site ID

If you are testing a page that belongs to a specific site in the Siteimprove Intelligence Platform, you can provide the site ID. This will help produce better metadata and aggregates.

```typescript
const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME!,
    apiKey: process.env.SI_API_KEY!,
    siteId: "123456",
  });
});
```

## Including commit information

Siteimprove recommends that you include some basic information about the latest commit together with the upload, at least the branch name. This opens possibilities of grouping and reporting based on it, e.g. to follow the number of issues in a given branch.

```typescript
const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME!,
    apiKey: process.env.SI_API_KEY!,
    commitInformation: {
      BranchName: "main",
      CommitHash: "a1b2c3d4",
    },
  });
});
```

See [the `CommitInforation` API](https://github.com/Siteimprove/alfa-integrations/blob/main/docs/api/alfa-test-utils.commitinformation.md) for all the allowed properties, only `BranchName` is mandatory.

If running from a `git` repository (in a NodeJS environment), this commit information can be extracted automatically:

```typescript
import { getCommitInformation } from "@siteimprove/alfa-test-utils/git.js";

const gitInformation = await getCommitInformation();

const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME!,
    apiKey: process.env.SI_API_KEY!,
    commitInformation: gitInformation,
  });
});
```
