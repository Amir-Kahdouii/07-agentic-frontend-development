import React, { useState, useCallback } from 'react';
import {
  Compass,
  Sparkles,
  Terminal,
  HelpCircle,
  Palette,
  Cpu,
  FileCode2,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Layers,
  ChevronRight,
  ShieldCheck,
  BookmarkCheck,
  Zap,
} from 'lucide-react';
import { toPersianDigits } from '../../deck-engine.js';

const STATIONS = [
  {
    id: 'skills',
    index: 1,
    title: 'تجهیز مهارت‌ها',
    subtitle: 'Skills Tooling',
    agent: 'agy / skills CLI',
    command: 'npx skills add mattpocock/skills',
    description: 'تجهیز محیط توسعه به فایل‌های دانشی و مهارت‌های تخصصی ایجنت‌ها',
    keyDeliverable: 'افزوده شدن دستورالعمل‌های استاندارد به پوشه .agents/skills/',
    color: '#2597d0',
    icon: Terminal,
  },
  {
    id: 'grilling',
    index: 2,
    title: 'تثبیت مرز تصمیم',
    subtitle: 'Grilling Frontier',
    agent: 'grilling skill',
    command: 'قانون: فقط ۱ پرسش در هر دور مصاحبه',
    description: 'شناسایی و تصمیم‌گیری پیرامون نقاط ابهام قبل از نوشتن حتی یک خط کد',
    keyDeliverable: 'تولید مشخصات شفاف در .scratch/ بدون دوباره‌کاری',
    color: '#0284c7',
    icon: HelpCircle,
  },
  {
    id: 'tokens',
    index: 3,
    title: 'هویت بصری و توکن‌ها',
    subtitle: 'Refero & DESIGN.md',
    agent: 'design grounding',
    command: 'styles.refero.design + DESIGN.md',
    description: 'تعریف پالت Letters، مقیاس تایپوگرافی، شعاع‌ها و مرزهای زیبایی‌شناختی',
    keyDeliverable: 'سند DESIGN.md و پالت با کنتراست بالای #070709 و #2597d0',
    color: '#0891b2',
    icon: Palette,
  },
  {
    id: 'mcp',
    index: 4,
    title: 'رجیستری بومی VibeFarsi',
    subtitle: 'Dynamic MCP Server',
    agent: 'vibefarsi MCP',
    command: 'mcp: search_registry & get_component',
    description: 'تزریق مستقیم کدهای تمیز بدون بار اضافه و وابستگی‌های زنجیره‌ای npm',
    keyDeliverable: 'مالکیت ۱۰۰٪ کدها و چیدمان استاندارد راست‌به‌چپ (RTL)',
    color: '#0d9488',
    icon: Cpu,
  },
  {
    id: 'craft',
    index: 5,
    title: 'اجرای باکیفیت فرانت‌اند',
    subtitle: 'Frontend-Design Execution',
    agent: 'frontend-design skill',
    command: 'فرار از الگوهای کلیشه‌ای و خاکستری AI',
    description: 'تایپوگرافی وزیرمتن بدون فاصله، میکرواینتراکشن‌ها و فرم‌های ارگونومیک',
    keyDeliverable: 'خروجی در کلاس جهانی با تجربه کاربری زنده و خیره‌کننده',
    color: '#16a34a',
    icon: FileCode2,
  },
  {
    id: 'review',
    index: 6,
    title: 'گیت‌های کنترل کیفی',
    subtitle: 'Quality Gates & Review',
    agent: 'code-review & TDD',
    command: 'بررسی موازی: استانداردها + مشخصات + ریسپانسیو',
    description: 'اجرای آزمون‌های خطوط مرزی و بازبینی موازی قبل از ادغام در برنچ اصلی',
    keyDeliverable: 'سوئیت آزمون سبز ۱۰۰٪ و استقرار خودکار روی GitHub Pages',
    color: '#10b981',
    icon: ShieldCheck,
  },
];

const CHEAT_SHEET_ITEMS = [
  {
    pillar: '۱. مهارت‌ها (Skills)',
    takeaway: 'ایجنت‌ها را با اسکریپت‌های مستقل مجهز کنید نه پرامپت‌های طویل.',
    rule: 'npx skills add <repo>',
  },
  {
    pillar: '۲. گریلینگ (Grilling)',
    takeaway: 'قبل از کدنویسی مرز تصمیم را مشخص کنید؛ دقیقاً یک پرسش در هر دور.',
    rule: 'Rule: 1 question per round',
  },
  {
    pillar: '۳. زمینه‌سازی (Refero)',
    takeaway: 'مرزهای بصری را در DESIGN.md قفل کنید تا هوش مصنوعی رنگ خاکستری نزند.',
    rule: 'Tokens: Letters System',
  },
  {
    pillar: '۴. پروتکل MCP بومی',
    takeaway: 'از سرور VibeFarsi کدهای بومی کپی کنید تا وابسته به کیت‌های سنگین نشوید.',
    rule: 'vibefarsi.ir via MCP',
  },
  {
    pillar: '۵. دیزاین فرانت‌اند',
    takeaway: 'فاصله حروف را در وزیرمتن صفر نگه دارید و به جزئیات تعاملی روح ببخشید.',
    rule: 'letter-spacing: 0',
  },
  {
    pillar: '۶. گیت‌های کیفی',
    takeaway: 'تست‌های TDD و ایجنت‌های بازبینی موازی سد نهایی ورود باگ به پروداکشن هستند.',
    rule: 'code-review + npm test',
  },
];

export default function Slide8FullPlaybook({ stepIndex = 0 }) {
  const [selectedStation, setSelectedStation] = useState(0);
  const [copiedCheatSheet, setCopiedCheatSheet] = useState(false);

  // Progressive steps:
  // stepIndex 0: Subway Map Overview & Station exploration
  // stepIndex 1: Active Pipeline Flow in motion + Stage summary badges
  // stepIndex 2: Executive Takeaway Cheat-Sheet spotlight for audience takeaway
  const isStep1 = stepIndex >= 1;
  const isStep2 = stepIndex >= 2;

  const currentStation = STATIONS[selectedStation] || STATIONS[0];
  const CurrentIcon = currentStation.icon;

  const handleCopyCheatSheet = useCallback(() => {
    const text = `# پلی‌بوک توسعه فرانت‌اند با هوش مصنوعی (Agentic Frontend Playbook)
1. Skills: npx skills add mattpocock/skills (تجهیز ابزارهای تخصصی)
2. Grilling: 1 question per round (تثبیت مرز تصمیم قبل از نوشتن کد)
3. Refero: styles.refero.design + DESIGN.md (توکن‌های پالت Letters)
4. VibeFarsi: https://vibefarsi.ir via MCP (کامپوننت‌های بومی بدون وابستگی)
5. Frontend-Design: Vazirmatn letter-spacing: 0 (فرار از کلیشه‌های هوش مصنوعی)
6. Quality Gates: code-review + TDD (پاس شدن ۱۰۰٪ آزمون‌ها و استقرار GitHub Pages)`;

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedCheatSheet(true);
        setTimeout(() => setCopiedCheatSheet(false), 2000);
      }).catch(() => {});
    }
  }, []);

  return (
    <div
      className={`full-playbook-artifact step-${stepIndex}`}
      data-step={stepIndex}
      data-active-station={selectedStation}
    >
      {/* Top Header / Subway Line Navigator */}
      <div className="subway-header-bar">
        <div className="subway-brand">
          <Compass size={20} color="var(--color-surgical-blue)" />
          <div className="subway-title-text">
            <h3 className="subway-main-title">
              نقشهٔ متروی فرانت‌اند ایجنت‌محور: ۶ ستون چرخهٔ کامل توسعه
            </h3>
            <p className="subway-sub-title">
              از شفاف‌سازی نیازمندی تا پیاده‌سازی و استقرار خودکار، با هدایت ایجنت‌های تخصصی
            </p>
          </div>
        </div>

        <button
          type="button"
          className="copy-cheatsheet-btn"
          onClick={handleCopyCheatSheet}
          title="کپی چکیده دستورات پلی‌بوک"
        >
          {copiedCheatSheet ? (
            <>
              <Check size={14} color="#16a34a" />
              <span>کپی شد! ✓</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>کپی چکیده پلی‌بوک</span>
            </>
          )}
        </button>
      </div>

      {/* Subway Map Track Container */}
      <div className={`subway-map-track ${isStep1 ? 'pipeline-active' : ''}`}>
        <div className="subway-rail-line" />
        <div
          className="subway-rail-progress"
          style={{
            width: isStep2 ? '100%' : isStep1 ? '100%' : `${((selectedStation + 1) / 6) * 100}%`,
          }}
        />

        <div className="subway-stations-list">
          {STATIONS.map((station, idx) => {
            const isSelected = selectedStation === idx;
            const isPassedOrActive = isStep1 || idx <= selectedStation;
            const StationIcon = station.icon;

            return (
              <div
                key={station.id}
                className={`subway-station ${isSelected ? 'is-selected' : ''} ${
                  isPassedOrActive ? 'is-active' : ''
                }`}
                onClick={() => setSelectedStation(idx)}
                title={`ایستگاه ${toPersianDigits(station.index)}: ${station.title}`}
              >
                <div
                  className="station-node"
                  style={{
                    borderColor: isSelected ? 'var(--color-surgical-blue)' : station.color,
                  }}
                >
                  <StationIcon size={16} color={isSelected ? '#ffffff' : station.color} />
                  <span className="station-number-tag">{toPersianDigits(station.index)}</span>
                </div>

                <div className="station-meta">
                  <span className="station-title">{station.title}</span>
                  <span className="station-subtitle">{station.subtitle}</span>
                </div>

                {isStep1 && (
                  <div className="station-flow-badge">
                    <span>گام {toPersianDigits(station.index)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Station Detail Panel */}
      <div className="subway-detail-card">
        <div className="detail-station-header">
          <div className="detail-title-group">
            <div className="detail-icon-wrap" style={{ backgroundColor: `${currentStation.color}15` }}>
              <CurrentIcon size={22} color={currentStation.color} />
            </div>
            <div>
              <div className="detail-station-tag">
                <span>ایستگاه شمارهٔ {toPersianDigits(currentStation.index)} از ۶</span>
                <span className="agent-badge">
                  <Sparkles size={12} />
                  <span>{currentStation.agent}</span>
                </span>
              </div>
              <h4 className="detail-station-heading">{currentStation.title}</h4>
            </div>
          </div>

          <div className="detail-command-box">
            <span className="command-label">دستور / قاعده کلیدی:</span>
            <code className="command-code">{currentStation.command}</code>
          </div>
        </div>

        <div className="detail-body-grid">
          <div className="detail-desc-col">
            <p className="detail-description">{currentStation.description}</p>
            <div className="detail-deliverable-box">
              <BookmarkCheck size={16} color="var(--color-surgical-blue)" />
              <div className="deliverable-text">
                <strong>خروجی ملموس این مرحله:</strong>
                <p>{currentStation.keyDeliverable}</p>
              </div>
            </div>
          </div>

          <div className="detail-action-col">
            <div className="station-stepper-btns">
              <button
                type="button"
                className="step-station-btn"
                onClick={() => setSelectedStation((prev) => Math.max(0, prev - 1))}
                disabled={selectedStation === 0}
                title="ایستگاه قبلی"
              >
                ایستگاه قبلی
              </button>
              <button
                type="button"
                className="step-station-btn next"
                onClick={() => setSelectedStation((prev) => Math.min(STATIONS.length - 1, prev + 1))}
                disabled={selectedStation === STATIONS.length - 1}
                title="ایستگاه بعدی"
              >
                ایستگاه بعدی
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Executive Takeaway Cheat-Sheet Reference */}
      {isStep2 && (
        <div className="executive-takeaway-container">
          <div className="takeaway-header">
            <div className="takeaway-title-wrap">
              <Sparkles size={18} color="var(--color-surgical-blue)" />
              <strong className="takeaway-title">
                چکیدهٔ اجرایی و دستورالعمل کلیدی برای عکاسی و ارجاع سریع (Cheat-Sheet)
              </strong>
            </div>
            <span className="takeaway-badge">دستورالعمل نهایی</span>
          </div>

          <div className="takeaway-cards-grid">
            {CHEAT_SHEET_ITEMS.map((item, idx) => (
              <div key={idx} className="takeaway-item-card">
                <div className="takeaway-item-top">
                  <span className="takeaway-pillar-name">{item.pillar}</span>
                  <code className="takeaway-rule-code">{item.rule}</code>
                </div>
                <p className="takeaway-item-text">{item.takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
