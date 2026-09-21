import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif, PT_Serif } from "next/font/google";
import "./globals.css";
import { aboutMe } from "@/data/aboutme";
import { customMetadata } from "@/data/title-description";
import { blogConfig } from "@/data/blog";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(blogConfig.url),
  title: customMetadata.title || aboutMe.name,
  description: customMetadata.description || aboutMe.description,
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${ptSerif.variable} antialiased`}
      >
        <main className="">{children}</main>
        <footer className="site-footer">
          <div className="site-footer-inner">
            <div>
              <p>© {new Date().getFullYear()} {aboutMe.name}.</p>
              {aboutMe.secretDescription && (
                <p className="mt-2">{aboutMe.secretDescription}</p>
              )}
            </div>
            <p>
              <a href="/feed.xml">RSS</a>
              {" · "}Built with{" "}
              <a href="https://github.com/tovacinni/research-website-template">research-website-template</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
