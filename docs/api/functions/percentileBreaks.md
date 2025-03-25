[geoda-wasm](../globals.md) / percentileBreaks

# Function: percentileBreaks()

> **percentileBreaks**(`data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/percentile-breaks.ts:25](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/mapping/percentile-breaks.ts#L25)

## Description
Percentile Breaks divides the data into six ranges: the lowest 1%, 1-10%, 10-50%, 50-90%, 90-99% and the top 1%.

## Characteristics
- Fixed categories
- Effective for identifying spatial outliers and extreme values

## Parameters

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBuffer`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.

## Example

```ts
import { percentileBreaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const breaks = await percentileBreaks(data);

// breaks = [1, 1.4, 5, 8.6, 9]
```
