import type { Predicate } from "@siteimprove/alfa-predicate";
import { Sequence } from "@siteimprove/alfa-sequence";
import { test } from "@siteimprove/alfa-test";

import { Audit } from "../../dist/audit/audit.js";

const isEven: Predicate<number> = (n) => n % 2 === 0;
const isTriple: Predicate<number> = (n) => n % 3 === 0;

const numbers = Sequence.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);

test(".filter keeps everything when no filter is provided", (t) => {
  t.deepEqual(Audit.filter(numbers, {}).toJSON(), numbers.toJSON());
});

test(".filter only includes specified items", (t) => {
  t.deepEqual(
    Audit.filter(numbers, { include: isEven }).toJSON(),
    [2, 4, 6, 8]
  );
});

test(".filter excludes specified items", (t) => {
  t.deepEqual(
    Audit.filter(numbers, { exclude: isEven }).toJSON(),
    [1, 3, 5, 7, 9]
  );
});

test(".filter prioritizes exclusion over inclusion", (t) => {
  t.deepEqual(
    Audit.filter(numbers, { include: isEven, exclude: isTriple }).toJSON(),
    [2, 4, 8]
  );
});
