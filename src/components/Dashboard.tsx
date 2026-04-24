import MedicationCard from './MedicationCard'
import ScheduleCard from './ScheduleCard'
import AlertPanel from './AlertPanel'
import NotesPanel from './NotesPanel'
import { medications, schedule, alerts, notes, mockSupplyInputs } from '../data/mockData'
import { calculateSupplyStatus } from '../domain/supplyCalculator'

const supplyStatuses = mockSupplyInputs.map((input) => {
  const med = medications.find((m) => m.id === input.medicationId)!
  return calculateSupplyStatus(med, input.tabletsRemaining, input.tabletsPerDay)
})

export default function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">HelloWebApp &mdash; MedMon Prototype</h1>
        <span className="dashboard-badge">Mock data only &mdash; no real patient data</span>
      </header>
      <main className="dashboard-grid">
        <MedicationCard medications={medications} supplyStatuses={supplyStatuses} />
        <ScheduleCard schedule={schedule} medications={medications} />
        <AlertPanel alerts={alerts} />
        <NotesPanel notes={notes} />
      </main>
    </div>
  )
}
