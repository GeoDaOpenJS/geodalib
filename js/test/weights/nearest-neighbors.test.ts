

import {Feature, Point} from 'geojson';
import test from 'tape';

import {getNearestNeighbors} from '../../src/weights/nearest-neighbors';

test('Test getNearestNeighbors()', async t => {
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

  const k = 2;
  const result = await getNearestNeighbors({geometries: points, k});

  t.deepEqual(result, [
    [1, 2],
    [2, 0],
    [1, 0],
    [2, 4],
    [2, 3]
  ]);

  t.end();
});
