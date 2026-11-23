// A Day of One-Line Pitches — entry writer (program/v1, Node 22, stdlib only).
// Writes the one-sentence pitch to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output/entry.txt), then reads it back and verifies the bytes match.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "Just describe the app idea you have been carrying around in plain words on make.fun, and an AI agent will build you a real, working version to try tonight, no code, no cost to start, and yours to keep.";

const MAX_CHARS = 240;

function main(): void {
  if (SENTENCE.length === 0 || SENTENCE.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1 to ${MAX_CHARS} characters, got ${SENTENCE.length}`,
    );
  }
  if (SENTENCE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }

  // Exactly one sentence: one sentence-terminating period, at the end.
  // The dot inside the proper noun "make.fun" is not a terminator.
  const withoutProperNoun = SENTENCE.replace("make.fun", "makefun");
  const periods = [...withoutProperNoun].filter((c) => c === ".").length;
  if (periods !== 1 || !withoutProperNoun.endsWith(".")) {
    throw new Error(
      `entry must be exactly one sentence (one final period), found ${periods} period(s)`,
    );
  }
  console.log(`entry length: ${SENTENCE.length} characters`);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, SENTENCE, "utf8");

  const readBack = readFileSync(outPath, "utf8");
  if (readBack !== SENTENCE) {
    throw new Error(`verification failed: ${outPath} does not match the entry`);
  }
  console.log(`wrote ${outPath} (${SENTENCE.length} characters, verified)`);
}

main();
