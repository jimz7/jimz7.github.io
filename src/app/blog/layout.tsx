import Link from "next/link";
import { aboutMe } from "@/data/aboutme";
import { SiteNavigation } from "@/components/site-navigation";
import "katex/dist/katex.min.css";
import "./blog.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-shell font-sans">
      <a href="#blog-content" className="blog-skip-link">Skip to content</a>
      <header className="blog-header">
        <Link className="blog-name" href="/">{aboutMe.name}</Link>
        <SiteNavigation active="blog" />
      </header>
      <div id="blog-content" className="blog-content">{children}</div>
    </div>
  );
}
