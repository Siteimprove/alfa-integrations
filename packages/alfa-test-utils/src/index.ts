/**
 * A library for running Alfa tests and uploading results to the Siteimprove
 * Intelligence Platform.
 *
 * @packageDocumentation
 */
import version from "./version.js";
/**
 * @public
 */
export const codeCheckerVersion = version;

export * from "./common.js";
export * from "./audit/index.js";
export * from "./report/index.js";
