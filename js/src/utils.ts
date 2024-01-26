import {DistanceUnit} from './weights/distance-based-neighbors';

export const earthRadius = 6371008.8;
const mileToMeters = 1609.344;

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
