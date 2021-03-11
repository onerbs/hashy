// Thanks to Daniel Mester Pirttijärvi
// https://github.com/dmester/jdenticon

import { rotl } from './common'

/**
 * Computes a SHA1 hash for any value and returns it as a hexadecimal string.
 * This function is optimized for minimal code size and rather short messages.
 */
export function hash(s: string): string {
  const HASH_SIZE_HALF_BYTES = 40;
  const hash = sha1(encodeURI(s))
  let result = ''
  for (let i = 0; i < HASH_SIZE_HALF_BYTES; i++) {
    result += (
      (hash[i >> 3] >>> ((7 - (i & 7)) * 4)) & 0xf
    ).toString(16)
  }
  return result
}

/**
 * @param s - An UTF8-encoded message
 */
export function sha1(s: string): number[] {
  const BLOCK_SIZE_WORDS = 16
  s += "%80"

  const data: number[] = []
  const hashBuffer: number[] = []

  let blockStartIndex = 0
  let a = 0x67452301
  let b = 0xefcdab89
  let c = ~a
  let d = ~b
  let e = 0xc3d2e1f0
  const hash = [a, b, c, d, e]

  let i = 0
  let f = 0

  for (; i < s.length; f++) {
    data[f >> 2] = data[f >> 2] | (
      (s[i] == "%"
        ? parseInt(s.substring(i + 1, i += 3), 16)
        : s.charCodeAt(i++)
      ) << ((3 - (f & 3)) * 8)
    )
  }

  const dataSize = (((f + 7) >> 6) + 1) * BLOCK_SIZE_WORDS
  data[dataSize - 1] = f * 8 - 8

  for (; blockStartIndex < dataSize; blockStartIndex += BLOCK_SIZE_WORDS) {
    for (i = 0; i < 80; i++) {
      f = rotl(a, 5) + e + (
        i < 20 ? ((b & c) ^ ((~b) & d)) + 0x5a827999 :
          i < 40 ? (b ^ c ^ d) + 0x6ed9eba1 :
            i < 60 ? ((b & c) ^ (b & d) ^ (c & d)) + 0x8f1bbcdc :
              (b ^ c ^ d) + 0xca62c1d6
      ) + (
        hashBuffer[i] = i < BLOCK_SIZE_WORDS
          ? (data[blockStartIndex + i] | 0)
          : rotl(hashBuffer[i - 3] ^ hashBuffer[i - 8] ^ hashBuffer[i - 14] ^ hashBuffer[i - 16], 1)
      )

      e = d
      d = c
      c = rotl(b, 30)
      b = a
      a = f
    }

    hash[0] = a = ((hash[0] + a) | 0)
    hash[1] = b = ((hash[1] + b) | 0)
    hash[2] = c = ((hash[2] + c) | 0)
    hash[3] = d = ((hash[3] + d) | 0)
    hash[4] = e = ((hash[4] + e) | 0)
  }
  return hash
}
