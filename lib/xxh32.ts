// Thanks to Jason Dent
// https://github.com/Jason3S/xxhash

import { sum32 } from './common'

const PRIME1 = 0x9e3779b1
const PRIME2 = 0x85ebca77
const PRIME3 = 0xc2b2ae3d
const PRIME4 = 0x27d4eb2f
const PRIME5 = 0x165667b1

export function hash(s: string, seed = 0): string {
  const bytes = new TextEncoder().encode(s)
  return hashBytes(bytes, seed)
}

export function hashBytes(bytes: Uint8Array, seed = 0): string {
  return xxHash32(bytes, seed).toString(16)
}

export function xxHash32(buffer: Uint8Array, seed = 0): number {
  const b = buffer

  let offset = 0
  let acc = sum32(seed, PRIME5)

  if (b.length >= 16) {
    const accN = [
      sum32(seed, PRIME1 + PRIME2),
      sum32(seed, PRIME2),
      sum32(seed, 0),
      sum32(seed, -PRIME1),
    ]

    const b = buffer
    const limit = b.length - 16
    let lane = 0
    for (offset = 0; (offset & 0xfffffff0) <= limit; offset += 4 ) {
      const i = offset
      const laneN0 = b[i + 0] + (b[i + 1] << 8)
      const laneN1 = b[i + 2] + (b[i + 3] << 8)
      const laneNP = laneN0 * PRIME2 + (laneN1 * PRIME2 << 16)
      let acc = sum32(accN[lane], laneNP)
      acc = (acc << 13) | (acc >>> 19)
      const acc0 = acc & 0xffff
      const acc1 = acc >>> 16
      accN[lane] = sum32(acc0 * PRIME1, acc1 * PRIME1 << 16)
      lane = (lane + 1) & 0x3
    }

    acc = (((accN[0] << 1)  | (accN[0] >>> 31))
       + ((accN[1] << 7)  | (accN[1] >>> 25))
       + ((accN[2] << 12) | (accN[2] >>> 20))
       + ((accN[3] << 18) | (accN[3] >>> 14))) & 0xffffffff
  }

  acc = sum32(acc, buffer.length)

  const limit = buffer.length - 4
  for (; offset <= limit; offset += 4) {
    const i = offset
    const laneN0 = b[i + 0] + (b[i + 1] << 8)
    const laneN1 = b[i + 2] + (b[i + 3] << 8)
    const laneP = laneN0 * PRIME3 + (laneN1 * PRIME3 << 16)
    acc = sum32(acc, laneP)
    acc = (acc << 17) | (acc >>> 15)
    acc = sum32((acc & 0xffff) * PRIME4, ((acc >>> 16) * PRIME4) << 16)
  }

  for (; offset < b.length; ++offset) {
    const lane = b[offset]
    acc = acc + lane * PRIME5
    acc = (acc << 11) | (acc >>> 21)
    acc = sum32((acc & 0xffff) * PRIME1, ((acc >>> 16) * PRIME1) << 16)
  }

  acc = acc ^ (acc >>> 15)
  acc = ((acc & 0xffff) * PRIME2 & 0xffffffff) + ((acc >>> 16) * PRIME2 << 16)
  acc = acc ^ (acc >>> 13)
  acc = ((acc & 0xffff) * PRIME3 & 0xffffffff) + ((acc >>> 16) * PRIME3 << 16)
  acc = acc ^ (acc >>> 16)

  return acc < 0 ? acc + 0x100000000 : acc
}
