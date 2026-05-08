import { QUESTION_DESCRIPTIONS } from "./question-descriptions.js";
import type {
  StoredAnswers,
  StoredQuestion,
} from "../common/question-store.js";

/**
 * Returns `word` pluralised based on `count`.
 *
 * @internal
 */
export function plural(count: number, word: string): string {
  return count === 1 ? word : `${word}s`;
}

/**
 * Format a list of unanswered questions for display on stdout.
 *
 * @internal
 */
export function formatUnanswered(
  questions: StoredQuestion[],
  answers: StoredAnswers,
): string {
  const unanswered = questions.filter((q) => !(q.hash in answers));

  if (unanswered.length === 0) {
    return "No unanswered questions.";
  }

  return unanswered
    .map((q, i) => {
      const enriched = QUESTION_DESCRIPTIONS[q.uri];
      return (
        `[${i + 1}] ${q.uri}\n` +
        `  Hash:      ${q.hash}\n` +
        `  Subject:   ${q.subject || "(document)"}\n` +
        `  Context:   ${q.context || "(document)"}\n` +
        `  Type:      ${q.type}  ${typeHint(q.type)}\n` +
        (enriched !== undefined ? `  ${enriched}` : `  ${q.message}`)
      );
    })
    .join("\n\n");
}

function typeHint(type: string): string {
  switch (type) {
    case "boolean":
      return "(true / false)";
    case "node":
      return '(XPath string, or "null" for no node)';
    case "node[]":
      return "(comma-separated XPath strings)";
    case "color[]":
      return '(comma-separated CSS colors, e.g. "#ffffff")';
    default:
      return "";
  }
}
