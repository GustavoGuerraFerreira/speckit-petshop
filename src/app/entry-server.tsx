import { prerender } from 'react-dom/static';
import type { ReactElement } from 'react';
import { loadSiteContent } from '@/content';
import { HomePage } from '@/pages/home/HomePage';
import PrivacyPage from '@/pages/privacy/PrivacyPage';
import { buildFaqPageJsonLd, buildPetStoreJsonLd } from '@/seo/json-ld';
import { buildHead, getPageMeta } from '@/seo/build-head';
import { serializeJsonLd } from '@/seo/serialize-json-ld';
import type { SiteContent } from '@/types/content';
import type { PageKey } from './routes';
import '@/styles/globals.css';

export { routes } from './routes';
export { DESCRIPTION_LENGTH_RANGE, TITLE_MAX_LENGTH } from '@/seo/build-head';

export type PrerenderedPage = Readonly<{
  html: string;
  head: string;
  title: string;
  description: string;
}>;

export type SiteInfo = Readonly<{
  url: string;
  name: string;
  themeColor: string;
  backgroundColor: string;
}>;

export async function getSiteInfo(): Promise<SiteInfo> {
  const { site, business } = await loadSiteContent();
  return {
    url: site.url,
    name: business.tradeName,
    themeColor: site.themeColor,
    backgroundColor: site.backgroundColor,
  };
}

function renderPage(page: PageKey, content: SiteContent): ReactElement {
  return page === 'home' ? <HomePage content={content} /> : <PrivacyPage content={content} />;
}

function getJsonLd(page: PageKey, content: SiteContent): string[] {
  if (page !== 'home') return [];
  return [
    serializeJsonLd(buildPetStoreJsonLd(content)),
    serializeJsonLd(buildFaqPageJsonLd(content.faq)),
  ];
}

export async function prerenderPage(
  page: PageKey,
  options: Readonly<{ fontPreloadHref: string | undefined }>,
): Promise<PrerenderedPage> {
  const content = await loadSiteContent();
  const { prelude } = await prerender(renderPage(page, content));
  const meta = getPageMeta(page, content);

  return {
    html: await new Response(prelude).text(),
    head: buildHead({
      page,
      content,
      fontPreloadHref: options.fontPreloadHref,
      jsonLd: getJsonLd(page, content),
    }),
    title: meta.title,
    description: meta.description,
  };
}
