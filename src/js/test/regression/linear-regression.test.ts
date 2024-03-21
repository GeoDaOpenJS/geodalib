import test from 'tape';

import {dotProduct, linearRegression} from '../../src/regression/linear-regression';

test('Test dotProduct()', async t => {
  const x = [1, 2, 3];
  const y = [4, 5, 6];

  const result = await dotProduct(x, y);
  t.deepEqual(result, 32);
});

test('Test linearRegression()', async t => {
  const x = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  const y = [7, 8, 9];
  const xNames = ['a', 'b'];
  const yName = 'c';
  const datasetName = 'd';
  const weights = [
    [1, 2],
    [0, 2],
    [0, 1]
  ];
  const result = await linearRegression({x, y, weights, xNames, yName, datasetName});

  t.deepEqual(result.type, 'linearRegression');
});
