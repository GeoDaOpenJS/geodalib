

import {SpatialJoinType, SpatialJoinResult} from './join';
import {SpatialJoinWorkerOutput} from './join-worker';
import {prepareParallelSpatialJoin, processJoinResultsFromWorker} from './parallel-join-utils';
import {GeometryInput} from '../features/geometry';

const DEFAULT_WORKER_COUNT = 6; // default number of parallel web workers

export type ParallelSpatialJoinOptions = {
  workerUrl: string | URL;
  workerCount?: number;
};

type JoinResolve = (joinRelation: SpatialJoinResult) => void;

export async function parallelSpatialJoin(
  source: GeometryInput,
  join: GeometryInput,
  spatialJoinOperation: SpatialJoinType,
  options: ParallelSpatialJoinOptions
): Promise<SpatialJoinResult | null> {
  const workerCount = options?.workerCount ?? DEFAULT_WORKER_COUNT;

  const preparedData = prepareParallelSpatialJoin(source, join, spatialJoinOperation, workerCount);
  if (!preparedData) {
    return null;
  }

  const {sourceSize, divideRight, indexTable, taskDataArray} = preparedData;

  // final results
  const joinRelation: SpatialJoinResult = [];
  for (let i = 0; i < sourceSize; ++i) {
    joinRelation.push([]);
  }

  // current running web workers
  let runningWorkers = 0;

  // resolve for join result
  let joinResolve: JoinResolve;

  const onTaskDone = (event: MessageEvent<SpatialJoinWorkerOutput>): void => {
    // update number of running workers once it's done
    runningWorkers--;
    // get the results from the finished worker
    const {result, id: taskId} = event.data;
    processJoinResultsFromWorker(result, divideRight, indexTable, taskId, joinRelation);
    // when all workers done
    if (runningWorkers === 0) {
      joinResolve(joinRelation);
    }
  };

  const processSpatialJoinTasks = (resolve: JoinResolve): void => {
    for (let i = 0; i < workerCount; ++i) {
      const taskData = taskDataArray[i];
      const instance = new Worker(new URL(options.workerUrl));
      instance.onmessage = onTaskDone;
      instance.postMessage(taskData);
      runningWorkers++;
    }
    joinResolve = resolve;
  };

  return new Promise(processSpatialJoinTasks);
}
