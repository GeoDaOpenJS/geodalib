import test from 'tape';

import {runLinearRegression} from '../../src/regression/linear-regression';

test('Test runLinearRegression()', async t => {
  const result = await runLinearRegression();
  t.deepEqual(result, 32);
});
