[geoda-wasm](../globals.md) / localMoran

# Function: localMoran()

> **localMoran**(`props`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [src/sa/local-moran.ts:52](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/sa/local-moran.ts#L52)

Calculates univariate Local Moran's I statistics for spatial autocorrelation

## Parameters

### props

[`LocalMoranProps`](../type-aliases/LocalMoranProps.md)

Configuration object for Local Moran's I calculation

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Promise resolving to Local Moran statistics and cluster assignments
