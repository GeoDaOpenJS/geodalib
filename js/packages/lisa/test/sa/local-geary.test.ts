import test from 'tape';

import { localGeary } from '../../src/sa/local-geary';

test('Test localGeary()', async t => {
  const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
  const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
  const permutation = 99;

  const result = await localGeary({ data, neighbors, permutation });

  t.deepEqual(result.isValid, true);
  t.deepEqual(result.pValues, [0.28, 0.15, 0, 0.14, 0.16, 0.23]);
  t.deepEqual(
    result.lagValues,
    [
      -0.6018754231938057, -0.6018754231938057, 0, 0.8025005642584077, 0.9362506583014756,
      0.8693756112799416,
    ]
  );
  t.deepEqual(
    result.lisaValues,
    [0, 0, 0, 0.04472271914132375, 0.044722719141323974, 0.017889087656529634]
  );
  t.deepEqual(result.clusters, [0, 0, 6, 0, 0, 0]);
  t.end();
});
