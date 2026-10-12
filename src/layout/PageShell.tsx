import type { ReactNode } from 'react';
import type { SiteContent } from '@/types/content';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { SkipLink } from './SkipLink';

export type PageShellProps = {
  content: SiteContent;
  /** Prefixo das âncoras do menu: '' na home, '/' nas demais páginas. */
  anchorBase?: string;
  children: ReactNode;
};

export function PageShell({ content, anchorBase = '', children }: PageShellProps) {
  const { business, navigation, messages, buildYear } = content;

  return (
    <>
      <SkipLink />
      <SiteHeader
        business={business}
        navigation={navigation}
        whatsappMessage={messages.general}
        anchorBase={anchorBase}
      />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter
        business={business}
        navigation={navigation}
        whatsappMessage={messages.general}
        buildYear={buildYear}
        anchorBase={anchorBase}
      />
      <FloatingWhatsApp phone={business.whatsapp} message={messages.general} />
    </>
  );
}
