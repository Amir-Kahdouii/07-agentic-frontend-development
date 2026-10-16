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
    title: 'چک ۱: استانداردهای پروژه (Standards)',
    agent: 'code-review',
    agentRole: 'ایجنت تخصصی بازبینی استانداردهای معماری و قواعد مخزن',
    description:
      'می‌بینیم کد با DESIGN.md، قواعد RTL و ساختار پروژه هماهنگ است.',
    metrics: [
      { label: 'هم‌خوانی با قواعد', value: '۱۰۰٪' },
      { label: 'خطاهای استاتیک', value: '۰ خطا' },
      { label: 'زمان بررسی', value: '۰٫۸ ثانیه' },
    ],
    checks: [
      'رنگ‌ها و فاصله‌ها با توکن‌های Letters یکی هستند',
      'CSS با خصوصیت‌های منطقی RTL نوشته شده',
      'TypeScript کست ناامن ندارد و اینترفیس‌ها سالم مانده‌اند',
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
    title: 'چک ۲: آیا با Spec می‌خواند؟',
    agent: 'spec-review',
    agentRole: 'ایجنت تخصصی تطابق خط به خط کدهای توسعه‌یافته با تیکت و مشخصات',
    description:
      'خروجی را با تیکت‌های .scratch/ و تست‌های TDD کنار هم می‌گذاریم.',
    metrics: [
      { label: 'معیارهای پاس‌شده', value: '۵ از ۵' },
      { label: 'پوشش TDD', value: '۱۰۰٪' },
      { label: 'رفتار مورد انتظار', value: 'تأیید شد' },
    ],
    checks: [
      'همهٔ گام‌های نمایش (Build Steps) اجرا شده‌اند',
      'حالت‌های مرزی و ناوبری دوطرفه پوشش دارند',
      'تست‌های یکپارچه پاس شده‌اند',
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
    title: 'چک ۳: روی صفحه‌های مختلف',
    agent: 'responsive-audit',
    agentRole: 'ایجنت تخصصی راستی‌آزمایی در ویوپورت‌های استاندارد موبایل و دسکتاپ',
    description:
      'خروجی را در ۳۷۵px، ۷۶۸px و ۱۴۴۰px می‌بینیم؛ دنبال به‌هم‌ریختگی یا متن ناخوانا می‌گردیم.',
    metrics: [
      { label: 'اندازه‌های بررسی‌شده', value: '۳ ویوپورت' },
      { label: 'پرش چیدمان (CLS)', value: '۰٫۰۰' },
      { label: 'وزیرمتن', value: 'فاصله‌حروف صفر' },
    ],
    checks: [
      'موبایل (۳۷۵px): تک‌ستونه و قابل اسکرول',
      'تبلت (۷۶۸px): پنل‌ها و هدف‌های لمسی جا می‌شوند',
      'دسکتاپ (۱۴۴۰px): اطلاعات کامل و خوانا می‌مانند',
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
              سه چک آخر، قبل از کامیت
            </h3>
            <p className="qa-sub-heading">
              قبل از کامیت، کد را از نظر قواعد پروژه، Spec و نمایش بررسی می‌کنیم.
            </p>
          </div>
        </div>

        <div className="qa-header-actions">
          <button
            type="button"
            className="copy-report-btn"
            onClick={handleCopyReport}
            title="کپی گزارش"
          >
            {copiedLog ? (
              <>
                <Check size={14} color="#16a34a" />
                <span className="copy-label">گزارش کپی شد! ✓</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="copy-label">کپی گزارش</span>
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
              {toPersianDigits(passedCount)} از ۳ چک انجام شد
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
                    <div className="gate-icon-badge passed" title="چک انجام شد">
                      <CheckCircle2 size={20} color="#10b981" />
                    </div>
                  ) : (
                    <div className="gate-icon-badge pending" title="منتظر بررسی">
                      <Clock size={18} color="#f59e0b" />
                    </div>
                  )}
                  <span className="gate-number-tag">
                    چک {toPersianDigits(gate.gateNumber)}
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
                        <span>انجام شد</span>
                      </>
                    ) : (
                      <>
                        <Clock size={14} />
                        <span>در نوبت اجرا</span>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    className="toggle-log-btn"
                    aria-label="دیدن لاگ ایجنت"
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Collapsible / Expandable Details & Log Terminal */}
              {isExpanded && (
                <div className="gate-expanded-details">
                  <div className="gate-checks-list">
                    <strong className="checks-heading">چیزهایی که چک شد:</strong>
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
                      <span className="terminal-title">خروجی ایجنت {gate.agent}</span>
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
              ? 'سه چک انجام شد؛ آمادهٔ merge'
              : 'چک‌ها هنوز کامل نشده‌اند'}
          </h4>
          <p className="verdict-desc">
            {allPassed
              ? 'قواعد پروژه، Spec و نمایش در اندازه‌های مختلف بررسی شده‌اند. حالا می‌شود با خیال روشن‌تری merge و deploy کرد.'
              : `فعلاً ${toPersianDigits(passedCount)} از ۳ چک انجام شده. با ArrowRight یا Space چک بعدی را ببین.`}
          </p>
        </div>

        <div className="verdict-badge">
          {allPassed ? (
            <span className="verdict-tag passed">
              <Sparkles size={14} />
              <span>آمادهٔ merge در main</span>
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
