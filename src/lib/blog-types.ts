export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
  externalUrl?: string;
}

export interface Post extends PostSummary {
  content: string;
}

export interface TocEntry {
  id: string;
  title: string;
  depth: number;
}

export function formatPostDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
