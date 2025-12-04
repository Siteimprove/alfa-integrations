import { Device } from "@siteimprove/alfa-device";
import { Query } from "@siteimprove/alfa-dom";
import { test } from "@siteimprove/alfa-test-deprecated";
import { Page } from "@siteimprove/alfa-web";

import { remote } from "webdriverio";

import path from "node:path";
import url from "node:url";

import { WebElement } from "../dist/index.js";

const fixture = path.join(import.meta.dirname, "fixture");

async function getPage(pageUrl: string): Promise<Page> {
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

  await browser.url(pageUrl);
  const document = await browser.execute("return window.document");
  const alfaPage = await WebElement.toPage(document, browser);
  await browser.deleteSession();

  return alfaPage;
}

test("WebElement.toPage() scrapes a page", async (t) => {
  const pageUrl = url.pathToFileURL(path.join(fixture, "page.html")).href;
  const alfaPage = await getPage(pageUrl);

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
