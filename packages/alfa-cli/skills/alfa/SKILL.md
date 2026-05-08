---
name: alfa
description: "Run accessibility audits using the Alfa CLI against local or remote web apps. Use when asked to audit accessibility, find WCAG failures, run alfa, check for a11y issues, or answer oracle interview questions."
---

## When to Use This Skill

- User asks to run an accessibility audit
- User wants to find WCAG failures on a page
- User mentions `alfa`, `a11y`, or `accessibility audit`
- User wants to understand or fix audit failures

## Prerequisites

- `alfa` CLI installed and on `$PATH`
- The target app is running and reachable (e.g. `http://localhost:5173/`)

## Workflow

### 1. Run the Review (Oracle Q&A)

Some checks cannot be automated and require human judgment. Run the review first to pre-answer these questions so the subsequent audit can resolve them automatically.

```bash
alfa review --start <url>
```

Alfa prints a list of questions. Each question has a **hash**, a **subject** (XPath to the node the question is about),
a **context** (XPath to a context node), a **type**, and a description. Answer them with:

```bash
alfa review --answer "hash1=value1" --answer "hash2=value2" ...
```

**ALWAYS** ask the user for confirmation before answering questions, unless explicitly told to autonomously find answers.

**DO NOT** use browser, curl etc. unless explicitly allowed.

- `boolean`: `true` or `false`.
- `color[]`: comma-separated CSS hex colors (e.g. `#16213e`).
- `node`: XPath string, or `null` if no such element exists.
- Only basic XPath syntax supported: "/html[1]/body[1]/div[2]"

Answering may unlock follow-up questions — keep running `alfa review --answer` until no new questions appear.

When all questions are processed, **always reset the session**:

```bash
alfa review --reset
```

### 2. Run the Audit

```bash
alfa audit -o .alfa/<name-of-page>.json <url>
```

Give the output file a meaningful name such as "home.json" or "about.json".

### 3. Query the Results

**Inspect the first issue:**

```bash
alfa query --take 1 .alfa/home.json
```

**Inspect the second issue:**

```bash
alfa query --skip 1 --take 1 .alfa/home.json
```

**Look up a specific node by internalId:**

```bash
alfa query --node <internalId> .alfa/home.json
```

Use flag `--format path|html|json` (Default `path`) to view different representations of nodes.

Report the issues. **DO NOT** fix issues unless the user specifically asks you to.
