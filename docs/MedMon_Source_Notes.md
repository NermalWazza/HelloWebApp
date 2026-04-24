# MedMon Source Notes

## Review Date

2026-04-24

## Review Boundary

- MedMon reviewed read-only at `C:\GFS\DEV\MedMon`.
- No code copied into HelloWebApp.
- No MedMon files modified.
- HelloWebApp remains a separate, clean implementation.

---

## MedMon Source Observations

### Project type

C# / .NET 8 console application. Interactive terminal UI using Spectre.Console. Local SQLite persistence via `Microsoft.Data.Sqlite`. Optional OpenAI API integration via `DotNetEnv` + `OpenAI` SDK.

### Source structure

```
MedMon/
  Program.cs              entry point + all TUI view logic
  Models/
    Medication.cs         domain model: supply and script metadata
    DoseLog.cs            domain model: per-dose event record
  Data/
    Database.cs           SQLite CRUD (parameterised queries)
  Services/
    TrackerService.cs     supply calculations + urgency logic
    AiService.cs          optional OpenAI summary (graceful disable if no key)
  .env.example            OPENAI_API_KEY=  (template only, no value)
  medmon.db               local SQLite file (not committed — gitignored)
  scripts/                audit, git, setup README stubs
  templates/              env/vscode/docs templates
  hooks/                  git hook scaffolding
```

### Apparent purpose

Personal medication supply tracker for a single user. Core use case: know when you need to call a doctor for a repeat prescription, accounting for doctor lead time and tablet supply arithmetic. Dose logging (taken / skipped) feeds into supply calculations.

---

## Reusable Concepts

### Domain model

| MedMon field | Purpose | HelloWebApp status |
|---|---|---|
| `Name` | Medication display name | Present in `Medication` |
| `Chemical` | Generic/active ingredient | Not yet in HelloWebApp |
| `PacksOwned` + `TabletsPerPack` | Physical stock | Not yet |
| `DosagePerDay` | Consumption rate (tablets/day) | Not yet |
| `Repeats` / `RepeatsLeft` | Script repeats tracking | Not yet |
| `AlertDaysBeforeLast` | User-configurable early warning | Not yet |
| `DoctorAvailabilityWeeks` | Lead time for appointments | Not yet |

`DoseLog` (medicationId, date, taken/skipped) is a clean event-log model worth preserving.

### Supply calculation logic (TrackerService)

Clear, well-scoped arithmetic:

- `tabletsRemaining = packsOwned × tabletsPerPack − dosesTaken`
- `daysSupply = tabletsRemaining / dosagePerDay`
- `alertReached = daysSupply ≤ alertDaysBeforeLast`
- `visitRequired = daysSupply ≤ doctorLeadDays OR repeatsLeft == 0`
- `latestCallDate = today + (daysSupply − doctorLeadDays)`

This logic is sound for the stated use case. It should be treated as reference arithmetic, not copied code.

### Alert model

Three-tier urgency: OK → ALERT (approaching threshold) → VISIT NEEDED (immediate action). Maps cleanly to the `AlertSeverity` type already defined in HelloWebApp (`info` / `warning` / `critical`).

### AI integration pattern

`AiService` is correctly guarded — it degrades gracefully when `OPENAI_API_KEY` is absent. The prompt passes a structured status summary, not raw personal data fields. Pattern is reusable but must not be introduced to HelloWebApp until a data-minimisation review is done.

### Baseline / safety discipline

MedMon uses the same Repo_Safety_Baseline pattern (`.pre-commit-config.yaml`, `.secrets.baseline`, `.gitattributes`), `.env.example` with empty values, and `.gitignore` that excludes `.env` and `medmon.db`. The approach is sound and already adopted in HelloWebApp.

---

## Rejected / Deferred Items

| Item | Reason |
|---|---|
| `Program.cs` view logic | Monolithic — all UI and routing in one file. Not a pattern to replicate. |
| `Database.cs` raw ADO.NET | Manual SQL strings, no ORM/migration tooling. Acceptable for a prototype but not directly portable to a web stack. |
| Spectre.Console | Terminal-only UI library. Irrelevant to HelloWebApp (web-first). |
| OpenAI API integration | Introduces external data transmission. Deferred until threat model and data-minimisation policy are defined. |
| `medmon.db` data | Excluded entirely — may contain real usage data (see Security section). |
| `Chemical` field | Useful concept, deferred — not needed for current UI prototype. |
| Dose logging | Correct domain concept; deferred to persistence phase (Phase 5+). |
| Supply arithmetic | Conceptually correct; deferred to when HelloWebApp has a data model and persistence layer. |

---

## Security / Privacy Risks

### medmon.db — local database (HIGH attention warranted)

- File is **present on disk** (`C:\GFS\DEV\MedMon\medmon.db`, 16 KB, last written 2026-04-22).
- Correctly excluded from git via `.gitignore` — not in the repository.
- However, 16 KB indicates active use; the file likely contains real medication records and dose logs.
- **Risk:** if the MedMon repo is ever shared, cloned, or backed up carelessly, this file could travel with it.
- **Recommendation:** confirm `.gitignore` is working; consider encrypting or deleting the DB before any repo export.

### OpenAI API integration (MEDIUM)

- `AiService` constructs a plaintext prompt that includes medication names, chemical names, tablets remaining, repeats left, and doctor visit status.
- This data is transmitted to OpenAI's API endpoint.
- No PII fields (patient name, DOB, address) are present in the domain model — but medication names + dose schedules can be re-identifying in context.
- **Recommendation:** do not replicate this pattern in HelloWebApp without a data-minimisation review and explicit user consent model.

### .env.example — no secrets present

- `OPENAI_API_KEY=` is an empty template value only.
- No live `.env` file found on disk — no API key exposed in the filesystem at time of review.
- `templates/env/sample.env.example` also contains only placeholder keys (`API_KEY=`, `API_URL=`).

### Baseline compliance

- MedMon `NEXT_STEPS.md` indicates pre-commit has not been fully set up (no first commit made at that point).
- `TODO.md` has only one unchecked item (verify baseline before git pull/push).
- Status: baseline applied but not fully exercised.

---

## Candidate Future Work

### Domain refinements

- Extend `Medication` with `Chemical`, `PacksOwned`, `TabletsPerPack`, `DosagePerDay`, `Repeats`, `RepeatsLeft`, `AlertDaysBeforeLast`, `DoctorAvailabilityWeeks`.
- Add `DoseLog` domain type (event log: medicationId, date, taken/skipped).
- Add computed `MedicationStatus` (derived view model, not stored).

### UI refinements

- Supply status column per medication (days remaining, urgency band).
- Dose log history view (last N days, taken/skipped).
- Urgent items panel (doctor visit required).

### Persistence decision (Phase 5+)

- Options: browser `localStorage`, IndexedDB, or a lightweight server-side store.
- SQLite-over-HTTP (e.g. Turso) is a reasonable future choice; keep the domain model portable.
- Decision should be made before adding any real data entry to the UI.

### Validation / threat model

- Define what data HelloWebApp is permitted to store.
- Confirm no data leaves the device without explicit user action.
- Review AI integration constraints before adding any LLM features.

---

## Decision

HelloWebApp continues as a separate, clean implementation inspired by MedMon — not a direct fork or copy.

The domain concepts (supply arithmetic, urgency tiers, dose logging) are sound and worth preserving as future reference. The MedMon implementation is not directly portable due to stack differences (C# console vs TypeScript web) and the absence of a threat model for the web context.

No MedMon code has been copied into HelloWebApp.
