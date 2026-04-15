/// <reference types="node" />

import * as crypto from "node:crypto";
import * as fs from "node:fs";

import type { Question, Rule } from "@siteimprove/alfa-act";
import { Node } from "@siteimprove/alfa-dom";
import { Future } from "@siteimprove/alfa-future";
import type { Hashable } from "@siteimprove/alfa-hash";
import { None, Option } from "@siteimprove/alfa-option";
import type { Page } from "@siteimprove/alfa-web";

import type { Interviewer } from "@siteimprove/alfa-interviewer";

/**
 * A recorded question entry written to the questions file.
 *
 * @public
 */
export interface RecordedQuestion {
  /**
   * Stable key derived from rule URI + question URI + subject path + context
   * path. Used to match answers across passes.
   */
  key: string;
  ruleUri: string;
  questionUri: string;
  message: string;
  /**
   * The expected answer type as a string token from the Question `type` field.
   * One of: "boolean" | "node" | "node[]" | "color[]" | "string"
   */
  answerType: string;
  /**
   * XPath-style path produced by `Node.path(Node.fullTree)` for the question
   * subject. For non-Node subjects the value is the JSON representation.
   */
  subjectPath: string;
  /**
   * XPath-style path produced by `Node.path(Node.fullTree)` for the question
   * context (the test target). For non-Node contexts the value is the JSON
   * representation.
   */
  contextPath: string;
}

/**
 * Answers file format: a plain JSON object mapping question keys to answer
 * values.
 *
 * Answer values must match the `answerType` of the corresponding question:
 *  - "boolean"  → `true` | `false`
 *  - "node"     → `string` (XPath path of the node) | `null` (Option.none)
 *  - "node[]"   → `string[]` (XPath paths)
 *  - "color[]"  → not yet answerable via file; leave key absent
 *  - "string"   → `string`
 */
export type AnswerMap = Record<string, AnswerValue>;
export type AnswerValue = boolean | string | string[] | null;

function nodePath(value: unknown): string {
  if (
    value !== null &&
    typeof value === "object" &&
    "path" in value &&
    typeof (value as { path: (options?: unknown) => string }).path ===
      "function"
  ) {
    return (value as { path: (options?: unknown) => string }).path(
      Node.fullTree,
    );
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function makeKey(
  ruleUri: string,
  questionUri: string,
  subjectPath: string,
  contextPath: string,
): string {
  const raw = `${ruleUri}|${questionUri}|${subjectPath}|${contextPath}`;
  return crypto.createHash("sha256").update(raw).digest("hex").slice(0, 16);
}

/**
 * Resolve an answer value from the map into the correct runtime type.
 *
 * For "node" and "node[]" answers the value is an XPath path string. The
 * oracle cannot reconstruct a live Node from a path — the external system
 * must supply answers for "boolean" and "string" questions. Node-typed
 * questions cannot be answered via the file format and are treated as
 * unanswered (returns None).
 */
function resolveAnswer(
  answerType: string,
  raw: AnswerValue,
  nodeMap: Map<string, Node>,
): Option<unknown> {
  if (raw === null || raw === undefined) {
    return None;
  }

  switch (answerType) {
    case "boolean":
      return typeof raw === "boolean" ? Option.of(raw) : None;

    case "string":
      return typeof raw === "string" ? Option.of(raw) : None;

    case "node": {
      if (typeof raw !== "string") return None;
      const node = nodeMap.get(raw);
      return node !== undefined ? Option.of(node) : None;
    }

    case "node[]": {
      if (!Array.isArray(raw)) return None;
      const nodes = (raw as string[])
        .map((path) => nodeMap.get(path))
        .filter((n): n is Node => n !== undefined);
      return Option.of(nodes);
    }

    case "color[]":
      return None;

    default:
      return None;
  }
}

/**
 * Creates a recording interviewer.
 *
 * **Environment variables:**
 *  - `ALFA_INTERVIEWER_QUESTIONS` — path to write recorded questions (default:
 *    `./questions.json`). Existing content is merged so that questions from
 *    previous passes are preserved.
 *  - `ALFA_INTERVIEWER_ANSWERS` — path to an answers JSON file. When absent,
 *    all questions return `None` (pure recording pass).
 *
 * **Two-pass workflow:**
 * ```
 * # Pass 1 — record questions
 * ALFA_INTERVIEWER_QUESTIONS=./questions.json \
 *   alfa audit --url https://example.com --interviewer recording
 *
 * # External system reads questions.json, writes answers.json
 *
 * # Pass 2 — replay answers (new questions may arise and are appended)
 * ALFA_INTERVIEWER_QUESTIONS=./questions.json \
 * ALFA_INTERVIEWER_ANSWERS=./answers.json \
 *   alfa audit --url https://example.com --interviewer recording
 * ```
 *
 * @public
 */
export default function (): Interviewer<
  Page,
  Hashable,
  Question.Metadata,
  Hashable
> {
  const questionsFile =
    process.env["ALFA_INTERVIEWER_QUESTIONS"] ?? "./questions.json";
  const answersFile = process.env["ALFA_INTERVIEWER_ANSWERS"];

  // Load existing questions so that successive passes merge rather than reset.
  const existingQuestions: Map<string, RecordedQuestion> = new Map();
  if (fs.existsSync(questionsFile)) {
    try {
      const parsed = JSON.parse(
        fs.readFileSync(questionsFile, "utf-8"),
      ) as RecordedQuestion[];
      for (const q of parsed) {
        existingQuestions.set(q.key, q);
      }
    } catch {
      // Corrupted or empty file — start fresh.
    }
  }

  // Load answers if provided.
  const answers: AnswerMap = {};
  if (answersFile !== undefined && fs.existsSync(answersFile)) {
    try {
      Object.assign(
        answers,
        JSON.parse(fs.readFileSync(answersFile, "utf-8")) as AnswerMap,
      );
    } catch {
      // Answers file unreadable — proceed without answers.
    }
  }

  // Accumulates questions encountered during this audit run.
  const newQuestions: Map<string, RecordedQuestion> = new Map(
    existingQuestions,
  );

  // Flush accumulated questions to disk on process exit so that even questions
  // arising in the middle of an async audit are persisted.
  process.once("beforeExit", () => {
    const all = Array.from(newQuestions.values());
    fs.writeFileSync(questionsFile, JSON.stringify(all, null, 2) + "\n");
  });

  return (input, _rules) => {
    // Build path→Node map once per audit so node/node[] answers can be
    // resolved to live Node objects. fullTree covers shadow DOM and iframes.
    const nodeMap = new Map<string, Node>();
    for (const node of input.document.inclusiveDescendants(Node.fullTree)) {
      nodeMap.set(node.path(Node.fullTree), node);
    }

    return (
      rule: Rule<Page, Hashable, Question.Metadata, Hashable>,
      question: Question<unknown, Hashable, Hashable, unknown, unknown>,
    ) => {
      const ruleUri = rule.uri;
      const questionUri = String(question.uri);
      const subjectPath = nodePath(question.subject);
      const contextPath = nodePath(question.context);
      const key = makeKey(ruleUri, questionUri, subjectPath, contextPath);

      // Record the question if not seen before.
      if (!newQuestions.has(key)) {
        const recorded: RecordedQuestion = {
          key,
          ruleUri,
          questionUri,
          message: question.message,
          answerType: String(question.type),
          subjectPath,
          contextPath,
        };
        newQuestions.set(key, recorded);
      }

      // Provide an answer if available.
      const rawAnswer = answers[key];
      if (rawAnswer !== undefined) {
        const answerType = newQuestions.get(key)!.answerType;
        const answer = resolveAnswer(answerType, rawAnswer, nodeMap);
        return Future.now(
          answer as Option<Question.Metadata[keyof Question.Metadata][1]>,
        );
      }

      return Future.now(
        None as Option<Question.Metadata[keyof Question.Metadata][1]>,
      );
    };
  };
}
