import test from 'tape';

import {localMoran} from '../../src/sa/local-moran';

test('Test localMoran()', async t => {
  const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
  const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
  const perm = 99;

  const result = await localMoran(data, neighbors, perm);

  t.deepEqual(result.isValid, true);
  t.deepEqual(result.pValues, [0.16, 0.16, 0, 0.09, 0.09, 0.09]);
  t.deepEqual(
    result.lagValues,
    [
      -0.6018754231938057, -0.6018754231938057, 0, 0.8025005642584077, 0.9362506583014756,
      0.8693756112799416
    ]
  );
  t.deepEqual(
    result.lisaValues,
    [
      0.3622540250447227, 0.3622540250447227, 0, 0.8050089445438283, 0.6887298747763864,
      0.7558139534883721
    ]
  );
  t.deepEqual(result.clusters, [2, 2, 5, 1, 1, 1]);
  t.end();
});
