import Link from "next/link";
import { aboutMe } from "@/data/aboutme";

export function SiteNavigation({ active }: { active: "about" | "blog" }) {
  return (
    <nav className="site-navigation font-sans" aria-label="Main navigation">
      <Link href="/" aria-current={active === "about" ? "page" : undefined}>About</Link>
      <Link href={aboutMe.blogUrl || "/blog/"} className="site-blog-link"
        aria-current={active === "blog" ? "page" : undefined}>
        Blog <span aria-hidden="true">→</span>
      </Link>
    </nav>
  );
}
