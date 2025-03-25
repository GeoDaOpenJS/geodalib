[geoda-wasm](../globals.md) / hinge15Breaks

# Function: hinge15Breaks()

> **hinge15Breaks**(`data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/box-breaks.ts:48](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/mapping/box-breaks.ts#L48)

## Description
Hinge Box Breaks calculates a list of breakpoints, including the top, bottom, median, and two quartiles of the data, with hinge value 1.5.
The categories include: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier

## Characteristics
- Fixed categories
- Effective for detecting spatial outliers and understanding data distribution

## Parameters

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBuffer`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.

## Example

```ts
import { hinge15Breaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const breaks = await hinge15Breaks(data);

// breaks1 = [-4, 2.75, 5, 7.25, 14]
```
