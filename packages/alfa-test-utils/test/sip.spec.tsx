import { Device } from "@siteimprove/alfa-device";
import { h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Serializable } from "@siteimprove/alfa-json";
import { alfaVersion } from "@siteimprove/alfa-rules";
import { test } from "@siteimprove/alfa-test";
import { Page } from "@siteimprove/alfa-web";

import { SIP } from "../dist/index.js";

const { Verbosity } = Serializable;

const device = Device.standard();

test(".payload() creates empty-ish payload", (t) => {
  const page = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([<span></span>]),
    Device.standard()
  );

  const actual = SIP.payload(page, [], "hello", "world");
  actual.RequestTimeStampMilliseconds = 0; // overwriting the unstable one

  t.deepEqual(actual, {
    RequestTimeStampMilliseconds: 0,
    Version: alfaVersion,
    CheckResult: "[]",
    Aspects: JSON.stringify(page.toJSON({ verbosity: Verbosity.High })),
    PageTitle: "hello",
    TestName: "world",
  });
});
