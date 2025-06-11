import { describe, it, expect } from '@jest/globals';
import { spatialDissolve } from '../../src/geometry/spatial-dissolve';
import { Feature, Polygon, MultiPolygon } from 'geojson';

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

// Expected result for dissolving two adjacent polygons into one
const EXPECTED_DISSOLVED_POLYGON = {
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

const INPUT_POLYGONS_WITH_SEPARATE: Feature[] = [
  ...INPUT_POLYGONS,
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [5, 5],
          [5, 6],
          [6, 6],
          [6, 5],
          [5, 5],
        ],
      ],
    },
    properties: {},
  },
];

// Expected result for mixed mergeable and separate polygons - should be a MultiPolygon
const EXPECTED_MIXED_RESULT = {
  type: 'Feature',
  geometry: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [2, 1],
          [2, 0],
          [1, 0],
          [0, 0],
          [0, 1],
          [2, 1],
        ],
      ],
      [
        [
          [5, 5],
          [5, 6],
          [6, 6],
          [6, 5],
          [5, 5],
        ],
      ],
    ],
  },
  properties: {},
};

const INPUT_POLYGONS_TWO_GROUPS: Feature[] = [
  ...INPUT_POLYGONS_WITH_SEPARATE,
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [6, 5],
          [6, 6],
          [7, 6],
          [7, 5],
          [6, 5],
        ],
      ],
    },
    properties: {},
  },
];

// Expected result for two groups of merged polygons - should be a MultiPolygon
const EXPECTED_TWO_GROUPS_RESULT = {
  type: 'Feature',
  geometry: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [2, 1],
          [2, 0],
          [1, 0],
          [0, 0],
          [0, 1],
          [2, 1],
        ],
      ],
      [
        [
          [7, 6],
          [7, 5],
          [6, 5],
          [5, 5],
          [5, 6],
          [7, 6],
        ],
      ],
    ],
  },
  properties: {},
};

const INPUT_POLYGONS_TWO_GROUPS_PLUS_SEPARATE: Feature[] = [
  ...INPUT_POLYGONS_TWO_GROUPS,
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [8, 8],
          [8, 9],
          [9, 9],
          [9, 8],
          [8, 8],
        ],
      ],
    },
    properties: {},
  },
];

// Expected result for two groups plus separate polygon - should be a MultiPolygon
const EXPECTED_TWO_GROUPS_PLUS_SEPARATE_RESULT = {
  type: 'Feature',
  geometry: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [2, 1],
          [2, 0],
          [1, 0],
          [0, 0],
          [0, 1],
          [2, 1],
        ],
      ],
      [
        [
          [7, 6],
          [7, 5],
          [6, 5],
          [5, 5],
          [5, 6],
          [7, 6],
        ],
      ],
      [
        [
          [8, 8],
          [8, 9],
          [9, 9],
          [9, 8],
          [8, 8],
        ],
      ],
    ],
  },
  properties: {},
};

const INPUT_POLYGONS_THREE_IN_FIRST_GROUP: Feature[] = [
  ...INPUT_POLYGONS_TWO_GROUPS,
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [2, 0],
          [3, 0],
          [3, 1],
          [2, 1],
          [2, 0],
        ],
      ],
    },
    properties: {},
  },
];

// Expected result for three polygons in first group - should be a MultiPolygon
const EXPECTED_THREE_IN_FIRST_GROUP_RESULT = {
  type: 'Feature',
  geometry: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [7, 6],
          [7, 5],
          [6, 5],
          [5, 5],
          [5, 6],
          [7, 6],
        ],
      ],
      [
        [
          [0, 0],
          [0, 1],
          [2, 1],
          [3, 1],
          [3, 0],
          [0, 0],
        ],
      ],
    ],
  },
  properties: {},
};

describe('Spatial Dissolve', () => {
  it('should dissolve two adjacent polygons into one polygon', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS);

    expect(result.type).toBe('Feature');
    expect(result.geometry.type).toBe('Polygon');
    expect((result.geometry as Polygon).coordinates).toEqual(
      EXPECTED_DISSOLVED_POLYGON.geometry.coordinates
    );
  });

  it('should handle mixed mergeable and separate polygons as MultiPolygon', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS_WITH_SEPARATE);

    expect(result.type).toBe('Feature');
    expect(result.geometry.type).toBe('MultiPolygon');

    // Check that we have 2 polygons in the MultiPolygon
    expect((result.geometry as MultiPolygon).coordinates).toHaveLength(2);

    // Verify the geometry coordinates match expected result
    expect((result.geometry as MultiPolygon).coordinates).toEqual(
      EXPECTED_MIXED_RESULT.geometry.coordinates
    );
  });

  it('should handle two groups of merged polygons as MultiPolygon', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS_TWO_GROUPS);

    expect(result.type).toBe('Feature');
    expect(result.geometry.type).toBe('MultiPolygon');

    // Check that we have 2 polygons in the MultiPolygon
    expect((result.geometry as MultiPolygon).coordinates).toHaveLength(2);

    // Verify the geometry coordinates match expected result
    expect((result.geometry as MultiPolygon).coordinates).toEqual(
      EXPECTED_TWO_GROUPS_RESULT.geometry.coordinates
    );
  });

  it('should handle two groups plus one separate polygon as MultiPolygon', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS_TWO_GROUPS_PLUS_SEPARATE);

    expect(result.type).toBe('Feature');
    expect(result.geometry.type).toBe('MultiPolygon');

    // Check that we have 3 polygons in the MultiPolygon
    expect((result.geometry as MultiPolygon).coordinates).toHaveLength(3);

    // Verify the geometry coordinates match expected result
    expect((result.geometry as MultiPolygon).coordinates).toEqual(
      EXPECTED_TWO_GROUPS_PLUS_SEPARATE_RESULT.geometry.coordinates
    );
  });

  it('should handle three polygons in the first group as MultiPolygon', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS_THREE_IN_FIRST_GROUP);

    expect(result.type).toBe('Feature');
    expect(result.geometry.type).toBe('MultiPolygon');

    // Check that we have 2 polygons in the MultiPolygon
    expect((result.geometry as MultiPolygon).coordinates).toHaveLength(2);

    // Verify the geometry coordinates match expected result
    expect((result.geometry as MultiPolygon).coordinates).toEqual(
      EXPECTED_THREE_IN_FIRST_GROUP_RESULT.geometry.coordinates
    );
  });
});
