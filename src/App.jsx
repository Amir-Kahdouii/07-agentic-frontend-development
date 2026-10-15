import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BookOpen,
  Presentation,
  Sparkles,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Layers,
  Terminal,
  MessageSquare,
  Palette,
  Cpu,
  CheckCircle2,
  Compass,
  FileCode2,
} from 'lucide-react';
import {
  createDeckController,
  toPersianDigits,
  DEFAULT_SLIDES,
} from './deck-engine.js';

// Slide icon mapping for distinct visual identity
const SLIDE_ICONS = [
  Layers,
  Terminal,
  MessageSquare,
  Palette,
  Cpu,
  FileCode2,
  CheckCircle2,
  Compass,
];

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

  // Initialize central DeckController instance
  const controller = useMemo(() => {
    return createDeckController({
      slides: DEFAULT_SLIDES,
      onFullscreenToggle: toggleFullscreen,
    });
  }, [toggleFullscreen]);

  // Synchronize React state with DeckController
  const [deckState, setDeckState] = useState(() => controller.getState());

  useEffect(() => {
    const unsubscribe = controller.subscribe((newState) => {
      setDeckState(newState);
    });
    return unsubscribe;
  }, [controller]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Keyboard navigation listener (ArrowRight, Space, ArrowLeft, PageDown, PageUp, F)
  useEffect(() => {
    const handleKeyDown = (e) => {
      controller.handleKeyDown(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [controller]);

  const {
    slideIndex,
    stepIndex,
    currentSlide,
    totalSlides,
    totalSteps,
    canGoNext,
    canGoPrev,
  } = deckState;

  const SlideIcon = SLIDE_ICONS[slideIndex] || Sparkles;

  return (
    <div
      className={`deck-root ${isFullscreen ? 'is-fullscreen' : ''}`}
      data-fullscreen={isFullscreen}
      data-slide-index={slideIndex}
      data-step-index={stepIndex}
    >
      <div className="deck-atmospheric-bar" />

      {/* Header */}
      <header className="deck-header">
        <div className="deck-brand">
          <Presentation size={22} color="var(--color-surgical-blue)" />
          <span className="deck-title">توسعه فرانت‌اند با هوش مصنوعی</span>
          <span className="deck-badge">{currentSlide.badge || 'ارائه زنده'}</span>
        </div>

        <div className="deck-header-actions">
          {/* Fullscreen Toggle */}
          <button
            type="button"
            className="deck-action-btn"
            id="fullscreen-toggle-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'خروج از حالت تمام‌صفحه (F)' : 'ارائه در حالت تمام‌صفحه (F)'}
            aria-label="حالت تمام صفحه"
          >
            {isFullscreen ? (
              <Minimize2 size={16} color="var(--color-surgical-blue)" />
            ) : (
              <Maximize2 size={16} color="var(--color-surgical-blue)" />
            )}
            <span className="deck-key-hint">F</span>
          </button>

          {/* Reading Companion Badge */}
          <a
            href="./companion/"
            className="companion-link-btn"
            id="companion-link-btn"
            title="مشاهده نسخه همراه متنی و جامع"
          >
            <BookOpen size={16} color="var(--color-surgical-blue)" />
            <span>همراه متنی (Companion)</span>
          </a>
        </div>
      </header>

      {/* Main Presentation Canvas */}
      <main className="deck-canvas">
        <article
          className="slide-frame"
          id="presenter-deck-container"
          data-slide-index={slideIndex}
          data-step-index={stepIndex}
          data-total-steps={totalSteps}
        >
          {/* Top category label */}
          <div className="slide-top-bar">
            <span className="slide-category-badge">
              <SlideIcon size={14} />
              <span>{currentSlide.badge}</span>
            </span>

            <span className="slide-step-counter-pill">
              مرحلهٔ {toPersianDigits(stepIndex)} از {toPersianDigits(totalSteps)}
            </span>
          </div>

          {/* Title and subtitle */}
          <h1 className="slide-main-title">{currentSlide.title}</h1>
          <p className="slide-main-subtitle">{currentSlide.subtitle}</p>

          {/* Hero Artifact Simulation Container */}
          <div className="slide-content-area">
            <div className="hero-artifact-placeholder">
              <div className="artifact-status-header">
                <span className="artifact-dot" />
                <span className="artifact-dot" />
                <span className="artifact-dot" />
                <span className="artifact-title">شبیه‌ساز گام‌های تعاملی اسلاید</span>
              </div>

              <div className="artifact-body">
                <p className="artifact-lead-text">
                  اسلاید فعال: <strong>{currentSlide.title}</strong>
                </p>

                <div className="build-steps-list">
                  {Array.from({ length: totalSteps + 1 }).map((_, stepNum) => {
                    const isPassed = stepNum <= stepIndex;
                    const isCurrent = stepNum === stepIndex;
                    return (
                      <div
                        key={stepNum}
                        className={`build-step-item ${isPassed ? 'is-passed' : ''} ${
                          isCurrent ? 'is-current' : ''
                        }`}
                      >
                        <div className="build-step-marker">
                          {toPersianDigits(stepNum)}
                        </div>
                        <div className="build-step-text">
                          {stepNum === 0
                            ? 'نمای کلی و تبیین مسئله اولیه'
                            : `زیرمرحلهٔ شمارهٔ ${toPersianDigits(stepNum)}: افشا و متحرک‌سازی تدریجی مؤلفه`}
                        </div>
                        {isCurrent && <span className="current-step-tag">فعال</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Presentation Footer */}
      <footer className="deck-footer">
        {/* Persian Numeral Slide Counter */}
        <div className="deck-counter-wrapper">
          <span className="deck-counter-label">اسلاید: </span>
          <strong id="slide-indicator" className="deck-counter-value">
            {toPersianDigits(slideIndex + 1)} / {toPersianDigits(totalSlides)}
          </strong>
        </div>

        {/* Segmented Step Ticks */}
        <div
          className="deck-step-ticks-container"
          id="deck-step-ticks"
          data-step-index={stepIndex}
          data-total-steps={totalSteps}
        >
          <div className="step-ticks-group">
            {totalSteps > 0 &&
              Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`step-tick ${i < stepIndex ? 'is-active' : ''}`}
                  data-active={i < stepIndex}
                  title={`مرحلهٔ ${toPersianDigits(i + 1)} از ${toPersianDigits(totalSteps)}`}
                />
              ))}
          </div>
          <span className="step-ticks-label">
            {totalSteps > 0
              ? `گام ${toPersianDigits(stepIndex)} از ${toPersianDigits(totalSteps)}`
              : 'بدون زیرمرحله'}
          </span>
        </div>

        {/* Navigation Controls and Keyboard Hints */}
        <div className="deck-navigation-bar">
          <div className="deck-key-hints">
            <span>جهت‌نما / Space / F</span>
          </div>

          <div className="deck-nav-buttons">
            <button
              type="button"
              className="deck-nav-btn"
              onClick={() => controller.prev()}
              disabled={!canGoPrev}
              title="مرحله قبلی (ArrowLeft)"
              aria-label="مرحله قبلی"
            >
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              className="deck-nav-btn"
              onClick={() => controller.next()}
              disabled={!canGoNext}
              title="مرحله بعدی (ArrowRight یا Space)"
              aria-label="مرحله بعدی"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
