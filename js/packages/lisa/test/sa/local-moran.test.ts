import { localMoran } from '../../src/sa/local-moran';
import { initWASM } from '../../src/init';

describe('localMoran()', () => {
  beforeAll(async () => {
    await initWASM('./wasm/geoda-lisa.wasm');
  });

  it('should calculate local Moran statistics correctly', async () => {
    const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
    const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
    const permutation = 99;

    const result = await localMoran({ data, neighbors, permutation });

    expect(result.isValid).toBe(true);
    expect(result.pValues).toEqual([0.02, 0.02, 0, 0.01, 0.01, 0.01]);
    expect(result.lagValues).toEqual([
      -0.6018754231938057, -0.6018754231938057, 0, 0.8025005642584077, 0.9362506583014756,
      0.8693756112799416,
    ]);
    expect(result.lisaValues).toEqual([
      0.3622540250447227, 0.3622540250447227, 0, 0.8050089445438283, 0.6887298747763864,
      0.7558139534883721,
    ]);
    expect(result.clusters).toEqual([2, 2, 6, 1, 1, 1]);
  });
});
