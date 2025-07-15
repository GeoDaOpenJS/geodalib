// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { describe, it, expect } from '@jest/globals';

import { percentileBreaks } from '../../src/mapping/percentile-breaks';
import { reducePrecision } from '../utils';

describe('percentileBreaks', () => {
  it('should calculate percentile breaks correctly', async () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const result = await percentileBreaks(data);

    expect(reducePrecision(result)).toEqual([1, 1.4, 5, 8.6, 9]);
  });
});
