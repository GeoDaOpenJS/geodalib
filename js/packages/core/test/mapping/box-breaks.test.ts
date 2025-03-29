import test from 'tape';

import { hinge15Breaks, hinge30Breaks } from '../../src/mapping/box-breaks';
import { reducePrecision } from '../utils';

test('Test hinge15Breaks()', async t => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const result = await hinge15Breaks(data);

  t.deepEqual(reducePrecision(result), [-4, 2.75, 5, 7.25, 14]);
  t.end();
});

test('Test hinge30Breaks()', async t => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const result = await hinge30Breaks(data);

  t.deepEqual(reducePrecision(result), [-10.75, 2.75, 5, 7.25, 20.75]);
  t.end();
});
