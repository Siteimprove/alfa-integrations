import { Node, Query } from "@siteimprove/alfa-dom";
import { test } from "@siteimprove/alfa-test";
import type { Thunk } from "@siteimprove/alfa-thunk";

import * as path from "node:path";
import * as url from "node:url";
import * as puppeteer from "puppeteer";

import { Awaiter } from "../dist/index.js";
import { Scraper } from "../dist/scraper.js";

const { getElementDescendants } = Query;

const fixture = path.join(import.meta.dirname, "fixture");

function getTestPageFileUrl(fileName: string): string {
  return url.pathToFileURL(path.join(fixture, fileName)).href;
}

const browser: Thunk<Promise<puppeteer.Browser>> = () =>
  puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      // In order to be able to access external style sheets through CSSOM, we
      // have to disable CORS restrictions in Chromium.
      "--disable-web-security",
    ],
  });

test("#scrape() scrapes a page", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("internal-link.html");
    const result = await scraper.scrape(url);

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(response.url.toString(), url);
  }, browser()));

test("#scrape() scrapes a page with a hash fragment", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("internal-link.html") + "#foo";
    const result = await scraper.scrape(url);

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(response.url.toString(), url);
  }, browser()));

test("#scrape() scrapes a page with an immediate meta refresh", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("meta-refresh-immediate.html");
    const result = await scraper.scrape(url);

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(response.url.toString(), "https://example.com/");
  }, browser()));

test("#scrape() scrapes a page with a delayed meta refresh", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("meta-refresh-delayed.html");
    const result = await scraper.scrape(url);

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(response.url.toString(), url);
  }, browser()));

test("#scrape() scrapes a page with an immediate location change", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("location-change-immediate.html");
    const result = await scraper.scrape(url, {
      // Giving a bit of time for the location change to actually happen
      awaiter: Awaiter.duration(200, Awaiter.loaded()),
    });

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(
      response.url.toString(),
      "https://example.com/",
      `Received URL: ${response.url.toString()}`,
    );
  }, browser()));

test("#scrape() scrapes a page with a delayed location change", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("location-change-delayed.html");
    const result = await scraper.scrape(url);

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(response.url.toString(), url);
  }, browser()));

test("#scrape() scrapes layout", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("layout.html");
    const page = (await scraper.scrape(url)).getUnsafe();

    const box = getElementDescendants(page.document, Node.fullTree)
      .find((node) => node.id.some((id) => id === "blackbox"))
      .getUnsafe()
      .getBoundingBox(page.device)
      .getUnsafe()
      .toJSON();

    t.deepEqual(box, {
      type: "rectangle",
      x: 466,
      y: 117,
      width: 271,
      height: 288,
    });
  }, browser()));

test("#scrape() leaves crossorigin untouched by default", async (t) => {
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("links.html");
    const page = (await scraper.scrape(url)).getUnsafe();

    const idMap = Query.getElementIdMap(page.document);

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
  }, browser());
});

test("#scrape() enforce anonymous crossorigin on `<link>` missing one, when asked to", async (t) => {
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("links.html");
    const page = (
      await scraper.scrape(url, { enforceAnonymousCrossOrigin: true })
    ).getUnsafe();

    const idMap = Query.getElementIdMap(page.document);

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
  }, browser());
});
