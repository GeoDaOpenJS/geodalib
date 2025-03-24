[geoda-wasm](../globals.md) / standardDeviationBreaks

# Function: standardDeviationBreaks()

> **standardDeviationBreaks**(`data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/stddev-breaks.ts:11](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/mapping/stddev-breaks.ts#L11)

The standard deviation breaks implementation.
The standard deviation breaks include: < -2 std dev, [-2, -1) std dev, [-1, 0) std dev, [0, 1] std dev, (1, 2] std dev, > 2 std dev

## Parameters

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBuffer`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.
