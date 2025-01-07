import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { Feature } from 'geojson';
import { GeometryCollection } from '../../wasm';
export type PointLayerData = {
    position: number[];
    index: number;
    neighbors: number[];
};
type ArcLayerData = {
    index: number;
    sourcePosition: [number, number, number];
    targetPosition: [number, number, number];
};
type HexagonIdLayerData = {
    index: number;
    id: number;
    centroid: [number, number];
};
export type SpatialJoinGeometries = Feature[] | BinaryFeatureCollection[] | PointLayerData[] | ArcLayerData[] | HexagonIdLayerData[];
export declare enum SpatialJoinGeometryType {
    GeoJsonFeature = "GeoJsonFeature",
    BinaryFeatureCollection = "BinaryFeatureCollection",
    PointLayerData = "PointLayerData",
    ArcLayerData = "ArcLayerData",
    HexagonIdLayerData = "HexagonIdLayerData"
}
export type SpatialJoinProps = {
    leftGeometries: SpatialJoinGeometries;
    rightGeometries: SpatialJoinGeometries;
};
export declare function spatialJoin({ leftGeometries, rightGeometries }: SpatialJoinProps): Promise<number[][]>;
/**
 * The type of the props for spatialJoinGeometryCollection
 * @param leftGeomCollection - the left geometry collection
 * @param rightGeomCollection - the right geometry collection
 */
export type SpatialJoinGeometryCollectionProps = {
    leftGeomCollection: GeometryCollection;
    rightGeomCollection: GeometryCollection;
};
/**
 * Spatial join two geometry collections
 * @param props - the props for spatialJoinGeometryCollection see {@link SpatialJoinGeometryCollectionProps}
 * @returns the join indexes
 */
export declare function spatialJoinGeometryCollection({ leftGeomCollection, rightGeomCollection }: SpatialJoinGeometryCollectionProps): Promise<number[][]>;
export {};
