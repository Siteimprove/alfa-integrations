import { Map } from "@siteimprove/alfa-map";
import { Err, Ok } from "@siteimprove/alfa-result";
import { Sequence } from "@siteimprove/alfa-sequence";
import { test } from "@siteimprove/alfa-test";

import chalk from "chalk";
import { getRuleTitle } from "../../dist/report/get-rule-title.js";

import { LogGroup } from "../../dist/report/logging.js";

import { makeAudit, makeFailed, makePassed, makeRule } from "../fixtures.js";

const target = <span></span>;

const failingRule1 = makeRule(1, target);
const failingRule2 = makeRule(2, target);
const passingRule = makeRule(3, target);
const audit = makeAudit({
  outcomes: Map.from([
    [failingRule1.uri, Sequence.from([makeFailed(failingRule2, target)])],
    [
      failingRule2.uri,
      Sequence.from([
        makeFailed(failingRule1, target),
        makeFailed(failingRule2, target),
      ]),
    ],
    [passingRule.uri, Sequence.from([makePassed(passingRule, target)])],
  ]),
  resultAggregates: Map.from([
    [failingRule1.uri, { failed: 3, passed: 0, cantTell: 0 }],
    [failingRule2.uri, { failed: 1, passed: 0, cantTell: 0 }],
    [passingRule.uri, { failed: 0, passed: 1, cantTell: 0 }],
  ]),
});

const filteredAggregates: Array<[string, { failed: number }]> = [
  [failingRule1.uri.split("/").pop()!, { failed: 3 }],
  [failingRule2.uri.split("/").pop()!, { failed: 1 }],
];

// Uncomment to see what to expect.
// LogGroup.fromAudit(audit, Ok.of("http://example.com")).print();
// console.log("----------------------");
// LogGroup.fromAudit(audit).print();
// LogGroup.fromAudit(audit, Err.of("foo")).print();

test(".fromAggregate() creates a LogGroup without page report URL", (t) => {
  const actual = LogGroup.fromAggregate(filteredAggregates);

  t.deepEqual(actual.toJSON(), {
    title: "Siteimprove found accessibility issues:",
    logs: [
      { title: chalk.bold(`Page - ${LogGroup.Defaults.Title}`), logs: [] },
      {
        title: "This page contains 2 issues.",
        logs: [
          { title: `1. ${getRuleTitle("sia-r1")} (3 occurrences)`, logs: [] },
          { title: `2. ${getRuleTitle("sia-r2")} (1 occurrence)`, logs: [] },
        ],
      },
    ],
  });
});

test(".fromAggregate() creates a LogGroup from errored page report URL", (t) => {
  const actual = LogGroup.fromAggregate(
    filteredAggregates,
    undefined,
    Err.of("foo")
  );

  t.deepEqual(actual.toJSON(), {
    title: "Siteimprove found accessibility issues:",
    logs: [
      { title: chalk.bold(`Page - ${LogGroup.Defaults.Title}`), logs: [] },
      {
        title: "This page contains 2 issues.",
        logs: [
          { title: `1. ${getRuleTitle("sia-r1")} (3 occurrences)`, logs: [] },
          { title: `2. ${getRuleTitle("sia-r2")} (1 occurrence)`, logs: [] },
        ],
      },
    ],
  });
});

test(".fromAggregate() creates a LogGroup from correct page report URL", (t) => {
  const url = "http://example.com";
  const actual = LogGroup.fromAggregate(
    filteredAggregates,
    undefined,
    Ok.of(url)
  );

  t.deepEqual(actual.toJSON(), {
    title: "Siteimprove found accessibility issues:",
    logs: [
      { title: chalk.bold(`Page - ${LogGroup.Defaults.Title}`), logs: [] },
      {
        title: `This page contains 2 issues: ${url}`,
        logs: [
          {
            title: `1. ${getRuleTitle("sia-r1")} (3 occurrences)`,
            logs: [
              {
                title: `Learn how to fix this issue: ${LogGroup.issueUrl(
                  url,
                  "sia-r1"
                )}`,
                logs: [],
              },
            ],
          },
          {
            title: `2. ${getRuleTitle("sia-r2")} (1 occurrence)`,
            logs: [
              {
                title: `Learn how to fix this issue: ${LogGroup.issueUrl(
                  url,
                  "sia-r2"
                )}`,
                logs: [],
              },
            ],
          },
        ],
      },
    ],
  });
});

test(".fromAudit() creates a LogGroup without page report URL", (t) => {
  const actual = LogGroup.fromAudit(audit);

  t.deepEqual(actual.toJSON(), {
    title: "Siteimprove found accessibility issues:",
    logs: [
      { title: chalk.bold(`Page - ${LogGroup.Defaults.Title}`), logs: [] },
      {
        title: "This page contains 2 issues.",
        logs: [
          { title: `1. ${getRuleTitle("sia-r1")} (3 occurrences)`, logs: [] },
          { title: `2. ${getRuleTitle("sia-r2")} (1 occurrence)`, logs: [] },
        ],
      },
    ],
  });
});

test(".fromAudit() creates a LogGroup from errored page report URL", (t) => {
  const actual = LogGroup.fromAudit(audit, Err.of("foo"));

  t.deepEqual(actual.toJSON(), {
    title: "Siteimprove found accessibility issues:",
    logs: [
      { title: chalk.bold(`Page - ${LogGroup.Defaults.Title}`), logs: [] },
      {
        title: "This page contains 2 issues.",
        logs: [
          { title: `1. ${getRuleTitle("sia-r1")} (3 occurrences)`, logs: [] },
          { title: `2. ${getRuleTitle("sia-r2")} (1 occurrence)`, logs: [] },
        ],
      },
    ],
  });
});

test(".fromAggregate() creates a LogGroup from correct page report URL", (t) => {
  const url = "http://example.com";
  const actual = LogGroup.fromAudit(audit, Ok.of(url));

  t.deepEqual(actual.toJSON(), {
    title: "Siteimprove found accessibility issues:",
    logs: [
      { title: chalk.bold(`Page - ${LogGroup.Defaults.Title}`), logs: [] },
      {
        title: `This page contains 2 issues: ${url}`,
        logs: [
          {
            title: `1. ${getRuleTitle("sia-r1")} (3 occurrences)`,
            logs: [
              {
                title: `Learn how to fix this issue: ${LogGroup.issueUrl(
                  url,
                  "sia-r1"
                )}`,
                logs: [],
              },
            ],
          },
          {
            title: `2. ${getRuleTitle("sia-r2")} (1 occurrence)`,
            logs: [
              {
                title: `Learn how to fix this issue: ${LogGroup.issueUrl(
                  url,
                  "sia-r2"
                )}`,
                logs: [],
              },
            ],
          },
        ],
      },
    ],
  });
});
