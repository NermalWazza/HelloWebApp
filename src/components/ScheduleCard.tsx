import type { ScheduleEntry } from '../data/mockData'

interface Props {
  schedule: ScheduleEntry[]
}

export default function ScheduleCard({ schedule }: Props) {
  return (
    <div className="card">
      <h2 className="card-title">Today&rsquo;s Schedule</h2>
      <ul className="card-list">
        {schedule.map((entry) => (
          <li key={entry.id} className="schedule-item">
            <span className="schedule-time">{entry.time}</span>
            <span className="schedule-med">{entry.medicationName}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
