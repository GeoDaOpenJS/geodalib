[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / empiricalBayes

# Function: empiricalBayes()

> **empiricalBayes**(`baseValues`, `eventValues`): `number`[]

Defined in: [src/sa/rates.ts:108](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/sa/rates.ts#L108)

Compute the empirical Bayes smoothed rates, which is a weighted average of the crude rate
and the overall rate, where the weights are based on the variability of the crude rates.

## Parameters

### baseValues

`number`[]

The values of base variable.

### eventValues

`number`[]

The values of event variable.

## Returns

`number`[]

The rates values.
