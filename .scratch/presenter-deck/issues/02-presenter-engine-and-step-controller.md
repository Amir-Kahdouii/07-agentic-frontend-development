# 02: Presenter Deck Engine and Reversible Step Controller

**What to build:**
A robust, centralized presentation state machine governing bidirectional intra-slide build steps and slide transitions. The presenter navigates forward through micro-steps using `ArrowRight` or `Space` and reverses animations using `ArrowLeft`. Segmented Step Ticks in the footer give clear visibility into remaining clicks per slide, a Persian slide counter tracks position (`۳ / ۸`), and a fullscreen toggle (`F`) maximizes screen real estate.

**Blocked by:** 01: Companion Migration and React Vite Project Setup

**Status:** closed

- [x] Implement central `DeckController` managing `[slideIndex, stepIndex]` state
- [x] Wire forward navigation (`ArrowRight`, `Space`, `PageDown`) to increment build step before advancing slide
- [x] Wire reverse navigation (`ArrowLeft`, `PageUp`) to decrement build step before retreating slide
- [x] Render segmented `Step Ticks` in the footer matching the active slide's step count and current progress
- [x] Display Persian numeral slide counter (e.g. `۱ / ۸` to `۸ / ۸`) formatted with Persian digits
- [x] Implement keyboard shortcut `F` to toggle browser full-screen presentation mode
- [x] Include a permanent, high-craft corner badge linking to the Reading Companion (`/companion/`)
- [x] Add unit tests verifying bidirectional navigation sequence and keyboard event dispatching
