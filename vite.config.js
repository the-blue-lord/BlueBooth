import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

function findHtmlFiles(pages_dir, dir, input = {}) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            findHtmlFiles(pages_dir, fullPath, input);
        }
        else if (file.endsWith(".html")) {
            const name = path.relative(pages_dir, fullPath).replace(/\\/g, "/").replace(/\.html$/, "");
            input[name] = fullPath;
        }
    }
    return input;
}

export default defineConfig(getConfigElement());

function getConfigElement() {
    const BUILD_GAME = process.env.BUILD_GAME == "true";
    const GAME_NAME = process.env.GAME_NAME;
    const GAME_VERSION = process.env.GAME_VERSION;

    const root_folder =  BUILD_GAME ? `public/games/${GAME_NAME}` : "public"
    const pagesDir = path.resolve(__dirname, root_folder);
    return {
        root: root_folder,
        build: {
            outDir: BUILD_GAME ? `../bluebooth-${GAME_NAME}-${GAME_VERSION}/build` : "../build",
            rollupOptions: {
                input: findHtmlFiles(pagesDir, pagesDir)
            }
        }
    };
}