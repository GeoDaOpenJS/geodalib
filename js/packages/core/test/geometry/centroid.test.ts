import { describe, it, expect } from '@jest/globals';
import { getCentroids } from '../../src/geometry/centroid';
import { Feature } from 'geojson';

const INPUT_POLYGONS: Feature[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0, 0],
        ],
      ],
    },
    properties: {},
  },
];

describe('Spatial Centroid', () => {
  it('should get polygon centroid correctly', async () => {
    const result = await getCentroids(INPUT_POLYGONS);
    expect(result).toEqual([[0.5, 0.5]]);
  });
});
