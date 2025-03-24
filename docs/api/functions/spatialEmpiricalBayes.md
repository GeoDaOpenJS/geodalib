[geoda-wasm](../globals.md) / spatialEmpiricalBayes

# Function: spatialEmpiricalBayes()

> **spatialEmpiricalBayes**(`baseValues`, `eventValues`, `neighbors`): `number`[]

Defined in: [src/sa/rates.ts:156](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/sa/rates.ts#L156)

Compute the spatial empirical Bayes smoothed rates, which is a weighted average of the crude rate
and the overall rate, where the weights are based on the variability of the crude rates and the
spatial autocorrelation of the rates.

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
