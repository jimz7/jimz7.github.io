# Jinze Zhao — personal website and research notes

An academic homepage and a Markdown + LaTeX blog, built with Next.js and exported
as a static website for [GitHub Pages](https://jimz7.github.io/).

The homepage data stays in `src/data/`. Blog posts live in `content/blog/`;
no React code is needed to write a post.

## Quick start

Use Node.js 22 or newer (the GitHub Actions workflow uses Node 22).

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000) for the homepage or
[localhost:3000/blog/](http://localhost:3000/blog/) for the notebook.

## Write a post

```bash
npm run new-post -- my-first-note
```

This creates `content/blog/my-first-note.md` as a draft. It refuses to
overwrite an existing file. The filename becomes the permanent URL:
`/blog/my-first-note/`. Keep the filename unchanged when editing the title.

Each file starts with YAML front matter:

```yaml
---
title: "Understanding a model"
description: "A short summary for the blog index, search engines, and RSS."
date: "2026-09-21"
updated: "2026-09-22" # Optional; on or after date
tags: ["Machine learning", "Theory"]
draft: true
---
```

- `title`, `description`, and `date` are required.
- Dates use `YYYY-MM-DD`. Quote them as shown.
- `tags` is an optional list of strings; `updated` is optional.
- `draft` is an optional boolean (defaults to `false`). New posts start as drafts.
- Drafts and future-dated posts appear in `npm run dev` with a preview notice.
- Production excludes them from article pages, the index/search, RSS, and sitemap.
- To publish, set `draft: false` and a date on or before today, then merge into `main`.
- Future dates use UTC. They do **not** schedule a build: push again or manually
  run the GitHub Actions workflow on/after that date.
- Draft Markdown committed to this public repository is visible on GitHub even
  though it is excluded from the published website.

Use `##` for sections and `###` for subsections. These generate the table of
contents and stable heading IDs. The page title comes from front matter, so a
second `#` heading is unnecessary. Heading links have a `section-` prefix, e.g.
`## A small derivation` becomes `#section-a-small-derivation`.
Duplicate headings get `-1`, `-2`, and so on.

The included [sample post](content/blog/writing-with-latex.md) is both an
authoring reference and a working rendering example. You can remove it or
set `draft: true` when you have your own posts.

## LaTeX mathematics

Math is rendered at build time with `remark-math` and `rehype-katex`.
KaTeX HTML, MathML, CSS, and fonts are included in the exported site.
Equations work without browser JavaScript or a runtime CDN request.

Inline math:

```markdown
For $x \in \R^d$, let $f(x) = \norm{x}_2^2$.
```

Displayed and aligned math (put each `$$` delimiter on its own line):

```latex
$$
\begin{aligned}
\mathcal{L}(\theta)
  &= \E_{x \sim p}[\ell(\theta; x)] \\
\nabla_\theta \mathcal{L}(\theta)
  &= \E_{x \sim p}[\nabla_\theta \ell(\theta; x)].
\end{aligned}
\tag{1}
$$
```

Matrices and cases:

```latex
$$
A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix},
\qquad
f(x) = \begin{cases} x^2, & x \ge 0 \\ 0, & x < 0. \end{cases}
$$
```

Shared macros are in `src/data/blog.ts`:

| Macro | Expansion |
| --- | --- |
| `\R` | `\mathbb{R}` |
| `\N` | `\mathbb{N}` |
| `\E` | `\mathbb{E}` |
| `\vect{x}` | `\boldsymbol{x}` |
| `\norm{x}` | `\left\lVert x\right\rVert` |

Use doubled backslashes when defining macros in TypeScript. Math in Markdown
uses ordinary single backslashes. Macros defined within a post do not leak into
other posts.

Use `\tag{1}` for manual equation numbers and link to the containing section
with `[Equation (1)](#section-a-small-derivation)`. Escape currency dollars
as `\$5` so that two prices are not mistaken for inline math. Code spans and
fenced code blocks are never typeset.

This supports [KaTeX's LaTeX math functions](https://katex.org/docs/supported.html),
including aligned equations, matrices, cases, sums, integrals, and custom macros.
It is a Markdown blog, not a full TeX document compiler: arbitrary
`\usepackage` commands, `.tex` document imports, automatic `\label` / `\ref` /
`\eqref` numbering, and BibTeX processing are not supported. Use dollar
delimiters rather than `\(...\)` or `\[...\]`.

Unsupported or malformed math fails tests/builds with the post name, so broken
equations do not silently reach production.

## Code, figures, tables, and references

Specify a language after a code fence (`python`, `typescript`, `bash`,
`latex`, etc.) for syntax highlighting. Unknown languages remain readable as
plain code.

Store images under `public/images/blog/` and use an absolute site path:

```markdown
![Meaningful description for readers](/images/blog/my-figure.png)
*Figure 1. A short caption.*
```

Use Markdown tables and footnotes:

```markdown
| Quantity | Definition |
| --- | --- |
| Norm | $\norm{x}_2$ |

A useful detail.[^detail]

[^detail]: The supporting explanation.
```

For references, add a `## References` section with numbered links to papers,
or cite via Markdown footnotes. Raw HTML and executable MDX/JSX are deliberately
not enabled. Use Markdown images, links, code fences, and math instead.

Long equations, code blocks, and tables scroll horizontally on narrow screens.

## Site settings

- `src/data/aboutme.ts`: profile information and homepage Blog link.
- `src/data/blog.ts`: notebook description, canonical site URL, shared math macros.
- `src/data/section-order.ts` and the other `src/data/` files: academic homepage.
- `src/app/about.css`: the minimal, single-column About page.
- `src/components/site-navigation.tsx`: shared About / Blog navigation.
- `src/app/blog/blog.css`: notebook typography, colors, and responsive layout.

`/blog/` lists posts newest first and searches titles, descriptions, tags, and
post text. Tag buttons filter the list. Reading time, author, dates, a table of
contents, and older/newer navigation are generated automatically.
`/feed.xml` is a summary RSS feed. `/sitemap.xml` and `/robots.txt` are generated.

## Validate and publish

```bash
npm run lint
npm test
npm run build
npm run check:export
```

The build also checks TypeScript. `npm run typecheck` can run that check
separately. Unit tests cover math, escaped dollars, code, heading IDs, footnotes,
metadata, draft filtering, RSS escaping, and the draft creation command.

`npm run build` writes a complete static site to `out/`. Preview the actual
export with any static file server, for example:

```bash
python -m http.server 3000 --directory out
```

This project uses static export, so `next start` is not used.

The existing GitHub Pages workflow now validates pull requests as well as
`main`. Only successful builds of `main` deploy. In GitHub repository
**Settings → Pages**, the source should be **GitHub Actions**.
Merge a reviewed pull request into `main` to publish; the Actions tab shows
the build/deployment status.

`next.config.ts` explicitly enables static export, trailing slashes, and
unoptimized images. Local builds and GitHub Actions therefore generate the same
route structure, including direct article URLs. No database or Node server is
required in production.

This repository targets the root site `https://jimz7.github.io/`. For a custom
domain, update `blogConfig.url` and configure GitHub Pages. Hosting under a
repository subpath would additionally require a Next.js `basePath` and adapting
the root-relative image/feed links.

## Credits

The academic homepage is based on
[tovacinni/research-website-template](https://github.com/tovacinni/research-website-template).
The notebook's focus on readable technical notes was inspired by
[Lilian Weng's Lil'Log](https://lilianweng.github.io/); its content and theme are
not copied. See [LICENSE](LICENSE).
