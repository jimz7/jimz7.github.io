import { readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import { siteConfig } from "../src/data/site";

if (!siteConfig.blogVisible) {
  const out = resolve("out");
  const figures = resolve(out, "images", "blog");
  if (!figures.startsWith(out + sep)) throw new Error("Unsafe export path");
  // The source images and legacy redirects are kept for restoring the blog.
  rmSync(figures, { recursive: true, force: true });
  const routes = ["", ...readdirSync("public/blog", { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)];
  const unavailable = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>Blog temporarily unavailable</title></head><body><h1>Blog temporarily unavailable</h1><p>Please check back later.</p><a href="/">About</a></body></html>`;
  for (const route of routes) writeFileSync(join(out, "blog", route, "index.html"), unavailable);
}
