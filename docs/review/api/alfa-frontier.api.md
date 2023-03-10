## API Report File for "@siteimprove/alfa-frontier"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Equatable } from '@siteimprove/alfa-equatable';
import * as json from '@siteimprove/alfa-json';
import { Option } from '@siteimprove/alfa-option';
import { Serializable } from '@siteimprove/alfa-json';
import { URL } from '@siteimprove/alfa-url';

// @public (undocumented)
export class Frontier implements Equatable, Serializable {
    complete(url: string | URL): boolean;
    dequeue(): Option<URL>;
    enqueue(url: string | URL): boolean;
    // (undocumented)
    equals(value: unknown): value is this;
    error(url: string | URL): boolean;
    // (undocumented)
    static from(json: Frontier.JSON): Frontier;
    // (undocumented)
    hasCompleted(): boolean;
    // (undocumented)
    hasInProgress(): boolean;
    // (undocumented)
    hasWaiting(): boolean;
    // (undocumented)
    isCompleted(url: string | URL): boolean;
    // (undocumented)
    isInProgress(url: string | URL): boolean;
    // (undocumented)
    isInScope(url: string | URL): boolean;
    isSeen(url: string | URL): boolean;
    isUnseen(url: string | URL): boolean;
    // (undocumented)
    isWaiting(url: string | URL): boolean;
    // (undocumented)
    static of(scope: string | URL, seed?: Iterable<string | URL>): Frontier;
    redirect(from: string | URL, to: string | URL): boolean;
    retry(url: string | URL): boolean;
    // (undocumented)
    get scope(): URL;
    // (undocumented)
    toJSON(): Frontier.JSON;
}

// @public (undocumented)
export namespace Frontier {
    // (undocumented)
    export function isFrontier(value: unknown): value is Frontier;
    // (undocumented)
    export interface JSON {
        // (undocumented)
        [key: string]: json.JSON;
        // Warning: (ae-forgotten-export) The symbol "Item" needs to be exported by the entry point index.d.ts
        //
        // (undocumented)
        items: Array<Item.JSON>;
        // (undocumented)
        scope: string;
    }
}

// (No @packageDocumentation comment for this package)

```
