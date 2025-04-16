import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { Feature } from 'geojson';
import { GeometryCollection } from '@geoda/common';
import { getGeometryCollectionFromBinaryGeometries, BinaryGeometryType } from './binary-geometry';
import { getGeometryCollectionFromGeoJsonFeatures } from './geojson-geometry';
import { getGeometryCollectionFromPointLayerData } from './point-layer-geometry';
import { initWASM } from '../init';

/**
 * The type of the point layer data. See PointLayerData in kepler.gl
 */
export type PointLayerData = {
  position: number[];
  index: number;
  neighbors: number[];
};

type ArcLayerData = {
  index: number;
  sourcePosition: [number, number, number];
  targetPosition: [number, number, number];
};

type HexagonIdLayerData = {
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
   * Binary feature collection
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
 * Get GeometryCollection from input geometries
 * @returns GeometryCollection - the geometry collection used in GeoDaLib see src/spatial_features.h
 */
export async function getGeometryCollection({
  geometries,
}: {
  /** input geometries see {@link SpatialGeometry} */
  geometries: SpatialGeometry;
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
        wasmInstance
      );
    }
    case SpatialJoinGeometryType.GeoJsonFeature:
      return await getGeometryCollectionFromGeoJsonFeatures({
        features: geometries as Feature[],
        wasm: wasmInstance,
      });
    case SpatialJoinGeometryType.PointLayerData:
      return await getGeometryCollectionFromPointLayerData({
        pointLayerData: geometries as PointLayerData[],
        wasm: wasmInstance,
      });
    default:
      throw new Error('Geometry type is unknown.');
  }
}
