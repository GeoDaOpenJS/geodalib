import { describe, it, expect } from '@jest/globals';
import { getArea, getLength, getPerimeter } from '../../src/geometry/attributes';
import { Feature } from 'geojson';
import { DistanceUnit } from '@geoda/common';

const INPUT_POLYGON: Feature = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [0, 0],
        [0, 0.01],
        [0.01, 0.01],
        [0.01, 0],
        [0, 0],
      ],
    ],
  },
  properties: {},
};

const INPUT_MULTIPOLYGON: Feature = {
  type: 'Feature',
  geometry: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [0, 0],
          [0, 0.01],
          [0.01, 0.01],
          [0.01, 0],
          [0, 0],
        ],
      ],
      [
        [
          [0, 0],
          [0, 0.01],
          [0.01, 0.01],
          [0.01, 0],
          [0, 0],
        ],
      ],
    ],
  },
  properties: {},
};

const INPUT_LINESTRING: Feature = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [
      [0, 0],
      [0, 0.01],
      [0.01, 0.01],
    ],
  },
  properties: {},
};

const INPUT_MULTILINESTRING: Feature = {
  type: 'Feature',
  geometry: {
    type: 'MultiLineString',
    coordinates: [
      [
        [0, 0],
        [0, 0.01],
        [0.01, 0.01],
      ],
      [
        [0, 0],
        [0, 0.01],
        [0.01, 0.01],
      ],
    ],
  },
  properties: {},
};

describe('Geometry Attributes', () => {
  describe('getArea', () => {
    it('should calculate area for a single polygon', async () => {
      const areas = await getArea([INPUT_POLYGON], DistanceUnit.KM);
      expect(areas).toHaveLength(1);
      expect(areas[0]).toBeCloseTo(1.2333122117272914);
    });

    it('should calculate area for multiple polygons', async () => {
      const areas = await getArea([INPUT_MULTIPOLYGON], DistanceUnit.KM);
      expect(areas).toHaveLength(1);
      expect(areas[0]).toBeCloseTo(2.466624423454583);
    });
  });

  describe('getLength', () => {
    it('should calculate length for a single linestring', async () => {
      const lengths = await getLength([INPUT_LINESTRING], DistanceUnit.KM);
      expect(lengths).toHaveLength(1);
      expect(lengths[0]).toBeCloseTo(2.2211094193781022);
    });

    it('should calculate length for multiple linestrings', async () => {
      const lengths = await getLength([INPUT_MULTILINESTRING], DistanceUnit.KM);
      expect(lengths).toHaveLength(1);
      expect(lengths[0]).toBeCloseTo(4.4422188387562045);
    });
  });

  describe('getPerimeter', () => {
    it('should calculate perimeter for a single polygon', async () => {
      const perimeters = await getPerimeter([INPUT_POLYGON], DistanceUnit.KM);
      expect(perimeters).toHaveLength(1);
      expect(perimeters[0]).toBeCloseTo(4.442208680284838);
    });

    it('should calculate perimeter for multiple polygons', async () => {
      const perimeters = await getPerimeter([INPUT_MULTIPOLYGON], DistanceUnit.KM);
      expect(perimeters).toHaveLength(1);
      expect(perimeters[0]).toBeCloseTo(8.884417360569676);
    });
  });
});
