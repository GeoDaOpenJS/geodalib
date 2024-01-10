import {VectorDouble} from '../wasm';

export const earthRadius = 6371008.8;
const mileToMeters = 1609.344;

// for lat and lng, we use the great circle distance or arc distance
// in the unit of mile or kilometer (KM)
export enum DistanceUnit {
  Mile = 'Mile',
  KM = 'KM'
}

export function lengthToDegrees(distance: number, unit: DistanceUnit): number {
  // length to radians
  const factor = unit === DistanceUnit.KM ? earthRadius / 1000 : earthRadius / mileToMeters;
  const radians = distance / factor;
  // radians to degrees
  const degrees = radians % (2 * Math.PI);
  return degrees;
}

export function lengthToMeters(distance: number, unit: DistanceUnit): number {
  return unit === DistanceUnit.Mile ? distance * mileToMeters : distance * 1000;
}

export function vecDoubleToNumber(data: VectorDouble): number[] {
  const result: number[] = [];

  const n = data.size();
  for (let i = 0; i < n; ++i) {
    result.push(data.get(i));
  }

  return result;
}
