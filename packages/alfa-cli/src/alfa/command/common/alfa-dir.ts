/// <reference types="node" />

import * as fs from "node:fs/promises";
import * as path from "node:path";

/**
 * @internal
 */
export const DEFAULT_ALFA_DIR = ".alfa";

/**
 * @internal
 */
export const QUESTIONS_FILE = "questions.json";

/**
 * @internal
 */
export const ANSWERS_FILE = "answers.json";

/**
 * @internal
 */
export const SESSION_FILE = "session.json";

/**
 * @internal
 */
export const SCRAPE_FILE = "scrape.json";

/**
 * Resolve the alfa directory to an absolute path.
 *
 * @internal
 */
export function resolveAlfaDir(alfaDir: string): string {
  return path.resolve(alfaDir);
}

/**
 * Get the path to the questions file within an alfa directory.
 *
 * @internal
 */
export function questionsPath(alfaDir: string): string {
  return path.join(resolveAlfaDir(alfaDir), QUESTIONS_FILE);
}

/**
 * Get the path to the answers file within an alfa directory.
 *
 * @internal
 */
export function answersPath(alfaDir: string): string {
  return path.join(resolveAlfaDir(alfaDir), ANSWERS_FILE);
}

/**
 * Get the path to the session file within an alfa directory.
 *
 * @internal
 */
export function sessionPath(alfaDir: string): string {
  return path.join(resolveAlfaDir(alfaDir), SESSION_FILE);
}

/**
 * Get the path to the cached scrape file within an alfa directory.
 *
 * @internal
 */
export function scrapePath(alfaDir: string): string {
  return path.join(resolveAlfaDir(alfaDir), SCRAPE_FILE);
}

/**
 * Create the alfa directory if it does not already exist.
 *
 * @internal
 */
export function ensureAlfaDir(alfaDir: string) {
  return fs.mkdir(resolveAlfaDir(alfaDir), { recursive: true });
}
