export interface AboutMe {
  name: string;
  title: string;
  institution: string;
  description: string;
  email: string;
  imageUrl?: string;
  blogUrl?: string;
  cvUrl?: string;
  googleScholarUrl?: string;
  twitterUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  funDescription?: string; // Gets placed in the left sidebar
  secretDescription?: string; // Gets placed in the bottom
  altName?: string;
  institutionUrl?: string;
}

export const aboutMe: AboutMe = {
  name: "Jinze Zhao",
  title: "M.S. student",
  institution: "University of Texas at Austin",
  // Note that links work in the description
  description:
    "I’m a graduate student pursuing M.S. in <a href='https://www.ece.utexas.edu/'>Electrical and Computer Engineering</a> at <a href='https://www.utexas.edu/'>the University of Texas at Austin</a>. Previously, I received B.S. in Electrical and Computer Engineering and B.S. in Mathematics (with Honors) from UT Austin.<br><br>My research focuses on Machine Learning, especially understanding the theoretical foundations and improving the generalization of models, such as diffusion models and mixture-of-experts models. Currently, I work as a Research Assistant at <a href='https://vita-group.github.io/group.html/'>VITA</a> lab.",
    // I'm a final-year <a href='https://www.stanford.edu'>PhD candidate</a> working at the intersection of causal inference and machine learning. My research focuses on developing robust, interpretable systems that can reason about cause and effect in complex environments.",
  email: "jz24694@utexas.edu",
  // imageUrl:
  //   "/images/profile.png",
  googleScholarUrl: "https://scholar.google.com/citations?user=fIIlS-0AAAAJ",
  githubUsername: "jimz7",
  linkedinUsername: "jinze-zhao",
  // twitterUsername: "janesmith",
  // blogUrl: "https://",
  // cvUrl: "https://",
  // institutionUrl: "https://www.stanford.edu",
  // altName: "",
  secretDescription: '"Not all who wander are lost." - Prophet Velen, Hearthstone',
};
