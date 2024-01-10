

import {
  Feature,
  Polygon,
  MultiPolygon,
  LineString,
  MultiLineString,
  Point,
  MultiPoint
} from 'geojson';
import test from 'tape';

import {initWASM, setWASM} from '../../src/init';
import {getCentroids, getCentroid, getGeojsonCentroids} from '../../src/operations/centroids';

const points: Feature<Point | MultiPoint>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [1.0, 1.0]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: []
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'MultiPoint',
      coordinates: [
        [0.0, 0.0],
        [1.0, 1.0]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'MultiPoint',
      coordinates: [[]]
    },
    properties: {}
  }
];

test('Test getCentroid() - Point', async t => {
  // init wasm instance
  const wasm = await initWASM();
  setWASM(wasm);

  let centroid = getCentroid(points[0]);
  t.deepEqual(centroid, [1.0, 1.0]);

  centroid = getCentroid(points[1]);
  t.equal(centroid, null);

  centroid = getCentroid(points[2]);
  t.deepEqual(centroid, [0.5, 0.5]);

  centroid = getCentroid(points[3]);
  t.equal(centroid, null);

  t.end();
});

const lines: Feature<LineString | MultiLineString>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0.0, 0.0],
        [1.0, 0.0]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: []
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'MultiLineString',
      coordinates: [
        [
          [0.0, 0.0],
          [1.0, 1.0]
        ],
        [
          [2.0, 2.0],
          [3.0, 3.0]
        ]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'MultiLineString',
      coordinates: [[]]
    },
    properties: {}
  }
];

test('Test getCentroid() - Lines', async t => {
  // init wasm instance
  const wasm = await initWASM();
  setWASM(wasm);

  let centroid = getCentroid(lines[0]);
  t.deepEqual(centroid, [0.5, 0.0]);

  centroid = getCentroid(lines[1]);
  t.equal(centroid, null);

  centroid = getCentroid(lines[2]);
  t.deepEqual(centroid, [1.5, 1.5]);

  centroid = getCentroid(lines[3]);
  t.equal(centroid, null);

  t.end();
});

const polygons: Feature<Polygon | MultiPolygon>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0.0, 0.0],
          [0.0, 1.0],
          [1.0, 1.0],
          [1.0, 0.0],
          [0.0, 0.0]
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
          [0.0, 0.0],
          [0.0, 1.0],
          [1.0, 1.0],
          [1.0, 0.0],
          [0.0, 0.0]
        ],
        [
          [0.2, 0.2],
          [0.5, 0.2],
          [0.5, 0.5],
          [0.2, 0.5],
          [0.2, 0.2]
        ]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [0.0, 0.0],
            [0.0, 1.0],
            [1.0, 1.0],
            [1.0, 0.0],
            [0.0, 0.0]
          ]
        ],
        [
          [
            [0.0, 0.0],
            [0.0, 1.0],
            [1.0, 1.0],
            [1.0, 0.0],
            [0.0, 0.0]
          ],
          [
            [0.2, 0.2],
            [0.5, 0.2],
            [0.5, 0.5],
            [0.2, 0.5],
            [0.2, 0.2]
          ]
        ]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'MultiPolygon',
      coordinates: [[[]]]
    },
    properties: {}
  }
];

test('Test getCentroids() - Polygons', async t => {
  const centroids = await getCentroids(polygons);
  t.equal(centroids.length, 4);

  t.equal(centroids[0]?.geometry.coordinates[0], 0.5);
  t.equal(centroids[0]?.geometry.coordinates[1], 0.5);
  t.equal(centroids[1]?.geometry.coordinates[0], 0.5148351648351648);
  t.equal(centroids[1]?.geometry.coordinates[1], 0.5148351648351648);
  t.equal(centroids[2]?.geometry.coordinates[0], 0.507068062827225);
  t.equal(centroids[2]?.geometry.coordinates[1], 0.507068062827225);
  t.equal(centroids[3], null);

  t.end();
});

test('Test getGeojsonCentroids()', async t => {
  // init wasm instance
  const wasm = await initWASM();
  setWASM(wasm);

  const noCentroids = getGeojsonCentroids([null]);
  t.deepEqual(noCentroids, [null], 'should return null centroid');

  const testPolys = [...polygons, null];
  const centroids = getGeojsonCentroids(testPolys);

  t.deepEqual(
    centroids,
    [
      [0.5, 0.5],
      [0.5148351648351648, 0.5148351648351648],
      [0.507068062827225, 0.507068062827225],
      null,
      null
    ],
    'should return correct centroids'
  );
  t.end();
});

test('Test getCentroid()', async t => {
  const geoda = await initWASM();
  setWASM(geoda);

  // test valid polygon
  const centroid = getCentroid(polygons[0]);
  t.deepEqual(centroid, [0.5, 0.5], 'should get centroid correctly');

  // test valid polygon
  const emptyCentroid = getCentroid(polygons[3]);
  t.deepEqual(emptyCentroid, null, 'should get empty centroid correctly');

  // test null input
  const nullCentroid = getCentroid(null);
  t.equal(nullCentroid, null, 'getCentroid should return null if input is null');

  // test invalid input
  const mockupInvalidFeature = {} as Feature;
  const invalidCentroid = getCentroid(mockupInvalidFeature);
  t.equal(invalidCentroid, null, 'getCentroid should return null if input is invalid');

  t.end();
});
