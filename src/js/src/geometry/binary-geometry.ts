import {BinaryFeatureCollection} from '@loaders.gl/schema';

import {
  GeoDaModule,
  PolygonCollection,
  PointCollection,
  LineCollection,
  GeometryCollection
} from '../../wasm';

/**
 * BinaryGeometryType, it is the same as DeckGlGeoTypes in kepler.gl/layers
 * @typedef {Object} BinaryGeometryType
 */
export type BinaryGeometryType = {
  point: boolean;
  line: boolean;
  polygon: boolean;
};

/**
 * create geoda.GeometryCollection from dataToFeatures[] in GeojsonLayer
 *
 */
export async function getGeometryCollectionFromBinaryGeometries(
  geometryType: BinaryGeometryType,
  binaryFeaturesChunks: BinaryFeatureCollection[],
  wasm: GeoDaModule
): Promise<GeometryCollection> {
  if (!wasm) {
    throw new Error('WASM module is not initialized');
  }

  if (geometryType.point) {
    const pointsArray = binaryFeaturesChunks.map(chunk => chunk.points);
    return createPointCollectionFromBinaryFeatures(pointsArray, wasm);
  } else if (geometryType.line) {
    const linesArray = binaryFeaturesChunks.map(chunk => chunk.lines);
    return createLineCollectionFromBinaryFeatures(linesArray, wasm);
  } else if (geometryType.polygon) {
    const polygonsArray = binaryFeaturesChunks.map(chunk => chunk.polygons);
    return createPolygonCollectionFromBinaryFeatures(polygonsArray, wasm);
  }
  throw new Error('getGeometryCollectionFromBinaryGeometries: Binary geometry type is unknown.');
}

/**
 * create geoda pointCollection from dataToFeatures[] in GeojsonLayer
 * @param pointsArray BinaryFeatureCollection['points'] An array of binary point features from chunks of geoarrow
 * @returns pointCollection | null
 */
export function createPointCollectionFromBinaryFeatures(
  pointsArray: Array<BinaryFeatureCollection['points']>,
  wasm: GeoDaModule
): PointCollection {
  // create PointCollection from binaryFeatures
  const xs = new wasm.VectorDouble();
  const ys = new wasm.VectorDouble();
  const parts = new wasm.VectorUInt();
  const sizes = new wasm.VectorUInt();
  const convertToUTM = false;

  for (let chunkIndex = 0; chunkIndex < pointsArray.length; chunkIndex++) {
    const points = pointsArray[chunkIndex];
    if (points) {
      const coords = points.positions.value;
      for (let i = 0; i < coords.length; i += 2) {
        xs.push_back(coords[i]);
        ys.push_back(coords[i + 1]);
      }
      // get index as the start of each part when points.featureIds.value[i] changed
      let index = 0;
      for (let i = 0; i < points.featureIds.value.length; i++) {
        if (i === 0) {
          parts.push_back(index);
        } else if (points.featureIds.value[i] !== points.featureIds.value[i - 1]) {
          parts.push_back(index);
        }
        index++;
      }
      // get sizes from parts
      for (let i = 1; i < parts.size(); i++) {
        sizes.push_back(parts.get(i) - parts.get(i - 1));
      }
      // add the last size
      if (parts.size() > 0) {
        sizes.push_back(index - parts.get(parts.size() - 1));
      }
    }
  }
  const pointCollection = new wasm.PointCollection(xs, ys, parts, sizes, convertToUTM);
  return pointCollection;
}

/**
 * create geoda lineCollection from dataToFeatures[] in GeojsonLayer
 * @param linesArray BinaryFeatureCollection['lines'][] An array of binary line features from chunks of geoarrow
 * @returns LineCollection | null
 */
export function createLineCollectionFromBinaryFeatures(
  linesArray: Array<BinaryFeatureCollection['lines']>,
  wasm: GeoDaModule
): LineCollection {
  // create LineCollection from array of binaryFeatures
  const xs = new wasm.VectorDouble();
  const ys = new wasm.VectorDouble();
  const parts = new wasm.VectorUInt();
  const sizes = new wasm.VectorUInt();
  const convertToUTM = false;

  let lastStartPointIndex = 0;
  for (let lineIndex = 0; lineIndex < linesArray.length; lineIndex++) {
    const lines = linesArray[lineIndex];
    if (lines) {
      const coords = lines.positions.value;
      const geomOffsets = lines.pathIndices.value;

      // get xs, ys, parts, sizes
      for (let i = 0; i < coords.length; i += 2) {
        xs.push_back(coords[i]);
        ys.push_back(coords[i + 1]);
      }
      // parts is geomOffsets: store the point index of each part
      // get sizes from featureIds: store number of parts for each line/multiline
      let numParts = 0;
      for (let i = 0; i < geomOffsets.length - 1; i++) {
        const startPointIndex = geomOffsets[i];
        parts.push_back(startPointIndex + lastStartPointIndex);
        if (
          i > 0 &&
          lines.featureIds.value[startPointIndex] !== lines.featureIds.value[startPointIndex - 1]
        ) {
          sizes.push_back(numParts);
          numParts = 0;
        }
        numParts += 1;
      }
      // add the last size
      sizes.push_back(numParts);
      // update lastStartPointIndex
      lastStartPointIndex += geomOffsets[geomOffsets.length - 1];
    }
  }

  const lineCollection = new wasm.LineCollection(xs, ys, parts, sizes, convertToUTM);
  return lineCollection;
}

/**
 * create geoda polygonCollection from dataToFeatures[] in GeojsonLayer
 * @param polygonsArray BinaryFeatureCollection['polygons'][] An array of binary polygon features from chunks of geoarrow
 * @returns PolygonCollection | null
 */
export function createPolygonCollectionFromBinaryFeatures(
  polygonsArray: Array<BinaryFeatureCollection['polygons']>,
  wasm: GeoDaModule
): PolygonCollection {
  // create PolygonCollection from array of binaryFeatures
  const xs = new wasm.VectorDouble();
  const ys = new wasm.VectorDouble();
  const parts = new wasm.VectorUInt();
  const holes = new wasm.VectorUInt();
  const sizes = new wasm.VectorUInt();
  const fixPolygon = true;
  const convertToUTM = false;

  let lastPrimitiveIndex = 0;
  for (let chunkIndex = 0; chunkIndex < polygonsArray.length; chunkIndex++) {
    const polygons = polygonsArray[chunkIndex];
    if (polygons) {
      const coords = polygons.positions.value;
      const polygonIndices = polygons.polygonIndices.value;
      const primitivePolygonIndices = polygons.primitivePolygonIndices.value;

      // get xs, ys, parts, sizes
      for (let i = 0; i < coords.length; i += 2) {
        xs.push_back(coords[i]);
        ys.push_back(coords[i + 1]);
      }
      let primitiveIndex = 0;
      let numParts = 0;
      for (let i = 0; i < polygonIndices.length - 1; i++) {
        const startIdx = polygonIndices[i];
        const endIdx = polygonIndices[i + 1];
        while (primitivePolygonIndices[primitiveIndex] < endIdx) {
          // parts: start index of each part
          // holes: true if the part is a hole
          if (primitivePolygonIndices[primitiveIndex] > startIdx) {
            // holeIndices.push(primitivePolygonIndices[primitiveIndex] - startIdx);
            holes.push_back(1);
          } else {
            holes.push_back(0);
          }
          parts.push_back(primitivePolygonIndices[primitiveIndex] + lastPrimitiveIndex);
          primitiveIndex++;
          numParts += 1;
        }
        if (polygons.featureIds.value[endIdx] !== polygons.featureIds.value[endIdx - 1]) {
          sizes.push_back(numParts);
          numParts = 0;
        }
      }
      lastPrimitiveIndex += primitivePolygonIndices[primitivePolygonIndices.length - 1];
    }
  }

  const polygonCollection = new wasm.PolygonCollection(
    xs,
    ys,
    parts,
    holes,
    sizes,
    fixPolygon,
    convertToUTM
  );
  return polygonCollection;
}
