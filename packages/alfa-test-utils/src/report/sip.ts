import { Outcome } from "@siteimprove/alfa-act";
import { Element, Query } from "@siteimprove/alfa-dom";
import { Serializable } from "@siteimprove/alfa-json";
import { alfaVersion, type Flattened as Rule } from "@siteimprove/alfa-rules";
import { Sequence } from "@siteimprove/alfa-sequence";
import { Page } from "@siteimprove/alfa-web";

import type { AxiosRequestConfig } from "axios";
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
   * @internal
   */
  export namespace Defaults {
    export const URL =
      "https://api.siteimprove.com/v2/a11y/AlfaDevCheck/CreateReport";
    export const Title = "Unnamed page";
    export const Name = "Accessibility Code Checker";
  }

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
   * Internal overload for tests, allowing
   * * a custom upload URL (use stage / dev URLs); and
   * * mocking timestamp (timestamp stability in tests).
   *
   * @internal
   */
  export async function upload(
    page: Page,
    outcomes: Iterable<alfaOutcome>,
    options: Options,
    override: { url?: string; timestamp?: number }
  ): Promise<string>;

  export async function upload(
    page: Page,
    outcomes: Iterable<alfaOutcome>,
    options: Options,
    override: { url?: string; timestamp?: number } = {}
  ): Promise<string> {
    const config = Metadata.axiosConfig(page, options, override);

    try {
      const axiosResponse = await axios.request(config);
      const { pageReportUrl, preSignedUrl, id } = axiosResponse.data;

      const response = await axios.request(
        S3.axiosConfig(id, preSignedUrl, page, outcomes)
      );

      return pageReportUrl;
    } catch (error) {
      console.error(error);
    }

    return "Could not retrieve a page report URL";
  }

  /**
   * @public
   */
  export interface Options {
    /**
     * The username to connect to the Siteimprove Intelligence Platform
     */
    userName: string;

    /**
     * The API key to connect to Siteimprove Intelligence Platform
     */
    apiKey: string;

    /**
     * The title of the page. Defaults to the content of the first `<title>` element,
     * if any.
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

  /**
   * Handling the metadata request to the Siteimprove API.
   *
   * @internal
   */
  export namespace Metadata {
    interface Payload {
      RequestTimeStampMilliseconds: number;
      Version: `${number}.${number}.${number}`;
      PageTitle: string;
      TestName: string;
    }

    /**
     * Prepare payload with metadata for creating pre-signed URL.
     */
    export function payload(
      PageTitle: string,
      TestName: string,
      timestamp: number
    ): Payload {
      return {
        RequestTimeStampMilliseconds: timestamp,
        Version: alfaVersion,
        PageTitle,
        TestName,
      };
    }

    /**
     * Configure parameters of axios request
     */
    export function params(url: string, apiKey: string): AxiosRequestConfig {
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
     * Prepare the configuration for the axios request
     */
    export function axiosConfig(
      page: Page,
      options: Options,
      override: { url?: string; timestamp?: number },
      defaultTitle = Defaults.Title,
      defaultName = Defaults.Name
    ): AxiosRequestConfig {
      const { url = Defaults.URL, timestamp = Date.now() } = override;

      const title =
        options.pageTitle ??
        Query.getElementDescendants(page.document)
          .filter(Element.isElement)
          .find(Element.hasName("title"))
          .map((title) => title.textContent())
          .getOr(defaultTitle);

      const name = options.testName ?? defaultName;

      return {
        ...params(url, `${options.userName}:${options.apiKey}`),
        data: JSON.stringify(payload(title, name, timestamp)),
      };
    }
  }

  /**
   * Handling the data request to the pre-signed S3 URL.
   *
   * @internal
   */
  export namespace S3 {
    interface Payload {
      Id: string;
      CheckResult: string;
      Aspects: string;
    }

    /**
     * Prepare payload with metadata for creating pre-signed URL.
     */
    /**
     * Prepare payload with Alfa page and results
     *
     * @internal
     */
    export function payload(
      Id: string,
      page: Page,
      outcomes: Iterable<alfaOutcome>
    ): Payload {
      return {
        Id,
        CheckResult: JSON.stringify(
          Sequence.from(outcomes).toJSON({
            verbosity: Verbosity.Minimal,
          })
        ),
        Aspects: JSON.stringify(page.toJSON({ verbosity: Verbosity.High })),
      };
    }

    /**
     * Configure parameters of axios request
     */
    export function params(url: string): AxiosRequestConfig {
      return {
        method: "put",
        maxBodyLength: Infinity,
        url,
        headers: { "Content-Type": "application/json" },
      };
    }

    /**
     * Prepare the configuration for the axios request
     */
    export function axiosConfig(
      id: string,
      url: string,
      page: Page,
      outcomes: Iterable<alfaOutcome>
    ): AxiosRequestConfig {
      return {
        ...params(url),
        data: new Blob([JSON.stringify(payload(id, page, outcomes))], {
          type: "application/json",
        }),
      };
    }
  }
}
