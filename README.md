# AIOps Operational Transformation Suite
### Light Theme Edition · GitHub Pages Ready

A comprehensive, interactive AIOps transformation management platform for enterprise IT operations leaders. 
Built with React 19 · TypeScript · Tailwind CSS 4 · Vite 7.

---

## 🚀 Deploy to GitHub Pages (3 steps)

### Option A — Automated via GitHub Actions (recommended)
1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Push to `main` — the workflow auto-builds and deploys

### Option B — Manual (pre-built single file)
```bash
npm install
npm run build
# Commit dist/index.html to your repo's gh-pages branch or docs/ folder
```

---

## 🛠 Local Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Builds a single self-contained index.html → dist/
npm run preview    # Preview the production build
```

---

## 📋 Features (9 Interactive Modules)

| Tab | Description |
|-----|-------------|
| 📊 **KPI Dashboard** | Live MTTR/MTTD simulator with progress sliders |
| 🌐 **Asset Discovery** | Log and track infrastructure nodes with health status |
| 👥 **Stakeholders** | Alignment tracker with credibility scoring |
| 📈 **Observability Maturity** | Gap analysis with interactive radar sliders |
| ⚡ **Quick Wins Hub** | Kanban board for Day 30 noise-reduction wins |
| ⚙️ **Automation Lab** | Pipeline builder for self-healing workflows |
| 🗺️ **Roadmap & Governance** | 12-24 month editable timeline + review cadence |
| 👔 **Executive Presenter** | Slide deck with editable bullets and live charts |
| 🧠 **AI Stack Architecture** | Use-case to ML layer component mapper |

---

## 📁 Project Structure

```
├── src/
│   ├── App.tsx              # Main application (single component, ~2600 lines)
│   ├── data/
│   │   ├── initialState.ts  # Sample assets, stakeholders, workflows, slides
│   │   └── aiStackData.ts   # AI/ML stack components catalogue
│   ├── utils/cn.ts          # Tailwind class helper
│   ├── main.tsx
│   └── index.css
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions auto-deploy
├── vite.config.ts           # Single-file build (vite-plugin-singlefile)
└── package.json
```

---

## ⚙️ Tech Stack

- **React 19** with hooks
- **TypeScript 5.9**
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **Vite 7** + `vite-plugin-singlefile` (zero-dependency HTML output)
- **Lucide React** icons

---

*Built for IT leaders driving AIOps & observability modernization.*
