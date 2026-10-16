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
            Grilling: سؤال‌کردن تا تصمیم روشن شود
          </span>
        </div>
        <div className="grilling-badges-group">
          <span className="grilling-rule-badge" title="سؤال‌ها را یکی‌یکی می‌پرسیم تا ابهام جمع شود">
            <Lock size={12} />
            <span>هر بار فقط ۱ سؤال (Strict 1-Question Rule)</span>
          </span>
          <span className="grilling-frontier-badge">
            <ShieldCheck size={12} />
            <span>جایی که باید تصمیم بگیریم (Decision Frontier)</span>
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
              <span>یک سؤال در هر نوبت تا Spec روشن شود</span>
            </div>
            <span className="interview-round-tag">
              نوبت: {toPersianDigits(1)}
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
                  <strong className="sender-name">ایجنت (Agent)</strong>
                  <span className="sender-role-pill">معماری</span>
                </div>
                <span className="chat-timestamp">پرسش شمارهٔ ۱</span>
              </div>

              <div className="chat-bubble-content">
                <p className="question-lead">
                  برای کنترلر ارائه (<span dir="ltr">Deck Engine</span>)، ناوبری را{' '}
                  <strong className="text-highlight">دوطرفه و برگشت‌پذیر (Reversible)</strong>{' '}
                  می‌خواهیم؟ یعنی با <kbd>ArrowLeft</kbd> یا <kbd>PageUp</kbd> هر انیمیشن
                  قدم‌به‌قدم برگردد؛ یا یک‌باره به اسلاید قبل برویم؟
                </p>

                <div className="question-frontier-target">
                  <span className="target-label">تصمیمی که باید روشن شود:</span>
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
                    <strong className="sender-name">توسعه‌دهنده (Human)</strong>
                    <span className="sender-role-pill role-human">پاسخ</span>
                  </div>
                  <span className="chat-timestamp">تأیید تصمیم</span>
                </div>

                <div className="chat-bubble-content">
                  <p className="answer-text">
                    بله، دوطرفه و برگشت‌پذیر. با <kbd>ArrowLeft</kbd> یا <kbd>PageUp</kbd>{' '}
                    باید آخرین انیمیشن یک قدم عقب برود. اگر ابتدای اسلاید بودیم، به آخرین گام
                    اسلاید قبل برگردیم؛ این‌طوری جریان ارائه به‌هم نمی‌ریزد.
                  </p>
                  <div className="answer-meta-pill">
                    <Check size={13} color="var(--color-surgical-blue)" />
                    <span>نیاز روشن شد</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="chat-placeholder-waiting">
                <span className="waiting-spinner-dot" />
                <span className="waiting-hint-text">
                  منتظر پاسخ توسعه‌دهنده… (برای دیدن پاسخ، مرحله بعد را بزنید)
                </span>
              </div>
            )}

            {/* Agent Settlement & Spec Lock Confirmation (Revealed at Step 2+) */}
            {stepIndex >= 2 && (
              <div className="chat-bubble chat-bubble-settlement animate-fade-in">
                <div className="settlement-header">
                  <CheckCircle2 size={16} color="#16a34a" />
                  <strong>تصمیم روشن شد (Frontier Resolved)</strong>
                </div>
                <p className="settlement-text">
                  رفتار دوطرفه را در مشخصات فنی (<code dir="ltr">ADR 0004</code>) ثبت کردیم.
                  حالا می‌شود بدون حدس‌زدن و دوباره‌کاری سراغ کد رفت.
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
              <span>درخت تصمیم (Decision Tree)</span>
            </div>
            <span className={`tree-status-pill ${isSettled ? 'status-settled' : 'status-open'}`}>
              {isSettled ? 'تثبیت شد ✓' : 'تصمیم باز است…'}
            </span>
          </div>

          <div className="tree-graph-viewport">
            {/* Root Node: Ambiguity Question */}
            <div className="tree-node tree-node-root">
              <div className="node-icon-wrapper">
                <HelpCircle size={16} color="var(--color-surgical-blue)" />
              </div>
              <div className="node-content">
                <span className="node-eyebrow">تصمیم ۱</span>
                <strong className="node-title">ناوبری و وضعیت ارائه</strong>
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
                    <span>راه انتخابی: وضعیت دوطرفه</span>
                  </div>
                  {isSettled && <span className="branch-resolved-badge">تثبیت‌شده ✓</span>}
                </div>

                <h4 className="branch-title">کنترلر برگشت‌پذیر (Reversible Steps)</h4>
                <p className="branch-desc">
                  وضعیت را نگه می‌داریم، مرحله‌ها را قدم‌به‌قدم عقب می‌بریم و روی صحنه ناگهان نمی‌پریم
                </p>

                <div className="branch-meta-items">
                  <div className="meta-item">
                    <span className="meta-dot dot-green" />
                    <span>با نیاز ارائه‌دهنده هم‌خوان است</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-dot dot-green" />
                    <span>با TDD می‌شود تستش کرد</span>
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
                    <span>راه کنارگذاشته‌شده: پرش یک‌طرفه</span>
                  </div>
                  {isSettled && <span className="branch-pruned-badge">کنار گذاشته شد ✕</span>}
                </div>

                <h4 className="branch-title">یک‌باره برو به اسلاید قبل</h4>
                <p className="branch-desc">
                  مرحله‌های قبلی یادش نمی‌ماند؛ با یک اشتباه کلیکر، ارائه و ذهن مخاطب به‌هم می‌ریزد
                </p>

                <div className="branch-meta-items">
                  <div className="meta-item">
                    <span className="meta-dot dot-gray" />
                    <span>روی صحنه دردسر می‌سازد</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-dot dot-gray" />
                    <span>احتمال بازنویسی و اتلاف توکن</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Tree Footer State */}
          <div className="tree-footer-bar">
            <div className="tree-outcome-info">
              <span className="outcome-label">خروجی Grilling:</span>
              <strong className="outcome-val">
                {isStep0 && 'سؤال دقیق، درست روی ابهامِ قبل از کدنویسی'}
                {isStep1 && 'ایجنت و توسعه‌دهنده از یک تصمیم حرف می‌زنند'}
                {isStep2 && 'ابهام بسته شد؛ Spec آمادهٔ تست است'}
                {isStep3 && 'تصمیم در مشخصات ثبت شد؛ حالا می‌شود کدنویسی را شروع کرد'}
              </strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
