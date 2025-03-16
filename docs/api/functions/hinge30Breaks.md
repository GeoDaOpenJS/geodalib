[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / hinge30Breaks

# Function: hinge30Breaks()

> **hinge30Breaks**(`data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/box-breaks.ts:46](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/mapping/box-breaks.ts#L46)

The implementation of box breaks with hinge = 3.0
The categories include: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier

## Parameters

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBuffer`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.
