import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('03: Slide 1 Hero Artifact - Component Structure & Paradigm Comparison', () => {
  const slide1Path = path.join(rootDir, 'src', 'components', 'slides', 'Slide1ParadigmShift.jsx');
  assert.ok(fs.existsSync(slide1Path), 'Slide1ParadigmShift.jsx must exist');

  const content = fs.readFileSync(slide1Path, 'utf8');

  // Matrix and card containers
  assert.ok(content.includes('paradigm-comparison-matrix'), 'Matrix container must exist');
  assert.ok(content.includes('manual-prompting-card'), 'Manual prompting card must exist');
  assert.ok(content.includes('agentic-workflow-card'), 'Agentic workflow card must exist');

  // Badges: red/warning for manual and surgical blue for agentic
  assert.ok(content.includes('badge-manual'), 'badge-manual class must exist');
  assert.ok(content.includes('badge-agentic'), 'badge-agentic class must exist');
  assert.ok(content.includes('پرامپت تصادفی (Prompt & Pray)'), 'Must include manual prompt badge title');
  assert.ok(content.includes('مهندسی ایجنت‌محور (Agentic Workflow)'), 'Must include agentic workflow badge title');

  // Friction points vs Structured pillars
  assert.ok(content.includes('توهم و خطای معماری'), 'Must mention hallucinations/architecture error');
  assert.ok(content.includes('اتلاف توکن و فراموشی بافت'), 'Must mention token waste/context decay');
  assert.ok(content.includes('کد تست‌نشده و شکست کامیت'), 'Must mention untested code/commit failures');
  assert.ok(content.includes('شکنندگی و عدم تکرارپذیری'), 'Must mention fragility/non-repeatability');

  assert.ok(content.includes('مهارت‌های تخصصی (Skills)'), 'Must mention specialized skills');
  assert.ok(content.includes('گیت‌های اعتبارسنجی کیفی (TDD)'), 'Must mention TDD quality gates');
  assert.ok(content.includes('مصاحبه Grilling پیش از اجرا'), 'Must mention Grilling interview');
  assert.ok(content.includes('بازتولیدپذیری قطعی و خودکار'), 'Must mention deterministic reproducibility');

  // Build steps progressive disclosure
  assert.ok(content.includes('is-active-manual'), 'Must support step 1 active manual styling');
  assert.ok(content.includes('is-active-agentic'), 'Must support step 2 active agentic styling');
  assert.ok(content.includes('highlight-manual'), 'Must include highlight-manual class');
  assert.ok(content.includes('highlight-agentic'), 'Must include highlight-agentic class');
});

test('03: Slide 2 Hero Artifact - Terminal Structure, Commands & Package Badges', () => {
  const slide2Path = path.join(rootDir, 'src', 'components', 'slides', 'Slide2SkillsTerminal.jsx');
  assert.ok(fs.existsSync(slide2Path), 'Slide2SkillsTerminal.jsx must exist');

  const content = fs.readFileSync(slide2Path, 'utf8');

  // Terminal window structure
  assert.ok(content.includes('terminal-window'), 'terminal-window container must exist');
  assert.ok(content.includes('terminal-header'), 'terminal-header must exist');
  assert.ok(content.includes('terminal-dots'), 'traffic light dots must exist');
  assert.ok(content.includes('terminal-body'), 'terminal-body must exist');

  // Commands
  const cmdMatt = 'npx skills add mattpocock/skills';
  const cmdAnthropic = 'npx skills add anthropics/skills --skill frontend-design';
  assert.ok(content.includes(cmdMatt), `Must include command: ${cmdMatt}`);
  assert.ok(content.includes(cmdAnthropic), `Must include command: ${cmdAnthropic}`);

  // One-click copy buttons with data-copy attributes and tooltip feedback
  assert.ok(content.includes(`data-copy={CMD_MATT}`) || content.includes(`data-copy="${cmdMatt}"`), 'Copy button must have data-copy attribute for mattpocock');
  assert.ok(content.includes(`data-copy={CMD_ANTHROPIC}`) || content.includes(`data-copy="${cmdAnthropic}"`), 'Copy button must have data-copy attribute for anthropics');
  assert.ok(content.includes('کپی شد! ✓'), 'Visual tooltip feedback "کپی شد! ✓" must be present');

  // Step-by-step disclosure
  assert.ok(content.includes('stepIndex >= 1'), 'Step 1 reveals first command and execution');
  assert.ok(content.includes('stepIndex >= 2'), 'Step 2 reveals second command and execution');
  assert.ok(content.includes('rendered-skills-container'), 'Container for rendered skill badges must exist');
  assert.ok(content.includes('skill-badges-grid'), 'Grid for skill badges must exist');

  // Active skill badges
  assert.ok(content.includes('tdd'), 'Must render tdd skill badge');
  assert.ok(content.includes('code-review'), 'Must render code-review skill badge');
  assert.ok(content.includes('grilling'), 'Must render grilling skill badge');
  assert.ok(content.includes('frontend-design'), 'Must render frontend-design skill badge');
  assert.ok(content.includes('.agents/skills/'), 'Must reference local .agents/skills/ directory');
});

test('03: App Integration & Slide Mounting', () => {
  const appPath = path.join(rootDir, 'src', 'App.jsx');
  const appCode = fs.readFileSync(appPath, 'utf8');

  assert.ok(appCode.includes('Slide1ParadigmShift'), 'App.jsx must import Slide1ParadigmShift');
  assert.ok(appCode.includes('Slide2SkillsTerminal'), 'App.jsx must import Slide2SkillsTerminal');
  assert.ok(appCode.includes('slideIndex === 0 && <Slide1ParadigmShift'), 'App.jsx must render Slide1ParadigmShift on slide 0');
  assert.ok(appCode.includes('slideIndex === 1 && <Slide2SkillsTerminal'), 'App.jsx must render Slide2SkillsTerminal on slide 1');
});

test('03: CSS Styling - Letters Tokens & Micro-Interactions for Slides 1 & 2', () => {
  const cssPath = path.join(rootDir, 'src', 'index.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Slide 1 classes
  assert.ok(css.includes('.paradigm-comparison-matrix'), 'CSS must define .paradigm-comparison-matrix');
  assert.ok(css.includes('.manual-prompting-card'), 'CSS must define .manual-prompting-card');
  assert.ok(css.includes('.agentic-workflow-card'), 'CSS must define .agentic-workflow-card');
  assert.ok(css.includes('.badge-manual'), 'CSS must define .badge-manual');
  assert.ok(css.includes('.badge-agentic'), 'CSS must define .badge-agentic');
  assert.ok(css.includes('.highlight-manual'), 'CSS must define .highlight-manual');
  assert.ok(css.includes('.highlight-agentic'), 'CSS must define .highlight-agentic');

  // Slide 2 classes
  assert.ok(css.includes('.skills-terminal-artifact'), 'CSS must define .skills-terminal-artifact');
  assert.ok(css.includes('.terminal-window'), 'CSS must define .terminal-window');
  assert.ok(css.includes('.terminal-copy-btn'), 'CSS must define .terminal-copy-btn');
  assert.ok(css.includes('.rendered-skills-container'), 'CSS must define .rendered-skills-container');
  assert.ok(css.includes('.skill-badges-grid'), 'CSS must define .skill-badges-grid');
  assert.ok(css.includes('.skill-item-card'), 'CSS must define .skill-item-card');

  // Responsiveness checks
  assert.ok(css.includes('.paradigm-cards-grid'), 'CSS must define .paradigm-cards-grid');
  assert.match(css, /@media\s*\(max-width:\s*768px\)/, 'CSS must include media query for tablet/mobile');
});
