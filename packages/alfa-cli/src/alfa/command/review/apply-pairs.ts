import { Err, Ok, Result } from "@siteimprove/alfa-result";

import type { StoredAnswers, StoredQuestion } from "../common/question-store.js";
import { parseAnswerValue } from "./parse-answer-value.js";

export function applyPairs(
  existing: StoredAnswers,
  value: string,
  questions: StoredQuestion[],
): Result<StoredAnswers, string> {
  if (value.trim() === "") {
    return Err.of("--answer requires a non-empty value.");
  }

  const tokens = value.trim().split(/\s+/);
  const updated = { ...existing };
  const questionByHash = new Map(questions.map((q) => [q.hash, q]));

  for (const token of tokens) {
    const eqIdx = token.indexOf("=");

    if (eqIdx === -1) {
      return Err.of(
        `Invalid answer "${token}": expected hash=value format. Only hash=value pairs are supported.`,
      );
    }

    const hash = token.slice(0, eqIdx);
    const rawValue = token.slice(eqIdx + 1);

    if (hash === "") {
      return Err.of(
        `Invalid answer "${token}": empty hash. Expected hash=value format.`,
      );
    }

    if (/^\d+$/.test(hash)) {
      return Err.of(
        `Invalid answer "${token}": numeric index is not supported. Use hash=value format.`,
      );
    }

    const question = questionByHash.get(hash);
    if (question === undefined) {
      return Err.of(
        `Unknown question hash "${hash}". Run 'alfa review --start <url>' to see available hashes.`,
      );
    }

    const result = parseAnswerValue(rawValue, question.type);
    if (result.isErr()) {
      return result;
    }
    updated[hash] = result.getUnsafe();
  }

  return Ok.of(updated);
}
