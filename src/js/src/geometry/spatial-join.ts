import {BinaryFeatureCollection} from '@loaders.gl/schema';

import {BinaryGeometryType, getGeometryCollectionFromBinaryGeometries} from './binary-geometry';
import {initWASM} from '../init';

export type SpatialJoinProps = {
  left: BinaryFeatureCollection[];
  leftGeometryType: BinaryGeometryType;
  right: BinaryFeatureCollection[];
  rightGeometryType: BinaryGeometryType;
};

export async function spatialJoin({
  left,
  leftGeometryType,
  right,
  rightGeometryType
}: SpatialJoinProps): Promise<number[][]> {
  if (!left || left.length === 0 || !right || right.length === 0) {
    return [];
  }

  const result: number[][] = [];

  const wasmInstance = await initWASM();
  const leftGeomCollection = await getGeometryCollectionFromBinaryGeometries(
    leftGeometryType,
    left,
    wasmInstance
  );
  const rightGeomCollection = await getGeometryCollectionFromBinaryGeometries(
    rightGeometryType,
    right,
    wasmInstance
  );

  if (leftGeomCollection && rightGeomCollection) {
    const joinIndexes = wasmInstance.spatialJoin(leftGeomCollection, rightGeomCollection);
    for (let i = 0; i < joinIndexes.size(); i++) {
      const joinIndex = joinIndexes.get(i);
      const resultRow: number[] = [];
      for (let j = 0; j < joinIndex.size(); j++) {
        resultRow.push(joinIndex.get(j));
      }
      result.push(resultRow);
    }
  }

  return result;
}
