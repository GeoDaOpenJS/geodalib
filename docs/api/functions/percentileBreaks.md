[geoda-wasm](../globals.md) / percentileBreaks

# Function: percentileBreaks()

> **percentileBreaks**(`data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/percentile-breaks.ts:11](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/mapping/percentile-breaks.ts#L11)

The percentile breaks implementation.
The percentile breaks include: <= 1%, (1-10]%, (10-50]%, (50-90)%, [90-99)%, >= 99%

## Parameters

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBuffer`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.
