import { Query } from "@siteimprove/alfa-dom";
import { test } from "@siteimprove/alfa-test";
import * as path from "node:path";
import * as url from "node:url";

import puppeteer from "puppeteer";
import { Puppeteer } from "../dist/puppeteer.js";

// TODO: This should be replaced with import.meta.dirname once we switch to Node 22
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixture = path.join(__dirname, "fixture");

test(".toPage() scrapes a page", async (t) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();

  // Navigate to the page to scrape
  await page.goto(url.pathToFileURL(path.join(fixture, "page.html")).href);

  // Retrieve the viewport dimensions
  const { width, height } = await page.evaluate(() => ({
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight,
  }));

  const document = await page.evaluateHandle(() => window.document);

  const alfaPage = await Puppeteer.toPage(document);

  await browser.close();

  // Test the presence of layout information
  for (const element of Query.getElementDescendants(alfaPage.document)) {
    t(element.getBoundingBox(alfaPage.device).isSome());
  }

  const actual = {
    ...alfaPage.toJSON(),
    // This effectively removes the layout information which may be unstable.
    document: alfaPage.document.toJSON(),
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
        { name: "prefers-reduced-motion", value: "no-preference" },
        { name: "prefers-color-scheme", value: "light" },
        { name: "prefers-contrast", value: "no-preference" },
        { name: "forced-colors", value: "none" },
      ],
    },
  });
});
