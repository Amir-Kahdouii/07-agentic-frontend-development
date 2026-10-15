import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyCompanionPlugin() {
  return {
    name: 'copy-companion',
    closeBundle() {
      const srcDir = path.resolve(__dirname, 'companion');
      const destDir = path.resolve(__dirname, 'dist', 'companion');
      if (fs.existsSync(srcDir)) {
        fs.mkdirSync(destDir, { recursive: true });
        for (const file of fs.readdirSync(srcDir)) {
          const srcFile = path.join(srcDir, file);
          const destFile = path.join(destDir, file);
          if (fs.statSync(srcFile).isFile()) {
            fs.copyFileSync(srcFile, destFile);
          }
        }
      }
      const nojekyllSrc = path.resolve(__dirname, '.nojekyll');
      const nojekyllDest = path.resolve(__dirname, 'dist', '.nojekyll');
      if (fs.existsSync(nojekyllSrc)) {
        fs.copyFileSync(nojekyllSrc, nojekyllDest);
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];
        if (url === '/companion' || url.startsWith('/companion/')) {
          let relPath = url.replace(/^\/companion\/?/, '');
          if (!relPath || relPath === '/') {
            relPath = 'index.html';
          }
          const filePath = path.resolve(__dirname, 'companion', relPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            if (filePath.endsWith('.html')) res.setHeader('Content-Type', 'text/html; charset=utf-8');
            else if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
            else if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
            res.end(fs.readFileSync(filePath));
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), copyCompanionPlugin()],
  base: './',
});
