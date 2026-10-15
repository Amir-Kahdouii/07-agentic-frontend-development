import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const htmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'style.css');
const jsPath = path.join(rootDir, 'carousel.js');
const nojekyllPath = path.join(rootDir, '.nojekyll');
const workflowPath = path.join(rootDir, '.github', 'workflows', 'deploy-pages.yml');

test('08: GitHub Pages - Required deployment assets exist in root', () => {
  assert.ok(fs.existsSync(htmlPath), 'index.html must exist in root');
  assert.ok(fs.existsSync(cssPath), 'style.css must exist in root');
  assert.ok(fs.existsSync(jsPath), 'carousel.js must exist in root');
  assert.ok(fs.existsSync(nojekyllPath), '.nojekyll file must exist in root to disable Jekyll');
});

test('08: GitHub Pages - Asset links in index.html use relative paths', () => {
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
});
