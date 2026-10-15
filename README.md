# Frontend Development Using AI Agents — Presenter Deck & Reading Companion

[![GitHub Pages Deployment](https://img.shields.io/badge/GitHub%20Pages-Live%20Deck-2597d0?style=for-the-badge&logo=github)](https://amir-kahdouii.github.io/07-agentic-frontend-development/)
[![Reading Companion](https://img.shields.io/badge/Companion-In--Depth%20Guide-070709?style=for-the-badge&logo=bookstack)](https://amir-kahdouii.github.io/07-agentic-frontend-development/companion/)
[![React 19](https://img.shields.io/badge/React-19.3.1-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.4-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Motion](https://img.shields.io/badge/Motion-14.3.0-f08?style=for-the-badge&logo=framer)](https://motion.dev/)
[![VibeFarsi](https://img.shields.io/badge/Design-VibeFarsi%20%7C%20Letters-2597d0?style=for-the-badge)](https://vibefarsi.ir)
[![Tests Passing](https://img.shields.io/badge/Tests-Passing%20(60%2B)-success?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

An interactive, high-craft presentation deck and comprehensive self-study reading companion exploring state-of-the-art agentic frontend engineering workflows. Designed according to the **Letters** aesthetic and **VibeFarsi** Iranian typography and UI design principles.

---

## 🌐 Dual-Distribution Model

This repository is architected with a **dual-distribution model** deployed seamlessly under a single origin on GitHub Pages:

| Experience | URL / Subpath | Purpose & Target Audience | Architecture |
| :--- | :--- | :--- | :--- |
| **Live Presenter Deck** | [`/`](https://amir-kahdouii.github.io/07-agentic-frontend-development/) | Minimalist, high-impact slide presentation designed for stage talks, screen-shares, and video recordings. Centered on interactive **Hero Artifacts** with reversible micro **Build Steps**. | React 19, Vite, Motion, Lucide Icons, RTL layout |
| **Reading Companion** | [`/companion/`](https://amir-kahdouii.github.io/07-agentic-frontend-development/companion/) | Exhaustive, self-paced documentation carousel with detailed technical rationale, architectural decisions, and copyable prompt/code snippets. | Static HTML5, Vanilla CSS3, Vanilla ES6 JavaScript |

Direct links:
- **Presenter Deck**: [https://amir-kahdouii.github.io/07-agentic-frontend-development/](https://amir-kahdouii.github.io/07-agentic-frontend-development/)
- **Reading Companion**: [https://amir-kahdouii.github.io/07-agentic-frontend-development/companion/](https://amir-kahdouii.github.io/07-agentic-frontend-development/companion/)

---

## ⌨️ Presentation Keyboard Shortcuts & Controls

The Presenter Deck is equipped with a bidirectional linear step engine that allows fine-grained, reversible micro-steps (Build Steps) within each slide before advancing:

| Shortcut / Trigger | Action | Behavior |
| :--- | :--- | :--- |
| `ArrowRight` / `Space` / Click | **Advance** | Animates the next build step into view. When on the last step, advances to the next slide. |
| `ArrowLeft` / `PageUp` | **Step Back (Reversible)** | Reverses the most recent animation without state loss. When on step 0, steps back to the final step of the previous slide. |
| `F` | **Toggle Fullscreen** | Enters or exits native browser fullscreen presentation mode with zero chrome. |
| **Touch Swipe Left** (RTL) | **Advance** | Mobile & tablet touch gesture advancing to the next step or slide. |
| **Touch Swipe Right** (RTL) | **Step Back** | Mobile & tablet touch gesture stepping backwards reversibly. |

> **Presenter Tip:** Subtle segmented **Step Ticks** in the bottom footer indicate exactly how many clicks remain in the current slide before transitioning to the next one.

---

## 🎨 Design Philosophy & Iranian Craft

- **Letters Design System**: Crisp paper-white canvases (`#ffffff`), obsidian typography (`#070709`), charcoal secondary text (`#60606c`), cloud gray panels (`#f5f5f5`), soft sky blue gradients (`#d7e6f5`), and surgical blue accents (`#2597d0`).
- **VibeFarsi Guidelines**: Native Persian Vazirmatn typography with `letter-spacing: 0` explicitly enforced across all glyphs to prevent broken cursive ligatures, Persian numerals (`۰۱۲۳۴۵۶۷۸۹`), and logical CSS box model properties (`text-align: start`, `ms-*`, `me-*`).

---

## 🚀 Interactive Hero Artifacts

The 8 presentation slides center on bespoke, interactive simulation artifacts:

1. **The Paradigm Shift**: Interactive matrix comparing traditional prompt-and-pray development against agentic engineering workflows.
2. **Skills Tooling**: Interactive simulated terminal animating CLI commands (`npx skills add`) with dynamic skill badge highlights.
3. **The Grilling Skill**: Single-question agent interview tree simulator showcasing decision boundary alignment before writing code.
4. **Design Grounding (Refero & DESIGN.md)**: Dynamic design token inspector with live color swatches, typography scales, and border radius tokens.
5. **Dynamic MCP & VibeFarsi**: Live tool query inspector executing `search_registry` and `get_component` to dynamically inject localized Persian components.
6. **Execution via Frontend-Design**: Interactive Before/After slider contrasting generic AI templates with polished, craft-first UI.
7. **Quality Gates & Parallel Review**: Automated multi-agent QA checklist verifying Standards and Spec fidelity with real-time green check indicators.
8. **The Full Playbook**: Interactive 6-stage subway roadmap connecting all pipeline milestones into an actionable mental model.

---

## 🛠️ Local Development & Commands

### Prerequisites
- Node.js 20+
- npm 10+

### Setup & Installation
```bash
git clone https://github.com/Amir-Kahdouii/07-agentic-frontend-development.git
cd 07-agentic-frontend-development
npm install
```

### Local Dev Server
```bash
npm run dev
```
Starts the Vite development server at `http://localhost:5173/`.
- Presenter Deck is served at `http://localhost:5173/`
- Reading Companion is served at `http://localhost:5173/companion/` via Vite development middleware.

### Automated Testing
```bash
# Run all tests (Companion + Presenter Deck) followed by build verification
npm test

# Run only Reading Companion regression tests
npm run test:companion

# Run only Presenter Deck React & Step Controller tests
npm run test:deck
```

### Production Build & Preview
```bash
# Build React deck and copy companion static assets to dist/
npm run build

# Preview the production dist/ locally
npm run preview
```

---

## 🏗️ Continuous Deployment (CI/CD)

Automated GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) runs on push to `master`:
1. **Unit Tests**: Runs `npm ci` and `npm test` across all 60+ unit and integration test assertions.
2. **Build**: Bundles the React presenter application into `dist/` and packages the Reading Companion static assets into `dist/companion/` with `.nojekyll`.
3. **Deploy**: Deploys the unified `dist/` directory directly to GitHub Pages.

---

## 📄 License

MIT © [Amir Kahdouii](https://github.com/Amir-Kahdouii)
