// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { rangeStandardize } from '../../src/data/rangeStandardize';
import { isValidNumber } from '../../src/utils/validation';
import { expectArraysNearEqual } from '../utils';

describe('Range Standardize Tests', () => {
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

  describe('rangeStandardize', () => {
    test('should standardize basic range to [0, 1]', async () => {
      const data = [1, 2, 3, 4, 5];
      const result = await rangeStandardize(data);

      // Min = 1, Max = 5, Range = 4
      // Expected: [(1-1)/4, (2-1)/4, (3-1)/4, (4-1)/4, (5-1)/4] = [0, 0.25, 0.5, 0.75, 1]
      const expected = [0, 0.25, 0.5, 0.75, 1];
      expectArraysNearEqual(expected, result);
    });

    test('should work with Float32Array input', async () => {
      const data = new Float32Array([1, 2, 3, 4, 5]);
      const result = await rangeStandardize(data);

      const expected = [0, 0.25, 0.5, 0.75, 1];
      expectArraysNearEqual(expected, result);
    });

    test('should handle single element', async () => {
      const data = [5];
      const result = await rangeStandardize(data);

      // Single element results in range = 0, so WASM sets to 0
      expect(result).toEqual([0]);
    });

    test('should handle two identical elements', async () => {
      const data = [5, 5];
      const result = await rangeStandardize(data);

      expect(result).toEqual([0, 0]);
    });

    test('should handle negative numbers', async () => {
      const data = [-2, -1, 0, 1, 2];
      const result = await rangeStandardize(data);

      // Min = -2, Max = 2, Range = 4
      // Expected: [(-2-(-2))/4, (-1-(-2))/4, (0-(-2))/4, (1-(-2))/4, (2-(-2))/4] = [0, 0.25, 0.5, 0.75, 1]
      const expected = [0, 0.25, 0.5, 0.75, 1];
      expectArraysNearEqual(expected, result);
    });

    test('should handle floating point precision', async () => {
      const data = [0.1, 0.2, 0.3];
      const result = await rangeStandardize(data);

      // Min = 0.1, Max = 0.3, Range = 0.2
      // Expected: [(0.1-0.1)/0.2, (0.2-0.1)/0.2, (0.3-0.1)/0.2] = [0, 0.5, 1]
      const expected = [0, 0.5, 1];
      expectArraysNearEqual(expected, result);
    });

    test('should skip NaN values in calculation but preserve them in result', async () => {
      const data = [1, NaN, 3, 5];
      const result = await rangeStandardize(data);

      // Valid values: [1, 3, 5], Min = 1, Max = 5, Range = 4
      // Expected: [(1-1)/4, NaN, (3-1)/4, (5-1)/4] = [0, NaN, 0.5, 1]
      expect(result[0]).toBeCloseTo(0);
      expect(isNaN(result[1])).toBe(true);
      expect(result[2]).toBeCloseTo(0.5);
      expect(result[3]).toBeCloseTo(1);
    });

    test('should skip Infinity values in calculation but preserve them in result', async () => {
      const data = [1, Infinity, 3, 5];
      const result = await rangeStandardize(data);

      // Valid values: [1, 3, 5], same calculation as above
      expect(result[0]).toBeCloseTo(0);
      expect(result[1]).toBe(Infinity);
      expect(result[2]).toBeCloseTo(0.5);
      expect(result[3]).toBeCloseTo(1);
    });

    test('should skip -Infinity values in calculation but preserve them in result', async () => {
      const data = [1, -Infinity, 3, 5];
      const result = await rangeStandardize(data);

      // Valid values: [1, 3, 5], same calculation as above
      expect(result[0]).toBeCloseTo(0);
      expect(result[1]).toBe(-Infinity);
      expect(result[2]).toBeCloseTo(0.5);
      expect(result[3]).toBeCloseTo(1);
    });

    test('should handle empty array', async () => {
      const data: number[] = [];
      const result = await rangeStandardize(data);

      expect(result).toEqual([]);
    });

    test('should handle array with all invalid values', async () => {
      const data = [NaN, Infinity, -Infinity];
      const result = await rangeStandardize(data);

      // All values should remain unchanged
      expect(isNaN(result[0])).toBe(true);
      expect(result[1]).toBe(Infinity);
      expect(result[2]).toBe(-Infinity);
    });

    test('should handle mixed valid and invalid values', async () => {
      const data = [1, NaN, 2, Infinity, 5, -Infinity, 10];
      const result = await rangeStandardize(data);

      // Valid values are [1, 2, 5, 10], Min = 1, Max = 10, Range = 9
      // Expected: [(1-1)/9, NaN, (2-1)/9, Infinity, (5-1)/9, -Infinity, (10-1)/9]
      //         = [0, NaN, 1/9, Infinity, 4/9, -Infinity, 1]
      expect(result[0]).toBeCloseTo(0);
      expect(isNaN(result[1])).toBe(true);
      expect(result[2]).toBeCloseTo(1 / 9);
      expect(result[3]).toBe(Infinity);
      expect(result[4]).toBeCloseTo(4 / 9);
      expect(result[5]).toBe(-Infinity);
      expect(result[6]).toBeCloseTo(1);
    });

    test('should handle large dataset', async () => {
      const size = 100;
      const data = Array.from({ length: size }, (_, i) => i);
      const result = await rangeStandardize(data);

      // Should have same length and be properly range standardized
      expect(result.length).toBe(size);

      // First element should be 0, last should be 1
      expect(result[0]).toBeCloseTo(0);
      expect(result[size - 1]).toBeCloseTo(1);

      // Check that values are monotonically increasing
      for (let i = 1; i < size; i++) {
        expect(result[i]).toBeGreaterThanOrEqual(result[i - 1]);
      }
    });

    test('should handle identical values', async () => {
      const data = [5, 5, 5, 5];
      const result = await rangeStandardize(data);

      expect(result).toEqual([0, 0, 0, 0]);
    });

    test('should handle very small numbers', async () => {
      const data = [0.00001, 0.00002, 0.00003];
      const result = await rangeStandardize(data);

      // Should be properly range standardized to [0, 1]
      const expected = [0, 0.5, 1];
      expectArraysNearEqual(expected, result);
    });

    test('should handle very large numbers', async () => {
      const data = [1e10, 2e10, 3e10];
      const result = await rangeStandardize(data);

      // Should be properly range standardized to [0, 1]
      const expected = [0, 0.5, 1];
      expectArraysNearEqual(expected, result);
    });

    test('should handle alternating pattern with invalid values', async () => {
      const data = [1, NaN, 3, Infinity, 5, -Infinity];
      const result = await rangeStandardize(data);

      // Valid values are [1, 3, 5], Min = 1, Max = 5, Range = 4
      // Expected: [(1-1)/4, NaN, (3-1)/4, Infinity, (5-1)/4, -Infinity]
      //         = [0, NaN, 0.5, Infinity, 1, -Infinity]
      expect(result[0]).toBeCloseTo(0);
      expect(isNaN(result[1])).toBe(true);
      expect(result[2]).toBeCloseTo(0.5);
      expect(result[3]).toBe(Infinity);
      expect(result[4]).toBeCloseTo(1);
      expect(result[5]).toBe(-Infinity);
    });

    test('should handle decimal range correctly', async () => {
      const data = [1.5, 2.0, 2.5];
      const result = await rangeStandardize(data);

      // Min = 1.5, Max = 2.5, Range = 1.0
      // Expected: [(1.5-1.5)/1.0, (2.0-1.5)/1.0, (2.5-1.5)/1.0] = [0, 0.5, 1]
      const expected = [0, 0.5, 1];
      expectArraysNearEqual(expected, result);
    });
  });
});
