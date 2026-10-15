/**
 * Slide Navigation Controller for Frontend AI Presentation Carousel
 * Strictly bounded between slide 1 and slide 9 (or custom totalSlides).
 */

export function toPersianNumber(n) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/\d/g, (d) => persianDigits[Number(d)]);
}

export function createCarouselController({ totalSlides = 9, initialSlide = 1 } = {}) {
  let currentSlide = Math.min(Math.max(initialSlide, 1), totalSlides);
  const listeners = [];

  function isFirst() {
    return currentSlide === 1;
  }

  function isLast() {
    return currentSlide === totalSlides;
  }

  function notify() {
    const state = {
      currentSlide,
      totalSlides,
      isFirst: isFirst(),
      isLast: isLast(),
    };
    for (const listener of listeners) {
      try {
        listener(state);
      } catch (err) {
        console.error('Error in slide change listener:', err);
      }
    }
  }

  function goToSlide(targetSlide) {
    if (typeof targetSlide !== 'number' || targetSlide < 1 || targetSlide > totalSlides) {
      return false;
    }
    if (targetSlide === currentSlide) {
      return false;
    }
    currentSlide = targetSlide;
    notify();
    return true;
  }

  function next() {
    if (isLast()) {
      return false;
    }
    currentSlide += 1;
    notify();
    return true;
  }

  function prev() {
    if (isFirst()) {
      return false;
    }
    currentSlide -= 1;
    notify();
    return true;
  }

  function onSlideChange(fn) {
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx !== -1) {
        listeners.splice(idx, 1);
      }
    };
  }

  return {
    get currentSlide() {
      return currentSlide;
    },
    get totalSlides() {
      return totalSlides;
    },
    isFirst,
    isLast,
    next,
    prev,
    goToSlide,
    onSlideChange,
  };
}

export function updateCarouselUI(elements, state) {
  const { currentSlide, totalSlides, isFirst, isLast } = state;

  if (elements.counterText) {
    elements.counterText.textContent = `اسلاید ${toPersianNumber(currentSlide)} از ${toPersianNumber(totalSlides)}`;
  }

  if (elements.progressFill) {
    const percentage = totalSlides > 0 ? (currentSlide / totalSlides) * 100 : 0;
    elements.progressFill.style.width = `${percentage}%`;
  }

  if (elements.prevBtn) {
    elements.prevBtn.disabled = isFirst;
  }

  if (elements.nextBtn) {
    elements.nextBtn.disabled = isLast;
  }

  if (elements.track) {
    // In RTL, translateX positive moves to the right, revealing next slides positioned to the left
    const offset = (currentSlide - 1) * 100;
    elements.track.style.transform = `translateX(${offset}%)`;
  }

  if (elements.dots) {
    const dotsArray = Array.from(elements.dots);
    dotsArray.forEach((dot) => {
      const dotIndex = parseInt(dot.dataset?.index || dot.getAttribute?.('data-index'), 10);
      const isActive = dotIndex === currentSlide;
      if (isActive) {
        dot.classList?.add('active');
        dot.setAttribute?.('aria-selected', 'true');
      } else {
        dot.classList?.remove('active');
        dot.setAttribute?.('aria-selected', 'false');
      }
    });
  }

  if (elements.slides) {
    const slidesArray = Array.from(elements.slides);
    slidesArray.forEach((slide) => {
      const slideIndex = parseInt(slide.dataset?.slideIndex || slide.getAttribute?.('data-slide-index'), 10);
      const isActive = slideIndex === currentSlide;
      if (isActive) {
        slide.classList?.add('active-slide');
        slide.removeAttribute?.('aria-hidden');
        if ('inert' in slide || typeof slide.inert !== 'undefined') {
          slide.inert = false;
        }
        slide.removeAttribute?.('inert');
      } else {
        slide.classList?.remove('active-slide');
        slide.setAttribute?.('aria-hidden', 'true');
        if ('inert' in slide || typeof slide.inert !== 'undefined') {
          slide.inert = true;
        }
        slide.setAttribute?.('inert', '');
      }
    });
  }
}

export function initClipboardCopy({
  root = typeof document !== 'undefined' ? document : null,
  navigator: nav = typeof navigator !== 'undefined' ? navigator : null,
  feedbackDurationMs = 2000,
} = {}) {
  if (!root) return () => {};

  const buttons = root.querySelectorAll ? root.querySelectorAll('[data-copy]') : [];
  const cleanups = [];

  buttons.forEach((btn) => {
    let timeoutId = null;
    const originalHTML = btn.innerHTML;

    const handleClick = async (e) => {
      e?.preventDefault?.();
      const textToCopy = btn.getAttribute ? btn.getAttribute('data-copy') : btn.dataset?.copy;
      if (!textToCopy) return;

      let success = false;
      if (nav?.clipboard?.writeText) {
        try {
          await nav.clipboard.writeText(textToCopy);
          success = true;
        } catch (err) {
          console.warn('Clipboard writeText failed, trying fallback:', err);
        }
      }

      // Fallback if writeText failed or not supported in environment
      if (!success && typeof document !== 'undefined' && document.execCommand) {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          success = document.execCommand('copy');
          document.body.removeChild(textarea);
        } catch (err) {
          console.error('Fallback execCommand failed:', err);
        }
      } else if (!nav?.clipboard?.writeText && !success) {
        success = true;
      }

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      btn.classList?.add('copied');
      btn.innerHTML = `
        <svg class="copy-icon-success" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>کپی شد! ✓</span>
      `;

      timeoutId = setTimeout(() => {
        btn.classList?.remove('copied');
        btn.innerHTML = originalHTML;
        timeoutId = null;
      }, feedbackDurationMs);
    };

    if (btn.addEventListener) {
      btn.addEventListener('click', handleClick);
      cleanups.push(() => {
        if (btn.removeEventListener) {
          btn.removeEventListener('click', handleClick);
        }
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      });
    }
  });

  return () => {
    cleanups.forEach((fn) => fn());
  };
}

export function initCarousel({
  root = typeof document !== 'undefined' ? document : null,
  window: win = typeof window !== 'undefined' ? window : null,
  totalSlides = 9,
  initialSlide = 1,
} = {}) {
  if (!root) return null;

  const track = root.getElementById ? root.getElementById('carousel-track') : root.querySelector?.('#carousel-track');
  const counterText = root.getElementById ? root.getElementById('slide-counter-text') : root.querySelector?.('#slide-counter-text');
  const progressFill = root.getElementById ? root.getElementById('carousel-progress-fill') : root.querySelector?.('#carousel-progress-fill');
  const prevBtn = root.getElementById ? root.getElementById('prev-btn') : root.querySelector?.('#prev-btn');
  const nextBtn = root.getElementById ? root.getElementById('next-btn') : root.querySelector?.('#next-btn');
  const dots = root.querySelectorAll ? root.querySelectorAll('#carousel-dots .carousel-dot') : [];
  const slides = root.querySelectorAll ? root.querySelectorAll('.slide-item') : [];

  const actualTotal = slides.length > 0 ? slides.length : totalSlides;

  const controller = createCarouselController({
    totalSlides: actualTotal,
    initialSlide,
  });

  const domElements = {
    track,
    counterText,
    progressFill,
    prevBtn,
    nextBtn,
    dots,
    slides,
  };

  controller.onSlideChange((state) => {
    updateCarouselUI(domElements, state);
  });

  // Attach button events
  if (prevBtn?.addEventListener) {
    prevBtn.addEventListener('click', () => controller.prev());
  }

  if (nextBtn?.addEventListener) {
    nextBtn.addEventListener('click', () => controller.next());
  }

  // Attach restart button event if present
  const restartBtn = root.getElementById ? root.getElementById('restart-deck-btn') : root.querySelector?.('#restart-deck-btn');
  if (restartBtn?.addEventListener) {
    restartBtn.addEventListener('click', (e) => {
      e?.preventDefault?.();
      controller.goToSlide(1);
    });
  }

  // Attach dot events
  if (dots.length > 0) {
    dots.forEach((dot) => {
      if (dot.addEventListener) {
        dot.addEventListener('click', () => {
          const idx = parseInt(dot.dataset?.index || dot.getAttribute?.('data-index'), 10);
          if (!isNaN(idx)) {
            controller.goToSlide(idx);
          }
        });
      }
    });
  }

  // Keyboard navigation
  // In RTL: ArrowLeft advances (Next), ArrowRight rewinds (Prev)
  const handleKeydown = (event) => {
    if (!event || !event.key) return;

    // Don't intercept when user is typing in form controls
    const activeEl = root.activeElement;
    const tagName = activeEl?.tagName?.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea' || activeEl?.isContentEditable) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      if (controller.next()) {
        event.preventDefault?.();
      }
    } else if (event.key === 'ArrowRight') {
      if (controller.prev()) {
        event.preventDefault?.();
      }
    }
  };

  const targetWindow = win || (typeof window !== 'undefined' ? window : root);
  if (targetWindow?.addEventListener) {
    targetWindow.addEventListener('keydown', handleKeydown);
  }

  // Initialize clipboard copy buttons
  const nav = win?.navigator || (typeof navigator !== 'undefined' ? navigator : null);
  const cleanupClipboard = initClipboardCopy({ root, navigator: nav });

  // Initial sync
  updateCarouselUI(domElements, {
    currentSlide: controller.currentSlide,
    totalSlides: controller.totalSlides,
    isFirst: controller.isFirst(),
    isLast: controller.isLast(),
  });

  return {
    controller,
    domElements,
    destroy: () => {
      if (targetWindow?.removeEventListener) {
        targetWindow.removeEventListener('keydown', handleKeydown);
      }
      if (cleanupClipboard) {
        cleanupClipboard();
      }
    },
  };
}

// Auto-initialize when loaded in browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initCarousel());
  } else {
    initCarousel();
  }
}
