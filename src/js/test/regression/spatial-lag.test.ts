import test from 'tape';

import {spatialLag} from '../../src/regression/spatial-lag';
import {TEST_HR60, TEST_PO60, TEST_QUEEN_WEIGHTS, TEST_UE60} from '../data';

test('Test spatialLag()', async t => {
  const x = [TEST_PO60, TEST_UE60];
  const y = TEST_HR60;
  const xNames = ['PO60', 'UE60'];
  const yName = 'HR60';
  const datasetName = 'natregimes';
  const weights = TEST_QUEEN_WEIGHTS;

  const result = await spatialLag({x, y, weights, xNames, yName, datasetName});
  t.deepEqual(result.type, 'spatialLag');

  t.end();
});
