import {Feature, Polygon, MultiLineString, LineString, Point, MultiPoint} from 'geojson';
import test from 'tape';

import {SpatialJoinType, spatialJoin} from '../../src/operations/join';
import {joinTestDataOverlaps} from '../spatial-data';

test('Test spatialJoin() - overlaps polys-points', async t => {
  const source = {features: joinTestDataOverlaps.twoPolygons};
  const join = {features: joinTestDataOverlaps.points};

  const result = await spatialJoin(source, join, SpatialJoinType.OVERLAPS);

  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - overlaps polys-lines', async t => {
  const source = {features: joinTestDataOverlaps.twoPolygons};
  const join = {features: joinTestDataOverlaps.lines};

  const result = await spatialJoin(source, join, SpatialJoinType.OVERLAPS);

  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - overlaps polys-polys', async t => {
  const secondTwoPolygons: Feature<Polygon>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1.0, 1.0],
            [1.0, 2.0],
            [2.0, 2.0],
            [2.0, 1.0],
            [1.0, 1.0]
          ]
        ]
      },
      properties: {}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6.0, 6.0],
            [8.0, 6.0],
            [8.0, 8.0],
            [6.0, 8.0],
            [6.0, 6.0]
          ]
        ]
      },
      properties: {}
    }
  ];

  const source = {features: joinTestDataOverlaps.twoPolygons};
  const join = {features: secondTwoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.OVERLAPS);

  t.deepEquals(result, [[], [1]]);

  t.end();
});

test('Test spatialJoin() - overlaps lines-points', async t => {
  const firstLines: Feature<LineString>[] = [
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
    joinTestDataOverlaps.lines[1]
  ];
  const source = {features: firstLines};
  const join = {features: joinTestDataOverlaps.secondPoints};

  const result = await spatialJoin(source, join, SpatialJoinType.OVERLAPS);

  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - overlaps lines-lines', async t => {
  const firstLines: Feature<MultiLineString | LineString>[] = [
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
  const secondLines: Feature<LineString>[] = [
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

  const source = {features: firstLines};
  const join = {features: secondLines};

  const result = await spatialJoin(source, join, SpatialJoinType.OVERLAPS);

  t.deepEquals(result, [[0], []]);

  t.end();
});

test('Test spatialJoin() - overlaps lines-polygons', async t => {
  const source = {features: joinTestDataOverlaps.secondLines};
  const join = {features: joinTestDataOverlaps.twoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.OVERLAPS);

  t.deepEquals(result, [[], []]);

  t.end();
});

test('Test spatialJoin() - overlaps points-points', async t => {
  const firstPoints: Feature<MultiPoint | Point>[] = [
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

  const secondPoints: Feature<MultiPoint | Point>[] = [
    // MultiPoint OVERLAPS MultiPoint
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
    // MultiPoint does NOT OVERLPAS Point
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0.2, 0.2]
      },
      properties: {}
    },
    joinTestDataOverlaps.points[2],
    joinTestDataOverlaps.points[3],
    joinTestDataOverlaps.points[4],
    // Point does NOT OVERLAPS same Point
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [21.0, 21.0]
      },
      properties: {}
    },
    // Point does NOT OVERLAPS MultiPoint
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
  const join = {features: secondPoints};

  const result = await spatialJoin(source, join, SpatialJoinType.OVERLAPS);

  t.deepEquals(result, [[0], [], [], []]);

  t.end();
});

test('Test spatialJoin() - overlaps points-lines', async t => {
  // Point does NOT OVERLAPS Line
  const pointsOverlaps: Feature<Point>[] = [
    ...joinTestDataOverlaps.secondPoints,
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0.3, 0.3]
      },
      properties: {}
    }
  ];
  const source = {features: pointsOverlaps};
  const join = {features: joinTestDataOverlaps.secondLines};

  const result = await spatialJoin(source, join, SpatialJoinType.OVERLAPS);

  t.deepEquals(result, [[], [], [], [], [], []]);

  t.end();
});

test('Test spatialJoin() - overlaps points-polys', async t => {
  const firstPoints: Feature<Point>[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0.0, 0.4]
      },
      properties: {}
    },
    joinTestDataOverlaps.points[1],
    joinTestDataOverlaps.points[2],
    joinTestDataOverlaps.points[3],
    joinTestDataOverlaps.points[4]
  ];
  const source = {features: firstPoints};
  const join = {features: joinTestDataOverlaps.twoPolygons};

  const result = await spatialJoin(source, join, SpatialJoinType.OVERLAPS);

  t.deepEquals(result, [[], [], [], [], []]);

  t.end();
});
