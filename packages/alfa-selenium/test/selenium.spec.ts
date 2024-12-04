/// <reference lib="dom" />

import { Device } from "@siteimprove/alfa-device";
import { Query } from "@siteimprove/alfa-dom";
import { test } from "@siteimprove/alfa-test-deprecated";

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

  const page = await Selenium.toPage(driver);

  await driver.close();

  // Test the presence of layout information
  for (const element of Query.getElementDescendants(page.document)) {
    t(element.getBoundingBox(page.device).isSome());
  }

  // We've seen instability in tests for the devices, most notably for the user
  // preferences that seem to depend on the user's profile. To keep this test simple
  // we just check that a non-standard device has been crawled and discard it.
  // This will fail if the standard device randomly happens to be used, but
  // since it has no user-preference set, this should not be the case.
  t(!page.device.equals(Device.standard()));

  const actual = {
    ...page.toJSON(),
    // This effectively removes the layout information which may be unstable.
    document: page.document.toJSON(),
    device: null,
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
    device: null,
  });
});
