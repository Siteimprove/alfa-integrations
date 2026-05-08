/// <reference types="node" />

import * as fs from "node:fs";

/**
 * A question recorded during an audit run, ready to be answered.
 *
 * @public
 */
export interface StoredQuestion {
  /** Stable hash key for this question+subject pair. */
  hash: string;
  /** The question URI (e.g. "has-audio"). */
  uri: string;
  /** The JavaScript type name of the expected answer. */
  type: string;
  /** Human-readable question message. */
  message: string;
  /** XPath path of the question's subject node in the DOM. */
  subject: string;
  /** XPath path of the question's context node in the DOM. */
  context: string;
}

/**
 * The value stored for an answer, serialised as JSON.
 *
 * - `boolean` questions → `true` | `false`
 * - `node` questions → XPath string, or `null` for None
 * - `node[]` questions → array of XPath strings
 * - `color[]` questions → array of CSS color strings (e.g. `"#ff0000"`)
 *
 * @public
 */
export type AnswerValue = boolean | string | string[] | null;

/**
 * The answers file format: a map from question hash to answer value.
 *
 * @public
 */
export type StoredAnswers = Record<string, AnswerValue>;

/**
 * Read stored questions from a JSON file. Returns an empty array if the file
 * does not exist.
 *
 * @internal
 */
export function readQuestions(filePath: string): StoredQuestion[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as StoredQuestion[];
}

/**
 * Write stored questions to a JSON file.
 *
 * @internal
 */
export function writeQuestions(
  filePath: string,
  questions: StoredQuestion[],
): void {
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2) + "\n");
}

/**
 * Read stored answers from a JSON file. Returns an empty object if the file
 * does not exist.
 *
 * @internal
 */
export function readAnswers(filePath: string): StoredAnswers {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as StoredAnswers;
}

/**
 * Write stored answers to a JSON file.
 *
 * @internal
 */
export function writeAnswers(filePath: string, answers: StoredAnswers): void {
  fs.writeFileSync(filePath, JSON.stringify(answers, null, 2) + "\n");
}

/**
 * The session file format, written when a non-interactive answer session is
 * started with `alfa review <url>`.
 *
 * @public
 */
export interface StoredSession {
  /** The URL being audited in this session. */
  url: string;
  /** ISO-8601 timestamp of when the session was started. */
  startedAt: string;
}

/**
 * Read the active session from a JSON file. Returns `null` if no session file
 * exists.
 *
 * @internal
 */
export function readSession(filePath: string): StoredSession | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as StoredSession;
}

/**
 * Write a session to a JSON file.
 *
 * @internal
 */
export function writeSession(filePath: string, session: StoredSession): void {
  fs.writeFileSync(filePath, JSON.stringify(session, null, 2) + "\n");
}
