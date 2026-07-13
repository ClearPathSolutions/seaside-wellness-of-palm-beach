// One-off migration helper: exports the 13 local blog posts into a bundle
// that can be imported into Clarion (the new blog source of truth).
//
// Output (written to ./clarion-import/):
//   - manifest.json          all posts as structured JSON (metadata + body)
//   - posts/<slug>.md        one Markdown file per post, YAML front matter + body
//
// Run: node scripts/export-posts-for-clarion.mjs
// This reads the existing site data; it does not modify the app.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bodies = JSON.parse(
  readFileSync(join(root, "src/data/content/posts.json"), "utf8")
);
const bodyBySlug = new Map(bodies.map((b) => [b.slug, b.body]));

// Extract the `meta` array literal from posts.ts. It contains only plain
// string/number values, so evaluating just that literal is safe here.
const postsTs = readFileSync(join(root, "src/data/posts.ts"), "utf8");
const start = postsTs.indexOf("[", postsTs.indexOf("const meta"));
const end = postsTs.indexOf("\n];", start);
const meta = eval(postsTs.slice(start, end + 2));

const posts = meta
  .map((m) => ({ ...m, body: bodyBySlug.get(m.slug) ?? [] }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

// Convert a body (array of {heading?, paragraphs?, bullets?}) to Markdown.
function bodyToMarkdown(body) {
  return body
    .map((section) => {
      const parts = [];
      if (section.heading) parts.push(`## ${section.heading}`);
      if (section.paragraphs) parts.push(section.paragraphs.join("\n\n"));
      if (section.bullets)
        parts.push(section.bullets.map((b) => `- ${b}`).join("\n"));
      return parts.join("\n\n");
    })
    .join("\n\n");
}

function frontMatter(p) {
  // Quote/escape strings for YAML safety.
  const q = (s) => `"${String(s).replace(/"/g, '\\"')}"`;
  return [
    "---",
    `title: ${q(p.title)}`,
    `slug: ${q(p.slug)}`,
    `date: ${q(p.date)}`,
    `category: ${q(p.category)}`,
    `excerpt: ${q(p.excerpt)}`,
    `image: ${q(p.image)}`,
    `readingMinutes: ${p.readingMinutes}`,
    "---",
  ].join("\n");
}

const outDir = join(root, "clarion-import");
const postsDir = join(outDir, "posts");
mkdirSync(postsDir, { recursive: true });

for (const p of posts) {
  const md = `${frontMatter(p)}\n\n# ${p.title}\n\n${bodyToMarkdown(p.body)}\n`;
  writeFileSync(join(postsDir, `${p.slug}.md`), md, "utf8");
}

writeFileSync(
  join(outDir, "manifest.json"),
  JSON.stringify(posts, null, 2) + "\n",
  "utf8"
);

console.log(
  `Exported ${posts.length} posts to clarion-import/ (manifest.json + posts/*.md)`
);
