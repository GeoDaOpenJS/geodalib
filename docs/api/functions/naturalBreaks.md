[geoda-wasm](../globals.md) / naturalBreaks

# Function: naturalBreaks()

> **naturalBreaks**(`k`, `data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/natural-breaks.ts:11](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/mapping/natural-breaks.ts#L11)

The natural breaks (Jenks) algorithm to determine the best way to break up the data into k different groups.
The values in each group are as similar as possible to each other, and as different as possible from the values in the other groups.

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
