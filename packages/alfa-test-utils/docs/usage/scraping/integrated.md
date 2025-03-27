# Scraping

_Scraping_ a web page is the act of turning it into the internal data structure that Alfa can work on. It requires rendering the page in a browser. In automated tests this is usually done using browser automation and headless browsers.

The precise steps needed for scraping thus depend on the actual browser automation used. Several packages are provided for integrating with common browser automations.

This page describes how to scrape with browser automation tools. If you do not have one already set up in your project, see [advanced scraping](./advanced.md) for other solutions.

## Troubleshooting

In some cases, the Accessibility Code Checker does not manage to fully scrape the styling of a page. This usually happens due to CORS settings on the servers. See [Troubleshooting CORS issues with styling](./troubleshooting.md) for solutions to this problem.

## Playwright

See [a full example of using Playwright with the Siteimprove Accessibility Code Checker](https://github.com/Siteimprove/alfa-examples/tree/main/accessibility-code-checker/playwright) in the `Siteimprove/alfa-examples` repository.

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

See [a full example of using Puppeteer with the Siteimprove Accessibility Code Checker](https://github.com/Siteimprove/alfa-examples/tree/main/accessibility-code-checker/puppeteer) in the `Siteimprove/alfa-examples` repository.

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

See [a full example of using Selenium with the Siteimprove Accessibility Code Checker](https://github.com/Siteimprove/alfa-examples/tree/main/accessibility-code-checker/selenium) in the `Siteimprove/alfa-examples` repository.

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

Cypress works a bit differently than the rest because it integrates its own test framework in a separate Javascript world. This requires a bit of extra work to setup Cypress tasks for reporting on the results.

See [a full example of using Cypress with the Siteimprove Accessibility Code Checker](https://github.com/Siteimprove/alfa-examples/tree/main/accessibility-code-checker/cypress) in the `Siteimprove/alfa-examples` repository.

The basic for scraping is similar to the other solutions, but the resulting Alfa page will live in the Cypress world, so the audit has to be run there, serialised, and then reported back to the NodeJS world.

Install the `@siteimprove/alfa-cypress` package:

```shell
$ npm install --save-dev @siteimprove/alfa-cypress
```

or

```shell
$ yarn add --dev @siteimprove/alfa-cypress
```

Then, use the `.toPage` scraper on the full `document` object:

```typescript
/// <reference types="cypress" />

import { Cypress } from "@siteimprove/alfa-cypress";

cy.visit("test/fixture/page.html");

// An awaiter might be needed to ensure the page is fully loaded 
// cy.get(selector).should("exist"); 

cy.document().then(Cypress.toPage);
```
