import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { renderMarkdown } from "../src/lib/markdown";
import { parsePost, visiblePosts, getPosts } from "../src/lib/posts";
import { createFeed } from "../src/lib/feed";

const source = '---\ntitle: "An example"\ndescription: "A summary"\ndate: "2026-01-02"\ntags: ["Math"]\n---\n## Note\n\nA post.';

test("renders inline math, aligned equations, matrices, tags, macros, and MathML", async () => {
  const { html } = await renderMarkdown(String.raw`Inline $\vect{x} \in \R^d$ and $\E[x]$.

$$
\begin{aligned}
f(x) &= \norm{x}^2 \\
g(x) &= \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}
\end{aligned}
\tag{1}
$$`);
  assert.match(html, /class="katex"/);
  assert.match(html, /class="katex-display"/);
  assert.match(html, /<math /);
  assert.match(html, /class="tag"/);
  assert.doesNotMatch(html, /katex-error/);
});

test("invalid math fails with the post name", async () => {
  await assert.rejects(renderMarkdown("$\\notARealCommand{x}$", "broken-post"), /broken-post: invalid LaTeX/);
});

test("macros defined by one post cannot affect another post", async () => {
  await renderMarkdown(String.raw`$\gdef\temporarymacro{123}\temporarymacro$`);
  await assert.rejects(renderMarkdown(String.raw`$\temporarymacro$`), /invalid LaTeX/);
});

test("code examples and escaped currency are not typeset as math", async () => {
  const { html } = await renderMarkdown("Costs \\$5 and \\$10.\n\n`$x$`\n\n```latex\n$$ x^2 $$\n```");
  assert.doesNotMatch(html, /class="katex"/);
  assert.match(html, /Costs \$5 and \$10/);
  assert.match(html, /<code>\$x\$<\/code>/);
});

test("duplicate headings have distinct anchors that match the table of contents", async () => {
  const { html, toc } = await renderMarkdown("## A result\n\n### Details\n\n## A result");
  assert.deepEqual(toc.map((entry) => entry.id), ["section-a-result", "section-details", "section-a-result-1"]);
  for (const entry of toc) assert.ok(html.includes('id="' + entry.id + '"'));
});

test("supports footnote backlinks, tables, highlighted code, and image alt text", async () => {
  const { html } = await renderMarkdown("A note.[^one]\n\n[^one]: Reference.\n\n| x | y |\n| - | - |\n| $x$ | 2 |\n\n```python\nimport numpy\n```\n\n![Diagram](/images/blog/linear-model.svg)");
  assert.match(html, /data-footnote-backref/);
  assert.match(html, /<table>/);
  assert.match(html, /hljs-keyword/);
  assert.match(html, /alt="Diagram"/);
});

test("raw HTML is not executed or passed through", async () => {
  const { html } = await renderMarkdown("<script>alert('bad')</script>\n\n## Safe content");
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /Safe content/);
});

test("metadata validation rejects mistakes instead of publishing them", () => {
  assert.equal(parsePost(source, "my-post").date, "2026-01-02");
  assert.throws(() => parsePost(source.replace('"2026-01-02"', '"2026-02-30"'), "bad"), /valid calendar date/);
  assert.throws(() => parsePost(source.replace('tags: ["Math"]', 'tags: "Math"'), "bad"), /tags must/);
  assert.throws(() => parsePost(source.replace('tags: ["Math"]', 'draft: "false"'), "bad"), /draft must/);
  assert.throws(() => parsePost(source.replace('title: "An example"', 'title: ""'), "bad"), /title must/);
  assert.throws(() => parsePost(source, "../outside"), /filename/);
});

test("drafts and future dates are excluded; published notes are sorted newest first", () => {
  const post = parsePost(source, "old");
  const posts = [
    { ...post, slug: "draft", draft: true },
    { ...post, slug: "future", date: "2099-01-01" },
    { ...post, slug: "new", date: "2026-01-03" },
    { ...post, slug: "draft-link", externalUrl: "https://arxiv.org/abs/2609.11784", draft: true },
    { ...post, slug: "future-link", externalUrl: "https://arxiv.org/abs/2609.11795", date: "2099-01-01" },
    post,
  ];
  assert.deepEqual(visiblePosts(posts, false, "2026-01-03").map((entry) => entry.slug), ["new", "old"]);
  assert.equal(visiblePosts(posts, true).length, 6);
  assert.equal(visiblePosts([], false).length, 0);
});

test("paper links need no summary or body and reject invalid destinations", () => {
  const link = '---\ntitle: "A paper"\ndate: "2026-01-02"\nexternalUrl: "https://arxiv.org/abs/2609.11784"\n---\n';
  const post = parsePost(link, "paper");
  assert.equal(post.externalUrl, "https://arxiv.org/abs/2609.11784");
  assert.equal(post.description, "");
  assert.equal(post.content.trim(), "");
  assert.equal(post.readingMinutes, 0);
  for (const url of ["javascript:alert(1)", "data:text/html,test", "/relative", "https://user:password@example.com"]) {
    assert.throws(() => parsePost(link.replace(post.externalUrl, url), "paper"), /externalUrl must/);
  }
  assert.throws(() => parsePost(link + "Unwanted summary.", "paper"), /must not include a post body/);
  assert.throws(() => parsePost(source.replace("## Note\n\nA post.", ""), "article"), /body is empty/);
  assert.throws(() => parsePost(source.replace('description: "A summary"\n', ""), "article"), /description must/);
});

test("mixed RSS entries link to papers directly and keep normal article permalinks", () => {
  const article = parsePost(source, "article");
  const paper = parsePost('---\ntitle: "A paper"\ndate: "2026-01-02"\nexternalUrl: "https://example.org/paper?a=1&b=2"\n---', "paper");
  const xml = createFeed([article, paper], { url: "https://example.com", title: "Notes", description: "Research" });
  assert.match(xml, /<link>https:\/\/example.com\/blog\/article\/<\/link>/);
  assert.match(xml, /<link>https:\/\/example.org\/paper\?a=1&amp;b=2<\/link>/);
  assert.match(xml, /<guid isPermaLink="true">https:\/\/example.org\/paper\?a=1&amp;b=2<\/guid>/);
  assert.doesNotMatch(xml, /\/blog\/paper\//);
  assert.doesNotMatch(xml, /<description><\/description>/);
});

test("RSS escapes text and uses stable permalinks", () => {
  const post = { ...parsePost(source, "example"), title: 'A & B < C "D"', description: "x < y & z" };
  const xml = createFeed([post], { url: "https://example.com", title: "Notes", description: "Research" });
  assert.match(xml, /A &amp; B &lt; C &quot;D&quot;/);
  assert.match(xml, /<guid isPermaLink="true">https:\/\/example.com\/blog\/example\//);
  assert.match(xml, /Fri, 02 Jan 2026 00:00:00 GMT/);
});

test("the new-post command creates a valid draft and refuses overwrites and traversal", () => {
  const cwd = mkdtempSync(join(tmpdir(), "blog-test-"));
  const script = resolve("scripts/new-post.mjs");
  try {
    assert.equal(spawnSync(process.execPath, [script, "first-note"], { cwd }).status, 0);
    const filename = join(cwd, "content/blog/first-note.md");
    const original = readFileSync(filename, "utf8");
    assert.equal(parsePost(original, "first-note").draft, true);
    assert.equal(spawnSync(process.execPath, [script, "first-note"], { cwd }).status, 1);
    assert.equal(readFileSync(filename, "utf8"), original);
    assert.equal(spawnSync(process.execPath, [script, "../outside"], { cwd }).status, 1);
  } finally {
    // mkdtempSync created this dedicated directory; no user files are included.
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("every repository post, including drafts, has valid Markdown and LaTeX", async () => {
  for (const post of getPosts(true)) await renderMarkdown(post.content, post.slug);
});
