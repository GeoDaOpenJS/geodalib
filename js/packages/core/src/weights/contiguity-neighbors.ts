import { BinaryFeatureCollection } from '@loaders.gl/schema';
import type { GeometryCollection, GeoDaModule } from '@geoda/common';

import {
  BinaryGeometryType,
  getGeometryCollectionFromBinaryGeometries,
} from '../geometry/binary-geometry';
import { initWASM } from '../init';
import { getMetaFromWeights, WeightsMeta } from './weights-stats';
import { getGeometryCollection, SpatialGeometry } from '../geometry/utils';

async function createWeightsUtil(
  wasmInstance: GeoDaModule,
  geomCollection: GeometryCollection,
  pointWeights: boolean,
  isQueen: boolean,
  precisionThreshold: number,
  orderOfContiguity: number,
  includeLowerOrder: boolean
) {
  const neighbors: number[][] = [];
  if (geomCollection) {
    const result = pointWeights
      ? wasmInstance.getPointContiguityWeights(
          geomCollection,
          isQueen,
          precisionThreshold,
          orderOfContiguity,
          includeLowerOrder
        )
      : wasmInstance.getPolygonContiguityWeights(
          geomCollection,
          isQueen,
          precisionThreshold,
          orderOfContiguity,
          includeLowerOrder
        );
    for (let i = 0; i < result.size(); ++i) {
      const nbrs = result.get(i);
      const nbrIndices: number[] = Array(nbrs.size());
      for (let j = 0, nbrSize = nbrs.size(); j < nbrSize; ++j) {
        nbrIndices[j] = nbrs.get(j);
      }
      neighbors[i] = nbrIndices;
    }
  }

  return neighbors;
}

/**
 * Interface for the arguments used in calculating contiguity neighbors from binary geometries.
 */
export type ContiguityNeighborsFromBinaryGeometriesProps = {
  /**
   * The type of binary geometry
   */
  binaryGeometryType: BinaryGeometryType;
  /**
   * The array of binary geometry features
   */
  binaryGeometries: BinaryFeatureCollection[];
  /**
   * Whether to use centroids for neighbor calculations
   */
  useCentroids?: boolean;
  /**
   * Whether to use queen contiguity (true) or rook contiguity (false)
   */
  isQueen: boolean;
  /**
   * Threshold for considering points as neighbors
   */
  precisionThreshold?: number;
  /**
   * The order of contiguity to calculate
   */
  orderOfContiguity?: number;
  /**
   * Whether to include lower orders in the results
   */
  includeLowerOrder?: boolean;
};

/**
 * Interface for the arguments used in calculating contiguity neighbors from a geometry collection.
 */
export type ContiguityNeighborsFromGeomCollectionProps = {
  /**
   * The geometry collection to calculate the neighbors for
   */
  geomCollection: GeometryCollection;
  /**
   * Whether to use queen contiguity (true) or rook contiguity (false)
   */
  isQueen: boolean;
  /**
   * Whether to use centroids for neighbor calculations
   */
  useCentroids?: boolean;
  /**
   * Threshold for considering points as neighbors
   */
  precisionThreshold?: number;
  /**
   * The order of contiguity to calculate
   */
  orderOfContiguity?: number;
  /**
   * Whether to include lower orders in the results
   */
  includeLowerOrder?: boolean;
};

/**
 * Calculates contiguity-based neighbors for a set of geometries.
 *
 * This function processes geometries to determine spatial relationships
 * between them based on their contiguity (shared boundaries or vertices).
 *
 * @param {ContiguityNeighborsFromGeomCollectionProps} input - Configuration object for neighbor calculation See {@link ContiguityNeighborsFromGeomCollectionProps} for more information.
 * @returns {Promise<number[][]>} Array where each element contains indices of neighboring geometries
 */
export async function getContiguityNeighborsFromGeomCollection({
  geomCollection,
  isQueen,
  useCentroids = true,
  precisionThreshold = 0.0,
  orderOfContiguity = 1,
  includeLowerOrder = false,
}: ContiguityNeighborsFromGeomCollectionProps): Promise<number[][]> {
  const wasmInstance = await initWASM();

  const neighbors = await createWeightsUtil(
    wasmInstance,
    geomCollection,
    useCentroids,
    isQueen,
    precisionThreshold,
    orderOfContiguity,
    includeLowerOrder
  );
  return neighbors;
}

/**
 * Calculates contiguity-based neighbors for a set of binary geometries.
 *
 * This function processes binary geometry features to determine spatial relationships
 * between geometries based on their contiguity (shared boundaries or vertices).
 *
 * @param {ContiguityNeighborsFromBinaryGeometriesProps} input - Configuration object for neighbor calculation
 * @returns {Promise<number[][]>} Array where each element contains indices of neighboring geometries
 */
export async function getContiguityNeighborsFromBinaryGeometries({
  binaryGeometryType,
  binaryGeometries,
  isQueen,
  useCentroids,
  precisionThreshold = 0.0,
  orderOfContiguity = 1,
  includeLowerOrder = false,
}: ContiguityNeighborsFromBinaryGeometriesProps): Promise<number[][]> {
  if (!binaryGeometries || binaryGeometries.length === 0) {
    return [];
  }

  const wasmInstance = await initWASM();
  const geomCollection = await getGeometryCollectionFromBinaryGeometries(
    binaryGeometryType,
    binaryGeometries,
    wasmInstance
  );
  const pointWeights = useCentroids || binaryGeometryType.point || binaryGeometryType.line || true;

  const neighbors = await createWeightsUtil(
    wasmInstance,
    geomCollection,
    pointWeights,
    isQueen,
    precisionThreshold,
    orderOfContiguity,
    includeLowerOrder
  );
  return neighbors;
}

/**
 * ## Description
 * Create Queen contiguity weights for GeoJSON features.
 *
 * Queen contiguity defines neighbors as spatial units that share either:
 * - A common edge (border)
 * - A common vertex (corner)
 *
 * This is in contrast to Rook contiguity, which only considers shared edges.
 *
 * ## Example
 * ```ts
 * import { queenWeights } from '@geoda/core';
 *
 * const geometries = [
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [1, 0] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 1] } },
 * ];
 *
 * const weights = await queenWeights(geometries);
 *
 * console.log(weights);
 * ```
 *
 * @param {SpatialGeometry} geometries - The geometries used to create the queen contiguity weights. See {@link SpatialGeometry} for more information.
 * @param {boolean} [useCentroids=false] - If true, uses geometry centroids for calculations
 * @param {number} [precisionThreshold=0.0] - Distance threshold for determining neighbors.
 *                                           Useful when geometries don't perfectly align
 * @param {number} [orderOfContiguity=1] - Number of steps to consider for neighbor relationships.
 *                                         1 means immediate neighbors only
 * @param {boolean} [includeLowerOrder=false] - If true, includes all neighbors from order 1
 *                                             up to the specified order
 * @returns {Promise<WeightsMeta>} Spatial weights metadata including neighbor relationships
 */
export async function queenWeights(
  geometries: SpatialGeometry,
  useCentroids = false,
  precisionThreshold = 0.0,
  orderOfContiguity = 1,
  includeLowerOrder = false
): Promise<WeightsMeta> {
  const wasmInstance = await initWASM();
  const geomCollection = await getGeometryCollection({
    geometries,
  });

  const geometryType = geomCollection.getType();

  const pointWeights = useCentroids || geometryType === 1 || geometryType === 2;

  const isQueen = true;

  const neighbors = await createWeightsUtil(
    wasmInstance,
    geomCollection,
    pointWeights,
    isQueen,
    precisionThreshold,
    orderOfContiguity,
    includeLowerOrder
  );
  return getMetaFromWeights(neighbors);
}

/**
 * ## Description
 * Create Rook contiguity weights for GeoJSON features.
 *
 * Rook contiguity defines neighbors as spatial units that only share common edge (border)
 *
 * This is in contrast to Queen contiguity, which considers shared edges and vertices.
 *
 * ## Example
 * ```ts
 * import { rookWeights } from '@geoda/core';
 *
 * const geometries = [
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [1, 0] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 1] } },
 * ];
 *
 * const weights = await rookWeights(geometries);
 *
 * console.log(weights);
 * ```
 *
 * @param {SpatialGeometry} geometries - The geometries used to create the rook contiguity weights. See {@link SpatialGeometry} for more information.
 * @param {boolean} [useCentroids=false] - If true, uses geometry centroids for calculations
 * @param {number} [precisionThreshold=0.0] - Distance threshold for determining neighbors.
 *                                           Useful when geometries don't perfectly align
 * @param {number} [orderOfContiguity=1] - Number of steps to consider for neighbor relationships.
 *                                         1 means immediate neighbors only
 * @param {boolean} [includeLowerOrder=false] - If true, includes all neighbors from order 1
 *                                             up to the specified order
 * @returns {Promise<WeightsMeta>} Spatial weights metadata including neighbor relationships
 */
export async function rookWeights(
  geometries: SpatialGeometry,
  useCentroids = false,
  precisionThreshold = 0.0,
  orderOfContiguity = 1,
  includeLowerOrder = false
): Promise<WeightsMeta> {
  const wasmInstance = await initWASM();
  const geomCollection = await getGeometryCollection({
    geometries,
  });

  const geometryType = geomCollection.getType();

  const pointWeights = useCentroids || geometryType === 1 || geometryType === 2;

  const isQueen = false;

  const neighbors = await createWeightsUtil(
    wasmInstance,
    geomCollection,
    pointWeights,
    isQueen,
    precisionThreshold,
    orderOfContiguity,
    includeLowerOrder
  );
  return getMetaFromWeights(neighbors);
}
