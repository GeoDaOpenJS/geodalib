// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { describe, it, expect } from '@jest/globals';
import { quantileBreaks } from '../../src/mapping/quantile';
import { reducePrecision } from '../utils';

describe('Quantile Breaks', () => {
  it('should calculate quantile breaks correctly', async () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const k = 3;

    const result = await quantileBreaks(k, data);

    expect(reducePrecision(result)).toEqual([3.5, 6.5]);
  });
});
