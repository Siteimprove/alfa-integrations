---
"@siteimprove/alfa-react": minor
---

**Breaking:** `React.toPage` is now `async`. A new `React.toNode` function is available to return the (Alfa) JSON representation of the React root of a React node.

This adapts to React 19, mostly getting rid of `react-test-renderer` to render the React node before serializing them. We now use React renderer directly.
