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
  title: "PhD student",
  institution: "UC San Diego",
  description:
  "I’m a PhD student in the Department of Electrical and Computer Engineering at UC San Diego. I earned my M.S. in Electrical and Computer Engineering at the University of Texas at Austin, where I also received a B.S. in Electrical and Computer Engineering (with Honors) and a B.S. in Mathematics.<br><br>My research focuses on machine learning, especially understanding the theoretical foundations and improving the generalization of models, such as diffusion models and mixture-of-experts models.",
  email: "jiz419@ucsd.edu",
  // imageUrl:
  //   "/images/profile.png",
  googleScholarUrl: "https://scholar.google.com/citations?user=fIIlS-0AAAAJ",
  githubUsername: "jimz7",
  linkedinUsername: "jinze-zhao",
  // twitterUsername: "janesmith",
  blogUrl: "/blog/",
  // cvUrl: "https://",
  // institutionUrl: "https://www.stanford.edu",
  // altName: "",
  // secretDescription: '"Not all who wander are lost." - Prophet Velen, Hearthstone',
};
