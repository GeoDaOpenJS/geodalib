import {Polygon, MultiPolygon, Point, Feature} from 'geojson';

import {
  getPolygonCollection,
  getPointCollection,
  getPointCollectionFromLatLng
} from '../features/geometry';
import {initWASM} from '../init';

export type SpatialCountPointInput = {
  features: Feature<Point>[] | null;
  latitudes: number[] | null;
  longitudes: number[] | null;
};

export async function spatialCount(
  polygons: Feature<Polygon | MultiPolygon>[],
  points: SpatialCountPointInput
): Promise<number[]> {
  const n = polygons.length;
  const counts: number[] = Array(n);

  if (n === 0) {
    return counts;
  }

  const wasmInstance = await initWASM();
  const polygonCollection = getPolygonCollection(polygons, wasmInstance);

  let pointCollection;
  if (points.features) {
    pointCollection = getPointCollection(points.features, wasmInstance);
  } else if (points.latitudes && points.longitudes) {
    pointCollection = getPointCollectionFromLatLng(
      points.latitudes,
      points.longitudes,
      wasmInstance
    );
  } else {
    // something wrong with the input points
    return counts;
  }

  const result = wasmInstance.spatialCount(polygonCollection, pointCollection);

  for (let i = 0; i < n; ++i) {
    counts[i] = result.get(i);
  }

  return counts;
}
