[geodalib](../../../modules.md) / [lisa/src](../index.md) / bivariateLocalMoran

# Function: bivariateLocalMoran()

> **bivariateLocalMoran**(`props`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [lisa/src/sa/local-moran.ts:127](https://github.com/GeoDaCenter/geoda-lib/blob/9716a45cca9cf3b644d6187deeb842d47f2b7a3a/js/packages/lisa/src/sa/local-moran.ts#L127)

Calculates bivariate Local Moran's I statistics to measure spatial correlation
between two variables

## Parameters

### props

[`BivariateLocalMoranProps`](../type-aliases/BivariateLocalMoranProps.md)

Configuration object for bivariate Local Moran's I

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Promise resolving to Local Moran statistics and cluster assignments
