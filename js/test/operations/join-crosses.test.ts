

import {Feature, LineString, Point, MultiPoint, MultiLineString} from 'geojson';
import test from 'tape';

import {SpatialJoinType, spatialJoin} from '../../src/operations/join';
import {joinTestDataCrosses} from '../spatial-data';

test('Test spatialJoin() - crosses polys-points', async t => {
  const source = {features: joinTestDataCrosses.twoPolygons};
  const join = {features: joinTestDataCrosses.points};

  const result = await spatialJoin(source, join, SpatialJoinType.CROSSES);

  // POLYGON doesn't CROSSES POINT (even point inside poly)
  // POLYGON CROSSES MULTIPOINT (one inside polygon one outside polygon)
  t.deepEquals(result, [[1], []]);

  t.end();
});

test('Test spatialJoin() - crosses polys-lines', async t => {
  const source = {features: joinTestDataCrosses.twoPolygons};
  const join = {features: joinTestDataCrosses.lines};

  const result = await spatialJoin(source, join, SpatialJoinType.CROSSES);

  t.deepEquals(result, [[0], [1]]);

  t.end();
});

test('Test spatialJoin() - crosses polys-polys', async t => {
  const source = {features: joinTestDataCrosses.twoPolygons};
  const join = {features: joinTestDataCrosses.polygons};

  const result = await spatialJoin(source, join, SpatialJoinType.CROSSES);

  // polygon does NOT CROSS any polygon, it could be overlapping
  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - crosses lines-points', async t => {
  const twoLines: Feature<LineString>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [0.4, 0.4],
          [0.2, 0.2]
        ]
      },
      properties: {}
    },
    joinTestDataCrosses.lines[1]
  ];
  const fivePoints: Feature<Point | MultiPoint>[] = [
    joinTestDataCrosses.points[0],
    // LINE does NOT CROSSES POINT
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0.3, 0.3]
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
    },
    joinTestDataCrosses.points[2],
    joinTestDataCrosses.points[3]
  ];
  const source = {features: twoLines};
  const join = {features: fivePoints};

  const result = await spatialJoin(source, join, SpatialJoinType.CROSSES);

  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - crosses lines-lines', async t => {
  const twoMultiLines: Feature<MultiLineString | LineString>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'MultiLineString',
        coordinates: [
          [
            [0.0, 0.0],
            [1.0, 0.0]
          ],
          [
            [0.4, 0.4],
            [0.2, 0.2]
          ]
        ]
      },
      properties: {}
    },
    joinTestDataCrosses.lines[1]
  ];

  const twoLines: Feature<LineString>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-1.0, 0.0],
          [0.5, 0.0]
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

  const source = {features: twoMultiLines};
  const join = {features: twoLines};

  const result = await spatialJoin(source, join, SpatialJoinType.CROSSES);

  t.deepEquals(result, [[], [1]]);

  t.end();
});

test('Test spatialJoin() - crosses lines-polygons', async t => {
  const twoLines: Feature<LineString>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [0.2, 0.2],
          [0.4, 0.4]
        ]
      },
      properties: {}
    },
    joinTestDataCrosses.lines[1]
  ];
  const twoPolys = joinTestDataCrosses.twoPolygons;

  const source = {features: twoLines};
  const join = {features: twoPolys};

  const result = await spatialJoin(source, join, SpatialJoinType.CROSSES);

  t.deepEquals(result, [[], [1]]);

  t.end();
});

test('Test spatialJoin() - crosses points-points', async t => {
  const fourMultiPoints1: Feature<Point | MultiPoint>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [1.4, 1.4],
          [0.2, 0.2]
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

  const fourMultiPoints2: Feature<Point | MultiPoint>[] = [
    // MultiPoint does NOT CROSSES MultiPoint
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [0.4, 0.4],
          [0.2, 0.2]
        ]
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
    },
    // MultiPoint does NOT CROSSES Point
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0.2, 0.2]
      },
      properties: {}
    },
    // Point does NOT CROSSES same Point
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [15.4, 15.4]
      },
      properties: {}
    },
    // Point does NOT CROSSES MultiPoint
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

  const source = {features: fourMultiPoints1};
  const join = {features: fourMultiPoints2};

  const result = await spatialJoin(source, join, SpatialJoinType.CROSSES);

  // even two multipoints share same point, the crosses test still return false
  t.deepEquals(result, [[], [], [], []]);

  t.end();
});

test('Test spatialJoin() - crosses points-lines', async t => {
  const crossMultiPoints: Feature<Point | MultiPoint>[] = [
    ...joinTestDataCrosses.points,
    // MultiPOINT CROSSES Line
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [10.0, 10.0],
          [1.0, 11.0]
        ]
      },
      properties: {}
    }
  ];
  const source = {features: crossMultiPoints};
  const join = {features: joinTestDataCrosses.lines};

  const result = await spatialJoin(source, join, SpatialJoinType.CROSSES);

  // points CROSSES lines should always return false
  t.deepEquals(result, [[], [], [], [], [1]]);

  t.end();
});

test('Test spatialJoin() - crosses points-polys', async t => {
  const twoPolys = joinTestDataCrosses.twoPolygons;
  const fourMultiPoints: Feature<MultiPoint | Point>[] = [
    // MultiPOINT CROSSES POLYGON
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [-1.0, -1.0],
          [0.2, 0.2]
        ]
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
    },
    joinTestDataCrosses.points[2],
    joinTestDataCrosses.points[3]
  ];

  const source = {features: fourMultiPoints};
  const join = {features: twoPolys};

  const result = await spatialJoin(source, join, SpatialJoinType.CROSSES);

  t.deepEquals(result, [[0], [], [], []]);

  t.end();
});
