import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  Bot,
  User,
  CheckCircle2,
  XCircle,
  GitBranch,
  ShieldCheck,
  Lock,
  ArrowLeftRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { toPersianDigits } from '../../deck-engine.js';

export default function Slide3GrillingFrontier({ stepIndex = 0 }) {
  // Presenter can toggle interactive choice if desired, defaulting to affirmative
  const [selectedBranch, setSelectedBranch] = useState('affirmative');

  const isStep0 = stepIndex === 0;
  const isStep1 = stepIndex === 1;
  const isStep2 = stepIndex === 2;
  const isStep3 = stepIndex >= 3;

  const isSettled = stepIndex >= 2;

  return (
    <div
      className={`grilling-frontier-artifact step-${stepIndex} ${
        isSettled ? 'is-settled' : 'is-investigating'
      }`}
      data-step={stepIndex}
    >
      {/* Top Banner: Grilling Discipline Header */}
      <div className="grilling-header-bar">
        <div className="grilling-header-meta">
          <HelpCircle size={18} color="var(--color-surgical-blue)" />
          <span className="grilling-header-title">
            مهارت Grilling: مصاحبه ساختاریافته در مرز تصمیم‌گیری
          </span>
        </div>
        <div className="grilling-badges-group">
          <span className="grilling-rule-badge" title="پرهیز از بمباران سوالات و ابهام‌زدایی گام‌به‌گام">
            <Lock size={12} />
            <span>تنها ۱ پرسش در هر دور (Strict 1-Question Rule)</span>
          </span>
          <span className="grilling-frontier-badge">
            <ShieldCheck size={12} />
            <span>مرز تصمیم‌گیری (Decision Frontier)</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Chat Interview vs Decision Tree */}
      <div className="grilling-main-grid">
        {/* Left Column: Chat-Style Single-Question Frontier Interview */}
        <section className="grilling-interview-panel" aria-label="مصاحبه تک‌سوالی ایجنت">
          <div className="panel-header">
            <div className="panel-header-title">
              <MessageSquare size={16} color="var(--color-surgical-blue)" />
              <span>مصاحبه تک‌سوالی برای تثبیت مشخصات (Spec Watertight)</span>
            </div>
            <span className="interview-round-tag">
              دور مصاحبه: {toPersianDigits(1)}
            </span>
          </div>

          <div className="chat-stream-container">
            {/* Agent Question Bubble (Visible from Step 0) */}
            <div className="chat-bubble chat-bubble-agent animate-fade-in">
              <div className="chat-bubble-header">
                <div className="chat-sender">
                  <div className="avatar-box agent-avatar">
                    <Bot size={15} color="var(--color-surgical-blue)" />
                  </div>
                  <strong className="sender-name">ایجنت هوشمند (Agent)</strong>
                  <span className="sender-role-pill">طراح معماری</span>
                </div>
                <span className="chat-timestamp">پرسش شمارهٔ ۱</span>
              </div>

              <div className="chat-bubble-content">
                <p className="question-lead">
                  برای پیاده‌سازی کنترلر ارائه‌دهنده (Deck Engine)، آیا ناوبری باید{' '}
                  <strong className="text-highlight">کاملاً دوطرفه (Reversible)</strong> باشد
                  و با کلیدهای برگشت (<kbd>ArrowLeft</kbd> / <kbd>PageUp</kbd>) انیمیشن‌های
                  میکرو را گام‌به‌گام معکوس کند، یا پرش مستقیم به اسلاید قبلی ترجیح داده می‌شود؟
                </p>

                <div className="question-frontier-target">
                  <span className="target-label">مرز تصمیم مورد نظر:</span>
                  <code dir="ltr">[currentSlide, stepIndex] State Machine</code>
                </div>
              </div>
            </div>

            {/* Developer Affirmative Answer Bubble (Revealed at Step 1+) */}
            {stepIndex >= 1 ? (
              <div className="chat-bubble chat-bubble-user animate-slide-up">
                <div className="chat-bubble-header">
                  <div className="chat-sender">
                    <div className="avatar-box user-avatar">
                      <User size={15} color="var(--color-obsidian)" />
                    </div>
                    <strong className="sender-name">مهندس توسعه‌دهنده (Human)</strong>
                    <span className="sender-role-pill role-human">پاسخ‌دهنده</span>
                  </div>
                  <span className="chat-timestamp">تایید فرضیه</span>
                </div>

                <div className="chat-bubble-content">
                  <p className="answer-text">
                    بله، دقیقاً دوطرفه و برگشت‌پذیر باشد. با فشردن <kbd>ArrowLeft</kbd> یا{' '}
                    <kbd>PageUp</kbd> باید آخرین انیمیشن مرحله به عقب برگردد، و اگر در ابتدای
                    اسلاید بودیم، به آخرین گام اسلاید پیشین بازگردیم تا وضعیت ارائه روی استیج هرگز
                    مختل نشود.
                  </p>
                  <div className="answer-meta-pill">
                    <Check size={13} color="var(--color-surgical-blue)" />
                    <span>تایید شفاف نیازمندی بدون ابهام</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="chat-placeholder-waiting">
                <span className="waiting-spinner-dot" />
                <span className="waiting-hint-text">
                  در انتظار پاسخ توسعه‌دهنده... (کلید بعدی جهت افشای پاسخ)
                </span>
              </div>
            )}

            {/* Agent Settlement & Spec Lock Confirmation (Revealed at Step 2+) */}
            {stepIndex >= 2 && (
              <div className="chat-bubble chat-bubble-settlement animate-fade-in">
                <div className="settlement-header">
                  <CheckCircle2 size={16} color="#16a34a" />
                  <strong>مرز تصمیم‌گیری تثبیت شد (Frontier Resolved)</strong>
                </div>
                <p className="settlement-text">
                  تصمیم قطعی شد. رفتار دوطرفه در مشخصات فنی (<code dir="ltr">ADR 0004</code>)
                  ثبت گردید. اکنون مسیر اجرای کد بدون ریسک دوباره‌کاری باز (Unblocked) است.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Live Decision Tree Visualizer */}
        <section className="decision-tree-panel" aria-label="شبیه‌ساز درخت تصمیم‌گیری">
          <div className="panel-header">
            <div className="panel-header-title">
              <GitBranch size={16} color="var(--color-surgical-blue)" />
              <span>درخت تصمیم‌گیری زنده (Decision Tree)</span>
            </div>
            <span className={`tree-status-pill ${isSettled ? 'status-settled' : 'status-open'}`}>
              {isSettled ? 'تثبیت‌شده ✓' : 'در حال سنجش...'}
            </span>
          </div>

          <div className="tree-graph-viewport">
            {/* Root Node: Ambiguity Question */}
            <div className="tree-node tree-node-root">
              <div className="node-icon-wrapper">
                <HelpCircle size={16} color="var(--color-surgical-blue)" />
              </div>
              <div className="node-content">
                <span className="node-eyebrow">گره تصمیم شمارهٔ ۱</span>
                <strong className="node-title">معماری ناوبری و ماشین وضعیت ارائه</strong>
              </div>
            </div>

            {/* Connector Lines */}
            <div className="tree-connectors-wrapper">
              <div className={`connector-line connector-left ${isSettled ? 'is-active-line' : ''}`} />
              <div className={`connector-line connector-right ${isSettled ? 'is-pruned-line' : ''}`} />
            </div>

            {/* Decision Branches */}
            <div className="tree-branches">
              {/* Branch 1: Affirmative Reversible Navigation (Selected) */}
              <div
                className={`tree-branch tree-branch-active ${
                  isSettled ? 'branch-settled is-chosen' : ''
                } ${selectedBranch === 'affirmative' ? 'is-selected' : ''}`}
                onClick={() => setSelectedBranch('affirmative')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedBranch('affirmative')}
              >
                <div className="branch-header">
                  <div className="branch-tag affirmative-tag">
                    {isSettled ? (
                      <CheckCircle2 size={13} color="#16a34a" />
                    ) : (
                      <Sparkles size={13} color="var(--color-surgical-blue)" />
                    )}
                    <span>شاخه انتخابی: ماشین وضعیت دوطرفه</span>
                  </div>
                  {isSettled && <span className="branch-resolved-badge">تثبیت‌شده ✓</span>}
                </div>

                <h4 className="branch-title">کنترلر برگشت‌پذیر (Reversible Steps)</h4>
                <p className="branch-desc">
                  نگه‌داشتن دقیق وضعیت، گام‌های خرد رو به عقب و جلوگیری از پرش ناگهانی روی صحنه
                </p>

                <div className="branch-meta-items">
                  <div className="meta-item">
                    <span className="meta-dot dot-green" />
                    <span>انطباق ۱۰۰٪ با نیاز ارائه‌دهنده</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-dot dot-green" />
                    <span>آزمون‌پذیری قطعی با TDD</span>
                  </div>
                </div>
              </div>

              {/* Branch 2: Fragile One-Way Jump (Pruned) */}
              <div
                className={`tree-branch tree-branch-rejected ${
                  isSettled ? 'branch-rejected is-pruned' : ''
                } ${selectedBranch === 'rejected' ? 'is-selected' : ''}`}
                onClick={() => setSelectedBranch('rejected')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedBranch('rejected')}
              >
                <div className="branch-header">
                  <div className="branch-tag rejected-tag">
                    <XCircle size={13} color="var(--color-slate)" />
                    <span>شاخه مردود: پرش ساده یک‌طرفه</span>
                  </div>
                  {isSettled && <span className="branch-pruned-badge">کنار گذاشته شد ✕</span>}
                </div>

                <h4 className="branch-title">پرش یک‌باره به اسلاید قبل</h4>
                <p className="branch-desc">
                  فقدان حافظه برای گام‌های قبلی، شکنندگی در برابر اشتباهات کلیکر و سردرگمی مخاطب
                </p>

                <div className="branch-meta-items">
                  <div className="meta-item">
                    <span className="meta-dot dot-gray" />
                    <span>اصطکاک شدید روی استیج زنده</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-dot dot-gray" />
                    <span>ریسک بازنویسی و اتلاف توکن</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Tree Footer State */}
          <div className="tree-footer-bar">
            <div className="tree-outcome-info">
              <span className="outcome-label">دستاورد گریلینگ:</span>
              <strong className="outcome-val">
                {isStep0 && 'طرح پرسش جراحی در مرز مبهم قبل از نوشتن کد'}
                {isStep1 && 'تطابق مدل ذهنی توسعه‌دهنده با ایجنت'}
                {isStep2 && 'حذف ۱۰۰٪ ابهام؛ مشخصات مهر و موم شد و آماده آزمون است'}
                {isStep3 && 'شاخه قطعی در مشخصات مستند شد؛ کدنویسی با اطمینان کامل'}
              </strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
