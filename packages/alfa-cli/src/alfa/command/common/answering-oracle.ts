import type { Oracle } from "@siteimprove/alfa-act";
import { Array } from "@siteimprove/alfa-array";
import { CSS4Color } from "@siteimprove/alfa-css";
import { Document, Node } from "@siteimprove/alfa-dom";
import { Future } from "@siteimprove/alfa-future";
import { None, Option } from "@siteimprove/alfa-option";
import type { Flattened } from "@siteimprove/alfa-rules";

import { computeQuestionHash } from "./digest.js";
import type { StoredAnswers } from "./question-store.js";

/**
 * Create an oracle that resolves questions using pre-recorded answers.
 *
 * For each question, the oracle computes the same hash used during recording
 * and looks up the stored answer. Questions without a matching answer return
 * `None`, resulting in a `cantTell` outcome for that rule.
 *
 * ## Answer type semantics
 *
 * The Oracle return type is `Future<Option<ANSWER>>` where the outer `Option`
 * signals whether the oracle has an answer at all (`None` = cantTell), and
 * `Some(value)` means the question is answered with `value`. ANSWER is defined
 * per question type in `Question.Type` in alfa-rules:
 *
 * - **`boolean`**: ANSWER is `boolean`. Returns `Some(true|false)`, or `None`
 *   if the stored value is not a boolean.
 *
 * - **`node`**: ANSWER is `Option<Node>`, so the return is `Future<Option<Option<Node>>>`:
 *   - `None` — no stored answer, cantTell
 *   - `Some(None)` — answered "no node"
 *   - `Some(Some(node))` — answered with a specific node
 *
 * - **`node[]`**: ANSWER is `Iterable<Node>`. Returns `Some(nodes)` if every
 *   stored path resolves to a node (including the empty array), `None` if any
 *   path is missing or unresolvable.
 *
 * - **`color[]`**: ANSWER is `Iterable<CSS4Color>`. Returns `Some(colors)` if
 *   every stored value is a valid colour and the array is non-empty, `None`
 *   otherwise.
 *
 * @internal
 */
export function createAnsweringOracle(
  answers: StoredAnswers,
  document: Document,
): Oracle<
  Flattened.Input,
  Flattened.Target,
  Flattened.Question,
  Flattened.Subject
> {
  return (_rule, question) => {
    const hash = computeQuestionHash(question.uri, question.subject);
    const rawAnswer = answers[hash];

    if (rawAnswer === undefined) {
      return Future.now(None);
    }

    if (question.type === "boolean") {
      // Raw answer should be boolean (`true` or `false`), otherwise it's invalid
      // and we silently drop it and leave the question unanswered.
      return Future.now(
        typeof rawAnswer === "boolean" ? Option.of(rawAnswer) : None,
      );
    }

    if (question.type === "node") {
      // Raw answer should be either a string with a valid XPath or `null`.

      // `null` is an answer that means "no node", i.e. Option.of(None).
      if (rawAnswer === null) {
        return Future.now(Option.of(None));
      }

      // If the answer is a string that is not an XPath for a node in the document,
      // we silently drop it and leave the question unanswered.
      if (typeof rawAnswer === "string") {
        const node = findNodeByPath(document, rawAnswer);
        return Future.now(node.isSome() ? Option.of(node) : None);
      }

      // Everything else is invalid, we silently drop it and leave the question unanswered.
      return Future.now(None);
    }

    if (question.type === "node[]") {
      // Raw answer should always be an array of strings.
      if (Array.isArray(rawAnswer)) {
        // An empty array is an answer meaning "no nodes".
        if (Array.isEmpty(rawAnswer)) {
          return Future.now(Option.of(rawAnswer));
        }

        // If the answer contains strings that are not XPaths for an element in the document,
        // we silently drop it an leave the question unanswered.
        const validAnswers = Array.collect(
          rawAnswer
            .filter((p): p is string => typeof p === "string")
            .map((p) => findNodeByPath(document, p)),
          (x) => x,
        );

        return Future.now(
          validAnswers.length === rawAnswer.length
            ? Option.of(validAnswers)
            : None,
        );
      }

      return Future.now(None);
    }

    if (question.type === "color[]") {
      // Raw answer should always be an array of strings that a valid color values.
      // The answer must contain at least one color, otherwise we leave the question unanswered.
      if (Array.isArray(rawAnswer) && !Array.isEmpty(rawAnswer)) {
        // If the answer contains strings that are not valid colors,
        // we silently drop it an leave the question unanswered.
        const validAnswers = rawAnswer
          .map((c) => CSS4Color.of(c))
          .filter((r) => r.isOk())
          .map((r) => r.getUnsafe());

        return Future.now(
          validAnswers.length === rawAnswer.length
            ? Option.of(validAnswers)
            : None,
        );
      }

      return Future.now(None);
    }

    return Future.now(None);
  };
}

function findNodeByPath(document: Document, targetPath: string): Option<Node> {
  if (!targetPath) {
    return None;
  }

  for (const node of document.descendants(Node.flatTree)) {
    if (node.path(Node.flatTree) === targetPath) {
      return Option.of(node);
    }
  }

  return None;
}
