import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('05: Slide 5 Hero Artifact - VibeFarsi MCP Inspector & Live Persian Component', () => {
  const slide5Path = path.join(rootDir, 'src', 'components', 'slides', 'Slide5McpVibeFarsi.jsx');
  assert.ok(fs.existsSync(slide5Path), 'Slide5McpVibeFarsi.jsx must exist');

  const content = fs.readFileSync(slide5Path, 'utf8');

  // Main container and panels
  assert.ok(content.includes('mcp-vibefarsi-artifact'), 'Must have mcp-vibefarsi-artifact container');
  assert.ok(content.includes('mcp-protocol-panel'), 'Must have MCP protocol & inspector panel');
  assert.ok(content.includes('persian-component-panel'), 'Must have live Persian component preview panel');

  // VibeFarsi server URL and copy button
  const serverUrl = 'https://vibefarsi.ir';
  assert.ok(content.includes(serverUrl), `Must include ${serverUrl}`);
  assert.ok(
    content.includes(`data-copy="${serverUrl}"`) || content.includes(`data-copy={SERVER_URL}`) || content.includes(`data-copy={VIBEFARSI_URL}`),
    'Must have data-copy attribute for vibefarsi.ir'
  );
  assert.ok(content.includes('کپی شد! ✓'), 'Visual tooltip feedback "کپی شد! ✓" must be present');

  // MCP Tools
  assert.ok(content.includes('get_design_rules'), 'Must include get_design_rules tool');
  assert.ok(content.includes('search_registry'), 'Must include search_registry tool');
  assert.ok(content.includes('get_component'), 'Must include get_component tool');

  // Clean JSON payloads
  assert.ok(content.includes('json-payload-viewer') || content.includes('code-payload'), 'Must have JSON payload viewer');
  assert.ok(content.includes('tools/call') || content.includes('search_registry') || content.includes('MetricCard'), 'Must display clean tool call payload');

  // Live Persian rendered component
  assert.ok(content.includes('live-persian-card') || content.includes('rendered-component-box'), 'Must render live Persian component');
  assert.ok(content.includes('toPersianDigits'), 'Must format numbers using toPersianDigits');
  assert.ok(
    content.includes('مالکیت مستقیم کد') || content.includes('بدون وابستگی npm') || content.includes('کپی-پیست بومی'),
    'Must highlight code ownership without bloated npm kits'
  );

  // Progressive disclosure steps
  assert.ok(content.includes('stepIndex >= 1') || content.includes('stepIndex === 1'), 'Step 1 reveals tool call execution');
  assert.ok(content.includes('stepIndex >= 2') || content.includes('stepIndex === 2'), 'Step 2 reveals component code payload');
  assert.ok(content.includes('stepIndex >= 3') || content.includes('stepIndex === 3'), 'Step 3 reveals fully interactive live rendered Persian component');
});

test('05: Slide 6 Hero Artifact - Before/After Visual Transformation Card & Frontend Craft', () => {
  const slide6Path = path.join(rootDir, 'src', 'components', 'slides', 'Slide6FrontendDesign.jsx');
  assert.ok(fs.existsSync(slide6Path), 'Slide6FrontendDesign.jsx must exist');

  const content = fs.readFileSync(slide6Path, 'utf8');

  // Main container and layout
  assert.ok(content.includes('frontend-design-artifact'), 'Must have frontend-design-artifact container');
  assert.ok(content.includes('transformation-stage'), 'Must have transformation stage container');
  assert.ok(content.includes('before-card-generic'), 'Must have before card for generic AI output');
  assert.ok(content.includes('after-card-letters'), 'Must have after card for Letters craft UI');

  // Generic AI tells and critique
  assert.ok(
    content.includes('خروجی خام و کلیشه‌ای') || content.includes('دیفالت هوش مصنوعی') || content.includes('Generic AI'),
    'Must describe generic AI baseline'
  );
  assert.ok(
    content.includes('سایه‌های کدر') || content.includes('گرادیانت') || content.includes('فونت دیفالت') || content.includes('کارت‌های یکنواخت'),
    'Must critique generic AI visual flaws'
  );

  // Letters design craft
  assert.ok(
    content.includes('#2597d0') || content.includes('var(--color-surgical-blue)'),
    'Must use surgical blue accent in Letters design'
  );
  assert.ok(
    content.includes('DESIGN.md') || content.includes('Letters'),
    'Must reference DESIGN.md or Letters design tokens'
  );
  assert.ok(
    content.includes('letter-spacing: 0') || content.includes('فاصله صفر حروف') || content.includes('letterSpacing'),
    'Must specify letter-spacing 0 for Persian'
  );

  // Interactive toggle or comparison controls
  assert.ok(
    content.includes('mode') || content.includes('activeTab') || content.includes('toggle') || content.includes('setMode'),
    'Must have interactive state for comparing before and after'
  );

  // Step-by-step disclosure
  assert.ok(content.includes('stepIndex === 0') || content.includes('stepIndex >= 0'), 'Step 0 displays generic baseline');
  assert.ok(content.includes('stepIndex >= 1'), 'Step 1 reveals transformation in progress / comparison');
  assert.ok(content.includes('stepIndex >= 2'), 'Step 2 reveals full high-craft Letters output with micro-interactions');
});

test('05: App Integration - Slide 5 and Slide 6 Mounted in Presenter Canvas', () => {
  const appPath = path.join(rootDir, 'src', 'App.jsx');
  const appCode = fs.readFileSync(appPath, 'utf8');

  assert.ok(appCode.includes('Slide5McpVibeFarsi'), 'App.jsx must import Slide5McpVibeFarsi');
  assert.ok(appCode.includes('Slide6FrontendDesign'), 'App.jsx must import Slide6FrontendDesign');
  assert.ok(appCode.includes('slideIndex === 4 && <Slide5McpVibeFarsi'), 'App.jsx must render Slide5McpVibeFarsi on slide 4');
  assert.ok(appCode.includes('slideIndex === 5 && <Slide6FrontendDesign'), 'App.jsx must render Slide6FrontendDesign on slide 5');
});

test('05: CSS Styling - Letters Tokens, Transitions & Responsive Layout for Slides 5 & 6', () => {
  const cssPath = path.join(rootDir, 'src', 'index.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Slide 5 classes
  assert.ok(css.includes('.mcp-vibefarsi-artifact'), 'CSS must define .mcp-vibefarsi-artifact');
  assert.ok(css.includes('.mcp-protocol-panel'), 'CSS must define .mcp-protocol-panel');
  assert.ok(css.includes('.persian-component-panel'), 'CSS must define .persian-component-panel');
  assert.ok(css.includes('.json-payload-viewer') || css.includes('.code-payload'), 'CSS must define payload viewer styles');
  assert.ok(css.includes('.live-persian-card') || css.includes('.rendered-component-box'), 'CSS must define live Persian card styles');

  // Slide 6 classes
  assert.ok(css.includes('.frontend-design-artifact'), 'CSS must define .frontend-design-artifact');
  assert.ok(css.includes('.transformation-stage'), 'CSS must define .transformation-stage');
  assert.ok(css.includes('.before-card-generic'), 'CSS must define .before-card-generic');
  assert.ok(css.includes('.after-card-letters'), 'CSS must define .after-card-letters');

  // Responsiveness checks
  assert.match(css, /@media\s*\(max-width:\s*768px\)/, 'CSS must include media queries for responsive layouts');
});
