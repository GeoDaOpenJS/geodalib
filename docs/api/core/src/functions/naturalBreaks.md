[geodalib](../../../modules.md) / [core/src](../index.md) / naturalBreaks

# Function: naturalBreaks()

> **naturalBreaks**(`k`, `data`): `Promise`\<`number`[]\>

Defined in: [core/src/mapping/natural-breaks.ts:31](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/mapping/natural-breaks.ts#L31)

## Description
The natural breaks (Jenks) algorithm breaks up the data into k classes by minimizing within-class variance
and maximizing between-class variance. The values in each group are as similar as possible to each other,
and as different as possible from the values in the other groups.

## Characteristics
- Based on natural groupings inherent in the data
- Similar values are grouped together
- Boundaries are set where there are relatively big jumps in data values
- Best for data with clear "breaks" in distribution

## Parameters

### k

`number`

The number of classes/categories

### data

The numeric values to be classified

`number`[] | `Float32Array`\<`ArrayBufferLike`\>

## Returns

`Promise`\<`number`[]\>

The breaks values

## Example

```ts
import { naturalBreaks } from '@geoda/core';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const k = 3;
const breaks = await naturalBreaks(k, data);

// breaks = [4, 7]
```
