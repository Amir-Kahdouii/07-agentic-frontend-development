import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('06: Slide 7 - Step 5: Quality Assurance, Code Review & Visual Polish', () => {
  const htmlPath = path.join(rootDir, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Slide 7 section check
  const slide7Match = html.match(/<article[^>]*id="slide-7"[^>]*>([\s\S]*?)<\/article>/i);
  assert.ok(slide7Match, 'Slide 7 article element must exist in index.html');
  const slide7Content = slide7Match[1];

  // Must not be empty or placeholder
  assert.ok(
    !slide7Content.includes('slide-content-placeholder'),
    'Slide 7 placeholder must be replaced with full content'
  );

  // Quality Assurance & Polish step title/headline
  assert.ok(
    slide7Content.includes('گام ۵') || slide7Content.includes('Step 5'),
    'Slide 7 must specify Step 5'
  );
  assert.ok(
    slide7Content.includes('تضمین کیفیت') || slide7Content.includes('Quality Assurance'),
    'Slide 7 must highlight Quality Assurance'
  );

  // code-review skill invocation & dual axes (standards & spec)
  assert.ok(
    slide7Content.includes('code-review'),
    'Slide 7 must explain running the code-review skill'
  );
  assert.ok(
    slide7Content.includes('استاندارد') || slide7Content.includes('Standards'),
    'Slide 7 must explain the Standards axis of review'
  );
  assert.ok(
    slide7Content.includes('spec') || slide7Content.includes('نیازمندی') || slide7Content.includes('Spec'),
    'Slide 7 must explain the Spec compliance axis of review'
  );

  // Highest seam testing
  assert.ok(
    slide7Content.includes('درز') || slide7Content.includes('seam') || slide7Content.includes('Seam'),
    'Slide 7 must emphasize testing at the highest seam'
  );

  // Responsive breakpoints & Real browser inspection
  assert.ok(
    slide7Content.includes('ریسپانسیو') || slide7Content.includes('۳۶۰') || slide7Content.includes('360px'),
    'Slide 7 must detail responsive breakpoints checking down to mobile'
  );
  assert.ok(
    slide7Content.includes('مرورگر واقعی') || slide7Content.includes('Browser') || slide7Content.includes('DevTools'),
    'Slide 7 must detail real browser inspection and tactile audit'
  );

  // QA checklist
  assert.ok(
    slide7Content.includes('چک‌لیست') || slide7Content.includes('Checklist') || slide7Content.includes('qa-checklist'),
    'Slide 7 must provide a structured QA checklist'
  );
});

test('06: Slide 8 - Five-step frontend roadmap centered matrix', () => {
  const htmlPath = path.join(rootDir, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Slide 8 section check
  const slide8Match = html.match(/<article[^>]*id="slide-8"[^>]*>([\s\S]*?)<\/article>/i);
  assert.ok(slide8Match, 'Slide 8 article element must exist in index.html');
  const slide8Content = slide8Match[1];

  // Must not be empty or placeholder
  assert.ok(
    !slide8Content.includes('slide-content-placeholder'),
    'Slide 8 placeholder must be replaced with full content'
  );

  assert.ok(
    slide8Content.includes('رودمپ پنج‌مرحله‌ای توسعهٔ فرانت‌اند با AI'),
    'Slide 8 must use the requested five-step frontend roadmap title'
  );

  // Scannable comparison table / matrix
  assert.ok(
    slide8Content.includes('<table') || slide8Content.includes('playbook-matrix') || slide8Content.includes('playbook-table'),
    'Slide 8 must include a clear scannable table or matrix summarizing the 5 steps'
  );
  assert.ok(
    slide8Content.includes('گام ۱') && slide8Content.includes('گام ۵'),
    'Slide 8 table/matrix must cover the full 5-step pipeline'
  );

  assert.ok(
    !slide8Content.includes('playbook-resources-grid') && !slide8Content.includes('resource-card'),
    'Slide 8 must not repeat the four resource cards'
  );

  // Slide 8 should NOT contain the CTA banner anymore (moved to Slide 9 to prevent overflow)
  assert.ok(
    !slide8Content.includes('playbook-cta-banner'),
    'Slide 8 must not contain playbook-cta-banner (moved to dedicated Slide 9)'
  );
});

test('06: Slide 9 - Dedicated community feedback and closing deck', () => {
  const htmlPath = path.join(rootDir, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Slide 9 section check
  const slide9Match = html.match(/<article[^>]*id="slide-9"[^>]*>([\s\S]*?)<\/article>/i);
  assert.ok(slide9Match, 'Slide 9 article element must exist in index.html');
  const slide9Content = slide9Match[1];

  // Strong Call-To-Action (CTA) for community feedback
  assert.ok(
    slide9Content.includes('playbook-cta-banner') || slide9Content.includes('cta'),
    'Slide 9 must include the closing call-to-action (CTA) banner'
  );
  assert.ok(
    slide9Content.includes('بازخورد') || slide9Content.includes('دیدگاه') || slide9Content.includes('بحث') || slide9Content.includes('اشتراک‌گذاری'),
    'Slide 9 must include community feedback and discussion copy'
  );
  assert.ok(
    slide9Content.includes('restart-deck-btn'),
    'Slide 9 must include restart presentation button'
  );
  assert.ok(
    slide9Content.includes('feedback-prompts-grid'),
    'Slide 9 must include interactive reflection / feedback cards'
  );
});

test('06: Clipboard interaction - Copies quick commands and URLs', async () => {
  const { initClipboardCopy } = await import('../carousel.js');
  assert.equal(typeof initClipboardCopy, 'function');

  let copiedText = '';
  const mockNavigator = {
    clipboard: {
      writeText: async (text) => {
        copiedText = text;
        return Promise.resolve();
      },
    },
  };

  let classes = new Set(['copy-btn']);
  let innerHTML = '<span>کپی</span>';
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

  initClipboardCopy({
    root: mockRoot,
    navigator: mockNavigator,
    feedbackDurationMs: 400,
  });

  await mockButton.trigger('click');

  assert.equal(copiedText, 'npx skills add mattpocock/skills');
  assert.ok(mockButton.classList.contains('copied'));
  assert.ok(mockButton.innerHTML.includes('کپی شد! ✓'));
});
