export type AlertSeverity = 'info' | 'warning' | 'critical'

export interface Alert {
  id: string
  message: string
  severity: AlertSeverity
}
