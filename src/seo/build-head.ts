import type { PageKey } from '@/app/routes';
import type { SiteContent } from '@/types/content';
import { escapeHtml } from './escape-html';

// Contrato: specs/001-petshop-home/contracts/seo-head.md.
export const TITLE_MAX_LENGTH = 60;
export const DESCRIPTION_LENGTH_RANGE = { min: 140, max: 160 } as const;

export type PageMeta = Readonly<{
  title: string;
  description: string;
  canonical: string;
}>;

export function getPageMeta(page: PageKey, content: SiteContent): PageMeta {
  const { tradeName, address } = content.business;
  const location = `${address.neighborhood}, ${address.city}`;

  if (page === 'privacy') {
    return {
      title: `Aviso de privacidade | ${tradeName}`,
      description: `Saiba como o ${tradeName} trata dados pessoais neste site, quais serviços de terceiros são acionados e como exercer seus direitos pela LGPD.`,
      canonical: `${content.site.url}/privacidade/`,
    };
  }

  return {
    title: `Banho e tosa em ${location} | ${tradeName}`,
    description: `Banho, tosa e cuidados para cães e gatos em ${location}. Veja serviços, preços, avaliações e agende pelo WhatsApp com o ${tradeName}.`,
    canonical: `${content.site.url}/`,
  };
}

type BuildHeadInput = Readonly<{
  page: PageKey;
  content: SiteContent;
  fontPreloadHref: string | undefined;
  jsonLd: readonly string[];
}>;

function meta(attribute: 'name' | 'property', key: string, value: string): string {
  return `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
}

export function buildHead({ page, content, fontPreloadHref, jsonLd }: BuildHeadInput): string {
  const { site, business } = content;
  const pageMeta = getPageMeta(page, content);
  const ogImage = `${site.url}${site.defaultOgImage}`;

  const tags = [
    `<title>${escapeHtml(pageMeta.title)}</title>`,
    meta('name', 'description', pageMeta.description),
    `<link rel="canonical" href="${escapeHtml(pageMeta.canonical)}" />`,
    meta('name', 'robots', 'index, follow'),
    meta('name', 'theme-color', site.themeColor),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:locale', 'pt_BR'),
    meta('property', 'og:site_name', business.tradeName),
    meta('property', 'og:title', pageMeta.title),
    meta('property', 'og:description', pageMeta.description),
    meta('property', 'og:url', pageMeta.canonical),
    meta('property', 'og:image', ogImage),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', site.defaultOgImageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
  ];

  if (fontPreloadHref !== undefined) {
    tags.push(
      `<link rel="preload" href="${escapeHtml(fontPreloadHref)}" as="font" type="font/woff2" crossorigin />`,
    );
  }

  for (const block of jsonLd) {
    tags.push(`<script type="application/ld+json">${block}</script>`);
  }

  return tags.join('\n    ');
}
