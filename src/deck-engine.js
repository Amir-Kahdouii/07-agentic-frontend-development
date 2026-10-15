/**
 * Presenter Deck Engine & Bidirectional Step Controller
 * Governs slide navigation, intra-slide build steps, Persian numerals, and hotkeys.
 */

export function toPersianDigits(value) {
  if (value === null || value === undefined) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(value).replace(/\d/g, (d) => persianDigits[Number(d)]);
}

export const DEFAULT_SLIDES = [
  {
    id: 'paradigm-shift',
    title: 'تغییر پارادایم: مهندسی ایجنت‌محور فرانت‌اند',
    subtitle: 'گذار از پرامپت‌های ناپایدار به ایجنت‌های تخصصی و گیت‌های کنترل کیفی',
    totalSteps: 2,
    badge: 'گام ۱: پارادایم',
  },
  {
    id: 'skills-tooling',
    title: 'تجهیز محیط توسعه با ابزارها و Skills',
    subtitle: 'نصب و اجرای خودکار مهارت‌ها از طریق npx skills add',
    totalSteps: 3,
    badge: 'گام ۲: ابزارها',
  },
  {
    id: 'grilling-frontier',
    title: 'مهارت Grilling: تثبیت مرز تصمیم‌گیری قبل از کد',
    subtitle: 'کاهش اتلاف منابع با مصاحبه ساختاریافته و یک پرسش در هر دور',
    totalSteps: 3,
    badge: 'گام ۳: تصمیم‌گیری',
  },
  {
    id: 'design-grounding',
    title: 'زمینه‌سازی بصری با Refero و DESIGN.md',
    subtitle: 'تثبیت توکن‌های طراحی، پالت Letters، تایپوگرافی و مرزهای زیبایی‌شناختی',
    totalSteps: 2,
    badge: 'گام ۴: هویت بصری',
  },
  {
    id: 'dynamic-mcp',
    title: 'اکتشاف کامپوننت‌های بومی با VibeFarsi MCP',
    subtitle: 'پرس‌وجوی پویای رجیستری و دریافت کامپوننت‌های استاندارد راست‌به‌چپ',
    totalSteps: 3,
    badge: 'گام ۵: کامپوننت‌ها',
  },
  {
    id: 'frontend-design-exec',
    title: 'اجرای دقیق با مهارت Frontend-Design',
    subtitle: 'فرار از الگوهای کلیشه‌ای هوش مصنوعی با تایپوگرافی و چیدمان حساب‌شده',
    totalSteps: 2,
    badge: 'گام ۶: پیاده‌سازی',
  },
  {
    id: 'quality-gates',
    title: 'گیت‌های اعتبارسنجی کیفی (TDD و Code Review)',
    subtitle: 'آزمون خطوط مرزی، بررسی استانداردها و مشخصات قبل از کامیت نهایی',
    totalSteps: 3,
    badge: 'گام ۷: اعتبارسنجی',
  },
  {
    id: 'full-playbook',
    title: 'پلی‌بوک نهایی: چرخه کامل توسعه فرانت‌اند',
    subtitle: 'نقشه راه یکپارچه از مشخصه‌سازی تا استقرار خودکار روی GitHub Pages',
    totalSteps: 2,
    badge: 'گام ۸: استقرار',
  },
];

export function createDeckController({
  slides = DEFAULT_SLIDES,
  initialSlideIndex = 0,
  initialStepIndex = 0,
  onFullscreenToggle,
} = {}) {
  const safeSlides = Array.isArray(slides) && slides.length > 0 ? slides : DEFAULT_SLIDES;
  let slideIndex = Math.max(0, Math.min(initialSlideIndex, safeSlides.length - 1));
  const currentTotalSteps = safeSlides[slideIndex]?.totalSteps ?? 0;
  let stepIndex = Math.max(0, Math.min(initialStepIndex, currentTotalSteps));
  const listeners = new Set();

  function getState() {
    const currentSlide = safeSlides[slideIndex];
    const totalSteps = currentSlide?.totalSteps ?? 0;
    const isFirst = slideIndex === 0 && stepIndex === 0;
    const isLast = slideIndex === safeSlides.length - 1 && stepIndex === totalSteps;

    return {
      slideIndex,
      stepIndex,
      currentSlide,
      totalSlides: safeSlides.length,
      totalSteps,
      isFirst,
      isLast,
      canGoNext: !isLast,
      canGoPrev: !isFirst,
    };
  }

  function notify() {
    const state = getState();
    for (const listener of listeners) {
      try {
        listener(state);
      } catch (err) {
        console.error('Error in deck state listener:', err);
      }
    }
  }

  function next() {
    const currentSlide = safeSlides[slideIndex];
    const totalSteps = currentSlide?.totalSteps ?? 0;

    // Increment micro-step within active slide if steps remain
    if (stepIndex < totalSteps) {
      stepIndex += 1;
      notify();
      return { moved: true, type: 'step', slideIndex, stepIndex };
    }

    // Advance to next slide at step 0 if not at the last slide
    if (slideIndex < safeSlides.length - 1) {
      slideIndex += 1;
      stepIndex = 0;
      notify();
      return { moved: true, type: 'slide', slideIndex, stepIndex };
    }

    return { moved: false, slideIndex, stepIndex };
  }

  function prev() {
    // Decrement micro-step within active slide if above 0
    if (stepIndex > 0) {
      stepIndex -= 1;
      notify();
      return { moved: true, type: 'step', slideIndex, stepIndex };
    }

    // Retreat to previous slide, landing on its final build step
    if (slideIndex > 0) {
      slideIndex -= 1;
      const prevSlide = safeSlides[slideIndex];
      stepIndex = prevSlide?.totalSteps ?? 0;
      notify();
      return { moved: true, type: 'slide', slideIndex, stepIndex };
    }

    return { moved: false, slideIndex, stepIndex };
  }

  function goToSlide(targetSlideIndex, targetStepIndex = 0) {
    if (
      typeof targetSlideIndex !== 'number' ||
      targetSlideIndex < 0 ||
      targetSlideIndex >= safeSlides.length
    ) {
      return false;
    }

    const maxSteps = safeSlides[targetSlideIndex]?.totalSteps ?? 0;
    const clampedStep = Math.max(0, Math.min(targetStepIndex, maxSteps));

    if (slideIndex === targetSlideIndex && stepIndex === clampedStep) {
      return false;
    }

    slideIndex = targetSlideIndex;
    stepIndex = clampedStep;
    notify();
    return true;
  }

  function handleKeyDown(event) {
    if (!event) return false;

    // Do not capture keys if active element is an input or editable field
    const target = event.target;
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable)
    ) {
      return false;
    }

    const key = event.key;
    const code = event.code;

    // Forward navigation: ArrowRight, Space, PageDown
    if (key === 'ArrowRight' || key === ' ' || key === 'PageDown' || code === 'Space') {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      return next().moved;
    }

    // Reverse navigation: ArrowLeft, PageUp
    if (key === 'ArrowLeft' || key === 'PageUp') {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      return prev().moved;
    }

    // Fullscreen presentation toggle: 'f', 'F' or KeyF
    if (key === 'f' || key === 'F' || code === 'KeyF') {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      if (typeof onFullscreenToggle === 'function') {
        onFullscreenToggle();
      }
      return true;
    }

    return false;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return {
    getState,
    next,
    prev,
    goToSlide,
    handleKeyDown,
    subscribe,
  };
}
