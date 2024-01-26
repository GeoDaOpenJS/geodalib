import {CustomEmbindModule} from '../../wasm';
import {GeometryInput, getGeometryCollection} from '../features/geometry';
import {initWASM} from '../init';

export enum SpatialJoinType {
  INTERSECTS = 'INTERSECTS',
  WITHIN = 'WITHIN',
  TOUCHES = 'TOUCHES',
  OVERLAPS = 'OVERLAPS',
  CROSSES = 'CROSSES',
  EQUALS = 'EQUALS'
}

/**
 * The spatial join result is a 2d array, which represents the join relationship
 * between left and right table. For example: [[1,3], [0], [2, 4]] means
 * 0th left item joins with right items [1, 3]
 * 1st left item joins with right item [0]
 * 2nd left item joins with right items [2, 4]
 */
export type SpatialJoinResult = number[][];

export async function spatialJoin(
  source: GeometryInput,
  join: GeometryInput,
  spatialJoinOperation: SpatialJoinType
): Promise<SpatialJoinResult | null> {
  const wasmInstance = await initWASM();

  return runSpatialJoin(source, join, spatialJoinOperation, wasmInstance);
}

// eslint-disable-next-line max-params
export function runSpatialJoin(
  source: GeometryInput,
  join: GeometryInput,
  spatialJoinOperation: SpatialJoinType,
  wasmInstance: CustomEmbindModule,
  start?: number,
  end?: number
): SpatialJoinResult | null {
  const sourceGeometryCollection = getGeometryCollection(source, wasmInstance, start, end);
  const joinGeometryCollection = getGeometryCollection(join, wasmInstance, start, end);
  const spatialJoinOp = wasmInstance.SpatialJoinType[spatialJoinOperation];

  if (sourceGeometryCollection && joinGeometryCollection && spatialJoinOp) {
    const result = wasmInstance.spatialJoin(
      sourceGeometryCollection,
      joinGeometryCollection,
      spatialJoinOp
    );

    // parse result
    const joinRelation: SpatialJoinResult = [];
    for (let i = 0, n = result.size(); i < n; ++i) {
      const rightIndices = result.get(i);
      const relation: number[] = [];
      for (let j = 0, m = rightIndices.size(); j < m; ++j) {
        relation.push(rightIndices.get(j));
      }
      joinRelation.push(relation);
    }

    return joinRelation;
  }
  return null;
}
