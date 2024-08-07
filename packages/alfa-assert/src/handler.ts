import type { Rule, Outcome, Question } from "@siteimprove/alfa-act";
import type { Future } from "@siteimprove/alfa-future";
import type { Hashable } from "@siteimprove/alfa-hash";

/**
 * @public
 */
export interface Handler<
  I,
  T extends Hashable,
  Q extends Question.Metadata,
  S
> {
  (
    input: I,
    rules: Iterable<Rule<I, T, Q, S>>,
    outcomes: Iterable<Outcome<I, T, Q, S>>,
    message: string
  ): Future.Maybe<string>;
}
