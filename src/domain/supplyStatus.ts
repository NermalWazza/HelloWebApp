export type SupplyUrgency = 'ok' | 'watch' | 'low' | 'critical'

export interface SupplyStatus {
  medicationId: string
  daysRemaining: number
  urgency: SupplyUrgency
  summary: string
}
