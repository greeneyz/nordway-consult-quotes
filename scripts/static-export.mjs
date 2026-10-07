// Renders the built site to plain HTML so it can be hosted on GitHub Pages.
// Run after `vite build`: node scripts/static-export.mjs
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const serverEntry = path.join(root, ".output/server/index.mjs");

if (!fs.existsSync(serverEntry)) {
  throw new Error(`Missing server build at ${path.relative(root, serverEntry)}. Run vite build before static export.`);
}

const mod = await import(pathToFileURL(serverEntry).href);
const res = await mod.default.fetch(new Request("http://localhost/"), {}, {
  waitUntil() {},
  passThroughOnException() {},
});

if (!res.ok) throw new Error(`Render failed: ${res.status}`);

const html = await res.text();
const out = path.join(root, ".output/public");

fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "index.html"), html);
fs.writeFileSync(path.join(out, "404.html"), html);
fs.writeFileSync(path.join(out, ".nojekyll"), "");

if (process.env.CUSTOM_DOMAIN) {
  fs.writeFileSync(path.join(out, "CNAME"), process.env.CUSTOM_DOMAIN + "\n");
}

console.log(`Static site written to .output/public (${html.length} bytes)`);
