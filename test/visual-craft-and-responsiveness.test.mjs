import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  createCarouselController,
  updateCarouselUI,
  initCarousel,
  initClipboardCopy,
  toPersianNumber,
} from '../carousel.js';

const rootDir = process.cwd();
const htmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'style.css');

test('07: Visual Craft Audit - 100% Adherence to DESIGN.md Tokens', () => {
  assert.ok(fs.existsSync(cssPath), 'style.css must exist');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Exact Colors from DESIGN.md
  assert.match(css, /--color-obsidian:\s*#070709/i, 'Obsidian must be #070709');
  assert.match(css, /--color-paper-white:\s*#ffffff/i, 'Paper White must be #ffffff');
  assert.match(css, /--color-cloud-gray:\s*#f5f5f5/i, 'Cloud Gray must be #f5f5f5');
  assert.match(css, /--color-sky-tint:\s*#d7e6f5/i, 'Sky Tint must be #d7e6f5');
  assert.match(css, /--color-charcoal:\s*#60606c/i, 'Charcoal must be #60606c');
  assert.match(css, /--color-slate:\s*#8b8b8b/i, 'Slate must be #8b8b8b');
  assert.match(css, /--color-ink:\s*#151515/i, 'Ink must be #151515');
  assert.match(css, /--color-surgical-blue:\s*#2597d0/i, 'Surgical Blue must be #2597d0');
  assert.match(css, /#779bc1.*#9abfda.*#cbdcec/s, 'Sky gradient stops must match DESIGN.md');

  // Surface Tokens
  assert.match(css, /--surface-sky-canvas/i, '--surface-sky-canvas must be defined');
  assert.match(css, /--surface-paper-canvas/i, '--surface-paper-canvas must be defined');
  assert.match(css, /--surface-cloud-surface/i, '--surface-cloud-surface must be defined');
  assert.match(css, /--surface-sky-tint-surface/i, '--surface-sky-tint-surface must be defined');
  assert.match(css, /--surface-obsidian-surface/i, '--surface-obsidian-surface must be defined');

  // Radii Tokens from DESIGN.md (cards: 18px, tags/buttons/nav-pills: 100px, icons: 8px, inputs: 12px, large: 32px)
  assert.match(css, /(?:--radius-card|--radius-cards):\s*18px/i, 'Card radius must be 18px');
  assert.match(css, /(?:--radius-pill|--radius-buttons|--radius-tags):\s*100px/i, 'Pill radius must be 100px');
  assert.match(css, /(?:--radius-icon|--radius-icons):\s*8px/i, 'Icon radius must be 8px');
  assert.match(css, /(?:--radius-input|--radius-inputs):\s*12px/i, 'Input radius must be 12px');
  assert.match(css, /(?:--radius-large|--radius-large-cards):\s*(?:32px|32-48px)/i, 'Large card radius must be 32px');

  // Shadows from DESIGN.md
  assert.match(css, /--shadow-subtle:/i, '--shadow-subtle must be defined');
  assert.match(css, /--shadow-subtle-2:/i, '--shadow-subtle-2 must be defined');
  assert.match(css, /--shadow-subtle-3:/i, '--shadow-subtle-3 must be defined');
  assert.match(css, /--shadow-xl:/i, '--shadow-xl must be defined');

  // Typography scale tokens
  assert.match(css, /--text-caption:\s*12px/i, '--text-caption must be 12px');
  assert.match(css, /--text-body-sm:\s*14px/i, '--text-body-sm must be 14px');
  assert.match(css, /--text-body:\s*16px/i, '--text-body must be 16px');
  assert.match(css, /--text-body-lg:\s*18px/i, '--text-body-lg must be 18px');
  assert.match(css, /--text-subheading:\s*20px/i, '--text-subheading must be 20px');
  assert.match(css, /--text-heading-sm:\s*28px/i, '--text-heading-sm must be 28px');
  assert.match(css, /--text-heading:\s*44px/i, '--text-heading must be 44px');

  // Persian Zero Letter-spacing to prevent glyph detachment
  assert.match(css, /letter-spacing:\s*0/i, 'Persian typography must enforce zero letter-spacing');
});

test('07: Atmospheric Sky Gradient & Glassmorphism Rendering', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  // Atmospheric sky wash in body::before or hero background
  assert.match(css, /body::before\s*\{[^}]*--color-sky-gradient/s, 'Atmospheric sky gradient wash must be applied to body::before');

  // Delicate glassmorphism with backdrop-filter blur and fallback
  assert.match(css, /backdrop-filter:\s*blur\(/i, 'backdrop-filter blur must be implemented');
  assert.match(css, /-webkit-backdrop-filter:\s*blur\(/i, '-webkit-backdrop-filter blur must be provided for cross-browser support');
});

test('07: Responsiveness Audit - Mobile (320px–480px), Tablet (768px), and Desktop', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  // Mobile breakpoint rules (max-width: 480px)
  assert.match(css, /@media\s*\([^)]*max-width:\s*480px\)/i, 'Mobile specific media query (max-width: 480px) must exist');

  // Tablet breakpoint rules
  assert.match(css, /@media\s*\([^)]*max-width:\s*(?:840px|768px)\)/i, 'Tablet / medium viewport media query must exist');

  // Table responsive scroll container
  assert.match(css, /\.table-responsive-box\s*\{[^}]*overflow-x:\s*auto/s, 'Table must be wrapped with overflow-x auto for mobile screens');

  // Terminal body responsive wrapping or scroll
  assert.match(css, /\.terminal-code-row\s*\{[^}]*overflow-x:\s*auto/s, 'Terminal commands must scroll horizontally without breaking container');

  // Touch target accessibility: min-height 44px
  assert.match(css, /min-height:\s*44px/i, 'Buttons must adhere to 44px touch target guidelines');
});

test('07: Keyboard Accessibility & Inert Management for Inactive Slides', () => {
  function makeMockElement(dataset = {}) {
    let classes = new Set();
    let attrs = {};
    let listeners = {};
    return {
      style: {},
      dataset: { ...dataset },
      textContent: '',
      disabled: false,
      inert: false,
      classList: {
        add: (cls) => classes.add(cls),
        remove: (cls) => classes.delete(cls),
        contains: (cls) => classes.has(cls),
      },
      setAttribute: (k, v) => { attrs[k] = String(v); },
      getAttribute: (k) => attrs[k] || null,
      removeAttribute: (k) => { delete attrs[k]; },
      addEventListener: (evt, handler) => {
        listeners[evt] = listeners[evt] || [];
        listeners[evt].push(handler);
      },
      removeEventListener: (evt, handler) => {
        if (!listeners[evt]) return;
        listeners[evt] = listeners[evt].filter(fn => fn !== handler);
      },
      trigger: (evt, detail = {}) => {
        if (listeners[evt]) {
          listeners[evt].forEach(fn => fn({ preventDefault: () => {}, ...detail }));
        }
      },
    };
  }

  const track = makeMockElement();
  const counterText = makeMockElement();
  const progressFill = makeMockElement();
  const prevBtn = makeMockElement();
  const nextBtn = makeMockElement();
  const dots = [1, 2, 3, 4, 5, 6, 7, 8].map(i => makeMockElement({ index: String(i) }));
  const slides = [1, 2, 3, 4, 5, 6, 7, 8].map(i => makeMockElement({ slideIndex: String(i) }));

  const windowListeners = {};
  const mockWindow = {
    addEventListener: (evt, handler) => {
      windowListeners[evt] = windowListeners[evt] || [];
      windowListeners[evt].push(handler);
    },
    removeEventListener: (evt, handler) => {
      if (!windowListeners[evt]) return;
      windowListeners[evt] = windowListeners[evt].filter(fn => fn !== handler);
    },
    trigger: (evt, detail = {}) => {
      if (windowListeners[evt]) {
        windowListeners[evt].forEach(fn => fn({ preventDefault: () => {}, ...detail }));
      }
    },
  };

  const mockRoot = {
    getElementById: (id) => {
      if (id === 'carousel-track') return track;
      if (id === 'slide-counter-text') return counterText;
      if (id === 'carousel-progress-fill') return progressFill;
      if (id === 'prev-btn') return prevBtn;
      if (id === 'next-btn') return nextBtn;
      return null;
    },
    querySelectorAll: (sel) => {
      if (sel.includes('.carousel-dot')) return dots;
      if (sel.includes('.slide-item')) return slides;
      if (sel.includes('[data-copy]')) return [];
      return [];
    },
  };

  const instance = initCarousel({ root: mockRoot, window: mockWindow, totalSlides: 8, initialSlide: 1 });
  assert.ok(instance, 'Carousel must initialize');

  const { controller } = instance;

  // Initial state check
  assert.equal(slides[0].getAttribute('aria-hidden'), null, 'Slide 1 active');
  assert.equal(slides[0].inert, false, 'Slide 1 not inert');
  assert.equal(slides[1].getAttribute('aria-hidden'), 'true', 'Slide 2 hidden');
  assert.equal(slides[1].inert, true, 'Slide 2 inert');

  // Trigger ArrowLeft (RTL advance)
  mockWindow.trigger('keydown', { key: 'ArrowLeft' });
  assert.equal(controller.currentSlide, 2, 'ArrowLeft in RTL advances to slide 2');
  assert.equal(slides[0].getAttribute('aria-hidden'), 'true', 'Slide 1 hidden');
  assert.equal(slides[0].inert, true, 'Slide 1 inert');
  assert.equal(slides[1].getAttribute('aria-hidden'), null, 'Slide 2 active');
  assert.equal(slides[1].inert, false, 'Slide 2 not inert');

  // Trigger ArrowRight (RTL rewind)
  mockWindow.trigger('keydown', { key: 'ArrowRight' });
  assert.equal(controller.currentSlide, 1, 'ArrowRight in RTL rewinds to slide 1');
  assert.equal(slides[0].getAttribute('aria-hidden'), null, 'Slide 1 active');
  assert.equal(slides[0].inert, false, 'Slide 1 not inert');

  instance.destroy();
});

test('07: All Clipboard Copy Triggers in HTML and Functionality', async () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Verify that all copyable items in HTML have valid data-copy
  const copyMatches = [...html.matchAll(/data-copy=["']([^"']+)["']/g)];
  assert.ok(copyMatches.length >= 5, `Expected at least 5 data-copy attributes in index.html, found ${copyMatches.length}`);

  for (const match of copyMatches) {
    const payload = match[1];
    assert.ok(payload.trim().length > 0, 'data-copy payload must not be empty');
  }

  // Verify copy feedback logic
  let copiedText = null;
  const mockNav = {
    clipboard: {
      writeText: async (txt) => {
        copiedText = txt;
        return true;
      },
    },
  };

  let btnClasses = new Set();
  let listeners = {};
  const mockBtn = {
    dataset: { copy: 'npm run test' },
    getAttribute: (k) => (k === 'data-copy' ? 'npm run test' : null),
    innerHTML: '<span>Copy</span>',
    classList: {
      add: (c) => btnClasses.add(c),
      remove: (c) => btnClasses.delete(c),
      contains: (c) => btnClasses.has(c),
    },
    addEventListener: (evt, h) => {
      listeners[evt] = listeners[evt] || [];
      listeners[evt].push(h);
    },
    removeEventListener: () => {},
  };

  const mockRoot = {
    querySelectorAll: (sel) => (sel === '[data-copy]' ? [mockBtn] : []),
  };

  const cleanup = initClipboardCopy({
    root: mockRoot,
    navigator: mockNav,
    feedbackDurationMs: 50,
  });

  // Trigger click
  await listeners['click'][0]({ preventDefault: () => {} });
  assert.equal(copiedText, 'npm run test', 'writeText must receive button data-copy');
  assert.ok(btnClasses.has('copied'), 'Button must receive copied class');
  assert.match(mockBtn.innerHTML, /کپی شد/i, 'Button must show Persian feedback');

  await new Promise((r) => setTimeout(r, 80));
  assert.ok(!btnClasses.has('copied'), 'Button must remove copied class after timeout');

  cleanup();
});

test('07: Zero Layout Shift Guarantee - CSS Transform Transition Architecture', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  // Track must have will-change: transform and transform transition
  assert.match(css, /\.carousel-track\s*\{[^}]*will-change:\s*transform/s, '.carousel-track must have will-change: transform for hardware acceleration');
  assert.match(css, /\.carousel-track\s*\{[^}]*transition:\s*transform/s, '.carousel-track must use transition: transform');

  // Viewport must have overflow: hidden
  assert.match(css, /\.carousel-viewport\s*\{[^}]*overflow:\s*hidden/s, '.carousel-viewport must clip off-screen slides');

  // Slide items must have flex: 0 0 100% and equal width
  assert.match(css, /\.slide-item\s*\{[^}]*flex:\s*0\s+0\s+100%/s, '.slide-item must have flex: 0 0 100%');
});
