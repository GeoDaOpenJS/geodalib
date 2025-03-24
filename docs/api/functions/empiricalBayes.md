[geoda-wasm](../globals.md) / empiricalBayes

# Function: empiricalBayes()

> **empiricalBayes**(`baseValues`, `eventValues`): `number`[]

Defined in: [src/sa/rates.ts:108](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/sa/rates.ts#L108)

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
