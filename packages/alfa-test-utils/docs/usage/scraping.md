# Scraping

Scraping a web page is the act of turning a web page into the internal data structure that Alfa can work on. It requires rendering the page in a browser; in automated tests this is usually done using browser automation and headless browsers.

The precise steps needed for scraping thus depend on the actual browser automation used. Several packages are provided for integrating with common browser automations.

## Table of Contents

- [Playwright](#playwright)
- [Puppeteer](#puppeteer)
- [Selenium](#selenium)
- [Standalone scraper](#standalone-scraper)
- [Command Line Scraper](#command-line-scraper)
- [Cypress](#cypress)
- [Generic integration](#generic-integration)

## Playwright

Install the `@siteimprove/alfa-playwright` package:

```shell
$ npm install --save-dev @siteimprove/alfa-playwright
```

or

```shell
$ yarn add --dev @siteimprove/alfa-playwright
```

Then, use the `.toPage` scraper on a `JSHandle`, preferably of the full `document` object:

```typescript
import * as playwright from "playwright";
import { Playwright } from "@siteimprove/alfa-playwright";

// Set up a Playwright instance
const browser = await playwright.chromium.launch();
const page = await browser.newPage();

// Navigate to the page to scrape
await page.goto("http://localhost:8080");
// Create a handle for the document object
const document = await page.evaluateHandle(() => window.document);

// Scrape the page
const alfaPage = await Playwright.toPage(document);
```

Most of this code is standard in test automation and likely to exist in end-to-end tests. The last line is the one doing the actual scrape. It can be repeated as often as needed, e.g. after manipulating the page (opening modals, changing tabs, …) in order to scrape the page in different states.

## Puppeteer

Install the `@siteimprove/alfa-puppeteer` package:

```shell
$ npm install --save-dev @siteimprove/alfa-puppeteer
```

or

```shell
$ yarn add --dev @siteimprove/alfa-puppeteer
```

Then, use the `.toPage` scraper on a `JSHandle`, preferably of the full `document` object:

```typescript
import puppeteer from "puppeteer";
import * as playwright from "puppeteer";
import { Puppeteer } from "@siteimprove/alfa-puppeteer";

// Set up a Puppeteer instance
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate to the page to scrape
await page.goto("http://localhost:8080");
// Create a handle for the document object
const document = await page.evaluateHandle(() => window.document);

// Scrape the page
const alfaPage = await Puppeteer.toPage(document);
```

Most of this code is standard in test automation and likely to exist in end-to-end tests. The last line is the one doing the actual scrape. It can be repeated as often as needed, e.g. after manipulating the page (opening modals, changing tabs, …) in order to scrape the page in different states.

## Selenium

The Selenium integration is not fully built, so it requires a bit more manual steps to scrape the page.

```typescript
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

import { Native } from "@siteimprove/alfa-dom/native";

let driver;

// Initialize WebDriver

/**
 * Use normal Selenium set up here, e.g. `new Builder()`, …
 */

// Navigate to the page to scrape
await driver.get("http://localhost:3000");

// Create a handle for the document object
const document = await driver.executeScript("return document;");

// Scrape the page
const documentJSON = await driver.executeScript(Native.fromNode, document);

// Create an Alfa page representation
const alfaPage = Page.of(
  Request.empty(),
  Response.empty(),
  Document.from(documentJSON as Document.JSON),
  Device.standard()
);
```

Here also, the only the building of `documentJSON` and `alfaPage` are really specific to the scraping; they can be repeated to get the page in different states if needed.

## Standalone scraper

The `@siteimprove/alfa-scraper` package provides a standalone package (using puppeteer internally). It might be a better fit for projects who do not already have browser automation and end-to-end tests in place.

Install the `@siteimprove/alfa-scraper` package:

```shell
$ npm install --save-dev @siteimprove/alfa-scraper
```

or

```shell
$ yarn add --dev @siteimprove/alfa-scraper
```

Then, point the scraper at a live page (this may require to set up a local server for it, or use Node's `url.pathToFileURL` to point at a local file):

```typescript
import { Scraper } from "@siteimprove/alfa-scraper";

const alfaPage = await Scraper.of()
  .scrape("http://localhost:8080")
  .then((result) => result.getUnsafe("Could not scrape page"));
```

## Command Line Scraper

The `@siteimprove/alfa-cli` package provides a scraper usable from the command line (using puppeteer internally). The resulting scrape must be saved to a local file and then loaded into a page. Thus, it may not be the best option for automated tests but can be useful for quick iteration and experimentation of the process.

Install the `@siteimprove/alfa-cli` and `@siteimprove/alfa-web` packages:

```shell
$ npm install --save-dev @siteimprove/alfa-cli @siteimprove/alfa-web
```

or

```shell
$ yarn add --dev @siteimprove/alfa-cli @siteimprove/alfa-web
```

Scrape and save a page:

```shell
$ npm run alfa scrape -o page.json http://localhost:8080
```

or

```shell
$ yarn alfa scrape -o page.json http://localhost:8080
```

(use `alfa scrape --help` for more options)

Then load the page into an Alfa object:

```typescript
import fs from "node:fs";
import path from "node:path";
import { Page } from "@siteimprove/alfa-web";

const file = "page.json";
const alfaPage = Page.from(
  JSON.parse(fs.readFileSync(path.join(".", file), "utf-8"))
).getUnsafe("Could not parse the page");
```

## Cypress

The Cypress integration is currently not working due to outdated packages.

## Generic integration

The `@siteimprove/alfa-dom/native` package provides a `Native.fromNode` function that can be used to convert any document object into an Alfa document (and page). It can, notably, be used inside an actual browser (e.g. as part of a script or extension) or injected into a headless browser by whichever means the browser automation tool provides for this. See the [Selenium](#selenium) integration for some example usage.
