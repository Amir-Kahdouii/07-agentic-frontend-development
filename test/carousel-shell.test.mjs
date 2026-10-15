import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const htmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'style.css');

test('01: Core Carousel Shell - index.html exists and has proper RTL setup', () => {
  assert.ok(fs.existsSync(htmlPath), 'index.html should exist');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Verify HTML lang and dir attributes
  assert.match(html, /<html[^>]*lang=["']fa["'][^>]*dir=["']rtl["']|<html[^>]*dir=["']rtl["'][^>]*lang=["']fa["']/, 'HTML must have lang="fa" and dir="rtl"');
  
  // Verify Vazirmatn font inclusion
  assert.match(html, /fonts\.googleapis\.com.*Vazirmatn/i, 'Google Fonts link for Vazirmatn must be included');

  // Verify slide counter element
  assert.match(html, /id=["']slide-counter["']/, 'Element with id="slide-counter" must exist');
  
  // Verify slide track element
  assert.match(html, /id=["']carousel-track["']/, 'Element with id="carousel-track" must exist');

  // Verify initial counter content
  assert.match(html, /اسلاید\s+[۱1]\s+از\s+[۸8]/, 'Counter must initialize with slide 1 of 8 in Persian');
});

test('01: Visual Tokens & Geometry - style.css defines DESIGN.md tokens', () => {
  assert.ok(fs.existsSync(cssPath), 'style.css should exist');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Colors from DESIGN.md
  assert.match(css, /--color-obsidian:\s*#070709/i, 'Obsidian color token must be defined');
  assert.match(css, /--color-paper-white:\s*#ffffff/i, 'Paper White token must be defined');
  assert.match(css, /--color-cloud-gray:\s*#f5f5f5/i, 'Cloud Gray token must be defined');
  assert.match(css, /--color-surgical-blue:\s*#2597d0/i, 'Surgical Blue token must be defined');
  assert.match(css, /--color-charcoal:\s*#60606c/i, 'Charcoal token must be defined');
  assert.match(css, /--color-sky-tint:\s*#d7e6f5/i, 'Sky Tint token must be defined');
  assert.match(css, /--color-sky-gradient:/i, 'Sky Gradient token must be defined');

  // Radius tokens
  assert.match(css, /--radius-card:\s*18px/i, 'Card radius must be 18px');
  assert.match(css, /--radius-pill:\s*100px/i, 'Pill radius must be 100px');

  // Typography - Vazirmatn and letter-spacing 0 for Persian
  assert.match(css, /(?:--font-persian|font-family):.*Vazirmatn/i, 'Vazirmatn font-family must be set');
  assert.match(css, /letter-spacing:\s*0/i, 'Persian text letter-spacing must be 0');
});
