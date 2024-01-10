import { VectorDouble } from '../wasm';
export declare const earthRadius = 6371008.8;
export declare enum DistanceUnit {
    Mile = "Mile",
    KM = "KM"
}
export declare function lengthToDegrees(distance: number, unit: DistanceUnit): number;
export declare function lengthToMeters(distance: number, unit: DistanceUnit): number;
export declare function vecDoubleToNumber(data: VectorDouble): number[];
