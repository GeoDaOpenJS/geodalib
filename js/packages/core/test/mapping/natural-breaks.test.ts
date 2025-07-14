// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { describe, it, expect } from '@jest/globals';
import { naturalBreaks } from '../../src/mapping/natural-breaks';
import { reducePrecision } from '../utils';

describe('Natural Breaks', () => {
  it('should calculate natural breaks correctly', async () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const k = 3;

    const result = await naturalBreaks(k, data);

    expect(reducePrecision(result)).toEqual([4, 7]);
  });
});
