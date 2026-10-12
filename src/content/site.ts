import type { SiteConfig } from '@/types/content';

export const site = {
  // PENDENTE: domínio definitivo (canonical, Open Graph, sitemap e JSON-LD dependem dele).
  url: 'https://www.dominio-pendente.com.br',
  locale: 'pt-BR',
  // PENDENTE: imagem de compartilhamento real 1200×630 em public/og-image.jpg.
  // PENDENTE: public/favicon.svg e public/apple-touch-icon.png gerados a partir do logo real.
  defaultOgImage: '/og-image.jpg',
  defaultOgImageAlt: 'PENDENTE: descrição da imagem de compartilhamento',
  themeColor: '#00595a', // igual a --primary
  backgroundColor: '#fdfaf4', // igual a --background
} as const satisfies SiteConfig;
