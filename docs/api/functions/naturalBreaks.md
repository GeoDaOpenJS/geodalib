[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / naturalBreaks

# Function: naturalBreaks()

> **naturalBreaks**(`k`, `data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/natural-breaks.ts:11](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/mapping/natural-breaks.ts#L11)

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
