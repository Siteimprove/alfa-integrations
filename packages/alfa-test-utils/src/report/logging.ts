import type { Result } from "@siteimprove/alfa-result";
import { Sequence } from "@siteimprove/alfa-sequence";

import chalk from "chalk";

import { Audit } from "../audit/index.js";

/**
 * Handling pretty-printing of console output.
 *
 * @public
 */
export namespace Logging {
  /**
   * Prepare logging information
   */
  export function prepare(
    audit: Audit.Result,
    pageReportURL?: Result<string, string>
  ): string {
    // Example
    const r1Outcomes = audit.outcomes
      .get("https://alfa.siteimprove.com/rules/sia-r1")
      .getOrElse(Sequence.empty);

    const r1Aggregates = audit.resultAggregates
      .get("https://alfa.siteimprove.com/rules/sia-r1")
      .getOr({ failed: 0, passed: 0, cantTell: 0 });

    if (pageReportURL === undefined) {
      return "No page report URL provided";
    }

    return pageReportURL.getOrElse(pageReportURL.getErrUnsafe);
  }

  /**
   * Print results of an audit.
   */
  export function console(
    audit: Audit.Result,
    pageReportURL?: Result<string, string>
  ): void {
    globalThis.console.log(prepare(audit, pageReportURL));
  }
}
