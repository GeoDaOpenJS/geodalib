// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { describe, it, expect } from '@jest/globals';

import { standardDeviationBreaks } from '../../src/mapping/stddev-breaks';
import { reducePrecision } from '../utils';

describe('standardDeviationBreaks', () => {
  it('should calculate standard deviation breaks correctly', async () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const result = await standardDeviationBreaks(data);

    expect(reducePrecision(result)).toEqual([
      -0.47722557505166, 2.26138721247417, 5, 7.73861278752583, 10.47722557505166,
    ]);
  });
});
