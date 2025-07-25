// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { GeoDaModule, GeometryCollection } from '@geoda/common';
import { ArcLayerData, PointLayerData } from './utils';

/**
 * The type of the props for getGeometryCollectionFromGeoJson
 * @param pointLayerData - the point layer data
 * @param wasm - the wasm module
 */
export type GetGeometryCollectionFromPointLayerDataProps = {
  pointLayerData: PointLayerData[];
  wasm: GeoDaModule;
  convertToUTM?: boolean;
};

/**
 * Get PointCollection from PointLayerData: lat/lng pairs
 * @param props - the props for getGeometryCollectionFromPointLayerData see {@link GetGeometryCollectionFromPointLayerDataProps}
 * @returns PointCollection - the point collection see src/spatial_features.h
 */
export function getGeometryCollectionFromPointLayerData({
  pointLayerData,
  wasm,
  convertToUTM,
}: GetGeometryCollectionFromPointLayerDataProps): GeometryCollection {
  if (!pointLayerData || pointLayerData.length === 0) {
    throw new Error('No pointLayerData to convert');
  }

  const xs = new wasm.VectorDouble();
  const ys = new wasm.VectorDouble();
  const parts = new wasm.VectorUInt();
  const sizes = new wasm.VectorUInt();

  for (let i = 0, n = pointLayerData.length; i < n; ++i) {
    const point = pointLayerData[i];
    xs.push_back(point.position[0]);
    ys.push_back(point.position[1]);
    sizes.push_back(1);
    parts.push_back(i);
  }

  const pc = new wasm.PointCollection(xs, ys, parts, sizes, convertToUTM || false);
  return pc;
}

export type GetGeometryCollectionFromArcLayerDataProps = {
  arcLayerData: ArcLayerData[];
  wasm: GeoDaModule;
  convertToUTM?: boolean;
};

/**
 * Get PointCollection from ArcLayerData: lat/lng pairs
 * @param props - the props for getGeometryCollectionFromArcLayerData see {@link GetGeometryCollectionFromArcLayerDataProps}
 * @returns PointCollection - the point collection see src/spatial_features.h
 */
export function getGeometryCollectionFromArcLayerData({
  arcLayerData,
  wasm,
  convertToUTM,
}: GetGeometryCollectionFromArcLayerDataProps): GeometryCollection {
  if (!arcLayerData || arcLayerData.length === 0) {
    throw new Error('No arcLayerData to convert');
  }

  const xs = new wasm.VectorDouble();
  const ys = new wasm.VectorDouble();
  const parts = new wasm.VectorUInt();
  const sizes = new wasm.VectorUInt();

  for (let i = 0, n = arcLayerData.length; i < n; ++i) {
    const arc = arcLayerData[i];
    xs.push_back(arc.sourcePosition[0]);
    ys.push_back(arc.sourcePosition[1]);
    // TODO: figure out how to handle the target position
    // xs.push_back(arc.targetPosition[0]);
    // ys.push_back(arc.targetPosition[1]);
    sizes.push_back(1);
    parts.push_back(i);
  }

  const pc = new wasm.PointCollection(xs, ys, parts, sizes, convertToUTM || false);
  return pc;
}
