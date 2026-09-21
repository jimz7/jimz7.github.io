import { EducationEntry } from "@/components/education-entry";
import { educationData } from "@/data/education";
import { PublicationEntry } from "@/components/publication-entry";
import { publicationData } from "@/data/publication";
import { ProfileSection } from "@/components/profile-section";
import { SiteNavigation } from "@/components/site-navigation";
import { aboutMe } from "@/data/aboutme";
import { NewsEntry } from "@/components/news-entry";
import { newsData } from "@/data/news";
import { ExperienceEntry } from "@/components/experience-entry";
import { experienceData } from "@/data/experience";
import { PortfolioEntry } from "@/components/portfolio-entry";
import { portfolioData } from "@/data/portfolio";
import { sectionOrder, Section } from "@/data/section-order";
import "./about.css";

export default function Home() {
  const sections = {
    [Section.News]: {
      title: "News",
      entries: newsData.map((entry, index) => <NewsEntry key={index} news={entry} />),
    },
    [Section.Education]: {
      title: "Education",
      entries: educationData.map((entry, index) => <EducationEntry key={index} education={entry} />),
    },
    [Section.Publication]: {
      title: "Publications",
      entries: publicationData.map((entry, index) => <PublicationEntry key={index} publication={entry} />),
    },
    [Section.Experience]: {
      title: "Experience",
      entries: experienceData.map((entry, index) => <ExperienceEntry key={index} experience={entry} />),
    },
    [Section.Portfolio]: {
      title: "Portfolio",
      entries: portfolioData.map((entry, index) => <PortfolioEntry key={index} portfolio={entry} />),
    },
  };

  return (
    <div className="about-shell">
      <div className="about-page">
        <SiteNavigation active="about" />
        <ProfileSection aboutMe={aboutMe} />
        {aboutMe.description && (
          <section aria-label="About me" className="about-introduction"
            dangerouslySetInnerHTML={{ __html: aboutMe.description }} />
        )}
        {sectionOrder.map((key) => {
          const section = sections[key];
          return section.entries.length > 0 && (
            <section key={key} className="about-section" aria-labelledby={key + "-heading"}>
              <h2 id={key + "-heading"}>{section.title}</h2>
              <div className="about-entries">{section.entries}</div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
