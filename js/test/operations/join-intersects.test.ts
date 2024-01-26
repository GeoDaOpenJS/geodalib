import {Feature, Point, MultiPoint, LineString} from 'geojson';
import test from 'tape';

import {SpatialJoinType, spatialJoin} from '../../src/operations/join';
import {joinTestDataIntersects} from '../spatial-data';

test('Test spatialJoin() - intersects polys-points', async t => {
  const source = {features: joinTestDataIntersects.twoPolygons};
  const join = {features: joinTestDataIntersects.points};

  const result = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);

  t.deepEquals(result, [[0, 1], [4]]);

  t.end();
});

test('Test spatialJoin() - intersects polys-lines', async t => {
  const source = {features: joinTestDataIntersects.twoPolygons};
  const join = {features: joinTestDataIntersects.lines};

  const result = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);

  t.deepEquals(result, [[0], [1]]);

  t.end();
});

test('Test spatialJoin() - intersects polys-polys', async t => {
  const source = {features: joinTestDataIntersects.twoPolygons};
  const join = {features: joinTestDataIntersects.secondTwoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);

  t.deepEquals(result, [[0], [1]]);

  t.end();
});

test('Test spatialJoin() - intersects lines-points', async t => {
  const source = {features: joinTestDataIntersects.lines};
  const join = {features: joinTestDataIntersects.points};

  const result = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);

  t.deepEquals(result, [
    [0, 1],
    [2, 3, 4]
  ]);

  t.end();
});

test('Test spatialJoin() - intersects lines-lines', async t => {
  const secondLines: Feature<LineString>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [1.0, 1.0],
          [2.0, 2.0]
        ]
      },
      properties: {}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [4.0, 0.0],
          [0.0, 4.0]
        ]
      },
      properties: {}
    }
  ];

  const source = {features: joinTestDataIntersects.lines};
  const join = {features: secondLines};

  const result = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);

  t.deepEquals(result, [[], [1]]);

  t.end();
});

test('Test spatialJoin() - intersects lines-polygons', async t => {
  const source = {features: joinTestDataIntersects.lines};
  const join = {features: joinTestDataIntersects.twoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);

  t.deepEquals(result, [[0], [1]]);

  t.end();
});

test('Test spatialJoin() - intersects points-points', async t => {
  const secondPoints: Feature<Point | MultiPoint>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [1.4, 1.4]
      },
      properties: {}
    },
    // Point INTERSECTS with same Pooint
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
    // Point INTERSECTS with MultiPoint
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [5.4, 5.4],
          [15.4, 15.4]
        ]
      },
      properties: {}
    }
  ];

  const source = {features: joinTestDataIntersects.points};
  const join = {features: secondPoints};

  const result = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);

  t.deepEquals(result, [[], [1], [], [], [4]]);

  t.end();
});

test('Test spatialJoin() - intersects points-lines', async t => {
  const source = {features: joinTestDataIntersects.points};
  const join = {features: joinTestDataIntersects.lines};

  const result = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);

  t.deepEquals(result, [[0], [0], [1], [1], [1]]);

  t.end();
});

test('Test spatialJoin() - intersects points-polys', async t => {
  const source = {features: joinTestDataIntersects.points};
  const join = {features: joinTestDataIntersects.twoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.INTERSECTS);

  t.deepEquals(result, [[0], [0], [], [], [1]]);

  t.end();
});
