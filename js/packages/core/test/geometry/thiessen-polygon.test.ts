// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { describe, it, expect } from '@jest/globals';
import { getThiessenPolygons } from '../../src/geometry/thiessen-polygon';
import { Feature, Polygon } from 'geojson';

// Test data: Point features for basic Thiessen polygon generation
const POINT_FEATURES: Feature[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-122.4194, 37.7749], // San Francisco
    },
    properties: { name: 'San Francisco' },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-74.006, 40.7128], // New York
    },
    properties: { name: 'New York' },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-87.6298, 41.8781], // Chicago
    },
    properties: { name: 'Chicago' },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-95.3698, 29.7604], // Houston
    },
    properties: { name: 'Houston' },
  },
];

// Test data: Simple grid of points for predictable Thiessen polygons
const GRID_POINTS: Feature[] = [
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [0, 0] },
    properties: {},
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [1, 0] },
    properties: {},
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [0, 1] },
    properties: {},
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [1, 1] },
    properties: {},
  },
];

// Test data: Polygon features (should use centroids)
const POLYGON_FEATURES: Feature[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [2, 0],
          [2, 2],
          [0, 2],
          [0, 0],
        ],
      ],
    },
    properties: { name: 'Square 1' },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [3, 3],
          [5, 3],
          [5, 5],
          [3, 5],
          [3, 3],
        ],
      ],
    },
    properties: { name: 'Square 2' },
  },
];

// Test data: Mixed geometry types
const MIXED_FEATURES: Feature[] = [
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [0, 0] },
    properties: {},
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [2, 2],
          [4, 2],
          [4, 4],
          [2, 4],
          [2, 2],
        ],
      ],
    },
    properties: {},
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [5, 0],
        [6, 1],
      ],
    },
    properties: {},
  },
];

describe('Thiessen Polygons', () => {
  it('should generate Thiessen polygons for point features', async () => {
    const result = await getThiessenPolygons({ geoms: POINT_FEATURES });

    // Should return same number of polygons as input points
    expect(result).toHaveLength(POINT_FEATURES.length);

    // Each result should be a valid GeoJSON Feature with Polygon geometry
    result.forEach(feature => {
      expect(feature).toHaveProperty('type', 'Feature');
      expect(feature).toHaveProperty('geometry');
      expect(feature.geometry).toHaveProperty('type', 'Polygon');
      expect(feature.geometry).toHaveProperty('coordinates');
      const geometry = feature.geometry as Polygon;
      expect(Array.isArray(geometry.coordinates)).toBe(true);
      expect(geometry.coordinates.length).toBeGreaterThan(0);
    });
  });

  it('should generate Thiessen polygons for grid points', async () => {
    const result = await getThiessenPolygons({ geoms: GRID_POINTS });

    expect(result).toHaveLength(GRID_POINTS.length);

    // All results should be valid polygon features
    result.forEach(feature => {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('Polygon');
      const geometry = feature.geometry as Polygon;
      expect(geometry.coordinates).toBeDefined();
      expect(Array.isArray(geometry.coordinates)).toBe(true);
    });
  });

  it('should handle polygon features by using their centroids', async () => {
    const result = await getThiessenPolygons({ geoms: POLYGON_FEATURES });

    expect(result).toHaveLength(POLYGON_FEATURES.length);

    // Each result should be a valid polygon feature
    result.forEach(feature => {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('Polygon');
      const geometry = feature.geometry as Polygon;
      expect(geometry.coordinates).toBeDefined();
      expect(Array.isArray(geometry.coordinates)).toBe(true);
    });
  });

  it('should handle mixed geometry types (only processes first geometry type)', async () => {
    const result = await getThiessenPolygons({ geoms: MIXED_FEATURES });

    // Note: The function only processes features that match the geometry type of the first feature
    // In MIXED_FEATURES, the first feature is a Point, so only Point features are processed
    expect(result).toHaveLength(1); // Only the Point feature is processed

    // All results should be polygon features regardless of input geometry type
    result.forEach(feature => {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('Polygon');
      const geometry = feature.geometry as Polygon;
      expect(geometry.coordinates).toBeDefined();
      expect(Array.isArray(geometry.coordinates)).toBe(true);
    });
  });

  it('should work correctly when all features have the same geometry type', async () => {
    // Test with all polygons - should use centroids for all
    const allPolygons: Feature[] = [
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
              [2, 2],
              [3, 2],
              [3, 3],
              [2, 3],
              [2, 2],
            ],
          ],
        },
        properties: {},
      },
    ];

    const result = await getThiessenPolygons({ geoms: allPolygons });

    expect(result).toHaveLength(allPolygons.length);
    result.forEach(feature => {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('Polygon');
      const geometry = feature.geometry as Polygon;
      expect(geometry.coordinates).toBeDefined();
      expect(Array.isArray(geometry.coordinates)).toBe(true);
    });
  });

  it('should handle single point feature', async () => {
    const singlePoint: Feature[] = [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
        properties: {},
      },
    ];

    const result = await getThiessenPolygons({ geoms: singlePoint });

    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('Feature');
    expect(result[0].geometry.type).toBe('Polygon');
    const geometry = result[0].geometry as Polygon;
    expect(geometry.coordinates).toBeDefined();
  });

  it('should handle two point features', async () => {
    const twoPoints: Feature[] = [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
        properties: {},
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [1, 1] },
        properties: {},
      },
    ];

    const result = await getThiessenPolygons({ geoms: twoPoints });

    expect(result).toHaveLength(2);
    result.forEach(feature => {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('Polygon');
      const geometry = feature.geometry as Polygon;
      expect(geometry.coordinates).toBeDefined();
    });
  });

  it('should return valid GeoJSON structure', async () => {
    const result = await getThiessenPolygons({ geoms: GRID_POINTS });

    result.forEach(feature => {
      // Check Feature structure
      expect(feature).toHaveProperty('type', 'Feature');
      expect(feature).toHaveProperty('geometry');
      expect(feature).toHaveProperty('properties');

      // Check Polygon geometry structure
      const geometry = feature.geometry as Polygon;
      expect(geometry).toHaveProperty('type', 'Polygon');
      expect(geometry).toHaveProperty('coordinates');
      expect(Array.isArray(geometry.coordinates)).toBe(true);
      expect(geometry.coordinates.length).toBeGreaterThan(0);

      // Check coordinate structure (should be array of linear rings)
      geometry.coordinates.forEach(ring => {
        expect(Array.isArray(ring)).toBe(true);
        expect(ring.length).toBeGreaterThanOrEqual(4); // Minimum for closed polygon

        // Check that ring is closed (first and last coordinates are the same)
        const firstCoord = ring[0];
        const lastCoord = ring[ring.length - 1];
        expect(firstCoord).toEqual(lastCoord);

        // Check coordinate format [x, y]
        ring.forEach(coord => {
          expect(Array.isArray(coord)).toBe(true);
          expect(coord).toHaveLength(2);
          expect(typeof coord[0]).toBe('number');
          expect(typeof coord[1]).toBe('number');
        });
      });
    });
  });

  it('should handle collinear points', async () => {
    const collinearPoints: Feature[] = [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
        properties: {},
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [1, 0] },
        properties: {},
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [2, 0] },
        properties: {},
      },
    ];

    const result = await getThiessenPolygons({ geoms: collinearPoints });

    expect(result).toHaveLength(collinearPoints.length);
    result.forEach(feature => {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('Polygon');
    });
  });

  it('should preserve properties in a consistent manner', async () => {
    const result = await getThiessenPolygons({ geoms: POINT_FEATURES });

    expect(result).toHaveLength(POINT_FEATURES.length);

    // Check that properties are handled consistently
    result.forEach(feature => {
      expect(feature).toHaveProperty('properties');
      expect(typeof feature.properties).toBe('object');
    });
  });
});
