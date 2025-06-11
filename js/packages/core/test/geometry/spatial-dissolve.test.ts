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

const EXPECTED_RESULT = {
  features: [
    {
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
    },
  ],
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

const EXPECTED_RESULT_WITH_SEPARATE = {
  features: [
    {
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
    },
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
  ],
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

const EXPECTED_RESULT_TWO_GROUPS = {
  features: [
    {
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
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7, 6],
            [7, 5],
            [6, 5],
            [5, 5],
            [5, 6],
            [7, 6],
          ],
        ],
      },
      properties: {},
    },
  ],
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

const EXPECTED_RESULT_TWO_GROUPS_PLUS_SEPARATE = {
  features: [
    {
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
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7, 6],
            [7, 5],
            [6, 5],
            [5, 5],
            [5, 6],
            [7, 6],
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
  ],
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

const EXPECTED_RESULT_THREE_IN_FIRST_GROUP = {
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7, 6],
            [7, 5],
            [6, 5],
            [5, 5],
            [5, 6],
            [7, 6],
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
            [0, 0],
            [0, 1],
            [2, 1],
            [3, 1],
            [3, 0],
            [0, 0],
          ],
        ],
      },
      properties: {},
    },
  ],
};

describe('Spatial Dissolve', () => {
  it('should dissolve polygons correctly', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS);
    expect(result.dissolvedPolygons).toEqual(EXPECTED_RESULT.features);
  });

  it('should handle mixed mergeable and separate polygons correctly', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS_WITH_SEPARATE);

    expect(result.dissolvedPolygons).toHaveLength(2);

    // Verify the merged polygon (first two polygons combined)
    expect(result.dissolvedPolygons[0].geometry).toEqual(
      EXPECTED_RESULT_WITH_SEPARATE.features[0].geometry
    );

    // Verify the separate polygon remains unchanged
    expect(result.dissolvedPolygons[1].geometry).toEqual(
      EXPECTED_RESULT_WITH_SEPARATE.features[1].geometry
    );
  });

  it('should handle two groups of merged polygons correctly', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS_TWO_GROUPS);

    expect(result.dissolvedPolygons).toHaveLength(2);

    // Verify the first merged polygon group (indices 0, 1)
    expect(result.dissolvedPolygons[0].geometry).toEqual(
      EXPECTED_RESULT_TWO_GROUPS.features[0].geometry
    );

    // Verify the second merged polygon group (indices 2, 3)
    expect(result.dissolvedPolygons[1].geometry).toEqual(
      EXPECTED_RESULT_TWO_GROUPS.features[1].geometry
    );
  });

  it('should handle two groups of merged polygons plus one separate polygon correctly', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS_TWO_GROUPS_PLUS_SEPARATE);

    expect(result.dissolvedPolygons).toHaveLength(3);

    // Verify the first merged polygon group (indices 0, 1)
    expect(result.dissolvedPolygons[0].geometry).toEqual(
      EXPECTED_RESULT_TWO_GROUPS_PLUS_SEPARATE.features[0].geometry
    );

    // Verify the second merged polygon group (indices 2, 3)
    expect(result.dissolvedPolygons[1].geometry).toEqual(
      EXPECTED_RESULT_TWO_GROUPS_PLUS_SEPARATE.features[1].geometry
    );

    // Verify the separate polygon remains unchanged (index 4)
    expect(result.dissolvedPolygons[2].geometry).toEqual(
      EXPECTED_RESULT_TWO_GROUPS_PLUS_SEPARATE.features[2].geometry
    );
  });

  it('should handle three polygons in the first group', async () => {
    const result = await spatialDissolve(INPUT_POLYGONS_THREE_IN_FIRST_GROUP);

    expect(result.dissolvedPolygons).toHaveLength(2);

    // Verify the first merged polygon group (indices 0, 1, 4)
    expect(result.dissolvedPolygons[0].geometry).toEqual(
      EXPECTED_RESULT_THREE_IN_FIRST_GROUP.features[0].geometry
    );

    // Verify the second merged polygon group (indices 2, 3)
    expect(result.dissolvedPolygons[1].geometry).toEqual(
      EXPECTED_RESULT_THREE_IN_FIRST_GROUP.features[1].geometry
    );

    expect(result.dissolvedGroups).toEqual([
      [2, 3],
      [0, 1, 4],
    ]);
  });
});
