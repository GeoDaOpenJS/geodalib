import {VectorDouble, VectorInt, VectorString} from '../wasm';

export const earthRadius = 6371008.8;
const mileToMeters = 1609.344;

// for lat and lng, we use the great circle distance or arc distance
// in the unit of mile or kilometer (KM)
export enum DistanceUnit {
  Mile = 'Mile',
  KM = 'KM'
}

/**
 * Calculate the distance between two points on the earth in the unit of degree
 * @param distance The distance in the unit of mile or kilometer (KM)
 * @param unit The unit of the distance, Mile or KM
 * @returns The distance in the unit of degree
 */
export function lengthToDegrees(distance: number, unit: DistanceUnit): number {
  // length to radians
  const factor = unit === DistanceUnit.KM ? earthRadius / 1000 : earthRadius / mileToMeters;
  const radians = distance / factor;
  // radians to degrees
  const degrees = radians % (2 * Math.PI);
  return degrees;
}

/**
 * Calculate the distance between two points on the earth in the unit of meters
 * @param distance The distance in the unit of mile or kilometer (KM)
 * @param unit The unit of the distance, Mile or KM
 * @returns The distance in the unit of meters
 */
export function lengthToMeters(distance: number, unit: DistanceUnit): number {
  return unit === DistanceUnit.Mile ? distance * mileToMeters : distance * 1000;
}

/**
 * Convert the std::vector<double> data to number[]
 * @param data The std::vector<double> data
 * @returns The values in number[] format.
 */
export function vecDoubleToNumber(data: VectorDouble): number[] {
  const result: number[] = [];

  const n = data.size();
  for (let i = 0; i < n; ++i) {
    result.push(data.get(i));
  }

  return result;
}

/**
 * Convert the std::vector<int> data to number[]
 * @param data The std::vector<int> data
 * @returns The values in number[] format.
 */
export function vecIntToNumber(data: VectorInt): number[] {
  const result: number[] = [];

  const n = data.size();
  for (let i = 0; i < n; ++i) {
    result.push(data.get(i));
  }

  return result;
}

/**
 * Convert the std::vector<string> data to string[]
 * @param data The std::vector<string> data
 * @returns The values in string[] format.
 */
export function vecStringToArray(data: VectorString): string[] {
  const result: string[] = [];

  const n = data.size();
  for (let i = 0; i < n; ++i) {
    result.push(data.get(i));
  }

  return result;
}
