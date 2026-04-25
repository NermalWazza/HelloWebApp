# HelloWebApp

Standalone React/Vite prototype inspired by MedMon.
Demonstrates medication-dashboard UX patterns using **sample data only**.

---

## Rules / Safety

- No secrets
- No real patient data
- No medical advice logic
- No direct MedMon code reuse

---

## Demo / Sandbox

### Option 1 — GitHub Codespaces (1-click)

1. Click **Code** → **Codespaces**
2. Click **Create codespace on `nwlocal`**
3. Wait for environment
4. Run:

```bash
npm install
npm run dev
```

---

### Option 2 — Local Run (fastest)

```bash
git clone https://github.com/NermalWazza/HelloWebApp.git
cd HelloWebApp
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

### Option 3 — Production Preview

```bash
npm run build
npm run preview
```

---

### Option 4 — GitHub Pages (live)

```
https://nermalwazza.github.io/HelloWebApp/
```

Deployed automatically on push to `main` via `.github/workflows/deploy.yml`.

> One-time setup required: GitHub → Settings → Pages → Source → **GitHub Actions**

---

## Development

```bash
npm install
npm run dev
npm run test
npm run build
```

---

## Validation (Required Before Commit)

```bash
npm run test
npm run build
python -m pre_commit run --all-files
```

All must pass:

- Tests (Vitest)
- Build (TypeScript + Vite)
- Secret scanning (detect-secrets, TruffleHog)

---

## Stack

- Vite
- React
- TypeScript
- Vitest
- ESLint

---

## Roadmap

See [PLAN.md](PLAN.md).

---

## Intent

This repo is a **controlled, demonstrable system**:

- Clear UX signal > complexity
- Deterministic behaviour
- No hidden data or logic

Used for portfolio demonstration, safe iteration, and AI-assisted workflows.
