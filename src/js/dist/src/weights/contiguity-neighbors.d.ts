import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { BinaryGeometryType } from '../geometry/binary-geometry';
/**
 * Type of Contiguity Neighbors from binary geometries arguments.
 */
type ContiguityNeighborsFromBinaryGeometriesProps = {
    binaryGeometryType: BinaryGeometryType;
    binaryGeometries: BinaryFeatureCollection[];
    useCentroids: boolean;
    isQueen: boolean;
    precisionThreshold?: number;
    orderOfContiguity?: number;
    includeLowerOrder?: boolean;
};
/**
 * Calculates the nearest neighbors for a given set of geometries or latitude/longitude arrays.
 * @param {NearestNeighborsFromBinaryGeometriesProps} input - The input parameters.
 * @returns {Promise<number[][]>} - The nearest neighbors as an array of indices.
 */
export declare function getContiguityNeighborsFromBinaryGeometries({ binaryGeometryType, binaryGeometries, isQueen, useCentroids, precisionThreshold, orderOfContiguity, includeLowerOrder }: ContiguityNeighborsFromBinaryGeometriesProps): Promise<number[][]>;
export {};
