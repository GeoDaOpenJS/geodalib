import { VectorDouble, VectorInt, VectorString } from '../wasm';
export declare const earthRadius = 6371008.8;
export declare enum DistanceUnit {
    Mile = "Mile",
    KM = "KM"
}
/**
 * Calculate the distance between two points on the earth in the unit of degree
 * @param distance The distance in the unit of mile or kilometer (KM)
 * @param unit The unit of the distance, Mile or KM
 * @returns The distance in the unit of degree
 */
export declare function lengthToDegrees(distance: number, unit: DistanceUnit): number;
/**
 * Calculate the distance between two points on the earth in the unit of meters
 * @param distance The distance in the unit of mile or kilometer (KM)
 * @param unit The unit of the distance, Mile or KM
 * @returns The distance in the unit of meters
 */
export declare function lengthToMeters(distance: number, unit: DistanceUnit): number;
/**
 * Convert the std::vector<double> data to number[]
 * @param data The std::vector<double> data
 * @returns The values in number[] format.
 */
export declare function vecDoubleToNumber(data: VectorDouble): number[];
/**
 * Convert the std::vector<int> data to number[]
 * @param data The std::vector<int> data
 * @returns The values in number[] format.
 */
export declare function vecIntToNumber(data: VectorInt): number[];
/**
 * Convert the std::vector<string> data to string[]
 * @param data The std::vector<string> data
 * @returns The values in string[] format.
 */
export declare function vecStringToArray(data: VectorString): string[];
