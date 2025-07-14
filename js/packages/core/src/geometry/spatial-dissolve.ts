// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

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
 * const dissolvedPolygon = await spatialDissolve(polys);
 * ```
 *
 * :::tip
 * In practice, you may need to find the polygons that need to be dissolved first.
 * For example, using a county dataset, you may need to dissolve the polygons that share the same county code.
 * :::
 */
export async function spatialDissolve(polys: SpatialGeometry): Promise<Feature> {
  const wasm = await initWASM();

  const geometryCollection = await getGeometryCollection({ geometries: polys });

  const polygon = await wasm.spatialDissolve(geometryCollection);

  const dissolvedPolygon = await polygonToFeature(polygon);

  return dissolvedPolygon;
}
