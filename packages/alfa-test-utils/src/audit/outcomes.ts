import { Lexer } from "@siteimprove/alfa-css";
import { Attribute, Element, Node } from "@siteimprove/alfa-dom";
import type { Predicate } from "@siteimprove/alfa-predicate";
import { Refinement } from "@siteimprove/alfa-refinement";
import { Selector } from "@siteimprove/alfa-selector";

import type { alfaOutcome } from "../common.js";

const { and, test } = Refinement;

/**
 * Collection of outcomes filters
 *
 * @public
 */
export namespace Outcomes {
  /**
   * Filter matching outcomes whose target has an ancestor matching a given selector.
   *
   * @remarks
   * Use to include, or exclude, outcomes inside a "container" element matching
   * the selector. For example, discard errors in a news feed whose content is
   * not under control, or keep only errors inside a navigation menu for a focused
   * audit.
   *
   * By default, the ancestor is searched in the flat tree, i.e. crossing
   * shadow boundaries and iframe boundaries. To stop at these,
   * `import { Node } from "@siteimprove/alfa-dom";` and use `Node.Traversal.empty`
   * as the second parameter.
   *
   * A few rules target more than a single node. Outcomes of these rules are
   * not matched by this filter. These rules are all producing cantTell outcomes
   * only, so handling them only matter if an oracle is also provided for the audit.
   */
  export function insideSelectorFilter(
    selector: string,
    traversal: Node.Traversal = Node.fullTree
  ): Predicate<alfaOutcome> {
    const sel = Selector.parse(Lexer.lex(selector)).getUnsafe(
      `Could not parse ${selector} as a CSS selector`
    )[1];

    return (outcome) =>
      test(
        and(Node.isNode, (node) =>
          node
            .inclusiveAncestors(traversal)
            .some(and(Element.isElement, sel.matches))
        ),
        outcome.target
      );
  }

  /**
   * Filter matching a given rule and CSS selector on the target, or its parent
   * in case of rules targeting an attribute.
   *
   * @remarks
   * Use to specifically exclude a few occurrences that should not be reported,
   * e.g. to focus the work on more urgent problems.
   */
  export function ruleAndIdFilter(
    ruleId: number,
    selector: string
  ): Predicate<alfaOutcome> {
    const sel = Selector.parse(Lexer.lex(selector)).getUnsafe(
      `Could not parse ${selector} as a CSS selector`
    )[1];

    return (outcome) =>
      outcome.rule.uri ===
        `https://alfa.siteimprove.com/rules/sia-r${ruleId}` &&
      ((Element.isElement(outcome.target) && sel.matches(outcome.target)) ||
        (Attribute.isAttribute(outcome.target) &&
          outcome.target.parent().some(and(Element.isElement, sel.matches))));
  }
}
