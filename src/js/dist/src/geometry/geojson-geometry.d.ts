import { Feature, Geometry } from 'geojson';
import { GeoDaModule, GeometryCollection, PolygonCollection, PointCollection, LineCollection } from '../../wasm';
/**
 * The type of the input for getGeometryCollectionFromGeoJson
 * @param features - the features to convert
 * @param latitudes - the latitudes
 * @param longitudes - the longitudes
 * @param index - the index
 */
export type GeometryInput = {
    features: Feature<Geometry>[] | null;
    latitudes?: Float64Array | null;
    longitudes?: Float64Array | null;
    index?: number[] | null;
};
/**
 * The type of the props for getGeometryCollectionFromGeoJson
 * @param input - the geometry input
 * @param wasm - the wasm module
 * @param start - the start index
 * @param end - the end index
 */
export type GetGeometryCollectionFromGeoJsonFeaturesProps = {
    features: Feature[];
    wasm: GeoDaModule;
};
/**
 * Get GeometryCollection from GeoJson featurers
 * @param props - the props for getGeometryCollectionFromGeoJson see {@link GetGeometryCollectionFromGeoJsonProps}
 * @returns GeometryCollection - the geometry collection see src/spatial_features.h
 */
export declare function getGeometryCollectionFromGeoJsonFeatures({ features, wasm }: GetGeometryCollectionFromGeoJsonFeaturesProps): GeometryCollection;
/**
 * The type of the props for GetPolygonCollection
 * @param features - the features to convert
 * @param wasm - the wasm module
 * @param fixPolygon - whether to fix the polygon
 * @param convertToUTM - whether to convert to UTM
 */
export type GetPolygonCollectionProps = {
    features: Feature[];
    wasm: GeoDaModule;
    fixPolygon?: boolean;
    convertToUTM?: boolean;
};
/**
 * Convert GeoJSON features (MultiPolygon and Polygon) to PolygonCollection
 * @param props - the props for GetPolygonCollection see {@link GetPolygonCollectionProps}
 * @returns PolygonCollection - the polygon collection see src/spatial_features.h
 */
export declare function getPolygonCollection({ features, wasm, fixPolygon, convertToUTM }: GetPolygonCollectionProps): PolygonCollection;
/**
 * The type of the props for GetLineCollection
 * @param features - the features to convert
 * @param wasm - the wasm module
 * @param convertToUTM - whether to convert to UTM
 */
export type GetLineCollectionProps = {
    features: Feature[];
    wasm: GeoDaModule;
    convertToUTM?: boolean;
};
/**
 * Convert GeoJSON features (MultiLineString and LineString) to LineCollection
 * @param props - the props for GetLineCollection see {@link GetLineCollectionProps}
 * @returns LineCollection - the line collection see src/spatial_features.h
 */
export declare function getLineCollection({ features, wasm, convertToUTM }: GetLineCollectionProps): LineCollection;
/**
 * The type of the props for GetPointCollection
 * @param features - the features to convert
 * @param wasm - the wasm module
 * @param convertToUTM - whether to convert to UTM
 */
export type GetPointCollectionProps = {
    features: Feature[];
    wasm: GeoDaModule;
    convertToUTM?: boolean;
};
/**
 * Convert GeoJSON features (MultiPoint and Point) to PointCollection
 * @param props - the props for GetPointCollection see {@link GetPointCollectionProps}
 * @returns PointCollection - the point collection see src/spatial_features.h
 */
export declare function getPointCollection({ features, wasm, convertToUTM }: GetPointCollectionProps): PointCollection;
/**
 * The type of the props for GetPointCollectionFromLatLng
 * @param lat - the latitudes
 * @param lng - the longitudes
 * @param wasm - the wasm module
 * @param start - the start index
 * @param end - the end index
 */
export type GetPointCollectionFromLatLngProps = {
    lat: number[] | Float64Array;
    lng: number[] | Float64Array;
    wasm: GeoDaModule;
    start?: number;
    end?: number;
};
/**
 * Convert from lat/lng pairs to PointCollection
 * @param props - the props for GetPointCollectionFromLatLng see {@link GetPointCollectionFromLatLngProps}
 * @returns PointCollection - the point collection see src/spatial_features.h
 */
export declare function getPointCollectionFromLatLng({ lat, lng, wasm, start, end }: GetPointCollectionFromLatLngProps): PointCollection;
