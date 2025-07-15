// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { localGeary } from '../../src/sa/local-geary';

describe('localGeary', () => {
  test('should calculate local Geary statistics correctly', async () => {
    const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
    const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
    const permutation = 99;

    const result = await localGeary({ data, neighbors, permutation });

    expect(result.isValid).toBe(true);
    expect(result.pValues).toEqual([0.28, 0.15, 0, 0.14, 0.16, 0.23]);
    expect(result.lagValues).toEqual([
      -0.6018754231938057, -0.6018754231938057, 0, 0.8025005642584077, 0.9362506583014756,
      0.8693756112799416,
    ]);
    expect(result.lisaValues).toEqual([
      0, 0, 0, 0.04472271914132375, 0.044722719141323974, 0.017889087656529634,
    ]);
    expect(result.clusters).toEqual([0, 0, 6, 0, 0, 0]);
  });
});
