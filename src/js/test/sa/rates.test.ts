import test from 'tape';

import {excessRisk, empiricalBayes, spatialEmpiricalBayes} from '../../src/sa/rates';

test('Test excessRisk()', async t => {
  const baseValues = [100, 200, 300, 400, 500];
  const eventValues = [10, 20, 30, 40, 50];
  const rates = excessRisk(baseValues, eventValues);

  console.log(rates);

  t.deepEqual(rates, [1, 1, 1, 1, 1]);
  t.end();
});

test('Test empiricalBayes()', async t => {
  const baseValues = [100, 200, 300, 400, 500];
  const eventValues = [10, 20, 30, 40, 50];
  const rates = empiricalBayes(baseValues, eventValues);

  console.log(rates);

  t.deepEqual(rates, [0.1, 0.1, 0.1, 0.1, 0.1]);
  t.end();
});

test('Test spatialEmpiricalBayes()', async t => {
  const baseValues = [100, 200, 300, 400, 500];
  const eventValues = [10, 20, 30, 40, 50];
  const neighbors = [[1, 2], [0, 2, 3], [0, 1, 3, 4], [1, 2, 4], [2, 3]];
  const rates = spatialEmpiricalBayes(baseValues, eventValues, neighbors);

  console.log(rates);

  t.deepEqual(rates, [0.1, 0.1, 0.1, 0.1, 0.1]);
  t.end();
});
