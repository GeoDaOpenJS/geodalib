import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { GeoDaModule, PolygonCollection, PointCollection, LineCollection, GeometryCollection } from '../../wasm';
/**
 * BinaryGeometryType, it is the same as DeckGlGeoTypes in kepler.gl/layers
 * @typedef {Object} BinaryGeometryType
 */
export type BinaryGeometryType = {
    point: boolean;
    line: boolean;
    polygon: boolean;
};
/**
 * create geoda.GeometryCollection from dataToFeatures[] in GeojsonLayer
 *
 */
export declare function getGeometryCollectionFromBinaryGeometries(geometryType: BinaryGeometryType, binaryFeaturesChunks: BinaryFeatureCollection[], wasm: GeoDaModule): Promise<GeometryCollection | null>;
/**
 * create geoda pointCollection from dataToFeatures[] in GeojsonLayer
 * @param pointsArray BinaryFeatureCollection['points'] An array of binary point features from chunks of geoarrow
 * @returns pointCollection | null
 */
export declare function createPointCollectionFromBinaryFeatures(pointsArray: Array<BinaryFeatureCollection['points']>, wasm: GeoDaModule): PointCollection;
/**
 * create geoda lineCollection from dataToFeatures[] in GeojsonLayer
 * @param linesArray BinaryFeatureCollection['lines'][] An array of binary line features from chunks of geoarrow
 * @returns LineCollection | null
 */
export declare function createLineCollectionFromBinaryFeatures(linesArray: Array<BinaryFeatureCollection['lines']>, wasm: GeoDaModule): LineCollection;
/**
 * create geoda polygonCollection from dataToFeatures[] in GeojsonLayer
 * @param polygonsArray BinaryFeatureCollection['polygons'][] An array of binary polygon features from chunks of geoarrow
 * @returns PolygonCollection | null
 */
export declare function createPolygonCollectionFromBinaryFeatures(polygonsArray: Array<BinaryFeatureCollection['polygons']>, wasm: GeoDaModule): PolygonCollection;
