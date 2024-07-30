import { Outcome } from "@siteimprove/alfa-act";
import type { Flattened as Rule } from "@siteimprove/alfa-rules";

/**
 * The type of individual outcomes produced by Alfa rules.
 *
 * @public
 */
export type alfaOutcome = Outcome<
  Rule.Input,
  Rule.Target,
  Rule.Question,
  Rule.Subject
>;
