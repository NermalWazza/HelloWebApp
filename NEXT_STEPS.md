# NEXT_STEPS.md

## Status

Phases 1–13 complete. App is a working mock-data demo deployed to GitHub Pages.

---

## Release Checklist (public demo)

- [x] No secrets, tokens, or API keys in repo
- [x] No real patient or medical data in repo
- [x] No employer, government, or internal references
- [x] Secret scanning configured and passing (detect-secrets, TruffleHog)
- [x] GitHub Pages workflow deploys `dist/` only
- [x] Mock data labelled as demo data in UI and code
- [x] Security model documented in `docs/Security_Model.md`
- [ ] BASELINE_MANIFEST.md validated against current tooling

---

## Optional Hardening

- Replace generic medication names in `mockData.ts` with clearly fictional names if re-identification risk is a concern
- Add a `SECURITY.md` with a responsible disclosure contact
- Pin pre-commit hook versions for reproducible scans

---

## Future Demo Improvements

- Add persistence layer (browser `localStorage` or IndexedDB) — requires threat model first (see `docs/Security_Model.md`)
- Add dose logging UI (taken / skipped per medication)
- Add supply status column with days-remaining per medication
- Add urgency panel (doctor visit required / call-by date)
- Responsive/mobile layout pass

---

## Standing Rules

- No secrets or real patient data enters this repo at any time
- No persistence layer without a completed threat model and data classification review
- Validate with `npm test && npm run build && python -m pre_commit run --all-files` before every commit
