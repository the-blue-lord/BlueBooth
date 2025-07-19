import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

const pagesDir = path.resolve(__dirname, "public");

function findHtmlFiles(dir, input = {}) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, input);
    } else if (file.endsWith(".html")) {
      const name = path.relative(pagesDir, fullPath).replace(/\\/g, "/").replace(/\.html$/, "");
      input[name] = fullPath;
    }
  }
  return input;
}

export default defineConfig({
  root: "public",
  build: {
    outDir: "../build",
    rollupOptions: {
      input: findHtmlFiles(pagesDir)
    }
  }
});
