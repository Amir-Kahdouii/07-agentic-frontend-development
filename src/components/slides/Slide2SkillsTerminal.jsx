import React, { useState, useCallback } from 'react';
import {
  Terminal,
  Copy,
  Check,
  Package,
  Sparkles,
  ShieldCheck,
  Code2,
  HelpCircle,
  Palette,
  ExternalLink,
} from 'lucide-react';
import { toPersianDigits } from '../../deck-engine.js';

const CMD_MATT = 'npx skills add mattpocock/skills';
const CMD_ANTHROPIC = 'npx skills add anthropics/skills --skill frontend-design';

export default function Slide2SkillsTerminal({ stepIndex = 0 }) {
  const [copiedCmd, setCopiedCmd] = useState(null);

  const handleCopy = useCallback((text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedCmd(text);
        setTimeout(() => {
          setCopiedCmd((current) => (current === text ? null : current));
        }, 2000);
      }).catch(() => {});
    }
  }, []);

  const isStep0 = stepIndex === 0;
  const isStep1 = stepIndex === 1;
  const isStep2 = stepIndex === 2;
  const isStep3 = stepIndex >= 3;

  return (
    <div className={`skills-terminal-artifact step-${stepIndex}`} data-step={stepIndex}>
      {/* Interactive Terminal Window */}
      <div className="terminal-window">
        {/* Terminal Title Bar */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="terminal-dot dot-red" />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green" />
          </div>
          <div className="terminal-title">
            <Terminal size={14} />
            <span>bash — ~/frontend-ai-agent (skills CLI)</span>
          </div>
          <div className="terminal-env-badge">
            <span className="env-dot" />
            <span>Node.js v20+</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body" dir="ltr">
          {/* Shell banner */}
          <div className="terminal-row terminal-muted">
            <span className="term-comment"># Initializing agent skills workspace</span>
          </div>

          {/* Prompt at Step 0 */}
          {isStep0 && (
            <div className="terminal-row terminal-active-line">
              <span className="term-prompt">agent@workstation:~$</span>
              <span className="term-cursor" />
              <span className="term-hint" dir="rtl">
                برای اجرای اولین دستور و اضافه‌کردن skillها، «مرحله بعد» یا جهت‌نما را بزنید
              </span>
            </div>
          )}

          {/* Command 1: Matt Pocock's skills */}
          {stepIndex >= 1 && (
            <div className="terminal-block">
              <div className="terminal-row command-line">
                <span className="term-prompt">agent@workstation:~$</span>
                <span className="term-command">{CMD_MATT}</span>
                <button
                  type="button"
                  className={`terminal-copy-btn ${copiedCmd === CMD_MATT ? 'is-copied' : ''}`}
                  onClick={() => handleCopy(CMD_MATT)}
                  data-copy={CMD_MATT}
                  title="کپی دستور"
                  aria-label="کپی دستور mattpocock"
                >
                  {copiedCmd === CMD_MATT ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedCmd === CMD_MATT ? 'کپی شد! ✓' : 'کپی'}</span>
                </button>
              </div>

              <div className="terminal-output">
                <div className="output-line success">
                  <span className="symbol">✔</span>
                  <span>Fetching repository manifest: github.com/mattpocock/skills</span>
                </div>
                <div className="output-line success">
                  <span className="symbol">✔</span>
                  <span>Discovered skills: tdd, code-review, grilling, domain-modeling</span>
                </div>
                <div className="output-line success">
                  <span className="symbol">✔</span>
                  <span>Installed 4 skills into local .agents/skills/</span>
                </div>
              </div>
            </div>
          )}

          {/* Command 2: Anthropic's frontend-design skill */}
          {stepIndex >= 2 && (
            <div className="terminal-block">
              <div className="terminal-row command-line">
                <span className="term-prompt">agent@workstation:~$</span>
                <span className="term-command">{CMD_ANTHROPIC}</span>
                <button
                  type="button"
                  className={`terminal-copy-btn ${
                    copiedCmd === CMD_ANTHROPIC ? 'is-copied' : ''
                  }`}
                  onClick={() => handleCopy(CMD_ANTHROPIC)}
                  data-copy={CMD_ANTHROPIC}
                  title="کپی دستور"
                  aria-label="کپی دستور frontend-design"
                >
                  {copiedCmd === CMD_ANTHROPIC ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedCmd === CMD_ANTHROPIC ? 'کپی شد! ✓' : 'کپی'}</span>
                </button>
              </div>

              <div className="terminal-output">
                <div className="output-line success">
                  <span className="symbol">✔</span>
                  <span>Scanning anthropics/skills repository...</span>
                </div>
                <div className="output-line success">
                  <span className="symbol">✔</span>
                  <span>Isolating single skill target: [frontend-design]</span>
                </div>
                <div className="output-line success">
                  <span className="symbol">✔</span>
                  <span>Configured .agents/skills/frontend-design/SKILL.md</span>
                </div>
              </div>
            </div>
          )}

          {/* Terminal active prompt when done */}
          {stepIndex >= 2 && (
            <div className="terminal-row terminal-active-line">
              <span className="term-prompt">agent@workstation:~$</span>
              <span className="term-cursor" />
            </div>
          )}
        </div>
      </div>

      {/* Rendered Skill Badges Grid (Revealed at Step 3) */}
      <div
        className={`rendered-skills-container ${
          isStep3 ? 'is-revealed' : 'is-pending'
        }`}
      >
        <div className="skills-badge-header">
          <div className="badge-header-info">
            <Package size={16} color="var(--color-surgical-blue)" />
            <h4 className="badge-header-title">
              skillهای نصب‌شده در پروژه ({toPersianDigits(4)} skill آماده)
            </h4>
          </div>
          <span className="skills-path-pill" dir="ltr">
            .agents/skills/
          </span>
        </div>

        <div className="skill-badges-grid">
          {/* Badge 1: TDD */}
          <div className="skill-item-card">
            <div className="skill-card-top">
              <div className="skill-icon-box">
                <ShieldCheck size={18} color="var(--color-surgical-blue)" />
              </div>
              <span className="skill-code-name" dir="ltr">
                tdd
              </span>
            </div>
            <strong className="skill-label">توسعه با تست</strong>
            <p className="skill-keyword">چرخهٔ Red-Green-Refactor؛ چک پیش از کامیت</p>
          </div>

          {/* Badge 2: Code Review */}
          <div className="skill-item-card">
            <div className="skill-card-top">
              <div className="skill-icon-box">
                <Code2 size={18} color="var(--color-surgical-blue)" />
              </div>
              <span className="skill-code-name" dir="ltr">
                code-review
              </span>
            </div>
            <strong className="skill-label">بازبینی در دو نگاه</strong>
            <p className="skill-keyword">هم استانداردها را می‌سنجیم، هم تطابق با Spec را</p>
          </div>

          {/* Badge 3: Grilling */}
          <div className="skill-item-card">
            <div className="skill-card-top">
              <div className="skill-icon-box">
                <HelpCircle size={18} color="var(--color-surgical-blue)" />
              </div>
              <span className="skill-code-name" dir="ltr">
                grilling
              </span>
            </div>
            <strong className="skill-label">روشن‌کردن تصمیم پیش از کد</strong>
            <p className="skill-keyword">هر بار یک سؤال تا مرز تصمیم شفاف شود</p>
          </div>

          {/* Badge 4: Frontend Design */}
          <div className="skill-item-card">
            <div className="skill-card-top">
              <div className="skill-icon-box">
                <Palette size={18} color="var(--color-surgical-blue)" />
              </div>
              <span className="skill-code-name" dir="ltr">
                frontend-design
              </span>
            </div>
            <strong className="skill-label">طراحی با هویت</strong>
            <p className="skill-keyword">فاصله‌گرفتن از ظاهر تکراری AI و ساختن خروجی پخته‌تر</p>
          </div>
        </div>
      </div>
    </div>
  );
}
