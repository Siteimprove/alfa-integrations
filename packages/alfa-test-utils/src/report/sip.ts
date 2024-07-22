import { Outcome } from "@siteimprove/alfa-act";
import { Serializable } from "@siteimprove/alfa-json";
import type { Flattened as Rule } from "@siteimprove/alfa-rules";
import { Sequence } from "@siteimprove/alfa-sequence";
import { Page } from "@siteimprove/alfa-web";

import type { AxiosResponse } from "axios";
import axios from "axios";

const { Verbosity } = Serializable;

/**
 * Interacting with Siteimprove Intelligence Platform (SIP) API.
 *
 * @public
 */
export namespace SIP {
  /**
   * Upload the results of an accessibility check to the Siteimprove Intelligence
   * Platform (SIP) API.
   *
   * @public
   */
  export async function upload(
    page: Page,
    outcomes: Iterable<
      Outcome<Rule.Input, Rule.Target, Rule.Question, Rule.Subject>
    >,
    options: Options
  ): Promise<void>;

  /**
   * Internal overload for tests, allowing a custom upload URL.
   *
   * @internal
   */
  export async function upload(
    page: Page,
    outcomes: Iterable<
      Outcome<Rule.Input, Rule.Target, Rule.Question, Rule.Subject>
    >,
    options: Options,
    url: string
  ): Promise<void>;

  export async function upload(
    page: Page,
    outcomes: Iterable<
      Outcome<Rule.Input, Rule.Target, Rule.Question, Rule.Subject>
    >,
    options: Options,
    url: string = "https://api.siteimprove.com/v2/a11y/AlfaDevCheck"
  ): Promise<void> {
    const data = JSON.stringify({
      RequestTimeStampMilliseconds: Date.now(),
      Version: "0.77.2",
      CheckResult: JSON.stringify(
        Sequence.from(outcomes).toJSON({ verbosity: Verbosity.Minimal })
      ),
      Aspects: JSON.stringify(
        page.toJSON({
          device: page.device,
          verbosity: Verbosity.High,
        })
      ),
      PageTitle: "Page Title",
      TestName: "A11y test",
    });

    // Configure Axios request for API submission
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(options.apiKey).toString("base64"),
      },
      data,
    };

    let pageReportURL: string | undefined = undefined;

    try {
      // Send the request and get the response URL
      const response: AxiosResponse = await axios.request(config);
      pageReportURL = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  interface Options {
    apiKey: string;
  }
}
