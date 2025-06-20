import { SpatialGeometry, getGeometryCollection } from '../geometry/utils';
import { getContiguityNeighborsFromGeomCollection } from './contiguity-neighbors';
import { getDistanceNeighborsFromGeomCollection } from './distance-neighbors';
import { getNearestNeighborsFromGeomCollection } from './nearest-neighbors';
import { getMetaFromWeights } from './weights-stats';
import { WeightsMeta } from './weights-stats';

export type CreateWeightsProps = {
  weightsType: 'knn' | 'threshold' | 'queen' | 'rook';
  k?: number;
  distanceThreshold?: number;
  isQueen?: boolean;
  isRook?: boolean;
  isMile?: boolean;
  /**
   * Whether to use centroids for neighbor calculations
   */
  useCentroids?: boolean;
  /**
   * The precision threshold for neighbor calculations
   */
  precisionThreshold?: number;
  /**
   * The order of contiguity for neighbor calculations
   */
  orderOfContiguity?: number;
  /**
   * Whether to include lower order neighbors
   */
  includeLowerOrder?: boolean;
  /**
   * The geometries to create the weights for. See {@link SpatialGeometry} for more information.
   * - GeoJSON features: {@link Feature} from geojson
   * - Binary feature collection: {@link BinaryFeatureCollection} from loaders.gl/schema
   * - Point layer data: {@link PointLayerData} from kepler.gl
   * - Arc layer data: {@link ArcLayerData} from kepler.gl
   * - Hexagon id layer data: {@link HexagonIdLayerData} from kepler.gl
   */
  geometries: SpatialGeometry;
};

/**
 * Create weights for the given geometries.
 *
 * ## Example
 * ```ts
 * import { createWeights } from '@geoda/core';
 *
 * const geometries = [
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [1, 0] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 1] } },
 * ];
 *
 * const weights = await createWeights({
 *   weightsType: 'queen',
 *   geometries,
 * });
 *
 * console.log(weights);
 * ```
 */
export async function createWeights({
  weightsType,
  k,
  isQueen,
  distanceThreshold,
  isMile,
  useCentroids,
  precisionThreshold,
  orderOfContiguity,
  includeLowerOrder,
  geometries,
}: CreateWeightsProps) {
  const geomCollection = await getGeometryCollection({
    geometries,
  });

  let weights: number[][] = [];
  let weightsMeta: WeightsMeta = {
    numberOfObservations: 0,
    minNeighbors: 0,
    maxNeighbors: 0,
    meanNeighbors: 0,
    medianNeighbors: 0,
    pctNoneZero: 0,
  };

  if (weightsType === 'queen' || weightsType === 'rook') {
    weights = await getContiguityNeighborsFromGeomCollection({
      geomCollection,
      isQueen: isQueen !== undefined ? isQueen : true,
      useCentroids: useCentroids !== undefined ? useCentroids : true,
      precisionThreshold: precisionThreshold || 0.0,
      orderOfContiguity: orderOfContiguity || 1,
      includeLowerOrder: includeLowerOrder !== undefined ? includeLowerOrder : false,
    });

    weightsMeta = {
      ...getMetaFromWeights(weights),
      type: weightsType,
      symmetry: 'symmetric',
      order: orderOfContiguity || 1,
      includeLowerOrder: includeLowerOrder || false,
      threshold: precisionThreshold || 0.0,
    };
  } else if (weightsType === 'knn') {
    weights = await getNearestNeighborsFromGeomCollection({
      geomCollection,
      k: k || 4,
    });

    weightsMeta = {
      ...getMetaFromWeights(weights),
      type: weightsType,
      symmetry: 'symmetric',
      k: k || 4,
    };
  } else if (weightsType === 'threshold') {
    weights = await getDistanceNeighborsFromGeomCollection({
      geomCollection,
      distanceThreshold: distanceThreshold || 0.0,
      isMile: isMile || false,
    });

    weightsMeta = {
      ...getMetaFromWeights(weights, true),
      type: weightsType,
      symmetry: 'symmetric',
      threshold: distanceThreshold || 0.0,
      isMile: isMile || false,
    };
  } else {
    throw new Error('Invalid weights type');
  }

  return { weights, weightsMeta };
}
