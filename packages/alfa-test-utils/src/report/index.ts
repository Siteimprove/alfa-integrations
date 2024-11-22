// git.js **MUST NOT** be re-exported automatically
// It depends on simple-git, that runs in Node and use node-specific functions
// imported through the `node:` protocol.
// Due to this:
// 1. It cannot properly run in other environments, like the browser; thus
//    making it useless for browser extensions, and hard to use in Cypress.
// 2. The mere fact of trying to bundle it for such environments (with Webpack or
//    the like) will crash the bundler.
// Therefore, we do not export it as part of the main package. It is still
// provided as a separate helper with its own `exports` path and has to be
// explicitly included in projects that need it.
// export * from "./git.js";

export * from "./commit-information.js"
export * from "./logging.js";
export * from "./sip.js";
