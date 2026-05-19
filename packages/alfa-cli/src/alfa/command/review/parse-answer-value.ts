import { Err, Ok, type Result } from "@siteimprove/alfa-result";

import type { AnswerValue } from "../common/question-store.js";

export function parseAnswerValue(
  raw: string,
  type: string,
): Result<AnswerValue, string> {
  switch (type) {
    case "boolean":
      if (raw === "true") {
        return Ok.of(true);
      }
      if (raw === "false") {
        return Ok.of(false);
      }
      break;
    case "node":
      return Ok.of<AnswerValue>(raw === "null" ? null : raw);
    case "node[]":
    case "color[]":
      return Ok.of<AnswerValue>(raw.split(","));
  }

  return Err.of(`Unrecognised value "${raw}" for type "${type}"`);
}
