"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPostDate, type PostSummary } from "@/lib/blog-types";

export function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  const words = query.toLocaleLowerCase().trim().split(/\s+/u).filter(Boolean);
  const filtered = posts.filter((post) => {
    const haystack = [post.title, post.description, ...post.tags, post.searchText].join(" ").toLocaleLowerCase();
    return (!selectedTag || post.tags.includes(selectedTag)) && words.every((word) => haystack.includes(word));
  });
  return (
    <div>
      <div className="blog-filters">
        <label htmlFor="blog-search" className="blog-eyebrow">Find a note</label>
        <input id="blog-search" type="search" placeholder="Search topics, titles, or equations…"
          value={query} onChange={(event) => setQuery(event.target.value)} />
        {tags.length > 0 && (
          <div className="blog-tags" aria-label="Filter by topic">
            <button type="button" aria-pressed={!selectedTag} onClick={() => setSelectedTag("")}>All notes</button>
            {tags.map((tag) => (
              <button type="button" key={tag} aria-pressed={selectedTag === tag}
                onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}>{tag}</button>
            ))}
          </div>
        )}
      </div>
      <p className="blog-result-count" role="status">{filtered.length} {filtered.length === 1 ? "note" : "notes"}</p>
      <div className="blog-post-list">
        {filtered.map((post) => (
          <article key={post.slug} className="blog-post-card">
            <div className="blog-meta">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span>·</span><span>{post.readingMinutes} min read</span>
              {post.draft && <span className="blog-draft">Draft preview</span>}
            </div>
            <h2><Link href={"/blog/" + post.slug + "/"}>{post.title}<span aria-hidden="true"> ↗</span></Link></h2>
            <p>{post.description}</p>
            <div className="blog-post-topics">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="blog-empty">
            <h2>{posts.length ? "No matching notes" : "Notes are on their way."}</h2>
            <p>{posts.length ? "Try another search or choose a different topic." : "A space for working through ideas, one post at a time."}</p>
            {(query || selectedTag) && <button type="button" onClick={() => { setQuery(""); setSelectedTag(""); }}>Clear filters</button>}
          </div>
        )}
      </div>
    </div>
  );
}
