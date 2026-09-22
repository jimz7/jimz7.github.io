import Image from "next/image";
import { Publication } from "@/data/publication";

export function PublicationEntry({ publication }: { publication: Publication }) {
  const venue = publication.conference.includes(publication.year)
    ? publication.conference
    : publication.conference + " · " + publication.year;

  return (
    <article className="publication-entry">
      {publication.imageUrl && (
        <Image src={publication.imageUrl} alt={publication.title}
          width={160} height={200} className="publication-image" />
      )}
      <div>
        <h3>{publication.title}</h3>
        <p className="publication-authors">{publication.authors}</p>
        <p className="publication-venue">
          {venue}
          {publication.award && <span className="publication-award">{publication.award}</span>}
        </p>
        <div className="publication-links font-sans">
          {publication.paperUrl && <a href={publication.paperUrl}>Paper</a>}
          {publication.codeUrl && <a href={publication.codeUrl}>Code</a>}
          {publication.bibtex && <a href={publication.bibtex}>BibTeX</a>}
        </div>
        {publication.tldr && <p className="publication-summary">{publication.tldr}</p>}
      </div>
    </article>
  );
}
