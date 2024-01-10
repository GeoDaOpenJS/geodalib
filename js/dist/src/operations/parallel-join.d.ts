import { SpatialJoinType, SpatialJoinResult } from './join';
import { GeometryInput } from '../features/geometry';
export type ParallelSpatialJoinOptions = {
    workerUrl: string | URL;
    workerCount?: number;
};
export declare function parallelSpatialJoin(source: GeometryInput, join: GeometryInput, spatialJoinOperation: SpatialJoinType, options: ParallelSpatialJoinOptions): Promise<SpatialJoinResult | null>;
