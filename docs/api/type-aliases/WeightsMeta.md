[geoda-wasm](../globals.md) / WeightsMeta

# Type Alias: WeightsMeta

> **WeightsMeta**: `object`

Defined in: [src/weights/weights-stats.ts:1](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/weights/weights-stats.ts#L1)

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
