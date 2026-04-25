# Security Model

No secrets. No real patient data. Local prototype only.

---

## Persistence Boundary

**Current state:** HelloWebApp stores no user data of any kind.

- All application data is static mock data defined in `src/data/mockData.ts`.
- Mock data is non-real, contains no patient identifiers, and is explicitly labelled as demo data.
- No real medication, patient, carer, clinician, or health data is permitted in this repository at any time.

**MedMon database boundary:**

- `<external_reference_project_path>/MedMon/medmon.db` was identified in Phase 5 as a local SQLite database that may contain real usage data.
- That file must not be read, imported, copied, seeded, migrated, or transformed into HelloWebApp under any circumstances.
- MedMon is a reference project only. Data does not cross the boundary.

**Future persistence requirements:**

Any future persistence layer introduced to HelloWebApp must first complete a separate design review that defines:

- Data classification — what categories of data are stored and at what sensitivity level.
- Encryption approach — at rest and in transit.
- Backup and restore rules — what is retained, for how long, and by whom.
- Deletion and export rules — user-controlled data removal and portability.
- Audit and logging boundary — what is logged, where, and who can access it.
- Local vs server trust boundary — whether data leaves the user's device and under what conditions.

No persistence layer may be added until this review is complete and approved.
