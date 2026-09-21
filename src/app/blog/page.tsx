import type { Metadata } from "next";
import { blogConfig } from "@/data/blog";
import { aboutMe } from "@/data/aboutme";
import { getPosts } from "@/lib/posts";
import { BlogIndex } from "@/components/blog-index";

export const metadata: Metadata = {
  title: blogConfig.title + " | " + aboutMe.name,
  description: blogConfig.description,
  alternates: { canonical: blogConfig.url + "/blog/", types: { "application/rss+xml": blogConfig.url + "/feed.xml" } },
};

export default function BlogPage() {
  const posts = getPosts().map((post) => ({
    slug: post.slug, title: post.title, description: post.description,
    date: post.date, updated: post.updated, tags: post.tags, draft: post.draft,
    readingMinutes: post.readingMinutes, searchText: post.searchText,
  }));
  return (
    <div className="blog-index">
      <header className="blog-intro">
        <p className="blog-eyebrow">THE NOTEBOOK</p>
        <h1>Research notes<span>.</span></h1>
        <p>{blogConfig.description}</p>
      </header>
      <BlogIndex posts={posts} />
    </div>
  );
}
