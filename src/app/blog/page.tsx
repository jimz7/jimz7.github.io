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
  const posts = getPosts();
  return (
    <div className="blog-index">
      <h1 className="sr-only">Blog</h1>
      <BlogIndex posts={posts} />
    </div>
  );
}
