[geoda-wasm](../globals.md) / bivariateLocalMoran

# Function: bivariateLocalMoran()

> **bivariateLocalMoran**(`props`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [src/sa/local-moran.ts:127](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/sa/local-moran.ts#L127)

Calculates bivariate Local Moran's I statistics to measure spatial correlation
between two variables

## Parameters

### props

[`BivariateLocalMoranProps`](../type-aliases/BivariateLocalMoranProps.md)

Configuration object for bivariate Local Moran's I

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Promise resolving to Local Moran statistics and cluster assignments
