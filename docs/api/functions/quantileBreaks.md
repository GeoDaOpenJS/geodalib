[geoda-wasm](../globals.md) / quantileBreaks

# Function: quantileBreaks()

> **quantileBreaks**(`k`, `data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/quantile.ts:10](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/mapping/quantile.ts#L10)

The quantile breaks algorithm to determine the best way to break up the data into k groups. Each group has the same number of observations.

## Parameters

### k

`number`

The number of classes/categories

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBuffer`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.
