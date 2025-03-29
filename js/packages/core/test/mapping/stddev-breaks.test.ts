import test from 'tape';

import { standardDeviationBreaks } from '../../src/mapping/stddev-breaks';
import { reducePrecision } from '../utils';

test('Test standardDeviationBreaks()', async t => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const result = await standardDeviationBreaks(data);

  t.deepEqual(
    reducePrecision(result),
    [-0.47722557505166, 2.26138721247417, 5, 7.73861278752583, 10.47722557505166]
  );
  t.end();
});
