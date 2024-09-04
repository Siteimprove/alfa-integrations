/// <reference lib="dom" />


import { Query } from "@siteimprove/alfa-dom";
import { test } from "@siteimprove/alfa-test";
import type { Page } from "@siteimprove/alfa-web";

import * as path from "node:path";
import * as url from "node:url";

import { Browser, Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

import { Selenium } from "../dist/selenium.js";

// TODO: This should be replaced with import.meta.dirname once we switch to Node 22
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixture = path.join(__dirname, "fixture");

let driver: WebDriver | undefined;

const options = new chrome.Options();
options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");

test("Selenium.toPage() scrapes a page", async (t) => {
  driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  // Navigate to the page to scrape
  await driver.get(url.pathToFileURL(path.join(fixture, "page.html")).href);

  // The link between driver.manage().window().getSize() and the actual viewport
  // is… uncertain… And setSize() gives weird results… We grab the dimensions
  // to stabilize tests. This is not ideal and it would be better to know
  // what's expected instead of just expecting the actual value…
  const width = (await driver.executeScript(
    "return window.document.documentElement.clientWidth"
  )) as number;
  const height = (await driver.executeScript(
    "return window.document.documentElement.clientHeight"
  )) as number;

  // We've seen instability in tests for `prefers-reduced-motion`, maybe due to
  // a Windows/Ubuntu difference. Again, we stabilise the test by reading the
  // actual value beforehand.
  const reducedMotion = ((await driver.executeScript(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )) as boolean)
    ? "reduce"
    : "no-preference";

  const page = await Selenium.toPage(driver);

  await driver.close();

  // Test the presence of layout information
  for (const element of Query.getElementDescendants(page.document)) {
    t(element.getBoundingBox(page.device).isSome());
  }

  const actual: Page.JSON = {
    ...page.toJSON(),
    // This effectively removes the layout information which may be unstable.
    document: page.document.toJSON(),
  };

  t.deepEqual(actual, {
    request: { method: "GET", url: "about:blank", headers: [], body: "" },
    response: { url: "about:blank", status: 200, headers: [], body: "" },
    document: {
      type: "document",
      children: [
        { type: "type", name: "html", publicId: null, systemId: null },
        {
          type: "element",
          children: [
            {
              type: "element",
              children: [],
              namespace: "http://www.w3.org/1999/xhtml",
              prefix: null,
              name: "head",
              attributes: [],
              style: null,
              shadow: null,
              content: null,
              box: null,
            },
            {
              type: "element",
              children: [
                {
                  type: "element",
                  children: [{ type: "text", data: "Hello" }],
                  namespace: "http://www.w3.org/1999/xhtml",
                  prefix: null,
                  name: "div",
                  attributes: [],
                  style: null,
                  shadow: null,
                  content: null,
                  box: null,
                },
                { type: "text", data: "\n" },
              ],
              namespace: "http://www.w3.org/1999/xhtml",
              prefix: null,
              name: "body",
              attributes: [],
              style: null,
              shadow: null,
              content: null,
              box: null,
            },
          ],
          namespace: "http://www.w3.org/1999/xhtml",
          prefix: null,
          name: "html",
          attributes: [],
          style: null,
          shadow: null,
          content: null,
          box: null,
        },
      ],
      style: [],
    },
    device: {
      type: "screen",
      viewport: { width, height, orientation: "landscape" },
      display: { resolution: 1, scan: "progressive" },
      scripting: { enabled: true },
      preferences: [
        { name: "prefers-reduced-transparency", value: "no-preference" },
        { name: "prefers-reduced-motion", value: reducedMotion },
        { name: "prefers-color-scheme", value: "light" },
        { name: "prefers-contrast", value: "no-preference" },
        { name: "forced-colors", value: "none" },
      ],
    },
  });
});
