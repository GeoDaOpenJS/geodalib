import { describe, it, expect } from '@jest/globals';
import { getNearestNeighborsFromBinaryGeometries } from '../../src/weights/nearest-neighbors';
import { POINT_BINARY_GEOMETRIES } from '../geometry-data';
import { getMetaFromWeights } from '../../src/weights/weights-stats';

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
  });
});
