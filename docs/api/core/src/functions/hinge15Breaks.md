[geodalib](../../../modules.md) / [core/src](../index.md) / hinge15Breaks

# Function: hinge15Breaks()

> **hinge15Breaks**(`data`): `Promise`\<`number`[]\>

Defined in: [core/src/mapping/box-breaks.ts:48](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/mapping/box-breaks.ts#L48)

## Description
Hinge Box Breaks calculates a list of breakpoints, including the top, bottom, median, and two quartiles of the data, with hinge value 1.5.
The categories include: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier

## Characteristics
- Fixed categories
- Effective for detecting spatial outliers and understanding data distribution

## Parameters

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBufferLike`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.

## Example

```ts
import { hinge15Breaks } from '@geoda/core';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const breaks = await hinge15Breaks(data);

// breaks1 = [-4, 2.75, 5, 7.25, 14]
```
