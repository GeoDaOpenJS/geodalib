import test from 'tape';

import {percentileBreaks} from '../../src/mapping/percentile-breaks';
import {reducePrecision} from '../utils';

test('Test percentileBreaks()', async t => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const result = await percentileBreaks(data);

  t.deepEqual(reducePrecision(result), [1, 1.4, 5, 8.6, 9]);
  t.end();
});
