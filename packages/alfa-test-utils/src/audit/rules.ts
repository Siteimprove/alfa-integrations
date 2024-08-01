import { Iterable } from "@siteimprove/alfa-iterable";
import type { Predicate } from "@siteimprove/alfa-predicate";
import { Refinement } from "@siteimprove/alfa-refinement";
import rules, { Scope } from "@siteimprove/alfa-rules";
import type { Flattened } from "@siteimprove/alfa-rules";
import type { Sequence } from "@siteimprove/alfa-sequence";
import { Conformance, Criterion } from "@siteimprove/alfa-wcag";

const { and } = Refinement;

/**
 * Collection of rules filter, and pre-filtered sets of rules.
 *
 * @public
 */
export namespace Rules {
  /**
   * All rules currently supported by Alfa.
   */
  export const allRules = rules;

  /**
   * Filter matching the AA conformance rules, i.e. rules for level A and AA
   * success criteria.
   *
   * @remarks
   * This considers rules for the latest recommendation, i.e. WCAG 2.2
   */
  export const aaFilter: Predicate<Flattened.Rule> = (rule) =>
    rule.hasRequirement(and(Criterion.isCriterion, Conformance.isAA()));
  /**
   * The AA conformance rules, i.e. rules for level A and AA success criteria.
   *
   * @remarks
   * This considers rules for the latest recommendation, i.e. WCAG 2.2
   */
  export const aaRules = allRules.filter(aaFilter);

  /**
   * Filter matching the WCAG 2.0 rules.
   */
  export const wcag20Filter: Predicate<Flattened.Rule> = (rule) =>
    rule.hasRequirement(
      and(Criterion.isCriterion, (criterion) =>
        Iterable.some(criterion.versions, (version) => version === "2.0")
      )
    );
  /**
   * The WCAG 2.0 rules.
   */
  export const wcag20Rules = allRules.filter(wcag20Filter);

  /**
   * Filter matching the WCAG 2.0 AA conformance rules.
   */
  export const wcag20aaFilter: Predicate<Flattened.Rule> = (rule) =>
    rule.hasRequirement(and(Criterion.isCriterion, Conformance.isAA("2.0")));
  /**
   * The WCAG 2.0 AA conformance rules.
   */
  export const wcag20aaRules = allRules.filter(wcag20aaFilter);

  /**
   * Filter matching the WCAG 2.1 AA conformance rules.
   */
  export const wcag21aaFilter: Predicate<Flattened.Rule> = (rule) =>
    rule.hasRequirement(and(Criterion.isCriterion, Conformance.isAA("2.1")));
  /**
   * The WCAG 2.1 AA conformance rules.
   */
  export const wcag21aaRules = allRules.filter(wcag21aaFilter);

  /**
   * Filter matching the "component" rules.
   *
   * @remarks
   * This discards rules that only make sense in the context of a full page, e.g.
   * skip link or presence of a title. It can be used to test design system pages
   * that contain a single component to showcase it.
   */
  export const componentFilter: Predicate<Flattened.Rule> = (rule) =>
    rule.hasTag((tag) => tag.equals(Scope.Component));
  /**
   * The "component" rules.
   *
   * @remarks
   * This discards rules that only make sense in the context of a full page, e.g.
   * skip link or presence of a title. It can be used to test design system pages
   * that contain a single component to showcase it.
   */
  export const componentRules = allRules.filter(componentFilter);

  /**
   * Filter to manually cherry-pick rules, by their id.
   *
   * @remarks
   * This can be use to specifically select, or reject, a handful of rules, for
   * example because they make no sense in a given context.
   */
  export function cherryPickFilter(
    rulesId: Array<number>
  ): Predicate<Flattened.Rule>;

  /**
   * Filter to manually cherry-pick rules, by their id.
   *
   * @remarks
   * This can be use to specifically select, or reject, a handful of rules, for
   * example because they make no sense in a given context.
   */
  export function cherryPickFilter(
    ...rulesId: Array<number>
  ): Predicate<Flattened.Rule>;

  export function cherryPickFilter(
    first: number | Array<number>,
    ...rulesId: Array<number>
  ): Predicate<Flattened.Rule> {
    const ids = typeof first === "number" ? [first, ...rulesId] : first;

    const rulesURIs = ids.map(
      (id) => `https://alfa.siteimprove.com/rules/sia-r${id}`
    );

    return (rule) => rulesURIs.includes(rule.uri);
  }

  /**
   * Helper to build a list of cherry-picked rules.
   */
  export function cherryPickRules(
    rulesId: Array<number>
  ): Sequence<Flattened.Rule>;

  /**
   * Helper to build a list of cherry-picked rules.
   */
  export function cherryPickRules(
    ...rulesId: Array<number>
  ): Sequence<Flattened.Rule>;

  export function cherryPickRules(
    first: number | Array<number>,
    ...rulesId: Array<number>
  ) {
    return allRules.filter(
      typeof first === "number"
        ? cherryPickFilter(first, ...rulesId)
        : cherryPickFilter(first)
    );
  }
}
