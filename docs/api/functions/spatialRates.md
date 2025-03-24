[geoda-wasm](../globals.md) / spatialRates

# Function: spatialRates()

> **spatialRates**(`baseValues`, `eventValues`, `neighbors`): `number`[]

Defined in: [src/sa/rates.ts:213](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/sa/rates.ts#L213)

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
