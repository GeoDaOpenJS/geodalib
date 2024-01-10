import { Feature } from 'geojson';
type NearestNeighborsInput = {
    k: number;
    geometries?: Feature[];
    latLngArrays?: {
        longitudes: Float64Array;
        latitudes: Float64Array;
    };
};
export declare function getNearestNeighbors({ k, geometries, latLngArrays }: NearestNeighborsInput): Promise<number[][]>;
export {};
