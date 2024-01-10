

import {Feature, Geometry, Position} from 'geojson';

import {
  CustomEmbindModule,
  PolygonCollection,
  PointCollection,
  LineCollection,
  Polygon as GeoDaPolygon
} from '../../wasm';

export type GeometryInput = {
  features: Feature<Geometry>[] | null;
  latitudes?: Float64Array | null;
  longitudes?: Float64Array | null;
  index?: number[] | null;
};

export type GeometryCollectionType = PointCollection | LineCollection | PolygonCollection | null;

// Convert from GeoJSON features (MultiPolygon and Polygon) to geoda.PolygonCollection
export function getPolygonCollection(
  features: Feature[],
  wasm: CustomEmbindModule,
  fixPolygon?: boolean,
  convertToUTM?: boolean
): PolygonCollection {
  let ptIndex = 0;
  // for WASM data structure, please see: src/spatial_features.h in geoda repo
  const xs = new wasm.VectorDouble();
  const ys = new wasm.VectorDouble();
  const parts = new wasm.VectorUInt();
  const holes = new wasm.VectorUInt();
  const sizes = new wasm.VectorUInt();

  function handlePolygonRing(polygon: Position[][], numParts: number): number {
    // each ring (even an empty ring) starts at ptIndex
    parts.push_back(ptIndex);
    // the first ring (exterior) is not a hole
    holes.push_back(0);

    for (let j = 0, m = polygon.length; j < m; ++j) {
      const ring = polygon[j];
      if (j > 0) {
        parts.push_back(ptIndex);
        holes.push_back(1);
      }
      if (ring.length > 0) numParts += 1;
      for (let k = 0, npts = ring.length; k < npts; ++k) {
        const pt = ring[k];
        xs.push_back(pt[0]);
        ys.push_back(pt[1]);
        ptIndex += 1;
      }
    }

    return numParts;
  }

  for (let i = 0, n = features.length; i < n; ++i) {
    const feat = features[i];
    let numParts = 0;
    if (feat.geometry.type === 'MultiPolygon') {
      for (let j = 0, m = feat.geometry.coordinates.length; j < m; ++j) {
        const poly = feat.geometry.coordinates[j];
        numParts = handlePolygonRing(poly, numParts);
      }
    } else if (feat.geometry.type === 'Polygon') {
      numParts = handlePolygonRing(feat.geometry.coordinates, numParts);
    }
    sizes.push_back(numParts);
  }
  const pc = new wasm.PolygonCollection(
    xs,
    ys,
    parts,
    holes,
    sizes,
    fixPolygon ?? false,
    convertToUTM ?? false
  );
  return pc;
}

// Convert from GeoJSON features (MultiLineString and LineString) to geoda.LineCollection
export function getLineCollection(
  features: Feature[],
  wasm: CustomEmbindModule,
  convertToUTM?: boolean
): LineCollection {
  let ptIndex = 0;
  // for WASM data structure, please see: src/spatial_features.h in geoda repo
  const xs = new wasm.VectorDouble();
  const ys = new wasm.VectorDouble();
  const parts = new wasm.VectorUInt();
  const sizes = new wasm.VectorUInt();

  function handleLineSegment(lineSeg: Position[]): boolean {
    parts.push_back(ptIndex);
    let validLine = false;
    for (let j = 0, m = lineSeg.length; j < m; ++j) {
      const pt = lineSeg[j];
      xs.push_back(pt[0]);
      ys.push_back(pt[1]);
      ptIndex += 1;
      validLine = true;
    }
    return validLine;
  }

  for (let i = 0, n = features.length; i < n; ++i) {
    const feat = features[i];
    let numParts = 0;
    if (feat.geometry.type === 'MultiLineString') {
      for (let j = 0, m = feat.geometry.coordinates.length; j < m; ++j) {
        // eslint-disable-next-line max-depth
        if (handleLineSegment(feat.geometry.coordinates[j])) {
          numParts += 1;
        }
      }
    } else if (feat.geometry.type === 'LineString') {
      if (handleLineSegment(feat.geometry.coordinates)) {
        numParts += 1;
      }
    }
    sizes.push_back(numParts);
  }
  const lc = new wasm.LineCollection(xs, ys, parts, sizes, convertToUTM ?? false);
  return lc;
}

// Convert from GeoJSON features (MultiPoint and Point) to geoda.PointCollection
export function getPointCollection(
  features: Feature[],
  wasm: CustomEmbindModule,
  convertToUTM?: boolean
): PointCollection {
  let ptIndex = 0;
  // for WASM data structure, please see: src/spatial_features.h in geoda repo
  const xs = new wasm.VectorDouble();
  const ys = new wasm.VectorDouble();
  const parts = new wasm.VectorUInt();
  const sizes = new wasm.VectorUInt();

  function handlePoint(point: Position): boolean {
    let isValid = false;
    if (point.length >= 2) {
      xs.push_back(point[0]);
      ys.push_back(point[1]);
      isValid = true;
    }
    ptIndex += 1;
    return isValid;
  }

  for (let i = 0, n = features.length; i < n; ++i) {
    const feat = features[i];
    let numParts = 0;
    if (feat.geometry.type === 'MultiPoint') {
      parts.push_back(ptIndex);
      for (let j = 0, m = feat.geometry.coordinates.length; j < m; ++j) {
        // eslint-disable-next-line max-depth
        if (handlePoint(feat.geometry.coordinates[j])) {
          numParts += 1;
        }
      }
    } else if (feat.geometry.type === 'Point') {
      parts.push_back(ptIndex);
      if (handlePoint(feat.geometry.coordinates)) {
        numParts += 1;
      }
    }
    sizes.push_back(numParts);
  }
  const pc = new wasm.PointCollection(xs, ys, parts, sizes, convertToUTM ?? false);
  return pc;
}

/**
 * Convert from lat/lng pairs to geoda.PointCollection
 * start/end are only for parallel spatial join that each webworker use
 * a subset of lat/lng data in spatial join
 */
export function getPointCollectionFromLatLng(
  lat: number[] | Float64Array,
  lng: number[] | Float64Array,
  wasm: CustomEmbindModule,
  start?: number,
  end?: number
): PointCollection {
  let ptIndex = 0;
  // for WASM data structure, please see: src/spatial_features.h in geoda repo
  const xs = new wasm.VectorDouble();
  const ys = new wasm.VectorDouble();
  const parts = new wasm.VectorUInt();
  const sizes = new wasm.VectorUInt();

  for (let i = start ?? 0, n = end ?? lat.length; i < n; ++i) {
    sizes.push_back(1);
    parts.push_back(ptIndex);
    xs.push_back(lng[i]);
    ys.push_back(lat[i]);
    ptIndex += 1;
  }

  const convertToUTM = false;
  const pc = new wasm.PointCollection(xs, ys, parts, sizes, convertToUTM);
  return pc;
}

/**
 * Get GeometryCollection from SpatialJoinInput
 * start/end are only for parallel spatial join that each webworker use
 * a subset of lat/lng data in spatial join
 */
export function getGeometryCollection(
  input: GeometryInput,
  wasm: CustomEmbindModule,
  start?: number,
  end?: number
): GeometryCollectionType {
  if (input.features && input.features.length > 0) {
    // create GeometryCollection from GeoJSON
    const geomType = input.features[0].geometry.type;

    if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
      return getPolygonCollection(input.features, wasm);
    } else if (geomType === 'LineString' || geomType === 'MultiLineString') {
      return getLineCollection(input.features, wasm);
    } else if (geomType === 'Point' || geomType === 'MultiPoint') {
      return getPointCollection(input.features, wasm);
    }
  } else if (input.latitudes && input.longitudes) {
    // create PointCollection from lat/lng
    return getPointCollectionFromLatLng(input.latitudes, input.longitudes, wasm, start, end);
  }
  return null;
}

// eslint-disable-next-line max-statements
export function getGeojsonPolygon(poly: GeoDaPolygon): Feature {
  // for data structure of GeoDaPolygon, please see src/spatial_features.h in geoda repo
  const xs = poly.getX();
  const ys = poly.getY();
  const parts = poly.getParts();
  const holes = poly.getHoles();

  const numPoints = xs.size();
  const numParts = parts.size();

  let numExtRings = 0;
  for (let i = 0; i < numParts; ++i) {
    if (holes.get(i) === 0) numExtRings += 1;
  }

  const isMultiPolygon = numExtRings > 1;

  if (isMultiPolygon) {
    // [[extRing, hole, hole], [extRing, hole]]
    const multiPoly = Array(numExtRings);
    let polyIndex = -1;
    for (let i = 0; i < numParts; ++i) {
      if (holes.get(i) === 0) {
        // extRing
        polyIndex += 1;
        multiPoly[polyIndex] = [];
      }
      const ring: number[][] = [];
      const start = parts.get(i);
      const end = i === numParts - 1 ? numPoints : parts.get(i + 1);
      for (let j = start; j < end; ++j) {
        ring.push([xs.get(j), ys.get(j)]);
      }
      multiPoly[polyIndex].push(ring);
    }
    return {
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: multiPoly
      },
      properties: {}
    };
  } else {
    // [extRing, hole, hole]
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
    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates
      },
      properties: {}
    };
  }
}
