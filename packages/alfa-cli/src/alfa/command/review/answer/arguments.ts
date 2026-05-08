import { Argument } from "@siteimprove/alfa-command";

export const Arguments = {
  pairs: Argument.string(
    "answer",
    `An answer for a recorded question. Three forms are accepted:

      Positional  — bare value mapped to the next unanswered question in list
                    order (e.g. "false", "#ffffff", "/html/body/div[1]")
      By index    — 1-based index from 'alfa answer list', e.g. "2=false"
      By hash     — full question hash, e.g. "0d8c74b13e5c9582=#ffffff"

    Value formats by question type:
      boolean  — "true" or "false"
      node     — an XPath string, or "null" for no node
      node[]   — comma-separated XPath strings
      color[]  — comma-separated CSS color strings (e.g. "#ff0000")

    This argument can be repeated; positional and keyed forms may be mixed.`,
  )
    .repeatable()
    .optional(),
};
