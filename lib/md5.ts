// Thanks to Sebastian Tschan
// https://github.com/blueimp/JavaScript-MD5

import { sum32, rotl } from './common'

/**
 * Computes the MD5 hash for the provided string
 * and returns it as a hexadecimal string.
 *
 * This function does not support unicode characters.
 */
export function hash(s: string): string {
  let g = [1732584193, -271733879, -1732584194, 271733878]
  let i: number
  for (i = 0x40; i <= s.length; i += 0x40) {
    dd(g, bb(s.substring(i - 0x40, i)))
  }
  const y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const z = s.substring(i - 0x40)
  for (i = 0;; i++) {
    const k = z.charCodeAt(i)
    if (isNaN(k)) break
    y[i >> 2] |= k << ((i % 4) << 3)
  }
  y[i >> 2] |= 0x80 << ((i % 4) << 3)
  if (i > 55) {
    dd(g, y)
    for (let j = 0; j < 16; j++) {
      y[j] = 0
    }
  }
  y[0xe] = s.length * 8
  dd(g, y)
  return g.map(it => aa(it)).join('')
}

function aa(n: i64): string {
  let x = ''
  for (let i = 0; i < 4; i++) {
    const a = (n >> (i * 8 + 4))
    const b = (n >> (i * 8))
    x += hs[a & 0xf] + hs[b & 0xf]
  }
  return x
}

function bb(s: string): i64[] {
  const x = []
  for (let i = 0; i < 0x40; i += 4) {
    const a = s.charCodeAt(i)
    const b = s.charCodeAt(i + 1) << 0x08
    const c = s.charCodeAt(i + 2) << 0x10
    const d = s.charCodeAt(i + 3) << 0x18
    x[i >> 2] = a + b + c + d
  }
  return x
}

function dd(g: i64[], r: i64[]): void {
  let a = g[0], b = g[1], c = g[2], d = g[3]
  a = ff(a, b, c, d, r[0], 7, -680876936)
  d = ff(d, a, b, c, r[1], 12, -389564586)
  c = ff(c, d, a, b, r[2], 17, 606105819)
  b = ff(b, c, d, a, r[3], 22, -1044525330)
  a = ff(a, b, c, d, r[4], 7, -176418897)
  d = ff(d, a, b, c, r[5], 12, 1200080426)
  c = ff(c, d, a, b, r[6], 17, -1473231341)
  b = ff(b, c, d, a, r[7], 22, -45705983)
  a = ff(a, b, c, d, r[8], 7, 1770035416)
  d = ff(d, a, b, c, r[9], 12, -1958414417)
  c = ff(c, d, a, b, r[10], 17, -42063)
  b = ff(b, c, d, a, r[11], 22, -1990404162)
  a = ff(a, b, c, d, r[12], 7, 1804603682)
  d = ff(d, a, b, c, r[13], 12, -40341101)
  c = ff(c, d, a, b, r[14], 17, -1502002290)
  b = ff(b, c, d, a, r[15], 22, 1236535329)
  a = gg(a, b, c, d, r[1], 5, -165796510)
  d = gg(d, a, b, c, r[6], 9, -1069501632)
  c = gg(c, d, a, b, r[11], 14, 643717713)
  b = gg(b, c, d, a, r[0], 20, -373897302)
  a = gg(a, b, c, d, r[5], 5, -701558691)
  d = gg(d, a, b, c, r[10], 9, 38016083)
  c = gg(c, d, a, b, r[15], 14, -660478335)
  b = gg(b, c, d, a, r[4], 20, -405537848)
  a = gg(a, b, c, d, r[9], 5, 568446438)
  d = gg(d, a, b, c, r[14], 9, -1019803690)
  c = gg(c, d, a, b, r[3], 14, -187363961)
  b = gg(b, c, d, a, r[8], 20, 1163531501)
  a = gg(a, b, c, d, r[13], 5, -1444681467)
  d = gg(d, a, b, c, r[2], 9, -51403784)
  c = gg(c, d, a, b, r[7], 14, 1735328473)
  b = gg(b, c, d, a, r[12], 20, -1926607734)
  a = hh(a, b, c, d, r[5], 4, -378558)
  d = hh(d, a, b, c, r[8], 11, -2022574463)
  c = hh(c, d, a, b, r[11], 16, 1839030562)
  b = hh(b, c, d, a, r[14], 23, -35309556)
  a = hh(a, b, c, d, r[1], 4, -1530992060)
  d = hh(d, a, b, c, r[4], 11, 1272893353)
  c = hh(c, d, a, b, r[7], 16, -155497632)
  b = hh(b, c, d, a, r[10], 23, -1094730640)
  a = hh(a, b, c, d, r[13], 4, 681279174)
  d = hh(d, a, b, c, r[0], 11, -358537222)
  c = hh(c, d, a, b, r[3], 16, -722521979)
  b = hh(b, c, d, a, r[6], 23, 76029189)
  a = hh(a, b, c, d, r[9], 4, -640364487)
  d = hh(d, a, b, c, r[12], 11, -421815835)
  c = hh(c, d, a, b, r[15], 16, 530742520)
  b = hh(b, c, d, a, r[2], 23, -995338651)
  a = ii(a, b, c, d, r[0], 6, -198630844)
  d = ii(d, a, b, c, r[7], 10, 1126891415)
  c = ii(c, d, a, b, r[14], 15, -1416354905)
  b = ii(b, c, d, a, r[5], 21, -57434055)
  a = ii(a, b, c, d, r[12], 6, 1700485571)
  d = ii(d, a, b, c, r[3], 10, -1894986606)
  c = ii(c, d, a, b, r[10], 15, -1051523)
  b = ii(b, c, d, a, r[1], 21, -2054922799)
  a = ii(a, b, c, d, r[8], 6, 1873313359)
  d = ii(d, a, b, c, r[15], 10, -30611744)
  c = ii(c, d, a, b, r[6], 15, -1560198380)
  b = ii(b, c, d, a, r[13], 21, 1309151649)
  a = ii(a, b, c, d, r[4], 6, -145523070)
  d = ii(d, a, b, c, r[11], 10, -1120210379)
  c = ii(c, d, a, b, r[2], 15, 718787259)
  b = ii(b, c, d, a, r[9], 21, -343485551)
  g[0] = sum32(a, g[0])
  g[1] = sum32(b, g[1])
  g[2] = sum32(c, g[2])
  g[3] = sum32(d, g[3])
}

function ee(r: i64, s: i64, t: i64, a: i64, b: i64, c: i64): i64 {
  const d = sum32(sum32(a, c), sum32(r, t))
  return sum32(rotl(d, s), b)
}

function ff(a: i64, b: i64, c: i64, d: i64, r: i64, s: i64, t: i64): i64 {
  return ee(r, s, t, a, b, (b & c) | ((~b) & d))
}

function gg(a: i64, b: i64, c: i64, d: i64, r: i64, s: i64, t: i64): i64 {
  return ee(r, s, t, a, b, (b & d) | (c & (~d)))
}

function hh(a: i64, b: i64, c: i64, d: i64, r: i64, s: i64, t: i64): i64 {
  return ee(r, s, t, a, b, b ^ c ^ d)
}

function ii(a: i64, b: i64, c: i64, d: i64, r: i64, s: i64, t: i64): i64 {
  return ee(r, s, t, a, b, c ^ (b | (~d)))
}

type i64 = number
const hs = '0123456789abcdef'
