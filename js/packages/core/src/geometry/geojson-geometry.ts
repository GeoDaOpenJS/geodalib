// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { Feature, Geometry, Position } from 'geojson';

import {
  GeoDaModule,
  GeometryCollection,
  PolygonCollection,
  PointCollection,
  LineCollection,
} from '@geoda/common';

/**
 * The type of the input for getGeometryCollectionFromGeoJson
 * @param features - the features to convert
 * @param latitudes - the latitudes
 * @param longitudes - the longitudes
 * @param index - the index
 */
export type GeometryInput = {
  features: Feature<Geometry>[] | null;
  latitudes?: Float64Array | null;
  longitudes?: Float64Array | null;
  index?: number[] | null;
};

/**
 * The type of the props for getGeometryCollectionFromGeoJson
 */
export type GetGeometryCollectionFromGeoJsonFeaturesProps = {
  /**
   * The features to convert
   */
  features: Feature[];
  /**
   * The wasm module
   */
  wasm: GeoDaModule;
  /**
   * Whether to fix the polygon
   */
  fixPolygon?: boolean;
  /**
   * Whether to convert to UTM
   */
  convertToUTM?: boolean;
};

/**
 * Get GeometryCollection from GeoJson featurers
 * @param props - the props for getGeometryCollectionFromGeoJson see {@link GetGeometryCollectionFromGeoJsonFeaturesProps}
 * @returns GeometryCollection - the geometry collection see src/spatial_features.h
 */
export function getGeometryCollectionFromGeoJsonFeatures({
  features,
  wasm,
  fixPolygon,
  convertToUTM,
}: GetGeometryCollectionFromGeoJsonFeaturesProps): GeometryCollection {
  if (!features || features.length === 0) {
    throw new Error('No features to convert');
  }

  // create GeometryCollection from GeoJSON
  const geomType = features[0].geometry.type;

  switch (geomType) {
    case 'Polygon':
    case 'MultiPolygon':
      return getPolygonCollection({ features, wasm, fixPolygon, convertToUTM });
    case 'LineString':
    case 'MultiLineString':
      return getLineCollection({ features, wasm, convertToUTM });
    case 'Point':
    case 'MultiPoint':
      return getPointCollection({ features, wasm, convertToUTM });
    default:
      throw new Error('Unsupported GeoJSON geometry type');
  }
}

/**
 * The type of the props for GetPolygonCollection
 * @param features - the features to convert
 * @param wasm - the wasm module
 * @param fixPolygon - whether to fix the polygon
 * @param convertToUTM - whether to convert to UTM
 */
export type GetPolygonCollectionProps = {
  features: Feature[];
  wasm: GeoDaModule;
  fixPolygon?: boolean;
  convertToUTM?: boolean;
};

/**
 * Convert GeoJSON features (MultiPolygon and Polygon) to PolygonCollection
 * @param props - the props for GetPolygonCollection see {@link GetPolygonCollectionProps}
 * @returns PolygonCollection - the polygon collection see src/spatial_features.h
 */
export function getPolygonCollection({
  features,
  wasm,
  fixPolygon = true,
  convertToUTM,
}: GetPolygonCollectionProps): PolygonCollection {
  let ptIndex = 0;
  const xs = new wasm.VectorDouble();
  const ys = new wasm.VectorDouble();
  const parts = new wasm.VectorUInt();
  const holes = new wasm.VectorUInt();
  const sizes = new wasm.VectorUInt();

  /**
   * Process a polygon ring
   * @param polygon - the polygon to process
   * @param numParts - the number of parts in the polygon
   * @returns the number of parts in the polygon
   */
  function processPolygonRing(polygon: Position[][], numParts: number): number {
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
        numParts = processPolygonRing(poly, numParts);
      }
    } else if (feat.geometry.type === 'Polygon') {
      numParts = processPolygonRing(feat.geometry.coordinates, numParts);
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

/**
 * The type of the props for GetLineCollection
 * @param features - the features to convert
 * @param wasm - the wasm module
 * @param convertToUTM - whether to convert to UTM
 */
export type GetLineCollectionProps = {
  features: Feature[];
  wasm: GeoDaModule;
  convertToUTM?: boolean;
};

/**
 * Convert GeoJSON features (MultiLineString and LineString) to LineCollection
 * @param props - the props for GetLineCollection see {@link GetLineCollectionProps}
 * @returns LineCollection - the line collection see src/spatial_features.h
 */
export function getLineCollection({
  features,
  wasm,
  convertToUTM,
}: GetLineCollectionProps): LineCollection {
  let ptIndex = 0;
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

/**
 * The type of the props for GetPointCollection
 * @param features - the features to convert
 * @param wasm - the wasm module
 * @param convertToUTM - whether to convert to UTM
 */
export type GetPointCollectionProps = {
  features: Feature[];
  wasm: GeoDaModule;
  convertToUTM?: boolean;
};

/**
 * Convert GeoJSON features (MultiPoint and Point) to PointCollection
 * @param props - the props for GetPointCollection see {@link GetPointCollectionProps}
 * @returns PointCollection - the point collection see src/spatial_features.h
 */
export function getPointCollection({
  features,
  wasm,
  convertToUTM,
}: GetPointCollectionProps): PointCollection {
  let ptIndex = 0;
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
 * The type of the props for GetPointCollectionFromLatLng
 * @param lat - the latitudes
 * @param lng - the longitudes
 * @param wasm - the wasm module
 * @param start - the start index
 * @param end - the end index
 */
export type GetPointCollectionFromLatLngProps = {
  lat: number[] | Float64Array;
  lng: number[] | Float64Array;
  wasm: GeoDaModule;
  start?: number;
  end?: number;
};

/**
 * Convert from lat/lng pairs to PointCollection
 * @param props - the props for GetPointCollectionFromLatLng see {@link GetPointCollectionFromLatLngProps}
 * @returns PointCollection - the point collection see src/spatial_features.h
 */
export function getPointCollectionFromLatLng({
  lat,
  lng,
  wasm,
  start,
  end,
}: GetPointCollectionFromLatLngProps): PointCollection {
  let ptIndex = 0;
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
