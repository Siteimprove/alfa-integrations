import { Diagnostic, Outcome, Rule } from "@siteimprove/alfa-act";
import { Device } from "@siteimprove/alfa-device";
import { Document, Element, h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Serializable } from "@siteimprove/alfa-json";
import { Err } from "@siteimprove/alfa-result";
import { alfaVersion } from "@siteimprove/alfa-rules";
import { test } from "@siteimprove/alfa-test";
import { Page } from "@siteimprove/alfa-web";

import { SIP } from "../dist/index.js";

const { Verbosity } = Serializable;

const device = Device.standard();

function makePage(document: Document): Page {
  return Page.of(Request.empty(), Response.empty(), document, device);
}

test(".payload() creates empty-ish payload", (t) => {
  const document = h.document([<span></span>]);

  const page = makePage(document);
  const actual = SIP.payload(page, [], "title", "name");
  actual.RequestTimeStampMilliseconds = 0; // overwriting the unstable one

  t.deepEqual(actual, {
    RequestTimeStampMilliseconds: 0,
    Version: alfaVersion,
    CheckResult: "[]",
    Aspects: JSON.stringify(page.toJSON({ verbosity: Verbosity.High })),
    PageTitle: "title",
    TestName: "name",
  });
});

test(".payload serialises outcomes as string", async (t) => {
  const target = <span>Hello</span>;
  const document = h.document([target]);
  const page = makePage(document);

  const rule = Rule.Atomic.of<Page, Element>({
    uri: "fake rule",
    evaluate() {
      return {
        applicability: () => [target],
        expectations: (target) => ({
          1: Err.of(Diagnostic.of("fake diagnostic")),
        }),
      };
    },
  });

  const outcomes = await rule.evaluate(page);

  const actual = SIP.payload(page, outcomes, "title", "name");
  actual.RequestTimeStampMilliseconds = 0; // overwriting the unstable one

  const expected: Outcome.Failed.JSON<Element> = {
    outcome: Outcome.Value.Failed,
    rule: { type: "atomic", uri: "fake rule", requirements: [], tags: [] },
    mode: Outcome.Mode.Automatic,
    target: Serializable.toJSON(target, { verbosity: Verbosity.Minimal }),
    expectations: [
      ["1", { type: "err", error: { message: "fake diagnostic" } }],
    ],
  };

  t.deepEqual(actual, {
    RequestTimeStampMilliseconds: 0,
    Version: alfaVersion,
    CheckResult: JSON.stringify([expected]),
    Aspects: JSON.stringify(page.toJSON({ verbosity: Verbosity.High })),
    PageTitle: "title",
    TestName: "name",
  });
});
