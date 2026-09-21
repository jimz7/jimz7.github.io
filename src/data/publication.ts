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

// Synced with https://scholar.google.com/citations?user=fIIlS-0AAAAJ on 2026-09-21.
// Years follow Scholar's publication-date field, which can precede the
// conference year. Entries are ordered newest first, with full author lists.
export const publicationData: Publication[] = [
  {
    "year": "2026",
    "conference": "arXiv preprint arXiv:2609.11795",
    "title": "Small-Ball Marginals Do Not Control Restricted Eigenvalues by Euclidean Gaussian Width",
    "authors": "Jinze Zhao",
    "paperUrl": "https://arxiv.org/abs/2609.11795"
  },
  {
    "year": "2026",
    "conference": "arXiv preprint arXiv:2609.11784",
    "title": "Constant Steps Are s-Composable: An Exact Interpolation Certificate for Gradient Descent",
    "authors": "Jinze Zhao",
    "paperUrl": "https://arxiv.org/abs/2609.11784"
  },
  {
    "year": "2026",
    "conference": "arXiv preprint arXiv:2608.10482",
    "title": "Predicting Diagonalizability of a Mean Matrix",
    "authors": "Jinze Zhao",
    "paperUrl": "https://arxiv.org/abs/2608.10482"
  },
  {
    "year": "2026",
    "conference": "arXiv preprint arXiv:2608.09450",
    "title": "From Approachability Residuals to Anytime-Valid Evidence: The Online Convex Geometry of Testing by Betting",
    "authors": "Jinze Zhao",
    "paperUrl": "https://arxiv.org/abs/2608.09450"
  },
  {
    "year": "2026",
    "conference": "arXiv:2607.29555",
    "title": "Pyramidal Width Can Increase Under Vertex Insertion",
    "authors": "Jinze Zhao",
    "paperUrl": "https://arxiv.org/abs/2607.29555"
  },
  {
    "year": "2025",
    "conference": "Conference on Parsimony and Learning (CPAL 2026)",
    "title": "Sparse Mixture-of-Experts for Compositional Generalization: Empirical Evidence and Theoretical Foundations of Optimal Sparsity",
    "authors": "Jinze Zhao, Peihao Wang, Junjie Yang, Ruisi Cai, Gaowen Liu, Jayanth Srinivasa, Ramana Kompella, Yingbin Liang, Zhangyang Wang",
    "paperUrl": "https://arxiv.org/abs/2410.13964",
    "award": "Oral"
  },
  {
    "year": "2024",
    "conference": "ICLR 2024 Workshop on Mathematical and Empirical Understanding of Foundation Models",
    "title": "Generalization Error Analysis for Sparse Mixture-of-Experts: A Preliminary Study",
    "authors": "Jinze Zhao, Peihao Wang, Zhangyang Wang",
    "paperUrl": "https://arxiv.org/abs/2403.17404"
  },
  {
    "year": "2023",
    "conference": "Conference on Parsimony and Learning (CPAL 2025)",
    "title": "Meta ControlNet: Enhancing Task Adaptation via Meta Learning",
    "authors": "Junjie Yang*, Jinze Zhao*, Peihao Wang, Zhangyang Wang, Yingbin Liang",
    "paperUrl": "https://arxiv.org/abs/2312.01255",
    "codeUrl": "https://github.com/JunjieYang97/Meta-ControlNet"
  },
  {
    "year": "2023",
    "conference": "arXiv preprint arXiv:2310.19835",
    "title": "CrossEAI: Using Explainable AI to generate better bounding boxes for Chest X-ray images",
    "authors": "Jinze Zhao",
    "paperUrl": "https://arxiv.org/abs/2310.19835"
  }
];
