export default function WireframeNotice() {
  return (
    <div className="wireframe-notice">
      <p className="wireframe-problem">
        <strong>Problem:</strong> People can run out of medication without clear early warning.
      </p>
      <p className="wireframe-signal">
        <strong>Signal:</strong> This prototype shows a simple mock supply-status model that highlights risk before it becomes critical.
      </p>
      <p className="wireframe-safe">
        <strong>Demo only</strong> &mdash; uses mock data only. No real patient or medical data.
      </p>
      <ul className="wireframe-features">
        <li>React + TypeScript UI &mdash; component dashboard with four domain panels</li>
        <li>Separated domain model &mdash; types and logic isolated in <code>src/domain/</code></li>
        <li>Tested supply-status calculator &mdash; pure arithmetic, four urgency tiers, 8 Vitest tests</li>
      </ul>
    </div>
  )
}
