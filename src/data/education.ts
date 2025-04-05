export interface Education {
  year: string;
  institution: string;
  degree: string;
  advisor?: string;
  thesis?: string;
  thesisUrl?: string;
}

export const educationData: Education[] = [
  // If you don't want to show education, just make the array empty.
  // {
  //   year: "2023—Present",
  //   institution: "University of Texas at Austin",
  //   degree: "M.S. in Electrical and Computer Engineering",
  //   // advisor: "Prof. Sarah Johnson",
  // },
  // {
  //   year: "2019—2023",
  //   institution: "University of Texas at Austin",
  //   degree: "B.S. in Electrical and Computer Engineering and Mathematics",
  //   // thesis: "Algorithmic Approaches to Causal Discovery",
  //   // Optional links to thesis
  //   // thesisUrl: "https://dspace.mit.edu/handle/1721.1/149111"
  // },
];
