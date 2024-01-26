import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { Feature } from 'geojson';
import { BinaryGeometryType } from '../features/binary-geometry';
/**
 * Type of Nearest Neighbors input arguments.
 */
type NearestNeighborsInput = {
    k: number;
    geometries?: Feature[];
    latLngArrays?: {
        longitudes: Float64Array;
        latitudes: Float64Array;
    };
};
/**
 * Calculates the nearest neighbors for a given set of geometries or latitude/longitude arrays.
 * @param {NearestNeighborsInput} input - The input parameters.
 * @returns {Promise<number[][]>} - The nearest neighbors as an array of indices.
 */
export declare function getNearestNeighbors({ k, geometries, latLngArrays }: NearestNeighborsInput): Promise<number[][]>;
/**
 * Type of Nearest Neighbors from binary geometries arguments.
 */
type NearestNeighborsFromBinaryGeometriesProps = {
    k: number;
    binaryGeometryType: BinaryGeometryType;
    binaryGeometries: BinaryFeatureCollection[];
};
/**
 * Calculates the nearest neighbors for a given set of geometries or latitude/longitude arrays.
 * @param {NearestNeighborsFromBinaryGeometriesProps} input - The input parameters.
 * @returns {Promise<number[][]>} - The nearest neighbors as an array of indices.
 */
export declare function getNearestNeighborsFromBinaryGeometries({ k, binaryGeometryType, binaryGeometries }: NearestNeighborsFromBinaryGeometriesProps): Promise<number[][]>;
export {};
