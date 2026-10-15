import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  createDeckController,
  toPersianDigits,
  DEFAULT_SLIDES,
} from '../src/deck-engine.js';

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');
const cssPath = path.join(srcDir, 'index.css');
const appPath = path.join(srcDir, 'App.jsx');
const enginePath = path.join(srcDir, 'deck-engine.js');

test('07: Letters Tokens & Surfaces Audit in Presenter Deck CSS', () => {
  assert.ok(fs.existsSync(cssPath), 'src/index.css must exist');
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

  // Standard Radii Tokens from DESIGN.md
  assert.match(css, /--radius-card:\s*18px/i, 'Card radius must be 18px');
  assert.match(css, /--radius-pill:\s*100px/i, 'Pill radius must be 100px');
});

test('07: VibeFarsi Typography & Zero Letter-Spacing Rules', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  // Body must enforce zero letter-spacing for Persian glyph joining
  assert.match(css, /body\s*\{[^}]*letter-spacing:\s*0/s, 'body must enforce letter-spacing: 0');
  assert.match(css, /font-family:[^;]*Vazirmatn/i, 'Vazirmatn Persian typeface must be primary font');
});

test('07: DeckController Touch Swipe Gesture Navigation (RTL)', () => {
  const testSlides = [
    { id: 's1', title: 'Slide 1', totalSteps: 1 },
    { id: 's2', title: 'Slide 2', totalSteps: 1 },
  ];

  const controller = createDeckController({ slides: testSlides });
  assert.equal(typeof controller.handleTouchStart, 'function', 'controller must export handleTouchStart');
  assert.equal(typeof controller.handleTouchEnd, 'function', 'controller must export handleTouchEnd');

  // Start touch at (200, 100)
  controller.handleTouchStart({ touches: [{ clientX: 200, clientY: 100 }] });

  // Swipe Left: end at (100, 100), deltaX = -100 (horizontal swipe left in RTL -> advance)
  const forwardRes = controller.handleTouchEnd({ changedTouches: [{ clientX: 100, clientY: 100 }] });
  assert.equal(forwardRes, true, 'Swiping left in RTL advances forward');
  assert.equal(controller.getState().stepIndex, 1);

  // Swipe Right: start at (100, 100), end at (220, 105), deltaX = +120 (swipe right in RTL -> rewind)
  controller.handleTouchStart({ touches: [{ clientX: 100, clientY: 100 }] });
  const rewindRes = controller.handleTouchEnd({ changedTouches: [{ clientX: 220, clientY: 105 }] });
  assert.equal(rewindRes, true, 'Swiping right in RTL rewinds backward');
  assert.equal(controller.getState().stepIndex, 0);

  // Small movement below threshold should NOT trigger navigation
  controller.handleTouchStart({ touches: [{ clientX: 100, clientY: 100 }] });
  const tinyRes = controller.handleTouchEnd({ changedTouches: [{ clientX: 115, clientY: 102 }] });
  assert.equal(tinyRes, false, 'Touch movements below threshold should be ignored');

  // Vertical scroll gestures (deltaY > deltaX) should NOT trigger slide navigation
  controller.handleTouchStart({ touches: [{ clientX: 100, clientY: 100 }] });
  const verticalRes = controller.handleTouchEnd({ changedTouches: [{ clientX: 120, clientY: 250 }] });
  assert.equal(verticalRes, false, 'Vertical swipe gestures must not trigger slide navigation');
});

test('07: App Integration of Touch Gestures & motion/react', () => {
  const appContent = fs.readFileSync(appPath, 'utf8');

  // Touch event handlers on presentation container
  assert.match(appContent, /onTouchStart/i, 'App.jsx must wire onTouchStart');
  assert.match(appContent, /onTouchEnd/i, 'App.jsx must wire onTouchEnd');

  // motion/react animation integration
  assert.match(appContent, /from ['"]motion\/react['"]/, 'App.jsx must import from motion/react');
  assert.match(appContent, /<motion\.|<AnimatePresence/i, 'App.jsx must use motion or AnimatePresence components');
});

test('07: Responsiveness Audit - Mobile & Tablet Media Queries and Touch Targets', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  // Media queries
  assert.match(css, /@media\s*\([^)]*max-width:\s*(?:480px|640px|768px)\)/i, 'Mobile or tablet media query must exist');

  // Touch targets ≥ 44px
  assert.match(css, /min-height:\s*44px/i, 'Touch interactive buttons must adhere to 44px minimum target height');

  // Overflow management for code/tables
  assert.match(css, /overflow-x:\s*auto/i, 'Containers must have overflow-x: auto to prevent layout breaking');
});

test('07: High-Craft Elevation & Backdrop Glassmorphism', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.match(css, /backdrop-filter:\s*blur/i, 'Glassmorphism blur must be present');
  assert.match(css, /-webkit-backdrop-filter:\s*blur/i, '-webkit-backdrop-filter blur must be present for WebKit');
  assert.match(css, /box-shadow:/i, 'High-craft elevation shadows must be styled');
});
