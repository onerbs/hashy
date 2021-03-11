import { sha1 } from '..'

const samples = [
  ['86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', 'a'],
  ['da23614e02469a0d7c7bd1bdab5c9c474b1904dc', 'ab'],
  ['a9993e364706816aba3e25717850c26c9cd0d89d', 'abc'],
  ['81fe8bfe87576c3ecb22426f8e57847382917acf', 'abcd'],
  ['03de6c570bfe24bfc328ccd7ca46b76eadaf4334', 'abcde'],
  ['8b7940c9d8e26a2f78b83fb54d0bb7bf93c40b74', 'ab'.repeat(10)],
  ['c95466320eaae6d19ee314ae4f135b12d45ced9a', 'abc'.repeat(100)],
  ['e52b27b4388a3ae59a03c190b1c2277adb78badf', 'My text to hash 😊'],
]

test('SHA-1 function', () => {
  for (const [expected, sample] of samples) {
    const actual = sha1.hash(sample)
    expect(actual).toBe(expected)
  }
})
