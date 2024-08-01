import { h } from "@siteimprove/alfa-dom";
import { test } from "@siteimprove/alfa-test";
import { Outcomes } from "../../dist/index.js";
import { makeFailed, makeRule } from "../fixtures.js";
import { rule1, rule2 } from "./fixtures.spec.js";

const foo = <span id="foo">foo</span>;
const id = foo.attribute("id").getUnsafe();
const bar = <span id="bar">bar</span>;

h.document([<div class="hello">{foo}</div>, <div class="world">{bar}</div>]);

const ruleAttr = makeRule(1001, id);

const outcomeFoo1 = makeFailed(rule1, foo);
const outcomeFooAttr = makeFailed(ruleAttr, id);
const outcomeFoo2 = makeFailed(rule2, foo);
const outcomeBar1 = makeFailed(rule1, bar);
const outcomeBar2 = makeFailed(rule2, bar);

const outcomes = [
  outcomeFoo1,
  outcomeFooAttr,
  outcomeFoo2,
  outcomeBar1,
  outcomeBar2,
];

test(".insideSelectorFilter keeps occurrences with an ancestor matching the selector", (t) => {
  t.deepEqual(
    outcomes.filter(Outcomes.insideSelectorFilter(".hello")),
    [
      outcomeFoo1,
      outcomeFooAttr,
      outcomeFoo2,
    ]
  );
});

test(".ruleAndSelectorFilter keeps occurrences with a matching rule and target", (t) => {
  t.deepEqual(outcomes.filter(Outcomes.ruleAndSelectorFilter(1001, "#foo")), [
    outcomeFoo1,
    outcomeFooAttr,
  ]);
});
