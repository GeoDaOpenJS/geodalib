

import {Feature, Point} from 'geojson';
import test from 'tape';

import {spatialCount} from '../../src/operations/count';
import {polygonData} from '../spatial-data';

test('Test spatialCount()', async t => {
  const polygons = polygonData.twoPolygons;

  const points: Feature<Point>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0.4, 0.4]
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
        coordinates: [1.4, 0.4]
      },
      properties: {}
    }
  ];

  const result = await spatialCount(polygons, {
    features: points,
    latitudes: null,
    longitudes: null
  });

  t.deepEqual(result, [2, 1]);

  const result1 = await spatialCount(polygonData.polygonWithHole, {
    features: null,
    longitudes: [2.0, 2.6],
    latitudes: [0.5, 0.5]
  });

  t.deepEqual(result1, [1]);

  t.end();
});
