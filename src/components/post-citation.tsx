import { blogConfig } from "@/data/blog";
import type { PostSummary } from "@/lib/blog-types";
import { createPostCitation } from "@/lib/citation";

export function PostCitation({ post }: { post: PostSummary }) {
  const citation = createPostCitation(post, blogConfig);
  return (
    <section className="blog-prose blog-citation" aria-labelledby="post-citation">
      <h2 id="post-citation">Citation</h2>
      <p>Please cite this work as:</p>
      <blockquote>
        <p>{blogConfig.citationAuthor}. “{post.title}”. {citation.journal} ({citation.date}).<br />
          <a href={citation.url}>{citation.url}</a>
        </p>
      </blockquote>
      <p>Or use the BibTeX citation:</p>
      <pre><code>{citation.bibtex}</code></pre>
    </section>
  );
}
