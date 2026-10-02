import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

// GitHub Pages cannot issue an HTTP redirect for RSS. Keep a migration notice
// at the old feed URL, with the new feed location for readers that support it.
export function GET() {
  const url = siteConfig.blogUrl;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
<channel>
<title>Jinze Zhao — Blog</title><link>${url}/</link>
<description>The blog has moved. Subscribe to ${url}/feed.xml for new posts.</description>
<atom:link href="${url}/feed.xml" rel="self" type="application/rss+xml"/>
<itunes:new-feed-url>${url}/feed.xml</itunes:new-feed-url>
<item><title>The blog has moved</title><link>${url}/</link>
<guid isPermaLink="false">jimz7-blog-migration-2026</guid>
<description>Please update your feed subscription to ${url}/feed.xml. All articles and future posts are available on the new blog.</description>
</item></channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
