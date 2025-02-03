import { Array } from "@siteimprove/alfa-array";
import { Element, Query } from "@siteimprove/alfa-dom";
import { Equatable } from "@siteimprove/alfa-equatable";
import { Iterable } from "@siteimprove/alfa-iterable";

import * as json from "@siteimprove/alfa-json";
import { Err, Ok, Result } from "@siteimprove/alfa-result";
import { Sequence } from "@siteimprove/alfa-sequence";
import { Page } from "@siteimprove/alfa-web";

import chalk from "chalk";

import { Audit } from "../audit/index.js";
import { getRuleTitle } from "./get-rule-title.js";

/**
 * Handling pretty-printing of console output.
 *
 * @public
 */
export class Logging<S extends Logging.Severity = Logging.Severity>
  implements Equatable, json.Serializable<Logging.JSON>
{
  public static of(title: string, logs?: Iterable<Logging>): Logging<"log">;

  public static of<S extends Logging.Severity = "log">(
    title: string,
    severity: S,
    logs?: Iterable<Logging>
  ): Logging<S>;

  public static of<S extends Logging.Severity = "log">(
    title: string,
    severityOrLogs?: S | Iterable<Logging>,
    logs?: Iterable<Logging>
  ): Logging<S | "log"> {
    const innerLogs: Iterable<Logging> =
      typeof severityOrLogs === "string" ? logs ?? [] : severityOrLogs ?? [];

    const severity =
      typeof severityOrLogs === "string" ? severityOrLogs : "log";

    return new Logging(title, Sequence.from(innerLogs), severity);
  }

  private readonly _title: string;
  private readonly _logs: Sequence<Logging>;
  private readonly _severity: S;

  protected constructor(title: string, logs: Sequence<Logging>, severity: S) {
    this._title = title;
    this._logs = logs;
    this._severity = severity;
  }

  public get title(): string {
    return this._title;
  }

  public get logs(): Iterable<Logging> {
    return this._logs;
  }

  public print(): void {
    if (this._logs.isEmpty()) {
      console[this._severity](this._title);
    } else {
      console.group(this._title);
      this._logs.forEach((log) => log.print());
      console.groupEnd();
    }
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
      severity: this._severity,
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
    severity: Severity;
    logs: Sequence.JSON<JSON>;
  }

  /**
   * {@link https://console.spec.whatwg.org/#loglevel-severity}
   */
  export type Severity = "info" | "log" | "warn" | "error";

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
  export function errorTitle(n: number): string {
    return (
      "The following problem" +
      (n === 1 ? " was " : "s were ") +
      "encountered while uploading results to the Siteimprove Intelligence Platform:"
    );
  }

  /**
   * @internal
   */
  export function fromAggregate(
    aggregate: Array<[string, { failed: number }]>,
    pageTitle?: string,
    pageReportUrl?: Result<string, Array<string>> | string
  ): Logging {
    return Logging.of("Siteimprove found accessibility issues:", [
      // Show the page title
      Logging.of(chalk.bold(`Page - ${pageTitle ?? Defaults.Title}`)),

      // Show any error during upload: missing or invalid credentials, etc.
      ...(Err.isErr<Array<string>>(pageReportUrl)
        ? [
            Logging.of(
              errorTitle(pageReportUrl.getErr().length),
              pageReportUrl.getErr().map((error) => Logging.of(error, "warn"))
            ),
          ]
        : []),

      // "This page contains X issues: URL" (if URL)
      // "This page contains X issues." (otherwise)
      Logging.of(
        `This page contains ${aggregate.length} issues${
          Result.isOk(pageReportUrl)
            ? ": " + chalk.underline(pageReportUrl.get())
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
    pageReportUrl?: Result<string, Array<string>> | string,
    options?: Options
  ): Logging {
    // Retrieve or deserialize the page
    // We may waste a bit of time deserializing a page we won't need (if URL
    // and title are provided), but this streamlines error handling.
    const logs = (
      Page.isPage(audit.page) ? Ok.of(audit.page) : Page.from(audit.page)
    ).map((page) => {
      const title =
        options?.pageTitle ??
        Query.getElementDescendants(page.document)
          .filter(Element.isElement)
          .find(Element.hasName("title"))
          .map((title) => title.textContent())
          .getOr(Defaults.Title);
      const pageTitle =
        typeof title === "string"
          ? title
          : title !== undefined
          ? title(page)
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
    });

    return logs.getOrElse((error) =>
      Logging.of(`Could not deserialize the page: ${error}`, "error")
    );
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
