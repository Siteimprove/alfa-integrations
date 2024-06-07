import { Question } from "@siteimprove/alfa-act";
import { Hashable } from "@siteimprove/alfa-hash";
import { Serializable, Log } from "@siteimprove/alfa-sarif";
import { Formatter } from "@siteimprove/alfa-formatter";

// This should be the alfa-rules version, but alfa-rules is not
// imported here. Anyway, checker version should probably be included
// in outcomes serialization rather than hacked here.
import * as pkg from "@siteimprove/alfa-act/package.json";
const version = pkg.version

const { stringify } = JSON;

/**
 * @public
 */
export default function <
  I,
  T extends Hashable,
  Q extends Question.Metadata,
  S
>(): Formatter<I, T, Q, S> {
  return function SARIF(input, rules, outcomes) {
    const log: Log = {
      $schema: "https://json.schemastore.org/sarif-2.1.0.json",
      version: "2.1.0",
      runs: [
        {
          tool: {
            driver: {
              name: "Alfa",
              informationUri: "https://alfa.siteimprove.com/",
              version,
              shortDescription: {
                text: "Suite of open and standards-based tools for performing reliable accessibility conformance testing at scale",
              },
              downloadUri: "https://github.com/siteimprove/alfa",
              organization: "Siteimprove A/S",
              rules: [...rules].map((rule) => rule.toSARIF()),
            },
          },
          artifacts: [...Serializable.toSARIF(input)],
          results: [...outcomes].map((outcome) => outcome.toSARIF()),
        },
      ],
    };

    return stringify(log, null, 2);
  };
}
