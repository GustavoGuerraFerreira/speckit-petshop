import heroImage from '@/assets/images/hero/pendente-foto-principal-banho-e-tosa.jpg?preset=hero';
import { toImageAsset } from '@/lib/image-asset';
import { formatInteger, formatRating, getYearsActive } from '@/lib/format';
import type { HeroContent } from '@/types/content';
import { buildYear } from './build-info';
import { business } from './business';
import { messages } from './messages';

const { address, reviewSummary } = business;
const yearsActive = getYearsActive(business.foundingYear, buildYear);

export const hero = {
  // CR-003: serviço + espécie + localidade, derivados da fonte única de endereço.
  title: `Banho, tosa e cuidado para cães e gatos em ${address.neighborhood}, ${address.city}`,
  subtitle:
    'PENDENTE: benefício principal em uma ou duas frases (ex.: profissionais certificados, secagem sem gaiola de calor e acompanhamento por fotos durante o banho).',
  image: toImageAsset(heroImage, 'PENDENTE: descrição da foto real do pet sendo cuidado no salão'),
  trustSignals: [
    {
      kind: 'rating',
      value: formatRating(reviewSummary.ratingValue),
      label: `no ${reviewSummary.source} · ${formatInteger(reviewSummary.reviewCount)} avaliações`,
      referenceDate: reviewSummary.referenceDate,
    },
    {
      kind: 'yearsActive',
      value: `${String(yearsActive)} anos`,
      label: `cuidando de pets em ${address.neighborhood}`,
      referenceDate: `${String(buildYear)}-01-01`,
    },
    {
      kind: 'petsServed',
      value: 'PENDENTE: nº',
      label: 'pets atendidos por mês',
      referenceDate: '2026-10-12', // PENDENTE: data de referência do número
    },
  ],
  primaryCta: {
    label: 'Agendar pelo WhatsApp',
    intent: 'whatsapp',
    whatsappMessage: messages.general,
    trackingContext: 'hero',
  },
  secondaryCta: {
    label: 'Ver serviços',
    intent: 'anchor',
    target: 'servicos',
    trackingContext: 'hero',
  },
} as const satisfies HeroContent;
