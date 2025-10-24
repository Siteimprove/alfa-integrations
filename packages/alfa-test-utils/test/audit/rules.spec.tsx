import { test } from "@siteimprove/alfa-test-deprecated";

import { Rules } from "../../dist/audit/rules.js";

import {
  rules,
  rule1,
  rule2,
  rule3,
  rule4,
  rule5,
  rule6,
  rule7,
  rule8,
  rule9,
  rule10,
  rule12,
  rule13,
  rule14,
  rule15,
  rule16,
  rule18,
  rule20,
  rule21,
  rule22,
} from "./fixtures.js";

test(".aaFilter keeps the A+AA 2.0, 2.1 and 2.2 rules", (t) => {
  t.deepEqual(rules.filter(Rules.aaFilter), [
    rule1,
    rule2,
    rule3,
    rule4,
    rule7,
    rule8,
    rule9,
    rule10,
    rule13,
    rule14,
    rule15,
    rule16,
  ]);
});

test(".wcag20Filter keeps the WCAG 2.0 rules", (t) => {
  t.deepEqual(rules.filter(Rules.wcag20Filter), [
    rule1,
    rule2,
    rule3,
    rule4,
    rule5,
    rule6,
  ]);
});

test(".wcag20aaFilter keeps the WCAG 2.0 A+AA rules", (t) => {
  t.deepEqual(rules.filter(Rules.wcag20aaFilter), [rule1, rule2, rule3, rule4]);
});

test(".wcag21aaFilter keeps the WCAG 2.0 and 2.1 A+AA rules", (t) => {
  t.deepEqual(rules.filter(Rules.wcag21aaFilter), [
    rule1,
    rule2,
    rule3,
    rule4,
    rule7,
    rule8,
    rule9,
    rule10,
  ]);
});

test(".componentFilter keeps the component rules", (t) => {
  t.deepEqual(rules.filter(Rules.componentFilter), [
    rule2,
    rule4,
    rule6,
    rule8,
    rule10,
    rule12,
    rule14,
    rule16,
    rule18,
    rule20,
  ]);
});

test(".cherryPickFilter selects individual rules", (t) => {
  // Array syntax
  t.deepEqual(
    rules.filter(Rules.cherryPickFilter([1010, 1012, 1014, 1016, 1018])),
    [rule10, rule12, rule14, rule16, rule18]
  );

  // List of parameters syntax
  t.deepEqual(
    rules.filter(Rules.cherryPickFilter(1010, 1012, 1014, 1016, 1018)),
    [rule10, rule12, rule14, rule16, rule18]
  );
});

test(".ARIAFilter selects ARIA rules", (t) => {
  t.deepEqual(rules.filter(Rules.ARIAFilter), [rule21]);
});

test(".bestPracticesFilter selects Best Practices rules", (t) => {
  t.deepEqual(rules.filter(Rules.bestPracticesFilter), [rule22]);
});
