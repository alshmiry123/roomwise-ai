import { cp, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve(process.argv[2] ?? "dist");
const basePath = `/${(process.argv[3] ?? process.env.GITHUB_PAGES_BASE_PATH ?? "roomwise-ai").replace(/^\/+|\/+$/g, "")}`;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else files.push(target);
  }
  return files;
}

function withBase(url) {
  if (!url.startsWith("/") || url.startsWith("//") || url.startsWith(`${basePath}/`) || url === basePath) return url;
  return `${basePath}${url === "/" ? "/" : url}`;
}

function rewriteHtml(source) {
  return source.replace(/(href|src)=(['"])(\/(?!\/)[^'"]*)\2/g, (_, attribute, quote, url) => `${attribute}=${quote}${withBase(url)}${quote}`);
}

function rewriteStaticAssetPaths(source) {
  return source
    .replace(/(["'(])\/(?:_expo|assets)(?=[/"')])/g, (_, prefix) => `${prefix}${basePath}/`)
    .replace(/(["'(])\/favicon\.ico(?=["')])/g, (_, prefix) => `${prefix}${basePath}/favicon.ico`);
}

const files = await walk(distDir);
for (const file of files) {
  const extension = path.extname(file);
  if (![".html", ".js", ".css", ".json"].includes(extension)) continue;
  const source = await readFile(file, "utf8");
  const rewritten = extension === ".html" ? rewriteHtml(source) : rewriteStaticAssetPaths(source);
  if (rewritten !== source) await writeFile(file, rewritten);
}

const htmlFiles = (await walk(distDir)).filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const relative = path.relative(distDir, file);
  if (relative === "index.html" || relative === "+not-found.html") continue;
  const routeName = relative.slice(0, -".html".length);
  const routeIndex = path.join(distDir, routeName, "index.html");
  await mkdir(path.dirname(routeIndex), { recursive: true });
  await cp(file, routeIndex);
}

const notFound = path.join(distDir, "+not-found.html");
if (await stat(notFound).then(() => true).catch(() => false)) {
  await cp(notFound, path.join(distDir, "404.html"));
}

console.log(`Prepared ${distDir} for GitHub Pages at ${basePath}`);
