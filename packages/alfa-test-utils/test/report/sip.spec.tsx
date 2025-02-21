import { Outcome } from "@siteimprove/alfa-act";
import { Element, h } from "@siteimprove/alfa-dom";
import { Response } from "@siteimprove/alfa-http";
import { Serializable } from "@siteimprove/alfa-json";
import { Map } from "@siteimprove/alfa-map";
import { None, Option } from "@siteimprove/alfa-option";
import { Err, Ok } from "@siteimprove/alfa-result";
import { Sequence } from "@siteimprove/alfa-sequence";
import { test } from "@siteimprove/alfa-test-deprecated";
import { URL } from "@siteimprove/alfa-url";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { type Audit, SIP } from "../../dist/index.js";

import {
  makeAudit,
  makeFailed,
  makePage,
  makePayload,
  makeRule,
  timestamp,
} from "../fixtures.js";

const { Verbosity } = Serializable;

const { Metadata, S3 } = SIP;

test("Metadata.payload() creates a payload", async (t) => {
  const actual = Metadata.payload(makeAudit(), {}, timestamp);

  t.deepEqual(actual.toJSON(), Ok.of(makePayload()).toJSON());
});

test("Metadata.payload() deserializes audits", async (t) => {
  const actual = Metadata.payload(makeAudit().toJSON(), {}, timestamp);

  t.deepEqual(actual.toJSON(), Ok.of(makePayload()).toJSON());
});

test("Metadata.payload() returns an error on invalid page", async (t) => {
  const goodAudit = makeAudit().toJSON();
  const badAudit: Audit.JSON = {
    ...goodAudit,
    page: {
      ...goodAudit.page,
      request: { ...goodAudit.page.request, url: "not an url" },
    },
  };

  const actual = Metadata.payload(badAudit, {}, timestamp);

  t.deepEqual(actual.toJSON(), { type: "err", error: "Invalid URL" });
});

test("S3.payload() creates empty-ish payload", (t) => {
  const document = h.document([<span></span>]);

  const page = makePage(document);
  const actual = S3.payload("some id", makeAudit({ page }));

  t.deepEqual(actual, {
    Id: "some id",
    CheckResult: "[]",
    Aspects: JSON.stringify(page.toJSON({ verbosity: Verbosity.High })),
  });
});

test("S3.payload() accepts serialized audits", (t) => {
  const document = h.document([<span></span>]);

  const page = makePage(document);
  const actual = S3.payload("some id", makeAudit({ page }).toJSON());

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
  const actual = S3.payload(
    "some id",
    makeAudit({
      page,
      outcomes: Map.from([
        [rule.uri, Sequence.from([makeFailed(rule, target)])],
      ]),
      resultAggregates: Map.from([
        [
          "https://alfa.siteimprove.com/rules/sia-r1000",
          { failed: 1, passed: 0, cantTell: 0 },
        ],
      ]),
    })
  );

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

test("Metadata.axiosConfig() creates an axios config", async (t) => {
  const actual = Metadata.axiosConfig(
    makeAudit(),
    { userName: "foo@foo.com", apiKey: "bar" },
    { url: "https://foo.com", timestamp }
  );

  t.deepEqual(actual.getUnsafe(), {
    ...Metadata.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(
      Metadata.payload(makeAudit(), {}, timestamp).getUnsafe()
    ),
  });
});

test("Metadata.axiosConfig() deserializes audits", async (t) => {
  const actual = Metadata.axiosConfig(
    makeAudit().toJSON(),
    { userName: "foo@foo.com", apiKey: "bar" },
    { url: "https://foo.com", timestamp }
  );

  t.deepEqual(actual.getUnsafe(), {
    ...Metadata.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(
      Metadata.payload(makeAudit(), {}, timestamp).getUnsafe()
    ),
  });
});

test("Custom payload serialization works as JSON.stringify", (t) => {
  const page = makePage(h.document([<span></span>]));
  const payload = S3.payload("some id", makeAudit({ page }));
  const expected = JSON.stringify(payload);
  const actual = `{"Id":${JSON.stringify(
    payload.Id
  )},"CheckResult":${JSON.stringify(
    payload.CheckResult
  )},"Aspects":${JSON.stringify(payload.Aspects)}}`;

  t.deepEqual(actual, expected);
});

test("S3.axiosConfig() creates an axios config", (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = S3.axiosConfig(
    "some id",
    "a pre-signed S3 URL",
    makeAudit({ page })
  );

  t.deepEqual(actual, {
    ...S3.params("a pre-signed S3 URL"),
    data: new Blob(
      [JSON.stringify(S3.payload("some id", makeAudit({ page })))],
      { type: "application/json" }
    ),
  });
});

test("S3.axiosConfig() accepts serialized audits", (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = S3.axiosConfig(
    "some id",
    "a pre-signed S3 URL",
    makeAudit({ page }).toJSON()
  );

  t.deepEqual(actual, {
    ...S3.params("a pre-signed S3 URL"),
    data: new Blob(
      [JSON.stringify(S3.payload("some id", makeAudit({ page })))],
      { type: "application/json" }
    ),
  });
});

test("Metadata.payload() uses site ID if provided", async (t) => {
  const actual = Metadata.payload(makeAudit(), { siteID: 12345 }, timestamp);

  t.deepEqual(actual, Ok.of(makePayload({ SiteId: 12345 })));
});

test("Metadata.payload() uses test name if provided", async (t) => {
  const actual = Metadata.payload(
    makeAudit(),
    { testName: "test name" },
    timestamp
  );

  t.deepEqual(actual, Ok.of(makePayload({ TestName: "test name" })));
});

test("Metadata.payload() includes commit information if provided", async (t) => {
  for (const commitInformation of [
    { BranchName: "hello", Origin: "somewhere" },
    Option.of({ BranchName: "hello", Origin: "somewhere" }),
    Ok.of({ BranchName: "hello", Origin: "somewhere" }),
  ]) {
    const actual = Metadata.payload(
      makeAudit(),
      { commitInformation },
      timestamp
    );

    t.deepEqual(
      actual,
      Ok.of(
        makePayload({
          CommitInformation: { BranchName: "hello", Origin: "somewhere" },
        })
      )
    );
  }

  for (const commitInformation of [undefined, None, Err.of("invalid")]) {
    const actual = Metadata.payload(
      makeAudit(),
      { commitInformation },
      timestamp
    );

    t.deepEqual(actual, Ok.of(makePayload()));
  }
});

test("Metadata.payload() builds test name from commit information", async (t) => {
  const actual = Metadata.payload(
    makeAudit(),
    {
      commitInformation: { BranchName: "hello", Origin: "somewhere" },
      testName: (commit) => `On branch ${commit.BranchName}`,
    },
    timestamp
  );

  t.deepEqual(
    actual,
    Ok.of(
      makePayload({
        CommitInformation: { BranchName: "hello", Origin: "somewhere" },
        TestName: "On branch hello",
      })
    )
  );
});

test("Metadata.payload() uses explicit title if provided", async (t) => {
  const actual = Metadata.payload(
    makeAudit(),
    { pageTitle: "page title" },
    timestamp
  );

  t.deepEqual(actual, Ok.of(makePayload({ PageTitle: "page title" })));
});

test("Metadata.payload() uses page's title if it exists", async (t) => {
  const page = makePage(h.document([<title>Hello</title>, <span></span>]));

  const actual = Metadata.payload(makeAudit({ page }), {}, timestamp);

  t.deepEqual(actual, Ok.of(makePayload({ PageTitle: "Hello" })));
});

test("Metadata.payload() uses explicit title over page's title", async (t) => {
  const page = makePage(h.document([<title>ignored</title>, <span></span>]));

  const actual = Metadata.payload(
    makeAudit({ page }),
    { pageTitle: "page title" },
    timestamp
  );

  t.deepEqual(actual, Ok.of(makePayload({ PageTitle: "page title" })));
});

test("Metadata.payload() builds page title from the page if specified", async (t) => {
  const page = makePage(h.document([<span>Hello</span>]));

  const actual = Metadata.payload(
    makeAudit({ page }),
    { pageTitle: (page) => page.document.toString() },
    timestamp
  );

  t.deepEqual(
    actual,
    Ok.of(
      makePayload({ PageTitle: "#document\n  <span>\n    Hello\n  </span>" })
    )
  );
});

test("Metadata.payload() uses explicit URL if provided", async (t) => {
  const actual = Metadata.payload(
    makeAudit(),
    { pageURL: "page URL" },
    timestamp
  );

  t.deepEqual(actual, Ok.of(makePayload({ PageUrl: "page URL" })));
});

test("Metadata.payload() uses page's response's URL if it exists", async (t) => {
  const page = makePage(
    h.document([<span></span>]),
    Response.of(URL.parse("https://siteimprove.com/").getUnsafe(), 200)
  );

  const actual = Metadata.payload(makeAudit({ page }), {}, timestamp);

  t.deepEqual(
    actual,
    Ok.of(makePayload({ PageUrl: "https://siteimprove.com/" }))
  );
});

test("Metadata.payload() uses explicit URL over page's URL", async (t) => {
  const page = makePage(
    h.document([<span></span>]),
    Response.of(URL.parse("https://siteimprove.com/").getUnsafe(), 200)
  );

  const actual = Metadata.payload(
    makeAudit({ page }),
    { pageURL: "page URL" },
    timestamp
  );

  t.deepEqual(actual, Ok.of(makePayload({ PageUrl: "page URL" })));
});

test("Metadata.payload() builds page URL from the page if specified", async (t) => {
  const page = makePage(h.document([<span>Hello</span>]));

  const actual = Metadata.payload(
    makeAudit({ page }),
    { pageURL: (page) => page.response.status.toString() },
    timestamp
  );

  t.deepEqual(actual, Ok.of(makePayload({ PageUrl: "200" })));
});

test("Metadata.payload() includes global durations", async (t) => {
  const actual = Metadata.payload(
    makeAudit({
      durations: { cascade: 1, "aria-tree": 2, total: 3 },
    }),
    {},
    timestamp
  );

  t.deepEqual(
    actual,
    Ok.of(makePayload({ Durations: { Cascade: 1, AriaTree: 2, Total: 3 } }))
  );
});

test("Metadata.payload() includes rule durations in aggregates", async (t) => {
  const actual = Metadata.payload(
    makeAudit({
      resultAggregates: Map.from([
        ["foo", { failed: 1, passed: 1, cantTell: 0 }],
        ["bar", { failed: 2, passed: 2, cantTell: 0 }],
      ]),
      durations: { cascade: 1, "aria-tree": 1, total: 1 },
    }),
    {},
    timestamp
  );

  t.deepEqual(
    actual,
    Ok.of(
      makePayload({
        Durations: { Cascade: 1, AriaTree: 1, Total: 1 },
        ResultAggregates: [
          {
            RuleId: "foo",
            Failed: 1,
            Passed: 1,
            CantTell: 0,
          },
          {
            RuleId: "bar",
            Failed: 2,
            Passed: 2,
            CantTell: 0,
          },
        ],
      })
    )
  );
});

test(".upload returns an error on missing user name", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(makeAudit({ page }), {
    apiKey: "bar",
    siteID: 12345,
  });

  t.deepEqual(actual.toJSON(), {
    type: "err",
    error: [SIP.Defaults.missingOptions(["User name"])],
  });
});

test(".upload returns an error on missing API key", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(makeAudit({ page }), {
    userName: "foo@foo.com",
    siteID: 12345,
  });

  t.deepEqual(actual.toJSON(), {
    type: "err",
    error: [SIP.Defaults.missingOptions(["API key"])],
  });
});

test(".upload returns an error on missing site ID", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(makeAudit({ page }), {
    userName: "foo@foo.com",
    apiKey: "bar",
  });

  t.deepEqual(actual.toJSON(), {
    type: "err",
    error: [SIP.Defaults.missingOptions(["Site ID"])],
  });
});

test(".upload lists all missing options", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(makeAudit({ page }), {
    apiKey: "bar",
  });

  t.deepEqual(actual.toJSON(), {
    type: "err",
    error: [SIP.Defaults.missingOptions(["User name", "Site ID"])],
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

// Mock for a 401, 4XX, 5XX errors, we need to override the upload URL to trigger them
mock.onPost("https://401.com").reply(401);
mock.onPost("https://4XX.com").reply(400, {
  details: [{ field: "ignored", issue: "foo" }],
});
mock.onPost("https://4XXbis.com").reply(400, {
  details: [
    { field: "ignored", issue: "foo" },
    { field: "ignored", issue: "bar" },
    { field: "ignored", issue: "baz" },
  ],
});
mock.onPost("https://5XX.com").reply(503, { message: "foo" });

test(".upload connects to Siteimprove Intelligence Platform", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(makeAudit({ page }), {
    userName: "foo@foo.com",
    apiKey: "bar",
    siteID: 12345,
  });

  t.deepEqual(actual.toJSON(), { type: "ok", value: "a page report URL" });
});

test(".upload returns standard error message in case of 401 Unauthorized", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(
    makeAudit({ page }),
    {
      userName: "foo@foo.com",
      apiKey: "bar",
      siteID: 12345,
    },
    { url: "https://401.com" }
  );

  t.deepEqual(actual.toJSON(), {
    type: "err",
    error: [SIP.Defaults.badCredentials],
  });
});

test(".upload returns custom error message in case of 4XX", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(
    makeAudit({ page }),
    {
      userName: "foo@foo.com",
      apiKey: "bar",
      siteID: 12345,
    },
    { url: "https://4XX.com" }
  );

  t.deepEqual(actual.toJSON(), {
    type: "err",
    error: ["foo"],
  });
});

test(".upload returns all error messages in case of 4XX", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(
    makeAudit({ page }),
    {
      userName: "foo@foo.com",
      apiKey: "bar",
      siteID: 12345,
    },
    { url: "https://4XXbis.com" }
  );

  t.deepEqual(actual.toJSON(), {
    type: "err",
    error: ["foo", "bar", "baz"],
  });
});

test(".upload returns Axios error message in case of 5XX", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(
    makeAudit({ page }),
    {
      userName: "foo@foo.com",
      apiKey: "bar",
      siteID: 12345,
    },
    { url: "https://5XX.com" }
  );

  t.deepEqual(actual.toJSON(), {
    type: "err",
    error: [
      "Server error (503): Request failed with status code 503. Try again later or contact support if the issue persists.",
    ],
  });
});
