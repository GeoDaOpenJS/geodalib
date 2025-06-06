import { Feature } from 'geojson';
import { initWASM } from '../init';
import { getGeometryCollection, SpatialGeometry, polygonToFeature } from './utils';

/**
 * Get the Thiessen polygons for the given geometries. If the given geometries are not points,
 * the centroids will be used to create the Thiessen polygons.
 *
 * Note: The Thiessen polygons are the polygons that are created by the Voronoi diagram of the points.
 *
 * ## Example
 * ```ts
 * const geoms = [
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4194, 37.7749] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [-74.0060, 40.7128] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [-87.6298, 41.8781] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [-95.3698, 29.7604] } },
 * ];
 * const thiessenPolygons = await getThiessenPolygons({ geoms });
 * ```
 *
 * @param geoms - The geometries to get the Thiessen polygons
 * @returns The Thiessen polygons
 */
export async function getThiessenPolygons({ geoms }: { geoms: SpatialGeometry }) {
  const wasm = await initWASM();

  const geomCollection = await getGeometryCollection({
    geometries: geoms,
    fixPolygon: true,
  });

  // get centroids from geomCollection
  const centroids = geomCollection.getCentroids();

  const x = new wasm.VectorDouble();
  const y = new wasm.VectorDouble();

  for (let i = 0; i < centroids.size(); i++) {
    const centroid = centroids.get(i);
    x.push_back(centroid.get(0));
    y.push_back(centroid.get(1));
  }

  // get thiessen polygons
  const thiessenPolygons = wasm.thiessenPolygon(x, y);

  // convert to GeoJSON
  const result: Array<Feature> = [];
  for (let i = 0; i < thiessenPolygons.size(); i++) {
    const polygon = thiessenPolygons.get(i);
    result.push(await polygonToFeature(polygon));
  }

  return result;
}
