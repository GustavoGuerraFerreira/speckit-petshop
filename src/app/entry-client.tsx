import type { ReactElement } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { loadSiteContent } from '@/content';
import { registerClickTracking } from '@/lib/analytics';
import { HomePage } from '@/pages/home/HomePage';
import { getPageForPath, isPageKey, type PageKey } from './routes';
import '@/styles/globals.css';

async function renderPage(page: PageKey): Promise<ReactElement> {
  const content = await loadSiteContent();
  if (page === 'home') return <HomePage content={content} />;
  const { default: PrivacyPage } = await import('@/pages/privacy/PrivacyPage');
  return <PrivacyPage content={content} />;
}

async function start(): Promise<void> {
  const root = document.getElementById('root');
  if (root === null) return;

  // No build, o HTML já vem pré-renderizado com `data-page`: só hidrata.
  // No `pnpm dev` não há pré-renderização: a página é escolhida pela URL e renderizada do zero.
  const prerenderedPage = root.dataset.page;
  if (isPageKey(prerenderedPage)) {
    hydrateRoot(root, await renderPage(prerenderedPage));
  } else {
    createRoot(root).render(await renderPage(getPageForPath(window.location.pathname)));
  }
  registerClickTracking();
}

void start();
