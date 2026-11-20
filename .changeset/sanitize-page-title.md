---
"@siteimprove/alfa-test-utils": patch
---

**Fixed:** Text coming from the tested page, such as the page title, is now sanitized before being printed by `Logging`: whitespace is collapsed onto a single line, and control and bidirectional characters are escaped, so they cannot be interpreted by the terminal or forge extra log lines.
