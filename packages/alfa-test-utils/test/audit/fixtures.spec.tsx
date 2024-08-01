import { Scope } from "@siteimprove/alfa-rules";
import { Criterion } from "@siteimprove/alfa-wcag";

import { makeRule } from "../fixtures.js";

// 2.0 A
export const rule1 = makeRule(
  1001,
  <span></span>,
  [Criterion.of("1.1.1")],
  [Scope.Page]
);
export const rule2 = makeRule(
  1002,
  <span></span>,
  [Criterion.of("1.1.1")],
  [Scope.Component]
);

// 2.0 AA
export const rule3 = makeRule(
  1003,
  <span></span>,
  [Criterion.of("1.2.4")],
  [Scope.Page]
);
export const rule4 = makeRule(
  1004,
  <span></span>,
  [Criterion.of("1.2.4")],
  [Scope.Component]
);

// 2.0 AAA
export const rule5 = makeRule(
  1005,
  <span></span>,
  [Criterion.of("1.2.6")],
  [Scope.Page]
);
export const rule6 = makeRule(
  1006,
  <span></span>,
  [Criterion.of("1.2.6")],
  [Scope.Component]
);

// 2.1 A
export const rule7 = makeRule(
  1007,
  <span></span>,
  [Criterion.of("1.3.4")],
  [Scope.Page]
);
export const rule8 = makeRule(
  1008,
  <span></span>,
  [Criterion.of("1.3.4")],
  [Scope.Component]
);

// 2.1 AA
export const rule9 = makeRule(
  1009,
  <span></span>,
  [Criterion.of("1.3.5")],
  [Scope.Page]
);
export const rule10 = makeRule(
  1010,
  <span></span>,
  [Criterion.of("1.3.5")],
  [Scope.Component]
);

// 2.1 AAA
export const rule11 = makeRule(
  1011,
  <span></span>,
  [Criterion.of("1.3.6")],
  [Scope.Page]
);
export const rule12 = makeRule(
  1012,
  <span></span>,
  [Criterion.of("1.3.6")],
  [Scope.Component]
);

// 2.2 A
export const rule13 = makeRule(
  1013,
  <span></span>,
  [Criterion.of("3.2.6")],
  [Scope.Page]
);
export const rule14 = makeRule(
  1014,
  <span></span>,
  [Criterion.of("3.2.6")],
  [Scope.Component]
);

// 2.2 AA
export const rule15 = makeRule(
  1015,
  <span></span>,
  [Criterion.of("2.4.11")],
  [Scope.Page]
);
export const rule16 = makeRule(
  1016,
  <span></span>,
  [Criterion.of("2.4.11")],
  [Scope.Component]
);

// 2.2 AAA
export const rule17 = makeRule(
  1017,
  <span></span>,
  [Criterion.of("2.4.12")],
  [Scope.Page]
);
export const rule18 = makeRule(
  1018,
  <span></span>,
  [Criterion.of("2.4.12")],
  [Scope.Component]
);

// No requirement
export const rule19 = makeRule(1019, <span></span>, [], [Scope.Page]);
export const rule20 = makeRule(1020, <span></span>, [], [Scope.Component]);

export const rules = [
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
  rule11,
  rule12,
  rule13,
  rule14,
  rule15,
  rule16,
  rule17,
  rule18,
  rule19,
  rule20,
];
