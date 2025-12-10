import { Device } from "@siteimprove/alfa-device";
import { Query } from "@siteimprove/alfa-dom";
import { test } from "@siteimprove/alfa-test-deprecated";

import { remote } from "webdriverio";

import path from "node:path";
import url from "node:url";

import { WebElement } from "../dist/index.js";

const fixture = path.join(import.meta.dirname, "fixture");

// We keep a single browser session as it seems to stabilize the tests.
// This means we must sequentialize them (`await` each of them) in order to
// avoid interference.
const browser = await remote({
  capabilities: {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: [
        "headless",
        "disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
      ],
    },
  },
});

await test("WebElement.toPage() scrapes a page", async (t) => {
  const pageUrl = url.pathToFileURL(path.join(fixture, "page.html")).href;

  await browser.url(pageUrl);
  const document: WebdriverIO.Element = await browser.execute(
    "return window.document",
  );
  const alfaPage = await WebElement.toPage(document, browser);

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

await test("WebElement.toPage() doesn't change crossorigin attribute when no option is provided", async (t) => {
  const pageUrl = url.pathToFileURL(path.join(fixture, "links.html")).href;

  await browser.url(pageUrl);
  const document: WebdriverIO.Element = await browser.execute(
    "return window.document",
  );
  const alfaPage = await WebElement.toPage(document, browser);

  // We check that the scraping did not change the page
  const emptyAttr = await (
    await browser.$("#empty").getElement()
  ).getAttribute("crossOrigin");
  t.equal(emptyAttr, null);

  const anonymousAttr = await (
    await browser.$("#anonymous").getElement()
  ).getAttribute("crossOrigin");
  t.equal(anonymousAttr, "anonymous");

  const useCredentialsAttr = await (
    await browser.$("#use-credentials").getElement()
  ).getAttribute("crossOrigin");
  t.equal(useCredentialsAttr, "use-credentials");

  const idMap = Query.getElementIdMap(alfaPage.document);

  const empty = idMap.get("empty").getUnsafe();
  t(empty.attribute("crossorigin").isNone());

  for (const id of ["anonymous", "use-credentials"]) {
    const link = idMap.get(id).getUnsafe();
    t(
      link
        .attribute("crossorigin")
        .some((crossorigin) => crossorigin.value === id),
    );
  }
});

await test("WebElement.toPage() enforces anonymous crossorigin on links without one, when asked to", async (t) => {
  const pageUrl = url.pathToFileURL(path.join(fixture, "links.html")).href;

  await browser.url(pageUrl);
  const document: WebdriverIO.Element = await browser.execute(
    "return window.document",
  );
  const alfaPage = await WebElement.toPage(document, browser, {
    enforceAnonymousCrossOrigin: true,
  });

  // We check that the scraping **did** change the page

  const emptyAttr = await (
    await browser.$("#empty").getElement()
  ).getAttribute("crossOrigin");
  t.equal(emptyAttr, "anonymous");

  const anonymousAttr = await (
    await browser.$("#anonymous").getElement()
  ).getAttribute("crossOrigin");
  t.equal(anonymousAttr, "anonymous");

  const useCredentialsAttr = await (
    await browser.$("#use-credentials").getElement()
  ).getAttribute("crossOrigin");
  t.equal(useCredentialsAttr, "use-credentials");

  const idMap = Query.getElementIdMap(alfaPage.document);

  const empty = idMap.get("empty").getUnsafe();
  t(
    empty
      .attribute("crossorigin")
      .some((crossorigin) => crossorigin.value === "anonymous"),
  );

  for (const id of ["anonymous", "use-credentials"]) {
    const link = idMap.get(id).getUnsafe();
    t(
      link
        .attribute("crossorigin")
        .some((crossorigin) => crossorigin.value === id),
    );
  }
});

// Close the browser session after all tests have run
await browser.deleteSession();
