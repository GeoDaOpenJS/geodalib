// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { Feature } from 'geojson';
import { initWASM } from '../init';
import { getGeometryCollection, SpatialGeometry, lineToFeature } from './utils';

/**
 * Get the Minimum Spanning Tree for the given geometries. The Minimum Spanning Tree is a tree that connects all the geometries with the minimum total weight.
 * For more information, see [Minimum Spanning Tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree).
 *
 * ## Example
 * ```ts
 * const geoms = [
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [1, 0] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 1] } },
 * ];
 *
 * const mst = await getMST({ geoms });
 * ```
 *
 * @param geoms - The geometries to get the Minimum Spanning Tree for
 * @returns The Minimum Spanning Tree
 */
export async function getMinimumSpanningTree({ geoms }: { geoms: SpatialGeometry }) {
  // Handle empty input
  if (!geoms || (Array.isArray(geoms) && geoms.length === 0)) {
    return [];
  }

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

  const weights = new wasm.VectorDouble();

  const mst = wasm.mst(x, y, weights);

  // convert vector<line> to GeoJSON
  const result: Array<Feature> = [];
  for (let i = 0; i < mst.size(); i++) {
    const line = mst.get(i);
    const feature = await lineToFeature(line);
    feature.properties = { weight: weights.get(i) };
    result.push(feature);
  }

  return result;
}
