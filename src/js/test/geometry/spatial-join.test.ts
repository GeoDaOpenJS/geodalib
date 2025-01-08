import test from 'tape';

import {spatialJoin} from '../../src/geometry/spatial-join';
import {POINT_BINARY_GEOMETRIES, POLYGON_BINARY_GEOMETRIES} from '../geometry-data';

test('Test spatialJoin() Polygons-Points', async t => {
  const result = await spatialJoin({
    leftGeometries: POLYGON_BINARY_GEOMETRIES,
    rightGeometries: POINT_BINARY_GEOMETRIES
  });

  t.deepEqual(result, [[1], [4]]);
});

test('Test spatialJoin(): Points-Polygons', async t => {
  const result = await spatialJoin({
    rightGeometries: POLYGON_BINARY_GEOMETRIES,
    leftGeometries: POINT_BINARY_GEOMETRIES
  });

  t.deepEqual(result, [[], [0], [], [], [1]]);
});
