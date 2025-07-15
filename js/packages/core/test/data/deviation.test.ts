// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { deviationFromMean } from '../../src/data/deviation';
import { isValidNumber } from '../../src/utils/validation';
import { expectArraysNearEqual } from '../utils';

describe('Deviation Tests', () => {
  describe('isValidNumber', () => {
    test('should return true for valid finite numbers', () => {
      expect(isValidNumber(5)).toBe(true);
      expect(isValidNumber(-3.14)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
    });

    test('should return false for invalid values', () => {
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber(-Infinity)).toBe(false);
      expect(isValidNumber(null)).toBe(false);
      expect(isValidNumber(undefined)).toBe(false);
      expect(isValidNumber('5')).toBe(false);
      expect(isValidNumber({})).toBe(false);
    });
  });

  describe('deviationFromMean', () => {
    test('should calculate basic deviation from mean', async () => {
      const data = [1, 2, 3, 4, 5];
      const result = await deviationFromMean(data);

      // Mean is 3.0, so deviations should be [-2, -1, 0, 1, 2]
      const expected = [-2, -1, 0, 1, 2];
      expectArraysNearEqual(expected, result);
    });

    test('should work with Float32Array input', async () => {
      const data = new Float32Array([1, 2, 3, 4, 5]);
      const result = await deviationFromMean(data);

      const expected = [-2, -1, 0, 1, 2];
      expectArraysNearEqual(expected, result);
    });

    test('should handle single element', async () => {
      const data = [5];
      const result = await deviationFromMean(data);

      // Single element should become 0 (deviation from itself)
      expect(result).toEqual([0]);
    });

    test('should handle negative numbers', async () => {
      const data = [-3, -1, 1, 3];
      const result = await deviationFromMean(data);

      // Mean is 0.0, so deviations should be [-3, -1, 1, 3]
      const expected = [-3, -1, 1, 3];
      expectArraysNearEqual(expected, result);
    });

    test('should handle floating point precision', async () => {
      const data = [0.1, 0.2, 0.3];
      const result = await deviationFromMean(data);

      // Mean is 0.2, so deviations should be [-0.1, 0.0, 0.1]
      const expected = [-0.1, 0.0, 0.1];
      expectArraysNearEqual(expected, result);
    });

    test('should skip NaN values in calculation but preserve them in result', async () => {
      const data = [1, NaN, 3];
      const result = await deviationFromMean(data);

      // Mean of 1 and 3 is 2.0, so deviations should be [-1, NaN, 1]
      expect(result[0]).toBeCloseTo(-1);
      expect(isNaN(result[1])).toBe(true);
      expect(result[2]).toBeCloseTo(1);
    });

    test('should skip Infinity values in calculation but preserve them in result', async () => {
      const data = [1, Infinity, 3];
      const result = await deviationFromMean(data);

      // Mean of 1 and 3 is 2.0, so deviations should be [-1, Infinity, 1]
      expect(result[0]).toBeCloseTo(-1);
      expect(result[1]).toBe(Infinity);
      expect(result[2]).toBeCloseTo(1);
    });

    test('should skip -Infinity values in calculation but preserve them in result', async () => {
      const data = [1, -Infinity, 3];
      const result = await deviationFromMean(data);

      // Mean of 1 and 3 is 2.0, so deviations should be [-1, -Infinity, 1]
      expect(result[0]).toBeCloseTo(-1);
      expect(result[1]).toBe(-Infinity);
      expect(result[2]).toBeCloseTo(1);
    });

    test('should handle empty array', async () => {
      const data: number[] = [];
      const result = await deviationFromMean(data);

      expect(result).toEqual([]);
    });

    test('should handle array with all invalid values', async () => {
      const data = [NaN, Infinity, -Infinity];
      const result = await deviationFromMean(data);

      // All values should remain unchanged
      expect(isNaN(result[0])).toBe(true);
      expect(result[1]).toBe(Infinity);
      expect(result[2]).toBe(-Infinity);
    });

    test('should handle mixed valid and invalid values', async () => {
      const data = [1, NaN, 2, Infinity, 3, -Infinity, 4];
      const result = await deviationFromMean(data);

      // Valid values are [1, 2, 3, 4], mean = 2.5
      // Expected deviations: [-1.5, NaN, -0.5, Infinity, 0.5, -Infinity, 1.5]
      expect(result[0]).toBeCloseTo(-1.5);
      expect(isNaN(result[1])).toBe(true);
      expect(result[2]).toBeCloseTo(-0.5);
      expect(result[3]).toBe(Infinity);
      expect(result[4]).toBeCloseTo(0.5);
      expect(result[5]).toBe(-Infinity);
      expect(result[6]).toBeCloseTo(1.5);
    });

    test('should handle large dataset', async () => {
      const size = 1000;
      const data = Array.from({ length: size }, (_, i) => i);
      const result = await deviationFromMean(data);

      // Mean should be 499.5
      expect(result[0]).toBeCloseTo(-499.5);
      expect(result[size - 1]).toBeCloseTo(499.5);

      // Sum of deviations should be approximately zero
      const sum = result.reduce((acc, val) => acc + val, 0);
      expect(Math.abs(sum)).toBeLessThan(1e-6);
    });

    test('should handle identical values', async () => {
      const data = [5, 5, 5, 5];
      const result = await deviationFromMean(data);

      // All deviations should be 0
      expect(result).toEqual([0, 0, 0, 0]);
    });

    test('should handle very small numbers', async () => {
      const data = [0.00001, 0.00002, 0.00003];
      const result = await deviationFromMean(data);

      // Mean is 0.00002, so deviations should be [-0.00001, 0, 0.00001]
      expectArraysNearEqual([-0.00001, 0, 0.00001], result);
    });

    test('should handle very large numbers', async () => {
      const data = [1e10, 2e10, 3e10];
      const result = await deviationFromMean(data);

      // Mean is 2e10, so deviations should be [-1e10, 0, 1e10]
      expectArraysNearEqual([-1e10, 0, 1e10], result);
    });

    test('should handle alternating pattern with invalid values', async () => {
      const data = [1, NaN, 2, Infinity, 3, -Infinity];
      const result = await deviationFromMean(data);

      // Valid values are [1, 2, 3], mean = 2
      // Expected: [-1, NaN, 0, Infinity, 1, -Infinity]
      expect(result[0]).toBeCloseTo(-1);
      expect(isNaN(result[1])).toBe(true);
      expect(result[2]).toBeCloseTo(0);
      expect(result[3]).toBe(Infinity);
      expect(result[4]).toBeCloseTo(1);
      expect(result[5]).toBe(-Infinity);
    });
  });
});
