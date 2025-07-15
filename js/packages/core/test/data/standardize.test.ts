// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { standardize } from '../../src/data/standardize';
import { isValidNumber } from '../../src/utils/validation';
import { expectArraysNearEqual } from '../utils';

describe('Standardize Tests', () => {
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

  describe('standardize', () => {
    test('should handle basic data without crashing', async () => {
      const data = [1, 2, 3, 4, 5];
      const result = await standardize(data);

      // Check that the result has the expected length
      expect(result.length).toBe(data.length);

      const expected = [
        -1.2649110640673518, -0.6324555320336759, 0, 0.6324555320336759, 1.2649110640673518,
      ];
      expectArraysNearEqual(expected, result);

      // The function should produce valid numbers
      expect(result.every(val => typeof val === 'number')).toBe(true);
    });

    test('should work with Float32Array input', async () => {
      const data = new Float32Array([1, 2, 3, 4, 5]);
      const result = await standardize(data);

      expect(result.length).toBe(data.length);
      expect(result.every(val => typeof val === 'number')).toBe(true);
    });

    test('should handle single element', async () => {
      const data = [5];
      const result = await standardize(data);

      expect(result.length).toBe(1);
      expect(typeof result[0]).toBe('number');
    });

    test('should handle two identical elements', async () => {
      const data = [5, 5];
      const result = await standardize(data);

      expect(result.length).toBe(2);
      expect(result.every(val => typeof val === 'number')).toBe(true);
    });

    test('should handle empty array', async () => {
      const data: number[] = [];
      const result = await standardize(data);

      expect(result).toEqual([]);
    });

    test('should handle array with all invalid values', async () => {
      const data = [NaN, Infinity, -Infinity];
      const result = await standardize(data);

      // All values should remain unchanged
      expect(isNaN(result[0])).toBe(true);
      expect(result[1]).toBe(Infinity);
      expect(result[2]).toBe(-Infinity);
    });

    test('should preserve invalid values in result', async () => {
      const data = [1, NaN, 3, Infinity, 5, -Infinity];
      const result = await standardize(data);

      // Invalid values should be preserved
      expect(isNaN(result[1])).toBe(true);
      expect(result[3]).toBe(Infinity);
      expect(result[5]).toBe(-Infinity);
    });
  });
});
