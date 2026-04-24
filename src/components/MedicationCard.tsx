import type { Medication } from '../domain/medication'

interface Props {
  medications: Medication[]
}

export default function MedicationCard({ medications }: Props) {
  return (
    <div className="card">
      <h2 className="card-title">Medications</h2>
      <ul className="card-list">
        {medications.map((med) => (
          <li key={med.id} className="med-item">
            <span className="med-name">{med.name}</span>
            <span className="med-meta">
              {med.dose} &mdash; {med.frequency}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
