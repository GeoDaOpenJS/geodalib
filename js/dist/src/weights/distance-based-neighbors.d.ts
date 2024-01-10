import { Feature } from 'geojson';
export declare enum DistanceUnit {
    Mile = "Mile",
    KM = "KM"
}
/**
 * geometries: the geometries used to compute distance. NOTE: for Polygon type, the
 *  centroids are used to compute the distance
 * latLngArrays: the latitude and longitude array represents the input point geometries
 */
export type DistanceWeightsGeometryInput = {
    geometries?: Feature[];
    latLngArrays?: {
        longitudes: Float64Array;
        latitudes: Float64Array;
    };
};
/**
 * distanceThreshold: the distance value that defines neighbors within this threshold
 * isMile: if the measurement unit of distance is mile (true), or kilometer (false)
 */
export type DistanceWeightsInput = DistanceWeightsGeometryInput & {
    distanceThreshold: number;
    distanceUnit: DistanceUnit;
};
export type DistanceThresholdsInput = DistanceWeightsGeometryInput & {
    distanceUnit: DistanceUnit;
};
/**
 * minDistanceThreshold: the minimum 1nn distance
 * suggestedDistanceThreshold: the maximum 1nn distance
 * maxDistanceThreshold: the approximate maximum pair distance
 * The 1st and 3rd values are used to define the range of distance thresholds
 * The 2nd value is used as suggested distance threshold, which guarantees at least one neighbor
 */
export type DistanceThresholdsOutput = {
    minDistanceThreshold: number;
    suggestedDistanceThreshold: number;
    maxDistanceThreshold: number;
};
export declare function getDistanceThresholds({ distanceUnit, geometries, latLngArrays }: DistanceThresholdsInput): Promise<DistanceThresholdsOutput>;
export declare function getDistanceBasedNeighbors({ distanceThreshold, distanceUnit, geometries, latLngArrays }: DistanceWeightsInput): Promise<number[][]>;
