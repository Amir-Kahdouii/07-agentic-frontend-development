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

test('05: Slide 5 - vibefarsi.ir MCP server integration and capabilities', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Slide 5 section check
  const slide5Match = html.match(/<article[^>]*id="slide-5"[^>]*>([\s\S]*?)<\/article>/i);
  assert.ok(slide5Match, 'Slide 5 article element must exist in index.html');
  const slide5Content = slide5Match[1];

  // MCP & VibeFarsi presence
  assert.ok(
    slide5Content.includes('vibefarsi.ir'),
    'Slide 5 must introduce vibefarsi.ir'
  );
  assert.ok(
    slide5Content.includes('MCP') || slide5Content.includes('Model Context Protocol'),
    'Slide 5 must explain the Model Context Protocol (MCP) connection'
  );

  // Copyable MCP server URL
  assert.ok(
    slide5Content.includes('data-copy="https://vibefarsi.ir"') || slide5Content.includes('data-copy="vibefarsi.ir"'),
    'Slide 5 must provide a copy button with data-copy for vibefarsi.ir'
  );

  // Tool tags/badges
  assert.ok(
    slide5Content.includes('get_design_rules'),
    'Slide 5 must list the get_design_rules MCP tool'
  );
  assert.ok(
    slide5Content.includes('search_registry'),
    'Slide 5 must list the search_registry MCP tool'
  );
  assert.ok(
    slide5Content.includes('get_component'),
    'Slide 5 must list the get_component MCP tool'
  );
  assert.ok(
    slide5Content.includes('scaffold_page'),
    'Slide 5 must list the scaffold_page MCP tool'
  );

  // Philosophy: copy-paste code ownership over bloated npm UI kits
  assert.ok(
    slide5Content.includes('npm') || slide5Content.includes('مالکیت کد') || slide5Content.includes('کپی'),
    'Slide 5 must emphasize native Persian code ownership without bloated npm packages'
  );
});

test('05: Slide 6 - Anthropic frontend-design skill and ticket execution craft', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  const slide6Match = html.match(/<article[^>]*id="slide-6"[^>]*>([\s\S]*?)<\/article>/i);
  assert.ok(slide6Match, 'Slide 6 article element must exist in index.html');
  const slide6Content = slide6Match[1];

  // Frontend-design skill reference
  assert.ok(
    slide6Content.includes('frontend-design'),
    'Slide 6 must reference Anthropic frontend-design skill'
  );

  // Anti-generic LLM design & craft
  assert.ok(
    slide6Content.includes('DESIGN.md'),
    'Slide 6 must explain executing tickets with strict fidelity to DESIGN.md'
  );
  assert.ok(
    slide6Content.includes('کلیشه') || slide6Content.includes('جنریک') || slide6Content.includes('Generic') || slide6Content.includes('دیفالت'),
    'Slide 6 must explain preventing generic AI defaults and cliché UI patterns'
  );

  // Execution flow / pillars
  assert.ok(
    slide6Content.includes('تیکت') || slide6Content.includes('Ticket'),
    'Slide 6 must detail ticket-by-ticket implementation flow'
  );
  assert.ok(
    slide6Content.includes('تعامل') || slide6Content.includes('انیمیشن') || slide6Content.includes('میکرو') || slide6Content.includes('Micro'),
    'Slide 6 must highlight intentional micro-interactions or motion'
  );
  assert.ok(
    slide6Content.includes('دسترس‌پذیری') || slide6Content.includes('a11y') || slide6Content.includes('Accessibility') || slide6Content.includes('ریسپانسیو'),
    'Slide 6 must highlight accessibility and responsive craftsmanship'
  );
});

test('05: Clipboard interaction on Slide 5 - Copies vibefarsi.ir MCP server URL', async () => {
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
  let innerHTML = '<span>کپی آدرس سرور</span>';
  let listeners = {};

  const mockButton = {
    getAttribute: (attr) => (attr === 'data-copy' ? 'https://vibefarsi.ir' : null),
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

  assert.equal(copiedText, 'https://vibefarsi.ir');
  assert.ok(mockButton.classList.contains('copied'));
  assert.ok(mockButton.innerHTML.includes('کپی شد! ✓'));
});
