[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / bivariateLocalMoran

# Function: bivariateLocalMoran()

> **bivariateLocalMoran**(`props`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [src/sa/local-moran.ts:127](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/sa/local-moran.ts#L127)

Calculates bivariate Local Moran's I statistics to measure spatial correlation
between two variables

## Parameters

### props

[`BivariateLocalMoranProps`](../type-aliases/BivariateLocalMoranProps.md)

Configuration object for bivariate Local Moran's I

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Promise resolving to Local Moran statistics and cluster assignments
