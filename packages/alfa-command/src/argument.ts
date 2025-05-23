import type { Functor } from "@siteimprove/alfa-functor";
import type { Serializable } from "@siteimprove/alfa-json";
import type { Mapper } from "@siteimprove/alfa-mapper";
import { Option, None } from "@siteimprove/alfa-option";
import { Parser } from "@siteimprove/alfa-parser";
import type { Predicate } from "@siteimprove/alfa-predicate";
import { Result, Err } from "@siteimprove/alfa-result";
import { Refinement } from "@siteimprove/alfa-refinement";
import type { Thunk } from "@siteimprove/alfa-thunk";

import type * as json from "@siteimprove/alfa-json";
import type * as parser from "@siteimprove/alfa-parser";

/**
 * @public
 */
export class Argument<T = unknown>
  implements Functor<T>, Serializable<Argument.JSON> {
  public static of<T>(
    name: string,
    description: string,
    parse: Argument.Parser<T>
  ): Argument<T> {
    const options: Argument.Options = {
      default: None,
      optional: false,
      repeatable: false,
    };

    return new Argument(
      name,
      description.replace(/\s+/g, " ").trim(),
      options,
      parse
    );
  }

  private readonly _name: string;
  private readonly _description: string;
  private readonly _options: Argument.Options;
  private readonly _parse: Argument.Parser<T>;

  protected constructor(
    name: string,
    description: string,
    options: Argument.Options,
    parse: Argument.Parser<T>
  ) {
    this._name = name;
    this._description = description;
    this._options = options;
    this._parse = parse;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get options(): Argument.Options {
    return this._options;
  }

  public get parse(): Argument.Parser<T> {
    return this._parse;
  }

  public map<U>(mapper: Mapper<T, U>): Argument<U> {
    return new Argument(
      this._name,
      this._description,
      this._options,
      Parser.map(this._parse, mapper)
    );
  }

  public filter<U extends T>(
    refinement: Refinement<T, U>,
    ifError?: Thunk<string>
  ): Argument<U>;

  public filter(predicate: Predicate<T>, ifError?: Thunk<string>): Argument<T>;

  public filter(
    predicate: Predicate<T>,
    ifError: Thunk<string> = () => "Incorrect value"
  ): Argument<T> {
    return new Argument(
      this._name,
      this._description,
      this._options,
      Parser.filter(this._parse, predicate, ifError)
    );
  }

  public optional(): Argument<Option<T>> {
    return new Argument(
      this._name,
      this._description,
      {
        ...this._options,
        optional: true,
      },
      Parser.option(this._parse)
    );
  }

  public repeatable(): Argument<Iterable<T>> {
    return new Argument(
      this._name,
      this._description,
      {
        ...this._options,
        repeatable: true,
      },
      Parser.oneOrMore(this._parse)
    );
  }

  public default(value: T, label: string = `${value}`): Argument<T> {
    label = label.replace(/\s+/g, " ").trim();

    return new Argument(
      this._name,
      this._description,
      {
        ...this._options,
        optional: true,
        default: label === "" ? None : Option.of(label),
      },
      this._parse
    );
  }

  public choices<U extends T>(...choices: Array<U>): Argument<U> {
    return this.filter(Refinement.equals(...choices));
  }

  public toJSON(): Argument.JSON {
    return {
      name: this._name,
      description: this._description,
      options: {
        ...this._options,
        default: this._options.default.getOr(null),
      },
    };
  }
}

/**
 * @public
 */
export namespace Argument {
  export interface JSON {
    [key: string]: json.JSON;
    name: string;
    description: string;
    options: {
      [key: string]: json.JSON;
      optional: boolean;
      repeatable: boolean;
      default: string | null;
    };
  }

  export type Parser<T> = parser.Parser<Array<string>, T, string>;

  export interface Options {
    default: Option<string>;
    optional: boolean;
    repeatable: boolean;
  }

  export function string(name: string, description: string): Argument<string> {
    return Argument.of(name, description, (argv) => {
      const [value] = argv;

      if (value === undefined) {
        return Err.of("Missing value");
      }

      return Result.of([argv.slice(1), value]);
    });
  }

  export function number(name: string, description: string): Argument<number> {
    return Argument.of(name, description, (argv) => {
      const [value] = argv;

      if (value === undefined) {
        return Err.of("Missing value");
      }

      const number = Number(value);

      if (!Number.isFinite(number)) {
        return Err.of(`${value} is not a number`);
      }

      return Result.of([argv.slice(1), number]);
    });
  }

  export function integer(name: string, description: string): Argument<number> {
    return Argument.of(name, description, (argv) => {
      const [value] = argv;

      if (value === undefined) {
        return Err.of("Missing value");
      }

      const number = Number(value);

      if (!Number.isInteger(number)) {
        return Err.of(`${value} is not an integer`);
      }

      return Result.of([argv.slice(1), number]);
    });
  }

  export function boolean(
    name: string,
    description: string
  ): Argument<boolean> {
    return Argument.of(name, description, (argv) => {
      const [value] = argv;

      if (value === undefined) {
        return Err.of("Missing value");
      }

      if (value !== "true" && value !== "false") {
        return Err.of(`Incorrect value, expected one of "true", "false"`);
      }

      return Result.of([argv.slice(1), value === "true"]);
    });
  }
}
