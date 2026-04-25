import type { ScheduleItem } from '../domain/schedule'
import type { Medication } from '../domain/medication'

interface Props {
  schedule: ScheduleItem[]
  medications: Medication[]
}

export default function ScheduleCard({ schedule, medications }: Props) {
  const nameById = Object.fromEntries(medications.map((m) => [m.id, m.name]))

  return (
    <div className="card">
      <h2 className="card-title">Schedule <span className="section-label">(Prototype)</span></h2>
      <ul className="card-list">
        {schedule.map((entry) => (
          <li key={entry.id} className="schedule-item">
            <span className="schedule-time">{entry.time}</span>
            <span className="schedule-med">{nameById[entry.medicationId] ?? entry.medicationId}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
