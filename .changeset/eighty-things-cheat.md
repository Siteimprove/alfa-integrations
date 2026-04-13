---
"@siteimprove/alfa-react": minor
---

**Breaking:** `React.toNode` and `React.toPage` now return `Future` rather than `Promise`.

`Future` can still be awaited like `Promise`.
