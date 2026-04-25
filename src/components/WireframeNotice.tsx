export default function WireframeNotice() {
  return (
    <div className="wireframe-notice">
      <p className="wireframe-description">
        A web-based medication tracking dashboard inspired by MedMon.
        Demonstrates React + TypeScript with a separated domain model,
        pure supply-status calculation, and security-baseline discipline.
      </p>
      <p className="wireframe-safe">
        <strong>Demo only</strong> &mdash; uses mock data only.
        No real patient or medical data.
      </p>
      <ul className="wireframe-features">
        <li>UI prototype &mdash; dashboard layout with four domain panels</li>
        <li>Supply status logic &mdash; pure arithmetic, four urgency tiers (ok / watch / low / critical)</li>
        <li>Domain separation &mdash; types isolated in <code>src/domain/</code></li>
        <li>Unit tests &mdash; supply calculator covered by Vitest (8 tests)</li>
        <li>Security baseline &mdash; pre-commit hooks, secret scanning, no real data in repo</li>
      </ul>
    </div>
  )
}
