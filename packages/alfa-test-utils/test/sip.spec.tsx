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

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const { Verbosity } = Serializable;

const device = Device.standard();

function makePage(document: Document): Page {
  return Page.of(Request.empty(), Response.empty(), document, device);
}

test(".payload() creates empty-ish payload", (t) => {
  const document = h.document([<span></span>]);

  const page = makePage(document);
  const actual = SIP.payload(page, [], "title", "name", 0);

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

  const actual = SIP.payload(page, outcomes, "title", "name", 0);

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

test(".params() creates axios config", (t) => {
  const actual = SIP.params("url", "key");

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

test(".axiosConfig() creates an axios config", (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = SIP.axiosConfig(
    page,
    [],
    { userName: "foo@foo.com", apiKey: "bar" },
    { url: "https://foo.com", timestamp: 0 }
  );

  t.deepEqual(actual, {
    ...SIP.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(
      SIP.payload(page, [], SIP.Defaults.Title, SIP.Defaults.Name, 0)
    ),
  });
});

test(".axiosConfig() uses test name if provided", (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = SIP.axiosConfig(
    page,
    [],
    { userName: "foo@foo.com", apiKey: "bar", testName: "test name" },
    { url: "https://foo.com", timestamp: 0 }
  );

  t.deepEqual(actual, {
    ...SIP.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(
      SIP.payload(page, [], SIP.Defaults.Title, "test name", 0)
    ),
  });
});

test(".axiosConfig() uses explicit title if provided", (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = SIP.axiosConfig(
    page,
    [],
    { userName: "foo@foo.com", apiKey: "bar", pageTitle: "page title" },
    { url: "https://foo.com", timestamp: 0 }
  );

  t.deepEqual(actual, {
    ...SIP.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(
      SIP.payload(page, [], "page title", SIP.Defaults.Name, 0)
    ),
  });
});

test(".axiosConfig() uses page's title if it exists", (t) => {
  const page = makePage(h.document([<title>Hello</title>, <span></span>]));

  const actual = SIP.axiosConfig(
    page,
    [],
    { userName: "foo@foo.com", apiKey: "bar" },
    { url: "https://foo.com", timestamp: 0 }
  );

  t.deepEqual(actual, {
    ...SIP.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(SIP.payload(page, [], "Hello", SIP.Defaults.Name, 0)),
  });
});

test(".axiosConfig() uses explicit title over page's title", (t) => {
  const page = makePage(h.document([<title>ignored</title>, <span></span>]));

  const actual = SIP.axiosConfig(
    page,
    [],
    { userName: "foo@foo.com", apiKey: "bar", pageTitle: "page title" },
    { url: "https://foo.com", timestamp: 0 }
  );

  t.deepEqual(actual, {
    ...SIP.params("https://foo.com", "foo@foo.com:bar"),
    data: JSON.stringify(
      SIP.payload(page, [], "page title", SIP.Defaults.Name, 0)
    ),
  });
});

// Somehow, importing axios-mock-adapter breaks typing.
// Requiring it is fine, but not allowed in an ESM file.
// @ts-ignore
const mock = new MockAdapter(axios);

// Everything will be mocked after that, use mock.restore() if needed.
mock.onPost(SIP.Defaults.URL).reply(200, "totally an URL");

test(".upload connects to Siteimprove Intelligence Platform", async (t) => {
  const page = makePage(h.document([<span></span>]));

  const actual = await SIP.upload(page, [], {
    userName: "foo@foo.com",
    apiKey: "bar",
  });

  t.deepEqual(actual, "totally an URL");
});
