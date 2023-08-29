import * as path from "path";
import * as url from "url";

import { Node, Query } from "@siteimprove/alfa-dom";
import { test } from "@siteimprove/alfa-test";
import { Awaiter } from "../src";

import { Scraper } from "../src/scraper";

const { getElementDescendants } = Query;

const fixture = path.join(__dirname, "fixture");

function getTestPageFileUrl(fileName: string): string {
  return url.pathToFileURL(path.join(fixture, fileName)).href;
}

test("#scrape() scrapes a page with a hash fragment", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("internal-link.html");
    const result = await scraper.scrape(url + "#foo");

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(response.url.toString(), url);
  }));

test("#scrape() scrapes a page with an immediate meta refresh", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("meta-refresh-immediate.html");
    const result = await scraper.scrape(url);

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(response.url.toString(), "https://example.com/");
  }));

test("#scrape() scrapes a page with a delayed meta refresh", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("meta-refresh-delayed.html");
    const result = await scraper.scrape(url);

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(response.url.toString(), url);
  }));

test("#scrape() scrapes a page with an immediate location change", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("location-change-immediate.html");
    const result = await scraper.scrape(url, {
      // Giving a bit of time for the location change to actually happen
      awaiter: Awaiter.duration(100, Awaiter.loaded()),
    });

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(response.url.toString(), "https://example.com/");
  }));

test("#scrape() scrapes a page with a delayed location change", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("location-change-delayed.html");
    const result = await scraper.scrape(url);

    t.equal(result.isOk(), true);

    const { response } = result.getUnsafe();

    t.equal(response.url.toString(), url);
  }));

test("#scrape() scrapes layout", async (t) =>
  await Scraper.with(async (scraper) => {
    const url = getTestPageFileUrl("layout.html");
    const result = await scraper.scrape(url);

    const box = getElementDescendants(
      result.getUnsafe().document,
      Node.fullTree
    )
      .find((node) => node.id.some((id) => id === "blackbox"))
      .getUnsafe()
      .box.getUnsafe()
      .toJSON();

    t.deepEqual(box, {
      type: "rectangle",
      x: 466,
      y: 117,
      width: 271,
      height: 288,
    });
  }));
