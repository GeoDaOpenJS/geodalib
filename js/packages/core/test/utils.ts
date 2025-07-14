// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

/**
 * Reduces the precision of a number to the given number of decimal places.
 *
 */
export function reducePrecision(o: unknown, precision = 14): unknown {
  if (!o) return o;
  if (Array.isArray(o)) {
    return o.map(el => reducePrecision(el, precision));
  }
  if (typeof o === 'object') {
    return Object.keys(o).reduce(
      (map, k) => {
        const obj = o as Record<string, unknown>;
        map[k] = reducePrecision(obj[k], precision);
        return map;
      },
      {} as Record<string, unknown>
    );
  }
  if (typeof o === 'number') {
    return Number(o.toFixed(precision));
  }
  return o;
}

/**
 * Helper function to compare arrays with tolerance for floating point precision.
 * This function handles NaN, Infinity, and finite number comparisons.
 */
export function expectArraysNearEqual(expected: number[], actual: number[], tolerance = 1e-9) {
  expect(actual.length).toBe(expected.length);
  for (let i = 0; i < expected.length; i++) {
    if (isNaN(expected[i])) {
      expect(isNaN(actual[i])).toBe(true);
    } else if (!isFinite(expected[i])) {
      expect(actual[i]).toBe(expected[i]);
    } else {
      expect(Math.abs(actual[i] - expected[i])).toBeLessThan(tolerance);
    }
  }
}
