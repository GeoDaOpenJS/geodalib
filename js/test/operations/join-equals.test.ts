import {Feature, Polygon, Point, MultiPoint, LineString} from 'geojson';
import test from 'tape';

import {SpatialJoinType, spatialJoin} from '../../src/operations/join';
import {joinTestDataEquals} from '../spatial-data';

test('Test spatialJoin() - equals polys-points', async t => {
  const source = {features: joinTestDataEquals.twoPolygons};
  const join = {features: joinTestDataEquals.points};

  const result = await spatialJoin(source, join, SpatialJoinType.EQUALS);

  // polygon EQUALS points should always return false
  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - equals polys-lines', async t => {
  const source = {features: joinTestDataEquals.twoPolygons};
  const join = {features: joinTestDataEquals.lines};

  const result = await spatialJoin(source, join, SpatialJoinType.EQUALS);

  // polygon EQUALS lines should always return false
  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - equals polys-polys', async t => {
  const twoPolygons2: Feature<Polygon>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1.0, 1.0],
            [1.0, 0.0],
            [0.0, 0.0],
            [0.0, 1.0],
            [1.0, 1.0]
          ]
        ]
      },
      properties: {}
    },
    joinTestDataEquals.twoPolygons[1]
  ];
  const source = {features: joinTestDataEquals.twoPolygons};
  const join = {features: twoPolygons2};

  const result = await spatialJoin(source, join, SpatialJoinType.EQUALS);

  // sequence of points shouldn't matter
  t.deepEquals(result, [[0], [1]]);

  t.end();
});

test('Test spatialJoin() - equals lines-points', async t => {
  const source = {features: joinTestDataEquals.lines};
  const join = {features: joinTestDataEquals.points};

  const result = await spatialJoin(source, join, SpatialJoinType.EQUALS);

  // lines EQUALS points should always return false
  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - equals lines-lines', async t => {
  const twoLines: Feature<LineString>[] = [
    joinTestDataEquals.lines[0],
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [5.4, 5.4],
          [11.0, 11.0],
          [1.4, 0.4]
        ]
      },
      properties: {}
    }
  ];

  const source = {features: joinTestDataEquals.lines};
  const join = {features: twoLines};

  const result = await spatialJoin(source, join, SpatialJoinType.EQUALS);

  // sequence shouldn't matter
  t.deepEquals(result, [[0], [1]]);

  t.end();
});

test('Test spatialJoin() - equals lines-polygons', async t => {
  const source = {features: joinTestDataEquals.lines};
  const join = {features: joinTestDataEquals.twoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.EQUALS);

  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - equals points-points', async t => {
  const fourMultiPoints1: Feature<MultiPoint | Point>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [0.2, 0.2],
          [1.4, 0.4]
        ]
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

  const fourMultiPoints2: Feature<MultiPoint | Point>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [1.4, 0.4],
          [0.2, 0.2]
        ]
      },
      properties: {}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [5.4, 5.4]
      },
      properties: {}
    }
  ];
  const source = {features: fourMultiPoints1};
  const join = {features: fourMultiPoints2};

  const result = await spatialJoin(source, join, SpatialJoinType.EQUALS);

  t.deepEquals(result, [[0], [], [], []]);

  t.end();
});

test('Test spatialJoin() - equals points-lines', async t => {
  const source = {features: joinTestDataEquals.points};
  const join = {features: joinTestDataEquals.lines};

  const result = await spatialJoin(source, join, SpatialJoinType.EQUALS);

  // points EQUALS lines should always return false
  t.deepEquals(result, [[], [], [], [], []]);

  t.end();
});

test('Test spatialJoin() - equals points-polys', async t => {
  const source = {features: joinTestDataEquals.points};
  const join = {features: joinTestDataEquals.twoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.EQUALS);

  // points EQUALS polys should always return false
  t.deepEquals(result, [[], [], [], [], []]);

  t.end();
});
