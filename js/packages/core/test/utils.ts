/**
 * Reduces the precision of a number to the given number of decimal places.
 *
 */
export function reducePrecision(o: unknown, precision = 14): unknown {
  if (!o) return o;
  if (Array.isArray(o)) {
    return o.map(el => reducePrecision(el, precision));
  }
  if (typeof o === 'object') {
    return Object.keys(o).reduce(
      (map, k) => {
        const obj = o as Record<string, unknown>;
        map[k] = reducePrecision(obj[k], precision);
        return map;
      },
      {} as Record<string, unknown>
    );
  }
  if (typeof o === 'number') {
    return Number(o.toFixed(precision));
  }
  return o;
}
