import { describe, expect, it } from 'vitest'
import { formatPrice, titleCase } from './format'

describe('display formatting', () => {
  it('uses Indian rupee grouping without decimal places', () => {
    expect(formatPrice(125000)).toBe('₹1,25,000')
  })
  it('turns route slugs into readable titles', () => {
    expect(titleCase('gym-and-training')).toBe('Gym And Training')
  })
})
