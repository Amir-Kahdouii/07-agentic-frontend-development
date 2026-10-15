# Spec: Frontend Development Using AI Agents — Presenter-First Interactive Deck

Status: ready-for-agent

## Problem Statement

As a software engineer presenting on stage or recording video tutorials about AI-driven frontend development, presenting directly from text-dense documentation carousels causes cognitive overload for the audience, forces the speaker to read off the screen, and dilutes the visual craft of the interface. 

The existing carousel deck functions effectively as an in-depth, self-study reading document, but live presentation requires a radically different visual hierarchy: bold keywords, concise headlines, zero cognitive noise, and fine-grained, reversible step-by-step animations (Build Steps) that allow the speaker to progressively disclose concepts, code blocks, and visual prototypes using keyboard arrow keys.

Furthermore, moving to a modern component-driven presenter experience must not destroy or overwrite the comprehensive reading companion that already exists, but rather organize them cleanly into a dual-experience repository deployed seamlessly to GitHub Pages.

## Solution

Build an interactive, high-craft **Presenter-First Deck** powered by React, Vite, and Motion, positioned as the primary entry point of the project while preserving the existing full-text carousel in a dedicated companion directory (`/companion/`).

The Presenter Deck transforms the 8 core pedagogical stages into minimalist, high-impact slides centered on bespoke **Hero Artifacts** (such as an animated terminal, a live single-question decision tree, a dynamic design token inspector, and an MCP tool explorer). Each slide features fine-grained, reversible **Build Steps** triggered by standard presentation controls (`ArrowRight`, `Space`, `ArrowLeft`), coupled with discreet **Step Ticks** in the footer so the presenter maintains complete situational awareness on stage.

Visual design adheres strictly to the Letters style reference and VibeFarsi Iranian design guidelines: pure light surfaces, surgical blue accents (`#2597d0`), obsidian typography (`#070709`), Persian numeral formatting (`۰۱۲۳۴۵۶۷۸۹`), zero letter-spacing on Vazirmatn glyphs, and logical RTL CSS.

## User Stories

1. As a presenter on stage, I want the presentation slides to feature bold keywords and minimalist headlines instead of dense paragraphs, so that my audience focuses on my speech and visual demonstrations.
2. As a presenter, I want to press `ArrowRight` or `Space` on my keyboard or presenter clicker, so that the next micro-step (Build Step) within the active slide animates into view smoothly.
3. As a presenter, I want to press `ArrowLeft` or `PageUp`, so that the most recent animation reverses smoothly, returning the slide to its previous visual state without jumping.
4. As a presenter reaching the end of a slide's build steps, I want the next forward press to seamlessly transition to the subsequent slide at its initial state, so that slide progression feels natural and continuous.
5. As a presenter at the beginning of a slide, I want pressing backward to return to the final build step of the preceding slide, so that I can step backwards through the entire deck without abrupt state loss.
6. As a presenter, I want subtle segmented Step Ticks displayed alongside the slide index (e.g. `۳ / ۸`) in the footer, so that I can see at a glance how many clicks remain in the current slide before advancing.
7. As a presenter, I want to press `F` to toggle full-screen presentation mode, so that all browser chrome disappears during live talks.
8. As a conference attendee or self-learner visiting the website, I want a persistent, elegant button in the corner linking to the "Reading Companion", so that I can read the exhaustive explanatory text at my own pace.
9. As a developer presenting Slide 1 (The Paradigm Shift), I want a live comparison card contrasting traditional haphazard prompt engineering with structured agentic development, so that the audience instantly understands the value proposition.
10. As a developer presenting Slide 2 (Skills Tooling), I want an interactive terminal Hero Artifact that animates `npx skills add` commands and outputs installed packages, so that viewers see the exact CLI workflow in action.
11. As a developer presenting Slide 3 (The Grilling Skill), I want an interactive single-question decision tree simulator that displays an agent interview round, so that the audience understands why pinning down the decision frontier before writing code prevents rework.
12. As a developer presenting Slide 4 (Design Grounding via Refero & DESIGN.md), I want an interactive token palette artifact that displays color swatches, typography tokens, and border radii, so that developers learn how to set strict aesthetic boundaries for agents.
13. As a developer presenting Slide 5 (Dynamic MCP & VibeFarsi), I want an interactive MCP inspector artifact demonstrating `search_registry` and `get_component` with live Persian component rendering, so that viewers understand how agents bypass npm kit lock-in and adopt local components.
14. As a developer presenting Slide 6 (Execution via Frontend-Design), I want a Before/After transformation artifact showing generic AI default UI transforming into a polished, high-craft interface with micro-interactions, so that engineers see the visual difference.
15. As a developer presenting Slide 7 (Quality Gates & Review), I want an interactive checklist artifact whose verification gates (Standards, Spec, Responsiveness) toggle with green checkmarks on step progression, so that the QA discipline is clearly emphasized.
16. As a developer presenting Slide 8 (The Full Playbook), I want an interactive pipeline subway map connecting all stages from setup to deployment, so that the audience leaves with an actionable end-to-end mental model.
17. As an Iranian developer viewing the presentation, I want all typography rendered in Vazirmatn with zero letter-spacing, native Persian numerals (`۰۱۲۳۴۵۶۷۸۹`), and logical RTL layouts, so that the UI feels native, culturally respectful, and exquisitely crafted.
18. As a mobile or touch-device viewer, I want to swipe left and right across the slides, so that I can navigate through the presentation comfortably without a physical keyboard.
19. As a repository maintainer, I want the full-text Reading Companion preserved in `/companion/` with its original assets and tests passing, so that existing documentation references and automated CI checks remain fully valid.
20. As a visitor browsing the repository on GitHub, I want the `README.md` to clearly document the dual structure with direct links to both the live Presenter Deck and the in-depth Reading Companion, so that I understand which version suits my needs.

## Implementation Decisions

### 1. Dual-Distribution Architecture (ADR 0003)
- The root of the repository houses the modern React + Vite presentation application (`/`), acting as the primary entry point for human audiences.
- The original vanilla HTML/CSS/JavaScript carousel is migrated intact into `/companion/` with its accompanying assets.
- Vite build scripts copy `/companion/` into `dist/companion/`, allowing both experiences to be served from GitHub Pages under a single domain.

### 2. State Machine: Linear Bidirectional Step Controller (ADR 0004)
- Intra-slide build steps and slide transitions are governed by a single state controller modeling `[currentSlide, buildStep]`:
```typescript
type DeckState = {
  slideIndex: number;
  stepIndex: number;
};

type SlideConfig = {
  id: string;
  title: string;
  subtitle: string;
  totalSteps: number;
  renderArtifact: (step: number) => JSX.Element;
};
```
- Forward action: If `stepIndex < totalSteps`, increment `stepIndex`. If `stepIndex === totalSteps` and `slideIndex < totalSlides - 1`, transition to `slideIndex + 1` with `stepIndex = 0`.
- Backward action: If `stepIndex > 0`, decrement `stepIndex`. If `stepIndex === 0` and `slideIndex > 0`, transition to `slideIndex - 1` with `stepIndex = previousSlide.totalSteps`.

### 3. VibeFarsi and Letters Design System Alignment (ADR 0002, ADR 0005)
- Color tokens:
  - Surface: Pure paper white (`#ffffff`), cloud gray (`#f5f5f5`), soft sky tint (`#d7e6f5`).
  - Text: Obsidian (`#070709`) for primary headings, charcoal (`#60606c`) for secondary copy, slate (`#8b8b8b`) for badges.
  - Accent: Surgical blue (`#2597d0`).
- Typography: Vazirmatn font loaded via Google Fonts CDN, with `letter-spacing: 0` explicitly applied across Persian glyphs, and helper functions converting Latin numbers to Persian digits (`۰-۹`).
- Layout: Logical CSS properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`) adhering to VibeFarsi guidelines.

### 4. Interactive Hero Artifacts per Slide
- Slide 1: Interactive Paradigm Comparison Matrix (Manual Prompting vs. Agentic Engineering).
- Slide 2: Interactive Terminal Mockup (`npx skills add` with live typing output and skill badge badges).
- Slide 3: Interactive Grilling Interview Tree (Agent question frontier, user prompt input, and resolved branches).
- Slide 4: Interactive Refero Design Token Inspector (Live swatches, radius tokens, typography scales).
- Slide 5: Interactive MCP Tool Call Explorer (`vibefarsi` tool queries, JSON payload inspector, and rendered Persian card).
- Slide 6: Interactive Before/After Visual Transformation Card (Toggling between unstyled AI default and Letters-styled UI).
- Slide 7: Interactive CI/CD Quality Gate Pipeline (Step-by-step verification checks turning green).
- Slide 8: Interactive 6-Stage Subway Map Playbook (Highlighting active pipeline stages with tooltips).

## Testing Decisions

### 1. Primary Testing Seam
- The highest testing seam is the mounted deck container and keyboard listener.
- Tests dispatch keyboard events (`ArrowRight`, `ArrowLeft`, `Space`, `KeyF`) to the root window and assert against:
  - Active slide index and step counter attributes in the DOM.
  - Correct progression and reversal of build step classes or data attributes.
  - Visibility of corresponding Hero Artifact components for each slide.
  - Fullscreen toggle activation.

### 2. Regression & Companion Testing
- Existing test suites in `test/` are adapted to test `/companion/index.html` and `/companion/carousel.js`, verifying that the Reading Companion remains functional.
- Vite build verification (`npm run build`) is incorporated into the automated test script (`npm test`) to guarantee error-free bundling prior to deployment.

## Out of Scope

- Sound effects or audio synthesis on build step transitions.
- Backend server-side databases or user authentication (the entire presentation is client-side static).
- Dynamic AI generation during the live presentation (all mockups and agent examples are deterministic, high-craft interactive simulations).

## Further Notes

- Cross-linking between the Presenter Deck and Reading Companion is prominent and styled with high-craft pill badges in the presentation header and footer.
- The `README.md` file will feature a comprehensive guide explaining how to navigate the deck, run it locally via `npm run dev`, and access the full-text companion.
