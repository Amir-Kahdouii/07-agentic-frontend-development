import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const rootDir = process.cwd();
const companionDir = path.join(rootDir, 'companion');
const htmlPath = path.join(companionDir, 'index.html');
const cssPath = path.join(companionDir, 'style.css');
const jsPath = path.join(companionDir, 'carousel.js');
const nojekyllPath = path.join(rootDir, '.nojekyll');
const workflowPath = path.join(rootDir, '.github', 'workflows', 'deploy-pages.yml');

test('08: GitHub Pages - Required deployment assets exist in companion', () => {
  assert.ok(fs.existsSync(htmlPath), 'index.html must exist in companion');
  assert.ok(fs.existsSync(cssPath), 'style.css must exist in companion');
  assert.ok(fs.existsSync(jsPath), 'carousel.js must exist in companion');
  assert.ok(fs.existsSync(nojekyllPath), '.nojekyll file must exist in root to disable Jekyll');
});

test('08: GitHub Pages - Asset links in companion/index.html use relative paths', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Verify stylesheet link is relative
  assert.match(
    html,
    /<link[^>]+rel=["']stylesheet["'][^>]+href=["']style\.css["']|<link[^>]+href=["']style\.css["'][^>]+rel=["']stylesheet["']/,
    'style.css must be referenced via relative URL (href="style.css")'
  );

  // Verify carousel.js script link is relative
  assert.match(
    html,
    /<script[^>]+src=["']carousel\.js["']/,
    'carousel.js must be referenced via relative URL (src="carousel.js")'
  );

  // Ensure no root-slashed relative assets (/style.css, /carousel.js)
  assert.doesNotMatch(
    html,
    /(?:href|src)=["']\/(?:style\.css|carousel\.js)["']/,
    'Asset links must not have leading slashes to support GitHub Pages repository subpaths'
  );
});

test('08: GitHub Pages - Workflow file configuration and permissions', () => {
  assert.ok(fs.existsSync(workflowPath), '.github/workflows/deploy-pages.yml must exist');
  const workflow = fs.readFileSync(workflowPath, 'utf8');

  // Triggers
  assert.match(workflow, /push:/, 'Workflow must trigger on push');
  assert.match(workflow, /branches:\s*\n\s*-\s*master/, 'Workflow must trigger on master branch');
  assert.match(workflow, /workflow_dispatch:/, 'Workflow must support manual workflow_dispatch');

  // Permissions
  assert.match(workflow, /pages:\s*write/, 'Workflow must declare pages: write permission');
  assert.match(workflow, /id-token:\s*write/, 'Workflow must declare id-token: write permission');

  // Pages actions
  assert.match(workflow, /actions\/configure-pages@v\d+/, 'Must use actions/configure-pages');
  assert.match(workflow, /actions\/upload-pages-artifact@v\d+/, 'Must use actions/upload-pages-artifact');
  assert.match(workflow, /actions\/deploy-pages@v\d+/, 'Must use actions/deploy-pages');

  // Pre-deployment test step
  assert.match(workflow, /npm test/, 'Workflow must run npm test before deployment');

  // Build step and artifact packaging
  assert.match(workflow, /npm run build/, 'Workflow must build the dual presentation and companion with npm run build');
  assert.match(workflow, /path:\s*(?:dist|\.\/dist)/, 'Workflow must upload dist directory as the pages artifact');
  assert.match(workflow, /npm ci/, 'Workflow must install dependencies using npm ci');
});

test('08: Dual Deployment - package.json defines test and build scripts', () => {
  const pkgPath = path.join(rootDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  assert.ok(pkg.scripts, 'package.json must contain scripts');
  assert.ok(pkg.scripts.test, 'package.json must contain a test script');
  assert.ok(pkg.scripts.build, 'package.json must contain a build script');
  assert.ok(pkg.scripts['test:companion'], 'package.json must contain a test:companion script');
  assert.ok(pkg.scripts['test:deck'], 'package.json must contain a test:deck script');
});

test('08: Dual Deployment - End-to-end dist verification for root deck and companion', () => {
  const distDir = path.join(rootDir, 'dist');
  const distCompanionDir = path.join(distDir, 'companion');

  if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'index.html'))) {
    execSync('npm run build', { stdio: 'pipe' });
  }

  assert.ok(fs.existsSync(distDir), 'dist/ directory must exist');
  assert.ok(fs.existsSync(path.join(distDir, 'index.html')), 'dist/index.html (Presenter Deck entry) must exist');
  assert.ok(fs.existsSync(path.join(distDir, '.nojekyll')), 'dist/.nojekyll must exist to prevent GitHub Pages Jekyll processing');
  
  assert.ok(fs.existsSync(path.join(distCompanionDir, 'index.html')), 'dist/companion/index.html must exist');
  assert.ok(fs.existsSync(path.join(distCompanionDir, 'style.css')), 'dist/companion/style.css must exist');
  assert.ok(fs.existsSync(path.join(distCompanionDir, 'carousel.js')), 'dist/companion/carousel.js must exist');

  const rootHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  assert.match(rootHtml, /id=["']root["']/, 'dist/index.html must contain root mount element');

  const companionHtml = fs.readFileSync(path.join(distCompanionDir, 'index.html'), 'utf8');
  assert.match(companionHtml, /carousel\.js/, 'dist/companion/index.html must reference companion scripts');
});

test('08: Documentation - Root README.md documents architecture, shortcuts, and dual links', () => {
  const readmePath = path.join(rootDir, 'README.md');
  assert.ok(fs.existsSync(readmePath), 'Root README.md must exist');

  const readme = fs.readFileSync(readmePath, 'utf8');

  // Badges & high-craft presentation
  assert.match(readme, /!\[.*\]\(.*\)|badge|shields\.io/i, 'README.md must include badges');

  // Dual distribution architecture
  assert.match(readme, /(?:Presenter Deck|\/companion\/|Reading Companion)/i, 'README.md must explain the dual distribution architecture');
  assert.match(readme, /companion/i, 'README.md must mention companion subpath');

  // Keyboard navigation shortcuts
  assert.match(readme, /ArrowRight/i, 'README.md must document ArrowRight shortcut');
  assert.match(readme, /ArrowLeft/i, 'README.md must document ArrowLeft shortcut');
  assert.match(readme, /Space/i, 'README.md must document Space shortcut');
  assert.match(readme, /F\b|Fullscreen/i, 'README.md must document F shortcut for fullscreen');

  // Development and test commands
  assert.match(readme, /npm run dev/i, 'README.md must document npm run dev');
  assert.match(readme, /npm test/i, 'README.md must document npm test');
  assert.match(readme, /npm run build/i, 'README.md must document npm run build');

  // Direct links to both experiences
  assert.match(readme, /(?:https?:\/\/|\.\/|http:\/\/localhost)/, 'README.md must contain direct links to experiences');
});

