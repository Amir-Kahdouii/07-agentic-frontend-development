# Spec: Frontend Development Using AI Agents — Interactive Carousel & Slide Deck

Status: ready-for-agent

## Problem Statement

As a software engineer who is not a dedicated frontend developer or UI designer, creating production-grade, visually stunning, and architecturally sound frontend interfaces has traditionally been slow, frustrating, and prone to poor visual results or inconsistent code. 

When attempting to delegate frontend tasks to AI agents, general-purpose prompts often result in generic, dated, or fragmented user interfaces with inconsistent styles, arbitrary colors, and unmaintainable code. Developers lack a structured, repeatable workflow that combines battle-tested agent skills, explicit design token constraints, and live component registries.

The user wants to publish and showcase this exact methodology through an 8-slide educational carousel (and interactive web companion) to teach other software engineers how to systematically achieve polished frontend designs using:
1. Structured skills management via `npx skills add` (`mattpocock/skills` and Anthropic's `frontend-design`).
2. The `grilling` skill to extract rock-solid specifications and reach shared understanding before writing any code.
3. Design grounding via `styles.refero.design` to generate a strict, non-negotiable `DESIGN.md`.
4. MCP integration via `vibefarsi.ir` to pull Persian components, design rules, and themes directly into the agent's context.
5. Ticket-by-ticket execution using the `frontend-design` skill to maintain visual craft and high standards.

## Solution

Build a standalone, responsive, high-craft interactive web carousel application accompanied by an export-ready slide content structure. The carousel will present the end-to-end workflow across 8 distinct, punchy slides.

The application follows the design specifications outlined in `DESIGN.md` (Letters Style Reference):
- Pure Light theme (`#ffffff` canvas, `#f5f5f5` secondary surfaces, `#070709` obsidian text, `#2597d0` surgical blue accents, and a soft sky gradient).
- Clean Vazirmatn typography for Persian text with proper RTL layout and zero letter-spacing on Arabic/Persian glyphs.
- 18px rounded cards with hairline atmospheric shadows, pill buttons (100px radius), and clean glassmorphism touches.
- Interactive slide navigation: Next/Previous controls, keyboard arrow shortcuts, dot indicators, and a slide counter.
- One-click copy-to-clipboard functionality on all terminal commands and resource links with instantaneous visual feedback.

## User Stories

1. As a software engineer reading the carousel, I want to understand the overarching perspective in Slide 1, so that I recognize that I don't need to be a frontend specialist to craft high-quality web applications with AI agents.
2. As a software engineer, I want Slide 1 to illustrate the contrast between messy manual AI prompting and an agentic engineering workflow, so that the value proposition is immediately clear.
3. As a software engineer, I want Slide 2 to introduce the concept of agent skills and present the exact `npx skills add` commands for `mattpocock/skills` and `anthropics/skills --skill frontend-design`, so that I know what tools to install in my repository.
4. As a reader of Slide 2, I want a single-click "Copy Command" button next to each `npx` command, so that I can paste them directly into my terminal without manual selection errors.
5. As a software engineer, I want Slide 3 to explain the `grilling` skill from Matt Pocock's workflow, so that I understand why establishing a shared mental model and decision tree before coding is critical.
6. As a reader of Slide 3, I want to see an example of the single-question frontier interview pattern, so that I can visualize how the agent interrogates assumptions until the spec is watertight.
7. As a software engineer, I want Slide 4 to explain how to discover curated visual aesthetics on `styles.refero.design` and extract them into a `DESIGN.md` file, so that the AI agent operates within deterministic design boundaries.
8. As a reader of Slide 4, I want a copyable link to `styles.refero.design` and a summary of what goes into `DESIGN.md` (colors, typography, spacing, border radii, shadows), so that I know how to establish design rules.
9. As a software engineer, I want Slide 5 to explain the role of Model Context Protocol (MCP) servers and introduce `vibefarsi.ir`, so that I understand how agents query live component registries and Persian design tokens dynamically.
10. As a reader of Slide 5, I want a clear breakdown of the tools exposed by `vibefarsi.ir` (`get_design_rules`, `search_registry`, `get_component`, `get_theme`, `scaffold_page`), so that I know how agents bypass npm kit lock-in and adopt owned components.
11. As a software engineer, I want Slide 6 to detail the execution phase using Anthropic's `frontend-design` skill, so that I understand how each isolated ticket is implemented with high aesthetic quality and modern web standards.
12. As a reader of Slide 6, I want to see how `DESIGN.md` rules and `frontend-design` work together to prevent generic AI UI defaults and enforce micro-interactions.
13. As a software engineer, I want Slide 7 to outline the review and polish stage (using `code-review`, visual inspections, and responsive tests), so that I have a clear QA gate before shipping.
14. As a software engineer, I want Slide 8 to provide an executive summary and cheat sheet of the full pipeline (Skills + Refero/Design.md + MCP + Execution), so that I can save or screenshot the entire playbook in one place.
15. As a visitor browsing the interactive web carousel, I want to press the Right and Left keyboard arrow keys, so that I can smoothly navigate through the slides hands-free.
16. As a visitor on a mobile device or tablet, I want the carousel layout to remain fully responsive and touch-friendly, so that I can read and navigate comfortably regardless of screen size.
17. As a visitor clicking a copy button, I want immediate visual confirmation (e.g., button text switches to "کپی شد! ✓" for 2 seconds), so that I know the command was successfully placed into my clipboard.
18. As a visitor navigating through the slides, I want pagination dots and a progress counter (e.g., "اسلاید ۳ از ۸"), so that I can track where I am in the presentation and jump directly to any slide.

## Implementation Decisions

### 1. Presentation Architecture & Artifact
- Deliver a self-contained, high-performance HTML/CSS/JavaScript interactive carousel file (`index.html`) that works out of the box in modern browsers without build dependencies.
- Embed full RTL support (`dir="rtl"`) with the Vazirmatn font loaded via Google Fonts CDN, ensuring zero letter spacing on Persian text and balanced typographic scale.

### 2. Design System Alignment (`DESIGN.md` Tokens)
- Strict adoption of the Letters Style Reference:
  - Surface Palette: `--color-paper-white` (`#ffffff`), `--color-cloud-gray` (`#f5f5f5`), and `--color-sky-tint` (`#d7e6f5`).
  - Text Hierarchy: `--color-obsidian` (`#070709`) for primary headings and strong contrast, `--color-charcoal` (`#60606c`) for body copy, and `--color-slate` (`#8b8b8b`) for captions and badges.
  - Accent Color: `--color-surgical-blue` (`#2597d0`) for icons, active pagination dots, and focal indicators.
  - Atmospheric Hero Wash: `--color-sky-gradient` (`linear-gradient(180deg, #779bc1 0%, #9abfda 58%, #cbdcec 100%)`) applied to hero sections and card backdrops.
  - Geometry: 18px radius for cards (`--radius-card`), 100px for pills and tags (`--radius-pill`), and subtle hairline elevation (`--shadow-xl`, `--shadow-subtle`).

### 3. Slide Content & Sequence
- **Slide 1**: *The Software Engineer's Frontend Paradox* (Hook & Mindset Shift).
- **Slide 2**: *The Base Toolkit: Installing Skills* (`mattpocock/skills` + `frontend-design`).
- **Slide 3**: *Step 1: The Grilling Skill* (Extracting specs & zero-assumption alignment).
- **Slide 4**: *Step 2: Aesthetic Grounding with Refero* (`styles.refero.design` -> `DESIGN.md`).
- **Slide 5**: *Step 3: Supercharging with MCP* (`vibefarsi.ir` Persian component registry).
- **Slide 6**: *Step 4: Ticket Implementation with Frontend-Design* (High craft, token compliance).
- **Slide 7**: *Step 5: Review & Polish* (`code-review`, responsive checks, visual audit).
- **Slide 8**: *The Playbook Cheat Sheet* (Full stack summary, links, and takeaways).

### 4. Interactive Components & UX
- Modular JavaScript carousel controller managing active state index, transition animations, dot indicators, and keyboard event listeners.
- Clipboard utility using `navigator.clipboard.writeText` with graceful fallback and transient visual success state.

## Testing Decisions

### Seams
- Single high-level seam: The compiled DOM and browser user experience of `index.html`.
- Verification of:
  1. Slide state transitions (forward, backward, jump via dots, boundary clamps at slide 1 and 8).
  2. Keyboard shortcut handlers (`ArrowLeft` and `ArrowRight`).
  3. Clipboard copy interaction triggers and DOM feedback.
  4. RTL layout integrity and Vazirmatn font rendering.
  5. Compliance of visual styles against tokens in `DESIGN.md`.

## Out of Scope
- Backend server or dynamic database storage (the carousel is fully client-side and static).
- Automated slide export to PDF or PNG (users can take screenshots or use browser print).
- External authentication or user comments.

## Further Notes
- The carousel is built with vanilla HTML/CSS/JS in accordance with the project guidelines (avoiding Tailwind unless requested).
- Persian typography adheres to `vibefarsi` rules: Vazirmatn font, natural line heights (1.7-1.8), no artificial letter-spacing.
~