import { test } from "@siteimprove/alfa-test";

import { applyPairs } from "../src/alfa/command/review/apply-pairs.js";
import type { StoredQuestion } from "../src/alfa/command/common/question-store.js";

const boolQ = (hash: string): StoredQuestion => ({
  hash,
  uri: "has-audio",
  type: "boolean",
  message: "Does the element have audio?",
  subject: "/html/body",
  context: "/html/body",
});

test("applyPairs: single pair applies one answer", (t) => {
  const result = applyPairs({}, "abc123=true", [boolQ("abc123")]);
  t.deepEqual(result.toJSON(), { type: "ok", value: { abc123: true } });
});

test("applyPairs: two space-separated pairs both apply", (t) => {
  const questions = [boolQ("hash1"), boolQ("hash2")];
  const result = applyPairs({}, "hash1=true hash2=false", questions);
  t.deepEqual(result.toJSON(), {
    type: "ok",
    value: { hash1: true, hash2: false },
  });
});

test("applyPairs: empty string returns Err", (t) => {
  t.equal(applyPairs({}, "", []).isErr(), true);
});

test("applyPairs: whitespace-only string returns Err", (t) => {
  t.equal(applyPairs({}, "   ", []).isErr(), true);
});

test("applyPairs: positional token (no '=') returns Err", (t) => {
  const result = applyPairs({}, "true", [boolQ("abc123")]);
  t.equal(result.isErr(), true);
});

test("applyPairs: empty hash ('=value') returns Err mentioning empty hash", (t) => {
  const result = applyPairs({}, "=true", [boolQ("abc123")]);
  t.equal(
    result.isErr() && result.getErrUnsafe().includes("empty hash"),
    true,
  );
});

test("applyPairs: numeric hash ('1=true') returns Err even if a question has that literal hash", (t) => {
  const result = applyPairs({}, "1=true", [boolQ("1")]);
  t.equal(result.isErr(), true);
});

test("applyPairs: unknown hash returns Err mentioning the hash", (t) => {
  const result = applyPairs({}, "unknown=true", [boolQ("abc123")]);
  t.equal(
    result.isErr() && result.getErrUnsafe().includes("unknown"),
    true,
  );
});

test("applyPairs: parse failure for a known hash propagates as Err", (t) => {
  const result = applyPairs({}, "abc123=yes", [boolQ("abc123")]);
  t.equal(result.isErr(), true);
});
