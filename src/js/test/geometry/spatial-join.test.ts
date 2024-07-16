import test from 'tape';

import {spatialJoin} from '../../src/geometry/spatial-join';
import {
  POINT_BINARY_GEOMETRIES,
  POINT_BINARY_GEOMETRY_TYPE,
  POLYGON_BINARY_GEOMETRIES,
  POLYGON_BINARY_GEOMETRY_TYPE
} from '../geometry-data';

test('Test spatialJoin() Polygons-Points', async t => {
  const result = await spatialJoin({
    left: POLYGON_BINARY_GEOMETRIES,
    leftGeometryType: POLYGON_BINARY_GEOMETRY_TYPE,
    right: POINT_BINARY_GEOMETRIES,
    rightGeometryType: POINT_BINARY_GEOMETRY_TYPE
  });

  t.deepEqual(result, [[1], [4]]);
});

test('Test spatialJoin(): Points-Polygons', async t => {
  const result = await spatialJoin({
    right: POLYGON_BINARY_GEOMETRIES,
    rightGeometryType: POLYGON_BINARY_GEOMETRY_TYPE,
    left: POINT_BINARY_GEOMETRIES,
    leftGeometryType: POINT_BINARY_GEOMETRY_TYPE
  });

  t.deepEqual(result, [[], [0], [], [], [1]]);
});
