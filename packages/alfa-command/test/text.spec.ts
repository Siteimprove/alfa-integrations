import { test } from "@siteimprove/alfa-test";

import { Text } from "../dist/text.js";

test(".indent() indents all lines of text", (t) => {
  const text = `hello world\nhow are you?`;

  t.equal(Text.indent(text, 2), `  hello world\n  how are you?`);
});

test(".wrap() wraps all lines of text", (t) => {
  const text = `hello world\n\nhow are you?`;

  t.equal(Text.wrap(text, 7), `hello\nworld\n\nhow are\nyou?`);
});
