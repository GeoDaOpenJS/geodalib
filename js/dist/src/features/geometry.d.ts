import { Feature, Geometry } from 'geojson';
import { CustomEmbindModule, PolygonCollection, PointCollection, LineCollection, Polygon as GeoDaPolygon } from '../../wasm';
export type GeometryInput = {
    features: Feature<Geometry>[] | null;
    latitudes?: Float64Array | null;
    longitudes?: Float64Array | null;
    index?: number[] | null;
};
export type GeometryCollectionType = PointCollection | LineCollection | PolygonCollection | null;
export declare function getPolygonCollection(features: Feature[], wasm: CustomEmbindModule, fixPolygon?: boolean, convertToUTM?: boolean): PolygonCollection;
export declare function getLineCollection(features: Feature[], wasm: CustomEmbindModule, convertToUTM?: boolean): LineCollection;
export declare function getPointCollection(features: Feature[], wasm: CustomEmbindModule, convertToUTM?: boolean): PointCollection;
/**
 * Convert from lat/lng pairs to geoda.PointCollection
 * start/end are only for parallel spatial join that each webworker use
 * a subset of lat/lng data in spatial join
 */
export declare function getPointCollectionFromLatLng(lat: number[] | Float64Array, lng: number[] | Float64Array, wasm: CustomEmbindModule, start?: number, end?: number): PointCollection;
/**
 * Get GeometryCollection from SpatialJoinInput
 * start/end are only for parallel spatial join that each webworker use
 * a subset of lat/lng data in spatial join
 */
export declare function getGeometryCollection(input: GeometryInput, wasm: CustomEmbindModule, start?: number, end?: number): GeometryCollectionType;
export declare function getGeojsonPolygon(poly: GeoDaPolygon): Feature;
