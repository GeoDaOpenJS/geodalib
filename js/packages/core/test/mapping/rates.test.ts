import { excessRisk, empiricalBayes, spatialEmpiricalBayes } from '../../src/mapping/rates';

describe('Rates Tests', () => {
  test('Test excessRisk()', () => {
    const baseValues = [100, 200, 300, 400, 500];
    const eventValues = [10, 20, 30, 40, 50];
    const rates = excessRisk(baseValues, eventValues);

    expect(rates).toEqual([1, 1, 1, 1, 1]);
  });

  test('Test empiricalBayes()', () => {
    const baseValues = [100, 200, 300, 400, 500];
    const eventValues = [10, 20, 30, 40, 50];
    const rates = empiricalBayes(baseValues, eventValues);

    expect(rates).toEqual([0.1, 0.1, 0.1, 0.1, 0.1]);
  });

  test('Test spatialEmpiricalBayes()', () => {
    const baseValues = [100, 200, 300, 400, 500];
    const eventValues = [10, 20, 30, 40, 50];
    const neighbors = [
      [1, 2],
      [0, 2, 3],
      [0, 1, 3, 4],
      [1, 2, 4],
      [2, 3],
    ];
    const rates = spatialEmpiricalBayes(baseValues, eventValues, neighbors);

    expect(rates).toEqual([0.1, 0.1, 0.1, 0.1, 0.1]);
  });
});
