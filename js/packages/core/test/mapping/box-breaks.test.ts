// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { describe, it, expect } from '@jest/globals';
import { hinge15Breaks, hinge30Breaks } from '../../src/mapping/box-breaks';
import { reducePrecision } from '../utils';

describe('Box Breaks', () => {
  it('should calculate hinge15 breaks correctly', async () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const result = await hinge15Breaks(data);

    expect(reducePrecision(result)).toEqual([-4, 2.75, 5, 7.25, 14]);
  });

  it('should calculate hinge30 breaks correctly', async () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const result = await hinge30Breaks(data);

    expect(reducePrecision(result)).toEqual([-10.75, 2.75, 5, 7.25, 20.75]);
  });
});
