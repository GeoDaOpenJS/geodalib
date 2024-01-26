import {Feature} from 'geojson';

import {CustomEmbindModule} from '../../wasm';
import {
  getPolygonCollection,
  getLineCollection,
  getPointCollection,
  getGeojsonPolygon
} from '../features/geometry';
import {getWASM} from '../init';
import {lengthToMeters} from '../utils';
import {DistanceUnit} from '../weights/distance-based-neighbors';

// eslint-disable-next-line complexity, max-statements
export function getBuffersSync(
  features: Array<Feature | null>,
  bufferDistance: number,
  distanceUnit: DistanceUnit,
  pointsPerCircle: number,
  wasmInstance?: CustomEmbindModule
): Array<Feature | null> {
  const nFeatures = features.length;
  const result: Array<Feature | null> = Array(nFeatures).fill(null);

  // try to get geoda WASM instance from the library if no wasmInstance passed
  const wasm = wasmInstance ?? getWASM();
  if (!wasm) {
    return result;
  }

  const validIndex: number[] = [];
  const validFeatures: Feature[] = [];

  let geomType: string | null = null;
  for (let i = 0; i < nFeatures; ++i) {
    const feat = features[i];
    const featureGeomType = feat?.geometry?.type;
    if (featureGeomType) {
      if (!geomType) geomType = featureGeomType;
      // geomType could be 'Polygon' and featureGeomType could be either 'Polygon' or 'MultiPolygon'
      if (geomType.indexOf(featureGeomType) >= 0 || featureGeomType.indexOf(geomType) >= 0) {
        validIndex.push(i);
        validFeatures.push(feat);
      }
    }
  }

  const convertToUTM = true;
  const fixPolygon = true;
  const geom =
    geomType === 'Polygon' || geomType === 'MultiPolygon'
      ? getPolygonCollection(validFeatures, wasm, fixPolygon, convertToUTM)
      : geomType === 'LineString' || geomType === 'MultiLineString'
      ? getLineCollection(validFeatures, wasm, convertToUTM)
      : geomType === 'Point' || geomType === 'MultiPoint'
      ? getPointCollection(validFeatures, wasm, convertToUTM)
      : null;

  if (!geom) return result;

  const dist = lengthToMeters(bufferDistance, distanceUnit);

  for (let i = 0, n = validFeatures.length; i < n; ++i) {
    const idx = validIndex[i];
    const bufferPoly = geom.buffer(i, dist, pointsPerCircle);
    const bufferGeojson = getGeojsonPolygon(bufferPoly);
    result[idx] = bufferGeojson;
  }
  geom.delete();
  return result;
}

// get Buffer for a single feature, used by metric function
export function getBufferSync(
  feature: Feature,
  bufferDistance: number,
  distanceUnit: DistanceUnit,
  pointsPerCircle: number,
  wasmInstance?: CustomEmbindModule
): Feature | null {
  const bufferResults = getBuffersSync(
    [feature],
    bufferDistance,
    distanceUnit,
    pointsPerCircle,
    wasmInstance
  );
  return bufferResults[0];
}
