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

test('02: toPersianDigits converts western digits to Persian numerals', () => {
  assert.equal(toPersianDigits(0), '۰');
  assert.equal(toPersianDigits(123456789), '۱۲۳۴۵۶۷۸۹');
  assert.equal(toPersianDigits('Slide 1 of 8'), 'Slide ۱ of ۸');
  assert.equal(toPersianDigits('۱ / ۸'), '۱ / ۸');
});

test('02: DeckController - Initial state and boundaries', () => {
  const testSlides = [
    { id: 's1', title: 'Slide 1', totalSteps: 2 },
    { id: 's2', title: 'Slide 2', totalSteps: 1 },
    { id: 's3', title: 'Slide 3', totalSteps: 0 },
  ];

  const controller = createDeckController({ slides: testSlides });
  const initial = controller.getState();

  assert.equal(initial.slideIndex, 0, 'Initial slide should be 0');
  assert.equal(initial.stepIndex, 0, 'Initial step should be 0');
  assert.equal(initial.totalSlides, 3, 'Total slides should be 3');
  assert.equal(initial.totalSteps, 2, 'Total steps of slide 1 should be 2');
  assert.equal(initial.isFirst, true, 'isFirst should be true at start');
  assert.equal(initial.isLast, false, 'isLast should be false at start');
  assert.equal(initial.canGoPrev, false, 'canGoPrev should be false at start');
  assert.equal(initial.canGoNext, true, 'canGoNext should be true at start');

  // Attempting to retreat at the very beginning should return moved: false
  const prevResult = controller.prev();
  assert.equal(prevResult.moved, false, 'prev at start should not move');
  assert.equal(controller.getState().slideIndex, 0);
  assert.equal(controller.getState().stepIndex, 0);
});

test('02: DeckController - Bidirectional navigation sequence across build steps and slides', () => {
  const testSlides = [
    { id: 's1', title: 'Slide 1', totalSteps: 2 },
    { id: 's2', title: 'Slide 2', totalSteps: 1 },
  ];

  const controller = createDeckController({ slides: testSlides });

  // Slide 1, Step 0 -> Step 1
  let res = controller.next();
  assert.equal(res.moved, true);
  assert.equal(res.type, 'step');
  assert.equal(controller.getState().slideIndex, 0);
  assert.equal(controller.getState().stepIndex, 1);

  // Slide 1, Step 1 -> Step 2
  res = controller.next();
  assert.equal(res.moved, true);
  assert.equal(res.type, 'step');
  assert.equal(controller.getState().slideIndex, 0);
  assert.equal(controller.getState().stepIndex, 2);

  // Slide 1, Step 2 -> Slide 2, Step 0
  res = controller.next();
  assert.equal(res.moved, true);
  assert.equal(res.type, 'slide');
  assert.equal(controller.getState().slideIndex, 1);
  assert.equal(controller.getState().stepIndex, 0);

  // Slide 2, Step 0 -> Step 1
  res = controller.next();
  assert.equal(res.moved, true);
  assert.equal(res.type, 'step');
  assert.equal(controller.getState().slideIndex, 1);
  assert.equal(controller.getState().stepIndex, 1);
  assert.equal(controller.getState().isLast, true, 'Should be at the very end');

  // At the end, next should not move
  res = controller.next();
  assert.equal(res.moved, false);
  assert.equal(controller.getState().slideIndex, 1);
  assert.equal(controller.getState().stepIndex, 1);

  // Reversible backward navigation:
  // Slide 2, Step 1 -> Step 0
  res = controller.prev();
  assert.equal(res.moved, true);
  assert.equal(res.type, 'step');
  assert.equal(controller.getState().slideIndex, 1);
  assert.equal(controller.getState().stepIndex, 0);

  // Slide 2, Step 0 -> Slide 1, Step 2 (previous slide's totalSteps)
  res = controller.prev();
  assert.equal(res.moved, true);
  assert.equal(res.type, 'slide');
  assert.equal(controller.getState().slideIndex, 0);
  assert.equal(controller.getState().stepIndex, 2, 'Must land on previous slide final step');

  // Slide 1, Step 2 -> Step 1
  res = controller.prev();
  assert.equal(res.moved, true);
  assert.equal(res.type, 'step');
  assert.equal(controller.getState().slideIndex, 0);
  assert.equal(controller.getState().stepIndex, 1);

  // Slide 1, Step 1 -> Step 0
  res = controller.prev();
  assert.equal(res.moved, true);
  assert.equal(res.type, 'step');
  assert.equal(controller.getState().slideIndex, 0);
  assert.equal(controller.getState().stepIndex, 0);
  assert.equal(controller.getState().isFirst, true);
});

test('02: DeckController - goToSlide jumps cleanly and clamps steps', () => {
  const testSlides = [
    { id: 's1', totalSteps: 2 },
    { id: 's2', totalSteps: 3 },
    { id: 's3', totalSteps: 1 },
  ];
  const controller = createDeckController({ slides: testSlides });

  assert.equal(controller.goToSlide(1, 2), true);
  assert.equal(controller.getState().slideIndex, 1);
  assert.equal(controller.getState().stepIndex, 2);

  // Clamp excessive stepIndex to slide totalSteps
  assert.equal(controller.goToSlide(2, 99), true);
  assert.equal(controller.getState().slideIndex, 2);
  assert.equal(controller.getState().stepIndex, 1);

  // Reject out-of-bounds slideIndex
  assert.equal(controller.goToSlide(-1), false);
  assert.equal(controller.goToSlide(10), false);
  assert.equal(controller.getState().slideIndex, 2);
});

test('02: DeckController - Keyboard event handling for forward, reverse, and fullscreen', () => {
  let fullscreenToggled = false;
  const controller = createDeckController({
    slides: [
      { id: 's1', totalSteps: 1 },
      { id: 's2', totalSteps: 1 },
    ],
    onFullscreenToggle: () => {
      fullscreenToggled = true;
    },
  });

  let prevented = false;
  const mockEvent = (key, code, target = {}) => ({
    key,
    code,
    target,
    preventDefault: () => {
      prevented = true;
    },
  });

  // Forward hotkeys: ArrowRight, Space, PageDown
  assert.equal(controller.handleKeyDown(mockEvent('ArrowRight', 'ArrowRight')), true);
  assert.equal(controller.getState().stepIndex, 1);

  assert.equal(controller.handleKeyDown(mockEvent(' ', 'Space')), true);
  assert.equal(controller.getState().slideIndex, 1);
  assert.equal(controller.getState().stepIndex, 0);

  // Reverse hotkeys: ArrowLeft, PageUp
  assert.equal(controller.handleKeyDown(mockEvent('ArrowLeft', 'ArrowLeft')), true);
  assert.equal(controller.getState().slideIndex, 0);
  assert.equal(controller.getState().stepIndex, 1);

  assert.equal(controller.handleKeyDown(mockEvent('PageUp', 'PageUp')), true);
  assert.equal(controller.getState().slideIndex, 0);
  assert.equal(controller.getState().stepIndex, 0);

  // Fullscreen toggle: 'f' or 'F'
  assert.equal(controller.handleKeyDown(mockEvent('f', 'KeyF')), true);
  assert.equal(fullscreenToggled, true, 'Fullscreen callback must be invoked on KeyF');

  // Ignored if target is input or textarea
  fullscreenToggled = false;
  const inputEvent = mockEvent('ArrowRight', 'ArrowRight', { tagName: 'INPUT' });
  assert.equal(controller.handleKeyDown(inputEvent), false, 'Should ignore keystrokes inside INPUT');
});

test('02: Presenter Deck Source Code - Integrated Deck Controller, Step Ticks, and Counter', () => {
  const appPath = path.join(rootDir, 'src', 'App.jsx');
  assert.ok(fs.existsSync(appPath), 'src/App.jsx must exist');
  const appContent = fs.readFileSync(appPath, 'utf8');

  // Deck state and navigation integration
  assert.match(appContent, /createDeckController|useDeck/i, 'App.jsx must integrate DeckController');
  assert.match(appContent, /toPersianDigits/, 'App.jsx must use toPersianDigits for Persian numerals');
  assert.match(appContent, /step-ticks/i, 'App.jsx must render Step Ticks container');
  assert.match(appContent, /fullscreen/i, 'App.jsx must handle fullscreen toggle');
  assert.match(appContent, /companion-link-btn/i, 'Corner companion link button must be present');
});
