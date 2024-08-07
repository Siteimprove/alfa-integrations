import type { Rule } from "@siteimprove/alfa-act";
import { Array } from "@siteimprove/alfa-array";
import { Performance as alfaPerformance } from "@siteimprove/alfa-performance";
import type { Flattened } from "@siteimprove/alfa-rules";

const { isMeasure } = alfaPerformance.Measure;

/**
 * Record various durations in an audit.
 *
 * @public
 */
export namespace Performance {
  const durationKeys = ["applicability", "expectation", "total"] as const;
  /** @internal */
  export type DurationKey = (typeof durationKeys)[number];
  type RuleDurations = { [K in DurationKey]: number };

  /**
   * For each rule (key), records time taken for the applicability,
   * the expectations, and total time.
   *
   * @public
   */
  export type RulesDurations = { [key: string]: RuleDurations };

  /** @internal */
  export function emptyRuleDurations(): RuleDurations {
    return { applicability: 0, expectation: 0, total: 0 };
  }

  const commonKeys = ["cascade", "aria-tree", "total"] as const;
  /** @internal */
  export type CommonKeys = (typeof commonKeys)[number];
  type CommonDurations = { [K in CommonKeys]: number };

  /**
   * Records the duration of resolving the CSS cascade, building the accessibility
   * tree, and running each rule.
   *
   * @remarks
   * The cascade and accessibility tree are cached, so we store their performance
   * separately to avoid unfairly "charging" the first rule to use and build them.
   *
   * @public
   */
  export type Durations = { common: CommonDurations; rules: RulesDurations };

  /** @internal */
  export function empty(): Durations {
    return {
      common: { cascade: 0, "aria-tree": 0, total: 0 },
      rules: {},
    };
  }

  /** @internal */
  export type RuleEvent = Rule.Event<
    Flattened.Input,
    Flattened.Target,
    Flattened.Question,
    Flattened.Subject
  >;

  /** @internal */
  export function recordRule(durations: Durations): alfaPerformance<RuleEvent> {
    return alfaPerformance.of<Performance.RuleEvent>().on((entry) => {
      if (isMeasure(entry)) {
        const ruleId = entry.data.rule.uri;

        if (durations.rules[ruleId] === undefined) {
          durations.rules[ruleId] = emptyRuleDurations();
        }
        if (Array.includes(durationKeys, entry.data.name)) {
          // Type is ensured by the previous test.
          durations.rules[ruleId][entry.data.name as DurationKey] =
            entry.duration;
        }
      }
    });
  }

  /** @internal */
  export function recordCommon(durations: Durations): alfaPerformance<string> {
    return alfaPerformance.of<string>().on((entry) => {
      if (isMeasure(entry) && Array.includes(commonKeys, entry.data)) {
        // Type is ensured by the previous check
        durations.common[entry.data as CommonKeys] = entry.duration;
      }
    });
  }
}
