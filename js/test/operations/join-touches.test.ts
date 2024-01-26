import {Feature, MultiPoint, Point, LineString} from 'geojson';
import test from 'tape';

import {SpatialJoinType, spatialJoin} from '../../src/operations/join';
import {joinTestDataTouches} from '../spatial-data';

test('Test spatialJoin() - touches polys-points', async t => {
  const source = {features: joinTestDataTouches.twoPolygons};
  const pointsTouches: Feature<MultiPoint | Point>[] = [
    ...joinTestDataTouches.points,
    // Polygon TOUCHES MultiPoint
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [1.0, 0.2],
          [1.4, 1.4]
        ]
      },
      properties: {}
    }
  ];

  const join = {features: pointsTouches};

  const result = await spatialJoin(source, join, SpatialJoinType.TOUCHES);

  t.deepEquals(result, [[0, 5], []]);

  t.end();
});

test('Test spatialJoin() - touches polys-lines', async t => {
  const source = {features: joinTestDataTouches.twoPolygons};
  const join = {features: joinTestDataTouches.lines};

  const result = await spatialJoin(source, join, SpatialJoinType.TOUCHES);

  t.deepEquals(result, [[0], []]);

  t.end();
});

test('Test spatialJoin() - touches polys-polys', async t => {
  const source = {features: joinTestDataTouches.twoPolygons};
  const join = {features: joinTestDataTouches.secondTwoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.TOUCHES);

  t.deepEquals(result, [[0], []]);

  t.end();
});

test('Test spatialJoin() - touches lines-points', async t => {
  const source = {features: joinTestDataTouches.secondLines};
  const join = {features: joinTestDataTouches.secondPoints};

  const result = await spatialJoin(source, join, SpatialJoinType.TOUCHES);

  t.deepEquals(result, [
    [0, 1],
    [2, 4]
  ]);

  t.end();
});

test('Test spatialJoin() - touches lines-lines', async t => {
  const thirdLines: Feature<LineString>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [0.3, 0.0],
          [0.3, 0.3]
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

  const source = {features: joinTestDataTouches.secondLines};
  const join = {features: thirdLines};

  const result = await spatialJoin(source, join, SpatialJoinType.TOUCHES);

  t.deepEquals(result, [[0], []]);

  t.end();
});

test('Test spatialJoin() - touches lines-polygons', async t => {
  const firstLines: Feature<LineString>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [0.2, 0.0],
          [0.4, 0.0]
        ]
      },
      properties: {}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [1.4, 0.4],
          [11.0, 11.0],
          [5.4, 5.4]
        ]
      },
      properties: {}
    }
  ];

  const source = {features: firstLines};
  const join = {features: joinTestDataTouches.twoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.TOUCHES);

  t.deepEquals(result, [[0], []]);

  t.end();
});

test('Test spatialJoin() - touches points-points', async t => {
  const source = {features: joinTestDataTouches.thirdPoints};
  const pointTouches: Feature<MultiPoint | Point>[] = [
    ...joinTestDataTouches.fourthPoints,
    // multipoint does not touch with multipoint
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [2.4, 2.4],
          [0.2, 0.2]
        ]
      },
      properties: {}
    },
    // point does not touch with same point
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [15.4, 15.4]
      },
      properties: {}
    }
  ];
  const join = {features: pointTouches};
  const result = await spatialJoin(source, join, SpatialJoinType.TOUCHES);

  t.deepEquals(result, [[], [], [], []]);

  t.end();
});

test('Test spatialJoin() - touches points-lines', async t => {
  const source = {features: joinTestDataTouches.secondPoints};
  const join = {features: joinTestDataTouches.secondLines};

  const result = await spatialJoin(source, join, SpatialJoinType.TOUCHES);

  t.deepEquals(result, [[0], [0], [1], [], [1]]);

  t.end();
});

test('Test spatialJoin() - touches points-polys', async t => {
  const firstPoints: Feature<Point>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0.0, 0.4]
      },
      properties: {}
    },
    joinTestDataTouches.points[1],
    joinTestDataTouches.points[2],
    joinTestDataTouches.points[3],
    joinTestDataTouches.points[4]
  ];
  const source = {features: firstPoints};
  const join = {features: joinTestDataTouches.twoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.TOUCHES);

  t.deepEquals(result, [[0], [], [], [], []]);

  t.end();
});
