# Personal website

Public website: https://jimz7.github.io/

This repository maintains the About page and accepted publications. The research blog is an independent project at https://jimz7-blog.pages.dev/, maintained in the private `jimz7/blog` repository and deployed with Cloudflare Pages. Edit and publish all future articles there; blog commits do not affect this website.

## Development

Use Node 22 or newer. Run `npm ci`, then `npm run dev`. Run `npm run lint`, `npm run build`, and `npm run check:export` before publishing. Changes merged into `main` are deployed to GitHub Pages.

Personal information lives in `src/data/aboutme.ts`, publications in `src/data/publication.ts`, and the independent blog address in `src/data/site.ts`.

## Existing links

The former `/blog/` page and four article URLs have small static redirects in `public/blog/`. They preserve query strings and section anchors and offer a normal clickable link when JavaScript is disabled. Old figure URLs remain available in `public/images/blog/` for compatibility. `/feed.xml` announces the new RSS address; future posts are published only at https://jimz7-blog.pages.dev/feed.xml.

The blog Markdown, manuscript archives, and rendering code have moved out of this repository. Earlier public Git history still contains previous versions; moving the blog does not erase that history. Keep the new blog repository private to protect future commits.

Based on [research-website-template](https://github.com/tovacinni/research-website-template); original license retained in `LICENSE`.
