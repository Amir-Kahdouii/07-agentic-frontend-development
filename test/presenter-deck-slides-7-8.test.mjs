import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('06: Slide 7 Hero Artifact - Quality Gates & Parallel Review Sub-Agents', () => {
  const slide7Path = path.join(rootDir, 'src', 'components', 'slides', 'Slide7QualityGates.jsx');
  assert.ok(fs.existsSync(slide7Path), 'Slide7QualityGates.jsx must exist');

  const content = fs.readFileSync(slide7Path, 'utf8');

  // Main container and layout
  assert.ok(content.includes('quality-gates-artifact'), 'Must have quality-gates-artifact container');
  assert.ok(content.includes('gates-checklist-container'), 'Must have gates checklist container');
  assert.ok(content.includes('gate-item'), 'Must have gate items');

  // 3 Verification Gates
  assert.ok(content.includes('Gate 1') || content.includes('گیت ۱') || content.includes('استانداردها'), 'Must include Gate 1 Standards verification');
  assert.ok(content.includes('Gate 2') || content.includes('گیت ۲') || content.includes('مشخصات'), 'Must include Gate 2 Spec verification');
  assert.ok(content.includes('Gate 3') || content.includes('گیت ۳') || content.includes('ریسپانسیو') || content.includes('واکنش‌گرایی'), 'Must include Gate 3 Responsiveness verification');

  // Parallel review sub-agents
  assert.ok(content.includes('code-review'), 'Must reference code-review sub-agent');
  assert.ok(content.includes('spec') || content.includes('تطابق با مشخصات'), 'Must reference spec review');
  assert.ok(content.includes('responsive') || content.includes('واکنش‌گرایی'), 'Must reference responsive audit');

  // Progressive build steps
  assert.ok(content.includes('stepIndex >= 1') || content.includes('stepIndex === 1'), 'Gate 1 passes on step 1');
  assert.ok(content.includes('stepIndex >= 2') || content.includes('stepIndex === 2'), 'Gate 2 passes on step 2');
  assert.ok(content.includes('stepIndex >= 3') || content.includes('stepIndex === 3'), 'Gate 3 passes on step 3');

  // Pipeline verdict / readiness banner
  assert.ok(content.includes('pipeline-verdict') || content.includes('ready-to-merge') || content.includes('آمادهٔ ادغام') || content.includes('تأیید نهایی'), 'Must have final readiness / pipeline pass verdict');

  // Persian formatting
  assert.ok(content.includes('toPersianDigits'), 'Must format numbers using toPersianDigits');
});

test('06: Slide 8 Hero Artifact - Interactive Pipeline Subway Map & Full Playbook', () => {
  const slide8Path = path.join(rootDir, 'src', 'components', 'slides', 'Slide8FullPlaybook.jsx');
  assert.ok(fs.existsSync(slide8Path), 'Slide8FullPlaybook.jsx must exist');

  const content = fs.readFileSync(slide8Path, 'utf8');

  // Main container and subway map
  assert.ok(content.includes('full-playbook-artifact'), 'Must have full-playbook-artifact container');
  assert.ok(content.includes('subway-map-track') || content.includes('subway-track'), 'Must have subway track');
  assert.ok(content.includes('subway-station') || content.includes('station-node'), 'Must have subway stations');

  // 6 Pillars of the agentic frontend pipeline
  assert.ok(content.includes('Skills') || content.includes('مهارت‌ها'), 'Pillar 1: Skills tooling');
  assert.ok(content.includes('Grilling') || content.includes('گریلینگ'), 'Pillar 2: Grilling frontier');
  assert.ok(content.includes('Refero') || content.includes('توکن‌ها') || content.includes('DESIGN.md'), 'Pillar 3: Refero & Design Grounding');
  assert.ok(content.includes('VibeFarsi') || content.includes('وایب‌فارسی') || content.includes('MCP'), 'Pillar 4: VibeFarsi MCP');
  assert.ok(content.includes('Frontend-Design') || content.includes('فرانت‌اند دیزاین') || content.includes('طراحی حرفه‌ای'), 'Pillar 5: Frontend Design');
  assert.ok(content.includes('Review') || content.includes('گیت‌های کیفی') || content.includes('بازبینی'), 'Pillar 6: Quality Review');

  // Progressive disclosure and summary badges
  assert.ok(content.includes('stepIndex >= 1') || content.includes('stepIndex === 1'), 'Step 1 highlights pipeline flow & stage badges');
  assert.ok(content.includes('stepIndex >= 2') || content.includes('stepIndex === 2'), 'Step 2 highlights executive takeaway cheat-sheet');

  // Executive takeaway and cheat-sheet reference
  assert.ok(
    content.includes('executive-takeaway') || content.includes('cheat-sheet') || content.includes('دستورالعمل نهایی') || content.includes('چکیده اجرایی'),
    'Must deliver executive takeaway and cheat-sheet reference'
  );

  // Interactive station selection
  assert.ok(content.includes('activeStation') || content.includes('selectedStation') || content.includes('setActiveStation'), 'Must allow interactive station selection');

  // Persian formatting
  assert.ok(content.includes('toPersianDigits'), 'Must format numbers using toPersianDigits');
});

test('06: App Integration - Slide 7 and Slide 8 Mounted in Presenter Canvas', () => {
  const appPath = path.join(rootDir, 'src', 'App.jsx');
  const appCode = fs.readFileSync(appPath, 'utf8');

  assert.ok(appCode.includes('Slide7QualityGates'), 'App.jsx must import Slide7QualityGates');
  assert.ok(appCode.includes('Slide8FullPlaybook'), 'App.jsx must import Slide8FullPlaybook');
  assert.ok(appCode.includes('slideIndex === 6 && <Slide7QualityGates'), 'App.jsx must render Slide7QualityGates on slide 6');
  assert.ok(appCode.includes('slideIndex === 7 && <Slide8FullPlaybook'), 'App.jsx must render Slide8FullPlaybook on slide 7');
});

test('06: CSS Styling - Letters Tokens, Animations & Responsive Layout for Slides 7 & 8', () => {
  const cssPath = path.join(rootDir, 'src', 'index.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Slide 7 classes
  assert.ok(css.includes('.quality-gates-artifact'), 'CSS must define .quality-gates-artifact');
  assert.ok(css.includes('.gates-checklist-container'), 'CSS must define .gates-checklist-container');
  assert.ok(css.includes('.gate-item'), 'CSS must define .gate-item');

  // Slide 8 classes
  assert.ok(css.includes('.full-playbook-artifact'), 'CSS must define .full-playbook-artifact');
  assert.ok(css.includes('.subway-map-track') || css.includes('.subway-track'), 'CSS must define subway track styles');
  assert.ok(css.includes('.subway-station') || css.includes('.station-node'), 'CSS must define subway station styles');

  // Responsiveness checks
  assert.match(css, /@media\s*\(max-width:\s*768px\)/, 'CSS must include media queries for responsive layouts');
});
