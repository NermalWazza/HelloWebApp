# HelloWebApp

Standalone web app prototype inspired by MedMon. See [PLAN.md](PLAN.md) for phased roadmap and rules.

**Rules:** No secrets. No real patient data. No medical advice logic. No direct MedMon copy. One bounded AI change per run.

---

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # production build
npm run lint     # ESLint
```

---

## Stack

- Vite + React + TypeScript
- Tailwind CSS (phase 3+)
- PowerShell automation scripts

---

## Vite Template Notes

This project was scaffolded with the `react-ts` Vite template. The sections below are from that template for reference.

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```
