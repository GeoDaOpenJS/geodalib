import { standardizeMAD } from '../../src/data/mad';
import { isValidNumber } from '../../src/utils/validation';

describe('MAD Tests', () => {
  // Helper function to compare arrays with tolerance for floating point precision
  const expectArraysNearEqual = (expected: number[], actual: number[], tolerance = 1e-9) => {
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
  };

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

  describe('standardizeMAD', () => {
    test('should standardize basic data using MAD', async () => {
      const data = [1, 2, 3, 4, 5];
      const result = await standardizeMAD(data);

      // Mean = 3, MAD = (|1-3| + |2-3| + |3-3| + |4-3| + |5-3|) / 5 = (2+1+0+1+2)/5 = 1.2
      // Expected: [(1-3)/1.2, (2-3)/1.2, (3-3)/1.2, (4-3)/1.2, (5-3)/1.2] = [-1.667, -0.833, 0, 0.833, 1.667]
      const expected = [
        -1.6666666666666667, -0.8333333333333334, 0, 0.8333333333333334, 1.6666666666666667,
      ];
      expectArraysNearEqual(expected, result);
    });

    test('should work with Float32Array input', async () => {
      const data = new Float32Array([1, 2, 3, 4, 5]);
      const result = await standardizeMAD(data);

      const expected = [
        -1.6666666666666667, -0.8333333333333334, 0, 0.8333333333333334, 1.6666666666666667,
      ];
      expectArraysNearEqual(expected, result);
    });

    test('should handle single element', async () => {
      const data = [5];
      const result = await standardizeMAD(data);

      // Single element should remain unchanged (MAD would be 0)
      expect(result).toEqual([5]);
    });

    test('should handle two identical elements', async () => {
      const data = [5, 5];
      const result = await standardizeMAD(data);

      // Identical elements should remain unchanged (MAD would be 0)
      expect(result).toEqual([5, 5]);
    });

    test('should handle negative numbers', async () => {
      const data = [-2, -1, 0, 1, 2];
      const result = await standardizeMAD(data);

      // Mean = 0, MAD = (2+1+0+1+2)/5 = 1.2
      // Expected: [-2/1.2, -1/1.2, 0/1.2, 1/1.2, 2/1.2] = [-1.667, -0.833, 0, 0.833, 1.667]
      const expected = [
        -1.6666666666666667, -0.8333333333333334, 0, 0.8333333333333334, 1.6666666666666667,
      ];
      expectArraysNearEqual(expected, result);
    });

    test('should handle floating point precision', async () => {
      const data = [0.1, 0.2, 0.3];
      const result = await standardizeMAD(data);

      // Mean = 0.2, MAD = (0.1 + 0 + 0.1) / 3 = 0.2/3 ≈ 0.0667
      // Expected: [(0.1-0.2)/0.0667, (0.2-0.2)/0.0667, (0.3-0.2)/0.0667] = [-1.5, 0, 1.5]
      const expected = [-1.5, 0, 1.5];
      expectArraysNearEqual(expected, result);
    });

    test('should skip NaN values in calculation but preserve them in result', async () => {
      const data = [1, NaN, 3, 5];
      const result = await standardizeMAD(data);

      // Valid values: [1, 3, 5], Mean = 3, MAD = (2+0+2)/3 = 4/3 ≈ 1.333
      // Expected: [(1-3)/1.333, NaN, (3-3)/1.333, (5-3)/1.333] = [-1.5, NaN, 0, 1.5]
      expect(result[0]).toBeCloseTo(-1.5);
      expect(isNaN(result[1])).toBe(true);
      expect(result[2]).toBeCloseTo(0);
      expect(result[3]).toBeCloseTo(1.5);
    });

    test('should skip Infinity values in calculation but preserve them in result', async () => {
      const data = [1, Infinity, 3, 5];
      const result = await standardizeMAD(data);

      // Valid values: [1, 3, 5], same calculation as above
      expect(result[0]).toBeCloseTo(-1.5);
      expect(result[1]).toBe(Infinity);
      expect(result[2]).toBeCloseTo(0);
      expect(result[3]).toBeCloseTo(1.5);
    });

    test('should skip -Infinity values in calculation but preserve them in result', async () => {
      const data = [1, -Infinity, 3, 5];
      const result = await standardizeMAD(data);

      // Valid values: [1, 3, 5], same calculation as above
      expect(result[0]).toBeCloseTo(-1.5);
      expect(result[1]).toBe(-Infinity);
      expect(result[2]).toBeCloseTo(0);
      expect(result[3]).toBeCloseTo(1.5);
    });

    test('should handle empty array', async () => {
      const data: number[] = [];
      const result = await standardizeMAD(data);

      expect(result).toEqual([]);
    });

    test('should handle array with all invalid values', async () => {
      const data = [NaN, Infinity, -Infinity];
      const result = await standardizeMAD(data);

      // All values should remain unchanged
      expect(isNaN(result[0])).toBe(true);
      expect(result[1]).toBe(Infinity);
      expect(result[2]).toBe(-Infinity);
    });

    test('should handle mixed valid and invalid values', async () => {
      const data = [1, NaN, 2, Infinity, 4, -Infinity, 5];
      const result = await standardizeMAD(data);

      // Valid values are [1, 2, 4, 5], mean = 3, MAD = (2+1+1+2)/4 = 1.5
      // Expected: [(1-3)/1.5, NaN, (2-3)/1.5, Infinity, (4-3)/1.5, -Infinity, (5-3)/1.5]
      //         = [-1.333, NaN, -0.667, Infinity, 0.667, -Infinity, 1.333]
      expect(result[0]).toBeCloseTo(-1.3333333333333333);
      expect(isNaN(result[1])).toBe(true);
      expect(result[2]).toBeCloseTo(-0.6666666666666666);
      expect(result[3]).toBe(Infinity);
      expect(result[4]).toBeCloseTo(0.6666666666666666);
      expect(result[5]).toBe(-Infinity);
      expect(result[6]).toBeCloseTo(1.3333333333333333);
    });

    test('should handle large dataset', async () => {
      const size = 100;
      const data = Array.from({ length: size }, (_, i) => i);
      const result = await standardizeMAD(data);

      // Should have same length and be properly standardized
      expect(result.length).toBe(size);

      // MAD calculation would be more complex, but we can test general properties

      // First and last elements should have opposite signs and similar magnitude
      expect(result[0]).toBeLessThan(0);
      expect(result[size - 1]).toBeGreaterThan(0);
      expect(Math.abs(Math.abs(result[0]) - Math.abs(result[size - 1]))).toBeLessThan(0.1);
    });

    test('should handle identical values', async () => {
      const data = [5, 5, 5, 5];
      const result = await standardizeMAD(data);

      // All values identical should remain unchanged (MAD = 0)
      expect(result).toEqual([5, 5, 5, 5]);
    });

    test('should handle very small numbers', async () => {
      const data = [0.00001, 0.00002, 0.00003];
      const result = await standardizeMAD(data);

      // Should be properly standardized
      expect(result.length).toBe(3);
      // Middle value should be 0 after standardization (it equals the mean)
      expect(Math.abs(result[1])).toBeLessThan(1e-10);
    });

    test('should handle very large numbers', async () => {
      const data = [1e10, 2e10, 3e10];
      const result = await standardizeMAD(data);

      // Should be properly standardized
      const expected = [-1.5, 0, 1.5];
      expectArraysNearEqual(expected, result);
    });

    test('should handle alternating pattern with invalid values', async () => {
      const data = [1, NaN, 2, Infinity, 3, -Infinity];
      const result = await standardizeMAD(data);

      // Valid values are [1, 2, 3], mean = 2, MAD = (1+0+1)/3 = 2/3
      // Expected: [(1-2)/(2/3), NaN, (2-2)/(2/3), Infinity, (3-2)/(2/3), -Infinity]
      //         = [-1.5, NaN, 0, Infinity, 1.5, -Infinity]
      expect(result[0]).toBeCloseTo(-1.5);
      expect(isNaN(result[1])).toBe(true);
      expect(result[2]).toBeCloseTo(0);
      expect(result[3]).toBe(Infinity);
      expect(result[4]).toBeCloseTo(1.5);
      expect(result[5]).toBe(-Infinity);
    });
  });
});
