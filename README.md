# HelloWebApp

[![Deploy](https://github.com/NermalWazza/HelloWebApp/actions/workflows/deploy.yml/badge.svg)](https://github.com/NermalWazza/HelloWebApp/actions/workflows/deploy.yml)

A medication-supply dashboard prototype built with React, TypeScript, and Vite.
Demonstrates domain modelling, urgency-tier UX, and a clean component architecture — using **mock data only**.

> **Live demo:** [nermalwazza.github.io/HelloWebApp](https://nermalwazza.github.io/HelloWebApp/)

---

## What it demonstrates

- React component architecture with typed domain models
- Supply-status calculation with multi-tier urgency logic (OK / Watch / Low / Critical)
- Interactive demo toggle ("Simulate low supply") that exercises the full urgency range
- Alert and notes panels driven by structured mock data
- Vitest unit tests covering the supply calculator
- Pre-commit secret scanning (detect-secrets + TruffleHog) integrated into the dev workflow
- GitHub Pages CI/CD via GitHub Actions

---

## Medical disclaimer

**This is a software portfolio demonstration, not a medical product.**

- All data is fictional and hard-coded for display purposes only.
- This app provides no medical advice, diagnosis, treatment guidance, or clinical decision support.
- No patient, carer, or clinician data has been used or is stored anywhere in this repository.
- Do not use this as a basis for medication management, health decisions, or clinical workflows.

---

## Quick start

### Option 1 — Live demo (no install)

Visit: **[nermalwazza.github.io/HelloWebApp](https://nermalwazza.github.io/HelloWebApp/)**

Click **Simulate low supply** to see the urgency-tier logic in action.

---

### Option 2 — Local run

```bash
git clone https://github.com/NermalWazza/HelloWebApp.git
cd HelloWebApp
npm install
npm run dev
```

Open: `http://localhost:5173`

---

### Option 3 — GitHub Codespaces (browser IDE)

1. Click **Code** → **Codespaces** → **Create codespace on `main`**
2. Wait for the environment to initialise
3. Run:

```bash
npm install
npm run dev
```

Then open the forwarded port in your browser.

---

### Option 4 — Production build preview

```bash
npm run build
npm run preview
```

---

## What you'll see

The dashboard renders four panels:

| Panel | Content |
|---|---|
| **Medications** | Four mock medications with supply levels and urgency badges |
| **Schedule** | Daily dose schedule (morning / midday / evening) |
| **Alerts** | Structured alert list with severity indicators |
| **Notes** | Demo note log |

Use the **Simulate low supply** button to drive the Lisinopril supply to critical and observe the urgency-tier display change across the medication card and alert panel.

---

## Security

- No secrets, tokens, API keys, or credentials of any kind are present in this repository.
- No real patient data, medication records, or personal information is present.
- No data is stored, transmitted, or persisted — all data is static TypeScript constants.
- Secret scanning runs automatically on every commit (detect-secrets + TruffleHog).
- GitHub Pages deploys only the compiled `dist/` artefact — no source or configuration files are published.
- Full security model: [`docs/Security_Model.md`](docs/Security_Model.md)

---

## Known limitations

- **No persistence** — all state resets on page refresh; this is by design for a mock-only demo.
- **No authentication** — single-user, local-only prototype; no login, sessions, or accounts.
- **No backend** — all data is static mock data; there is no API, database, or server.
- **No real supply tracking** — tablet counts are fixed demo values, not entered by a user.
- **Codespaces warm-up** — first-time Codespaces launch may take 1–2 minutes to initialise.

---

## Development

```bash
npm install       # install dependencies
npm run dev       # start dev server (hot reload)
npm run test      # run unit tests (Vitest)
npm run build     # production build (TypeScript + Vite)
```

### Validation (required before every commit)

```bash
npm run test
npm run build
python -m pre_commit run --all-files
```

All three must pass. Pre-commit runs detect-secrets and TruffleHog automatically.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styles | CSS (custom properties) |
| Tests | Vitest |
| Linting | ESLint |
| Secret scanning | detect-secrets + TruffleHog |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Repository structure

```
src/
  components/     React UI components
  data/           Mock data (mockData.ts)
  domain/         Pure domain types and calculators
    __tests__/    Unit tests
docs/
  Security_Model.md
  Decision_Log.md
  MedMon_Source_Notes.md
.github/workflows/deploy.yml   GitHub Pages deploy
```

---

## Portfolio context

Built as a controlled, demonstrable system for portfolio and AI-assisted development workflows:

- Deterministic, auditable behaviour — no hidden state or logic
- Clean separation of domain, data, and UI layers
- End-to-end baseline: secret scanning, typed models, unit tests, CI/CD
- Designed to be readable and reviewable by another developer or AI in a single session
