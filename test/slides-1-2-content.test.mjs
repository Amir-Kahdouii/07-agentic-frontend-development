import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const companionDir = path.join(rootDir, 'companion');
const htmlPath = path.join(companionDir, 'index.html');

test('03: Slide 1 - Content structure & paradigm comparison card', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Slide 1 section check
  const slide1Match = html.match(/<article[^>]*id="slide-1"[^>]*>([\s\S]*?)<\/article>/i);
  assert.ok(slide1Match, 'Slide 1 article element must exist in index.html');
  const slide1Content = slide1Match[1];

  // Headline & Subheadline
  assert.ok(
    slide1Content.includes('استفاده از ایجنت در توسعهٔ فرانت‌اند'),
    'Slide 1 must include the selected agentic frontend-development title'
  );
  assert.ok(
    slide1Content.includes('ایجنت') || slide1Content.includes('هوش مصنوعی'),
    'Slide 1 must mention AI agents or workflow'
  );

  // Paradigm comparison card / sections: chaotic prompting vs agentic engineering
  assert.ok(
    slide1Content.includes('پرامپت') || slide1Content.includes('سنتی'),
    'Slide 1 must highlight the chaotic / prompt-and-pray trap'
  );
  assert.ok(
    slide1Content.includes('مهندسی') || slide1Content.includes('پایپ‌لاین'),
    'Slide 1 must contrast with the agentic engineering pipeline'
  );
});

test('03: Slide 2 - Skills explanation and terminal commands with copy triggers', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  const slide2Match = html.match(/<article[^>]*id="slide-2"[^>]*>([\s\S]*?)<\/article>/i);
  assert.ok(slide2Match, 'Slide 2 article element must exist in index.html');
  const slide2Content = slide2Match[1];

  // Must explain skills concept
  assert.ok(
    slide2Content.includes('اسکیل') || slide2Content.includes('مهارت'),
    'Slide 2 must explain skills concept'
  );

  // Terminal commands
  assert.ok(
    slide2Content.includes('npx skills add mattpocock/skills'),
    'Slide 2 must include terminal command for mattpocock/skills'
  );
  assert.ok(
    slide2Content.includes('npx skills add anthropics/skills --skill frontend-design'),
    'Slide 2 must include terminal command for frontend-design'
  );

  // Copy buttons
  assert.ok(
    slide2Content.includes('data-copy="npx skills add mattpocock/skills"'),
    'Slide 2 must have a copy button with data-copy attribute for mattpocock/skills'
  );
  assert.ok(
    slide2Content.includes('data-copy="npx skills add anthropics/skills --skill frontend-design"'),
    'Slide 2 must have a copy button with data-copy attribute for frontend-design'
  );
});

test('03: Clipboard interaction - Copies text and transitions to "کپی شد! ✓" for 2 seconds', async () => {
  const { initClipboardCopy } = await import('../companion/carousel.js');
  assert.equal(typeof initClipboardCopy, 'function', 'initClipboardCopy must be exported by carousel.js');

  let clipboardText = '';
  const mockNavigator = {
    clipboard: {
      writeText: async (text) => {
        clipboardText = text;
        return Promise.resolve();
      },
    },
  };

  let classes = new Set(['copy-btn']);
  let innerHTML = '<span>کپی دستور</span>';
  let listeners = {};

  const mockButton = {
    getAttribute: (attr) => (attr === 'data-copy' ? 'npx skills add mattpocock/skills' : null),
    classList: {
      add: (cls) => classes.add(cls),
      remove: (cls) => classes.delete(cls),
      contains: (cls) => classes.has(cls),
    },
    get innerHTML() {
      return innerHTML;
    },
    set innerHTML(val) {
      innerHTML = val;
    },
    addEventListener: (evt, fn) => {
      listeners[evt] = listeners[evt] || [];
      listeners[evt].push(fn);
    },
    trigger: async (evt) => {
      if (listeners[evt]) {
        await Promise.all(listeners[evt].map(fn => fn({ preventDefault: () => {} })));
      }
    },
  };

  const mockRoot = {
    querySelectorAll: (selector) => {
      if (selector === '[data-copy]') {
        return [mockButton];
      }
      return [];
    },
  };

  // Wire up with custom timeout of 2000ms
  initClipboardCopy({
    root: mockRoot,
    navigator: mockNavigator,
    feedbackDurationMs: 2000,
  });

  // Trigger click
  await mockButton.trigger('click');

  // Verify writeText was called
  assert.equal(clipboardText, 'npx skills add mattpocock/skills', 'Exact text should be copied');

  // Verify immediate feedback
  assert.ok(mockButton.classList.contains('copied'), 'Button should receive "copied" class');
  assert.ok(mockButton.innerHTML.includes('کپی شد! ✓'), 'Button should display "کپی شد! ✓" text');

  // Wait 2100ms and verify reset
  await new Promise((resolve) => setTimeout(resolve, 2100));
  assert.ok(!mockButton.classList.contains('copied'), 'Button should remove "copied" class after timeout');
  assert.ok(!mockButton.innerHTML.includes('کپی شد! ✓'), 'Button should reset original content after timeout');
});
