export const blogConfig = {
  title: "Blog",
  description: "Notes on machine learning, mathematics, and ideas worth understanding.",
  url: "https://jimz7.github.io",
};

// KaTeX macros shared by every post. Use double backslashes in this TypeScript file.
export const mathMacros: Record<string, string> = {
  "\\R": "\\mathbb{R}",
  "\\N": "\\mathbb{N}",
  "\\E": "\\mathbb{E}",
  "\\vect": "\\boldsymbol{#1}",
  "\\norm": "\\left\\lVert#1\\right\\rVert",
};
