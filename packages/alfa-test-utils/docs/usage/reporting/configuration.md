# Configuring the reports (uploads)

This page shows some common set up for configuring what is [uploaded to Siteimprove Intelligence Platform](./basic.md#uploading-results-to-the-siteimprove-intelligence-platform) and how the results are shown in the Page Report. All options described here can be combined in the same call.

## Mandatory options

The `SIP.upload` function requires an `userName`, `apiKey` and `siteID` parameters. If they any of them is missing, the upload will fail and the function will return an `Err` object with a text message listing the missing value.

While the `siteID` associates the run to a regular site inside the Siteimprove Intelligence Platform, the results of the Accessibility Code Checker and regular crawls do not impact each other and are kept separate (e.g., the DCI score of the live site is **not impacted** by any Accessibility Code Checker run).

## Including commit information

Siteimprove recommends that you include some basic information about the latest commit together with the upload, at least the branch name. This opens possibilities of grouping and reporting based on it, e.g. to follow the number of issues in a given branch.

```typescript
const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME, // email address of the user.
    apiKey: process.env.SI_API_KEY, // API key generated in the platform.
    siteID: "123456", // Site ID from the Siteimprove Intelligence Platform.
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

const gitInformation = await getCommitInformation().getOr(undefined);

const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME, // email address of the user.
    apiKey: process.env.SI_API_KEY, // API key generated in the platform.
    siteID: "123456", // Site ID from the Siteimprove Intelligence Platform.
    commitInformation: gitInformation,
  });
});
```

## Including a page title

Similarly, a page title can be provided and will be used to group runs of the Accessibility Code Checker in the dashboards. If none is provided, it will default to the first `<title>` element of the audited page (if any) or to "Unnamed page". It can be convenient to override it typically when testing "single component" pages of design systems.

```typescript
const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.componentFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME, // email address of the user.
    apiKey: process.env.SI_API_KEY, // API key generated in the platform.
    siteID: "123456", // Site ID from the Siteimprove Intelligence Platform.
    pageTitle: "Paginated table component",
  });
});
```

## Including a page URL

The URL at which the tested pages live may often be a `localhost` URL or similar temporary development server. By providing a `pageURL` matching the one of the actual page (once it will be published), Siteimprove can connect the test run to the actual page (for example to automatically determine page groups, …)

As for `siteID`, regular crawls and Accessibility Code Checker runs do not impact each other.

```typescript
// testing a page on a local server at `http://localhost:8080/about-us.html` from the `contact` repository.

const pageReportURL = Audit.run(alfaPage).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME, // email address of the user.
    apiKey: process.env.SI_API_KEY, // API key generated in the platform.
    siteID: "123456", // Site ID from the Siteimprove Intelligence Platform.
    pageURL: "http://example.com/contact/about-us.html",
  });
});
```

## Including a test name

The `SIP.upload` function accepts a test name. This will be displayed in the header of the page report and can be used to separate tests:

```typescript
const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME, // email address of the user.
    apiKey: process.env.SI_API_KEY, // API key generated in the platform.
    siteID: "123456", // Site ID from the Siteimprove Intelligence Platform.
    testName: "WCAG 2.2 Level AA conformance test",
  });
});
```

If not provided, the test name will default to "Accessibility Code Checker".
