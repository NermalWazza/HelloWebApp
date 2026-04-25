import { useState } from 'react'
import MedicationCard from './MedicationCard'
import ScheduleCard from './ScheduleCard'
import AlertPanel from './AlertPanel'
import NotesPanel from './NotesPanel'
import WireframeNotice from './WireframeNotice'
import { medications, schedule, alerts, notes, mockSupplyInputs } from '../data/mockData'
import { calculateSupplyStatus } from '../domain/supplyCalculator'
import type { MockSupplyInput } from '../data/mockData'

export default function Dashboard() {
  const [simulateLow, setSimulateLow] = useState(false)

  const supplyInputs: MockSupplyInput[] = simulateLow
    ? mockSupplyInputs.map((input) =>
        input.medicationId === 'm1'
          ? { medicationId: 'm1', tabletsRemaining: 1, tabletsPerDay: 1 }
          : input,
      )
    : mockSupplyInputs

  const supplyStatuses = supplyInputs.map((input) => {
    const med = medications.find((m) => m.id === input.medicationId)!
    return calculateSupplyStatus(med, input.tabletsRemaining, input.tabletsPerDay)
  })

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">HelloWebApp &mdash; MedMon Prototype</h1>
        <span className="dashboard-badge">Mock data only &mdash; no real patient data</span>
      </header>
      <WireframeNotice />
      <div className="demo-toggle-row">
        <button
          className={`demo-toggle-btn${simulateLow ? ' demo-toggle-btn--active' : ''}`}
          onClick={() => setSimulateLow((v) => !v)}
          type="button"
        >
          {simulateLow ? 'Reset supply' : 'Simulate low supply'}
        </button>
        {simulateLow && (
          <span className="demo-active-indicator">Demo mode: Lisinopril supply reduced to 1 tablet.</span>
        )}
        <span className="demo-toggle-label">Demo interaction &mdash; does not store data</span>
      </div>
      <main className="dashboard-grid">
        <MedicationCard medications={medications} supplyStatuses={supplyStatuses} />
        <ScheduleCard schedule={schedule} medications={medications} />
        <AlertPanel alerts={alerts} />
        <NotesPanel notes={notes} />
      </main>
    </div>
  )
}
