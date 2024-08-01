import {
  Diagnostic,
  Outcome,
  Requirement,
  Rule,
  Tag,
} from "@siteimprove/alfa-act";
import type { Attribute, Element } from "@siteimprove/alfa-dom";
import { Record } from "@siteimprove/alfa-record";
import { Err } from "@siteimprove/alfa-result";
import type { Page } from "@siteimprove/alfa-web";

import type { alfaOutcome } from "../dist/index.js";

/**
 * @internal
 */
export function makeRule<T extends Attribute | Element>(
  id: number,
  target: T,
  requirements: Array<Requirement> = [],
  tags: Array<Tag> = []
): Rule.Atomic<Page, T> {
  return Rule.Atomic.of<Page, T>({
    uri: `https://alfa.siteimprove.com/rules/sia-r${id}`,
    requirements,
    tags,
    evaluate() {
      return {
        applicability: () => [target],
        expectations: (target) => ({
          1: Err.of(
            Diagnostic.of(
              `fake diagnostic (https://alfa.siteimprove.com/rules/sia-r${id})`
            )
          ),
        }),
      };
    },
  });
}

/**
 * @internal
 */
export function makeFailed<T extends Attribute | Element>(
  rule: Rule<Page, T>,
  target: T
): alfaOutcome {
  return Outcome.Failed.of(
    rule,
    target,
    Record.from([["1", Err.of(Diagnostic.of(`fake diagnostic (${rule.uri})`))]]),
    Outcome.Mode.Automatic
  );
}
