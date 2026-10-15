# 01: Companion Migration and React Vite Project Setup

**What to build:**
Preserve the existing comprehensive reading carousel by migrating its static files into `/companion/`, update existing test suites to assert against the companion path so regression checks pass cleanly, and bootstrap a modern React + Vite project in the repository root configured with Vazirmatn typography, Letters style CSS variables, and VibeFarsi RTL layout foundation.

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] Move `index.html`, `carousel.js`, and `style.css` into `/companion/` without altering their internal logic or styling
- [x] Update test files under `test/` to target `/companion/` so existing automated checks run and pass green
- [x] Configure `package.json` and Vite at repository root with React, Lucide icons, and Motion dependencies
- [x] Configure root `index.html` with `<html lang="fa" dir="rtl">`, Google Fonts Vazirmatn CDN, and Letters style design tokens
- [x] Configure Vite build to bundle `/companion/` as static assets into `dist/companion/`
