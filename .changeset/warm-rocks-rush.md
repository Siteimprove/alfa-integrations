---
"@siteimprove/alfa-formatter-sarif": minor
"@siteimprove/alfa-formatter-earl": minor
"@siteimprove/alfa-formatter-json": minor
"@siteimprove/alfa-interviewer": minor
"@siteimprove/alfa-playwright": minor
"@siteimprove/alfa-unexpected": minor
"@siteimprove/alfa-formatter": minor
"@siteimprove/alfa-puppeteer": minor
"@siteimprove/alfa-webdriver": minor
"@siteimprove/alfa-frontier": minor
"@siteimprove/alfa-angular": minor
"@siteimprove/alfa-cheerio": minor
"@siteimprove/alfa-command": minor
"@siteimprove/alfa-crawler": minor
"@siteimprove/alfa-cypress": minor
"@siteimprove/alfa-jasmine": minor
"@siteimprove/alfa-scraper": minor
"@siteimprove/alfa-assert": minor
"@siteimprove/alfa-enzyme": minor
"@siteimprove/alfa-jquery": minor
"@siteimprove/alfa-react": minor
"@siteimprove/alfa-chai": minor
"@siteimprove/alfa-jest": minor
"@siteimprove/alfa-vue": minor
---

**Breaking:** The .js files are now built in the dist folder rather than in src.

⚠️ This is the first of a series of changes on the internal structure and build process of distributed packages. It is probably better to not use this version and wait until more of these internal changes have been done to jump directly to the final result. We are internally releasing these changes for validation purpose only.

This should not impact consumers, the package.json files should be set correctly to consume these files.
