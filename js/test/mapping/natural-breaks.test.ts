import test from 'tape';

import {naturalBreaks} from '../../src/mapping/natural-breaks';
import {reducePrecision} from '../utils';

test('Test naturalBreaks()', async t => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const k = 3;

  const result = await naturalBreaks(k, data);

  t.deepEqual(reducePrecision(result), [4, 7]);
});
