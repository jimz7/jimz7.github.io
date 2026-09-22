import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aboutMe } from "@/data/aboutme";
import { blogConfig } from "@/data/blog";
import { getPost, getPosts } from "@/lib/posts";
import { formatPostDate } from "@/lib/blog-types";
import { renderMarkdown } from "@/lib/markdown";
import { PostCitation } from "@/components/post-citation";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = getPosts().filter((post) => !post.externalUrl).map((post) => ({ slug: post.slug }));
  // Next 15 static export rejects an empty dynamic route list. This reserved,
  // invalid author slug renders notFound(), so a notebook with only drafts
  // or external links can still be built without exporting article pages.
  return params.length ? params : [{ slug: "__empty__" }];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const url = blogConfig.url + "/blog/" + post.slug + "/";
  return {
    title: post.title + " | " + aboutMe.name,
    description: post.description || undefined,
    authors: [{ name: aboutMe.name }],
    alternates: { canonical: url },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article", title: post.title, description: post.description || undefined, url,
      publishedTime: post.date, modifiedTime: post.updated ?? post.date,
      authors: [aboutMe.name], tags: post.tags,
    },
    twitter: { card: "summary", title: post.title, description: post.description || undefined },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { html } = await renderMarkdown(post.content, post.slug);
  const posts = getPosts().filter((entry) => !entry.externalUrl);
  const index = posts.findIndex((entry) => entry.slug === post.slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];
  return (
    <div className="blog-article-layout">
      <article className="blog-article">
        <Link href="/blog/" className="blog-back">← All notes</Link>
        <header className="blog-article-header">
          <h1>{post.title}</h1>
          <div className="blog-meta">
            <span>{aboutMe.name}</span><span>·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time><span>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          {post.updated && <p className="blog-meta">Updated {formatPostDate(post.updated)}</p>}
          {post.draft && <p className="blog-draft">Draft preview — this post is excluded from the published site.</p>}
          {post.date > new Date().toISOString().slice(0, 10) && <p className="blog-draft">Future-dated preview — publish with a new build on or after {post.date}.</p>}
        </header>
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
        <PostCitation post={post} />
        <nav className="blog-post-navigation" aria-label="More posts">
          {newer && <Link href={"/blog/" + newer.slug + "/"}><span>← Newer note</span>{newer.title}</Link>}
          {older && <Link href={"/blog/" + older.slug + "/"}><span>Older note →</span>{older.title}</Link>}
        </nav>
      </article>
    </div>
  );
}
