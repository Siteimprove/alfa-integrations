/// <reference lib="dom" />

import { Device } from "@siteimprove/alfa-device";
import { Query } from "@siteimprove/alfa-dom";
import { test } from "@siteimprove/alfa-test-deprecated";

import * as path from "node:path";
import * as url from "node:url";

import { Browser, Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

import { Selenium } from "../dist/selenium.js";

// TODO: This should be replaced with import.meta.dirname once we switch to Node 22
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixture = path.join(__dirname, "fixture");

const options = new chrome.Options();
options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");

test("Selenium.toPage() scrapes a page", async (t) => {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  // Navigate to the page to scrape
  const pageUrl = url.pathToFileURL(path.join(fixture, "page.html")).href;
  await driver.get(pageUrl);

  const alfaPage = await Selenium.toPage(driver);

  await driver.close();

  // Test the presence of layout information
  for (const element of Query.getElementDescendants(alfaPage.document)) {
    t(element.getBoundingBox(alfaPage.device).isSome());
  }

  // We've seen instability in tests for the devices, most notably for the user
  // preferences that seem to depend on the user's profile. To keep this test simple
  // we just check that a non-standard device has been crawled and discard it.
  // This will fail if the standard device randomly happens to be used, but
  // since it has no user-preference set, this should not be the case.
  t(!alfaPage.device.equals(Device.standard()));

  const actual = {
    ...alfaPage.toJSON(),
    // This effectively removes the layout information which may be unstable.
    document: alfaPage.document.toJSON(),
    device: null,
  };

  t.deepEqual(actual, {
    request: { method: "GET", url: pageUrl, headers: [], body: "" },
    response: {
      url: pageUrl,
      status: 200,
      headers: [{ name: "Content-Type", value: "text/html" }],
      body: "",
    },
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
                  children: [{ type: "text", data: "Hello", box: null }],
                  namespace: "http://www.w3.org/1999/xhtml",
                  prefix: null,
                  name: "div",
                  attributes: [],
                  style: null,
                  shadow: null,
                  content: null,
                  box: null,
                },
                { type: "text", data: "\n", box: null },
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

test("Selenium.toPage() doesn't change crossorigin attribute when no option is provided", async (t) => {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  // Navigate to the page to scrape
  const pageUrl = url.pathToFileURL(path.join(fixture, "links.html")).href;
  await driver.get(pageUrl);

  const alfaPage = await Selenium.toPage(driver);

  // We check that the scraping did not change the page

  const emptyAttr = await driver.executeScript(
    "return window.document.getElementById('empty').crossOrigin"
  );
  t.equal(emptyAttr, null);

  const anonymousAttr = await driver.executeScript(
    "return window.document.getElementById('anonymous').crossOrigin"
  );
  t.equal(anonymousAttr, "anonymous");

  const useCredentialsAttr = await driver.executeScript(
    "return window.document.getElementById('use-credentials').crossOrigin"
  );
  t.equal(useCredentialsAttr, "use-credentials");

  await driver.close();

  const idMap = Query.getElementIdMap(alfaPage.document);

  const empty = idMap.get("empty").getUnsafe();
  t(empty.attribute("crossorigin").isNone());

  for (const id of ["anonymous", "use-credentials"]) {
    const link = idMap.get(id).getUnsafe();
    t(
      link
        .attribute("crossorigin")
        .some((crossorigin) => crossorigin.value === id)
    );
  }
});

test("Selenium.toPage() enforces anonymous crossorigin on links without one, when asked to", async (t) => {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  // Navigate to the page to scrape
  const pageUrl = url.pathToFileURL(path.join(fixture, "links.html")).href;
  await driver.get(pageUrl);

  const alfaPage = await Selenium.toPage(driver, { enforceAnonymousCrossOrigin: true });

  // We check that the scraping **did** change the page

  const emptyAttr = await driver.executeScript(
    "return window.document.getElementById('empty').crossOrigin"
  );
  t.equal(emptyAttr, "anonymous");

  const anonymousAttr = await driver.executeScript(
    "return window.document.getElementById('anonymous').crossOrigin"
  );
  t.equal(anonymousAttr, "anonymous");

  const useCredentialsAttr = await driver.executeScript(
    "return window.document.getElementById('use-credentials').crossOrigin"
  );
  t.equal(useCredentialsAttr, "use-credentials");

  await driver.close();

  const idMap = Query.getElementIdMap(alfaPage.document);

  const empty = idMap.get("empty").getUnsafe();
  t(
    empty
      .attribute("crossorigin")
      .some((crossorigin) => crossorigin.value === "anonymous")
  );

  for (const id of ["anonymous", "use-credentials"]) {
    const link = idMap.get(id).getUnsafe();
    t(
      link
        .attribute("crossorigin")
        .some((crossorigin) => crossorigin.value === id)
    );
  }
});
