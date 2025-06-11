[geodalib](../../../modules.md) / [lisa/src](../index.md) / bivariateLocalMoran

# Function: bivariateLocalMoran()

> **bivariateLocalMoran**(`props`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [lisa/src/sa/local-moran.ts:127](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/lisa/src/sa/local-moran.ts#L127)

Calculates bivariate Local Moran's I statistics to measure spatial correlation
between two variables

## Parameters

### props

[`BivariateLocalMoranProps`](../type-aliases/BivariateLocalMoranProps.md)

Configuration object for bivariate Local Moran's I

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Promise resolving to Local Moran statistics and cluster assignments
