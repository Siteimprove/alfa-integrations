import { test } from "@siteimprove/alfa-test";

import { parseAnswerValue } from "../src/alfa/command/review/parse-answer-value.js";

test("parseAnswerValue boolean: 'true' returns Ok(true)", (t) => {
  t.deepEqual(parseAnswerValue("true", "boolean").toJSON(), {
    type: "ok",
    value: true,
  });
});

test("parseAnswerValue boolean: 'false' returns Ok(false)", (t) => {
  t.deepEqual(parseAnswerValue("false", "boolean").toJSON(), {
    type: "ok",
    value: false,
  });
});

test("parseAnswerValue boolean: invalid input returns Err", (t) => {
  t.deepEqual(parseAnswerValue("yes", "boolean").toJSON(), {
    type: "err",
    error: 'Unrecognised value "yes" for type "boolean"',
  });
});

test("parseAnswerValue node: 'null' returns Ok(null)", (t) => {
  t.deepEqual(parseAnswerValue("null", "node").toJSON(), {
    type: "ok",
    value: null,
  });
});

test("parseAnswerValue node: XPath string returns Ok(string)", (t) => {
  t.deepEqual(parseAnswerValue("/html/body/div", "node").toJSON(), {
    type: "ok",
    value: "/html/body/div",
  });
});

test("parseAnswerValue node[]: comma-separated values return Ok(string[])", (t) => {
  t.deepEqual(parseAnswerValue("/a,/b,/c", "node[]").toJSON(), {
    type: "ok",
    value: ["/a", "/b", "/c"],
  });
});

test("parseAnswerValue color[]: comma-separated values return Ok(string[])", (t) => {
  t.deepEqual(parseAnswerValue("#ff0000,#00ff00", "color[]").toJSON(), {
    type: "ok",
    value: ["#ff0000", "#00ff00"],
  });
});

test("parseAnswerValue string: any value returns Err", (t) => {
  t.deepEqual(parseAnswerValue("hello world", "string").toJSON(), {
    type: "err",
    error: 'Unrecognised value "hello world" for type "string"',
  });
});
