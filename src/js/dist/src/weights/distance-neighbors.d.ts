import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { BinaryGeometryType } from '../geometry/binary-geometry';
/**
 * Type of Distance based Neighbors from binary geometries arguments.
 */
type DistanceNeighborsFromBinaryGeometriesProps = {
    distanceThreshold: number;
    isMile?: boolean;
    binaryGeometryType: BinaryGeometryType;
    binaryGeometries: BinaryFeatureCollection[];
};
/**
 * Calculates the neighbors within a distance band for a given set of geometries or latitude/longitude arrays.
 * @param {NearestNeighborsFromBinaryGeometriesProps} input - The input parameters.
 * @returns {Promise<number[][]>} - The nearest neighbors as an array of indices.
 */
export declare function getDistanceNeighborsFromBinaryGeometries({ distanceThreshold, isMile, binaryGeometryType, binaryGeometries }: DistanceNeighborsFromBinaryGeometriesProps): Promise<number[][]>;
export type DistanceThresholds = {
    minDistance: number;
    maxDistance: number;
    maxPairDistance: number;
};
export type DistanceThresholdsProps = {
    isMile?: boolean;
    binaryGeometryType: BinaryGeometryType;
    binaryGeometries: BinaryFeatureCollection[];
};
/**
 * Get the distance thresholds for a given set of geometries or latitude/longitude arrays:
 * The thresholds are calculated based on the minimum, maximum, and maximum pair distances.
 * the minimum threshold is the minimum distance that guarantees that at least one geometry has one neighbor.
 * the maximum threshold is the maximum distance that guarantees that every geometry has at least one neighbor.
 * the maximum pair threshold is the maximum distance between any two geometries.
 *
 * The distances are calculated as the haversine distance between the centroids of the geometries.
 * The units of the thresholds are in kilometers or miles.
 */
export declare function getDistanceThresholds({ isMile, binaryGeometryType, binaryGeometries }: DistanceThresholdsProps): Promise<DistanceThresholds>;
export {};
