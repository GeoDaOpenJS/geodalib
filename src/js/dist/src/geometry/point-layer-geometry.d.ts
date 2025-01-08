import { GeoDaModule, GeometryCollection } from '../../wasm';
import { PointLayerData } from './spatial-join';
/**
 * The type of the props for getGeometryCollectionFromGeoJson
 * @param pointLayerData - the point layer data
 * @param wasm - the wasm module
 */
export type GetGeometryCollectionFromPointLayerDataProps = {
    pointLayerData: PointLayerData[];
    wasm: GeoDaModule;
};
/**
 * Get PointCollection from PointLayerData: lat/lng pairs
 * @param props - the props for getGeometryCollectionFromPointLayerData see {@link GetGeometryCollectionFromPointLayerDataProps}
 * @returns PointCollection - the point collection see src/spatial_features.h
 */
export declare function getGeometryCollectionFromPointLayerData({ pointLayerData, wasm }: GetGeometryCollectionFromPointLayerDataProps): GeometryCollection;
