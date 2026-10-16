import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('04: Slide 3 Hero Artifact - Grilling Frontier Q&A Simulation & Decision Tree', () => {
  const slide3Path = path.join(rootDir, 'src', 'components', 'slides', 'Slide3GrillingFrontier.jsx');
  assert.ok(fs.existsSync(slide3Path), 'Slide3GrillingFrontier.jsx must exist');

  const content = fs.readFileSync(slide3Path, 'utf8');

  // Main container and headers
  assert.ok(content.includes('grilling-frontier-artifact'), 'Must have grilling-frontier-artifact container');
  assert.ok(content.includes('grilling-interview-panel'), 'Must have chat-style interview panel');
  assert.ok(content.includes('decision-tree-panel'), 'Must have decision tree visualization panel');

  // Single-question frontier rule & agent interrogation
  assert.ok(
    content.includes('تنها ۱ پرسش') || content.includes('یک پرسش در هر دور') || content.includes('قانون ۱ پرسش') || content.includes('هر بار فقط ۱ سؤال') || content.includes('1-Question Rule'),
    'Must emphasize strict 1-question rule in grilling'
  );
  assert.ok(
    content.includes('مرز تصمیم‌گیری') || content.includes('Frontier'),
    'Must highlight decision frontier'
  );

  // Agent question & Developer response
  assert.ok(content.includes('chat-bubble-agent'), 'Must have agent question bubble');
  assert.ok(content.includes('chat-bubble-user'), 'Must have user answer bubble');
  assert.ok(
    content.includes('دوطرفه') || content.includes('Reversible') || content.includes('برگشت‌پذیر'),
    'Question must probe reversible navigation state machine'
  );
  assert.ok(
    content.includes('ArrowLeft') || content.includes('PageUp') || content.includes('بله'),
    'User response must provide affirmative confirmation'
  );

  // Decision Tree structure
  assert.ok(content.includes('tree-node-root'), 'Must have root question node');
  assert.ok(content.includes('tree-branches'), 'Must have decision branches');
  assert.ok(content.includes('tree-branch-active') || content.includes('branch-settled'), 'Must have settled branch');
  assert.ok(content.includes('tree-branch-rejected') || content.includes('branch-rejected'), 'Must have rejected branch');

  // Progressive disclosure steps
  assert.ok(content.includes('stepIndex >= 1') || content.includes('stepIndex === 1'), 'Step 1 discloses user affirmative answer');
  assert.ok(content.includes('stepIndex >= 2') || content.includes('stepIndex === 2'), 'Step 2 discloses settled decision tree and unblocked branch');
  assert.ok(content.includes('is-settled') || content.includes('frontier-resolved'), 'Must indicate settled state');
});

test('04: Slide 4 Hero Artifact - Refero Design Tokens, Swatches & Typography Inspector', () => {
  const slide4Path = path.join(rootDir, 'src', 'components', 'slides', 'Slide4DesignGrounding.jsx');
  assert.ok(fs.existsSync(slide4Path), 'Slide4DesignGrounding.jsx must exist');

  const content = fs.readFileSync(slide4Path, 'utf8');

  // Main container and layout
  assert.ok(content.includes('design-token-inspector-artifact'), 'Must have design-token-inspector-artifact container');
  assert.ok(content.includes('palette-inspector-section'), 'Must have palette inspector section');
  assert.ok(content.includes('typography-inspector-section'), 'Must have typography inspector section');

  // Letters Palette Swatches (Core Palette)
  assert.ok(content.includes('#ffffff'), 'Must include Paper White swatch #ffffff');
  assert.ok(content.includes('#070709'), 'Must include Obsidian swatch #070709');
  assert.ok(content.includes('#2597d0'), 'Must include Surgical Blue swatch #2597d0');

  // Border Radii & Elevation
  assert.ok(content.includes('18px') || content.includes('var(--radius-card)'), 'Must inspect 18px card radius');
  assert.ok(content.includes('shadow') || content.includes('سایه') || content.includes('elevation'), 'Must inspect surface elevation');

  // Typography tokens scale
  assert.ok(content.includes('--text-heading') || content.includes('44px'), 'Must include heading type size');
  assert.ok(content.includes('--text-body') || content.includes('16px'), 'Must include body type size');

  // Refero link and copy button
  const referoUrl = 'https://styles.refero.design';
  assert.ok(content.includes(referoUrl), `Must mention ${referoUrl}`);
  assert.ok(
    content.includes(`data-copy="${referoUrl}"`) || content.includes(`data-copy={REFERO_URL}`),
    'Must have data-copy attribute for styles.refero.design'
  );
  assert.ok(content.includes('کپی شد! ✓'), 'Visual tooltip feedback "کپی شد! ✓" must be present');

  // Step-by-step disclosure
  assert.ok(content.includes('stepIndex === 0') || content.includes('stepIndex >= 0'), 'Step 0 displays palette swatches and radius cards');
  assert.ok(content.includes('stepIndex >= 1'), 'Step 1 highlights typography scale');
  assert.ok(content.includes('stepIndex >= 2'), 'Step 2 reveals Refero link, elevation cards and anti-hallucination banner');
});

test('04: App Integration - Slide 3 and Slide 4 Mounted in Presenter Canvas', () => {
  const appPath = path.join(rootDir, 'src', 'App.jsx');
  const appCode = fs.readFileSync(appPath, 'utf8');

  assert.ok(appCode.includes('Slide3GrillingFrontier'), 'App.jsx must import Slide3GrillingFrontier');
  assert.ok(appCode.includes('Slide4DesignGrounding'), 'App.jsx must import Slide4DesignGrounding');
  assert.ok(appCode.includes('slideIndex === 2 && <Slide3GrillingFrontier'), 'App.jsx must render Slide3GrillingFrontier on slide 2');
  assert.ok(appCode.includes('slideIndex === 3 && <Slide4DesignGrounding'), 'App.jsx must render Slide4DesignGrounding on slide 3');
});

test('04: CSS Styling - Letters Tokens, Transitions & Responsive Layout for Slides 3 & 4', () => {
  const cssPath = path.join(rootDir, 'src', 'index.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Slide 3 classes
  assert.ok(css.includes('.grilling-frontier-artifact'), 'CSS must define .grilling-frontier-artifact');
  assert.ok(css.includes('.grilling-interview-panel'), 'CSS must define .grilling-interview-panel');
  assert.ok(css.includes('.decision-tree-panel'), 'CSS must define .decision-tree-panel');
  assert.ok(css.includes('.chat-bubble-agent'), 'CSS must define .chat-bubble-agent');
  assert.ok(css.includes('.chat-bubble-user'), 'CSS must define .chat-bubble-user');
  assert.ok(css.includes('.tree-branch'), 'CSS must define .tree-branch');

  // Slide 4 classes
  assert.ok(css.includes('.design-token-inspector-artifact'), 'CSS must define .design-token-inspector-artifact');
  assert.ok(css.includes('.palette-inspector-section'), 'CSS must define .palette-inspector-section');
  assert.ok(css.includes('.token-swatch-card'), 'CSS must define .token-swatch-card');
  assert.ok(css.includes('.typography-inspector-section'), 'CSS must define .typography-inspector-section');
  assert.ok(css.includes('.refero-banner-card'), 'CSS must define .refero-banner-card');
});
