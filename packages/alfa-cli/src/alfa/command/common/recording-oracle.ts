import type { Oracle } from "@siteimprove/alfa-act";
import type { Document } from "@siteimprove/alfa-dom";
import { Future } from "@siteimprove/alfa-future";
import { None, Option } from "@siteimprove/alfa-option";
import type { Flattened } from "@siteimprove/alfa-rules";

import type {
  StoredAnswers,
  StoredQuestion,
} from "../common/question-store.js";
import { createAnsweringOracle } from "./answering-oracle.js";
import { computeQuestionHash, getNodePath } from "./digest.js";

/**
 * Create an oracle that records every question asked during an audit and, when
 * pre-recorded answers are supplied, also resolves them so that dependent
 * questions (unlocked by a first-layer answer) are reached and recorded too.
 *
 * Duplicate questions (same URI + same element) are deduplicated by hash.
 *
 * @internal
 */
export function createRecordingOracle(
  answers?: StoredAnswers,
  document?: Document,
): {
  oracle: Oracle<
    Flattened.Input,
    Flattened.Target,
    Flattened.Question,
    Flattened.Subject
  >;
  getQuestions: () => ReadonlyArray<StoredQuestion>;
} {
  const seen = new Map<string, StoredQuestion>();
  const answeringOracle =
    answers !== undefined && document !== undefined
      ? createAnsweringOracle(answers, document)
      : undefined;

  return {
    oracle: (rule, question) => {
      const hash = computeQuestionHash(question.uri, question.subject);

      if (!seen.has(hash)) {
        seen.set(hash, {
          hash,
          uri: question.uri,
          type: question.type,
          message: question.message,
          subject: getNodePath(question.subject),
          context: getNodePath(question.context),
        });
      }

      // If we have stored answers, delegate to the answering oracle first so
      // dependent questions further down the tree are reached and recorded.
      if (answeringOracle !== undefined) {
        const resolved = answeringOracle(rule, question).get();
        if (resolved.isSome()) {
          return Future.now(resolved);
        }
      }

      return Future.now(None);
    },
    getQuestions: () => [...seen.values()],
  };
}
