import { Array } from "@siteimprove/alfa-array";
import { Performance as alfaPerformance } from "@siteimprove/alfa-performance";

const { isMeasure } = alfaPerformance.Measure;

/**
 * Record various durations in an audit.
 *
 * @public
 */
export namespace Performance {
  const commonKeys = ["cascade", "aria-tree", "total"] as const;
  /** @internal */
  export type CommonKeys = (typeof commonKeys)[number];

  /**
   * Records the duration of resolving the CSS cascade, building the accessibility
   * tree, and running the full audit.
   *
   * @public
   */
  export type Durations = { [K in CommonKeys]: number };

  /** @internal */
  export function empty(): Durations {
    return { cascade: 0, "aria-tree": 0, total: 0 };
  }

  /** @internal */
  export function recordCommon(durations: Durations): alfaPerformance<string> {
    return alfaPerformance.of<string>().on((entry) => {
      if (isMeasure(entry) && Array.includes(commonKeys, entry.data)) {
        // Type is ensured by the previous check
        durations[entry.data as CommonKeys] = entry.duration;
      }
    });
  }
}
