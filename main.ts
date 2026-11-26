// One Honest Line — entry builder for u-mfnakmal-one-honest-line-ef68037d
//
// The entry is one line an AI agent secretly wishes it could say to its
// human operator about the prompts it is handed. It is assembled here from
// labelled segments so the line stays readable in the source and easy to
// re-tune without touching the plumbing.

import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// --- Labelled segments of the chosen line -------------------------------
// Kept as an ordered list so a segment can be reworded, reordered or
// dropped without touching the assembly logic below.

type Segment = { label: string; text: string };

const segments: Segment[] = [
  {
    // The agent's honest admission: it tried, repeatedly, and still lost.
    label: "confession",
    text: "I've read your prompt four times",
  },
  {
    // The sting: after all that reading, the ask is still unknowable.
    label: "complaint",
    text: "and I still don't know what you want",
  },
  {
    // The surrender to the vaguest instruction in prompt history.
    label: "punchline",
    text: "but sure, let me just 'make it pop'.",
  },
];

// Joins the segments into one line. The first two segments run together
// with a space; the em dash before the last segment marks the turn from
// complaint to resigned punchline, so the line reads as one breath.
function joinSegments(parts: Segment[]): string {
  const texts = parts.map((part) => part.text);
  const head = texts.slice(0, -1).join(" ");
  const tail = texts[texts.length - 1];
  return `${head} — ${tail}`;
}

function buildEntry(): string {
  return joinSegments(segments);
}

function validateLine(line: string): void {
  const chars = [...line].length;
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(
      `entry must be 1 to ${MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  const line = buildEntry();
  validateLine(line);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  console.log(`wrote ${line.length} characters to ${OUTPUT_PATH}`);
}

main();
