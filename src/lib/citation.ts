import type { PostSummary } from "./blog-types";

function escapeBibtex(value: string) {
  const replacements: Record<string, string> = {
    "\\": "\\textbackslash{}", "{": "\\{", "}": "\\}",
    "&": "\\&", "%": "\\%", "$": "\\$", "#": "\\#", "_": "\\_",
    "~": "\\textasciitilde{}", "^": "\\textasciicircum{}",
  };
  return value.replace(/[\\{}&%$#_~^]/g, (character) => replacements[character]);
}

export function createPostCitation(
  post: Pick<PostSummary, "slug" | "title" | "date">,
  config: { url: string; citationAuthor: string; citationKeyPrefix: string },
) {
  const published = new Date(post.date + "T00:00:00Z");
  const year = post.date.slice(0, 4);
  const month = published.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
  const date = published.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
  const url = new URL("/blog/" + post.slug + "/", config.url).href;
  const journal = new URL(config.url).hostname;
  const bibtex = [
    `@article{${config.citationKeyPrefix}${year}${post.slug},`,
    `  title = {{${escapeBibtex(post.title)}}},`,
    `  author = {${escapeBibtex(config.citationAuthor)}},`,
    `  journal = {${escapeBibtex(journal)}},`,
    `  year = {${year}},`,
    `  month = {${month}},`,
    `  url = {${url}}`,
    "}",
  ].join("\n");
  return { url, journal, date, bibtex };
}
