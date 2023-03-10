<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@siteimprove/alfa-command](./alfa-command.md) &gt; [Command](./alfa-command.command.md) &gt; [withSubcommands](./alfa-command.command.withsubcommands.md)

## Command.withSubcommands() method

**Signature:**

```typescript
static withSubcommands<F extends Command.Flags, S extends Command.Subcommands>(name: string, version: string, description: string, flags: F, subcommands: Mapper<Command, S>, parent?: Option<Command>, run?: (command: Command<F, {}, S>) => Command.Runner<F, {}>): Command<F, {}, S>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  name | string |  |
|  version | string |  |
|  description | string |  |
|  flags | F |  |
|  subcommands | Mapper&lt;[Command](./alfa-command.command.md)<!-- -->, S&gt; |  |
|  parent | Option&lt;[Command](./alfa-command.command.md)<!-- -->&gt; | _(Optional)_ |
|  run | (command: [Command](./alfa-command.command.md)<!-- -->&lt;F, {}, S&gt;) =&gt; [Command.Runner](./alfa-command.command.runner.md)<!-- -->&lt;F, {}&gt; | _(Optional)_ |

**Returns:**

[Command](./alfa-command.command.md)<!-- -->&lt;F, {}, S&gt;

