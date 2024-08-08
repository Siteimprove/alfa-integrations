import { Element, Query } from "@siteimprove/alfa-dom";
import type { Result } from "@siteimprove/alfa-result";

import chalk from "chalk";

import { Audit } from "../audit/index.js";
import { Outcome } from "@siteimprove/alfa-act";
import { getRuleTitle } from "./get-rule-title.js";

/**
 * Handling pretty-printing of console output.
 *
 * @public
 */
export namespace Logging {
  /**
   * Prepare logging information
   */
  export function prepare(audit: Audit.Result): Record<string, number> {
    const failedOutcomes = audit.outcomes.filter((results) =>
      results.some(Outcome.isFailed)
    );

    const failedAggregates: Record<string, number> = {};

    failedOutcomes.forEach((_, url) => {
      const aggregate = audit.resultAggregates
        .get(url)
        .getOr({ failed: 0, passed: 0, cantTell: 0 }).failed;

      const ruleId = url.split("/").pop();
      if (ruleId) {
        failedAggregates[ruleId] = aggregate;
      }
    });

    return failedAggregates;
  }

  /**
   * Print results of an audit.
   */
  export function result(
    audit: Audit.Result,
    pageReportURL?: Result<string, string>
  ): void {
    // TODO: Pass as a function argument
    const title = Query.getElementDescendants(audit.page.document)
      .filter(Element.isElement)
      .find(Element.hasName("title"))
      .map((title) => title.textContent())
      .getOr("Untitled");

    const failedOutcomes = prepare(audit);
    const totalIssues = Object.keys(failedOutcomes);

    const url = pageReportURL ? pageReportURL.getOr("N/A") : undefined;

    if (url) {
      logWithUrl(url, title, totalIssues, failedOutcomes);
    } else {
      logWithoutUrl(title, totalIssues, failedOutcomes);
    }
  }
}

function logWithUrl(
  url: string,
  title: string,
  totalIssues: string[],
  failedOutcomes: Record<string, number>
): void {
  console.group("Siteimprove found accessibility issues:");
  console.groupCollapsed(chalk.bold(`Page - ${title}`));
  console.groupEnd();

  console.group(`This page contains ${totalIssues.length} issues: ${url}`);

  totalIssues.forEach((ruleId, index) => {
    const count = failedOutcomes[ruleId];
    const baseUrl = `${url}&conf=a+aa+aaa+aria+si&issue=cantTell+failed&wcag=twopointtwo#/`;
    const dynamicUrl = `${baseUrl}${ruleId}/failed/`;

    console.groupCollapsed(
      `${index + 1}. ${getRuleTitle(ruleId)} (${count} ${
        count > 1 ? "occurrences" : "occurrence"
      })`
    );
    console.log(`Learn how to fix this issue: ${dynamicUrl}`);
    console.groupEnd();
  });

  console.groupEnd();
  console.groupEnd();
}

function logWithoutUrl(
  title: string,
  totalIssues: string[],
  failedOutcomes: Record<string, number>
): void {
  console.group("Siteimprove found accessibility issues:");
  console.groupCollapsed(chalk.bold(`Page - ${title}`));
  console.groupEnd();

  console.group(`This page contains ${totalIssues.length} issues.`);

  totalIssues.forEach((ruleId, index) => {
    const count = failedOutcomes[ruleId];

    console.groupCollapsed(
      `${index + 1}. ${getRuleTitle(ruleId)} (${count} ${
        count > 1 ? "occurrences" : "occurrence"
      })`
    );
    console.groupEnd();
  });

  console.groupEnd();
  console.groupEnd();
}
