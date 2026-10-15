import React, { useState, useCallback } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Terminal,
  Smartphone,
  Tablet,
  Monitor,
  Code2,
  FileCheck,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  AlertCircle,
  GitPullRequest,
  CheckCheck,
} from 'lucide-react';
import { toPersianDigits } from '../../deck-engine.js';

const GATES_DATA = [
  {
    id: 'standards',
    gateNumber: 1,
    title: 'گیت ۱: انطباق با استانداردها (Standards Verification)',
    agent: 'code-review',
    agentRole: 'ایجنت تخصصی بازبینی استانداردهای معماری و قواعد مخزن',
    description:
      'بررسی پایبندی کد به توکن‌های DESIGN.md، ماژول‌های عمیق، ساختار منطقی RTL و پرهیز از تایپ‌کست‌های ناامن.',
    metrics: [
      { label: 'پایبندی به معماری', value: '۱۰۰٪' },
      { label: 'خطاهای استاتیک', value: '۰ خطا' },
      { label: 'زمان پردازش ایجنت', value: '۰٫۸ ثانیه' },
    ],
    checks: [
      'تطابق کامل رنگ‌ها و فواصل با توکن‌های پالت Letters',
      'به‌کارگیری خصوصیات منطقی CSS جهت راست‌به‌چپ بومی',
      'فقدان کست‌های غیراستاندارد TypeScript و عدم تخریب اینترفیس‌ها',
    ],
    logOutput: `[code-review agent] Standards audit passed cleanly:
  ✔ No arbitrary hardcoded color hex values found
  ✔ RTL logical spacing verified (ms-*, me-*, border-inline-start)
  ✔ Modular depth verified: shallow interfaces with deep implementations
  ✔ Verdict: 100% compliant with repo architectural conventions`,
  },
  {
    id: 'spec',
    gateNumber: 2,
    title: 'گیت ۲: تطابق کامل با مشخصات (Spec Verification)',
    agent: 'spec-review',
    agentRole: 'ایجنت تخصصی تطابق خط به خط کدهای توسعه‌یافته با تیکت و مشخصات',
    description:
      'ارزیابی و انطباق خروجی نهایی با موارد مندرج در تیکت‌های .scratch/ و آزمون‌های TDD از پیش طراحی‌شده.',
    metrics: [
      { label: 'معیارهای برآورده‌شده', value: '۵ از ۵' },
      { label: 'پوشش آزمون‌های TDD', value: '۱۰۰٪' },
      { label: 'انطباق با رفتار کاربر', value: 'تأیید کامل' },
    ],
    checks: [
      'پیاده‌سازی دقیق تمامی گام‌های افشای تدریجی (Build Steps)',
      'پوشش کامل حالات مرزی (Edge Cases) و ناوبری دوطرفه برگشت‌پذیر',
      'پاس شدن بی‌قیدوشرط تمام تست‌های سوئیت یکپارچه‌سازی',
    ],
    logOutput: `[spec-review agent] Spec checklist verification:
  ✔ Issue criteria 5/5 verified against spec.md
  ✔ Build steps 0 -> 1 -> 2 -> 3 reversible state tested
  ✔ Keyboard navigation events (ArrowRight, ArrowLeft, Space, F) passing
  ✔ Verdict: Spec criteria 100% satisfied without scope drift`,
  },
  {
    id: 'responsive',
    gateNumber: 3,
    title: 'گیت ۳: آزمون ریسپانسیو و پایش بصری (Cross-Device Audit)',
    agent: 'responsive-audit',
    agentRole: 'ایجنت تخصصی راستی‌آزمایی در ویوپورت‌های استاندارد موبایل و دسکتاپ',
    description:
      'آزمون رندرینگ در عرض‌های ۳۷۵px (موبایل)، ۷۶۸px (تبلت) و ۱۴۴۰px (دسکتاپ) بدون پرش چیدمان و با تایپوگرافی دقیق.',
    metrics: [
      { label: 'تعداد نماهای بررسی‌شده', value: '۳ ویوپورت' },
      { label: 'تغییر ناخواسته چیدمان (CLS)', value: '۰٫۰۰' },
      { label: 'تایپوگرافی وزیرمتن', value: 'فاصله صفر' },
    ],
    checks: [
      'موبایل (۳۷۵px): چیدمان تک‌ستونه روان با اسکرول ارگونومیک',
      'تبلت (۷۶۸px): سازمان‌دهی انعطاف‌پذیر پنل‌ها و ابعاد لمسی بهینه',
      'دسکتاپ (۱۴۴۰px): نمایش کامل ماتریس اطلاعات با نهایت تعادل بصری',
    ],
    logOutput: `[responsive-audit agent] Viewport matrix simulation:
  ✔ Mobile (375px): 1-column fluid flow, 0 layout shifts, touch targets > 44px
  ✔ Tablet (768px): clean grid collapse, all metrics legible
  ✔ Desktop (1440px): full canvas fidelity, crisp obsidian contrast
  ✔ Typography check: Vazirmatn letter-spacing: 0 strictly maintained`,
  },
];

export default function Slide7QualityGates({ stepIndex = 0 }) {
  const [expandedGate, setExpandedGate] = useState(null);
  const [copiedLog, setCopiedLog] = useState(false);

  // Gate pass status based on stepIndex:
  // stepIndex 0: Standby (All pending)
  // stepIndex 1: Gate 1 passed (Standards)
  // stepIndex 2: Gate 1 & 2 passed (Standards + Spec)
  // stepIndex 3: Gate 1, 2 & 3 passed (Full pipeline passed -> Ready to merge!)
  const isGate1Passed = stepIndex >= 1;
  const isGate2Passed = stepIndex >= 2;
  const isGate3Passed = stepIndex >= 3;
  const allPassed = isGate3Passed;

  const passedCount = isGate3Passed ? 3 : isGate2Passed ? 2 : isGate1Passed ? 1 : 0;

  const toggleExpand = useCallback((gateId) => {
    setExpandedGate((prev) => (prev === gateId ? null : gateId));
  }, []);

  const handleCopyReport = useCallback(() => {
    const report = `# Quality Assurance Pipeline Report
Gate 1: Standards Verification -> ${isGate1Passed ? 'PASSED (100%)' : 'PENDING'}
Gate 2: Spec Verification      -> ${isGate2Passed ? 'PASSED (5/5 criteria)' : 'PENDING'}
Gate 3: Responsive & Visual   -> ${isGate3Passed ? 'PASSED (Mobile, Tablet, Desktop)' : 'PENDING'}
Pipeline Verdict: ${allPassed ? 'READY TO MERGE & DEPLOY' : 'IN PROGRESS'}`;

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(report).then(() => {
        setCopiedLog(true);
        setTimeout(() => setCopiedLog(false), 2000);
      }).catch(() => {});
    }
  }, [isGate1Passed, isGate2Passed, isGate3Passed, allPassed]);

  return (
    <div
      className={`quality-gates-artifact step-${stepIndex}`}
      data-step={stepIndex}
      data-gates-passed={passedCount}
    >
      {/* Top Header Bar: Sub-Agents Execution Status */}
      <div className="qa-header-bar">
        <div className="qa-header-title-wrap">
          <ShieldCheck size={20} color="var(--color-surgical-blue)" />
          <div className="qa-header-text">
            <h3 className="qa-main-heading">
              شبکهٔ ارزیابی موازی ایجنت‌ها (Parallel Sub-Agent Quality Gates)
            </h3>
            <p className="qa-sub-heading">
              قبل از هر کامیت نهایی، سه گیت اعتبارسنجی مستقل به‌صورت خودکار اجرا می‌شوند
            </p>
          </div>
        </div>

        <div className="qa-header-actions">
          <button
            type="button"
            className="copy-report-btn"
            onClick={handleCopyReport}
            title="کپی گزارش کیفی"
          >
            {copiedLog ? (
              <>
                <Check size={14} color="#16a34a" />
                <span className="copy-label">گزارش کپی شد! ✓</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="copy-label">کپی گزارش کیفی</span>
              </>
            )}
          </button>

          <div className="qa-progress-pill">
            <span className="qa-progress-dots">
              <span className={`qa-dot ${isGate1Passed ? 'is-passed' : 'is-pending'}`} />
              <span className={`qa-dot ${isGate2Passed ? 'is-passed' : 'is-pending'}`} />
              <span className={`qa-dot ${isGate3Passed ? 'is-passed' : 'is-pending'}`} />
            </span>
            <span className="qa-progress-text">
              {toPersianDigits(passedCount)} از ۳ گیت تأیید شده
            </span>
          </div>
        </div>
      </div>

      {/* Main Verification Checklist */}
      <div className="gates-checklist-container">
        {GATES_DATA.map((gate, index) => {
          const isPassed =
            index === 0 ? isGate1Passed : index === 1 ? isGate2Passed : isGate3Passed;
          const isCurrentActive =
            (index === 0 && stepIndex === 1) ||
            (index === 1 && stepIndex === 2) ||
            (index === 2 && stepIndex === 3);
          const isExpanded = expandedGate === gate.id;

          return (
            <div
              key={gate.id}
              className={`gate-item ${isPassed ? 'is-passed' : 'is-pending'} ${
                isCurrentActive ? 'is-active-pulse' : ''
              }`}
              data-gate-id={gate.id}
              data-passed={isPassed}
            >
              <div className="gate-summary-row" onClick={() => toggleExpand(gate.id)}>
                {/* Gate Status Icon */}
                <div className="gate-status-col">
                  {isPassed ? (
                    <div className="gate-icon-badge passed" title="گیت با موفقیت تأیید شد">
                      <CheckCircle2 size={20} color="#10b981" />
                    </div>
                  ) : (
                    <div className="gate-icon-badge pending" title="در انتظار بررسی ایجنت">
                      <Clock size={18} color="#f59e0b" />
                    </div>
                  )}
                  <span className="gate-number-tag">
                    گام {toPersianDigits(gate.gateNumber)}
                  </span>
                </div>

                {/* Gate Content Overview */}
                <div className="gate-content-col">
                  <div className="gate-title-row">
                    <strong className="gate-title">{gate.title}</strong>
                    <span className="gate-agent-tag">
                      <Terminal size={12} />
                      <code>{gate.agent}</code>
                    </span>
                  </div>

                  <p className="gate-description">{gate.description}</p>

                  {/* Inline Metrics */}
                  <div className="gate-metrics-grid">
                    {gate.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="gate-metric-box">
                        <span className="metric-label">{metric.label}:</span>
                        <strong className="metric-val">{metric.value}</strong>
                      </div>
                    ))}

                    {/* Viewport indicators for Gate 3 */}
                    {gate.id === 'responsive' && (
                      <div className="viewport-pills-row">
                        <span className={`viewport-pill ${isGate3Passed ? 'passed' : ''}`}>
                          <Smartphone size={12} />
                          <span>۳۷۵px موبایل {isGate3Passed ? '✓' : ''}</span>
                        </span>
                        <span className={`viewport-pill ${isGate3Passed ? 'passed' : ''}`}>
                          <Tablet size={12} />
                          <span>۷۶۸px تبلت {isGate3Passed ? '✓' : ''}</span>
                        </span>
                        <span className={`viewport-pill ${isGate3Passed ? 'passed' : ''}`}>
                          <Monitor size={12} />
                          <span>۱۴۴۰px دسکتاپ {isGate3Passed ? '✓' : ''}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Badge and Details Toggle */}
                <div className="gate-action-col">
                  <div className={`gate-status-badge ${isPassed ? 'passed' : 'pending'}`}>
                    {isPassed ? (
                      <>
                        <CheckCheck size={14} />
                        <span>تأیید شد (Passed)</span>
                      </>
                    ) : (
                      <>
                        <Clock size={14} />
                        <span>در انتظار اجرا</span>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    className="toggle-log-btn"
                    aria-label="مشاهده لاگ ارزیابی ایجنت"
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Collapsible / Expandable Details & Log Terminal */}
              {isExpanded && (
                <div className="gate-expanded-details">
                  <div className="gate-checks-list">
                    <strong className="checks-heading">موارد بررسی‌شده توسط ایجنت:</strong>
                    <ul>
                      {gate.checks.map((check, cIdx) => (
                        <li key={cIdx} className="check-item">
                          <CheckCircle2 size={13} color="#10b981" />
                          <span>{check}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="gate-log-terminal">
                    <div className="terminal-header">
                      <span className="terminal-title">خروجی کنسول ایجنت {gate.agent}</span>
                      <span className="terminal-badge">JSON-RPC / CLI Output</span>
                    </div>
                    <pre className="terminal-code">
                      <code>{gate.logOutput}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Verdict / Pipeline Readiness Banner */}
      <div className={`pipeline-verdict ${allPassed ? 'ready-to-merge' : 'in-progress'}`}>
        <div className="verdict-icon-wrap">
          {allPassed ? (
            <ShieldCheck size={28} color="#10b981" />
          ) : (
            <GitPullRequest size={26} color="var(--color-surgical-blue)" />
          )}
        </div>

        <div className="verdict-content">
          <h4 className="verdict-title">
            {allPassed
              ? 'تأیید نهایی خط لوله: آمادهٔ ادغام و استقرار (Pipeline Passed / Ready to Merge)'
              : 'خط لوله کنترل کیفی در حال پردازش گیت‌های موازی'}
          </h4>
          <p className="verdict-desc">
            {allPassed
              ? 'تمامی ۳ گیت اعتبارسنجی (استانداردها، مشخصات و واکنش‌گرایی) با موفقیت پاس شدند. محصول عاری از خطا و آماده ارسال به پروداکشن است.'
              : `در حال حاضر ${toPersianDigits(passedCount)} از ۳ گیت اعتبارسنجی تکمیل شده است. با زدن کلید جهت‌نمای راست یا Space گیت بعدی را ارزیابی کنید.`}
          </p>
        </div>

        <div className="verdict-badge">
          {allPassed ? (
            <span className="verdict-tag passed">
              <Sparkles size={14} />
              <span>آمادهٔ ادغام در main</span>
            </span>
          ) : (
            <span className="verdict-tag progress">
              <Clock size={14} />
              <span>مرحلهٔ {toPersianDigits(stepIndex)} از ۳</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
