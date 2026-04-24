# Decision Log

## Decision_Initial_Repo

Created HelloWebApp as separate repo from MedMon.

---

## Decision_2026_04_24_Persistence_Strategy

**Status:** Accepted

**Date:** 2026-04-24

**Decision:**
HelloWebApp remains mock-data only for the current prototype phase.
No database, backend, browser storage, or file persistence will be introduced yet.

**Rationale:**

- UI and domain model are still stabilising across Phases 1–5.
- MedMon local SQLite database (`medmon.db`) was identified in Phase 5 as a possible real-data risk — 16 KB, written 2026-04-22, gitignored but present on disk.
- Introducing persistence too early increases privacy, security, and migration risk.
- Static mock data is sufficient for UI and domain model exploration at this stage.
- No threat model or data classification exists yet for HelloWebApp.

**Current Persistence:**

- Static TypeScript mock data only (`src/data/mockData.ts`).
- No browser `localStorage` or `sessionStorage`.
- No `IndexedDB`.
- No SQLite, PostgreSQL, or any other database.
- No API backend.
- No file system writes from the application.

**Future Candidates:**

- SQLite may be suitable for a local-only prototype persistence layer later.
- PostgreSQL may be considered only if multi-user or server deployment becomes a real requirement.
- Any future persistence layer requires a threat model, data classification, and explicit approval before implementation.

**Consequences:**

- Less functionality now — data does not survive page refresh.
- Lower data risk — no real user data can enter the system.
- Clearer separation between domain, UI, and future storage layers.
- Real medication data remains out of the repository and out of the application.
