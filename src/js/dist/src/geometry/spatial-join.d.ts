import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { BinaryGeometryType } from './binary-geometry';
export type SpatialJoinProps = {
    left: BinaryFeatureCollection[];
    leftGeometryType: BinaryGeometryType;
    right: BinaryFeatureCollection[];
    rightGeometryType: BinaryGeometryType;
};
export declare function spatialJoin({ left, leftGeometryType, right, rightGeometryType }: SpatialJoinProps): Promise<number[][]>;
