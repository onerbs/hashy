import { md5 } from '..'

const samples = [
  ['0cc175b9c0f1b6a831c399e269772661', 'a'],
  ['187ef4436122d1cc2f40dc2b92f0eba0', 'ab'],
  ['900150983cd24fb0d6963f7d28e17f72', 'abc'],
  ['e2fc714c4727ee9395f324cd2e7f331f', 'abcd'],
  ['ab56b4d92b40713acc5af89985d4b786', 'abcde'],
  ['63c1369df556b0afecc99b59ec958423', 'ab'.repeat(10)],
  ['f571117acbd8153c8dc3c81b8817773a', 'abc'.repeat(100)],
  // ['87584f4eafaceb788872dd289305fb4e', 'My text to hash 😊'],
]

test('MD5 function', () => {
  for (const [expected, sample] of samples) {
    const actual = md5.hash(sample)
    expect(actual).toBe(expected)
  }
})
