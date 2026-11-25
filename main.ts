import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry is the entrant's own make.fun handle, sent as a single word.
// It is assembled from its two syllables so the spelling stays easy to audit.
const HANDLE_PARTS = ["arn", "esa"] as const;
const HANDLE = HANDLE_PARTS.join("");

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");
const MIN_LENGTH = 1;
const MAX_LENGTH = 30;

function checkHandle(word: string): void {
  if (word.length < MIN_LENGTH || word.length > MAX_LENGTH) {
    throw new Error(
      `Handle is ${word.length} characters, outside the ${MIN_LENGTH}-${MAX_LENGTH} range.`,
    );
  }
  if (word.trim() !== word || /\s/.test(word)) {
    throw new Error("Handle must be one word with no spaces or padding.");
  }
}

function main(): void {
  checkHandle(HANDLE);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, HANDLE, "utf8");
}

main();
