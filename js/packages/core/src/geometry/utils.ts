// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { Feature } from 'geojson';
import { GeometryCollection, Line, Polygon } from '@geoda/common';
import { getGeometryCollectionFromBinaryGeometries, BinaryGeometryType } from './binary-geometry';
import { getGeometryCollectionFromGeoJsonFeatures } from './geojson-geometry';
import {
  getGeometryCollectionFromArcLayerData,
  getGeometryCollectionFromPointLayerData,
} from './point-layer-geometry';
import { initWASM } from '../init';

/**
 * The type of the point layer data. See PointLayerData in kepler.gl
 */
export type PointLayerData = {
  position: number[];
  index: number;
  neighbors: number[];
};

/**
 * The type of the arc layer data. See ArcLayerData in kepler.gl
 */
export type ArcLayerData = {
  index: number;
  sourcePosition: [number, number, number];
  targetPosition: [number, number, number];
};

/**
 * The type of the hexagon id layer data. See HexagonIdLayerData in kepler.gl
 */
export type HexagonIdLayerData = {
  index: number;
  id: number;
  centroid: [number, number];
};

/**
 * The type of the geometries used in the GeoDaLib
 */
export type SpatialGeometry =
  /**
   * GeoJSON features
   */
  | Feature[]
  /**
   * Binary feature collection. Use array of binary features because large binary files are chunked into multiple binary feature collections.
   */
  | BinaryFeatureCollection[]
  /**
   * Point layer data
   */
  | PointLayerData[]
  /**
   * Arc layer data
   */
  | ArcLayerData[]
  /**
   * Hexagon id layer data
   */
  | HexagonIdLayerData[];

export function isGeoJsonFeature(geometry: unknown): geometry is Feature {
  return (
    typeof geometry === 'object' &&
    geometry !== null &&
    'type' in geometry &&
    geometry.type === 'Feature'
  );
}

export function isBinaryFeatureCollection(geometry: unknown): geometry is BinaryFeatureCollection {
  return (
    typeof geometry === 'object' &&
    geometry !== null &&
    'points' in geometry &&
    'lines' in geometry &&
    'polygons' in geometry
  );
}

export function isPointLayerData(geometry: unknown): geometry is PointLayerData {
  return (
    typeof geometry === 'object' &&
    geometry !== null &&
    'position' in geometry &&
    'index' in geometry
  );
}

export function isArcLayerData(geometry: unknown): geometry is ArcLayerData {
  return (
    typeof geometry === 'object' &&
    geometry !== null &&
    'sourcePosition' in geometry &&
    'targetPosition' in geometry
  );
}

export function isHexagonIdLayerData(geometry: unknown): geometry is HexagonIdLayerData {
  return (
    typeof geometry === 'object' && geometry !== null && 'id' in geometry && 'centroid' in geometry
  );
}

export enum SpatialJoinGeometryType {
  GeoJsonFeature = 'GeoJsonFeature',
  BinaryFeatureCollection = 'BinaryFeatureCollection',
  PointLayerData = 'PointLayerData',
  ArcLayerData = 'ArcLayerData',
  HexagonIdLayerData = 'HexagonIdLayerData',
}

/**
 * Check the type of the geometries
 * @param geometries - the geometries to check. See {@link SpatialJoinGeometries} for more information.
 * @returns the type of the geometries. See {@link SpatialJoinGeometryType} for more information.
 */
export function CheckGeometryType(geometries: SpatialGeometry): SpatialJoinGeometryType {
  if (!geometries) {
    throw new Error('CheckGeometryType: Geometry type is unknown.');
  }

  // check if it's an array
  if (Array.isArray(geometries)) {
    // Get first item to check other types
    const first = geometries[0];

    // Check if it's BinaryFeatureCollection
    if (isBinaryFeatureCollection(first)) {
      return SpatialJoinGeometryType.BinaryFeatureCollection;
    }

    // Check if it's Feature
    if (isGeoJsonFeature(first)) {
      return SpatialJoinGeometryType.GeoJsonFeature;
    }

    // Check if it's PointLayerData[]
    if (isPointLayerData(first)) {
      return SpatialJoinGeometryType.PointLayerData;
    }

    // Check if it's ArcLayerData[]
    if (isArcLayerData(first)) {
      return SpatialJoinGeometryType.ArcLayerData;
    }

    // Check if it's HexagonIdLayerData[]
    if (isHexagonIdLayerData(first)) {
      return SpatialJoinGeometryType.HexagonIdLayerData;
    }
  }

  throw new Error('CheckGeometryType: Geometry type is unknown.');
}

function getBinaryGeometryType(geometries: BinaryFeatureCollection[]): BinaryGeometryType {
  if (geometries[0]?.lines?.featureIds?.value?.length || 0 > 0) {
    return {
      point: false,
      line: true,
      polygon: false,
    };
  }
  if (geometries[0]?.polygons?.featureIds?.value?.length || 0 > 0) {
    return {
      point: false,
      line: false,
      polygon: true,
    };
  }
  return {
    point: true,
    line: false,
    polygon: false,
  };
}

/**
 * Get GeometryCollection from input geometries. The input geometries can be
 * 1. GeoJSON features
 * 2. binary feature collections
 * 3. point layer data
 * 4. arc layer data
 * 5. hexagon id layer data
 *
 * @example
 * ```ts
 * const geoms = [
 *   { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 0 } },
 * ];
 * const geometryCollection = await getGeometryCollection({ geometries: geoms });
 * ```
 * @returns GeometryCollection - the geometry collection used in GeoDaLib see src/spatial_features.h
 */
export async function getGeometryCollection({
  geometries,
  fixPolygon = true,
  convertToUTM = false,
}: {
  /** input geometries see {@link SpatialGeometry} */
  geometries: SpatialGeometry;
  /** fix polygon */
  fixPolygon?: boolean;
  /** convert to UTM */
  convertToUTM?: boolean;
}): Promise<GeometryCollection> {
  const wasmInstance = await initWASM();
  const geometryType = CheckGeometryType(geometries);

  switch (geometryType) {
    case SpatialJoinGeometryType.BinaryFeatureCollection: {
      const binaryGeometryType = getBinaryGeometryType(geometries as BinaryFeatureCollection[]);
      if (!binaryGeometryType) {
        throw new Error('Binary geometry type is required.');
      }
      return await getGeometryCollectionFromBinaryGeometries(
        binaryGeometryType,
        geometries as BinaryFeatureCollection[],
        wasmInstance,
        fixPolygon,
        convertToUTM
      );
    }
    case SpatialJoinGeometryType.GeoJsonFeature:
      return await getGeometryCollectionFromGeoJsonFeatures({
        features: geometries as Feature[],
        wasm: wasmInstance,
        fixPolygon,
        convertToUTM,
      });

    case SpatialJoinGeometryType.ArcLayerData:
      return await getGeometryCollectionFromArcLayerData({
        arcLayerData: geometries as ArcLayerData[],
        wasm: wasmInstance,
        convertToUTM,
      });
    case SpatialJoinGeometryType.PointLayerData:
      return await getGeometryCollectionFromPointLayerData({
        pointLayerData: geometries as PointLayerData[],
        wasm: wasmInstance,
        convertToUTM,
      });
    default:
      throw new Error('Geometry type is unknown.');
  }
}

/**
 * Convert a Polygon to a GeoJSON Feature
 * @param polygon - The polygon to convert
 * @returns The converted GeoJSON Feature
 *
 * @example
 * ```ts
 * const polygon = new Polygon(new VectorDouble([0, 0, 1, 0, 1, 1, 0, 1, 0, 0]), new VectorUInt([0, 1, 2, 3, 4]), new VectorUInt([0, 1, 2, 3, 4]), new VectorUInt([0, 1, 2, 3, 4]), true, false);
 * const feature = await polygonToFeature(polygon);
 * ```
 */
export async function polygonToFeature(polygon: Polygon): Promise<Feature> {
  const xs = polygon.getX();
  const ys = polygon.getY();
  const parts = polygon.getParts();
  const holes = polygon.getHoles();

  const numPoints = xs.size();
  const numParts = parts.size();

  let numExtRings = 0;
  for (let i = 0; i < numParts; ++i) {
    if (holes.get(i) === 0) {
      numExtRings += 1;
    }
  }

  const isMultiPolygon = numExtRings > 1;

  if (isMultiPolygon) {
    // multipolygon structure: [[extRing, hole, hole], [extRing, hole]]
    const multiPoly = Array(numExtRings);
    let polyIndex = -1;
    for (let i = 0; i < numParts; ++i) {
      if (holes.get(i) === 0) {
        // extRing
        polyIndex += 1;
        multiPoly[polyIndex] = [];
      }
      const ring: number[][] = [];
      const start = parts.get(i);
      const end = i === numParts - 1 ? numPoints : parts.get(i + 1);
      for (let j = start; j < end; ++j) {
        ring.push([xs.get(j), ys.get(j)]);
      }
      multiPoly[polyIndex].push(ring);
    }
    return {
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: multiPoly,
      },
      properties: {},
    };
  } else {
    // polygon structure: [extRing, hole, hole]
    const coordinates = Array(numParts);
    for (let i = 0; i < numParts; ++i) {
      const ring: number[][] = [];
      const start = parts.get(i);
      const end = i === numParts - 1 ? numPoints : parts.get(i + 1);
      for (let j = start; j < end; ++j) {
        ring.push([xs.get(j), ys.get(j)]);
      }
      coordinates[i] = ring;
    }
    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates,
      },
      properties: {},
    };
  }
}

export async function lineToFeature(line: Line): Promise<Feature> {
  const xs = line.getX();
  const ys = line.getY();
  const parts = line.getParts();

  // For MST, we expect simple LineStrings with just 2 points (start and end)
  // If there are multiple parts, we'll create a MultiLineString
  if (parts.size() === 1) {
    // Simple LineString
    const coordinates: number[][] = [];
    const start = parts.get(0);
    const end = xs.size();
    for (let j = start; j < end; ++j) {
      coordinates.push([xs.get(j), ys.get(j)]);
    }
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates,
      },
      properties: {},
    };
  } else {
    // MultiLineString
    const coordinates: number[][][] = [];
    for (let i = 0; i < parts.size(); ++i) {
      const start = parts.get(i);
      const end = i === parts.size() - 1 ? xs.size() : parts.get(i + 1);
      const lineCoords: number[][] = [];
      for (let j = start; j < end; ++j) {
        lineCoords.push([xs.get(j), ys.get(j)]);
      }
      coordinates.push(lineCoords);
    }
    return {
      type: 'Feature',
      geometry: {
        type: 'MultiLineString',
        coordinates,
      },
      properties: {},
    };
  }
}
