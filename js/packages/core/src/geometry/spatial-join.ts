import {BinaryFeatureCollection} from '@loaders.gl/schema';
import {Feature} from 'geojson';
import {BinaryGeometryType, getGeometryCollectionFromBinaryGeometries} from './binary-geometry';
import {initWASM} from '../init';
import {GeometryCollection, GeoDaModule} from '@geoda/common';
import {getGeometryCollectionFromGeoJsonFeatures} from './geojson-geometry';
import {getGeometryCollectionFromPointLayerData} from './point-layer-geometry';

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

/**
 * The type of the geometries used in the GeoDaLib
 */
export type SpatialJoinGeometries = SpatialGeometry;

export enum SpatialJoinGeometryType {
  GeoJsonFeature = 'GeoJsonFeature',
  BinaryFeatureCollection = 'BinaryFeatureCollection',
  PointLayerData = 'PointLayerData',
  ArcLayerData = 'ArcLayerData',
  HexagonIdLayerData = 'HexagonIdLayerData'
}

function isGeoJsonFeature(geometry: unknown): geometry is Feature {
  return (
    typeof geometry === 'object' &&
    geometry !== null &&
    'type' in geometry &&
    geometry.type === 'Feature'
  );
}

function isBinaryFeatureCollection(geometry: unknown): geometry is BinaryFeatureCollection {
  return (
    typeof geometry === 'object' &&
    geometry !== null &&
    'points' in geometry &&
    'lines' in geometry &&
    'polygons' in geometry
  );
}

function isPointLayerData(geometry: unknown): geometry is PointLayerData {
  return (
    typeof geometry === 'object' &&
    geometry !== null &&
    'position' in geometry &&
    'index' in geometry
  );
}

function isArcLayerData(geometry: unknown): geometry is ArcLayerData {
  return (
    typeof geometry === 'object' &&
    geometry !== null &&
    'sourcePosition' in geometry &&
    'targetPosition' in geometry
  );
}

function isHexagonIdLayerData(geometry: unknown): geometry is HexagonIdLayerData {
  return (
    typeof geometry === 'object' && geometry !== null && 'id' in geometry && 'centroid' in geometry
  );
}

/**
 * Check the type of the geometries
 * @param geometries - the geometries to check. See {@link SpatialJoinGeometries} for more information.
 * @returns the type of the geometries. See {@link SpatialJoinGeometryType} for more information.
 */
export function CheckGeometryType(geometries: SpatialJoinGeometries): SpatialJoinGeometryType {
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

/**
 * The type of the props for spatialJoin
 * @param leftGeometries - the left geometries
 * @param rightGeometries - the right geometries
 */
export type SpatialJoinProps = {
  leftGeometries: SpatialJoinGeometries;
  rightGeometries: SpatialJoinGeometries;
};

/**
 * Spatial join two geometries
 * @param props - the props for spatialJoin see {@link SpatialJoinProps}
 * @returns the join indexes
 */
export async function spatialJoin({
  leftGeometries,
  rightGeometries
}: SpatialJoinProps): Promise<number[][]> {
  if (!leftGeometries || !rightGeometries) {
    return [];
  }
  try {
    const wasmInstance = await initWASM();

    const leftGeomCollection: GeometryCollection = await getGeometryCollection({
      geometries: leftGeometries,
      wasmInstance
    });

    const rightGeomCollection: GeometryCollection = await getGeometryCollection({
      geometries: rightGeometries,
      wasmInstance
    });

    const joinIndexes = await spatialJoinGeometryCollection({
      leftGeomCollection,
      rightGeomCollection
    });

    return joinIndexes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getBinaryGeometryType(geometries: BinaryFeatureCollection[]): BinaryGeometryType {
  if (geometries[0]?.lines?.featureIds?.value?.length || 0 > 0) {
    return {
      point: false,
      line: true,
      polygon: false
    };
  }
  if (geometries[0]?.polygons?.featureIds?.value?.length || 0 > 0) {
    return {
      point: false,
      line: false,
      polygon: true
    };
  }
  return {
    point: true,
    line: false,
    polygon: false
  };
}

/**
 * Get GeometryCollection from SpatialJoinGeometries
 * @param props - the props for getGeometryCollection see {@link GetGeometryCollectionProps}
 * @returns GeometryCollection - the geometry collection see src/spatial_features.h
 */
export async function getGeometryCollection({
  geometries,
  wasmInstance
}: {
  geometries: SpatialJoinGeometries;
  wasmInstance: GeoDaModule;
}): Promise<GeometryCollection> {
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
        wasm: wasmInstance
      });
    case SpatialJoinGeometryType.PointLayerData:
      return await getGeometryCollectionFromPointLayerData({
        pointLayerData: geometries as PointLayerData[],
        wasm: wasmInstance
      });
    default:
      throw new Error('Geometry type is unknown.');
  }
}

/**
 * The type of the props for spatialJoinGeometryCollection
 * @param leftGeomCollection - the left geometry collection
 * @param rightGeomCollection - the right geometry collection
 */
export type SpatialJoinGeometryCollectionProps = {
  leftGeomCollection: GeometryCollection;
  rightGeomCollection: GeometryCollection;
};

/**
 * Spatial join two geometry collections
 * @param props - the props for spatialJoinGeometryCollection see {@link SpatialJoinGeometryCollectionProps}
 * @returns the join indexes
 */
export async function spatialJoinGeometryCollection({
  leftGeomCollection,
  rightGeomCollection
}: SpatialJoinGeometryCollectionProps): Promise<number[][]> {
  const result: number[][] = [];
  const wasmInstance = await initWASM();
  const joinIndexes = wasmInstance.spatialJoin(leftGeomCollection, rightGeomCollection);
  for (let i = 0; i < joinIndexes.size(); i++) {
    const joinIndex = joinIndexes.get(i);
    const resultRow: number[] = [];
    for (let j = 0; j < joinIndex.size(); j++) {
      resultRow.push(joinIndex.get(j));
    }
    result.push(resultRow);
  }
  return result;
}
