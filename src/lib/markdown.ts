import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import GithubSlugger from "github-slugger";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Root } from "mdast";
import { mathMacros } from "../data/blog";
import type { TocEntry } from "./blog-types";

export async function renderMarkdown(content: string, sourceName = "post") {
  const toc: TocEntry[] = [];
  const slugger = new GithubSlugger();
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(() => (tree: Root) => {
      visit(tree, (node) => {
        if (node.type === "heading") {
          const last = node.children.at(-1);
          const explicit = last?.type === "text" ? last.value.match(/\s+\{#([a-z][a-z0-9-]*)\}$/) : null;
          if (explicit && last?.type === "text") last.value = last.value.slice(0, explicit.index).trimEnd();
          const title = toString(node);
          const id = "section-" + slugger.slug(explicit?.[1] ?? title);
          node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
          if (node.depth >= 2 && node.depth <= 3) toc.push({ id, title, depth: node.depth });
        } else if (node.type === "paragraph" && node.children.length === 1 && node.children[0].type === "text") {
          const anchor = node.children[0].value.match(/^\{#([a-z][a-z0-9-]*)\}$/);
          if (!anchor) return;
          const id = "section-" + slugger.slug(anchor[1]);
          node.data = { hName: "span", hProperties: { id, className: ["blog-anchor"] } };
          node.children = [];
        }
      });
    })
    // Raw HTML and executable MDX are intentionally not enabled.
    .use(remarkRehype)
    .use(rehypeKatex, {
      output: "htmlAndMathml",
      trust: false,
      strict: "error",
      // Each post gets its own copy: \gdef must not leak into other posts.
      macros: { ...mathMacros },
    })
    .use(rehypeHighlight, { detect: false, ignoreMissing: true })
    .use(rehypeStringify)
    .process(content);

  // rehype-katex reports parse failures as messages. Make them fail CI instead
  // of silently publishing broken formulas.
  const mathErrors = result.messages.filter((message) => message.source === "rehype-katex");
  if (mathErrors.length) {
    throw new Error(sourceName + ": invalid LaTeX: " + mathErrors.map((message) => message.reason).join("; "));
  }
  return { html: String(result), toc };
}
