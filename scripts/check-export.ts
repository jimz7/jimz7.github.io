import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parsePost, visiblePosts } from "../src/lib/posts";
import { escapeXml } from "../src/lib/feed";

const read = (file: string) => readFileSync(join("out", file), "utf8");
const posts = readdirSync("content/blog").filter((file) => file.endsWith(".md"))
  .map((file) => parsePost(readFileSync(join("content/blog", file), "utf8"), file.slice(0, -3)));
const published = visiblePosts(posts);
const slugs = new Set(published.map((post) => post.slug));
const listing = read("blog/index.html");
const feed = read("feed.xml");
const sitemap = read("sitemap.xml");
assert.ok(existsSync("out/.nojekyll"));
assert.match(read("index.html"), /href="\/blog\/"/);
assert.match(read("robots.txt"), /sitemap\.xml/i);
for (const post of posts) {
  const route = "/blog/" + post.slug + "/";
  const filename = join("out", "blog", post.slug, "index.html");
  if (!slugs.has(post.slug)) {
    assert.ok(!existsSync(filename), "Unpublished page leaked: " + route);
    for (const output of [listing, feed, sitemap]) assert.ok(!output.includes(route), "Unpublished link leaked: " + route);
    continue;
  }
  const html = readFileSync(filename, "utf8");
  assert.ok(html.includes(escapeXml(post.title).replaceAll("&apos;", "&#x27;")) || html.includes(post.title), "Missing title: " + route);
  assert.ok(listing.includes(route), "Missing index link: " + route);
  assert.ok(feed.includes(route), "Missing RSS entry: " + route);
  assert.ok(sitemap.includes(route), "Missing sitemap entry: " + route);
  assert.doesNotMatch(html, /class="katex-error"/);
}
console.log("Static export verified: homepage, " + published.length + " posts, RSS, sitemap, and draft exclusion.");
