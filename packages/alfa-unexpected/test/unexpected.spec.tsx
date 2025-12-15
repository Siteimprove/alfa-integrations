/// <reference types="../types/unexpected.d.ts" preserve="true" />

import { Device } from "@siteimprove/alfa-device";
import { h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Rules } from "@siteimprove/alfa-rules";
import { test } from "@siteimprove/alfa-test";
import { Page } from "@siteimprove/alfa-web";

import unexpected from "unexpected";

import { Unexpected } from "../dist/index.js";

const expect = unexpected
  .clone()
  .use(
    Unexpected.createPlugin(
      (page: Page) => page,
      [Rules.get("R12").getUnsafe()],
    ),
  );

test(".createPlugin adds a 'to be accessible' assertion", async () => {
  const page = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([<button>Hello World</button>]),
    Device.standard(),
  );

  await expect(page, "to be accessible");
});

test(".createPlugin adds a 'not to be accessible' assertion", async () => {
  const page = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([<button></button>]),
    Device.standard(),
  );

  await expect(page, "not to be accessible");
});
