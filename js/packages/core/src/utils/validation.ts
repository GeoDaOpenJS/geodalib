// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

/**
 * Check if a value is a valid number
 * @param val - The value to check
 * @returns True if the value is a valid number, false otherwise
 */
export function isValidNumber(val: unknown): boolean {
  return typeof val === 'number' && isFinite(val);
}
