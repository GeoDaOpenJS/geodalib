import test from 'tape';

import {dotProduct} from '../../src/regression/linear-regression';

test('Test dotProduct()', async t => {
  const x = [1, 2, 3];
  const y = [4, 5, 6];

  const result = await dotProduct(x, y);
  t.deepEqual(result, 32);
});
