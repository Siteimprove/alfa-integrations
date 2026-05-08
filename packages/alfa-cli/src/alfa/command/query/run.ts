/// <reference types="node" />

import * as fs from "node:fs";

import type { Command } from "@siteimprove/alfa-command";
import { Node } from "@siteimprove/alfa-dom";
import { Err, Result } from "@siteimprove/alfa-result";
import { Page } from "@siteimprove/alfa-web";

import type { Arguments } from "./arguments.js";
import type { Flags } from "./flags.js";

export const run: Command.Runner<typeof Flags, typeof Arguments> = async ({
  flags,
  args: { file },
}) => {
  if (flags.take.isSome() && flags.node.isSome()) {
    return Err.of("--take cannot be used with --node");
  }

  if (flags.skip.isSome() && flags.node.isSome()) {
    return Err.of("--skip cannot be used with --node");
  }

  if (flags.take.isSome() && flags.take.getUnsafe() <= 0) {
    return Err.of("--take must be a positive integer");
  }

  if (flags.skip.isSome() && flags.skip.getUnsafe() < 0) {
    return Err.of("--skip must be a non-negative integer");
  }

  const json = file.isSome()
    ? fs.readFileSync(file.getUnsafe(), "utf-8")
    : fs.readFileSync(0, "utf-8");

  const resultData = JSON.parse(json);

  const pageResult = Page.from(resultData.input);

  if (pageResult.isErr()) {
    return Err.of(`Failed to parse input page: ${pageResult.getErrUnsafe()}`);
  }

  const page = pageResult.getUnsafe();

  // Build a lookup map from internalId to node once, using fullTree traversal
  // so shadow roots and nested browsing contexts (iframes) are included.
  const nodeById = new Map<string, Node>();
  for (const node of page.document.inclusiveDescendants(Node.fullTree)) {
    nodeById.set(node.internalId, node);
  }

  let output: string;

  if (flags.node.isSome()) {
    const internalId = flags.node.getUnsafe();
    const node = nodeById.get(internalId);

    if (node === undefined) {
      return Err.of(
        `No node with internalId "${internalId}" found in the page document`,
      );
    }

    switch (flags.format) {
      case "html":
        output = node.toString();
        break;
      case "json":
        output = JSON.stringify(node.toJSON({ device: page.device }), null, 2);
        break;
      default:
        output = node.path();
    }
  } else {
    const filter = flags.outcome.isSome()
      ? new Set<string>(flags.outcome.getUnsafe())
      : null;

    const filtered = (
      resultData.outcomes as Array<Record<string, unknown>>
    ).filter(
      (outcome) => filter === null || filter.has(outcome.outcome as string),
    );

    const skipped = flags.skip.isSome()
      ? filtered.slice(flags.skip.getUnsafe())
      : filtered;
    const limited = flags.take.isSome()
      ? skipped.slice(0, flags.take.getUnsafe())
      : skipped;

    const resolved = limited.map((outcome) => {
      const target = outcome.target as { internalId: string } | undefined;

      if (target === undefined) {
        // inapplicable outcomes carry no target
        return outcome;
      }

      const node = nodeById.get(target.internalId);

      let resolvedTarget: unknown;
      if (node === undefined) {
        resolvedTarget = null;
      } else {
        switch (flags.format) {
          case "html":
            resolvedTarget = node.toString();
            break;
          case "json":
            resolvedTarget = node.toJSON();
            break;
          default:
            resolvedTarget = node.path();
        }
      }

      return { ...outcome, target: resolvedTarget };
    });

    output = JSON.stringify(resolved, null, 2);
  }

  if (flags.output.isSome()) {
    fs.writeFileSync(flags.output.getUnsafe(), output + "\n");
    return Result.of("");
  }

  return Result.of(output);
};
