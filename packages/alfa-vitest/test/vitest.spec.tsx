import { Device } from "@siteimprove/alfa-device";
import { h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Rules } from "@siteimprove/alfa-rules";
import { Page } from "@siteimprove/alfa-web";

import { describe, expect, it } from "vitest";

import { Vitest } from "../dist/vitest.js";

Vitest.createPlugin((page: Page) => page, [Rules.get("R12").getUnsafe()]);

describe(".createPlugin adds a .toBeAccessible method", () => {
  const page = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([<button>Hello World</button>]),
    Device.standard(),
  );

  it("should have a .toBeAccessible method", async () => {
    expect(page).toBeAccessible();
  });
});

describe(".createPlugin adds a .not.toBeAccessible method", () => {
  const page = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([<button></button>]),
    Device.standard(),
  );

  it("should have a .not.toBeAccessible method", async () => {
    expect(page).not.toBeAccessible();
  });
});
