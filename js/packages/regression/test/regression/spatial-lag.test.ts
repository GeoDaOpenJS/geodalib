// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { spatialLagRegression } from '../../src/regression/spatial-lag';
import { TEST_HR60, TEST_PO60, TEST_QUEEN_WEIGHTS, TEST_UE60 } from '../data';

describe('Spatial Lag Tests', () => {
  test('Test spatialLag()', async () => {
    const x = [TEST_PO60, TEST_UE60];
    const y = TEST_HR60;
    const xNames = ['PO60', 'UE60'];
    const yName = 'HR60';
    const datasetName = 'natregimes';
    const weights = TEST_QUEEN_WEIGHTS;

    const result = await spatialLagRegression({ x, y, weights, xNames, yName, datasetName });
    expect(result.type).toBe('spatialLag');
  });
});
