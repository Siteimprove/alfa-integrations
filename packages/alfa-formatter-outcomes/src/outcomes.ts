import type { Question } from "@siteimprove/alfa-act";
import type { Formatter } from "@siteimprove/alfa-formatter";
import type { Hashable } from "@siteimprove/alfa-hash";

type AnyOutcomeJSON = {
  outcome: string;
  rule?: { uri?: string; requirements?: Array<{ type: string; chapter?: string; title?: string }> };
  mode?: string;
  target?: {
    type: string;
    name?: string | null;
    path?: string;
    attributes?: Array<{ name: string; value: string }>;
    data?: string;
    children?: Array<{ type: string; data?: string }>;
  };
  expectations?: Array<[string, { type: string; error?: { message?: string; name?: string }; value?: { message?: string; name?: string } }]>;
  diagnostic?: { message?: string };
};

function extractTarget(target: AnyOutcomeJSON["target"]): { label: string; path?: string } | undefined {
  if (!target) return undefined;
  if (target.type === "element" && target.name) {
    const attrs = target.attributes ?? [];
    const id = attrs.find((a) => a.name === "id")?.value;
    const cls = attrs.find((a) => a.name === "class")?.value;
    const href = attrs.find((a) => a.name === "href")?.value;
    const src = attrs.find((a) => a.name === "src")?.value;
    let label = `<${target.name}`;
    if (id) label += `#${id}`;
    if (cls) label += `.${cls.trim().replace(/\s+/g, ".")}`;
    if (href) label += ` href="${href}"`;
    else if (src) label += ` src="${src}"`;
    label += ">";
    return { label, path: target.path };
  }
  if (target.type === "text" && target.data !== undefined) {
    const excerpt = target.data.trim().replace(/\s+/g, " ");
    const truncated = excerpt.length > 60 ? excerpt.slice(0, 60) + "…" : excerpt;
    return { label: `"${truncated}"`, path: target.path };
  }
  return { label: target.type, path: target.path };
}

function extractInnerText(target: AnyOutcomeJSON["target"]): string | undefined {
  if (!target || target.type !== "element") return undefined;
  const text = (target.children ?? [])
    .filter((c) => c.type === "text" && c.data !== undefined)
    .map((c) => c.data!.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ");
  if (!text) return undefined;
  return text.length > 80 ? text.slice(0, 80) + "…" : text;
}

function extractAccessibleName(outcome: AnyOutcomeJSON): string | undefined {
  for (const [, exp] of outcome.expectations ?? []) {
    const name = exp.error?.name ?? exp.value?.name;
    if (name) return name;
  }
  return undefined;
}

function extractMessages(outcome: AnyOutcomeJSON): Array<string> {
  const messages: Array<string> = [];

  if (outcome.expectations) {
    for (const [, exp] of outcome.expectations) {
      if (exp.type === "err" && exp.error?.message) {
        messages.push(exp.error.message);
      } else if (exp.type === "ok" && exp.value?.message) {
        messages.push(exp.value.message);
      }
    }
  }

  if (outcome.diagnostic?.message) {
    messages.push(outcome.diagnostic.message);
  }

  return messages;
}

/**
 * @public
 */
export default function <
  I,
  T extends Hashable,
  Q extends Question.Metadata,
  S
>(): Formatter<I, T, Q, S> {
  return function OutcomesJSON(_input, _rules, outcomes) {
    const summary = { failed: 0, cantTell: 0, passed: 0 };
    const byRule: Record<string, { ruleUri: string; wcag: Array<{ chapter: string; title?: string }>; occurrences: Array<Record<string, unknown>> }> = {};

    for (const outcome of outcomes) {
      const json = outcome.toJSON() as AnyOutcomeJSON;
      const value = json.outcome;

      if (value === "inapplicable") continue;

      if (value === "failed") summary.failed++;
      else if (value === "cantTell") summary.cantTell++;
      else if (value === "passed") summary.passed++;

      const ruleUri = json.rule?.uri ?? "";
      const ruleId = ruleUri.split("/").pop() ?? ruleUri;
      const wcag = (json.rule?.requirements ?? [])
        .filter((r) => r.type === "criterion" && r.chapter != null)
        .map((r) => ({ chapter: r.chapter!, ...(r.title ? { title: r.title } : {}) }));

      if (!byRule[ruleId]) {
        byRule[ruleId] = { ruleUri, wcag, occurrences: [] };
      }

      const occurrence: Record<string, unknown> = {
        outcome: value,
        mode: json.mode,
      };

      const target = extractTarget(json.target);
      if (target !== undefined) {
        occurrence.target = target.label;
        if (target.path !== undefined) occurrence.path = target.path;
      }

      const accessibleName = extractAccessibleName(json);
      if (accessibleName !== undefined) {
        occurrence.accessibleName = accessibleName;
      } else {
        const innerText = extractInnerText(json.target);
        if (innerText !== undefined) occurrence.innerText = innerText;
      }

      const messages = extractMessages(json);
      if (messages.length > 0) {
        occurrence.messages = messages;
      }

      byRule[ruleId].occurrences.push(occurrence);
    }

    const outcomes_output = Object.entries(byRule).map(([ruleId, { ruleUri, wcag, occurrences }]) => {
      const entry: Record<string, unknown> = { rule: ruleId, ruleUri, occurrences };
      if (wcag.length > 0) entry.wcag = wcag;
      return entry;
    });

    return JSON.stringify({ summary, outcomes: outcomes_output }, null, 2);
  };
}
