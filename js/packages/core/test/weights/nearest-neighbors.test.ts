// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { describe, it, expect } from '@jest/globals';
import { getNearestNeighborsFromBinaryGeometries } from '../../src/weights/nearest-neighbors';
import { POINT_BINARY_GEOMETRIES } from '../geometry-data';
import { getMetaFromWeights } from '../../src/weights/weights-stats';
import { createWeights } from '../../src/weights/utils';

describe('getNearestNeighborsFromBinaryGeometries', () => {
  it('should handle point geometries correctly', async () => {
    const binaryGeometryType = {
      point: true,
      line: false,
      polygon: false,
    };

    const result = await getNearestNeighborsFromBinaryGeometries({
      binaryGeometries: POINT_BINARY_GEOMETRIES,
      binaryGeometryType,
      k: 2,
    });

    const meta = getMetaFromWeights(result);

    expect(meta.numberOfObservations).toBe(5);
    expect(meta.minNeighbors).toBe(2);
    expect(meta.maxNeighbors).toBe(2);
    expect(meta.meanNeighbors).toBe(2);
    expect(meta.medianNeighbors).toBe(2);
    expect(meta.pctNoneZero).toBe(0.4);

    const { weights, weightsMeta } = await createWeights({
      weightsType: 'knn',
      geometries: POINT_BINARY_GEOMETRIES,
      k: 2,
    });

    expect(weights).toEqual([
      [1, 2],
      [2, 0],
      [1, 0],
      [2, 4],
      [2, 3],
    ]);

    expect(weightsMeta).toEqual({
      k: 2,
      maxNeighbors: 2,
      meanNeighbors: 2,
      medianNeighbors: 2,
      numberOfObservations: 5,
      minNeighbors: 2,
      pctNoneZero: 0.4,
      symmetry: 'symmetric',
      type: 'knn',
    });
  });
});
