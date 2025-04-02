[geodalib](../../../modules.md) / [core/src](../index.md) / percentileBreaks

# Function: percentileBreaks()

> **percentileBreaks**(`data`): `Promise`\<`number`[]\>

Defined in: [core/src/mapping/percentile-breaks.ts:25](https://github.com/GeoDaCenter/geoda-lib/blob/246bf05338fdf79294f778f8829940c18b17a0f8/js/packages/core/src/mapping/percentile-breaks.ts#L25)

## Description
Percentile Breaks divides the data into six ranges: the lowest 1%, 1-10%, 10-50%, 50-90%, 90-99% and the top 1%.

## Characteristics
- Fixed categories
- Effective for identifying spatial outliers and extreme values

## Parameters

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBufferLike`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.

## Example

```ts
import { percentileBreaks } from '@geoda/core';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const breaks = await percentileBreaks(data);

// breaks = [1, 1.4, 5, 8.6, 9]
```
