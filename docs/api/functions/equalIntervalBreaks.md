[geoda-wasm](../globals.md) / equalIntervalBreaks

# Function: equalIntervalBreaks()

> **equalIntervalBreaks**(`k`, `data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/equal-interval-breaks.ts:29](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/mapping/equal-interval-breaks.ts#L29)

## Description
Divides the range of values into equal-sized intervals.

## Characteristics
- Simple to understand and interpret
- Best for evenly distributed data
- May not represent data well when distribution is skewed
- Interval size = (maximum value - minimum value) / number of classes

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
import { equalIntervalBreaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const k = 3;
const breaks = await equalIntervalBreaks(k, data);

// breaks = [3.66666666666667, 6.33333333333333]
```
