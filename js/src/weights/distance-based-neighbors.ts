

import {Feature} from 'geojson';

import {getGeometryCollection} from '../features/geometry';
import {initWASM} from '../init';

// for lat and lng, we use the great circle distance or arc distance
// in the unit of mile or kilometer (KM)
export enum DistanceUnit {
  Mile = 'Mile',
  KM = 'KM'
}

/**
 * geometries: the geometries used to compute distance. NOTE: for Polygon type, the
 *  centroids are used to compute the distance
 * latLngArrays: the latitude and longitude array represents the input point geometries
 */
export type DistanceWeightsGeometryInput = {
  geometries?: Feature[];
  latLngArrays?: {
    longitudes: Float64Array;
    latitudes: Float64Array;
  };
};

/**
 * distanceThreshold: the distance value that defines neighbors within this threshold
 * isMile: if the measurement unit of distance is mile (true), or kilometer (false)
 */
export type DistanceWeightsInput = DistanceWeightsGeometryInput & {
  distanceThreshold: number;
  distanceUnit: DistanceUnit;
};

export type DistanceThresholdsInput = DistanceWeightsGeometryInput & {
  distanceUnit: DistanceUnit;
};

/**
 * minDistanceThreshold: the minimum 1nn distance
 * suggestedDistanceThreshold: the maximum 1nn distance
 * maxDistanceThreshold: the approximate maximum pair distance
 * The 1st and 3rd values are used to define the range of distance thresholds
 * The 2nd value is used as suggested distance threshold, which guarantees at least one neighbor
 */
export type DistanceThresholdsOutput = {
  minDistanceThreshold: number;
  suggestedDistanceThreshold: number;
  maxDistanceThreshold: number;
};

export async function getDistanceThresholds({
  distanceUnit,
  geometries,
  latLngArrays
}: DistanceThresholdsInput): Promise<DistanceThresholdsOutput> {
  const n = geometries?.length ?? latLngArrays?.latitudes.length ?? 0;

  let minDistanceThreshold = 0;
  let suggestedDistanceThreshold = 0;
  let maxDistanceThreshold = 0;

  if (n === 0) {
    return {minDistanceThreshold, suggestedDistanceThreshold, maxDistanceThreshold};
  }

  const wasmInstance = await initWASM();
  const geomCollection = getGeometryCollection(
    {
      features: geometries ?? null,
      latitudes: latLngArrays?.latitudes ?? null,
      longitudes: latLngArrays?.longitudes ?? null
    },
    wasmInstance
  );

  if (geomCollection) {
    const result = wasmInstance.getDistanceThresholds(
      geomCollection,
      distanceUnit === DistanceUnit.Mile
    );
    minDistanceThreshold = result.get(0);
    suggestedDistanceThreshold = result.get(1);
    maxDistanceThreshold = result.get(2);
  }

  return {minDistanceThreshold, suggestedDistanceThreshold, maxDistanceThreshold};
}

export async function getDistanceBasedNeighbors({
  distanceThreshold,
  distanceUnit,
  geometries,
  latLngArrays
}: DistanceWeightsInput): Promise<number[][]> {
  const n = geometries?.length ?? latLngArrays?.latitudes.length ?? 0;
  const neighbors: number[][] = Array(n);

  if (n === 0) {
    return neighbors;
  }

  const wasmInstance = await initWASM();
  const geomCollection = getGeometryCollection(
    {
      features: geometries ?? null,
      latitudes: latLngArrays?.latitudes ?? null,
      longitudes: latLngArrays?.longitudes ?? null
    },
    wasmInstance
  );

  if (geomCollection) {
    const result = wasmInstance.getDistanceWeights(
      geomCollection,
      distanceThreshold,
      distanceUnit === DistanceUnit.Mile
    );
    for (let i = 0; i < n; ++i) {
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
