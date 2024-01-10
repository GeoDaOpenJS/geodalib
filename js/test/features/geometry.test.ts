

import test from 'tape';

import {
  getGeojsonPolygon,
  getPolygonCollection,
  getLineCollection,
  getPointCollection,
  getPointCollectionFromLatLng
} from '../../src/features/geometry';
import {initWASM} from '../../src/init';
import {joinTestData} from '../spatial-data';
import {reducePrecision} from '../utils';

test('Test getGeojsonPolygon()', async t => {
  const wasmInstance = await initWASM();
  const geodaPolygon = new wasmInstance.Polygon();

  const xs = new wasmInstance.VectorDouble();
  const ys = new wasmInstance.VectorDouble();
  // p0
  xs.push_back(0.0);
  ys.push_back(0.0);
  // p1
  xs.push_back(0.0);
  ys.push_back(1.0);
  // p2
  xs.push_back(1.0);
  ys.push_back(1.0);
  // p3
  xs.push_back(1.0);
  ys.push_back(0.0);
  // p4
  xs.push_back(0.0);
  ys.push_back(0.0);

  geodaPolygon.addPart(xs, ys, false);

  const geojsonPoly = getGeojsonPolygon(geodaPolygon);

  t.deepEquals(geojsonPoly, {
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
  });

  t.end();
});

// eslint-disable-next-line max-statements
test('Test getGeojsonPolygon() - polygon with holes', async t => {
  const wasmInstance = await initWASM();
  const geodaPolygon = new wasmInstance.Polygon();

  const xs = new wasmInstance.VectorDouble();
  const ys = new wasmInstance.VectorDouble();
  // p0
  xs.push_back(0.0);
  ys.push_back(0.0);
  // p1
  xs.push_back(0.0);
  ys.push_back(1.0);
  // p2
  xs.push_back(1.0);
  ys.push_back(1.0);
  // p3
  xs.push_back(1.0);
  ys.push_back(0.0);
  // p4
  xs.push_back(0.0);
  ys.push_back(0.0);

  geodaPolygon.addPart(xs, ys, false);

  const xs1 = new wasmInstance.VectorDouble();
  const ys1 = new wasmInstance.VectorDouble();
  // p0
  xs1.push_back(0.2);
  ys1.push_back(0.2);
  // p3
  xs1.push_back(0.5);
  ys1.push_back(0.2);
  // p2
  xs1.push_back(0.5);
  ys1.push_back(0.5);
  // p1
  xs1.push_back(0.2);
  ys1.push_back(0.5);
  // p4
  xs1.push_back(0.2);
  ys1.push_back(0.2);

  geodaPolygon.addPart(xs1, ys1, true);

  const geojsonPoly = getGeojsonPolygon(geodaPolygon);

  t.deepEquals(geojsonPoly, {
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
  });

  t.end();
});

// eslint-disable-next-line max-statements
test('Test getGeojsonPolygon() - multipolygon', async t => {
  const wasmInstance = await initWASM();
  const geodaPolygon = new wasmInstance.Polygon();

  const xs0 = new wasmInstance.VectorDouble();
  const ys0 = new wasmInstance.VectorDouble();
  // p0
  xs0.push_back(10.0);
  ys0.push_back(10.0);
  // p1
  xs0.push_back(10.0);
  ys0.push_back(11.0);
  // p2
  xs0.push_back(11.0);
  ys0.push_back(11.0);
  // p3
  xs0.push_back(11.0);
  ys0.push_back(10.0);
  // p4
  xs0.push_back(10.0);
  ys0.push_back(10.0);

  geodaPolygon.addPart(xs0, ys0, false);

  const xs = new wasmInstance.VectorDouble();
  const ys = new wasmInstance.VectorDouble();
  // p0
  xs.push_back(0.0);
  ys.push_back(0.0);
  // p1
  xs.push_back(0.0);
  ys.push_back(1.0);
  // p2
  xs.push_back(1.0);
  ys.push_back(1.0);
  // p3
  xs.push_back(1.0);
  ys.push_back(0.0);
  // p4
  xs.push_back(0.0);
  ys.push_back(0.0);

  geodaPolygon.addPart(xs, ys, false);

  const xs1 = new wasmInstance.VectorDouble();
  const ys1 = new wasmInstance.VectorDouble();
  // p0
  xs1.push_back(0.2);
  ys1.push_back(0.2);
  // p3
  xs1.push_back(0.5);
  ys1.push_back(0.2);
  // p2
  xs1.push_back(0.5);
  ys1.push_back(0.5);
  // p1
  xs1.push_back(0.2);
  ys1.push_back(0.5);
  // p4
  xs1.push_back(0.2);
  ys1.push_back(0.2);

  geodaPolygon.addPart(xs1, ys1, true);

  const geojsonPoly = getGeojsonPolygon(geodaPolygon);

  t.deepEquals(geojsonPoly, {
    type: 'Feature',
    geometry: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [10.0, 10.0],
            [10.0, 11.0],
            [11.0, 11.0],
            [11.0, 10.0],
            [10.0, 10.0]
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
  });

  t.end();
});

test('Test getPolygonCollection()', async t => {
  const wasmInstance = await initWASM();

  const geodaPolygons = getPolygonCollection(joinTestData.twoPolygons, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = wasmInstance.getCentroids(geodaPolygons);

  t.equal(centroids.size(), 2, 'should return correct size of centroids');

  const expectedCentroids = [
    [0.5, 0.5],
    [6, 6]
  ];
  const actualCentroids = [
    [centroids.get(0).get(0), centroids.get(0).get(1)],
    [centroids.get(1).get(0), centroids.get(1).get(1)]
  ];
  t.deepEqual(actualCentroids, expectedCentroids, 'getPolygonCollect works as expected.');

  t.end();
});

test('Test getLineCollection()', async t => {
  const wasmInstance = await initWASM();

  const geodaLines = getLineCollection(joinTestData.lines, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = wasmInstance.getCentroids(geodaLines);

  t.equal(centroids.size(), 2, 'should return correct size of centroids');

  const expectedCentroids = [
    [0.8, 0.4],
    [6.9128142318569195, 6.591017789821149]
  ];
  const actualCentroids = [
    [centroids.get(0).get(0), centroids.get(0).get(1)],
    [centroids.get(1).get(0), centroids.get(1).get(1)]
  ];
  t.deepEqual(actualCentroids, expectedCentroids, 'getLineCollection works as expected.');

  t.end();
});

test('Test getPointCollection()', async t => {
  const wasmInstance = await initWASM();

  const geodaPoints = getPointCollection(joinTestData.points, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = wasmInstance.getCentroids(geodaPoints);

  t.equal(centroids.size(), 4, 'should return correct size of centroids');

  const expectedCentroids = [
    [0, 0],
    [0.8, 0.3],
    [11, 11],
    [5.4, 5.4]
  ];
  const actualCentroids = reducePrecision([
    [centroids.get(0).get(0), centroids.get(0).get(1)],
    [centroids.get(1).get(0), centroids.get(1).get(1)],
    [centroids.get(2).get(0), centroids.get(2).get(1)],
    [centroids.get(3).get(0), centroids.get(3).get(1)]
  ]);
  t.deepEqual(actualCentroids, expectedCentroids, 'getPointCollection works as expected.');

  t.end();
});

test('Test getPointCollectionFromLatLng()', async t => {
  const wasmInstance = await initWASM();

  const lat: number[] = [0, 1, 2];
  const lng: number[] = [0, 1, 2];
  const geodaPoints = getPointCollectionFromLatLng(lat, lng, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = wasmInstance.getCentroids(geodaPoints);

  t.equal(centroids.size(), 3, 'should return correct size of centroids');

  const expectedCentroids = [
    [0, 0],
    [1, 1],
    [2, 2]
  ];
  const actualCentroids = [
    [centroids.get(0).get(0), centroids.get(0).get(1)],
    [centroids.get(1).get(0), centroids.get(1).get(1)],
    [centroids.get(2).get(0), centroids.get(2).get(1)]
  ];
  t.deepEqual(
    actualCentroids,
    expectedCentroids,
    'getPointCollectionFromLatLng works as expected.'
  );

  const start = 1;
  const end = 2;
  const subGeoDaPoints = getPointCollectionFromLatLng(lat, lng, wasmInstance, start, end);
  const centroids1 = wasmInstance.getCentroids(subGeoDaPoints);

  t.equal(centroids1.size(), 1, 'should return correct size of centroids');

  const actualCentroids1 = [[centroids1.get(0).get(0), centroids1.get(0).get(1)]];

  t.deepEqual(
    actualCentroids1,
    expectedCentroids.slice(start, end),
    'getPointCollectionFromLatLng works as expected.'
  );

  t.end();
});
