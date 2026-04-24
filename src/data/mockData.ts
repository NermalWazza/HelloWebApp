export interface Medication {
  id: string
  name: string
  dose: string
  frequency: string
}

export interface ScheduleEntry {
  id: string
  time: string
  medicationName: string
}

export type AlertSeverity = 'info' | 'warning' | 'critical'

export interface Alert {
  id: string
  text: string
  severity: AlertSeverity
}

export interface Note {
  id: string
  text: string
  timestamp: string
}

export const medications: Medication[] = [
  { id: 'm1', name: 'Lisinopril', dose: '10 mg', frequency: 'Once daily (morning)' },
  { id: 'm2', name: 'Metformin', dose: '500 mg', frequency: 'Twice daily (with meals)' },
  { id: 'm3', name: 'Atorvastatin', dose: '20 mg', frequency: 'Once daily (evening)' },
  { id: 'm4', name: 'Aspirin', dose: '100 mg', frequency: 'Once daily (morning)' },
]

export const schedule: ScheduleEntry[] = [
  { id: 's1', time: '08:00', medicationName: 'Lisinopril' },
  { id: 's2', time: '08:00', medicationName: 'Metformin' },
  { id: 's3', time: '08:00', medicationName: 'Aspirin' },
  { id: 's4', time: '13:00', medicationName: 'Metformin' },
  { id: 's5', time: '21:00', medicationName: 'Atorvastatin' },
]

export const alerts: Alert[] = [
  { id: 'a1', text: 'Evening dose due at 21:00', severity: 'info' },
  { id: 'a2', text: 'Refill needed: Metformin (5 days remaining)', severity: 'warning' },
  { id: 'a3', text: 'Next GP review: 2026-05-10', severity: 'info' },
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
