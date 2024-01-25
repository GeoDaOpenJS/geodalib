import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { CustomEmbindModule, PolygonCollection, PointCollection, LineCollection, GeometryCollection } from '../../wasm';
export type GeoArrowEncoding = 'geoarrow.multipolygon' | 'geoarrow.polygon' | 'geoarrow.multilinestring' | 'geoarrow.linestring' | 'geoarrow.multipoint' | 'geoarrow.point' | 'geoarrow.wkb' | 'geoarrow.wkt';
/**
 * create geoda.GeometryCollection from dataToFeatures[] in GeojsonLayer
 *
 */
export declare function getGeoDaGeometriesFromArrow(geometryEncoding: GeoArrowEncoding, binaryFeaturesChunks: BinaryFeatureCollection[]): Promise<GeometryCollection | null>;
/**
 * create geoda pointCollection from dataToFeatures[] in GeojsonLayer
 * @param pointsArray BinaryFeatureCollection['points'] An array of binary point features from chunks of geoarrow
 * @returns pointCollection | null
 */
export declare function createGeoDaPointsFromBinaryFeatures(pointsArray: Array<BinaryFeatureCollection['points']>, wasm: CustomEmbindModule): PointCollection;
/**
 * create geoda lineCollection from dataToFeatures[] in GeojsonLayer
 * @param linesArray BinaryFeatureCollection['lines'][] An array of binary line features from chunks of geoarrow
 * @returns LineCollection | null
 */
export declare function createGeoDaLinesFromBinaryFeatures(linesArray: Array<BinaryFeatureCollection['lines']>, wasm: CustomEmbindModule): LineCollection;
/**
 * create geoda polygonCollection from dataToFeatures[] in GeojsonLayer
 * @param polygonsArray BinaryFeatureCollection['polygons'][] An array of binary polygon features from chunks of geoarrow
 * @returns PolygonCollection | null
 */
export declare function createGeoDaPolygonsFromBinaryFeatures(polygonsArray: Array<BinaryFeatureCollection['polygons']>, wasm: CustomEmbindModule): PolygonCollection;
