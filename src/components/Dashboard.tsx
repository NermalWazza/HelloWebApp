import MedicationCard from './MedicationCard'
import ScheduleCard from './ScheduleCard'
import AlertPanel from './AlertPanel'
import NotesPanel from './NotesPanel'
import { medications, schedule, alerts, notes } from '../data/mockData'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">HelloWebApp &mdash; MedMon Prototype</h1>
        <span className="dashboard-badge">Mock data only &mdash; no real patient data</span>
      </header>
      <main className="dashboard-grid">
        <MedicationCard medications={medications} />
        <ScheduleCard schedule={schedule} medications={medications} />
        <AlertPanel alerts={alerts} />
        <NotesPanel notes={notes} />
      </main>
    </div>
  )
}
