# Frontend AI Carousel & Slide Deck

Domain model for the interactive presentation companion and slide deck teaching frontend development using AI agents.

## Language

**Presenter-First Deck**:
A minimalist slide deck designed strictly for live human presentation, built with React + Vite + Motion, prioritizing high-impact headlines, keyword badges, and visual components over reading prose.
_Avoid_: Article deck, text-heavy carousel, document slide

**Reading Companion**:
The comprehensive, text-rich static carousel preserved intact for in-depth individual reading, self-study, and documentation reference.
_Avoid_: Legacy carousel, old version, deprecated slides

**Hero Artifact**:
A bespoke, interactive visual mockup embedded within each slide (e.g. animated terminal, live decision tree, token inspector) that progressively animates across build steps.
_Avoid_: Generic card, static illustration, bullet list container

**Build Step**:
An individual, reversible micro-step within a slide that reveals, activates, or transforms a component before navigating across slides.
_Avoid_: Full-page transition, unbuffered slide jump

**Navigation Sequence**:
The bidirectional interaction loop (via Arrow keys, Space, or clicks) that exhausts all intra-slide Build Steps forward or backward before advancing to the next or previous slide.
_Avoid_: Direct slide-only switching

**Step Ticks**:
Segmented visual micro-indicators in the slide footer displaying the exact build step progress within the active slide.
_Avoid_: Page dots, slide progress bar
