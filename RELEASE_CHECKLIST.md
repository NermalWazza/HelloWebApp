# RELEASE_CHECKLIST.md

**Project:** HelloWebApp
**Branch:** main (candidate; nwlocal is one commit behind — see note)
**HEAD:** fc6f67a → Resolve public release hygiene: scrub local paths, add baseline artefacts
**Audit date:** 2026-04-25
**Auditor:** Claude Sonnet 4.6 (read-only; no changes without approval)

---

## 1. Repo State

| Item | Value |
|---|---|
| Working tree | Clean (no uncommitted changes at audit time) |
| `main` HEAD | `fc6f67a` |
| `origin/main` | `fc6f67a` (in sync) |
| `nwlocal` HEAD | `f0adf96` (1 commit behind main — hygiene commit not yet merged) |
| Remote | `https://github.com/NermalWazza/HelloWebApp.git` |
| Total commits | 18 |
| Divergence | None within branch; `nwlocal` simply lags `main` by one commit |

**Branch note:** Release candidate is `main`. If `nwlocal` is intended as the public-facing branch, fast-forward it to `main` (`git push origin main:nwlocal`) before publishing.

---

## 2. Security Audit

### Secret scanning

| Tool | Result | Detail |
|---|---|---|
| `trufflehog filesystem --only-verified` | **PASS** | 18,111 chunks scanned; 0 verified secrets; 0 unverified secrets (exit 0) |
| `detect-secrets scan --baseline` | **PASS** | exit 0; no new findings |
| `pre-commit run --all-files` | **PASS** | All hooks passed: large files, EOF, whitespace, detect-secrets, TruffleHog |

### Manual audit findings

| Category | Result | Evidence |
|---|---|---|
| API keys / tokens | **CLEAR** | All matches are documentation references or tooling config |
| Connection strings | **CLEAR** | None found |
| Private URLs | **CLEAR** | Only `localhost:5173` (dev server reference, appropriate) |
| Email addresses | **CLEAR** | Zero matches |
| Phone numbers | **CLEAR** | Zero matches |
| Personal / patient data | **CLEAR** | Mock data uses generic medication names; no identifiers |
| `.env` files | **CLEAR** | No `.env` files present; `.gitignore` excludes them |
| Local path leakage | **RESOLVED** | Previously present in 4 docs; replaced with placeholders in commit `fc6f67a` |
| Employer / internal refs | **CLEAR** | None found |
| Government / clinical refs | **CLEAR** | None found |
| Large files / build artefacts | **CLEAR** | `dist/` and `node_modules/` gitignored; no committed binaries |

---

## 3. Build and Test

| Check | Result |
|---|---|
| `npm test` | **PASS** — 8/8 tests (Vitest) |
| `npm run build` | **PASS** — 25 modules, clean output, no TypeScript errors |
| `pre-commit run --all-files` | **PASS** — all 5 hooks |
| `trufflehog` (standalone) | **PASS** |
| `detect-secrets` (standalone) | **PASS** |

---

## 4. Baseline Artefacts

| File | Status |
|---|---|
| `.gitignore` | Present |
| `.gitattributes` | Present |
| `.pre-commit-config.yaml` | Present |
| `.secrets.baseline` | Present |
| `README.md` | Present — upgraded for public demo |
| `NEXT_STEPS.md` | Present — added in `fc6f67a` |
| `BASELINE_MANIFEST.md` | Present — added in `fc6f67a` |
| `RELEASE_CHECKLIST.md` | Present — this file |
| `docs/Security_Model.md` | Present |

---

## 5. README Assessment

| Requirement | Status |
|---|---|
| Clear project purpose | Met |
| Screenshot / visual reference | Met (live Pages URL provided) |
| Local install steps | Met |
| Demo / sandbox steps | Met (4 options) |
| Portfolio framing | Met |
| Security statement | Met (dedicated section + link to Security_Model.md) |
| Medical disclaimer | Met (prominent disclaimer section) |
| Known limitations | Met (dedicated section, 5 items) |
| No false claims | Verified — all statements match source code |
| No sensitive data | Verified |

---

## 6. Risk Assessment

| Risk | Severity | Status |
|---|---|---|
| Secrets or credentials in repo | Critical | **CLEAR** — confirmed by three independent tools |
| Real patient data in repo | Critical | **CLEAR** — mock data only; labelled in UI and docs |
| Local path disclosure | Low | **RESOLVED** — scrubbed in commit `fc6f67a` |
| `nwlocal` branch behind `main` | Low | **Advisory** — fast-forward if that branch is the demo target |
| `medmon.db` on local disk (sibling project) | Low (external) | **Advisory** — not in this repo; gitignored; documented in Security_Model.md |
| No screenshot in repo | Cosmetic | **Advisory** — live Pages URL serves as visual reference |
| `src/assets/hero.png` not used in source | Cosmetic | **Advisory** — unused asset; can be removed or wired up |
| Missing persistence disclaimer | None | **Resolved** — "Known limitations" section added to README |

---

## 7. Release Verdict

### **SAFE TO PUBLISH**

All critical checks pass. No secrets, no personal data, no sensitive disclosures. Build and tests are clean. README is ready for a public portfolio audience.

---

## 8. Manual Steps to Publish

### Make repository public (when ready)

1. Go to `https://github.com/NermalWazza/HelloWebApp`
2. **Settings** → **General** → scroll to **Danger Zone**
3. Click **Change repository visibility** → **Make public**
4. Confirm

### Enable GitHub Pages (if not already active)

1. **Settings** → **Pages**
2. **Source** → select **GitHub Actions**
3. Push any commit to `main` to trigger the deploy workflow
4. Verify at: `https://nermalwazza.github.io/HelloWebApp/`

### Optional: Fast-forward nwlocal to match main

```bash
git push origin main:nwlocal
```

### Optional: Remove unused asset

```bash
git rm src/assets/hero.png
git commit -m "Remove unused hero.png asset"
```

### Verify after publish

- [ ] GitHub Pages live at `https://nermalwazza.github.io/HelloWebApp/`
- [ ] Deploy badge in README shows green
- [ ] "Simulate low supply" toggle works on the live site
- [ ] No source files accessible at the Pages URL (only `dist/` contents)
- [ ] Repository shows as public

---

## 9. GitHub Pages Deployment Configuration

**Audit date:** 2026-04-26

| Item | Value |
|---|---|
| Pages source | GitHub Actions |
| Workflow file | `.github/workflows/deploy.yml` |
| Trigger | Push to `main`; manual `workflow_dispatch` |
| Build command | `npm run build` (`tsc -b && vite build`) |
| Build output path | `dist/` |
| Vite base path | `/HelloWebApp/` |
| Expected live URL | `https://nermalwazza.github.io/HelloWebApp/` |
| `npm ci` / `npm install` | `npm ci` (package-lock.json present) |
| Permissions | `contents: read`, `pages: write`, `id-token: write` |
| Environment | `github-pages` |

### Manual verification steps

After pushing to `main`:

1. Go to `https://github.com/NermalWazza/HelloWebApp/actions`
2. Confirm **Deploy to GitHub Pages** workflow run completes (green tick).
3. Open `https://nermalwazza.github.io/HelloWebApp/`
4. Verify the app loads and the "Simulate low supply" toggle works.
5. Confirm deploy badge in README shows green.

### Release verdict (GitHub Pages)

- [ ] Workflow exists and `workflow_dispatch` is enabled
- [ ] `vite.config.ts` base path matches repo name
- [ ] Build passes locally
- [ ] Tests pass locally
- [ ] No sensitive data committed
- [ ] Workflow run succeeds on GitHub Actions
- [ ] Live URL loads correctly

---

## 10. Post-Release Standing Rules

- Run `npm test && npm run build && python -m pre_commit run --all-files` before every commit
- No real patient or medication data may enter this repository at any time
- No persistence layer without a completed threat model (see `docs/Security_Model.md`)
- No AI/API integration without a data-minimisation review
