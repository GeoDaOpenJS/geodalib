
import {Vector} from 'apache-arrow';
import {Feature, MultiPolygon, Polygon, Point} from 'geojson';

import {getPolygonCollection, getLineCollection, getPointCollection} from '../features/geometry';
import {initWASM, getWASM} from '../init';

// Get centroids from a collection of GeoJson Polygons/MultiPolygons
export async function getCentroids(
  polygons: Feature<Polygon | MultiPolygon>[]
): Promise<Array<Feature<Point> | null>> {
  const wasm = await initWASM();

  const geodaPolys = getPolygonCollection(polygons, wasm);
  const coords = wasm.getCentroids(geodaPolys);
  const numPoints = coords.size();
  const centroids: Array<Feature<Point> | null> = [];
  for (let i = 0; i < numPoints; ++i) {
    if (coords.get(i).size() === 0) {
      centroids.push(null);
    } else {
      centroids.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [coords.get(i).get(0), coords.get(i).get(1)]
        },
        properties: {}
      });
    }
  }
  geodaPolys.delete();
  return centroids;
}

// Get centroid for one feature. This function is used by column metric: centroid()
export function getCentroid(feature: Feature | null): Array<number> | null {
  const wasm = getWASM();
  if (!wasm || !feature) return null;

  const geomType = feature?.geometry?.type;

  let geom;
  if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
    geom = getPolygonCollection([feature], wasm);
  } else if (geomType === 'LineString' || geomType === 'MultiLineString') {
    geom = getLineCollection([feature], wasm);
  } else if (geomType === 'Point' || geomType === 'MultiPoint') {
    geom = getPointCollection([feature], wasm);
  } else {
    return null;
  }
  const coords = wasm.getCentroids(geom);
  geom.delete();

  return coords.size() > 0 && coords.get(0).size() === 2
    ? [coords.get(0).get(0), coords.get(0).get(1)]
    : null;
}

// Get centroids from an array of Geojson Feature. This function is used by geojson-layer to
// get centroids (memorized) for filtering and labeling
// eslint-disable-next-line complexity
export function getGeojsonCentroids(features: Array<Feature | null>): Array<Array<number> | null> {
  let result: Array<Array<number> | null> = [];
  const wasm = getWASM();
  if (!wasm) return result;

  const nFeatures = features.length;
  const validIndex: number[] = [];
  const validFeatures: Feature[] = [];

  result = Array<Array<number> | null>(nFeatures).fill(null);

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

  const geom =
    geomType === 'Polygon' || geomType === 'MultiPolygon'
      ? getPolygonCollection(validFeatures, wasm)
      : geomType === 'LineString' || geomType === 'MultiLineString'
      ? getLineCollection(validFeatures, wasm)
      : geomType === 'Point' || geomType === 'MultiPoint'
      ? getPointCollection(validFeatures, wasm)
      : null;

  if (!geom) return result;

  const centroids = wasm.getCentroids(geom);
  geom.delete();

  // point as input search [lng, lat]
  for (let i = 0, n = centroids.size(); i < n; ++i) {
    if (centroids.get(i).size() === 0) {
      result[validIndex[i]] = null;
    } else {
      result[validIndex[i]] = [centroids.get(i)?.get(0), centroids.get(i)?.get(1)];
    }
  }

  return result;
}

// get centroids from geoarrow column
export function getGeoArrowCentroids(geomeColumn: ArrowColumn, chunkIndexes: number[]): Array<Array<number>> {
  const wasm = getWASM();
  if (!wasm) return [];

  const numChunks = chunkIndexes.length;
  const centroids: Array<Array<number>> = [];
  for (let i = 0; i < numChunks; ++i) {
    const chunkIndex = chunkIndexes[i];
    const chunk = geomeColumn.get(chunkIndex);
    const geom = getPolygonCollection(chunk, wasm);
    const coords = wasm.getCentroids(geom);
    geom.delete();
    const numPoints = coords.size();
    for (let j = 0; j < numPoints; ++j) {
      centroids.push([coords.get(j).get(0), coords.get(j).get(1)]);
    }
  }
  return centroids;
}
