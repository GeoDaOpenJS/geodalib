// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { describe, it, expect } from '@jest/globals';
import { getCartogram } from '../../src/geometry/cartogram';
import { Feature, Point, Polygon } from 'geojson';

const INPUT_POLYGONS: Feature<Polygon>[] = [
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

describe('Cartogram', () => {
  it('should create cartogram point from single polygon with equal values', async () => {
    const values = [1.0];
    const result = await getCartogram(INPUT_POLYGONS, values);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    // Check the structure of the first feature
    const firstFeature = result[0] as Feature<Point>;
    expect(firstFeature.type).toBe('Feature');
    expect(firstFeature.geometry.type).toBe('Polygon');
    expect(Array.isArray(firstFeature.geometry.coordinates)).toBe(true);
    expect(firstFeature.geometry.coordinates.length).toBe(1);
    expect(typeof firstFeature.properties?.radius).toBe('number');
  });

  it('should create cartogram polygons from multiple polygons with different values', async () => {
    const multiplePolygons: Feature<Polygon>[] = [
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

    const values = [1.0, 2.0];
    const result = await getCartogram(multiplePolygons, values);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    // Check that we have points for both polygons
    const uniqueCoordinates = new Set(
      result.map(
        f =>
          `${(f as Feature<Polygon>).geometry.coordinates[0][0]},${(f as Feature<Polygon>).geometry.coordinates[0][1]}`
      )
    );

    expect(uniqueCoordinates.size).toBeGreaterThan(1);
  });

  it('should handle empty input', async () => {
    const emptyPolygons: Feature<Polygon>[] = [];
    const values: number[] = [];
    await expect(getCartogram(emptyPolygons, values)).rejects.toThrow('Geometry type is unknown.');
  });

  it('should create cartogram polygons from two points', async () => {
    const multiplePolygons: Feature<Point>[] = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-74.0685519999769, 40.6266110000091],
        },
        properties: {},
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-74.068601000008, 40.6261790000242],
        },
        properties: {},
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-73.86478011265667, 40.71790108586072],
        },
        properties: {},
      },
    ];

    const values = [1.0, 2.0, 3.0];
    const result = await getCartogram(multiplePolygons, values, 100, 20);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    // Check that we have points for both polygons
    const uniqueCoordinates = new Set(
      result.map(
        f =>
          `${(f as Feature<Polygon>).geometry.coordinates[0][0]},${(f as Feature<Polygon>).geometry.coordinates[0][1]}`
      )
    );

    expect(uniqueCoordinates.size).toBeGreaterThan(1);
  });
});
