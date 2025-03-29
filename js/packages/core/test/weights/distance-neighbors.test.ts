import { getBinaryGeometryTemplate } from '@loaders.gl/arrow';
import { BinaryFeatureCollection } from '@loaders.gl/schema';
import test from 'tape';

import {
  getDistanceNeighborsFromBinaryGeometries,
  getDistanceThresholds,
} from '../../src/weights/distance-neighbors';
import { getMetaFromWeights } from '../../src/weights/weights-stats';

test('Test getDistanceNeighborsFromBinaryGeometries()', async t => {
  const binaryGeometryType = {
    point: true,
    line: false,
    polygon: false,
  };

  const binaryGeometries: BinaryFeatureCollection[] = [
    {
      shape: 'binary-feature-collection',
      points: {
        ...getBinaryGeometryTemplate(),
        type: 'Point',
        globalFeatureIds: { value: new Uint32Array([0, 1, 2, 3, 4]), size: 1 },
        positions: {
          value: new Float64Array([1.4, 1.4, 0.2, 0.2, 2.4, 1.4, 21.0, 21.0, 15.4, 15.4]),
          size: 2,
        },
        properties: [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }],
        featureIds: { value: new Uint32Array([0, 1, 2, 3, 4]), size: 1 },
      },
      lines: {
        ...getBinaryGeometryTemplate(),
        type: 'LineString',
        pathIndices: { value: new Uint16Array(0), size: 1 },
      },
      polygons: {
        ...getBinaryGeometryTemplate(),
        type: 'Polygon',
        polygonIndices: { value: new Uint16Array(0), size: 1 },
        primitivePolygonIndices: { value: new Uint16Array(0), size: 1 },
      },
    },
  ];

  const isMile = false;
  const suggestedThresdholds = await getDistanceThresholds({
    isMile,
    binaryGeometryType,
    binaryGeometries,
  });

  t.deepEqual(suggestedThresdholds, {
    minDistance: 111.16185827369097,
    maxDistance: 858.6438722633742,
    maxPairDistance: 3233.0455542542823,
  });

  const { minDistance } = suggestedThresdholds;

  const result = await getDistanceNeighborsFromBinaryGeometries({
    distanceThreshold: minDistance,
    binaryGeometryType,
    binaryGeometries,
  });

  t.deepEqual(result, [[2, 111.16185827369097], [], [0, 111.16185827369097], [], []]);

  const isDistanceWeights = true;
  const wMeta = getMetaFromWeights(result, isDistanceWeights);

  t.deepEqual(wMeta, {
    numberOfObservations: 5,
    minNeighbors: 0,
    maxNeighbors: 1,
    meanNeighbors: 0.4,
    medianNeighbors: 0,
    pctNoneZero: 0.08,
  });

  t.end();
});
