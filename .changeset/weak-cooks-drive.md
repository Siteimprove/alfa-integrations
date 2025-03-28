---
"@siteimprove/alfa-playwright": minor
"@siteimprove/alfa-puppeteer": minor
"@siteimprove/alfa-selenium": minor
"@siteimprove/alfa-scraper": minor
"@siteimprove/alfa-cypress": minor
"@siteimprove/alfa-cli": minor
"@siteimprove/alfa-angular": minor
"@siteimprove/alfa-vue": minor
"@siteimprove/alfa-jquery": minor
"@siteimprove/alfa-webdriver": minor
---

**Added:** `.toPage`, `.toNode`, or `#scrape` now accept a `dom.Native.Options` parameter; currently to enforce anonymous cross-origin on `<link>` elements before scraping the page. CLI now accepts a `--enforce-anonymous-cross-origin` flag to enforce this behavior.
