import { test } from "@siteimprove/alfa-test";
import jsonld from "jsonld";

import earl, { ACTContext, assertor } from "../dist/earl.js";

const formatter = earl();

test("EARL() formats outcomes", async (t) => {
  /**
   * Since there is no rules nor outcomes in this test, compaction will pretty
   * much throw away everything, and we just test two ways of calling jsonld.compact.
   *
   * This effectively serves as a smoke test that the formatter is working.
   */
  const actual = JSON.parse(await formatter(1, [], []));

  const expected = await jsonld.compact(
    { "@context": ACTContext, "@graph": [assertor] } as jsonld.JsonLdDocument,
    ACTContext
  );

  t.deepEqual(actual, expected);
});
