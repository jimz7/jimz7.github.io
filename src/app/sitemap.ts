import type { MetadataRoute } from "next";
import { blogConfig } from "@/data/blog";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: blogConfig.url + "/" },
    { url: blogConfig.url + "/blog/" },
    ...getPosts(false).map((post) => ({
      url: blogConfig.url + "/blog/" + post.slug + "/",
      lastModified: post.updated ?? post.date,
    })),
  ];
}
