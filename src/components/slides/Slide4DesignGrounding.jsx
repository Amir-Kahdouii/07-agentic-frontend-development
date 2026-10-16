import React, { useState, useCallback } from 'react';
import {
  Palette,
  Type,
  Maximize2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  Box,
  Eye,
} from 'lucide-react';
import { toPersianDigits } from '../../deck-engine.js';

const REFERO_URL = 'https://styles.refero.design';

const COLOR_SWATCHES = [
  {
    name: 'Obsidian',
    hex: '#070709',
    token: '--color-obsidian',
    role: 'متن و دکمه‌های تیره',
    textDark: false,
  },
  {
    name: 'Paper White',
    hex: '#ffffff',
    token: '--color-paper-white',
    role: 'پس‌زمینه و کارت‌ها',
    textDark: true,
    borderNeeded: true,
  },
  {
    name: 'Surgical Blue',
    hex: '#2597d0',
    token: '--color-surgical-blue',
    role: 'تأکیدها و وضعیت‌های فعال',
    textDark: false,
  },
];

const TYPOGRAPHY_TOKENS = [
  {
    role: 'heading',
    token: '--text-heading',
    size: '44px',
    lineHeight: '1.1',
    sample: 'قبل از طراحی، مسیر را روشن کن',
    weight: 'برجسته (Bold)',
  },
  {
    role: 'body',
    token: '--text-body',
    size: '16px',
    lineHeight: '1.49',
    sample: 'متن فارسی خوانا با فاصله‌حروف صفر',
    weight: 'عادی (Regular)',
  },
];

export default function Slide4DesignGrounding({ stepIndex = 0 }) {
  const [copiedToken, setCopiedToken] = useState(null);
  const [copiedRefero, setCopiedRefero] = useState(false);

  const handleCopyText = useCallback((text, isRefero = false) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (isRefero) {
          setCopiedRefero(true);
          setTimeout(() => setCopiedRefero(false), 2000);
        } else {
          setCopiedToken(text);
          setTimeout(() => {
            setCopiedToken((curr) => (curr === text ? null : curr));
          }, 2000);
        }
      }).catch(() => {});
    }
  }, []);

  const isStep0 = stepIndex === 0;
  const isStep1 = stepIndex >= 1;
  const isStep2 = stepIndex >= 2;

  return (
    <div
      className={`design-token-inspector-artifact step-${stepIndex}`}
      data-step={stepIndex}
    >
      {/* Top Banner: Refero Reference Card */}
      <div
        className={`refero-banner-card ${
          isStep2 ? 'is-highlighted' : 'is-default'
        }`}
      >
        <div className="refero-info">
          <div className="refero-title-row">
            <Palette size={18} color="var(--color-surgical-blue)" />
            <strong className="refero-brand-name">رفرنس طراحی: Refero Design Systems</strong>
            <span className="refero-theme-badge">Letters؛ سفید ساده با یک آبیِ تأکیدی</span>
          </div>
          <p className="refero-tagline">
            از Refero چند رفرنس می‌گیریم و قواعدشان را در <code dir="ltr">DESIGN.md</code>{' '}
            می‌نویسیم تا ایجنت با همان مسیر جلو برود.
          </p>
        </div>

        <div className="refero-action-group">
          <button
            type="button"
            className={`copy-refero-btn ${copiedRefero ? 'is-copied' : ''}`}
            onClick={() => handleCopyText(REFERO_URL, true)}
            data-copy={REFERO_URL}
            title="کپی لینک styles.refero.design"
            aria-label="کپی لینک styles.refero.design"
          >
            {copiedRefero ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedRefero ? 'کپی شد! ✓' : 'کپی لینک Refero'}</span>
          </button>

          <a
            href={REFERO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="refero-external-link"
            title="مشاهده styles.refero.design در تب جدید"
          >
            <span dir="ltr">styles.refero.design</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Main Grid: Palette Swatches, Radii & Shadows, Typography Scale */}
      <div className="inspector-columns-grid">
        {/* Section 1: Surface Palette Swatches & Geometry (Highlighted at Step 0) */}
        <section
          className={`palette-inspector-section ${
            isStep0 ? 'section-spotlight' : ''
          }`}
          aria-label="توکن‌های پالت رنگی"
        >
          <div className="section-header">
            <div className="section-title-wrap">
              <Sparkles size={16} color="var(--color-surgical-blue)" />
              <h3 className="section-title">پالت کوچک Letters؛ سه رنگ اصلی</h3>
            </div>
            <span className="section-step-indicator">
              گام ۰: رنگ‌ها و گوشه‌ها
            </span>
          </div>

          <div className="swatches-grid">
            {COLOR_SWATCHES.map((swatch) => {
              const isCopied = copiedToken === swatch.hex || copiedToken === swatch.token;
              return (
                <div
                  key={swatch.name}
                  className={`token-swatch-card ${swatch.borderNeeded ? 'has-border' : ''}`}
                  onClick={() => handleCopyText(swatch.hex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleCopyText(swatch.hex)}
                  title={`کلیک جهت کپی کد رنگ ${swatch.hex}`}
                >
                  <div
                    className="swatch-color-box"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <span className="swatch-copy-pill">
                      {isCopied ? 'کپی شد! ✓' : 'کپی'}
                    </span>
                  </div>

                  <div className="swatch-details">
                    <div className="swatch-name-row">
                      <strong className="swatch-name">{swatch.name}</strong>
                      <code className="swatch-hex" dir="ltr">
                        {swatch.hex}
                      </code>
                    </div>
                    <code className="swatch-token-var" dir="ltr">
                      {swatch.token}
                    </code>
                    <p className="swatch-role">{swatch.role}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Radii and Elevation Cards */}
          <div className="geometry-elevation-showcase">
            <div className="geometry-card radius-18-card">
              <div className="geom-header">
                <Box size={14} color="var(--color-surgical-blue)" />
                <span className="geom-label">فاصله‌گذاری</span>
              </div>
              <div className="geom-visual">
                <div className="radius-pill-demo">
                  <span className="radius-spec">فاصلهٔ ثابت بین بخش‌ها و داخل کارت‌ها</span>
                </div>
              </div>
              <span className="geom-desc">
                فاصله‌های ثابت، صفحه را مرتب و قابل‌خواندن نگه می‌دارند
              </span>
            </div>

            <div className="geometry-card elevation-card">
              <div className="geom-header">
                <Layers size={14} color="var(--color-surgical-blue)" />
                <span className="geom-label">گوشه‌ها و سایه</span>
              </div>
              <div className="geom-visual">
                <div className="shadow-box-demo">
                  <span className="shadow-spec">گوشه نرم، سایه ملایم</span>
                </div>
              </div>
              <span className="geom-desc">
                گوشه‌های <code dir="ltr">18px</code> و سایه سبک، کارت‌ها را از هم جدا می‌کنند
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Typography Scale (Highlighted at Step 1+) */}
        <section
          className={`typography-inspector-section ${
            isStep1 ? 'section-spotlight' : ''
          } ${isStep0 ? 'section-subdued' : ''}`}
          aria-label="مقیاس تایپوگرافی استاندارد"
        >
          <div className="section-header">
            <div className="section-title-wrap">
              <Type size={16} color="var(--color-surgical-blue)" />
              <h3 className="section-title">تایپوگرافی (Vazirmatn & Letters)</h3>
            </div>
            <span className="section-step-indicator">
              گام ۱: تایپوگرافی
            </span>
          </div>

          <div className="typography-tokens-list">
            {TYPOGRAPHY_TOKENS.map((item) => (
              <div key={item.token} className="typography-specimen-row">
                <div className="type-meta">
                  <span className="type-role-pill">{item.role}</span>
                  <code className="type-token-name" dir="ltr">
                    {item.token}
                  </code>
                  <span className="type-dimensions" dir="ltr">
                    {item.size} / {item.lineHeight}
                  </span>
                  <span className="type-weight">{item.weight}</span>
                </div>

                <div className="type-preview-container">
                  <span
                    className={`specimen-text specimen-${item.role}`}
                    style={{ fontSize: item.size, lineHeight: item.lineHeight }}
                  >
                    {item.sample}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Persian Typography Craft Rules */}
          <div className="persian-typography-craft-card">
            <div className="craft-badge-row">
              <ShieldCheck size={15} color="#16a34a" />
              <strong>قوانین سخت‌گیرانه تایپوگرافی فارسی در فرانت‌اند</strong>
            </div>
            <ul className="craft-rules-list">
              <li>
                <strong>فاصله صفر حروف:</strong> اعمال <code dir="ltr">letter-spacing: 0</code> روی گلیف‌های فارسی (پرهیز از تفکیک حروف به هم پیوسته).
              </li>
              <li>
                <strong>اعداد فارسی بومی:</strong> تبدیل تمام ارقام به صورت <code dir="ltr">۰۱۲۳۴۵۶۷۸۹</code> با تابع کمکی جهت اصالت زبان.
              </li>
              <li>
                <strong>جهت‌گیری منطقی راست‌به‌چپ:</strong> بهره‌گیری از <code dir="ltr">margin-inline-start</code> و ساختار بومی RTL.
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Step 2 Anti-Hallucination Footer Summary */}
      {isStep2 && (
        <div className="design-grounding-summary-bar animate-fade-in">
          <div className="summary-icon-box">
            <ShieldCheck size={18} color="#16a34a" />
          </div>
          <div className="summary-content">
            <strong className="summary-title">Design Grounding چه کمکی می‌کند؟</strong>
            <p className="summary-desc">
              اگر این قواعد را در <code dir="ltr">DESIGN.md</code> ننویسیم، ایجنت ممکن است سراغ ظاهرهای تکراری برود. Refero و توکن‌های مشخص کمک می‌کنند خروجی به چیزی که می‌خواهیم نزدیک‌تر بماند.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
