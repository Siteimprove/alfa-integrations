import { Outcome } from "@siteimprove/alfa-act";
import { Device } from "@siteimprove/alfa-device";
import { Document, Element, h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Serializable } from "@siteimprove/alfa-json";
import { Map } from "@siteimprove/alfa-map";
import { alfaVersion } from "@siteimprove/alfa-rules";
import { Sequence } from "@siteimprove/alfa-sequence";
import { test } from "@siteimprove/alfa-test";
import { URL } from "@siteimprove/alfa-url";
import { Page } from "@siteimprove/alfa-web";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { type alfaOutcome, Audit, Performance, SIP } from "../../dist/index.js";

import { makeFailed, makeRule } from "../fixtures.js";

const { Verbosity } = Serializable;

const { Metadata, S3 } = SIP;

const device = Device.standard();
const timestamp = new Date().toISOString();

function makePage(
  document: Document,
  response: Response = Response.of(URL.example(), 200)
): Page {
  return Page.of(Request.empty(), response, document, device);
}

const emptyAudit: Audit.Result = {
  alfaVersion,
  page: makePage(h.document([<span></span>])),
  outcomes: Map.empty(),
  resultAggregates: Map.empty(),
  durations: Performance.empty(),
};
function makeAudit(override: Partial<Audit.Result> = {}): Audit.Result {
  return { ...emptyAudit, ...override };
}

const emptyPayload: SIP.Metadata.Payload = {
  RequestTimestamp: timestamp,
  Version: alfaVersion,
  PageUrl: "https://example.com/",
  PageTitle: SIP.Defaults.Title,
  TestName: SIP.Defaults.Name,
  ResultAggregates: [],
  Durations: { Cascade: 0, AriaTree: 0, Total: 0 },
};
function makePayload(
  override: Partial<SIP.Metadata.Payload> = {}
): SIP.Metadata.Payload {
  return { ...emptyPayload, ...override };
}

/**
 * Commit information is highly unstable, hence we simply test that it exist
 * and delete it before deep equality testing. We could also use getCommitInformation
 * again in the expected value, but then we would just test that it produces the
 * same result twice…
 */

test("Metadata.payload() creates a payload", async (t) => {
  const actual = await Metadata.payload(makeAudit(), {}, timestamp);
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(actual, makePayload());
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
  const actual = await Metadata.axiosConfig(
    makeAudit(),
    { userName: "foo@foo.com", apiKey: "bar" },
    { url: "https://foo.com", timestamp }
  );

  t.deepEqual(actual, {
    ...Metadata.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(await Metadata.payload(makeAudit(), {}, timestamp)),
  });
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
    data: new Blob([JSON.stringify(S3.payload("some id", makeAudit({ page })))], {
      type: "application/json",
    }),
  });
});

test("Metadata.payload() uses test name if provided", async (t) => {
  const actual = await Metadata.payload(
    makeAudit(),
    { testName: "test name" },
    timestamp
  );
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(actual, makePayload({ TestName: "test name" }));
});

/**
 * This test will fail if the origin is changed, e.g. on forks.
 */
test("Metadata.payload() builds test name from git information", async (t) => {
  const actual = await Metadata.payload(
    makeAudit(),
    // Only the repo name is stable
    {
      testName: (git) =>
        git.GitOrigin!.replace(
          /.*Siteimprove\/alfa-integrations.*/,
          "Siteimprove/alfa-integrations"
        ),
    },
    timestamp
  );
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(
    actual,
    makePayload({ TestName: "Siteimprove/alfa-integrations" })
  );
});

test("Metadata.payload() uses explicit title if provided", async (t) => {
  const actual = await Metadata.payload(
    makeAudit(),
    { pageTitle: "page title" },
    timestamp
  );
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(actual, makePayload({ PageTitle: "page title" }));
});

test("Metadata.payload() uses page's title if it exists", async (t) => {
  const page = makePage(h.document([<title>Hello</title>, <span></span>]));

  const actual = await Metadata.payload(makeAudit({ page }), {}, timestamp);
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(actual, makePayload({ PageTitle: "Hello" }));
});

test("Metadata.payload() uses explicit title over page's title", async (t) => {
  const page = makePage(h.document([<title>ignored</title>, <span></span>]));

  const actual = await Metadata.payload(
    makeAudit({ page }),
    { pageTitle: "page title" },
    timestamp
  );
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(actual, makePayload({ PageTitle: "page title" }));
});

test("Metadata.payload() builds page title from the page if specified", async (t) => {
  const page = makePage(h.document([<span>Hello</span>]));

  const actual = await Metadata.payload(
    makeAudit({ page }),
    { pageTitle: (page) => page.document.toString() },
    timestamp
  );
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(
    actual,
    makePayload({ PageTitle: "#document\n  <span>\n    Hello\n  </span>" })
  );
});

test("Metadata.payload() uses explicit URL if provided", async (t) => {
  const actual = await Metadata.payload(
    makeAudit(),
    { pageURL: "page URL" },
    timestamp
  );
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(actual, makePayload({ PageUrl: "page URL" }));
});

test("Metadata.payload() uses page's response's URL if it exists", async (t) => {
  const page = makePage(
    h.document([<span></span>]),
    Response.of(URL.parse("https://siteimprove.com/").getUnsafe(), 200)
  );

  const actual = await Metadata.payload(makeAudit({ page }), {}, timestamp);
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(actual, makePayload({ PageUrl: "https://siteimprove.com/" }));
});

test("Metadata.payload() uses explicit URL over page's URL", async (t) => {
  const page = makePage(
    h.document([<span></span>]),
    Response.of(URL.parse("https://siteimprove.com/").getUnsafe(), 200)
  );

  const actual = await Metadata.payload(
    makeAudit({ page }),
    { pageURL: "page URL" },
    timestamp
  );
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(actual, makePayload({ PageUrl: "page URL" }));
});

test("Metadata.payload() builds page URL from the page if specified", async (t) => {
  const page = makePage(h.document([<span>Hello</span>]));

  const actual = await Metadata.payload(
    makeAudit({ page }),
    { pageURL: (page) => page.response.status.toString() },
    timestamp
  );
  t.notEqual(actual.CommitInformation, undefined);
  delete actual.CommitInformation;

  t.deepEqual(actual, makePayload({ PageUrl: "200" }));
});

test("Metadata.payload() excludes commit information if requested", async (t) => {
  const actual = await Metadata.payload(
    makeAudit(),
    { includeGitInfo: false },
    timestamp
  );
  t.equal(actual.CommitInformation, undefined);

  t.deepEqual(actual, makePayload());
});

// test("Metadata.payload() includes global durations", async (t) => {
//   const actual = await Metadata.payload(
//     makeAudit(),
//     { includeGitInfo: false },
//     timestamp
//   );
//   t.equal(actual.CommitInformation, undefined);
//
//   t.deepEqual(actual, makePayload());
// });


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

  const actual = await SIP.upload(makeAudit({ page }), {
    userName: "foo@foo.com",
    apiKey: "bar",
  });

  t.deepEqual(actual.toJSON(), { type: "ok", value: "a page report URL" });
});
