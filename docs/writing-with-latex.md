---
title: "Writing research notes with LaTeX"
date: "2026-09-21"
draft: false
---

This is a sample post and a writing reference for this notebook. Posts are plain
Markdown files, with LaTeX for the mathematics. This page demonstrates the
pieces needed for a technical note: a derivation, a small implementation,
and references that readers can follow.

## Mathematics in the margin

Inline mathematics fits naturally into a sentence. If $\vect{x} \in \R^d$,
then its squared Euclidean norm is $\norm{\vect{x}}_2^2 = \sum_{i=1}^{d} x_i^2$.
An expectation is just as simple: $\E_{x \sim p}[f(x)]$.

Write inline expressions between single dollar signs:

```latex
If $\vect{x} \in \R^d$, then $\norm{\vect{x}}_2^2 = \sum_{i=1}^{d} x_i^2$.
```

Use double dollar signs on their own lines for a displayed equation.
Regular Markdown emphasis and underscores do not interfere with math.

## A small derivation

For a linear model with design matrix $X \in \R^{n \times d}$ and targets
$\vect{y} \in \R^n$, consider the regularized least-squares objective:

$$
\mathcal{L}(\vect{w}) =
\frac{1}{2n}\norm{X\vect{w} - \vect{y}}_2^2
+ \frac{\lambda}{2}\norm{\vect{w}}_2^2.
\tag{1}
$$

The `aligned` environment keeps a derivation readable:

$$
\begin{aligned}
\nabla_{\vect{w}} \mathcal{L}
  &= \frac{1}{n}X^\top(X\vect{w}-\vect{y}) + \lambda\vect{w} \\
  &= \left(\frac{1}{n}X^\top X+\lambda I\right)\vect{w}
     - \frac{1}{n}X^\top\vect{y}.
\end{aligned}
$$

When $\lambda > 0$, setting the gradient to zero gives
$\vect{w}^{\star} = (X^\top X + n\lambda I)^{-1}X^\top\vect{y}$.

### Numbering and linking

Use `\tag{1}` to label a displayed equation. Refer back to
[Equation (1)](#section-a-small-derivation) with an ordinary Markdown link
to its section. Section links use a `section-` prefix and lowercase, hyphenated
headings, so `## A small derivation` becomes `#section-a-small-derivation`.

```latex
$$
\mathcal{L}(w) = \frac{1}{2n}\|Xw-y\|_2^2
              + \frac{\lambda}{2}\|w\|_2^2.
\tag{1}
$$
```

### Matrices and cases

Matrices, subscripts, superscripts, Greek letters, and piecewise functions
use familiar LaTeX notation:

$$
A = \begin{bmatrix}
1 & \rho \\
\rho & 1
\end{bmatrix},
\qquad
\operatorname{ReLU}(x) =
\begin{cases}
x, & x > 0, \\
0, & x \leq 0.
\end{cases}
$$

The shared macros `\R`, `\N`, `\E`, `\vect{...}`, and `\norm{...}` keep
notation consistent. You can add more in `src/data/blog.ts`.

> Formulas are rendered when the site is built. Their fonts are served with
> the site, and the equations include MathML for assistive technology.

## From equation to code

Fenced code blocks can specify a language for syntax highlighting:

```python
import numpy as np

def ridge_solution(X, y, regularization=0.1):
    n, d = X.shape
    system = X.T @ X + n * regularization * np.eye(d)
    return np.linalg.solve(system, X.T @ y)
```

The expression $\lambda > 0$ makes the system positive definite.
Solving the linear system avoids explicitly forming its inverse.[^solve]

| Symbol | Meaning | Shape |
| :--- | :--- | :--- |
| $X$ | Design matrix | $n \times d$ |
| $\vect{y}$ | Targets | $n$ |
| $\vect{w}$ | Model parameters | $d$ |
| $\lambda$ | Regularization strength | Scalar |

## Figures and references

Put figures in `public/images/blog/` and embed them with Markdown:

![A schematic of a linear model: features x feed into a weighted sum and produce prediction y.](/images/blog/linear-model.svg)
*Figure 1. A schematic of a linear model.*

```markdown
![Description of the figure](/images/blog/linear-model.svg)
*Figure 1. A short caption.*
```

Footnotes are useful for asides. For citations, use ordinary links to a
references section, such as [KaTeX documentation](#section-references).
The same syntax works for linking papers, code, and related posts.

## Writing your own post

Run `npm run new-post -- my-first-note` to create a draft. Edit the title,
date, and Markdown body in `content/blog/my-first-note.md`.
Start `npm run dev` to preview it at `/blog/my-first-note/`.

When the post is ready, change `draft: true` to `draft: false` and use a date
on or before the publishing day. Production builds exclude drafts and
future-dated posts from pages, the blog list, RSS, and the sitemap.

Each article automatically ends with a formatted citation and a BibTeX entry.

This notebook uses KaTeX's supported math syntax. Use `$...$` and `$$...$$`;
whole `.tex` documents, arbitrary packages, automatic `\label` / `\ref`
numbering, and BibTeX processing are not part of this Markdown workflow.
The repository's README has the complete authoring guide.

## References

1. [KaTeX: supported functions](https://katex.org/docs/supported.html).
2. [GitHub: basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).
3. [NumPy: `numpy.linalg.solve`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.solve.html).

[^solve]: For real applications, choose a solver appropriate to the structure
    and conditioning of the matrix.
