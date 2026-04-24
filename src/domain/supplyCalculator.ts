import type { Medication } from './medication'
import type { SupplyStatus, SupplyUrgency } from './supplyStatus'

export function calculateSupplyStatus(
  medication: Medication,
  tabletsRemaining: number,
  tabletsPerDay: number,
): SupplyStatus {
  // No medical advice.
  // Simple arithmetic only.
  // Guard divide-by-zero / invalid values.

  if (tabletsRemaining < 0 || tabletsPerDay <= 0) {
    return {
      medicationId: medication.id,
      daysRemaining: 0,
      urgency: 'critical',
      summary: 'Supply status unavailable due to invalid mock values.',
    }
  }

  const daysRemaining = Math.floor(tabletsRemaining / tabletsPerDay)

  let urgency: SupplyUrgency = 'ok'

  if (daysRemaining <= 2) {
    urgency = 'critical'
  } else if (daysRemaining <= 7) {
    urgency = 'low'
  } else if (daysRemaining <= 14) {
    urgency = 'watch'
  }

  return {
    medicationId: medication.id,
    daysRemaining,
    urgency,
    summary: `${daysRemaining} days remaining based on mock supply values.`,
  }
}
