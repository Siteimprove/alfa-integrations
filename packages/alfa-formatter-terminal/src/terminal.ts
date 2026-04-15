import type { Question } from "@siteimprove/alfa-act";
import type { Formatter } from "@siteimprove/alfa-formatter";
import type { Hashable } from "@siteimprove/alfa-hash";
import type { ChalkInstance } from "chalk";
import chalk from "chalk";

type AnyOutcomeJSON = {
  outcome: string;
  rule?: {
    uri?: string;
    requirements?: Array<{ type: string; chapter?: string; title?: string }>;
  };
  mode?: string;
  target?: {
    type: string;
    name?: string | null;
    path?: string;
    attributes?: Array<{ name: string; value: string }>;
    data?: string;
    children?: Array<{ type: string; data?: string }>;
  };
  expectations?: Array<
    [
      string,
      {
        type: string;
        error?: { message?: string; name?: string };
        value?: { message?: string; name?: string };
      },
    ]
  >;
  diagnostic?: { message?: string };
};

const OUTCOME_COLOR: Record<string, ChalkInstance> = {
  failed: chalk.red,
  cantTell: chalk.yellow,
  passed: chalk.green,
};

const OUTCOME_ICON: Record<string, string> = {
  failed: "✖",
  cantTell: "?",
  passed: "✔",
};

function outcomeLabel(value: string): string {
  const color = OUTCOME_COLOR[value] ?? chalk.white;
  const icon = OUTCOME_ICON[value] ?? " ";
  return color.bold(`${icon} ${value}`);
}

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

function renderOccurrence(json: AnyOutcomeJSON): string {
  const wcag = (json.rule?.requirements ?? [])
    .filter((r) => r.type === "criterion" && r.chapter != null)
    .map((r) => (r.title ? `${r.chapter}: ${r.title}` : r.chapter!));

  const target = extractTarget(json.target);
  const messages = extractMessages(json);
  const accessibleName = extractAccessibleName(json);
  const innerText = accessibleName === undefined ? extractInnerText(json.target) : undefined;

  const lines: Array<string> = [];

  const header = [outcomeLabel(json.outcome)];
  if (target) header.push(chalk.dim(`(${target.label})`));
  if (wcag.length > 0) header.push(chalk.blue(`[WCAG ${wcag.join(", ")}]`));
  lines.push(header.join("  "));

  if (target?.path) {
    lines.push(`    ${chalk.dim("@ " + target.path)}`);
  }

  if (accessibleName !== undefined) {
    lines.push(`    ${chalk.dim("accessible name:")} "${accessibleName}"`);
  } else if (innerText !== undefined) {
    lines.push(`    ${chalk.dim("inner text:")} "${innerText}"`);
  }

  for (const msg of messages) {
    lines.push(`    ${chalk.dim("→")} ${msg}`);
  }

  return lines.join("\n");
}

/**
 * @public
 */
export default function <
  I,
  T extends Hashable,
  Q extends Question.Metadata,
  S,
>(): Formatter<I, T, Q, S> {
  return function Terminal(_input, _rules, outcomes) {
    const summary = { failed: 0, cantTell: 0, passed: 0 };
    // sections: outcome -> ruleId -> rendered occurrences
    const sections: Record<string, Map<string, Array<string>>> = {
      failed: new Map(),
      cantTell: new Map(),
      passed: new Map(),
    };

    for (const outcome of outcomes) {
      const json = outcome.toJSON() as AnyOutcomeJSON;
      const value = json.outcome;

      if (value === "inapplicable") continue;

      if (value in summary) summary[value as keyof typeof summary]++;

      if (value in sections) {
        const ruleUri = json.rule?.uri ?? "";
        const ruleId = ruleUri.split("/").pop() ?? ruleUri;

        if (!sections[value].has(ruleId)) {
          sections[value].set(ruleId, []);
        }
        sections[value].get(ruleId)!.push(renderOccurrence(json));
      }
    }

    const output: Array<string> = [];

    for (const value of ["failed", "cantTell", "passed"]) {
      const ruleMap = sections[value];
      if (ruleMap.size === 0) continue;

      const totalCount = [...ruleMap.values()].reduce((n, arr) => n + arr.length, 0);
      const color = OUTCOME_COLOR[value] ?? chalk.white;
      output.push(
        color.bold.underline(`\n${value.toUpperCase()} (${totalCount})`),
      );

      for (const [ruleId, occurrences] of ruleMap) {
        output.push(chalk.cyan.bold(`\n  ${ruleId} (${occurrences.length})`));
        output.push(occurrences.map((o) => `  ${o}`).join("\n\n"));
      }
    }

    output.push("\n" + chalk.bold("Summary"));
    output.push(
      [
        chalk.red.bold(`✖ Failed:      ${summary.failed}`),
        chalk.yellow.bold(`? Can't tell:  ${summary.cantTell}`),
        chalk.green.bold(`✔ Passed:      ${summary.passed}`),
      ].join("\n"),
    );

    return output.join("\n");
  };
}
