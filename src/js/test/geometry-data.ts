import {getBinaryGeometryTemplate} from '@loaders.gl/arrow';
import {BinaryFeatureCollection} from '@loaders.gl/schema';

import {BinaryGeometryType} from '../src/geometry/binary-geometry';

export const POINT_BINARY_GEOMETRY_TYPE: BinaryGeometryType = {
  point: true,
  line: false,
  polygon: false
};

export const POINT_BINARY_GEOMETRIES: BinaryFeatureCollection[] = [
  {
    shape: 'binary-feature-collection',
    points: {
      ...getBinaryGeometryTemplate(),
      type: 'Point',
      globalFeatureIds: {value: new Uint32Array([0, 1, 2, 3, 4]), size: 1},
      positions: {
        value: new Float64Array([1.4, 1.4, 0.2, 0.2, 2.4, 1.4, 21.0, 21.0, 15.4, 15.4]),
        size: 2
      },
      properties: [{index: 0}, {index: 1}, {index: 2}, {index: 3}, {index: 4}],
      featureIds: {value: new Uint32Array([0, 1, 2, 3, 4]), size: 1}
    },
    lines: {
      ...getBinaryGeometryTemplate(),
      type: 'LineString',
      pathIndices: {value: new Uint16Array(0), size: 1}
    },
    polygons: {
      ...getBinaryGeometryTemplate(),
      type: 'Polygon',
      polygonIndices: {value: new Uint16Array(0), size: 1},
      primitivePolygonIndices: {value: new Uint16Array(0), size: 1}
    }
  }
];

export const POLYGON_BINARY_GEOMETRY_TYPE: BinaryGeometryType = {
  point: false,
  line: false,
  polygon: true
};

export const POLYGON_BINARY_GEOMETRIES: BinaryFeatureCollection[] = [
  {
    shape: 'binary-feature-collection',
    points: {
      ...getBinaryGeometryTemplate(),
      type: 'Point'
    },
    lines: {
      ...getBinaryGeometryTemplate(),
      type: 'LineString',
      pathIndices: {value: new Uint16Array(0), size: 1}
    },
    polygons: {
      ...getBinaryGeometryTemplate(),
      type: 'Polygon',
      globalFeatureIds: {
        value: new Uint32Array([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ]),
        size: 1
      },
      positions: {
        value: new Float64Array([
          0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0.25, 0.25, 0.25, 0.75, 0.75, 0.75, 0.75, 0.25, 0.25, 0.25,
          2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 10.25, 10.25, 10.25,
          10.75, 10.75, 10.75, 10.75, 10.25, 10.25, 10.25, 12, 12, 12, 13, 13, 13, 13, 12, 12, 12
        ]),
        size: 2
      },
      properties: [{index: 0}, {index: 1}],
      featureIds: {
        value: new Uint32Array([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ]),
        size: 1
      },
      polygonIndices: {value: new Int32Array([0, 10, 15, 25, 30]), size: 1},
      primitivePolygonIndices: {value: new Int32Array([0, 5, 10, 15, 20, 25, 30]), size: 1}
    }
  }
];
