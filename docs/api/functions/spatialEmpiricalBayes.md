[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / spatialEmpiricalBayes

# Function: spatialEmpiricalBayes()

> **spatialEmpiricalBayes**(`baseValues`, `eventValues`, `neighbors`): `number`[]

Defined in: [src/sa/rates.ts:156](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/sa/rates.ts#L156)

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
