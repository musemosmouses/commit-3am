// The 3 AM Commit Message — make.fun entry program.
// Writes exactly one commit message to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters.
// Deterministic: no clock, no randomness, no network, no model calls.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one commit message, 133 characters, written in English.
// feat: mislabels a destructive deploy (the agent's blind spot);
// "successfully removed all paying customers" is the specific damage;
// "apology drafted by me, the cause" is a status line only a model writes.
const ENTRY =
  "feat: 3 AM deploy successfully removed all paying customers from the database; rollback in progress, apology drafted by me, the cause";

// The gate refuses anything outside 1..200 characters, so enforce it here
// instead of shipping a silently invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`ENTRY must be 1-200 non-blank characters, got ${ENTRY.length}`);
}

// The grader runs on a read-only filesystem: the ONLY writable path is
// MAKEFUN_OUTPUT_DIR. Never write to a relative path or process.cwd() —
// that fails with EROFS. Never remove the output directory, and never copy
// dotfiles into it (this program copies nothing at all).
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
