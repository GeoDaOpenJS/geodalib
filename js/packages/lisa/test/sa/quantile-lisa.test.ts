import test from 'tape';

import { quantileLisa } from '../../src/sa/quantile-lisa';

test('Test quantileLisa()', async t => {
  const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
  const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
  const permutation = 99;
  const k = 2;
  const quantile = 1;
  const result = await quantileLisa({ k, quantile, data, neighbors, permutation });

  t.deepEqual(result.isValid, true);
  t.deepEqual(result.pValues, [0.02, 0.02, 0, -1, -1, -1]);
  t.deepEqual(result.lagValues, [0, 0, 0, 0, 0, 0]);
  t.deepEqual(result.lisaValues, [1, 1, 0, 0, 0, 0]);
  t.deepEqual(result.clusters, [1, 1, 0, 0, 0, 0]);
  t.end();
});
