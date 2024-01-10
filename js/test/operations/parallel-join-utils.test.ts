

import test from 'tape';

import {initWASM} from '../../src/init';
import {SpatialJoinType, runSpatialJoin, spatialJoin} from '../../src/operations/join';
import {SpatialJoinWorkerInput} from '../../src/operations/join-worker';
import {
  prepareParallelSpatialJoin,
  processJoinResultsFromWorker
} from '../../src/operations/parallel-join-utils';
import {joinTestDataIntersects} from '../spatial-data';

async function mockupParallelSpatialJoin(
  taskDataArray: SpatialJoinWorkerInput[],
  sourceSize: number,
  divideRight: boolean,
  indexTable: number[]
): Promise<number[][]> {
  // run spatialJoin on each chunk of data, then combine the results
  const wasmInstance = await initWASM();
  const joinRelation: number[][] = [];
  for (let i = 0; i < sourceSize; ++i) {
    joinRelation.push([]);
  }
  taskDataArray.forEach((taskData, taskId) => {
    const joinResult = runSpatialJoin(
      taskData.source,
      taskData.join,
      taskData.spatialJoinOperation,
      wasmInstance,
      taskData.start,
      taskData.end
    );
    if (joinResult) {
      processJoinResultsFromWorker(joinResult, divideRight, indexTable, taskId, joinRelation);
    }
  });
  return joinRelation;
}

test('Test prepareParallelSpatialJoin() - 1 worker polygons-points', async t => {
  const source = {features: joinTestDataIntersects.twoPolygons};
  const join = {features: joinTestDataIntersects.points};
  const workerCount = 1;

  const result = prepareParallelSpatialJoin(source, join, SpatialJoinType.INTERSECTS, workerCount);

  t.isNot(result, null, 'prepareParallelSpatialJoin should not return null.');

  if (result) {
    const {taskDataArray, indexTable, sourceSize, joinSize, divideRight} = result;

    const expectedTaskDataArray = [
      {
        id: 0,
        start: 0,
        end: 5,
        source: {
          features: joinTestDataIntersects.twoPolygons
        },
        join: {
          features: joinTestDataIntersects.points
        },
        spatialJoinOperation: 'INTERSECTS'
      }
    ];
    t.equal(taskDataArray.length, 1, 'taskDataArray should have correct length');
    t.deepEqual(taskDataArray, expectedTaskDataArray, 'taskDataArray should have correct content.');
    t.deepEquals(indexTable, [0], 'indexTable should have correct content.');
    t.equal(sourceSize, 2, 'sourceSize should be correct size.');
    t.equal(joinSize, 5, 'joinSize should have correct size.');
    t.equal(divideRight, true, 'divideRight should be true.');

    const joinRelation = await mockupParallelSpatialJoin(
      taskDataArray,
      sourceSize,
      divideRight,
      indexTable
    );
    const expectedJoinResult = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);
    t.deepEqual(
      joinRelation,
      expectedJoinResult,
      'prepareParallelSpatialJoin should lead to same spatial join result as spatialJoin.'
    );
  }

  t.end();
});

test('Test prepareParallelSpatialJoin() - 1 worker points-polygons', async t => {
  const join = {features: joinTestDataIntersects.twoPolygons};
  const source = {features: joinTestDataIntersects.points};
  const workerCount = 1;

  const result = prepareParallelSpatialJoin(source, join, SpatialJoinType.INTERSECTS, workerCount);

  t.isNot(result, null, 'prepareParallelSpatialJoin should not return null.');

  if (result) {
    const {taskDataArray, indexTable, sourceSize, joinSize, divideRight} = result;

    const expectedTaskDataArray = [
      {
        id: 0,
        start: 0,
        end: 5,
        join: {
          features: joinTestDataIntersects.twoPolygons
        },
        source: {
          features: joinTestDataIntersects.points
        },
        spatialJoinOperation: 'INTERSECTS'
      }
    ];
    t.equal(taskDataArray.length, 1, 'taskDataArray should have correct length');
    t.deepEqual(taskDataArray, expectedTaskDataArray, 'taskDataArray should have correct content.');
    t.deepEquals(indexTable, [0], 'indexTable should have correct content.');
    t.equal(sourceSize, 5, 'sourceSize should be correct size.');
    t.equal(joinSize, 2, 'joinSize should have correct size.');
    t.equal(divideRight, false, 'divideRight should be false.');

    // run spatialJoin on two chunks of data, compare the result
    const joinRelation = await mockupParallelSpatialJoin(
      taskDataArray,
      sourceSize,
      divideRight,
      indexTable
    );
    const expectedJoinResult = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);
    t.deepEqual(
      joinRelation,
      expectedJoinResult,
      'prepareParallelSpatialJoin should lead to same spatial join result as spatialJoin.'
    );
  }

  t.end();
});

test('Test prepareParallelSpatialJoin() - 2 workers polygons-points', async t => {
  const source = {features: joinTestDataIntersects.twoPolygons};
  const join = {features: joinTestDataIntersects.points};
  const workerCount = 2;

  const result = prepareParallelSpatialJoin(source, join, SpatialJoinType.INTERSECTS, workerCount);

  t.isNot(result, null, 'prepareParallelSpatialJoin should not return null.');

  if (result) {
    const {taskDataArray, indexTable, sourceSize, joinSize, divideRight} = result;

    const expectedTaskDataArray = [
      {
        id: 0,
        start: 0,
        end: 2,
        source: {
          features: joinTestDataIntersects.twoPolygons
        },
        join: {
          features: joinTestDataIntersects.points.slice(0, 2)
        },
        spatialJoinOperation: 'INTERSECTS'
      },
      {
        id: 1,
        start: 2,
        end: 5,
        source: {
          features: joinTestDataIntersects.twoPolygons
        },
        join: {
          features: joinTestDataIntersects.points.slice(2, 5)
        },
        spatialJoinOperation: 'INTERSECTS'
      }
    ];
    t.equal(taskDataArray.length, 2, 'taskDataArray should have correct length');
    t.deepEqual(taskDataArray, expectedTaskDataArray, 'taskDataArray should have correct content.');
    t.deepEquals(indexTable, [0, 2], 'indexTable should have correct content.');
    t.equal(sourceSize, 2, 'sourceSize should be correct size.');
    t.equal(joinSize, 5, 'joinSize should have correct size.');
    t.equal(divideRight, true, 'divideRight should be true.');

    // run spatialJoin on two chunks of data, compare the result
    const joinRelation = await mockupParallelSpatialJoin(
      taskDataArray,
      sourceSize,
      divideRight,
      indexTable
    );
    const expectedJoinResult = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);
    t.deepEqual(
      joinRelation,
      expectedJoinResult,
      'prepareParallelSpatialJoin should lead to same spatial join result as spatialJoin.'
    );
  }

  t.end();
});

test('Test prepareParallelSpatialJoin() - 2 workers points-polygons', async t => {
  const join = {features: joinTestDataIntersects.twoPolygons};
  const source = {features: joinTestDataIntersects.points};
  const workerCount = 2;

  const result = prepareParallelSpatialJoin(source, join, SpatialJoinType.INTERSECTS, workerCount);

  t.isNot(result, null, 'prepareParallelSpatialJoin should not return null.');

  if (result) {
    const {taskDataArray, indexTable, sourceSize, joinSize, divideRight} = result;

    const expectedTaskDataArray = [
      {
        id: 0,
        start: 0,
        end: 2,
        join: {
          features: joinTestDataIntersects.twoPolygons
        },
        source: {
          features: joinTestDataIntersects.points.slice(0, 2)
        },
        spatialJoinOperation: 'INTERSECTS'
      },
      {
        id: 1,
        start: 2,
        end: 5,
        join: {
          features: joinTestDataIntersects.twoPolygons
        },
        source: {
          features: joinTestDataIntersects.points.slice(2, 5)
        },
        spatialJoinOperation: 'INTERSECTS'
      }
    ];
    t.equal(taskDataArray.length, 2, 'taskDataArray should have correct length');
    t.deepEqual(taskDataArray, expectedTaskDataArray, 'taskDataArray should have correct content.');
    t.deepEquals(indexTable, [0, 2], 'indexTable should have correct content.');
    t.equal(sourceSize, 5, 'sourceSize should be correct size.');
    t.equal(joinSize, 2, 'joinSize should have correct size.');
    t.equal(divideRight, false, 'divideRight should be false.');

    // run spatialJoin on two chunks of data, compare the result
    const joinRelation = await mockupParallelSpatialJoin(
      taskDataArray,
      sourceSize,
      divideRight,
      indexTable
    );
    const expectedJoinResult = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);
    t.deepEqual(
      joinRelation,
      expectedJoinResult,
      'prepareParallelSpatialJoin should lead to same spatial join result as spatialJoin.'
    );
  }

  t.end();
});
