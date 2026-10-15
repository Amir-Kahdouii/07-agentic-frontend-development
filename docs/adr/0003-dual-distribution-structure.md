# 0003: Dual-Distribution Repo Structure for Presenter Deck and Reading Companion

We decided to structure the repository into two distinct directories: the root-level React + Vite application serving the live Presenter Deck (`/`), and `/companion/` housing the original, full-text reading carousel. The Vite build bundles `/companion/` as static assets into `dist/companion/`, allowing both experiences to be hosted simultaneously on GitHub Pages with mutual cross-linking and a dedicated README reference.
