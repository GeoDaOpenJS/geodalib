import {Feature, Point} from 'geojson';
import test from 'tape';

import {
  getDistanceBasedNeighbors,
  getDistanceThresholds,
  DistanceUnit
} from '../../src/weights/distance-based-neighbors';

test('Test getDistanceBasedNeighbors()', async t => {
  const points: Feature<Point>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [1.4, 1.4]
      },
      properties: {}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0.2, 0.2]
      },
      properties: {}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4, 1.4]
      },
      properties: {}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [21.0, 21.0]
      },
      properties: {}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [15.4, 15.4]
      },
      properties: {}
    }
  ];
  const distanceUnit = DistanceUnit.Mile;
  const distanceThresholds = await getDistanceThresholds({distanceUnit, geometries: points});
  const minDistanceThreshold = distanceThresholds.minDistanceThreshold;

  t.equal(
    distanceThresholds.minDistanceThreshold,
    69.0727764068409,
    'should compute correct minimal distance threshold.'
  );

  t.equal(
    distanceThresholds.suggestedDistanceThreshold,
    533.5365666155739,
    'should compute correct suggested distance threshold.'
  );

  t.equal(
    distanceThresholds.maxDistanceThreshold,
    2008.9213706045953,
    'should compute correct maximum distance threshold.'
  );

  const result = await getDistanceBasedNeighbors({
    distanceThreshold: minDistanceThreshold,
    distanceUnit,
    geometries: points
  });

  t.deepEqual(
    result,
    [[2], [], [0], [], []],
    'should create correct distance based neighbors using minDistanceThreshold'
  );

  const result1 = await getDistanceBasedNeighbors({
    distanceThreshold: 300.0,
    distanceUnit,
    geometries: points
  });

  t.deepEqual(
    result1,
    [[1, 2], [0, 2], [0, 1], [], []],
    'should create correct distance based neighbors using distanceThreshold=300 miles'
  );

  const result2 = await getDistanceBasedNeighbors({
    distanceThreshold: 533.5365666155739,
    distanceUnit,
    geometries: points
  });

  t.deepEqual(
    result2,
    [[1, 2], [0, 2], [0, 1], [4], [3]],
    'should create weights that everyone has at lest one neighbor using distanceThreshold=533.535965253422 miles'
  );

  t.end();
});
