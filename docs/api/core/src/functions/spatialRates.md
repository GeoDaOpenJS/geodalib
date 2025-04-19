[geodalib](../../../modules.md) / [core/src](../index.md) / spatialRates

# Function: spatialRates()

> **spatialRates**(`baseValues`, `eventValues`, `neighbors`): `number`[]

Defined in: [core/src/mapping/rates.ts:297](https://github.com/GeoDaCenter/geoda-lib/blob/9716a45cca9cf3b644d6187deeb842d47f2b7a3a/js/packages/core/src/mapping/rates.ts#L297)

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
