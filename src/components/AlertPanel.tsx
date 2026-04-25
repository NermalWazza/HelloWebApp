import type { Alert } from '../domain/alert'

interface Props {
  alerts: Alert[]
}

const severityLabel: Record<Alert['severity'], string> = {
  info: 'Info',
  warning: 'Warning',
  critical: 'Critical',
}

export default function AlertPanel({ alerts }: Props) {
  return (
    <div className="card">
      <h2 className="card-title">Alerts <span className="section-label">(Demo)</span></h2>
      {alerts.length === 0 ? (
        <p className="empty-state">No active alerts.</p>
      ) : (
        <ul className="card-list">
          {alerts.map((alert) => (
            <li key={alert.id} className={`alert-item alert-${alert.severity}`}>
              <span className="alert-badge">{severityLabel[alert.severity]}</span>
              <span className="alert-text">{alert.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
