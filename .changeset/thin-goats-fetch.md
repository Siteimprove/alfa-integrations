---
"@siteimprove/alfa-playwright": patch
"@siteimprove/alfa-puppeteer": patch
"@siteimprove/alfa-selenium": patch
"@siteimprove/alfa-cypress": patch
---

**Added:** The page URL is now correctly filled when grabbing the page.

A full `Request` and `Response` are build, with sensible values:

- The request is assumed to be a GET.
- The response is assumed to be a 200 OK with HTMl content.

These values are not always correct, but should be in most cases. It is not really possible to build better values because the actual request and response may be long lost by the time one decides to call `.toPage`.
