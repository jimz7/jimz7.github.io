import type { PostSummary } from "./blog-types";

export function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
  })[character]!);
}

export function createFeed(posts: PostSummary[], config: { url: string; title: string; description: string }) {
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>' +
    "<title>" + escapeXml(config.title) + "</title>" +
    "<link>" + escapeXml(config.url + "/blog/") + "</link>" +
    "<description>" + escapeXml(config.description) + "</description><language>en</language>" +
    '<atom:link href="' + escapeXml(config.url + "/feed.xml") + '" rel="self" type="application/rss+xml"/>' +
    posts.map((post) => {
      const url = escapeXml(post.externalUrl ?? config.url + "/blog/" + post.slug + "/");
      return "<item><title>" + escapeXml(post.title) + "</title><link>" + url + "</link>" +
        '<guid isPermaLink="true">' + url + "</guid>" +
        (post.description ? "<description>" + escapeXml(post.description) + "</description>" : "") +
        "<pubDate>" + new Date(post.date + "T00:00:00Z").toUTCString() + "</pubDate>" +
        post.tags.map((tag) => "<category>" + escapeXml(tag) + "</category>").join("") + "</item>";
    }).join("") + "</channel></rss>";
}
