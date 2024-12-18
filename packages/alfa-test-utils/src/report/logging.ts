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
import { getRuleTitle } from "./get-rule-title.js";

/**
 * Handling pretty-printing of console output.
 *
 * @public
 */
export class Logging implements Equatable, json.Serializable<Logging.JSON> {
  public static of(title: string, logs?: Iterable<Logging>): Logging {
    return new Logging(title, Sequence.from(logs ?? []));
  }

  private readonly _title: string;
  private readonly _logs: Sequence<Logging>;

  protected constructor(title: string, logs: Sequence<Logging>) {
    this._title = title;
    this._logs = logs;
  }

  public get title(): string {
    return this._title;
  }

  public get logs(): Iterable<Logging> {
    return this._logs;
  }

  public print(): void {
    console.group(this._title);
    this._logs.forEach((log) => log.print());
    console.groupEnd();
  }

  public equals(value: Logging): boolean;

  public equals(value: unknown): value is this;

  public equals(value: unknown): boolean {
    return (
      value instanceof Logging &&
      value._title === this._title &&
      value._logs.equals(this._logs)
    );
  }

  public toJSON(): Logging.JSON {
    return {
      title: this._title,
      logs: this._logs.toJSON(),
    };
  }
}

/**
 * @public
 */
export namespace Logging {
  export interface JSON {
    [name: string]: json.JSON;
    title: string;
    logs: Sequence.JSON<JSON>;
  }

  /** @internal */
  export namespace Defaults {
    export const Title = "Untitled";
  }

  export function isLogging(value: unknown): value is Logging {
    return value instanceof Logging;
  }

  /**
   * @internal
   */
  export function issueUrl(baseUrl: string, ruleId: string): string {
    return chalk.underline(
      `${baseUrl}&conf=a+aa+aaa+aria+si&issue=cantTell+failed&wcag=twopointtwo#/${ruleId}/failed/`
    );
  }

  function fromIssue(baseUrl: string, ruleId: string): Logging {
    return Logging.of(
      `Learn how to fix this issue: ${issueUrl(baseUrl, ruleId)}`
    );
  }

  /**
   * @internal
   */
  export function fromAggregate(
    aggregate: Array<[string, { failed: number }]>,
    pageTitle?: string,
    pageReportUrl?: Result<string, string> | string
  ): Logging {
    return Logging.of("Siteimprove found accessibility issues:", [
      Logging.of(chalk.bold(`Page - ${pageTitle ?? Defaults.Title}`)),
      // "This page contains X issues: URL" (if URL)
      // "This page contains X issues." (otherwise)
      Logging.of(
        `This page contains ${aggregate.length} issues${
          Result.isOk(pageReportUrl)
            ? ": " + chalk.underline(pageReportUrl.getUnsafe())
            : "."
        }`,
        aggregate.map(([ruleId, { failed }], index) =>
          // n. Issue Title (X occurrences)
          Logging.of(
            `${index + 1}. ${getRuleTitle(ruleId)} (${failed} occurrence${
              failed > 1 ? "s" : ""
            })`,
            // "Learn how to fix this issue: URL" (optional, if URL)
            typeof pageReportUrl === "string"
              ? [fromIssue(pageReportUrl, ruleId)]
              : pageReportUrl?.map((url) => fromIssue(url, ruleId))
          )
        )
      ),
    ]);
  }

  export function fromAudit(
    audit: Audit | Audit.JSON,
    pageReportUrl?: Result<string, string> | string,
    options?: Options
  ): Logging {
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
