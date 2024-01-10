

import {Feature, Polygon, MultiPolygon} from 'geojson';

import {CustomEmbindModule} from '../../wasm';
import {getPolygonCollection, getGeojsonPolygon} from '../features/geometry';
import {initWASM, getWASM} from '../init';

export async function spatialMerge(polygons: Feature<Polygon | MultiPolygon>[]): Promise<Feature> {
  const wasmInstance = await initWASM();

  return spatialMergeSync(polygons, wasmInstance);
}

export function spatialMergeSync(
  polygons: Feature<Polygon | MultiPolygon>[],
  wasmInstance?: CustomEmbindModule
): Feature {
  // try to get geoda WASM instance from the library if no wasmInstance passed
  const wasm = wasmInstance ?? getWASM();
  if (!wasm) {
    // return empty Polygon feature to avoid crash
    return {type: 'Feature', geometry: {type: 'Polygon', coordinates: []}, properties: {}};
  }

  // Boost.geometry/GEOS uses clockwise winding for exterior rings, which is
  // different than Simple Feature implementation (geojson). We need to fix it.
  const fixPolygon = true;

  const polygonCollection = getPolygonCollection(polygons, wasm, fixPolygon);

  // call geoda.spatialUnion()
  const poly = wasm.spatialUnion(polygonCollection);

  const unionResult = getGeojsonPolygon(poly);
  return unionResult;
}
