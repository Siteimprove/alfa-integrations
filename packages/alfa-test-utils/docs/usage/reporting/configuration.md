# Configuring the reports (uploads)

This page shows some common set up for configuring what is [uploaded to Siteimprove Intelligence Platform](./basic.md#uploading-results-to-the-siteimprove-intelligence-platform) and how the results are shown in the Page Report. All options described here can be combined together in the same call.

## Including a test name

The `SIP.upload` function accepts a test name. This will be displayed in the header of the page report and can be used to separate tests:

```typescript
const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter },
}).then((audit) => {
  SIP.upload(audit, {
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
  rules: { include: Rules.comnponentFilter },
}).then((audit) => {
  SIP.upload(audit, {
    userName: process.env.SI_USER_NAME!,
    apiKey: process.env.SI_API_KEY!,
    pageTitle: "Paginated table component",
  });
});
```

## Skipping git information

If you prefer not to upload basic git information about the repository (origin URL, branch name, and latest commit hash, author, message), use the `includeGitInfo: false` option:

```typescript
SIP.upload(audit, {
  userName: process.env.SI_USER_NAME!,
  apiKey: process.env.SI_API_KEY!,
  includeGitInfo: false,
});
```


