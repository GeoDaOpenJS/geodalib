import test from 'tape';

import {localG} from '../../src/sa/local-g';

test('Test localG()', async t => {
  const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
  const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
  const perm = 99;

  const result = await localG(data, neighbors, perm);

  t.deepEqual(result.isValid, true);
  t.deepEqual(result.pValues, [0.16, 0.16, 0, 0.09, 0.09, 0.09]);
  t.deepEqual(result.lagValues, [3, 3, 0, 8.25, 8.75, 8.5]);
  t.deepEqual(
    result.lisaValues,
    [
      0.10526315789473684, 0.10526315789473684, 0, 0.36666666666666664, 0.3723404255319149,
      0.3695652173913043
    ]
  );
  t.deepEqual(result.clusters, [2, 2, 5, 1, 1, 1]);
  t.end();
});

test('Test localG() with GStar', async t => {
  const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
  const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
  const perm = 99;
  const isGStar = true;
  const result = await localG(data, neighbors, perm, isGStar);

  t.deepEqual(result.isValid, true);
  t.deepEqual(result.pValues, [0.16, 0.16, 0, 0.01, 0.09, 0.09]);
  t.deepEqual(result.lagValues, [3, 3, 0, 8.5, 8.5, 8.5]);
  t.deepEqual(
    result.lisaValues,
    [
      0.09523809523809523, 0.09523809523809523, 0, 0.2698412698412698, 0.2698412698412698,
      0.2698412698412698
    ]
  );
  t.deepEqual(result.clusters, [2, 2, 5, 1, 1, 1]);
  t.end();
});
