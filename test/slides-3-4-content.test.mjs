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

test('04: Slide 3 - Content structure & Grilling Frontier Q&A simulation', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Slide 3 section check
  const slide3Match = html.match(/<article[^>]*id="slide-3"[^>]*>([\s\S]*?)<\/article>/i);
  assert.ok(slide3Match, 'Slide 3 article element must exist in index.html');
  const slide3Content = slide3Match[1];

  // Headline & Subheadline
  assert.ok(
    slide3Content.includes('Grilling') || slide3Content.includes('گریلینگ'),
    'Slide 3 must highlight the grilling skill'
  );
  assert.ok(
    slide3Content.includes('ابهام') || slide3Content.includes('مدل ذهنی') || slide3Content.includes('فرضیات'),
    'Slide 3 must describe eliminating ambiguity and creating a shared mental model'
  );

  // Frontier Q&A visual simulation
  assert.ok(
    slide3Content.includes('grilling-dialog') || slide3Content.includes('qa-dialog') || slide3Content.includes('frontier-dialog'),
    'Slide 3 must contain a visual frontier Q&A dialog container'
  );
  assert.ok(
    slide3Content.includes('ایجنت') || slide3Content.includes('Agent'),
    'Slide 3 must depict agent querying in the frontier interview'
  );
  assert.ok(
    slide3Content.includes('مهندس') || slide3Content.includes('توسعه‌دهنده') || slide3Content.includes('Developer'),
    'Slide 3 must depict developer/engineer responding in the interview'
  );

  // Core benefits / Decision tree
  assert.ok(
    slide3Content.includes('درخت تصمیم') || slide3Content.includes('درخت تصمیم‌گیری'),
    'Slide 3 must highlight the decision tree benefit'
  );
  assert.ok(
    slide3Content.includes('مدل ذهنی مشترک') || slide3Content.includes('شناخت مشترک'),
    'Slide 3 must highlight shared mental model'
  );
});

test('04: Slide 4 - Refero introduction, copyable link, and DESIGN.md token breakdown', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  const slide4Match = html.match(/<article[^>]*id="slide-4"[^>]*>([\s\S]*?)<\/article>/i);
  assert.ok(slide4Match, 'Slide 4 article element must exist in index.html');
  const slide4Content = slide4Match[1];

  // Refero introduction & copyable URL badge/button
  assert.ok(
    slide4Content.includes('styles.refero.design'),
    'Slide 4 must introduce styles.refero.design'
  );
  assert.ok(
    slide4Content.includes('data-copy="https://styles.refero.design"'),
    'Slide 4 must provide a copy button with data-copy="https://styles.refero.design"'
  );
  assert.ok(
    slide4Content.includes('DESIGN.md'),
    'Slide 4 must explain grounding aesthetics into DESIGN.md'
  );

  // Visual breakdown of tokens: Colors, Typography, Radii, Shadows
  assert.ok(
    slide4Content.includes('رنگ') || slide4Content.includes('Colors'),
    'Slide 4 token breakdown must include colors'
  );
  assert.ok(
    slide4Content.includes('تایپوگرافی') || slide4Content.includes('Typography'),
    'Slide 4 token breakdown must include typography'
  );
  assert.ok(
    slide4Content.includes('شعاع') || slide4Content.includes('گوشه') || slide4Content.includes('Radii'),
    'Slide 4 token breakdown must include border radii'
  );
  assert.ok(
    slide4Content.includes('سایه') || slide4Content.includes('Shadows'),
    'Slide 4 token breakdown must include elevation / shadows'
  );

  // AI Hallucination prevention
  assert.ok(
    slide4Content.includes('توهم') || slide4Content.includes('hallucination') || slide4Content.includes('دیفالت'),
    'Slide 4 must explain preventing AI aesthetic hallucinations or generic defaults'
  );
});

test('04: Clipboard interaction on Slide 4 - Copies styles.refero.design link', async () => {
  const { initClipboardCopy } = await import('../companion/carousel.js');
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
  let innerHTML = '<span>کپی لینک</span>';
  let listeners = {};

  const mockButton = {
    getAttribute: (attr) => (attr === 'data-copy' ? 'https://styles.refero.design' : null),
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
    feedbackDurationMs: 500,
  });

  await mockButton.trigger('click');

  assert.equal(copiedText, 'https://styles.refero.design');
  assert.ok(mockButton.classList.contains('copied'));
  assert.ok(mockButton.innerHTML.includes('کپی شد! ✓'));
});
