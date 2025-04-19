import { describe, it, expect } from '@jest/globals';
import { spatialDissolve } from '../../src/geometry/spatial-dissolve';
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
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [1, 0],
          [2, 0],
          [2, 1],
          [1, 1],
          [1, 0],
        ],
      ],
    },
    properties: {},
  },
];

const EXPECTED_POLYGONS: Feature = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [2, 1],
        [2, 0],
        [1, 0],
        [0, 0],
        [0, 1],
        [2, 1],
      ],
    ],
  },
  properties: {},
};
describe('Spatial Dissolve', () => {
  it('should dissolve polygons correctly', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS);
    expect(result).toEqual(EXPECTED_POLYGONS);
  });
});
