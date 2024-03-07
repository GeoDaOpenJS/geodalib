import {getBinaryGeometryTemplate} from '@loaders.gl/arrow';
import {BinaryFeatureCollection} from '@loaders.gl/schema';
import test from 'tape';

import {getContiguityNeighborsFromBinaryGeometries} from '../../src/weights/contiguity-neighbors';
import {getMetaFromWeights} from '../../src/weights/weights-stats';

test('Test getContiguityNeighborsFromBinaryGeometries()', async t => {
  const binaryGeometryType = {
    point: true,
    line: false,
    polygon: false
  };

  const binaryGeometries: BinaryFeatureCollection[] = [
    {
      shape: 'binary-feature-collection',
      points: {
        ...getBinaryGeometryTemplate(),
        type: 'Point',
        globalFeatureIds: {value: new Uint32Array([0, 1, 2, 3, 4]), size: 1},
        positions: {
          value: new Float64Array([1.4, 1.4, 0.2, 0.2, 2.4, 1.4, 21.0, 21.0, 15.4, 15.4]),
          size: 2
        },
        properties: [{index: 0}, {index: 1}, {index: 2}, {index: 3}, {index: 4}],
        featureIds: {value: new Uint32Array([0, 1, 2, 3, 4]), size: 1}
      },
      lines: {
        ...getBinaryGeometryTemplate(),
        type: 'LineString',
        pathIndices: {value: new Uint16Array(0), size: 1}
      },
      polygons: {
        ...getBinaryGeometryTemplate(),
        type: 'Polygon',
        polygonIndices: {value: new Uint16Array(0), size: 1},
        primitivePolygonIndices: {value: new Uint16Array(0), size: 1}
      }
    }
  ];

  const isQueen = true;
  const useCentroids = true;
  const result = await getContiguityNeighborsFromBinaryGeometries({
    binaryGeometryType,
    binaryGeometries,
    isQueen,
    useCentroids
  });

  t.deepEqual(result, [[1, 2, 4], [0], [0, 4], [4], [0, 2, 3]]);

  const wMeta = getMetaFromWeights(result);

  t.deepEqual(wMeta, {
    numberOfObservations: 5,
    minNeighbors: 1,
    maxNeighbors: 3,
    meanNeighbors: 2,
    medianNeighbors: 2,
    pctNoneZero: 0.4
  });

  t.end();
});
