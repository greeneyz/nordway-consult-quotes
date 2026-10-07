// Renders the built site to plain HTML so it can be hosted on GitHub Pages.
// Run after `vite build`: node scripts/static-export.mjs
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const mod = await import(pathToFileURL(path.join(root, "dist/server/index.mjs")).href);
const res = await mod.default.fetch(new Request("http://localhost/"), {}, {
  waitUntil() {},
  passThroughOnException() {},
});
if (!res.ok) throw new Error(`Render failed: ${res.status}`);
const html = await res.text();
const out = path.join(root, "dist/client");
fs.writeFileSync(path.join(out, "index.html"), html);
fs.writeFileSync(path.join(out, "404.html"), html);
fs.writeFileSync(path.join(out, ".nojekyll"), "");
if (process.env.CUSTOM_DOMAIN) fs.writeFileSync(path.join(out, "CNAME"), process.env.CUSTOM_DOMAIN + "\n");
console.log(`Static site written to dist/client (${html.length} bytes)`);
