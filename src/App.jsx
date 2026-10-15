import React from 'react';
import { BookOpen, Presentation, Sparkles, Layers } from 'lucide-react';

export default function App() {
  return (
    <div className="deck-root">
      <div className="deck-atmospheric-bar" />
      
      <header className="deck-header">
        <div className="deck-brand">
          <Presentation size={22} color="var(--color-surgical-blue)" />
          <span className="deck-title">توسعه فرانت‌اند با هوش مصنوعی</span>
          <span className="deck-badge">Presenter Deck</span>
        </div>

        <a
          href="./companion/"
          className="companion-link-btn"
          id="companion-link-btn"
          title="مشاهده نسخه همراه متنی و جامع"
        >
          <BookOpen size={16} color="var(--color-surgical-blue)" />
          <span>همراه متنی (Companion)</span>
        </a>
      </header>

      <main className="deck-canvas">
        <article className="slide-frame" id="presenter-deck-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-sky-tint)',
                color: 'var(--color-surgical-blue)',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              <Sparkles size={14} />
              <span>ارائه زنده تعاملی</span>
            </span>
          </div>

          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'var(--color-obsidian)',
              lineHeight: 1.25,
              marginBottom: '1rem',
              letterSpacing: 0,
            }}
          >
            توسعهٔ مهندسی فرانت‌اند با ایجنت‌های هوش مصنوعی
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--color-charcoal)',
              lineHeight: 1.8,
              maxWidth: '720px',
              marginBottom: '2.5rem',
            }}
          >
            پلتفرم ارائه‌محور تعاملی با گام‌های انیمیشنی معکوس‌پذیر (Build Steps)، شبیه‌سازهای بلادرنگ و ابزارهای پیشرفته برای ارائه‌دهندگان صحنه و سازندگان محتوا.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              marginTop: '1.5rem',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '12px',
                backgroundColor: 'var(--color-cloud-gray)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Layers size={18} color="var(--color-surgical-blue)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-obsidian)' }}>
                  معماری دوگانه (Dual-Distribution)
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)', lineHeight: 1.7 }}>
                ارائهٔ مدرن مبتنی بر React در ریشه پروژه و همراه مطالعه متنی کامل در پوشهٔ <code>/companion/</code>.
              </p>
            </div>

            <div
              style={{
                padding: '1.5rem',
                borderRadius: '12px',
                backgroundColor: 'var(--color-cloud-gray)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Sparkles size={18} color="var(--color-surgical-blue)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-obsidian)' }}>
                  طراحی منطبق بر Letters و VibeFarsi
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)', lineHeight: 1.7 }}>
                تایپوگرافی بدون فاصله بیرونی وزیرمتن، پالت رنگی کلینیکال لترز، و چیدمان استاندارد راست‌به‌چپ (RTL).
              </p>
            </div>
          </div>
        </article>
      </main>

      <footer className="deck-footer">
        <div>
          <span>اسلاید: </span>
          <strong id="slide-indicator" style={{ color: 'var(--color-obsidian)' }}>۱ / ۸</strong>
        </div>

        <div style={{ fontSize: '0.8125rem', color: 'var(--color-slate)' }}>
          برای حرکت میان اسلایدها و مراحل از کلیدهای جهت‌نما استفاده کنید
        </div>
      </footer>
    </div>
  );
}
