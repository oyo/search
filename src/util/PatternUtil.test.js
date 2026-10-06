import { expect, test } from 'vite-plus/test'
import { isTypePattern, normDate } from './PatternUtil'

const values = {
  date: {
    known: [
      '2021-05-31',
      '2021-05-31 12:34',
      '2021-05-31 12:34:56',
      '20210115143958.0Z',
      '20210115143958',
      '20210423095713160',
      '1622706431174',
      '1628635183000',
    ],
    unknown: ['21-05-31', '21-05-31 12:34:56', 'erster Januar', '-2147483640'],
  },
}

const recognizes = (type) => {
  test(`recognizes ${type} patterns`, () => {
    values[type].known.forEach((v) => expect(isTypePattern(type, v)).toBe(true))
    values[type].unknown.forEach((v) => expect(isTypePattern(type, v)).toBe(false))
  })
}

recognizes('date')

test('normalizes dates', () => {
  values.date.known.forEach((v) => {
    expect(normDate(v)).not.toBe('Invalid Date')
  })
  values.date.unknown.forEach((v) => {
    expect(normDate(v)).toBe(v)
  })
})
