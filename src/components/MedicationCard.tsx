import type { Medication } from '../domain/medication'
import type { SupplyStatus } from '../domain/supplyStatus'

interface Props {
  medications: Medication[]
  supplyStatuses?: SupplyStatus[]
}

const urgencyLabel: Record<SupplyStatus['urgency'], string> = {
  ok: 'OK',
  watch: 'Review threshold',
  low: 'Low',
  critical: 'Critical',
}

export default function MedicationCard({ medications, supplyStatuses }: Props) {
  const statusById = Object.fromEntries(
    (supplyStatuses ?? []).map((s) => [s.medicationId, s]),
  )

  return (
    <div className="card">
      <h2 className="card-title">Medications <span className="section-label">(Mock Data)</span></h2>
      <ul className="card-list">
        {medications.map((med) => {
          const status = statusById[med.id]
          return (
            <li key={med.id} className="med-item">
              <div className="med-header">
                <span className="med-name">{med.name}</span>
                {status && (
                  <span className={`supply-badge supply-${status.urgency}`}>
                    {urgencyLabel[status.urgency]}
                  </span>
                )}
              </div>
              <span className="med-meta">
                {med.dose} &mdash; {med.frequency}
              </span>
              {status && (
                <span className="supply-summary">
                  Supply status: {status.summary}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
