import { Audit as alfaAudit, Outcome } from "@siteimprove/alfa-act";
import { Node as ariaNode } from "@siteimprove/alfa-aria";
import { Cascade } from "@siteimprove/alfa-cascade";
import { Map } from "@siteimprove/alfa-map";
import { Performance as alfaPerformance } from "@siteimprove/alfa-performance";
import type { Predicate } from "@siteimprove/alfa-predicate";
import { alfaVersion, type Flattened } from "@siteimprove/alfa-rules";
import { Sequence } from "@siteimprove/alfa-sequence";
import type { Page } from "@siteimprove/alfa-web";

import * as json from "@siteimprove/alfa-json";

import type { alfaOutcome } from "../common.js";
import { Outcomes } from "./outcomes.js";
import { Performance } from "./performance.js";

import { Rules } from "./rules.js";

/**
 * An Alfa Audit
 *
 * @public
 */
export class Audit implements json.Serializable<Audit.JSON> {
  public static of(
    page: Page,
    outcomes: Map<string, Sequence<alfaOutcome>>,
    resultAggregates: Audit.ResultAggregates,
    durations: Performance.Durations
  ): Audit {
    return new Audit(page, outcomes, resultAggregates, durations);
  }

  private readonly _alfaVersion: typeof alfaVersion;
  private readonly _page: Page;
  private readonly _outcomes: Map<string, Sequence<alfaOutcome>>;
  private readonly _resultAggregates: Audit.ResultAggregates;
  private readonly _durations: Performance.Durations;

  private constructor(
    page: Page,
    outcomes: Map<string, Sequence<alfaOutcome>>,
    resultAggregates: Audit.ResultAggregates,
    durations: Performance.Durations
  ) {
    this._alfaVersion = alfaVersion;
    this._page = page;
    this._outcomes = outcomes;
    this._resultAggregates = resultAggregates;
    this._durations = durations;
  }

  /**
   * The version of Alfa used to run the audit.
   */
  public get alfaVersion(): typeof alfaVersion {
    return this._alfaVersion;
  }

  /**
   * The audited page (Alfa representation).
   */
  public get page(): Page {
    return this._page;
  }

  /**
   * The audit outcomes, sorted by rule.
   */
  public get outcomes(): Map<string, Sequence<alfaOutcome>> {
    return this._outcomes;
  }

  /**
   * Aggregated result per rule
   */
  public get resultAggregates(): Audit.ResultAggregates {
    return this._resultAggregates;
  }

  /**
   * Performance durations for the audit.
   */
  public get durations(): Performance.Durations {
    return this._durations;
  }

  public toJSON(): Audit.JSON {
    return {
      alfaVersion: this._alfaVersion,
      page: this._page.toJSON({ verbosity: json.Verbosity.High }),
      outcomes: Sequence.from(this._outcomes.values()).flatten().toJSON({
        verbosity: json.Verbosity.Minimal,
      }),
      resultAggregates: this._resultAggregates.toJSON(),
      durations: this._durations,
    };
  }
}

/**
 * An Alfa Audit
 *
 * @public
 */
export namespace Audit {
  export interface JSON {
    [key: string]: json.JSON;
    alfaVersion: typeof alfaVersion;
    page: Page.JSON;
    outcomes: Sequence.JSON<alfaOutcome>;
    resultAggregates: json.ToJSON<ResultAggregates>;
  }

  /**
   * Aggregated results for a given rule.
   *
   * @privateRemarks
   * Property names start with an uppercase letter despite usual JS conventions
   * so that we don't need to translate them when building the payload.
   */
  export type ResultAggregates = Map<
    string,
    { failed: number; passed: number; cantTell: number }
  >;

  /**
   * Audit a given page. Use the filters to select the rules to run, and
   * the outcomes to keep.
   */
  export async function run(
    page: Page,
    options: Options = {}
  ): Promise<Result> {
    const durations: Performance.Durations = Performance.empty();
    const commonPerformance = Performance.recordCommon(durations);
    const rulesPerformance = Performance.recordRule(durations);

    const start = commonPerformance.mark("total").start;
    sharedPerformance(commonPerformance, page);

    const rulesToRun =
      options.rules?.override ?? false
        ? options.rules?.custom ?? []
        : filter(Rules.allRules, options.rules).concat(
            options.rules?.custom ?? []
          );

    const audit = Sequence.from(
      await alfaAudit.of(page, rulesToRun).evaluate(rulesPerformance)
    );
    commonPerformance.measure("total", start);

    const outcomes = filter(audit, options.outcomes)
      .reject(
        options?.outcomes?.includeIFrames ?? false
          ? none
          : Outcomes.insideSelectorFilter("iframe")
      )
      .groupBy((outcome) => outcome.rule.uri);

    const resultAggregates = outcomes
      // For each rule, group by outcome
      .map((ruleOutcomes) => ruleOutcomes.groupBy((outcome) => outcome.outcome))
      // Count the size of each group and build the aggregates
      .map((groups, uri) => ({
        failed: groups.get(Outcome.Value.Failed).getOrElse(Sequence.empty).size,
        passed: groups.get(Outcome.Value.Passed).getOrElse(Sequence.empty).size,
        cantTell: groups.get(Outcome.Value.CantTell).getOrElse(Sequence.empty)
          .size,
      }));

    return {
      alfaVersion,
      page,
      outcomes,
      resultAggregates,
      durations,
    };
  }

  /**
   * Filter for including and excluding some items. If an item is both included
   * and excluded, it will be excluded.
   *
   * @public
   */
  export interface Filter<T> {
    include?: Predicate<T>;
    exclude?: Predicate<T>;
  }

  const all: Predicate<unknown> = () => true;
  const none: Predicate<unknown> = () => false;

  /**
   * @internal
   */
  export function filter<T>(
    sequence: Sequence<T>,
    filter: Filter<T> = {}
  ): Sequence<T> {
    return sequence
      .filter(filter.include ?? all)
      .reject(filter.exclude ?? none);
  }

  /**
   * Options for running Alfa audits.
   */
  export interface Options {
    /**
     * Filter rules to run from the Alfa rules; and custom rules to add.
     * (default: use all Alfa stable rules)
     */
    rules?: Filter<Flattened.Rule> & {
      /**
       * List of custom rules to add to the audit (default: none).
       */
      custom?: Iterable<Flattened.Rule>;
      /**
       * Whether the custom rules should replace existing rules or be added
       * to them (default: false / add to list).
       */
      override?: boolean;
    };

    /**
     * Filter outcomes to show.
     */
    outcomes?: Filter<alfaOutcome> & {
      /**
       * Whether to keep occurrences inside `<iframe>`
       * (default: false / discard them).
       */
      includeIFrames?: boolean;
    };
  }

  /**
   * Resolve Cascade and build the ARIA tree, while recording performance.
   *
   * @remarks
   * This ensures that these costly but cached operations are "charged" separately
   * and not unfairly on the first rule using them.
   */
  function sharedPerformance(
    performance: alfaPerformance<string>,
    page: Page
  ): void {
    const startCascade = performance.mark("cascade").start;
    Cascade.from(page.document, page.device);
    performance.measure("cascade", startCascade);

    const startAria = performance.mark("aria-tree").start;
    ariaNode.from(page.document, page.device);
    performance.measure("aria-tree", startAria);
  }
}
