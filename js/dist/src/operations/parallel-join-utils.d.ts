import { SpatialJoinResult, SpatialJoinType } from './join';
import { SpatialJoinWorkerInput } from './join-worker';
import { GeometryInput } from '../features/geometry';
type PreparedSpatialJoinData = {
    taskDataArray: Array<SpatialJoinWorkerInput>;
    indexTable: number[];
    sourceSize: number;
    joinSize: number;
    divideRight: boolean;
};
export declare function prepareParallelSpatialJoin(source: GeometryInput, join: GeometryInput, spatialJoinOperation: SpatialJoinType, workerCount: number): PreparedSpatialJoinData | null;
/**
 * process the join results from each web worker
 * the results should be filled into `joinRelation` (passed by reference)
 */
export declare function processJoinResultsFromWorker(result: SpatialJoinResult, divideRight: boolean, indexTable: number[], taskId: number, joinRelation: number[][]): void;
export {};
