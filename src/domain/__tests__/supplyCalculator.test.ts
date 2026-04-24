import { describe, it, expect } from 'vitest'
import { calculateSupplyStatus } from '../supplyCalculator'

const medication = {
  id: 'demo-med',
  name: 'Demo Medication',
  dose: 'Demo dose',
  frequency: 'Demo frequency',
}

describe('calculateSupplyStatus', () => {
  describe('urgency thresholds', () => {
    it('returns ok when 28 days remaining', () => {
      const result = calculateSupplyStatus(medication, 28, 1)
      expect(result.daysRemaining).toBe(28)
      expect(result.urgency).toBe('ok')
      expect(result.medicationId).toBe('demo-med')
    })

    it('returns watch at exactly 14 days remaining', () => {
      const result = calculateSupplyStatus(medication, 14, 1)
      expect(result.daysRemaining).toBe(14)
      expect(result.urgency).toBe('watch')
    })

    it('returns low at exactly 7 days remaining', () => {
      const result = calculateSupplyStatus(medication, 7, 1)
      expect(result.daysRemaining).toBe(7)
      expect(result.urgency).toBe('low')
    })

    it('returns critical at exactly 2 days remaining', () => {
      const result = calculateSupplyStatus(medication, 2, 1)
      expect(result.daysRemaining).toBe(2)
      expect(result.urgency).toBe('critical')
    })
  })

  describe('guard conditions', () => {
    it('returns critical with daysRemaining 0 when tabletsPerDay is 0', () => {
      const result = calculateSupplyStatus(medication, 28, 0)
      expect(result.daysRemaining).toBe(0)
      expect(result.urgency).toBe('critical')
      expect(result.summary.toLowerCase()).toContain('invalid')
    })

    it('returns critical with daysRemaining 0 when tabletsRemaining is negative', () => {
      const result = calculateSupplyStatus(medication, -1, 1)
      expect(result.daysRemaining).toBe(0)
      expect(result.urgency).toBe('critical')
    })
  })

  describe('arithmetic', () => {
    it('floors fractional days', () => {
      // 10 tablets / 3 per day = 3.33 → floors to 3 → urgency low (3 <= 7)
      const result = calculateSupplyStatus(medication, 10, 3)
      expect(result.daysRemaining).toBe(3)
      expect(result.urgency).toBe('low')
    })

    it('includes daysRemaining in summary', () => {
      const result = calculateSupplyStatus(medication, 28, 1)
      expect(result.summary).toContain('28')
    })
  })
})
