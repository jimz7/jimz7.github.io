import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const [slug, ...extra] = process.argv.slice(2);
if (!slug || extra.length || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: npm run new-post -- my-post-title (lowercase words and hyphens)");
  process.exit(1);
}
const directory = resolve("content/blog");
mkdirSync(directory, { recursive: true });
const filename = resolve(directory, slug + ".md");
const title = slug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
const source = [
  "---",
  "title: " + JSON.stringify(title),
  'description: "A one-sentence summary of this note."',
  "date: " + JSON.stringify(new Date().toISOString().slice(0, 10)),
  'tags: ["Machine learning"]',
  "draft: true",
  "---",
  "",
  "Start with the question or idea you want to explore.",
  "",
  "## The main idea",
  "",
  "Inline math: $x \\in \\R^d$.",
  "",
  "$$",
  "\\mathcal{L}(\\theta) = \\E_{x \\sim p}[\\ell(\\theta; x)].",
  "$$",
  "",
  "## References",
  "",
  "1. [Paper title](https://arxiv.org/)",
  "",
].join("\n");
try {
  writeFileSync(filename, source, { flag: "wx" });
  console.log("Created " + filename + "\nPreview with npm run dev at /blog/" + slug + "/");
} catch (error) {
  if (error.code === "EEXIST") {
    console.error("A post already exists at " + filename + ". Choose a new slug.");
    process.exit(1);
  }
  throw error;
}
