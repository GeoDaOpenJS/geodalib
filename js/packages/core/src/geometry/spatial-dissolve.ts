import { initWASM } from '../init';
import { SpatialGeometry, getGeometryCollection } from './utils';
import { Feature, Polygon } from 'geojson';

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
export async function spatialDissolve(polys: SpatialGeometry): Promise<Feature[]> {
  const wasm = await initWASM();

  const geometryCollection = await getGeometryCollection({ geometries: polys });
  const polygon = await wasm.spatialDissolve(geometryCollection);

  const xs = polygon.getX();
  const ys = polygon.getY();
  const parts = polygon.getParts();
  const holes = polygon.getHoles();

  const numPoints = xs.size();
  const numParts = parts.size();

  let numExtRings = 0;
  for (let i = 0; i < numParts; ++i) {
    if (holes.get(i) === 0) {
      numExtRings += 1;
    }
  }

  const features: Feature[] = [];

  const isMultiPolygon = numExtRings > 1;

  if (isMultiPolygon) {
    // create Feature[] for all polygons

    let polyIndex = -1;
    for (let i = 0; i < numParts; ++i) {
      if (holes.get(i) === 0) {
        // extRing
        polyIndex += 1;
        const feature: Feature = {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [],
          },
          properties: {},
        };
        features.push(feature);
      }
      const ring: number[][] = [];
      const start = parts.get(i);
      const end = i === numParts - 1 ? numPoints : parts.get(i + 1);
      for (let j = start; j < end; ++j) {
        ring.push([xs.get(j), ys.get(j)]);
      }
      (features[polyIndex].geometry as Polygon).coordinates.push(ring);
    }
  } else {
    const coordinates = Array(numParts);
    for (let i = 0; i < numParts; ++i) {
      const ring: number[][] = [];
      const start = parts.get(i);
      const end = i === numParts - 1 ? numPoints : parts.get(i + 1);
      for (let j = start; j < end; ++j) {
        ring.push([xs.get(j), ys.get(j)]);
      }
      coordinates[i] = ring;
    }
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates,
      },
      properties: {},
    });
  }

  return features;
}
