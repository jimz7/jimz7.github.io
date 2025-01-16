export interface Publication {
  year: string;
  conference: string;
  title: string;
  authors: string;
  paperUrl?: string;
  codeUrl?: string;
  bibtex?: string;
  tldr?: string;
  imageUrl?: string;
  award?: string;
}

export const publicationData: Publication[] = [
  // If you don't want to show publications, just make the array empty.
  {
    year: "2024",
    conference: "NeurIPS 2024 Workshop on Compositional Learning: Perspectives, Methods, and Paths Forward",
    title: "Enhancing Generalization in Sparse Mixture of Experts Models: The Case for Increased Expert Activation in Compositional Tasks",
    authors: "Jinze Zhao",
    paperUrl: "https://arxiv.org/abs/2410.13964",
    // codeUrl: "https://github.com/jsmith/scalable-causal-discovery",
    //bibtex: "https://arxiv.org/abs/2409.15476.bib",
    // tldr: "Using causal discovery to find the causal structure of high-dimensional time series data.",
    // imageUrl:
    //   "https://images.unsplash.com/photo-1561622539-dffbfc2008fd?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // award: "🏆 Best Paper Award",
    // if you have an image in public/images, you can use it like this:
    // imageUrl: "/images/publication-image.jpg"
  },
  {
    year: "2024",
    conference: "ICLR 2024 Workshop on Mathematical and Empirical Understanding of Foundation Models",
    title: "Generalization Error Analysis for Sparse Mixture-of-Experts: A Preliminary Study",
    authors: "Jinze Zhao, Peihao Wang, Zhangyang Wang",
    paperUrl: "https://arxiv.org/abs/2403.17404",
    // codeUrl: "https://github.com/jsmith/robust-causal-discovery",
  },
  {
    year: "2023",
    conference: "arXiv preprint",
    title: "Meta ControlNet: Enhancing Task Adaptation via Meta Learning",
    authors: "Junjie Yang, Jinze Zhao, Peihao Wang, Zhangyang Wang, Yingbin Liang",
    paperUrl: "https://arxiv.org/abs/2312.01255",
    codeUrl: "https://anonymous.4open.science/r/meta_controlnet-4E0C/README.md",
  },
  {
    year: "2023",
    conference: "arXiv preprint",
    title: "CrossEAI: Using Explainable AI to generate better bounding boxes for Chest X-ray images",
    authors: "Jinze Zhao",
    paperUrl: "https://arxiv.org/abs/2310.19835",
    // codeUrl: "https://anonymous.4open.science/r/meta_controlnet-4E0C/README.md",
  },
];
