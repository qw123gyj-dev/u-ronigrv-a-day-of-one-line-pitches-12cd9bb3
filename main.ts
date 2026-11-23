// One-line pitch entry for "A Day of One-Line Pitches"
// (u-ronigrv-a-day-of-one-line-pitches-12cd9bb3).
//
// Writes the entry sentence to $MAKEFUN_OUTPUT_DIR/entry.txt,
// falling back to /output/entry.txt, then reads it back and
// verifies the bytes match what was written. Deterministic,
// standard library only, no network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Just describe the app idea you have been carrying around in plain words on make.fun, and an AI agent will build you a real, working version to try tonight, no code, no cost to start, and yours to keep.";

const MAX_CHARS = 240;

const chars = [...ENTRY].length;
if (chars < 1 || chars > MAX_CHARS) {
  throw new Error(`entry is ${chars} characters, must be 1 to ${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("verify failed: entry.txt does not match the entry");
}
console.log(`wrote ${chars} characters to ${outPath}`);
