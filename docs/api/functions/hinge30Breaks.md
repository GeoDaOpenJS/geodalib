[geoda-wasm](../globals.md) / hinge30Breaks

# Function: hinge30Breaks()

> **hinge30Breaks**(`data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/box-breaks.ts:46](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/mapping/box-breaks.ts#L46)

The implementation of box breaks with hinge = 3.0
The categories include: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier

## Parameters

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBuffer`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.
