

import {Feature, Polygon, MultiPolygon, Geometry} from 'geojson';
import test from 'tape';

import {initWASM, resetWASM, setWASM} from '../../src/init';
import {spatialMerge, spatialMergeSync} from '../../src/operations/union';

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
          [0.5, 0.5],
          [0.5, 1.5],
          [1.5, 1.5],
          [1.5, 0.5],
          [0.5, 0.5]
        ]
      ]
    },
    properties: {}
  }
];

const expectedUnionPolygon = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [0.49999992500000373, 1.0],
        [0.5, 1.5],
        [1.5, 1.5],
        [1.5, 0.5],
        [1.0, 0.4999999250000038],
        [1.0, 0.0],
        [0.0, 0.0],
        [0.0, 1.0],
        [0.49999992500000373, 1.0]
      ]
    ]
  },
  properties: {}
};

test('Test spatialUnion() - Polygon', async t => {
  const unionPoly: Feature<Geometry> = await spatialMerge(polygons);

  t.deepEquals(unionPoly, expectedUnionPolygon, 'should return merged polygon');

  t.end();
});

test('Test spatialMergeSync()', async t => {
  resetWASM();
  const emptyPolygon: Feature<Geometry> = spatialMergeSync(polygons);

  t.deepEquals(
    emptyPolygon,
    {
      type: 'Feature',
      geometry: {type: 'Polygon', coordinates: []},
      properties: {}
    },
    'should return an empty Polygon feature'
  );

  // init wasm instance
  const wasm = await initWASM();
  setWASM(wasm);

  const unionPoly: Feature<Geometry> = spatialMergeSync(polygons);

  t.deepEquals(unionPoly, expectedUnionPolygon, 'should return merged polygon');

  t.end();
});
