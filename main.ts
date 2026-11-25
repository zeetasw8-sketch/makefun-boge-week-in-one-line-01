import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));

function validateLine(text: string): void {
  if (text.length < 1 || text.length > 100) {
    throw new Error(`line must be 1-100 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

let line = readFileSync(join(dir, "line.txt"), "utf8");

// Strip a single trailing newline from line.txt, if present.
if (line.endsWith("\n")) {
  line = line.slice(0, -1);
}

validateLine(line);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
