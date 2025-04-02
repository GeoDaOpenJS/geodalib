const { quantileBreaks } = require('@geoda/core');
const { localG } = require('@geoda/lisa');

describe('quantileBreaks', () => {
    test('should return correct breaks for given data', async () => {
        const data = [1, 2, 3, 4, 5];
        const breaks = await quantileBreaks(2, data);
        expect(breaks).toEqual([3]);
    });

    test('should handle empty data array', async () => {
        const data = [];
        const breaks = await quantileBreaks(2, data);
        expect(breaks).toEqual([0]);
    });

    test('should handle single value data', async () => {
        const data = [1];
        const breaks = await quantileBreaks(2, data);
        expect(breaks).toEqual([1]);
    });
}); 

describe('localG', () => {
    test('should calculate local G statistics correctly', async () => {
        const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
        const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
        const permutation = 99;

        const result = await localG({ data, neighbors, permutation });

        expect(result.isValid).toBe(true);
        expect(result.pValues).toEqual([0.01, 0.01, 0, 0.14, 0.16, 0.23]);
        expect(result.lagValues).toEqual([3, 3, 0, 8.25, 8.75, 8.5]);
        expect(result.lisaValues).toEqual([
            0.10526315789473684, 0.10526315789473684, 0, 0.36666666666666664, 0.3723404255319149,
            0.3695652173913043,
        ]);
        expect(result.clusters).toEqual([2, 2, 4, 0, 0, 0]);
    });
}); 

