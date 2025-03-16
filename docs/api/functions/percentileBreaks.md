[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / percentileBreaks

# Function: percentileBreaks()

> **percentileBreaks**(`data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/percentile-breaks.ts:11](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/mapping/percentile-breaks.ts#L11)

The percentile breaks implementation.
The percentile breaks include: <= 1%, (1-10]%, (10-50]%, (50-90)%, [90-99)%, >= 99%

## Parameters

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBuffer`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.
