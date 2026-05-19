#!/usr/bin/env node
// Vercel build step: writes marketing/config.local.js using the MAPBOX_TOKEN
// environment variable configured in the Vercel project. config.local.js is
// gitignored — the file only ever exists in the build output, never in the
// repository.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const token = process.env.MAPBOX_TOKEN || "";
const here = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(here, "..", "config.local.js");

writeFileSync(
  outPath,
  `// Generated at build time on Vercel from the MAPBOX_TOKEN env var.\n` +
  `window.RESOURCE_MAPBOX_TOKEN = ${JSON.stringify(token)};\n`
);

if (!token) {
  console.warn(
    "\n⚠  MAPBOX_TOKEN is not set. The map will render blank.\n" +
    "    Add MAPBOX_TOKEN (your pk.* Mapbox public token) in the Vercel\n" +
    "    project's Settings → Environment Variables, then redeploy.\n"
  );
} else {
  console.log(`✓ wrote ${outPath} (token length ${token.length})`);
}
