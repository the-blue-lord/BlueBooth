import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve(__dirname, 'public/games/snake-v2');

function findHtmlFiles(dir, input = {}) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, input);
    } else if (file.endsWith('.html')) {
      const name = path.relative(pagesDir, fullPath).replace(/\\/g, '/').replace(/\.html$/, '');
      input[name] = fullPath;
    }
  }
  return input;
}

export default defineConfig({
  root: 'public/games/snake-v2',
  build: {
    outDir: '../../../build-snake-2.0.0',
    rollupOptions: {
      input: findHtmlFiles(pagesDir)
    }
  }
});
