import { describe, expect, it } from 'vitest'

describe('app/utils/formatNumber.ts', () => {
  it('should format numbers', () => {
    const number1 = 10000
    const number2 = 100
    const expected1 = '10,000'
    const expected2 = '100'

    const result1 = formatNumber(number1)
    const result2 = formatNumber(number2)
    expect(result1).toBe(expected1)
    expect(result2).toBe(expected2)
  })
})
