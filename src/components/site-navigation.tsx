import Link from "next/link";
import { aboutMe } from "@/data/aboutme";
import { siteConfig } from "@/data/site";

export function SiteNavigation({ active }: { active: "about" | "blog" }) {
  return (
    <nav className="site-navigation font-sans" aria-label="Main navigation">
      <Link href="/" aria-current={active === "about" ? "page" : undefined}>About</Link>
      {siteConfig.blogVisible && <a href={aboutMe.blogUrl} className="site-blog-link"
        aria-current={active === "blog" ? "page" : undefined}>
        Blog <span aria-hidden="true">→</span>
      </a>}
    </nav>
  );
}
