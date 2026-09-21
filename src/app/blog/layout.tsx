import Link from "next/link";
import { aboutMe } from "@/data/aboutme";
import "katex/dist/katex.min.css";
import "./blog.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-shell font-sans">
      <a href="#blog-content" className="blog-skip-link">Skip to content</a>
      <header className="blog-header">
        <Link className="blog-name" href="/">{aboutMe.name}<span> / notes</span></Link>
        <nav aria-label="Blog navigation">
          <Link href="/">About</Link>
          <Link href="/blog/">All notes</Link>
          <a href="/feed.xml">RSS <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <div id="blog-content" className="blog-content">{children}</div>
    </div>
  );
}
