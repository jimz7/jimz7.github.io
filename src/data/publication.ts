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
    year: "2025",
    conference: "Conference on Parsimony and Learning (CPAL)",
    title: "Meta ControlNet: Enhancing Task Adaptation via Meta Learning",
    authors: "Junjie Yang*, Jinze Zhao*, Peihao Wang, Zhangyang Wang, Yingbin Liang",
    paperUrl: "https://arxiv.org/abs/2312.01255",
    codeUrl: "https://anonymous.4open.science/r/meta_controlnet-4E0C/README.md",
  },
  {
    year: "2024",
    conference: "Under Review",
    title: "Sparse Mixture-of-Experts for Compositional Generalization: Empirical Evidence and Theoretical Foundations of Optimal Sparsity",
    authors: "Jinze Zhao*, Peihao Wang, Junjie Yang, Ruisi Cai, Gaowen Liu, Jayanth Srinivasa, Ramana Rao Kompella, Yingbin Liang, Zhangyang Wang",

  },
  {
    year: "2024",
    conference: "NeurIPS 2024 Workshop on Compositional Learning: Perspectives, Methods, and Paths Forward",
    title: "Enhancing Generalization in Sparse Mixture of Experts Models: The Case for Increased Expert Activation in Compositional Tasks",
    authors: "Jinze Zhao*",
    paperUrl: "https://arxiv.org/abs/2410.13964",
  },
  {
    year: "2024",
    conference: "Under Review",
    title: "HarmonyDreamer: Rectifying and Hamonizing Dynamic Objects in Backgrounds for 4D Video Generation",
    authors: "Yan Zheng, Jinze Zhao, Dejia Xu, Peihao Wang, Lemeng Wu, Jianan Shi, Zonglin Di, Zhangyang Wang",
    paperUrl: "https://harmonydreamer.github.io/web/",
 
  },
  {
    year: "2024",
    conference: "ICLR 2024 Workshop on Mathematical and Empirical Understanding of Foundation Models",
    title: "Generalization Error Analysis for Sparse Mixture-of-Experts: A Preliminary Study",
    authors: "Jinze Zhao*, Peihao Wang, Zhangyang Wang",
    paperUrl: "https://arxiv.org/abs/2403.17404",
  
  },

  {
    year: "2023",
    conference: "arXiv preprint",
    title: "CrossEAI: Using Explainable AI to generate better bounding boxes for Chest X-ray images",
    authors: "Jinze Zhao*",
    paperUrl: "https://arxiv.org/abs/2310.19835",
  
  },
];
