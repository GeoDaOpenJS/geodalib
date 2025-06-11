[geodalib](../../../modules.md) / [core/src](../index.md) / getDistanceThresholds

# Function: getDistanceThresholds()

> **getDistanceThresholds**(`__namedParameters`): `Promise`\<[`DistanceThresholds`](../type-aliases/DistanceThresholds.md)\>

Defined in: [core/src/weights/distance-neighbors.ts:98](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/weights/distance-neighbors.ts#L98)

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
