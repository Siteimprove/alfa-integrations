import { Map } from "@siteimprove/alfa-map";
import { Err, Ok } from "@siteimprove/alfa-result";
import { Sequence } from "@siteimprove/alfa-sequence";
import { test } from "@siteimprove/alfa-test";

import chalk from "chalk";
import { getRuleTitle } from "../../dist/report/get-rule-title.js";

import { Logging, LogGroup } from "../../dist/report/logging.js";

import { makeAudit, makeFailed, makePassed, makeRule } from "../fixtures.js";

const target = <span></span>;

const failingRule0 = makeRule(1, target);
const failingRule1 = makeRule(2, target);
const passingRule = makeRule(3, target);
const audit = makeAudit({
  outcomes: Map.from([
    [failingRule0.uri, Sequence.from([makeFailed(failingRule0, target)])],
    [
      failingRule1.uri,
      Sequence.from([
        makeFailed(failingRule1, target),
        makeFailed(failingRule1, target),
      ]),
    ],
    [passingRule.uri, Sequence.from([makePassed(passingRule, target)])],
  ]),
  resultAggregates: Map.from([
    [failingRule0.uri, { failed: 1, passed: 0, cantTell: 0 }],
    [failingRule1.uri, { failed: 2, passed: 0, cantTell: 0 }],
    [passingRule.uri, { failed: 0, passed: 1, cantTell: 0 }],
  ]),
});

Logging.result(audit, Ok.of("http://example.com"));
LogGroup.fromAudit(audit, Ok.of("http://example.com")).print();
console.log("----------------------");
Logging.result(audit);
LogGroup.fromAudit(audit).print();
LogGroup.fromAudit(audit, Err.of("foo")).print();

test(".fromAggregate() creates a LogGroup without page report URL", (t) => {
  const actual = LogGroup.fromAggregate([["sia-r1", { failed: 1 }]]);

  t.deepEqual(actual.toJSON(), {
    title: "Siteimprove found accessibility issues:",
    logs: [
      { title: chalk.bold("Page - Untitled"), logs: [] },
      {
        title: "This page contains 1 issues.",
        logs: [
          { title: `1. ${getRuleTitle("sia-r1")} (1 occurrence)`, logs: [] },
        ],
      },
    ],
  });
});

test(".fromAggregate() creates a LogGroup from errored page report URL", (t) => {
  const actual = LogGroup.fromAggregate(
    [["sia-r1", { failed: 1 }]],
    Err.of("foo")
  );

  t.deepEqual(actual.toJSON(), {
    title: "Siteimprove found accessibility issues:",
    logs: [
      { title: chalk.bold("Page - Untitled"), logs: [] },
      {
        title: "This page contains 1 issues.",
        logs: [
          { title: `1. ${getRuleTitle("sia-r1")} (1 occurrence)`, logs: [] },
        ],
      },
    ],
  });
});

test(".fromAggregate() creates a LogGroup from correct page report URL", (t) => {
  const url = "http://example.com";
  const actual = LogGroup.fromAggregate(
    [["sia-r1", { failed: 1 }]],
    Ok.of(url)
  );

  t.deepEqual(actual.toJSON(), {
    title: "Siteimprove found accessibility issues:",
    logs: [
      { title: chalk.bold("Page - Untitled"), logs: [] },
      {
        title: `This page contains 1 issues: ${url}`,
        logs: [
          {
            title: `1. ${getRuleTitle("sia-r1")} (1 occurrence)`,
            logs: [
              {
                title: `Learn how to fix this issue: ${LogGroup.occurrenceURL(
                  url,
                  "sia-r1"
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
