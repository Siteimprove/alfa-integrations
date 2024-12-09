# Advanced reporting configuration

## Building a test name

The [`testName` option](./configuration.md#including-a-test-name) can also be a function producing a `string` from basic [commit information](https://github.com/Siteimprove/alfa-integrations/blob/main/docs/api/alfa-test-utils.commitinformation.md). For example, it can be convenient to name a test after the branch it comes from:

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
    testName: (commit) =>
      `WCAG 2.2 Level AA conformance test on ${commit.BranchName}`,
  });
});
```

## Building a page title

Similarly, the page title can be built from the page itself. Be aware that this uses the Alfa representation of the page where the API is somewhat different from the normal DOM API. For example, to get the first `<h1>` heading of the page:

```typescript
import { Element, Query } from "@siteimprove/alfa-dom";

const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.comnponentFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME, // email address of the user.
    apiKey: process.env.SI_API_KEY, // API key generated in the platform.
    siteID: "123456", // Site ID from the Siteimprove Intelligence Platform.
    pageTitle: // Gets the text content of the first `<h1>` element. 
      (alfaPage) =>
      Query.getElementDescendants(alfaPage.document)
        .filter(Element.isElement)
        .find(Element.hasName("h1"))
        .map((heading) => heading.textContent())
        .getOr("Unnamed page"),
  });
});
```

### Cypress

When using Cypress, a function like this one cannot be passed around between the Cypress world and NodeJS because it is not serialisable (it includes some dependencies). This function could, however, live fully within the `cypress.config.ts` file, in which case it must be shared by all test cases (or a more flexible Cypress task must be written).

## Building a page URL

The page URL can also be built from the (Alfa representation of the) page:

```typescript
const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.comnponentFilter },
}).then((alfaResult) => {
  SIP.upload(alfaResult, {
    userName: process.env.SI_USER_NAME, // email address of the user.
    apiKey: process.env.SI_API_KEY, // API key generated in the platform.
    siteID: "123456", // Site ID from the Siteimprove Intelligence Platform.
    pageURL: (alfaPage) =>
      alfaPage.response.url.toString().replace("localhost:8080", "example.com"),
  });
});
```
