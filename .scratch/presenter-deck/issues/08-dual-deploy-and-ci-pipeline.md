# 08: Dual Deployment Pipeline and Documentation

**What to build:**
Configure the continuous deployment pipeline to test and build both the live Presenter Deck (`/`) and the Reading Companion (`/companion/`) into `dist/`, automated via GitHub Actions on push to master. Update `README.md` to document the dual-distribution model, presentation keyboard shortcuts, local development commands, and direct links to both experiences.

**Blocked by:** 07: Visual Craft, Motion Polish, and Touch Gestures

**Status:** completed

- [x] Configure `npm test` script to execute both companion tests and React deck tests before building
- [x] Update `.github/workflows/deploy-pages.yml` to run tests, execute `npm run build` with static companion assets bundled to `dist/companion/`, and deploy to GitHub Pages
- [x] Create/update root `README.md` with high-craft badges, architecture explanation, presentation shortcuts (`ArrowRight`, `ArrowLeft`, `Space`, `F`), and direct links to both versions
- [x] Perform end-to-end verification of `npm run build` and ensure generated `dist/` contains valid root entry point and `/companion/` subpath

