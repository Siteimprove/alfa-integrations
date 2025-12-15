/// <reference types="jasmine" />

import { Device } from "@siteimprove/alfa-device";
import { h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Rules } from "@siteimprove/alfa-rules";
import { Page } from "@siteimprove/alfa-web";

import { Jasmine } from "../dist/index.js";

Jasmine.createPlugin(
  async (page: Page) => page,
  [Rules.get("R12").getUnsafe()],
);

describe(".createPlugin", () => {
  const goodPage = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([<button>Hello World</button>]),
    Device.standard(),
  );

  it("should have a .toBeAccessible method", async () => {
    await expectAsync(goodPage).toBeAccessible();
  });

  const badPage = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([<button></button>]),
    Device.standard(),
  );

  it("should have a .not.toBeAccessible method", async () => {
    await expectAsync(badPage).not.toBeAccessible();
  });
});
