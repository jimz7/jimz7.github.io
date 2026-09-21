import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "./blog-types";

const postsDirectory = path.join(process.cwd(), "content", "blog");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parsePost(source: string, slug: string): Post {
  const fail = (message: string): never => {
    throw new Error("content/blog/" + slug + ".md: " + message);
  };
  if (!slugPattern.test(slug)) fail("Use lowercase words separated by hyphens for the filename.");
  const { data, content } = matter(source);
  const requiredText = (key: string): string => {
    const value: unknown = data[key];
    if (typeof value !== "string" || !value.trim()) return fail(key + " must be a non-empty string.");
    return value.trim();
  };
  const dateValue = (key: string): string => {
    const raw: unknown = data[key];
    const value = raw instanceof Date ? raw.toISOString().slice(0, 10) : raw;
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return fail(key + " must be a YYYY-MM-DD date.");
    }
    const timestamp = Date.parse(value + "T00:00:00Z");
    if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== value) {
      return fail(key + " is not a valid calendar date.");
    }
    return value;
  };
  const title = requiredText("title");
  const description = requiredText("description");
  const date = dateValue("date");
  const updated = data.updated === undefined ? undefined : dateValue("updated");
  if (updated && updated < date) fail("updated must be on or after date.");
  if (data.draft !== undefined && typeof data.draft !== "boolean") fail("draft must be true or false, without quotes.");
  const tags: unknown = data.tags ?? [];
  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string" || !tag.trim())) {
    return fail("tags must be a list of non-empty strings.");
  }
  if (!content.trim()) fail("The post body is empty.");
  return {
    slug, title, description, date, updated,
    tags: [...new Set((tags as string[]).map((tag) => tag.trim()))],
    draft: data.draft === true,
    readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/u).length / 200)),
    content,
  };
}

export function visiblePosts(posts: Post[], includeUnpublished = false, today = new Date().toISOString().slice(0, 10)) {
  return posts
    .filter((post) => includeUnpublished || (!post.draft && post.date <= today))
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getPosts(includeUnpublished = process.env.NODE_ENV === "development"): Post[] {
  const posts = fs.readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parsePost(fs.readFileSync(path.join(postsDirectory, file), "utf8"), file.slice(0, -3)));
  // Even an accidental caller opt-in cannot export unpublished content in production.
  return visiblePosts(posts, includeUnpublished && process.env.NODE_ENV !== "production");
}

export function getPost(slug: string) {
  // Look up known files rather than joining an untrusted slug to a filesystem path.
  return getPosts().find((post) => post.slug === slug);
}
