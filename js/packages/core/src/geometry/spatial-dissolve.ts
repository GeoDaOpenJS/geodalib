import { initWASM } from '../init';
import { SpatialGeometry, getGeometryCollection, polygonToFeature } from './utils';
import { Feature } from 'geojson';

/**
 * Dissolve the polygons by merging them into a single polygon
 * @param polys - The polygons to dissolve
 * @returns The dissolved polygon
 *
 * @example
 * ```ts
 * const polys = [
 *   { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 0 } },
 *   { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 1 } },
 * ];
 * const dissolved = await spatialDissolve(polys);
 * ```
 */
export async function spatialDissolve(polys: SpatialGeometry): Promise<Feature> {
  const wasm = await initWASM();

  const geometryCollection = await getGeometryCollection({ geometries: polys });
  const result = await wasm.spatialDissolve(geometryCollection);

  // convert Polygon to Feature
  return polygonToFeature(result);
}
