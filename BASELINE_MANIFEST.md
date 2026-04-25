# BASELINE_MANIFEST.md

## Purpose

Documents the repo safety baseline: required files, validation commands, expected scan tools, and public release posture.

---

## Required Baseline Files

| File | Purpose |
|---|---|
| `.gitignore` | Excludes secrets, build artefacts, editor state, OS files |
| `.gitattributes` | Normalises line endings |
| `.pre-commit-config.yaml` | Configures pre-commit hooks |
| `.secrets.baseline` | detect-secrets known-safe baseline |
| `README.md` | Public-facing project description |
| `NEXT_STEPS.md` | Release checklist and forward work |
| `BASELINE_MANIFEST.md` | This file |
| `docs/Security_Model.md` | Data and persistence policy |

---

## Validation Commands

Run before every commit and before any public release:

```bash
npm test
npm run build
python -m pre_commit run --all-files
trufflehog filesystem --fail --no-update --only-verified .
detect-secrets scan --baseline .secrets.baseline
```

All commands must exit 0. Any failure is a blocker.

---

## Expected Scan Tools

| Tool | Version tested | Purpose |
|---|---|---|
| detect-secrets | via pre-commit | Baseline secret detection |
| TruffleHog | 3.94.3 | Verified secret detection |
| pre-commit | system | Hook orchestration |
| vitest | 4.1.5 | Unit tests |
| vite | 8.0.x | Build validation |

---

## .gitignore Key Exclusions

- `.env`, `.env.*` (credentials)
- `*.pem`, `secrets.*`
- `node_modules/`, `dist/`
- `.claude/`, `*.session.json` (AI session artefacts)
- `_Audit_Report/`

---

## Public Release Posture

- **No secrets** — confirmed by TruffleHog + detect-secrets on every commit
- **No real patient data** — mock data only; labelled in UI, code, and docs
- **No employer or internal references** — confirmed by audit
- **GitHub Pages** — deploys `dist/` build artefact only; source and docs are not published
- **No persistence** — app stores no user data; all data is static mock data in `src/data/mockData.ts`

---

## Audit History

| Date | Result | Notes |
|---|---|---|
| 2026-04-25 | PASS | Full release safety audit; local path advisory resolved |
