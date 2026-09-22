import { getPosts } from "@/lib/posts";
import { blogConfig } from "@/data/blog";
import { aboutMe } from "@/data/aboutme";
import { createFeed } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return new Response(createFeed(getPosts(false), {
    ...blogConfig, title: aboutMe.name + " — " + blogConfig.title,
  }), { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
