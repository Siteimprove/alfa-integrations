# Advanced reporting configuration

## Building a test name

The [`testName` option](./configuration.md#including-a-test-name) can also be a function producing a `string` from basic [git information]((https://github.com/Siteimprove/alfa-integrations/blob/main/docs/api/alfa-test-utils.git.md). For example, it can be convenient to name a test after the branch it comes from:

```typescript
const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter },
}).then((audit) => {
  SIP.upload(audit, {
    userName: process.env.SI_USER_NAME!,
    apiKey: process.env.SI_API_KEY!,
    testName: (gitInfo) =>
      `WCAG 2.2 Level AA conformance test on ${gitInfo.branch}`,
  });
});
```

## Building a page title

Similarly, the page title can be built from the page itself. Be aware that this looks into the Alfa representation of the page where the API is somewhat different from the normal DOM API. For example, to get the first `<h1>` heading of the page:

```typescript
import { Element, Query } from "@siteimprove/alfa-dom";

const pageReportURL = Audit.run(alfaPage, {
  rules: { include: Rules.comnponentFilter },
}).then((audit) => {
  SIP.upload(audit, {
    userName: process.env.SI_USER_NAME!,
    apiKey: process.env.SI_API_KEY!,
    pageTitle: (alfaPage) =>
      Query.getElementDescendants(alfaPage.document)
        .filter(Element.isElement)
        .find(Element.hasName("h1"))
        .map((heading) => heading.textContent())
        .getOr("Unnamed page"),
  });
});
```

## Providing a page URL

> **Note:** Page URLs are currently not displayed in the reports. Thus this documentation is rather short.

The `SIP.upload` function also accept a `pageURL` option. It can typically be used to override `localhost` URLs that are frequent in the context of testing but not necessarily meaningful in a report. Like `pageTitle`, the `pageURL` can be a hard-coded `string` or a function generating it from the Alfa page.
 
