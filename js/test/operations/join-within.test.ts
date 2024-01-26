import {Feature, LineString, MultiPoint, Point} from 'geojson';
import test from 'tape';

import {SpatialJoinType, spatialJoin} from '../../src/operations/join';
import {joinTestDataWithin} from '../spatial-data';

test('Test spatialJoin() - within polys-points', async t => {
  const source = {features: joinTestDataWithin.twoPolygons};
  const join = {features: joinTestDataWithin.points};

  const result = await spatialJoin(source, join, SpatialJoinType.WITHIN);

  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - within polys-lines', async t => {
  const source = {features: joinTestDataWithin.twoPolygons};
  const join = {features: joinTestDataWithin.lines};

  const result = await spatialJoin(source, join, SpatialJoinType.WITHIN);

  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - within polys-polys', async t => {
  const source = {features: joinTestDataWithin.twoPolygons};
  const join = {features: joinTestDataWithin.secondTwoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.WITHIN);

  t.deepEquals(result, [[], [1]]);

  t.end();
});

test('Test spatialJoin() - within lines-points', async t => {
  const source = {features: joinTestDataWithin.secondLines};
  const join = {features: joinTestDataWithin.secondPoints};

  const result = await spatialJoin(source, join, SpatialJoinType.WITHIN);

  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - within lines-lines', async t => {
  const thirdLines: Feature<LineString>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [0.0, 0.0],
          [0.5, 0.5]
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

  const source = {features: joinTestDataWithin.secondLines};
  const join = {features: thirdLines};

  const result = await spatialJoin(source, join, SpatialJoinType.WITHIN);

  t.deepEquals(result, [[0], []]);

  t.end();
});

test('Test spatialJoin() - within lines-polygons', async t => {
  const source = {features: joinTestDataWithin.secondLines};
  const join = {features: joinTestDataWithin.twoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.WITHIN);

  t.deepEquals(result, [[0], []]);

  t.end();
});

test('Test spatialJoin() - within points-points', async t => {
  const firstPoints: Feature<Point | MultiPoint>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [1.4, 1.4]
      },
      properties: {}
    },
    // Point can WITHIN Point
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
        type: 'MultiPoint', // MultiPoint can not WITHIN Point
        coordinates: [
          [11.0, 11.0],
          [21.0, 21.0]
        ]
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

  const pointsWithin: Feature<MultiPoint | Point>[] = [
    ...joinTestDataWithin.secondPoints,
    // Point can WITHIN MultiPoint
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [15.4, 15.4],
          [16.4, 16.4]
        ]
      },
      properties: {}
    }
  ];

  const source = {features: firstPoints};
  const join = {features: pointsWithin};

  const result = await spatialJoin(source, join, SpatialJoinType.WITHIN);

  t.deepEquals(result, [[], [1], [], [], [5]]);

  t.end();
});

test('Test spatialJoin() - within points-lines', async t => {
  const pointsWithin: Feature<MultiPoint | Point>[] = [
    ...joinTestDataWithin.secondPoints,
    // MultiPoint WITHIN LINE
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [0.25, 0.25],
          [0.35, 0.35]
        ]
      },
      properties: {}
    }
  ];
  const source = {features: pointsWithin};
  const join = {features: joinTestDataWithin.secondLines};

  const result = await spatialJoin(source, join, SpatialJoinType.WITHIN);

  // Point WITHIN LINE (Not == line ends)
  t.deepEquals(result, [[0], [], [], [1], [], [0]]);

  t.end();
});

test('Test spatialJoin() - within points-polys', async t => {
  const firstPoints: Feature<MultiPoint | Point>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0.0, 0.4]
      },
      properties: {}
    },
    joinTestDataWithin.points[1],
    joinTestDataWithin.points[2],
    joinTestDataWithin.points[3],
    joinTestDataWithin.points[4]
  ];
  const source = {features: firstPoints};
  const join = {features: joinTestDataWithin.twoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.WITHIN);

  t.deepEquals(result, [[], [0], [], [], [1]]);

  t.end();
});
