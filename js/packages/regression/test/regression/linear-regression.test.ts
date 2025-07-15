// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { initWASM } from '../../src/init';
import { dotProduct, linearRegression } from '../../src/regression/linear-regression';
import { TEST_HR60, TEST_PO60, TEST_UE60, TEST_QUEEN_WEIGHTS } from '../data';

describe('Linear Regression Tests', () => {
  beforeEach(async () => {
    await initWASM('./wasm/geoda-regression.wasm');
  });

  test('Test dotProduct()', async () => {
    const x = [1, 2, 3];
    const y = [4, 5, 6];

    const result = await dotProduct(x, y);
    expect(result).toBe(32);
  });

  test('Test linearRegression()', async () => {
    const x = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const y = [7, 8, 9];
    const xNames = ['a', 'b'];
    const yName = 'c';
    const datasetName = 'd';
    const weights = [
      [1, 2],
      [0, 2],
      [0, 1],
    ];
    const result = await linearRegression({ x, y, weights, xNames, yName, datasetName });

    expect(result.type).toBe('linearRegression');
  });

  test('Test linearRegression1()', async () => {
    const x = [TEST_PO60, TEST_UE60];
    const y = TEST_HR60;
    const xNames = ['PO60', 'UE60'];
    const yName = 'HR60';
    const datasetName = 'natregimes';
    const weights = TEST_QUEEN_WEIGHTS;

    const result = await linearRegression({ x, y, weights, xNames, yName, datasetName });
    expect(result.type).toBe('linearRegression');
  });
});
