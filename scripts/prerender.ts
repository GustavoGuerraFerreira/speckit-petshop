// Gera o HTML estático de cada rota a partir do bundle SSR (research.md R-02).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

type PageKey = 'home' | 'privacy';

type ServerEntry = {
  routes: readonly { path: string; page: PageKey }[];
  TITLE_MAX_LENGTH: number;
  DESCRIPTION_LENGTH_RANGE: { min: number; max: number };
  prerenderPage: (
    page: PageKey,
    options: { fontPreloadHref: string | undefined },
  ) => Promise<{ html: string; head: string; title: string; description: string }>;
  getSiteInfo: () => Promise<SiteInfo>;
};

type SiteInfo = { url: string; name: string; themeColor: string; backgroundColor: string };

type ManifestChunk = { file: string; assets?: string[]; css?: string[] };

const ROOT = path.resolve(import.meta.dirname, '..');
const CLIENT_DIR = path.join(ROOT, 'dist/client');
const SERVER_DIR = path.join(ROOT, 'dist/server');
const FONT_FILE_PATTERN = /plus-jakarta-sans-latin-wght-normal-[\w-]+\.woff2$/;

async function findFontPreloadHref(): Promise<string | undefined> {
  const manifestPath = path.join(CLIENT_DIR, '.vite/manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Record<
    string,
    ManifestChunk
  >;
  const assets = Object.values(manifest).flatMap((chunk) => [chunk.file, ...(chunk.assets ?? [])]);
  const font = assets.find((file) => FONT_FILE_PATTERN.test(file));
  return font === undefined ? undefined : `/${font}`;
}

function outputPathFor(routePath: string): string {
  return path.join(CLIENT_DIR, routePath, 'index.html');
}

function buildSitemap(siteUrl: string, routePaths: readonly string[], lastmod: string): string {
  const urls = routePaths
    .map(
      (routePath) => `  <url><loc>${siteUrl}${routePath}</loc><lastmod>${lastmod}</lastmod></url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

function buildManifest(site: SiteInfo): string {
  const manifest = {
    name: site.name,
    short_name: site.name,
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    theme_color: site.themeColor,
    background_color: site.backgroundColor,
    display: 'browser',
  };
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

function warnOnMetaLengths(
  server: ServerEntry,
  routePath: string,
  title: string,
  description: string,
): void {
  if (title.length > server.TITLE_MAX_LENGTH) {
    console.warn(
      `⚠ ${routePath}: <title> com ${String(title.length)} caracteres (máx. ${String(server.TITLE_MAX_LENGTH)}).`,
    );
  }
  const { min, max } = server.DESCRIPTION_LENGTH_RANGE;
  if (description.length < min || description.length > max) {
    console.warn(
      `⚠ ${routePath}: meta description com ${String(description.length)} caracteres (ideal ${String(min)}–${String(max)}).`,
    );
  }
}

async function main(): Promise<void> {
  const serverEntryPath = path.join(SERVER_DIR, 'entry-server.js');
  const server = (await import(pathToFileURL(serverEntryPath).href)) as ServerEntry;
  const template = await readFile(path.join(CLIENT_DIR, 'index.html'), 'utf8');
  const fontPreloadHref = await findFontPreloadHref();
  if (fontPreloadHref === undefined)
    console.warn('⚠ Fonte latin não encontrada no manifest; preload omitido.');

  const site = await server.getSiteInfo();
  for (const route of server.routes) {
    const page = await server.prerenderPage(route.page, { fontPreloadHref });
    warnOnMetaLengths(server, route.path, page.title, page.description);
    const html = template
      .replace('<!--app-head-->', page.head)
      .replace('<!--app-page-->', route.page)
      .replace('<!--app-html-->', page.html);
    const outputPath = outputPathFor(route.path);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);
    console.log(`✓ ${route.path} → ${path.relative(ROOT, outputPath)}`);
  }

  const lastmod = new Date().toISOString().slice(0, 10);
  await writeFile(
    path.join(CLIENT_DIR, 'sitemap.xml'),
    buildSitemap(
      site.url,
      server.routes.map((route) => route.path),
      lastmod,
    ),
  );
  await writeFile(path.join(CLIENT_DIR, 'robots.txt'), buildRobots(site.url));
  await writeFile(path.join(CLIENT_DIR, 'site.webmanifest'), buildManifest(site));
  console.log('✓ sitemap.xml, robots.txt, site.webmanifest');

  await rm(SERVER_DIR, { recursive: true, force: true });
  await rm(path.join(CLIENT_DIR, '.vite'), { recursive: true, force: true });
}

await main();
