import { SpatialJoinResult, SpatialJoinType } from './join';
import { GeometryInput } from '../features/geometry';
/**
 * The result return from a web worker of spatial join
 */
export type SpatialJoinWorkerOutput = {
    id: number;
    result: SpatialJoinResult;
};
/**
 * The input for a web worker of spatial join
 */
export type SpatialJoinWorkerInput = {
    id: number;
    source: GeometryInput;
    join: GeometryInput;
    spatialJoinOperation: SpatialJoinType;
    start: number;
    end: number;
};
