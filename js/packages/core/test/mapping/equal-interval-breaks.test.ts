import test from 'tape';

import { equalIntervalBreaks } from '../../src/mapping/equal-interval-breaks';
import { reducePrecision } from '../utils';

test('Test equalIntervalBreaks()', async t => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const k = 3;

  const result = await equalIntervalBreaks(k, data);

  t.deepEqual(reducePrecision(result), [3.66666666666667, 6.33333333333333]);
  t.end();
});
