import {SpatialJoinResult, SpatialJoinType} from './join';
import {SpatialJoinWorkerInput} from './join-worker';
import {GeometryInput} from '../features/geometry';

type PreparedSpatialJoinData = {
  taskDataArray: Array<SpatialJoinWorkerInput>;
  indexTable: number[];
  sourceSize: number;
  joinSize: number;
  divideRight: boolean;
};

export function prepareParallelSpatialJoin(
  source: GeometryInput,
  join: GeometryInput,
  spatialJoinOperation: SpatialJoinType,
  workerCount: number
): PreparedSpatialJoinData | null {
  const taskDataArray: Array<SpatialJoinWorkerInput> = [];

  // check the size of source and join
  const sourceSize = source.features?.length ?? source.latitudes?.length;
  const joinSize = join.features?.length ?? join.latitudes?.length;

  if (!sourceSize || !joinSize) {
    return null;
  }

  // for dividing the bigger dataset into several chunks if needed
  // (e.g. no need for Float64Array)
  const divideRight = sourceSize < joinSize;
  const bigSize = divideRight ? joinSize : sourceSize;
  const workChunk = Math.floor(bigSize / workerCount);
  const remainder = bigSize % workerCount;

  // index lookup table for dataset divided into chunks
  const indexTable = new Array(workerCount);

  const initSpatialJoinTasks = (taskIndex: number): SpatialJoinWorkerInput => {
    // start is inclusive and end is exclusive
    const start = taskIndex * workChunk;
    let end = (taskIndex + 1) * workChunk;
    if (taskIndex === workerCount - 1) {
      // Allocate remainder rows to the last worker
      end += remainder;
    }
    indexTable[taskIndex] = start;

    return {
      id: taskIndex,
      source: prepareJoinDataset(source, divideRight, start, end),
      join: prepareJoinDataset(join, !divideRight, start, end),
      spatialJoinOperation,
      start,
      end
    };
  };

  for (let i = 0; i < workerCount; ++i) {
    const taskData = initSpatialJoinTasks(i);
    taskDataArray.push(taskData);
  }

  return {taskDataArray, indexTable, sourceSize, joinSize, divideRight};
}

function prepareJoinDataset(
  dataset: GeometryInput,
  noSlicing: boolean,
  start: number,
  end: number
): GeometryInput {
  // latitudes/longitudes are Float64Array, so no need to slice and
  // just zero-copy it to web workers, with [start, end] information.
  // Currently, we will slice geojson features that are sent to each
  // web worker -- slice and send is faster than sending whole to web
  // workers. This wil be replaced with wkb (zero-copy) in the future.
  return {
    ...(dataset.latitudes ? {latitudes: dataset.latitudes} : {}),
    ...(dataset.longitudes ? {longitudes: dataset.longitudes} : {}),
    features:
      dataset.features?.length && dataset.features.length > 0
        ? noSlicing
          ? dataset.features
          : dataset.features?.slice(start, end)
        : null
  };
}

/**
 * process the join results from each web worker
 * the results should be filled into `joinRelation` (passed by reference)
 */
export function processJoinResultsFromWorker(
  result: SpatialJoinResult,
  divideRight: boolean,
  indexTable: number[],
  taskId: number,
  joinRelation: number[][]
): void {
  for (let i = 0, n = result.length; i < n; ++i) {
    const rightIndices = result[i];
    for (let j = 0, m = rightIndices.length; j < m; ++j) {
      if (divideRight) {
        joinRelation[i].push(indexTable[taskId] + rightIndices[j]);
      } else {
        joinRelation[indexTable[taskId] + i].push(rightIndices[j]);
      }
    }
  }
}
