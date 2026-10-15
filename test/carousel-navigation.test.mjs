import test from 'node:test';
import assert from 'node:assert/strict';
import { createCarouselController } from '../companion/carousel.js';

test('02: Carousel Controller - State initialization and boundaries', () => {
  const controller = createCarouselController({ totalSlides: 8 });

  assert.equal(controller.currentSlide, 1, 'Initial slide should be 1');
  assert.equal(controller.totalSlides, 8, 'Total slides should be 8');
  assert.equal(controller.isFirst(), true, 'Should be first slide at start');
  assert.equal(controller.isLast(), false, 'Should not be last slide at start');

  // Attempting to go prev on slide 1 should fail and remain on slide 1
  const movedPrev = controller.prev();
  assert.equal(movedPrev, false, 'prev() on slide 1 should return false');
  assert.equal(controller.currentSlide, 1, 'Should remain on slide 1');
});

test('02: Carousel Controller - next() advances and respects upper boundary', () => {
  const controller = createCarouselController({ totalSlides: 8 });

  const movedNext = controller.next();
  assert.equal(movedNext, true, 'next() should return true');
  assert.equal(controller.currentSlide, 2, 'Should advance to slide 2');
  assert.equal(controller.isFirst(), false, 'Should no longer be first slide');

  // Advance all the way to slide 8
  for (let i = 2; i < 8; i++) {
    assert.equal(controller.next(), true);
  }
  assert.equal(controller.currentSlide, 8, 'Should be at slide 8');
  assert.equal(controller.isLast(), true, 'Should be at last slide');

  // Attempting to go next on slide 8 should fail and stay at 8
  assert.equal(controller.next(), false, 'next() on last slide should return false');
  assert.equal(controller.currentSlide, 8, 'Should remain at slide 8');
});

test('02: Carousel Controller - goToSlide() jumps and rejects out-of-bounds', () => {
  const controller = createCarouselController({ totalSlides: 8 });

  assert.equal(controller.goToSlide(5), true, 'goToSlide(5) should return true');
  assert.equal(controller.currentSlide, 5, 'Should be at slide 5');

  // Out of bounds
  assert.equal(controller.goToSlide(0), false, 'goToSlide(0) should return false');
  assert.equal(controller.currentSlide, 5, 'Should remain at slide 5');

  assert.equal(controller.goToSlide(9), false, 'goToSlide(9) should return false');
  assert.equal(controller.currentSlide, 5, 'Should remain at slide 5');

  assert.equal(controller.goToSlide(-1), false, 'goToSlide(-1) should return false');
  assert.equal(controller.currentSlide, 5, 'Should remain at slide 5');
});

test('02: Carousel Controller - onSlideChange notifications', () => {
  const controller = createCarouselController({ totalSlides: 8 });
  const changes = [];

  controller.onSlideChange((state) => {
    changes.push({ ...state });
  });

  controller.next();
  controller.goToSlide(4);
  controller.prev();

  assert.equal(changes.length, 3, 'Should have received 3 state change notifications');
  assert.deepEqual(changes[0], { currentSlide: 2, totalSlides: 8, isFirst: false, isLast: false });
  assert.deepEqual(changes[1], { currentSlide: 4, totalSlides: 8, isFirst: false, isLast: false });
  assert.deepEqual(changes[2], { currentSlide: 3, totalSlides: 8, isFirst: false, isLast: false });
});

test('02: toPersianNumber converts standard digits to Persian glyphs', async () => {
  const { toPersianNumber } = await import('../companion/carousel.js');
  assert.equal(toPersianNumber(1), '۱');
  assert.equal(toPersianNumber(8), '۸');
  assert.equal(toPersianNumber(42), '۴۲');
});

test('02: updateCarouselUI correctly updates DOM elements', async () => {
  const { updateCarouselUI } = await import('../companion/carousel.js');

  const counterText = { textContent: '' };
  const progressFill = { style: { width: '' } };
  const prevBtn = { disabled: false };
  const nextBtn = { disabled: false };
  const track = { style: { transform: '' } };

  const dots = [1, 2, 3, 4, 5, 6, 7, 8].map(idx => {
    let active = idx === 1;
    let selected = idx === 1 ? 'true' : 'false';
    return {
      dataset: { index: String(idx) },
      classList: {
        add: (cls) => { if (cls === 'active') active = true; },
        remove: (cls) => { if (cls === 'active') active = false; },
        contains: (cls) => (cls === 'active' ? active : false),
      },
      setAttribute: (k, v) => { if (k === 'aria-selected') selected = String(v); },
      getAttribute: (k) => (k === 'aria-selected' ? selected : null),
    };
  });

  const dom = { counterText, progressFill, prevBtn, nextBtn, track, dots };

  // Update to slide 1
  updateCarouselUI(dom, { currentSlide: 1, totalSlides: 8, isFirst: true, isLast: false });
  assert.equal(counterText.textContent, 'اسلاید ۱ از ۸');
  assert.equal(progressFill.style.width, '12.5%');
  assert.equal(prevBtn.disabled, true);
  assert.equal(nextBtn.disabled, false);
  assert.equal(track.style.transform, 'translateX(0%)');
  assert.equal(dots[0].classList.contains('active'), true);
  assert.equal(dots[1].classList.contains('active'), false);

  // Update to slide 3
  updateCarouselUI(dom, { currentSlide: 3, totalSlides: 8, isFirst: false, isLast: false });
  assert.equal(counterText.textContent, 'اسلاید ۳ از ۸');
  assert.equal(progressFill.style.width, '37.5%');
  assert.equal(prevBtn.disabled, false);
  assert.equal(nextBtn.disabled, false);
  assert.equal(track.style.transform, 'translateX(200%)');
  assert.equal(dots[0].classList.contains('active'), false);
  assert.equal(dots[2].classList.contains('active'), true);

  // Update to slide 8
  updateCarouselUI(dom, { currentSlide: 8, totalSlides: 8, isFirst: false, isLast: true });
  assert.equal(counterText.textContent, 'اسلاید ۸ از ۸');
  assert.equal(progressFill.style.width, '100%');
  assert.equal(prevBtn.disabled, false);
  assert.equal(nextBtn.disabled, true);
  assert.equal(track.style.transform, 'translateX(700%)');
  assert.equal(dots[7].classList.contains('active'), true);
});

test('02: initCarousel wires up button clicks, dot clicks, and keyboard events', async () => {
  const { initCarousel } = await import('../companion/carousel.js');

  function makeMockElement(dataset = {}) {
    let classes = new Set();
    let attrs = {};
    let listeners = {};
    return {
      style: {},
      dataset: { ...dataset },
      textContent: '',
      disabled: false,
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
    addEventListener: mockWindow.addEventListener,
    removeEventListener: mockWindow.removeEventListener,
    getElementById: (id) => {
      if (id === 'carousel-track') return track;
      if (id === 'slide-counter-text') return counterText;
      if (id === 'carousel-progress-fill') return progressFill;
      if (id === 'prev-btn') return prevBtn;
      if (id === 'next-btn') return nextBtn;
      return null;
    },
    querySelectorAll: (selector) => {
      if (selector === '#carousel-dots .carousel-dot') return dots;
      if (selector === '.slide-item') return slides;
      return [];
    },
  };

  const instance = initCarousel({ root: mockRoot, window: mockWindow, totalSlides: 8 });

  // Initial state check
  assert.equal(instance.controller.currentSlide, 1);
  assert.equal(counterText.textContent, 'اسلاید ۱ از ۸');
  assert.equal(prevBtn.disabled, true);
  assert.equal(nextBtn.disabled, false);

  // Click next button
  nextBtn.trigger('click');
  assert.equal(instance.controller.currentSlide, 2);
  assert.equal(counterText.textContent, 'اسلاید ۲ از ۸');
  assert.equal(prevBtn.disabled, false);

  // Click dot 5
  dots[4].trigger('click'); // index 5 is at dots[4]
  assert.equal(instance.controller.currentSlide, 5);
  assert.equal(counterText.textContent, 'اسلاید ۵ از ۸');

  // Keyboard left arrow (next in RTL)
  mockWindow.trigger('keydown', { key: 'ArrowLeft' });
  assert.equal(instance.controller.currentSlide, 6);

  // Keyboard right arrow (prev in RTL)
  mockWindow.trigger('keydown', { key: 'ArrowRight' });
  assert.equal(instance.controller.currentSlide, 5);

  // Click prev button
  prevBtn.trigger('click');
  assert.equal(instance.controller.currentSlide, 4);

  instance.destroy();
});

test('02: HTML Integration - index.html links carousel.js and renders 9 slide containers', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const html = fs.readFileSync(path.join(process.cwd(), 'companion', 'index.html'), 'utf8');

  assert.match(html, /<script[^>]*src=["'](?:\.\/)?carousel\.js["'][^>]*><\/script>/, 'index.html must include carousel.js script');

  for (let i = 1; i <= 9; i++) {
    assert.match(html, new RegExp(`id=["']slide-${i}["']`), `Slide ${i} container with id="slide-${i}" must exist`);
    assert.match(html, new RegExp(`data-slide-index=["']${i}["']`), `Slide ${i} must have data-slide-index="${i}"`);
  }
});



