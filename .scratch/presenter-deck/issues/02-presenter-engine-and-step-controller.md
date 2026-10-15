# 02: Presenter Deck Engine and Reversible Step Controller

**What to build:**
A robust, centralized presentation state machine governing bidirectional intra-slide build steps and slide transitions. The presenter navigates forward through micro-steps using `ArrowRight` or `Space` and reverses animations using `ArrowLeft`. Segmented Step Ticks in the footer give clear visibility into remaining clicks per slide, a Persian slide counter tracks position (`۳ / ۸`), and a fullscreen toggle (`F`) maximizes screen real estate.

**Blocked by:** 01: Companion Migration and React Vite Project Setup

**Status:** ready-for-agent

- [ ] Implement central `DeckController` managing `[slideIndex, stepIndex]` state
- [ ] Wire forward navigation (`ArrowRight`, `Space`, `PageDown`) to increment build step before advancing slide
- [ ] Wire reverse navigation (`ArrowLeft`, `PageUp`) to decrement build step before retreating slide
- [ ] Render segmented `Step Ticks` in the footer matching the active slide's step count and current progress
- [ ] Display Persian numeral slide counter (e.g. `۱ / ۸` to `۸ / ۸`) formatted with Persian digits
- [ ] Implement keyboard shortcut `F` to toggle browser full-screen presentation mode
- [ ] Include a permanent, high-craft corner badge linking to the Reading Companion (`/companion/`)
- [ ] Add unit tests verifying bidirectional navigation sequence and keyboard event dispatching
