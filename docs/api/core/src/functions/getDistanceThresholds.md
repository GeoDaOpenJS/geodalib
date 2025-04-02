[geodalib](../../../modules.md) / [core/src](../index.md) / getDistanceThresholds

# Function: getDistanceThresholds()

> **getDistanceThresholds**(`__namedParameters`): `Promise`\<[`DistanceThresholds`](../type-aliases/DistanceThresholds.md)\>

Defined in: [core/src/weights/distance-neighbors.ts:80](https://github.com/GeoDaCenter/geoda-lib/blob/5c8fba7800a0ff8c8ed4b8b260cc40d1229fb38a/js/packages/core/src/weights/distance-neighbors.ts#L80)

Get the distance thresholds for a given set of geometries or latitude/longitude arrays:
The thresholds are calculated based on the minimum, maximum, and maximum pair distances.
the minimum threshold is the minimum distance that guarantees that at least one geometry has one neighbor.
the maximum threshold is the maximum distance that guarantees that every geometry has at least one neighbor.
the maximum pair threshold is the maximum distance between any two geometries.

The distances are calculated as the haversine distance between the centroids of the geometries.
The units of the thresholds are in kilometers or miles.

## Parameters

### \_\_namedParameters

[`DistanceThresholdsProps`](../type-aliases/DistanceThresholdsProps.md)

## Returns

`Promise`\<[`DistanceThresholds`](../type-aliases/DistanceThresholds.md)\>
