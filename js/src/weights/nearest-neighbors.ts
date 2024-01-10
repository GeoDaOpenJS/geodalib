

import {Feature} from 'geojson';

import {getGeometryCollection} from '../features/geometry';
import {initWASM} from '../init';

type NearestNeighborsInput = {
  k: number;
  geometries?: Feature[];
  latLngArrays?: {
    longitudes: Float64Array;
    latitudes: Float64Array;
  };
};

export async function getNearestNeighbors({
  k,
  geometries,
  latLngArrays
}: NearestNeighborsInput): Promise<number[][]> {
  const n = geometries ? geometries.length : latLngArrays ? latLngArrays.latitudes.length : 0;
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
    const result = wasmInstance.getNearestNeighbors(geomCollection, k);
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
