# 08: GitHub Pages Automated Deployment Workflow

**What to build:**
Automated continuous deployment workflow to host the interactive carousel on GitHub Pages. The pipeline executes the unit test suite prior to deployment, generates the Pages bundle from repository root, ensures `.nojekyll` is present to prevent static file corruption, and binds relative assets (`index.html`, `style.css`, `carousel.js`) for proper rendering under repository subpaths.

**Blocked by:** 07: Visual Craft, Polish & Responsiveness Audit

**Status:** closed

- [x] Configure `.github/workflows/deploy-pages.yml` with `push` (master) and `workflow_dispatch` triggers
- [x] Configure permissions for `pages: write` and `id-token: write`
- [x] Add automated test step (`npm test`) to guarantee zero regressions before deployment
- [x] Create `.nojekyll` in repository root to bypass Jekyll build
- [x] Verify relative asset pathing for `style.css` and `carousel.js` in `index.html`
- [x] Implement test suite in `test/github-pages.test.mjs` verifying deployment readiness
