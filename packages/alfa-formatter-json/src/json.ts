import type { Question } from "@siteimprove/alfa-act";
import type { Formatter } from "@siteimprove/alfa-formatter";
import type { Hashable } from "@siteimprove/alfa-hash";
import { Serializable } from "@siteimprove/alfa-json";

const { stringify } = JSON;

/**
 * @public
 */
export default function <
  I,
  T extends Hashable,
  Q extends Question.Metadata,
  S,
>(): Formatter<I, T, Q, S> {
  return function JSON(input, rules, outcomes) {
    return stringify(
      {
        // Serialize the page with High verbosity so every node includes its
        // internalId, enabling cross-referencing from outcomes.
        input: Serializable.toJSON(input, {
          verbosity: Serializable.Verbosity.High,
        }),
        rules: [...rules].map((rule) => rule.toJSON()),
        // Serialize outcome targets with Minimal verbosity so nodes are
        // emitted as { type, internalId } stubs that can be resolved by
        // looking up internalId in the serialized page above.
        outcomes: [...outcomes].map((outcome) =>
          outcome.toJSON({ verbosity: Serializable.Verbosity.Minimal }),
        ),
      },
      null,
      2,
    );
  };
}
