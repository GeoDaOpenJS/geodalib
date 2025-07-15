// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { describe, it, expect } from '@jest/globals';
import { quantileLisa } from '../../src/sa/quantile-lisa';

describe('quantileLisa', () => {
  it('should calculate quantile LISA statistics correctly', async () => {
    const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
    const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
    const permutation = 99;
    const k = 2;
    const quantile = 1;
    const result = await quantileLisa({ k, quantile, data, neighbors, permutation });

    expect(result.isValid).toBe(true);
    expect(result.pValues).toEqual([0.06, 0.06, 0, -1, -1, -1]);
    expect(result.lagValues).toEqual([0, 0, 0, 0, 0, 0]);
    expect(result.lisaValues).toEqual([1, 1, 0, 0, 0, 0]);
    expect(result.clusters).toEqual([0, 0, 0, 0, 0, 0]);
  });
});
