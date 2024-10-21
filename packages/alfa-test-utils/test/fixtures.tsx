import {
  Diagnostic,
  Outcome,
  Requirement,
  Rule,
  Tag,
} from "@siteimprove/alfa-act";
import { Device } from "@siteimprove/alfa-device";
import {
  type Attribute,
  Document,
  type Element,
  h,
} from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Map } from "@siteimprove/alfa-map";
import { Record } from "@siteimprove/alfa-record";
import { Err, Ok } from "@siteimprove/alfa-result";
import { alfaVersion } from "@siteimprove/alfa-rules";
import { URL } from "@siteimprove/alfa-url";
import { Page } from "@siteimprove/alfa-web";

import { type alfaOutcome, Audit, Performance, SIP } from "../dist/index.js";

const device = Device.standard();

/**
 * We need a unique timestamp to avoid instability.
 *
 * @internal
 */
export const timestamp = new Date().toISOString();

/**
 * @internal
 */
export function makeRule<T extends Attribute | Element>(
  id: number,
  target: T,
  requirements: Array<Requirement> = [],
  tags: Array<Tag> = []
): Rule.Atomic<Page, T> {
  return Rule.Atomic.of<Page, T>({
    uri: `https://alfa.siteimprove.com/rules/sia-r${id}`,
    requirements,
    tags,
    evaluate() {
      return {
        applicability: () => [target],
        expectations: (target) => ({
          1: Err.of(
            Diagnostic.of(
              `fake diagnostic (https://alfa.siteimprove.com/rules/sia-r${id})`
            )
          ),
        }),
      };
    },
  });
}

/**
 * @internal
 */
export function makeFailed<T extends Attribute | Element>(
  rule: Rule<Page, T>,
  target: T
): alfaOutcome {
  return Outcome.Failed.of(
    rule,
    target,
    Record.from([
      ["1", Err.of(Diagnostic.of(`fake diagnostic (${rule.uri})`))],
    ]),
    Outcome.Mode.Automatic
  );
}
/**
 * @internal
 */
export function makePassed<T extends Attribute | Element>(
  rule: Rule<Page, T>,
  target: T
): alfaOutcome {
  return Outcome.Passed.of(
    rule,
    target,
    Record.from([["1", Ok.of(Diagnostic.of(`fake diagnostic (${rule.uri})`))]]),
    Outcome.Mode.Automatic
  );
}

/**
 * @internal
 */
export function makePage(
  document: Document,
  response: Response = Response.of(URL.example(), 200)
): Page {
  return Page.of(Request.empty(), response, document, device);
}

const emptyAudit = Audit.of(
  makePage(h.document([<span></span>])),
  Map.empty(),
  Map.empty(),
  Performance.empty()
);

/**
 * @internal
 */
export function makeAudit(override: Partial<Audit> = {}): Audit {
  return Audit.of(
    override?.page ?? emptyAudit.page,
    override?.outcomes ?? emptyAudit.outcomes,
    override?.resultAggregates ?? emptyAudit.resultAggregates,
    override?.durations ?? emptyAudit.durations
  );
}

const emptyPayload: SIP.Metadata.Payload = {
  RequestTimestamp: timestamp,
  Version: alfaVersion,
  PageUrl: "https://example.com/",
  PageTitle: SIP.Defaults.Title,
  TestName: SIP.Defaults.Name,
  ResultAggregates: [],
  Durations: { Cascade: 0, AriaTree: 0, Total: 0 },
};

/**
 * @internal
 */
export function makePayload(
  override: Partial<SIP.Metadata.Payload> = {}
): SIP.Metadata.Payload {
  return { ...emptyPayload, ...override };
}
