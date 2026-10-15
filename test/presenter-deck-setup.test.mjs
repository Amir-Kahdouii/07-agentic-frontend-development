import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const rootDir = process.cwd();

test('01: Presenter Deck Root - index.html has proper RTL, Vazirmatn, and root mount', () => {
  const htmlPath = path.join(rootDir, 'index.html');
  assert.ok(fs.existsSync(htmlPath), 'root index.html must exist');

  const html = fs.readFileSync(htmlPath, 'utf8');
  assert.match(
    html,
    /<html[^>]*lang=["']fa["'][^>]*dir=["']rtl["']|<html[^>]*dir=["']rtl["'][^>]*lang=["']fa["']/,
    'root index.html must have lang="fa" and dir="rtl"'
  );
  assert.match(html, /fonts\.googleapis\.com.*Vazirmatn/i, 'Google Fonts link for Vazirmatn must be present');
  assert.match(html, /id=["']root["']/, 'Element with id="root" must exist');
  assert.match(html, /--color-surgical-blue:\s*#2597d0/i, 'Letters Surgical Blue token must be present');
});

test('01: Vite Configuration & Companion Static Bundling', () => {
  const distDir = path.join(rootDir, 'dist');
  const distCompanionDir = path.join(distDir, 'companion');

  if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    execSync('npm run build', { stdio: 'pipe' });
  }

  assert.ok(fs.existsSync(path.join(distDir, 'index.html')), 'dist/index.html must exist after build');
  assert.ok(fs.existsSync(path.join(distCompanionDir, 'index.html')), 'dist/companion/index.html must exist');
  assert.ok(fs.existsSync(path.join(distCompanionDir, 'style.css')), 'dist/companion/style.css must exist');
  assert.ok(fs.existsSync(path.join(distCompanionDir, 'carousel.js')), 'dist/companion/carousel.js must exist');
});

test('01: Presenter Deck Source - Cross-links to Reading Companion', () => {
  const appPath = path.join(rootDir, 'src', 'App.jsx');
  assert.ok(fs.existsSync(appPath), 'src/App.jsx must exist');

  const appCode = fs.readFileSync(appPath, 'utf8');
  assert.match(appCode, /href=["']\.\/companion\/?["']/, 'App.jsx must contain link to ./companion/');
});
