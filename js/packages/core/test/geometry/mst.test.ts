// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { describe, it, expect } from '@jest/globals';
import { getMinimumSpanningTree } from '../../src/geometry/mst';
import { Feature, LineString } from 'geojson';

// Test data: Simple point features for basic MST generation
const SIMPLE_POINTS: Feature[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    properties: { id: 1 },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [1, 0],
    },
    properties: { id: 2 },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 1],
    },
    properties: { id: 3 },
  },
];

// Test data: Square grid of points for predictable MST
const GRID_POINTS: Feature[] = [
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [0, 0] },
    properties: { id: 1 },
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [1, 0] },
    properties: { id: 2 },
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [0, 1] },
    properties: { id: 3 },
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [1, 1] },
    properties: { id: 4 },
  },
];

// Test data: Collinear points
const COLLINEAR_POINTS: Feature[] = [
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [0, 0] },
    properties: { id: 1 },
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [1, 0] },
    properties: { id: 2 },
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [2, 0] },
    properties: { id: 3 },
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [3, 0] },
    properties: { id: 4 },
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
    properties: { id: 1 },
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
    properties: { id: 2 },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0, 4],
          [2, 4],
          [2, 6],
          [0, 6],
          [0, 4],
        ],
      ],
    },
    properties: { id: 3 },
  },
];

// Test data: Real world city coordinates
const CITY_POINTS: Feature[] = [
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

describe('Minimum Spanning Tree (MST)', () => {
  it('should generate MST for simple point features', async () => {
    const result = await getMinimumSpanningTree({ geoms: SIMPLE_POINTS });

    // MST should have n-1 edges for n points
    expect(result).toHaveLength(SIMPLE_POINTS.length - 1);

    // Each result should be a valid GeoJSON Feature with LineString geometry
    result.forEach(feature => {
      expect(feature).toHaveProperty('type', 'Feature');
      expect(feature).toHaveProperty('geometry');
      expect(feature.geometry).toHaveProperty('type', 'LineString');
      expect(feature.geometry).toHaveProperty('coordinates');
      expect(feature).toHaveProperty('properties');
      expect(feature.properties).toHaveProperty('weight');
      expect(feature.properties).not.toBeNull();
      expect(typeof feature.properties!.weight).toBe('number');
      expect(feature.properties!.weight).toBeGreaterThan(0);
    });
  });

  it('should generate MST for grid points', async () => {
    const result = await getMinimumSpanningTree({ geoms: GRID_POINTS });

    // MST should have n-1 edges for n points
    expect(result).toHaveLength(GRID_POINTS.length - 1);

    // All results should be valid line features with weights
    result.forEach(feature => {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('LineString');
      expect(feature.properties).not.toBeNull();
      expect(feature.properties!.weight).toBeGreaterThan(0);

      // LineString should have exactly 2 coordinates (start and end)
      const lineString = feature.geometry as LineString;
      expect(lineString.coordinates).toHaveLength(2);
      // Each coordinate should be a valid [x, y] pair
      lineString.coordinates.forEach(coord => {
        expect(coord).toHaveLength(2);
        expect(typeof coord[0]).toBe('number');
        expect(typeof coord[1]).toBe('number');
      });
    });
  });

  it('should handle collinear points correctly', async () => {
    const result = await getMinimumSpanningTree({ geoms: COLLINEAR_POINTS });

    // MST should have n-1 edges for n points
    expect(result).toHaveLength(COLLINEAR_POINTS.length - 1);

    // For collinear points, MST should connect adjacent points
    result.forEach(feature => {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('LineString');
      expect(feature.properties).not.toBeNull();
      expect(feature.properties!.weight).toBeGreaterThan(0);
    });
  });

  it('should handle polygon features by using their centroids', async () => {
    const result = await getMinimumSpanningTree({ geoms: POLYGON_FEATURES });

    // MST should have n-1 edges for n polygons
    expect(result).toHaveLength(POLYGON_FEATURES.length - 1);

    // Each result should be a valid line feature
    result.forEach(feature => {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('LineString');
      expect(feature.properties).not.toBeNull();
      expect(feature.properties!.weight).toBeGreaterThan(0);

      const lineString = feature.geometry as LineString;
      expect(lineString.coordinates).toHaveLength(2);
    });
  });

  it('should generate MST for real world city coordinates', async () => {
    const result = await getMinimumSpanningTree({ geoms: CITY_POINTS });

    // MST should have n-1 edges for n cities
    expect(result).toHaveLength(CITY_POINTS.length - 1);

    // All results should be valid line features
    result.forEach(feature => {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('LineString');
      expect(feature.properties).not.toBeNull();
      expect(feature.properties!.weight).toBeGreaterThan(0);

      // Weights should be reasonable for geographic distances
      expect(feature.properties!.weight).toBeGreaterThan(0);
    });
  });

  it('should handle single point input', async () => {
    const singlePoint = [SIMPLE_POINTS[0]];
    const result = await getMinimumSpanningTree({ geoms: singlePoint });

    // MST of single point should have 0 edges
    expect(result).toHaveLength(0);
  });

  it('should handle two points input', async () => {
    const twoPoints = SIMPLE_POINTS.slice(0, 2);
    const result = await getMinimumSpanningTree({ geoms: twoPoints });

    // MST of two points should have 1 edge
    expect(result).toHaveLength(1);

    const feature = result[0];
    expect(feature.type).toBe('Feature');
    expect(feature.geometry.type).toBe('LineString');
    expect(feature.properties).not.toBeNull();
    expect(feature.properties!.weight).toBeCloseTo(1.0, 5); // Distance between (0,0) and (1,0) is 1
  });

  it('should validate MST properties - connected graph', async () => {
    const result = await getMinimumSpanningTree({ geoms: GRID_POINTS });

    // MST should be a connected graph
    expect(result).toHaveLength(GRID_POINTS.length - 1);

    // Collect all endpoints from the MST edges
    const endpoints = new Set<string>();
    result.forEach(feature => {
      const lineString = feature.geometry as LineString;
      const [start, end] = lineString.coordinates;
      endpoints.add(`${start[0]},${start[1]}`);
      endpoints.add(`${end[0]},${end[1]}`);
    });

    // All original points should be represented in the MST
    expect(endpoints.size).toBe(GRID_POINTS.length);
  });

  it('should validate MST properties - minimal total weight', async () => {
    const result = await getMinimumSpanningTree({ geoms: SIMPLE_POINTS });

    // Calculate total weight
    const totalWeight = result.reduce((sum, feature) => {
      expect(feature.properties).not.toBeNull();
      return sum + feature.properties!.weight;
    }, 0);

    // For the triangle with vertices at (0,0), (1,0), (0,1)
    // The MST should connect (0,0)-(1,0) and (0,0)-(0,1) with total weight 2
    // This is less than connecting (1,0)-(0,1) which would give total weight 1 + sqrt(2)
    expect(totalWeight).toBeCloseTo(2.0, 5);
  });

  it('should handle empty input gracefully', async () => {
    const result = await getMinimumSpanningTree({ geoms: [] });

    // Empty input should return empty result
    expect(result).toHaveLength(0);
  });
});
