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

// Accepted conference and workshop papers from Google Scholar (2026-09-21).
// Years follow the accepted venues; research preprints live in content/blog/.
export const publicationData: Publication[] = [
  {
    "year": "2026",
    "conference": "Conference on Parsimony and Learning (CPAL 2026)",
    "title": "Sparse Mixture-of-Experts for Compositional Generalization: Empirical Evidence and Theoretical Foundations of Optimal Sparsity",
    "authors": "Jinze Zhao, Peihao Wang, Junjie Yang, Ruisi Cai, Gaowen Liu, Jayanth Srinivasa, Ramana Kompella, Yingbin Liang, Zhangyang Wang",
    "paperUrl": "https://arxiv.org/abs/2410.13964",
    "award": "Oral"
  },
  {
    "year": "2025",
    "conference": "Conference on Parsimony and Learning (CPAL 2025)",
    "title": "Meta ControlNet: Enhancing Task Adaptation via Meta Learning",
    "authors": "Junjie Yang*, Jinze Zhao*, Peihao Wang, Zhangyang Wang, Yingbin Liang",
    "paperUrl": "https://arxiv.org/abs/2312.01255",
    "codeUrl": "https://github.com/JunjieYang97/Meta-ControlNet"
  },
  {
    "year": "2024",
    "conference": "ICLR 2024 Workshop on Mathematical and Empirical Understanding of Foundation Models",
    "title": "Generalization Error Analysis for Sparse Mixture-of-Experts: A Preliminary Study",
    "authors": "Jinze Zhao, Peihao Wang, Zhangyang Wang",
    "paperUrl": "https://arxiv.org/abs/2403.17404"
  }
];
