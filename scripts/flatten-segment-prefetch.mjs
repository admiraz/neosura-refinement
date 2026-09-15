// GitHub Pages review build only (see .github/workflows/pages.yml).
//
// A Next.js static export writes each route's segment prefetch payload in
// nested folders, e.g.
//   out/privatkunden/krankenkasse/__next.privatkunden/krankenkasse/__PAGE__.txt
// but the client router requests the flat, dot-joined name:
//   out/privatkunden/krankenkasse/__next.privatkunden.krankenkasse.__PAGE__.txt
// A server can rewrite one to the other; GitHub Pages cannot, so every link
// click 404s its prefetch and falls back to a full page reload (which also
// skips the page transition). This writes the flat copy next to each nested
// file; the originals are left in place.
import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const outDir = process.argv[2] ?? "out";
if (!existsSync(outDir)) {
  console.error(`flatten-segment-prefetch: "${outDir}" not found`);
  process.exit(1);
}

const filesUnder = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  });

let copied = 0;
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of filesUnder(full)) {
        const flatName = relative(dir, file).split(sep).join(".");
        copyFileSync(file, join(dir, flatName));
        copied++;
      }
    } else {
      walk(full);
    }
  }
};

walk(outDir);
console.log(`flatten-segment-prefetch: wrote ${copied} flat prefetch file(s)`);
