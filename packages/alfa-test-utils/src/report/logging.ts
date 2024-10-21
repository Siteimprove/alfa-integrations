import { Array } from "@siteimprove/alfa-array";
import { Element, Query } from "@siteimprove/alfa-dom";
import { Equatable } from "@siteimprove/alfa-equatable";
import { Result } from "@siteimprove/alfa-result";
import { Sequence } from "@siteimprove/alfa-sequence";

import * as json from "@siteimprove/alfa-json";
import type { Thunk } from "@siteimprove/alfa-thunk";
import { Page } from "@siteimprove/alfa-web";

import chalk from "chalk";

import { Audit } from "../audit/index.js";
import { Outcome } from "@siteimprove/alfa-act";
import { getRuleTitle } from "./get-rule-title.js";

/**
 * @public
 */
export class LogGroup implements Equatable, json.Serializable<LogGroup.JSON> {
  public static of(title: string, logs?: Iterable<LogGroup>): LogGroup {
    return new LogGroup(title, Sequence.from(logs ?? []));
  }

  private readonly _title: string;
  private readonly _logs: Sequence<LogGroup>;

  private constructor(title: string, logs: Sequence<LogGroup>) {
    this._title = title;
    this._logs = logs;
  }

  public get title(): string {
    return this._title;
  }

  public get logs(): Iterable<LogGroup> {
    return this._logs;
  }

  public print(): void {
    console.group(this._title);
    this._logs.forEach((log) => log.print());
    console.groupEnd();
  }

  public equals(value: LogGroup): boolean;

  public equals(value: unknown): value is this;

  public equals(value: unknown): boolean {
    return (
      value instanceof LogGroup &&
      value._title === this._title &&
      value._logs.equals(this._logs)
    );
  }

  public toJSON(): LogGroup.JSON {
    return {
      title: this._title,
      logs: this._logs.toJSON(),
    };
  }
}

/**
 * @public
 */
export namespace LogGroup {
  export interface JSON {
    [name: string]: json.JSON;
    title: string;
    logs: Sequence.JSON<JSON>;
  }

  /** @internal */
  export namespace Defaults {
    export const Title = "Untitled";
  }

  export function isLogGroup(value: unknown): value is LogGroup {
    return value instanceof LogGroup;
  }

  /**
   * @internal
   */
  export function issueUrl(baseUrl: string, ruleId: string): string {
    return `${baseUrl}&conf=a+aa+aaa+aria+si&issue=cantTell+failed&wcag=twopointtwo#/${ruleId}/failed/`;
  }

  /**
   * @internal
   */
  export function fromAggregate(
    aggregate: Array<[string, { failed: number }]>,
    pageTitle?: string,
    pageReportUrl?: Result<string, string>
  ): LogGroup {
    return LogGroup.of("Siteimprove found accessibility issues:", [
      LogGroup.of(chalk.bold(`Page - ${pageTitle ?? Defaults.Title}`)),
      // "This page contains X issues: URL" (if URL)
      // "This page contains X issues." (otherwise)
      LogGroup.of(
        `This page contains ${aggregate.length} issues${
          Result.isOk(pageReportUrl) ? ": " + pageReportUrl.getUnsafe() : "."
        }`,
        aggregate.map(([ruleId, { failed }], index) =>
          // n. Issue Title (X occurrences)
          LogGroup.of(
            `${index + 1}. ${getRuleTitle(ruleId)} (${failed} occurrence${
              failed > 1 ? "s" : ""
            })`,
            // "Learn how to fix this issue: URL" (optional, if URL)
            pageReportUrl?.map((url) =>
              LogGroup.of(
                `Learn how to fix this issue: ${issueUrl(url, ruleId)}`
              )
            )
          )
        )
      ),
    ]);
  }

  export function fromAudit(
    audit: Audit | Audit.JSON,
    pageReportUrl?: Result<string, string>,
    options?: Options
  ): LogGroup {
    const page: Thunk<Page> = () =>
      Page.isPage(audit.page)
        ? audit.page
        : Page.from(audit.page).getUnsafe("Could not deserialize the page");
    const title =
      options?.pageTitle ??
      Query.getElementDescendants(page().document)
        .filter(Element.isElement)
        .find(Element.hasName("title"))
        .map((title) => title.textContent())
        .getOr(Defaults.Title);
    const pageTitle =
      typeof title === "string"
        ? title
        : title !== undefined
        ? title(page())
        : title;

    const filteredAggregates = Array.sortWith(
      (Audit.isAudit(audit)
        ? audit.resultAggregates.toArray()
        : audit.resultAggregates
      ).filter(([_, { failed }]) => failed > 0),
      ([uria], [urib]) => uria.localeCompare(urib)
    ).map(([url, aggregate]): [string, { failed: number }] => [
      url.split("/").pop() ?? "",
      aggregate,
    ]);
    return fromAggregate(filteredAggregates, pageTitle, pageReportUrl);
  }

  /**
   * @public
   */
  export interface Options {
    /**
     * The title of the page, or a function to build it from the audited page.
     * Defaults to the content of the first `<title>` element, if any.
     */
    pageTitle?: string | ((page: Page) => string);
  }
}

/**
 * Handling pretty-printing of console output.
 *
 * @public
 */
export namespace Logging {
  /**
   * Prepare logging information
   */
  export function prepare(audit: Audit | Audit.JSON): Record<string, number> {
    return Audit.isAudit(audit) ? prepareAudit(audit) : prepareJSON(audit);
  }

  function prepareJSON(audit: Audit.JSON): Record<string, number> {
    return {};
  }

  function prepareAudit(audit: Audit): Record<string, number> {
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
    audit: Audit,
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
