/// <reference types="node" />

import * as crypto from "node:crypto";

import { Element, Node } from "@siteimprove/alfa-dom";

/**
 * Question URIs for which the element identity is based on its `src` attribute
 * rather than its DOM path (media element questions).
 *
 * @internal
 */
const SRC_BASED_URIS = new Set([
  "has-audio",
  "has-audio-track",
  "has-captions",
  "has-description",
  "is-audio-streaming",
  "is-playing",
  "is-video-streaming",
  "label",
  "play-button",
  "text-alternative",
  "track-describes-video",
  "transcript",
  "transcript-link",
  "audio-control-mechanism",
  "is-above-duration-threshold",
  "is-below-audio-duration-threshold",
]);

/**
 * Compute a stable hash key for a question+subject pair. The same question URI
 * asked about the same element (even across pages) produces the same hash,
 * enabling answer reuse.
 *
 * @internal
 */
export function computeQuestionHash(uri: string, subject: unknown): string {
  const hash = crypto.createHash("sha256");
  hash.update(uri);

  if (SRC_BASED_URIS.has(uri)) {
    hash.update(getElementSrc(subject));
  } else {
    hash.update(getNodePath(subject));
  }

  return hash.digest("hex").slice(0, 16);
}

/**
 * Get the XPath path of a DOM node, or an empty string if the subject is not
 * a node.
 *
 * @internal
 */
export function getNodePath(subject: unknown): string {
  return Node.isNode(subject) ? subject.path(Node.flatTree) : "";
}

function getElementSrc(subject: unknown): string {
  return Element.isElement(subject)
    ? subject
        .attribute("src")
        .map((a) => a.value)
        .getOr("")
    : "";
}
