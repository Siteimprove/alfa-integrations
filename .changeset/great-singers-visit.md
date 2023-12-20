---
"@siteimprove/alfa-formatter-earl": patch
"@siteimprove/alfa-formatter-json": patch
"@siteimprove/alfa-interviewer": patch
"@siteimprove/alfa-playwright": patch
"@siteimprove/alfa-unexpected": patch
"@siteimprove/alfa-formatter": patch
"@siteimprove/alfa-puppeteer": patch
"@siteimprove/alfa-webdriver": patch
"@siteimprove/alfa-frontier": patch
"@siteimprove/alfa-angular": patch
"@siteimprove/alfa-cheerio": patch
"@siteimprove/alfa-command": patch
"@siteimprove/alfa-crawler": patch
"@siteimprove/alfa-cypress": patch
"@siteimprove/alfa-jasmine": patch
"@siteimprove/alfa-scraper": patch
"@siteimprove/alfa-assert": patch
"@siteimprove/alfa-enzyme": patch
"@siteimprove/alfa-jquery": patch
"@siteimprove/alfa-react": patch
"@siteimprove/alfa-chai": patch
"@siteimprove/alfa-jest": patch
"@siteimprove/alfa-cli": patch
"@siteimprove/alfa-vue": patch
---

**Changed:** Each package now has peer dependencies to the main Alfa packages it uses.

This should ease problem with code downstream that tries to Ix, e.g., `Option` from different versions of the package and fail to build.
