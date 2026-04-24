import type { Medication } from '../domain/medication'
import type { ScheduleItem } from '../domain/schedule'
import type { Alert } from '../domain/alert'
import type { Note } from '../domain/note'

export interface MockSupplyInput {
  medicationId: string
  tabletsRemaining: number
  tabletsPerDay: number
}

export const medications: Medication[] = [
  { id: 'm1', name: 'Lisinopril', dose: '10 mg', frequency: 'Once daily (morning)' },
  { id: 'm2', name: 'Metformin', dose: '500 mg', frequency: 'Twice daily (with meals)' },
  { id: 'm3', name: 'Atorvastatin', dose: '20 mg', frequency: 'Once daily (evening)' },
  { id: 'm4', name: 'Aspirin', dose: '100 mg', frequency: 'Once daily (morning)' },
]

export const schedule: ScheduleItem[] = [
  { id: 's1', time: '08:00', medicationId: 'm1' },
  { id: 's2', time: '08:00', medicationId: 'm2' },
  { id: 's3', time: '08:00', medicationId: 'm4' },
  { id: 's4', time: '13:00', medicationId: 'm2' },
  { id: 's5', time: '21:00', medicationId: 'm3' },
]

export const alerts: Alert[] = [
  { id: 'a1', message: 'Evening dose due at 21:00', severity: 'info' },
  { id: 'a2', message: 'Refill needed: Metformin (5 days remaining)', severity: 'warning' },
  { id: 'a3', message: 'Next GP review: 2026-05-10', severity: 'info' },
]

// Demo supply values — fake numbers only, no real patient data.
// One entry per urgency tier to exercise the full range in the UI.
// m1 Lisinopril:   28 tablets, 1/day = 28 days → ok
// m2 Metformin:    10 tablets, 2/day =  5 days → low
// m3 Atorvastatin: 14 tablets, 1/day = 14 days → watch
// m4 Aspirin:       2 tablets, 1/day =  2 days → critical
export const mockSupplyInputs: MockSupplyInput[] = [
  { medicationId: 'm1', tabletsRemaining: 28, tabletsPerDay: 1 },
  { medicationId: 'm2', tabletsRemaining: 10, tabletsPerDay: 2 },
  { medicationId: 'm3', tabletsRemaining: 14, tabletsPerDay: 1 },
  { medicationId: 'm4', tabletsRemaining: 2,  tabletsPerDay: 1 },
]

export const notes: Note[] = [
  {
    id: 'n1',
    text: 'Demo note: reported mild fatigue this week — flagged for next review.',
    timestamp: '2026-04-24 09:15',
  },
  {
    id: 'n2',
    text: 'Demo note: BP reading within target range. Continue current plan.',
    timestamp: '2026-04-24 08:00',
  },
  {
    id: 'n3',
    text: 'Demo note: mock data only — no real patient information stored here.',
    timestamp: '2026-04-23 17:30',
  },
]
