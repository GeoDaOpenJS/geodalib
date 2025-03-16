[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / localMoran

# Function: localMoran()

> **localMoran**(`props`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [src/sa/local-moran.ts:52](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/sa/local-moran.ts#L52)

Calculates univariate Local Moran's I statistics for spatial autocorrelation

## Parameters

### props

[`LocalMoranProps`](../type-aliases/LocalMoranProps.md)

Configuration object for Local Moran's I calculation

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Promise resolving to Local Moran statistics and cluster assignments
