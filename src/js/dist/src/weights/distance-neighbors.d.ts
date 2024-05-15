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
export declare function getDistanceThresholds({ isMile, binaryGeometryType, binaryGeometries }: DistanceThresholdsProps): Promise<DistanceThresholds>;
export {};
