import type { Rule } from "@siteimprove/alfa-act";
import { Performance } from "@siteimprove/alfa-performance";
import type { Flattened } from "@siteimprove/alfa-rules";

const { isMeasure } = Performance.Measure;

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
export type Durations = {
  common: { [key: string]: number };
  rules: RuleDurations;
};

/**
 * For each rule (key), records time taken for `applicability` and
 * `expectation`.
 *
 * @public
 */
export type RuleDurations = {
  [key: string]: { [key: string]: number };
};

/**
 * @internal
 */
export type RuleEvent = Rule.Event<
  Flattened.Input,
  Flattened.Target,
  Flattened.Question,
  Flattened.Subject
>;

/**
 * @internal
 */
export function recordRule(
  ruleId: string,
  durations: Durations,
  entry: Performance.Entry<RuleEvent>
): void {
  if (isMeasure(entry)) {
    if (durations.rules[ruleId] === undefined) {
      durations.rules[ruleId] = {};
    }
    durations.rules[ruleId][entry.data.name] = entry.duration;
  }
}

/**
 * @internal
 */
export function recordCommon(
  durations: Durations,
  entry: Performance.Entry<string>
): void {
  if (isMeasure(entry)) {
    durations.common[entry.data] = entry.duration;
  }
}
