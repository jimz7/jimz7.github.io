import Image from "next/image";
import { AboutMe } from "@/data/aboutme";

export function ProfileSection({ aboutMe }: { aboutMe: AboutMe }) {
  return (
    <header className="about-profile">
      {aboutMe.imageUrl && (
        <Image src={aboutMe.imageUrl} alt={aboutMe.name} width={120} height={150}
          priority className="about-photo" />
      )}
      <h1>{aboutMe.name}</h1>
      {aboutMe.altName && <p className="about-alt-name">{aboutMe.altName}</p>}
      <p className="about-affiliation">
        {aboutMe.title}
        {aboutMe.institution && <> · {aboutMe.institutionUrl
          ? <a href={aboutMe.institutionUrl}>{aboutMe.institution}</a>
          : aboutMe.institution}</>}
      </p>
      <div className="about-contact font-sans">
        <a href={"mailto:" + aboutMe.email}>{aboutMe.email}</a>
        {aboutMe.googleScholarUrl && <a href={aboutMe.googleScholarUrl}>Google Scholar</a>}
        {aboutMe.githubUsername && <a href={"https://github.com/" + aboutMe.githubUsername}>GitHub</a>}
        {aboutMe.linkedinUsername && <a href={"https://www.linkedin.com/in/" + aboutMe.linkedinUsername}>LinkedIn</a>}
        {aboutMe.twitterUsername && <a href={"https://twitter.com/" + aboutMe.twitterUsername}>Twitter</a>}
        {aboutMe.cvUrl && <a href={aboutMe.cvUrl}>CV</a>}
      </div>
    </header>
  );
}
