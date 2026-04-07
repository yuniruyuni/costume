import { mkdir } from "node:fs/promises";
import { rawCostumes } from "../src/costumes";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max)}…` : s;
}

const template = await Bun.file("src/index.html").text();

// ルートページ用: そのままコピー
await mkdir("static", { recursive: true });
await Bun.write("static/index.html", template);

// 各衣装ページ用
for (const costume of rawCostumes) {
  const title = escapeHtml(`ゆにコス: ${costume.name}`);
  const description = escapeHtml(truncate(costume.comment, 200));
  const url = `https://costume.yuniruyuni.net/${costume.id}`;
  const image = `https://costume.yuniruyuni.net/ogp/${costume.id}.webp`;

  const html = template
    .replace(
      '<meta property="og:url" content="https://costume.yuniruyuni.net/" />',
      `<meta property="og:url" content="${url}" />`,
    )
    .replace(
      '<meta property="og:title" content="costume.yuniruyuni.net" />',
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      '<meta property="og:image" content="https://costume.yuniruyuni.net/ogp.webp" />',
      `<meta property="og:image" content="${image}" />`,
    )
    .replace(
      '<meta property="twitter:card" content="summary_large_image" />',
      `<meta property="twitter:card" content="summary_large_image" />\n    <meta property="twitter:image" content="${image}" />`,
    )
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${description}">`,
    );

  const dir = `static/${costume.id}`;
  await mkdir(dir, { recursive: true });
  await Bun.write(`${dir}/index.html`, html);
}
