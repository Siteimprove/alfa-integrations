import { Outcome } from "@siteimprove/alfa-act";
import { Element, Query } from "@siteimprove/alfa-dom";
import { Serializable } from "@siteimprove/alfa-json";
import { alfaVersion, type Flattened as Rule } from "@siteimprove/alfa-rules";
import { Sequence } from "@siteimprove/alfa-sequence";
import { Page } from "@siteimprove/alfa-web";

import type { AxiosResponse } from "axios";
import axios from "axios";

const { Verbosity } = Serializable;

type alfaOutcome = Outcome<
  Rule.Input,
  Rule.Target,
  Rule.Question,
  Rule.Subject
>;

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
    outcomes: Iterable<alfaOutcome>,
    options: Options
  ): Promise<string>;

  /**
   * Internal overload for tests, allowing a custom upload URL.
   *
   * @internal
   */
  export async function upload(
    page: Page,
    outcomes: Iterable<alfaOutcome>,
    options: Options,
    url: string
  ): Promise<string>;

  export async function upload(
    page: Page,
    outcomes: Iterable<alfaOutcome>,
    options: Options,
    url: string = "https://api.siteimprove.com/v2/a11y/AlfaDevCheck"
  ): Promise<string> {
    const title =
      options.pageTitle ??
      Query.getElementDescendants(page.document)
        .filter(Element.isElement)
        .find(Element.hasName("title"))
        .map((title) => title.textContent())
        .getOr("Unnamed page");

    const name = options.testName ?? "Accessibility Code Checker";

    const config = {
      ...params(url, options.apiKey),
      data: JSON.stringify(payload(page, outcomes, title, name)),
    };

    let pageReportURL: string | undefined = undefined;

    try {
      // Send the request and get the response URL
      const response: AxiosResponse = await axios.request(config);
      pageReportURL = response.data;
    } catch (error) {
      console.error(error);
    }

    return pageReportURL ?? "Could not retrieve a page report URL";
  }

  /**
   * Prepare payload with Alfa page and results
   *
   * @internal
   */
  export function payload(
    page: Page,
    outcomes: Iterable<alfaOutcome>,
    PageTitle: string,
    TestName: string
  ) {
    return {
      RequestTimeStampMilliseconds: Date.now(),
      Version: alfaVersion,
      CheckResult: Sequence.from(outcomes).toJSON({
        verbosity: Verbosity.Minimal,
      }),
      Aspects: page.toJSON({ verbosity: Verbosity.High }),
      PageTitle,
      TestName,
    };
  }

  /**
   * Configure parameters of axios request
   *
   * @internal
   */
  export function params(url: string, apiKey: string) {
    return {
      method: "post",
      maxBodyLength: Infinity,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(apiKey).toString("base64"),
      },
    };
  }

  /**
   * @public
   */
  export interface Options {
    /**
     * The API key to connect to Siteimprove Intelligence Platform
     */
    apiKey: string;

    /**
     * The title of the page. Default to the content of the first `<title>` element,
     * if any
     */
    pageTitle?: string;

    /**
     * A unique identifier for the test run, e.g. a git commit hash, branch name, …
     *
     * @remarks
     * Unicity is not required but is recommended to help separating unrelated runs.
     * Defaults to the generic "Accessibility Code Checker" if none is provided.
     */
    testName?: string;
  }
}
