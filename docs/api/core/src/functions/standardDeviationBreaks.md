[geodalib](../../../modules.md) / [core/src](../index.md) / standardDeviationBreaks

# Function: standardDeviationBreaks()

> **standardDeviationBreaks**(`data`): `Promise`\<`number`[]\>

Defined in: [core/src/mapping/stddev-breaks.ts:28](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/mapping/stddev-breaks.ts#L28)

## Description
The standard deviation breaks classes based on distance from the mean in standard deviation units.
The standard deviation breaks include: < -2 std dev, [-2, -1) std dev, [-1, 0) std dev, [0, 1] std dev, (1, 2] std dev, > 2 std dev

## Characteristics
- Centers on the mean value
- Classes represent standard deviation intervals
- Most appropriate for normally distributed data
- Helps identify areas that deviate significantly from the mean

## Parameters

### data

The numeric values to be classified.

`number`[] | `Float32Array`\<`ArrayBufferLike`\>

## Returns

`Promise`\<`number`[]\>

The breaks values.

## Example

```ts
import { standardDeviationBreaks } from '@geoda/core';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const breaks = await standardDeviationBreaks(data);

// breaks = [-0.47722557505166, 2.26138721247417, 5, 7.73861278752583, 10.47722557505166]
```
