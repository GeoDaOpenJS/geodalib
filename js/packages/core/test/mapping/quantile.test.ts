import test from 'tape';

import { quantileBreaks } from '../../src/mapping/quantile';
import { reducePrecision } from '../utils';

test('Test quantileBreaks()', async t => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const k = 3;

  const result = await quantileBreaks(k, data);

  t.deepEqual(reducePrecision(result), [3.5, 6.5]);
  t.end();
});
