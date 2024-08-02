import { Outcome } from "@siteimprove/alfa-act";
import { Device } from "@siteimprove/alfa-device";
import { Document, Element, h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Serializable } from "@siteimprove/alfa-json";
import { alfaVersion } from "@siteimprove/alfa-rules";
import { Sequence } from "@siteimprove/alfa-sequence";
import { test } from "@siteimprove/alfa-test";
import { Page } from "@siteimprove/alfa-web";

import { Audit, SIP } from "../../dist/index.js";

import { makeFailed, makeRule } from "../fixtures.js";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const { Verbosity } = Serializable;

const { Metadata, S3 } = SIP;

const device = Device.standard();

function makePage(document: Document): Page {
  return Page.of(Request.empty(), Response.empty(), document, device);
}

const emptyAudit: Audit.Result = {
  alfaVersion,
  page: makePage(h.document([<span></span>])),
  outcomes: Sequence.empty(),
  ResultAggregates: [],
};

// TODO: move the title/name tests from axiosConfig to payload which is now using them.

test("Metadata.payload() creates a payload", (t) => {
  const actual = Metadata.payload(
    emptyAudit,
    { pageTitle: "title", testName: "name" },
    0
  );

  t.deepEqual(actual, {
    RequestTimeStampMilliseconds: 0,
    Version: alfaVersion,
    PageTitle: "title",
    TestName: "name",
    ResultAggregates: [],
  } as any);
});

test("S3.payload() creates empty-ish payload", (t) => {
  const document = h.document([<span></span>]);

  const page = makePage(document);
  const actual = S3.payload("some id", {
    alfaVersion,
    page,
    outcomes: Sequence.empty(),
    ResultAggregates: [],
  });

  t.deepEqual(actual, {
    Id: "some id",
    CheckResult: "[]",
    Aspects: JSON.stringify(page.toJSON({ verbosity: Verbosity.High })),
  });
});

test("S3.payload serialises outcomes as string", async (t) => {
  const target = <span>Hello</span>;
  const document = h.document([target]);
  const page = makePage(document);

  const rule = makeRule(1000, target);
  const outcomes = Sequence.from([makeFailed(rule, target)]);

  const actual = S3.payload("some id", {
    alfaVersion,
    page,
    outcomes,
    ResultAggregates: [
      {
        RuleId: "https://alfa.siteimprove.com/rules/sia-r1000",
        Failed: 1,
        Passed: 0,
        CantTell: 0,
      },
    ],
  });

  const expected: Outcome.Failed.JSON<Element> = {
    outcome: Outcome.Value.Failed,
    rule: {
      type: "atomic",
      uri: "https://alfa.siteimprove.com/rules/sia-r1000",
      requirements: [],
      tags: [],
    },
    mode: Outcome.Mode.Automatic,
    target: Serializable.toJSON(target, { verbosity: Verbosity.Minimal }),
    expectations: [
      [
        "1",
        {
          type: "err",
          error: {
            message:
              "fake diagnostic (https://alfa.siteimprove.com/rules/sia-r1000)",
          },
        },
      ],
    ],
  };

  t.deepEqual(actual, {
    Id: "some id",
    CheckResult: JSON.stringify([expected]),
    Aspects: JSON.stringify(page.toJSON({ verbosity: Verbosity.High })),
  });
});

test("Metadata.params() creates axios config", (t) => {
  const actual = Metadata.params("url", "key");

  t.deepEqual(actual, {
    method: "post",
    maxBodyLength: Infinity,
    url: "url",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from("key").toString("base64"),
    },
  });
});
test("S3.params() creates axios config", (t) => {
  const actual = S3.params("url");

  t.deepEqual(actual, {
    method: "put",
    maxBodyLength: Infinity,
    url: "url",
    headers: { "Content-Type": "application/json" },
  });
});

test("Metadata.axiosConfig() creates an axios config", (t) => {
  const actual = Metadata.axiosConfig(
    emptyAudit,
    { userName: "foo@foo.com", apiKey: "bar" },
    { url: "https://foo.com", timestamp: 0 }
  );

  t.deepEqual(actual, {
    ...Metadata.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(Metadata.payload(emptyAudit, {}, 0)),
  });
});
test("S3.axiosConfig() creates an axios config", (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = S3.axiosConfig("some id", "a pre-signed S3 URL", {
    alfaVersion,
    page,
    outcomes: Sequence.empty(),
    ResultAggregates: [],
  });

  t.deepEqual(actual, {
    ...S3.params("a pre-signed S3 URL"),
    data: new Blob(
      [
        JSON.stringify(
          S3.payload("some id", {
            alfaVersion,
            page,
            outcomes: Sequence.empty(),
            ResultAggregates: [],
          })
        ),
      ],
      {
        type: "application/json",
      }
    ),
  });
});

test("Metadata.axiosConfig() uses test name if provided", (t) => {
  const actual = Metadata.axiosConfig(
    emptyAudit,
    { userName: "foo@foo.com", apiKey: "bar", testName: "test name" },
    { url: "https://foo.com", timestamp: 0 }
  );

  t.deepEqual(actual, {
    ...Metadata.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(Metadata.payload(emptyAudit, {}, 0)),
  });
});

test("Metadata.axiosConfig() uses explicit title if provided", (t) => {
  const actual = Metadata.axiosConfig(
    emptyAudit,
    { userName: "foo@foo.com", apiKey: "bar", pageTitle: "page title" },
    { url: "https://foo.com", timestamp: 0 }
  );

  t.deepEqual(actual, {
    ...Metadata.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(Metadata.payload(emptyAudit, {}, 0)),
  });
});

test("Metadata.axiosConfig() uses page's title if it exists", (t) => {
  const page = makePage(h.document([<title>Hello</title>, <span></span>]));

  const audit: Audit.Result = {
    alfaVersion,
    page,
    outcomes: Sequence.empty(),
    ResultAggregates: [],
  };
  const actual = Metadata.axiosConfig(
    audit,
    { userName: "foo@foo.com", apiKey: "bar" },
    { url: "https://foo.com", timestamp: 0 }
  );

  t.deepEqual(actual, {
    ...Metadata.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(Metadata.payload(audit, { pageTitle: "Hello" }, 0)),
  });
});

test("Metadata.axiosConfig() uses explicit title over page's title", (t) => {
  const page = makePage(h.document([<title>ignored</title>, <span></span>]));

  const audit: Audit.Result = {
    alfaVersion,
    page,
    outcomes: Sequence.empty(),
    ResultAggregates: [],
  };
  const actual = Metadata.axiosConfig(
    audit,
    { userName: "foo@foo.com", apiKey: "bar", pageTitle: "page title" },
    { url: "https://foo.com", timestamp: 0 }
  );

  t.deepEqual(actual, {
    ...Metadata.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(
      Metadata.payload(audit, { pageTitle: "page title" }, 0)
    ),
  });
});

// Somehow, importing axios-mock-adapter breaks typing.
// Requiring it is fine, but not allowed in an ESM file.
// @ts-ignore
const mock = new MockAdapter(axios);

// Everything will be mocked after that, use mock.restore() if needed.
mock.onPost(SIP.Defaults.URL).reply(200, {
  pageReportUrl: "a page report URL",
  preSignedUrl: "a S3 URL",
  id: "hello",
});

mock.onPut("a S3 URL").reply(200);

test(".upload connects to Siteimprove Intelligence Platform", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(
    { alfaVersion, page, outcomes: Sequence.empty(), ResultAggregates: [] },
    {
      userName: "foo@foo.com",
      apiKey: "bar",
    }
  );

  t.deepEqual(actual, "a page report URL");
});
