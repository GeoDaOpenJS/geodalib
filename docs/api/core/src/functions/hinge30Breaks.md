[geodalib](../../../modules.md) / [core/src](../index.md) / hinge30Breaks

# Function: hinge30Breaks()

> **hinge30Breaks**(`data`): `Promise`\<`number`[]\>

Defined in: [core/src/mapping/box-breaks.ts:76](https://github.com/GeoDaCenter/geoda-lib/blob/9716a45cca9cf3b644d6187deeb842d47f2b7a3a/js/packages/core/src/mapping/box-breaks.ts#L76)

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

// breaks2 = [-10.75, 2.75, 5, 7.25, 20.75]
```
