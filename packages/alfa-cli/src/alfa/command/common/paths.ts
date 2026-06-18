/// <reference types="node" />

import * as path from "node:path";

export const ALFA_DIR = path.resolve(".alfa");
export const QUESTIONS_PATH = path.join(ALFA_DIR, "questions.json");
export const ANSWERS_PATH = path.join(ALFA_DIR, "answers.json");
export const SESSION_PATH = path.join(ALFA_DIR, "session.json");
export const SCRAPE_PATH = path.join(ALFA_DIR, "scrape.json");
