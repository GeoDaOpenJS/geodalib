import { describe, it, expect } from '@jest/globals';
import { spatialJoin } from '../../src/geometry/spatial-join';
import { POINT_BINARY_GEOMETRIES, POLYGON_BINARY_GEOMETRIES } from '../geometry-data';

describe('Spatial Join', () => {
  it('should join polygons with points correctly', async () => {
    const result = await spatialJoin({
      leftGeometries: POLYGON_BINARY_GEOMETRIES,
      rightGeometries: POINT_BINARY_GEOMETRIES,
    });

    expect(result).toEqual([[1], [4]]);
  });

  it('should join points with polygons correctly', async () => {
    const result = await spatialJoin({
      rightGeometries: POLYGON_BINARY_GEOMETRIES,
      leftGeometries: POINT_BINARY_GEOMETRIES,
    });

    expect(result).toEqual([[], [0], [], [], [1]]);
  });
});
