[geoda-wasm](../globals.md) / quantileBreaks

# Function: quantileBreaks()

> **quantileBreaks**(`k`, `data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/quantile.ts:30](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/mapping/quantile.ts#L30)

## Description

Creates classes with equal number of observations by:
- Sorting values in ascending order
- Dividing sorted values into bins with equal number of observations

## Characteristics
- Well-suited for ordinal data
- May place similar values in different classes
- Useful for comparing relative rankings across different areas

## Parameters

### k

`number`

The number of classes/categories

### data

The numeric values to be classified

`number`[] | `Float32Array`\<`ArrayBuffer`\>

## Returns

`Promise`\<`number`[]\>

The breaks values

## Example

```ts
import { quantileBreaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const k = 3;
const breaks = await quantileBreaks(k, data);
// breaks = [3.5, 6.5]
```
