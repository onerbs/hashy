import { xxh32 } from '..'

const samples = [
  ['550d7456', 'a'],
  ['4999fc53', 'ab'],
  ['32d153ff', 'abc'],
  ['a3643705', 'abcd'],
  ['9738f19b', 'abcde'],
  ['244fbf7c', 'ab'.repeat(10)],
  ['55cad6be', 'abc'.repeat(100)],
  ['af7fd356', 'My text to hash 😊'],
]

test('xxHash32 function', () => {
  for (const [expected, sample] of samples) {
    const actual = xxh32.hash(sample)
    expect(actual).toBe(expected)
  }
})
