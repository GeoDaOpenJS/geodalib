import { initWASM } from '../init';
import { getGeometryCollection, SpatialGeometry } from './utils';

/**
 * Get the centroids of the geometries
 *
 * ## Example
 * ```ts
 * const geoms = [
 *   {
 *     type: 'Feature',
 *     geometry: { type: 'Point', coordinates: [100, 0] },
 *   },
 * ];
 *
 * const centroids = await getCentroids(geoms);
 * ```
 *
 * @param geoms The geometries to get the centroids. See {@link SpatialGeometry}
 * @returns The centroids of the geometries
 */
export async function getCentroids(geoms: SpatialGeometry) {
  await initWASM();

  const geometryCollection = await getGeometryCollection({ geometries: geoms });
  const centroids = geometryCollection.getCentroids();

  const result: Array<Array<number> | null> = [];

  // point as input search [lng, lat]
  for (let i = 0, n = centroids.size(); i < n; ++i) {
    if (centroids.get(i).size() === 0) {
      result.push(null);
    } else {
      result.push([centroids.get(i)?.get(0), centroids.get(i)?.get(1)]);
    }
  }

  return result;
}
