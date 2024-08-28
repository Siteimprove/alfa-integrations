<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@siteimprove/alfa-test-utils](./alfa-test-utils.md) &gt; [SIP](./alfa-test-utils.sip.md) &gt; [Options](./alfa-test-utils.sip.options.md) &gt; [pageURL](./alfa-test-utils.sip.options.pageurl.md)

## SIP.Options.pageURL property

The URL of the page, or a function to build it from the audited page. Defaults to the URL used to scrape the page.

**Signature:**

```typescript
pageURL?: string | ((page: Page) => string);
```

## Remarks

Overwriting it typically allows to circumvent `localhost` addresses for tests that are run on local servers.
