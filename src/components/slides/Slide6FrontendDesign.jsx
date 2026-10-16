import React, { useState, useCallback } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Palette,
  Type,
  Maximize2,
  Sliders,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Eye,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { toPersianDigits } from '../../deck-engine.js';

export default function Slide6FrontendDesign({ stepIndex = 0 }) {
  // Mode can be 'compare' (side-by-side), 'before' (generic AI), or 'after' (high-craft Letters)
  const [activeMode, setActiveMode] = useState('compare');
  const [interactiveCounter, setInteractiveCounter] = useState(89);
  const [copiedToken, setCopiedToken] = useState(false);

  // Progressive disclosure based on deck build step
  // Step 0: Focus on generic AI baseline and critique
  // Step 1: Side-by-side transformation in motion
  // Step 2: Full spotlight on exquisite high-craft Letters UI
  const isStep0 = stepIndex === 0;
  const isStep1 = stepIndex >= 1;
  const isStep2 = stepIndex >= 2;

  const currentMode =
    stepIndex === 0 ? 'before' : stepIndex === 1 ? 'compare' : activeMode;

  const handleCopyTokens = useCallback(() => {
    const tokens = `/* Letters Tokens - DESIGN.md */
--color-obsidian: #070709;
--color-paper-white: #ffffff;
--color-cloud-gray: #f5f5f5;
--color-surgical-blue: #2597d0;
--radius-card: 18px;
font-family: 'Vazirmatn', sans-serif;
letter-spacing: 0;`;

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(tokens).then(() => {
        setCopiedToken(true);
        setTimeout(() => setCopiedToken(false), 2000);
      }).catch(() => {});
    }
  }, []);

  return (
    <div
      className={`frontend-design-artifact step-${stepIndex}`}
      data-step={stepIndex}
    >
      {/* Top Controller Bar */}
      <div className="transformation-header-bar">
        <div className="transformation-title-wrap">
          <Sparkles size={18} color="var(--color-surgical-blue)" />
          <strong className="transformation-heading">
            از خروجی پیش‌فرض AI تا طراحی با هویت
          </strong>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="transformation-mode-controls">
          <button
            type="button"
            className={`mode-toggle-btn ${currentMode === 'before' ? 'is-active' : ''}`}
            onClick={() => setActiveMode('before')}
            title="دیدن خروجی پیش‌فرض AI"
          >
            <AlertTriangle size={13} color="#e11d48" />
            <span>خروجی پیش‌فرض AI (Generic AI)</span>
          </button>

          <button
            type="button"
            className={`mode-toggle-btn ${currentMode === 'compare' ? 'is-active' : ''}`}
            onClick={() => setActiveMode('compare')}
            title="دیدن دو خروجی کنار هم"
          >
            <Sliders size={13} color="var(--color-surgical-blue)" />
            <span>مقایسه (Side-by-Side)</span>
          </button>

          <button
            type="button"
            className={`mode-toggle-btn ${currentMode === 'after' ? 'is-active' : ''}`}
            onClick={() => setActiveMode('after')}
            title="دیدن طراحی Letters"
          >
            <CheckCircle2 size={13} color="#16a34a" />
            <span>طراحی Letters</span>
          </button>
        </div>
      </div>

      {/* Main Visual Transformation Stage */}
      <div className={`transformation-stage layout-${currentMode}`}>
        {/* BEFORE CARD: Generic AI Output Baseline */}
        {(currentMode === 'before' || currentMode === 'compare') && (
          <div
            className={`before-card-generic ${
              stepIndex === 0 ? 'stage-spotlight' : ''
            }`}
          >
            <div className="card-critique-badge">
              <AlertTriangle size={14} color="#e11d48" />
              <span>خروجی پیش‌فرض AI؛ چند الگوی تکراری</span>
            </div>

            {/* Simulated Unstyled / AI Cliché Component */}
            <div className="ai-cliche-mockup">
              <div className="cliche-header-bar">
                <span className="cliche-category-label">DASHBOARD OVERVIEW</span>
                <span className="cliche-gradient-pill">AI POWERED</span>
              </div>

              <div className="cliche-content-body">
                <div className="cliche-metric-row">
                  <span className="cliche-big-stat">89%</span>
                  <span className="cliche-substat">+12% from last month</span>
                </div>
                <h5 className="cliche-title">System Performance Metric</h5>
                <p className="cliche-paragraph">
                  This generic component was generated without DESIGN.md boundaries, using muddy shadows, untuned serif or default sans, and uncalibrated spacing.
                </p>

                <div className="cliche-action-row">
                  <button type="button" className="cliche-btn-purple">
                    Click Here To Submit →
                  </button>
                </div>
              </div>
            </div>

            {/* Critique Flaws Callouts */}
            <div className="critique-flaws-list">
              <span className="flaw-pill">
                <strong>سایه‌های کدر:</strong> سایه‌های سنگین و تیره
              </span>
              <span className="flaw-pill">
                <strong>گرادیانت:</strong> بنفش و رنگین‌کمانیِ تکراری
              </span>
              <span className="flaw-pill">
                <strong>فونت پیش‌فرض:</strong> فونت لاتین، اعداد انگلیسی و چینش نامرتب
              </span>
              <span className="flaw-pill">
                <strong>کارت‌های شبیه‌هم:</strong> بدون اولویت بصری روشن
              </span>
            </div>
          </div>
        )}

        {/* AFTER CARD: High-Craft Letters UI */}
        {(currentMode === 'after' || currentMode === 'compare') && (
          <div
            className={`after-card-letters ${
              stepIndex >= 2 ? 'stage-spotlight' : ''
            }`}
          >
            <div className="card-craft-badge">
              <CheckCircle2 size={14} color="#16a34a" />
              <span>با skill Frontend-Design و DESIGN.md</span>
            </div>

            {/* Pristine Letters-styled Interactive Component */}
            <div className="letters-craft-mockup">
              <div className="letters-header-bar">
                <div className="letters-meta-wrap">
                  <span className="letters-brand-dot" />
                  <span className="letters-category-title">شاخص عملکرد فرانت‌اند</span>
                </div>
                <span className="letters-badge-blue">
                  <ShieldCheck size={11} />
                  <span>استاندارد Letters</span>
                </span>
              </div>

              <div className="letters-body">
                <div className="letters-metric-display">
                  <div className="letters-stat-huge">
                    +{toPersianDigits(interactiveCounter)}٪
                  </div>
                  <div className="letters-stat-details">
                  <span className="letters-stat-badge">یک نمونهٔ بهینه‌سازی</span>
                  <span className="letters-stat-sub">
                      هماهنگ با متغیرهای <code dir="ltr">DESIGN.md</code>
                    </span>
                  </div>
                </div>

                <h4 className="letters-card-title">یک کارت ساده، با قواعد روشن</h4>
                <p className="letters-card-desc">
                  رنگ‌های پایه، گوشهٔ <code dir="ltr">18px</code> و وزیرمتن با <code dir="ltr">letter-spacing: 0</code> را آگاهانه استفاده می‌کنیم.
                </p>

                {/* Interactive Micro-Interaction Area */}
                <div className="letters-interactive-zone">
                  <button
                    type="button"
                    className="letters-action-btn"
                    onClick={() =>
                      setInteractiveCounter((prev) => (prev >= 99 ? 85 : prev + 1))
                    }
                    title="امتحان تعامل"
                  >
                    <Zap size={13} color="var(--color-surgical-blue)" />
                    <span>امتحان تعامل (+۱٪)</span>
                  </button>

                  <button
                    type="button"
                    className={`letters-token-copy-btn ${copiedToken ? 'is-copied' : ''}`}
                    onClick={handleCopyTokens}
                    title="کپی توکن‌های Letters"
                  >
                    {copiedToken ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedToken ? 'توکن‌ها کپی شد! ✓' : 'کپی توکن‌های CSS'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Craft Merits Callouts */}
            <div className="craft-merits-list">
              <span className="merit-pill">
                <strong>پالت Letters:</strong> سفید، ابسیدین و یک آبی برای تأکید (<code dir="ltr">#2597d0</code>)
              </span>
              <span className="merit-pill">
                <strong>تایپوگرافی فارسی:</strong> وزیرمتن، اعداد فارسی و <code dir="ltr">letter-spacing: 0</code>
              </span>
              <span className="merit-pill">
                <strong>گوشه و سایه:</strong> شعاع <code dir="ltr">18px</code> و سایهٔ ملایم
              </span>
              <span className="merit-pill">
                <strong>تعامل‌های کوچک:</strong> انیمیشن برای بازخورد، نه تزئین
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Step 2 Full Craft Quality Banner */}
      {stepIndex >= 2 && (
        <div className="frontend-design-footer-summary animate-fade-in">
          <div className="summary-badge-icon">
            <CheckCircle2 size={18} color="#16a34a" />
          </div>
          <div className="summary-body-text">
            <strong className="summary-title">خروجی skill Frontend-Design:</strong>
            <p className="summary-p">
              <code dir="ltr">DESIGN.md</code> قواعد را مشخص می‌کند. skill Frontend-Design کمک می‌کند ایجنت همان قواعد را در UI اجرا کند و از ظاهرهای پیش‌فرض فاصله بگیرد.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
