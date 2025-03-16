[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / WeightsMeta

# Type Alias: WeightsMeta

> **WeightsMeta**: `object`

Defined in: [src/weights/weights-stats.ts:1](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/weights/weights-stats.ts#L1)

## Type declaration

## Index Signature

\[`key`: `string`\]: `unknown`

### distanceMetric?

> `optional` **distanceMetric**: `"euclidean"` \| `"manhattan"` \| `"arc"` \| `"projected"`

### distanceUnit?

> `optional` **distanceUnit**: `"Foot_US"` \| `"Yard_US"` \| `"Meter"` \| `"Kilometer"` \| `"NauticalMile"` \| `"Degree"` \| `"Radian"`

### id?

> `optional` **id**: `string`

### incLowerOrder?

> `optional` **incLowerOrder**: `boolean`

### k?

> `optional` **k**: `number`

### maxNeighbors

> **maxNeighbors**: `number`

### meanNeighbors

> **meanNeighbors**: `number`

### medianNeighbors

> **medianNeighbors**: `number`

### minNeighbors

> **minNeighbors**: `number`

### numberOfObservations

> **numberOfObservations**: `number`

### order?

> `optional` **order**: `number`

### pctNoneZero

> **pctNoneZero**: `number`

### symmetry?

> `optional` **symmetry**: `"symmetric"` \| `"asymmetric"`

### threshold?

> `optional` **threshold**: `number`

### type?

> `optional` **type**: `"knn"` \| `"threshold"` \| `"queen"` \| `"rook"`
