# Scraping

_Scraping_ a web page is the act of turning it into the internal data structure that Alfa can work on. It requires rendering the page in a browser. In automated tests this is usually done using browser automation and headless browsers.

The precise steps needed for scraping thus depend on the actual browser automation used. Several packages are provided for integrating with common browser automations.

This page describes how to scrape with browser automation tools. If you do not have one already set up in your project, see [advanced scraping](./advanced.md) for other solutions.

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
import * as puppeteer from "puppeteer";
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

Install the `@siteimprove/alfa-selenium` package:

```shell
$ npm install --save-dev @siteimprove/alfa-selenium
```

or

```shell
$ yarn add --dev @siteimprove/alfa-selenium
```

```typescript
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

import { Selenium } from "@siteimprove/alfa-selenium";

let driver;

// Initialize WebDriver

/**
 * Use normal Selenium set up here, e.g. `new Builder()`, …
 */

// Navigate to the page to scrape
await driver.get("http://localhost:3000");

// Get the driver and turn it onto a page representation that the Code Checker can work with
const alfaPage = await Selenium.toPage(driver);
```

## Cypress

The Cypress integration is currently not working due to outdated packages. It is scheduled to be updated for September 2024.
