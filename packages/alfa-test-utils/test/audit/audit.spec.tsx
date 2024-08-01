import { Device } from "@siteimprove/alfa-device";
import { Element, h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import type { Predicate } from "@siteimprove/alfa-predicate";
import { Sequence } from "@siteimprove/alfa-sequence";
import { test } from "@siteimprove/alfa-test";
import { Criterion } from "@siteimprove/alfa-wcag";
import { Page } from "@siteimprove/alfa-web";

import { Audit, Outcomes, Rules } from "../../dist/index.js";

import { makeRule } from "../fixtures.js";

const isEven: Predicate<number> = (n) => n % 2 === 0;
const isTriple: Predicate<number> = (n) => n % 3 === 0;

const numbers = Sequence.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);

test(".filter keeps everything when no filter is provided", (t) => {
  t.deepEqual(Audit.filter(numbers, {}).toJSON(), numbers.toJSON());
});

test(".filter only includes specified items", (t) => {
  t.deepEqual(
    Audit.filter(numbers, { include: isEven }).toJSON(),
    [2, 4, 6, 8]
  );
});

test(".filter excludes specified items", (t) => {
  t.deepEqual(
    Audit.filter(numbers, { exclude: isEven }).toJSON(),
    [1, 3, 5, 7, 9]
  );
});

test(".filter prioritizes exclusion over inclusion", (t) => {
  t.deepEqual(
    Audit.filter(numbers, { include: isEven, exclude: isTriple }).toJSON(),
    [2, 4, 8]
  );
});

const foo = (
  <img id="foo" src="foo.jpg">
    foo
  </img>
);
const id = foo.attribute("id").getUnsafe();
const bar = (
  <img id="bar" src="bar.jpg" alt="bar">
    bar
  </img>
);

const page = Page.of(
  Request.empty(),
  Response.empty(),
  h.document([<div class="hello">{foo}</div>, <div class="world">{bar}</div>]),
  Device.standard()
);

const ruleFoo = makeRule(1001, foo, [Criterion.of("1.1.1")]);

test(".run runs included rules", async (t) => {
  const actual = (
    await Audit.run(page, {
      rules: { include: Rules.cherryPickFilter(2) },
    })
  ).outcomes.map((outcome) => outcome.rule.uri);

  t.deepEqual(actual.toJSON(), [
    "https://alfa.siteimprove.com/rules/sia-r2",
    "https://alfa.siteimprove.com/rules/sia-r2",
  ]);
});

test(".run does not run excluded rules", async (t) => {
  const actual = (
    await Audit.run(page, {
      rules: { exclude: Rules.cherryPickFilter(2) },
    })
  ).outcomes.map((outcome) => outcome.rule.uri);

  t(actual.none((uri) => uri === "https://alfa.siteimprove.com/rules/sia-r2"));
});

test(".run adds custom rules to the ruleset", async (t) => {
  const actual = (
    await Audit.run(page, {
      rules: { include: Rules.cherryPickFilter(2), custom: [ruleFoo] },
    })
  ).outcomes.map((outcome) => outcome.rule.uri);

  t.deepEqual(actual.toJSON(), [
    "https://alfa.siteimprove.com/rules/sia-r2", // foo, failing
    "https://alfa.siteimprove.com/rules/sia-r2", // bar, passing
    "https://alfa.siteimprove.com/rules/sia-r1001", // foo
  ]);
});

test(".run overrides the ruleset with custom rules", async (t) => {
  const actual = (
    await Audit.run(page, {
      rules: {
        include: Rules.cherryPickFilter(2),
        custom: [ruleFoo],
        override: true,
      },
    })
  ).outcomes.map((outcome) => outcome.rule.uri);

  t.deepEqual(actual.toJSON(), [
    "https://alfa.siteimprove.com/rules/sia-r1001", // foo
  ]);
});

test(".run only keeps selected outcomes", async (t) => {
  const actual = (
    await Audit.run(page, {
      rules: { include: Rules.cherryPickFilter(2) },
      outcomes: { include: Outcomes.failedFilter },
    })
  ).outcomes.map((outcome) => (outcome.target as Element).id.getUnsafe());

  t.deepEqual(actual.toJSON(), ["foo"]);
});

test(".run excludes selected outcomes", async (t) => {
  const actual = (
    await Audit.run(page, {
      rules: { include: Rules.cherryPickFilter(2) },
      outcomes: { exclude: Outcomes.failedFilter },
    })
  ).outcomes.map((outcome) => (outcome.target as Element).id.getUnsafe());

  t.deepEqual(actual.toJSON(), ["bar"]);
});
