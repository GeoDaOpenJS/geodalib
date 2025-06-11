[geodalib](../../../modules.md) / [core/src](../index.md) / spatialRates

# Function: spatialRates()

> **spatialRates**(`baseValues`, `eventValues`, `neighbors`): `number`[]

Defined in: [core/src/mapping/rates.ts:297](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/mapping/rates.ts#L297)

Compute the spatial rates, which is the ratio of the events (number of lung cancer cases)
over the population at risk (the county population) and its neighbors.

## Parameters

### baseValues

`number`[]

The values of base variable.

### eventValues

`number`[]

The values of event variable.

### neighbors

`number`[][]

The list of neighbors for each value.

## Returns

`number`[]

The rates values.
