import {BinaryFeatureCollection} from '@loaders.gl/schema';

import {
  PolygonCollection,
  PointCollection,
  LineCollection,
  VectorDouble,
  VectorUInt,
  GeometryCollection
} from '../../wasm';

export type GeoArrowEncoding =
  | 'geoarrow.multipolygon'
  | 'geoarrow.polygon'
  | 'geoarrow.multilinestring'
  | 'geoarrow.linestring'
  | 'geoarrow.multipoint'
  | 'geoarrow.point'
  | 'geoarrow.wkb'
  | 'geoarrow.wkt';

/**
 * create geoda.GeometryCollection from dataToFeatures[] in GeojsonLayer
 *
 */
export function getGeoDaGeometriesFromArrow(
  geometryEncoding: GeoArrowEncoding,
  binaryFeaturesChunks: BinaryFeatureCollection[]
): GeometryCollection | null {
  if (geometryEncoding === 'geoarrow.multipolygon' || geometryEncoding === 'geoarrow.polygon') {
    const polygonsArray = binaryFeaturesChunks.map(chunk => chunk.polygons);
    return createGeoDaPolygonsFromBinaryFeatures(polygonsArray);
  } else if (
    geometryEncoding === 'geoarrow.multilinestring' ||
    geometryEncoding === 'geoarrow.linestring'
  ) {
    const linesArray = binaryFeaturesChunks.map(chunk => chunk.lines);
    return createGeoDaLinesFromBinaryFeatures(linesArray);
  } else if (geometryEncoding === 'geoarrow.multipoint' || geometryEncoding === 'geoarrow.point') {
    const pointsArray = binaryFeaturesChunks.map(chunk => chunk.points);
    return createGeoDaPointsFromBinaryFeatures(pointsArray);
  }
  return null;
}

/**
 * create geoda pointCollection from dataToFeatures[] in GeojsonLayer
 * @param pointsArray BinaryFeatureCollection['points'] An array of binary point features from chunks of geoarrow
 * @returns pointCollection | null
 */
function createGeoDaPointsFromBinaryFeatures(
  pointsArray: Array<BinaryFeatureCollection['points']>
): PointCollection | null {
  if (!pointsArray || pointsArray.length === 0) return null;

  // create PointCollection from binaryFeatures
  const xs = new VectorDouble();
  const ys = new VectorDouble();
  const parts = new VectorUInt();
  const sizes = new VectorUInt();

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
        // eslint-disable-next-line max-depth
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
    }
  }
  const pointCollection = new PointCollection(xs, ys, parts, sizes, false);
  return pointCollection;
}

/**
 * create geoda lineCollection from dataToFeatures[] in GeojsonLayer
 * @param linesArray BinaryFeatureCollection['lines'][] An array of binary line features from chunks of geoarrow
 * @returns LineCollection | null
 */
function createGeoDaLinesFromBinaryFeatures(linesArray: Array<BinaryFeatureCollection['lines']>) {
  if (!linesArray || linesArray.length === 0) return null;

  // create LineCollection from array of binaryFeatures
  const xs = new VectorDouble();
  const ys = new VectorDouble();
  const parts = new VectorUInt();
  const sizes = new VectorUInt();
  const convertToUTM = false;

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
      // parts is geomOffsets
      for (let i = 0; i < geomOffsets.length; i++) {
        parts.push_back(geomOffsets[i]);
      }
      // get sizes from parts
      for (let i = 1; i < geomOffsets.length; i++) {
        sizes.push_back(geomOffsets[i] - geomOffsets[i - 1]);
      }
    }
  }

  const lineCollection = new LineCollection(xs, ys, parts, sizes, convertToUTM);
  return lineCollection;
}

/**
 * create geoda polygonCollection from dataToFeatures[] in GeojsonLayer
 * @param polygonsArray BinaryFeatureCollection['polygons'][] An array of binary polygon features from chunks of geoarrow
 * @returns PolygonCollection | null
 */
// eslint-disable-next-line max-statements
function createGeoDaPolygonsFromBinaryFeatures(
  polygonsArray: Array<BinaryFeatureCollection['polygons']>
): PolygonCollection | null {
  if (!polygonsArray || polygonsArray.length === 0) return null;

  // create PolygonCollection from array of binaryFeatures
  const xs = new VectorDouble();
  const ys = new VectorDouble();
  const parts = new VectorUInt();
  const holes = new VectorUInt();
  const sizes = new VectorUInt();
  const fixPolygon = true;
  const convertToUTM = false;

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
      for (let i = 0; i < polygonIndices.length - 1; i++) {
        const startIdx = polygonIndices[i];
        const endIdx = polygonIndices[i + 1];
        // eslint-disable-next-line max-depth
        while (primitivePolygonIndices[primitiveIndex] < endIdx) {
          // parts: start index of each part
          // holes: true if the part is a hole
          // eslint-disable-next-line max-depth
          if (primitivePolygonIndices[primitiveIndex] > startIdx) {
            // holeIndices.push(primitivePolygonIndices[primitiveIndex] - startIdx);
            holes.push_back(1);
          } else {
            holes.push_back(0);
          }
          parts.push_back(primitivePolygonIndices[primitiveIndex]);
          primitiveIndex++;
        }
        // size: how many parts in each feature: primitiveIndex = number of parts
        sizes.push_back(primitiveIndex);
      }
    }
  }

  const polygonCollection = new PolygonCollection(
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
