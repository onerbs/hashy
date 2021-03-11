/**
 * Performs a 32-bit sum.
 */
export function sum32(a: number, b: number): number {
  return (a + b) & 0xffffffff
}

/**
 * Rotates the value a specified number of bits to the left.
 * @param v - The value to rotate
 * @param s - The bit count to shift
 */
export function rotl(v: number, s: number): number {
  return (v << s) | (v >>> (32 - s))
}
