// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { describe, it, expect } from '@jest/globals';

import { equalIntervalBreaks } from '../../src/mapping/equal-interval-breaks';
import { reducePrecision } from '../utils';

describe('equalIntervalBreaks', () => {
  it('should calculate equal interval breaks correctly', async () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const k = 3;

    const result = await equalIntervalBreaks(k, data);

    expect(reducePrecision(result)).toEqual([3.66666666666667, 6.33333333333333]);
  });
});
