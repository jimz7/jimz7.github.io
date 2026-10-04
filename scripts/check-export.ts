import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { siteConfig } from "../src/data/site";

const read = (file: string) => readFileSync(join("out", file), "utf8");
const homepage = read("index.html");
if (siteConfig.blogVisible) {
  assert.ok(homepage.includes('href="' + siteConfig.blogUrl + '/"'), "Missing external Blog link");
} else {
  assert.ok(!homepage.includes(siteConfig.blogUrl), "Hidden Blog or RSS link remains");
  assert.ok(!existsSync("out/images/blog"), "Legacy blog figures remain public");
}
assert.ok(homepage.includes("Publications"));
assert.ok(homepage.includes("jiz419@ucsd.edu"));
assert.match(read("robots.txt"), /sitemap\.xml/i);
assert.ok(existsSync("out/.nojekyll"));
if (siteConfig.blogVisible) assert.ok(read("feed.xml").includes(siteConfig.blogUrl + "/feed.xml"));
else {
  assert.doesNotMatch(read("feed.xml"), /<item>|pages\.dev/);
  assert.match(read("feed.xml"), /Blog temporarily unavailable/);
}
assert.ok(!read("sitemap.xml").includes("/blog/"), "Blog articles remain in personal sitemap");
const legacyRoutes = ["", ...readdirSync("public/blog", { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)];
assert.equal(legacyRoutes.length, 5);
for (const slug of legacyRoutes) {
  const page = read(join("blog", slug, "index.html"));
  const target = siteConfig.blogUrl + "/" + (slug ? slug + "/" : "");
  if (!siteConfig.blogVisible) {
    assert.match(page, /Blog temporarily unavailable/);
    assert.doesNotMatch(page, /http-equiv="refresh"|window\.location|pages\.dev|blog-prose/);
    continue;
  }
  assert.ok(page.includes('rel="canonical" href="' + target + '"'));
  assert.ok(page.includes('http-equiv="refresh" content="0;url=' + target + '"'));
  assert.ok(page.includes("window.location.search + window.location.hash"));
  assert.doesNotMatch(page, /class="katex"|blog-prose/);
}
for (const path of ["content", "docs", "src/lib/posts.ts", "src/app/blog"]) {
  assert.ok(!existsSync(path), "Blog writing still lives in personal repository: " + path);
}
console.log("Personal site and blog visibility verified: " + (siteConfig.blogVisible ? "public links and redirects" : "hidden links, feed, figures, and five legacy routes") + ".");
