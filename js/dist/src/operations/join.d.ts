import { CustomEmbindModule } from '../../wasm';
import { GeometryInput } from '../features/geometry';
export declare enum SpatialJoinType {
    INTERSECTS = "INTERSECTS",
    WITHIN = "WITHIN",
    TOUCHES = "TOUCHES",
    OVERLAPS = "OVERLAPS",
    CROSSES = "CROSSES",
    EQUALS = "EQUALS"
}
/**
 * The spatial join result is a 2d array, which represents the join relationship
 * between left and right table. For example: [[1,3], [0], [2, 4]] means
 * 0th left item joins with right items [1, 3]
 * 1st left item joins with right item [0]
 * 2nd left item joins with right items [2, 4]
 */
export type SpatialJoinResult = number[][];
export declare function spatialJoin(source: GeometryInput, join: GeometryInput, spatialJoinOperation: SpatialJoinType): Promise<SpatialJoinResult | null>;
export declare function runSpatialJoin(source: GeometryInput, join: GeometryInput, spatialJoinOperation: SpatialJoinType, wasmInstance: CustomEmbindModule, start?: number, end?: number): SpatialJoinResult | null;
