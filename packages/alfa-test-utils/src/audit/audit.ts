import { Audit as alfaAudit, Outcome } from "@siteimprove/alfa-act";
import type { Predicate } from "@siteimprove/alfa-predicate";
import { alfaVersion, type Flattened } from "@siteimprove/alfa-rules";
import { Sequence } from "@siteimprove/alfa-sequence";
import type { Page } from "@siteimprove/alfa-web";

import type { alfaOutcome } from "../common.js";

import { Rules } from "./rules.js";

/**
 * Running Alfa tests
 *
 * @public
 */
export namespace Audit {
  /**
   * The result of an audit.
   */
  export interface Result {
    /**
     * The version of Alfa used to run the audit.
     */
    alfaVersion: typeof alfaVersion;

    /**
     * The audited page (Alfa representation).
     */
    page: Page;

    /**
     * The audit outcomes.
     */
    outcomes: Sequence<alfaOutcome>;

    /**
     * Aggregated result per rule
     */
    ResultAggregates: Iterable<RuleAggregate>;
  }

  /**
   * Aggregated results for a given rule.
   *
   * @privateRemarks
   * Property names start with an uppercase letter despite usual JS conventions
   * so that we don't need to translate them when building the payload.
   */
  export interface RuleAggregate {
    RuleId: string;
    Failed: number;
    Passed: number;
    CantTell: number;
  }

  /**
   * Audit a given page. Use the filters to select the rules to run, and
   * the outcomes to keep.
   */
  export async function run(
    page: Page,
    options: Options = {}
  ): Promise<Result> {
    const rulesToRun =
      options.rules?.override ?? false
        ? options.rules?.custom ?? []
        : filter(Rules.allRules, options.rules).concat(
            options.rules?.custom ?? []
          );

    const outcomes = Sequence.from(
      await alfaAudit.of(page, rulesToRun).evaluate()
    );

    return {
      alfaVersion,
      page,
      outcomes: filter(outcomes, options.outcomes),
      ResultAggregates: aggregates(outcomes),
    };
  }

  /**
   * Build aggregated results for an audit
   *
   * @internal
   */
  export function aggregates(
    outcomes: Sequence<alfaOutcome>
  ): Iterable<RuleAggregate> {
    return (
      outcomes
        // Group by rule URI
        .groupBy((outcome) => outcome.rule.uri)
        // For each rule, group by outcome
        .map((ruleOutcomes) =>
          ruleOutcomes.groupBy((outcome) => outcome.outcome)
        )
        // Count the size of each group and build the aggregates
        .map((groups, uri) => ({
          RuleId: uri,
          Failed: groups.get(Outcome.Value.Failed).getOrElse(Sequence.empty)
            .size,
          Passed: groups.get(Outcome.Value.Passed).getOrElse(Sequence.empty)
            .size,
          CantTell: groups.get(Outcome.Value.CantTell).getOrElse(Sequence.empty)
            .size,
        }))
        .values()
    );
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
    outcomes?: Filter<alfaOutcome>;
  }
}
