import Link from "next/link";
import { formatPostDate, type PostSummary } from "@/lib/blog-types";

export function BlogIndex({ posts }: { posts: PostSummary[] }) {
  return (
    <div className="blog-post-list">
      {posts.map((post) => (
        <article key={post.slug} className="blog-post-card">
          <div className="blog-meta">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {!post.externalUrl && <><span>·</span><span>{post.readingMinutes} min read</span></>}
            {post.draft && <span className="blog-draft">Draft preview</span>}
          </div>
          <h2>{post.externalUrl
            ? <a href={post.externalUrl}>{post.title}</a>
            : <Link href={"/blog/" + post.slug + "/"}>{post.title}</Link>}</h2>
          {!post.externalUrl && post.description && <p>{post.description}</p>}
        </article>
      ))}
      {posts.length === 0 && <p className="blog-empty">No posts yet.</p>}
    </div>
  );
}
