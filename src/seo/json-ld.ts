import { getActiveSpecialHours } from '@/lib/opening-hours';
import type { DayOfWeek, FaqItem, SiteContent } from '@/types/content';
import { buildDate } from '@/content/build-info';

// Formato: specs/001-petshop-home/contracts/seo-head.md.
const SCHEMA_DAY: Readonly<Record<DayOfWeek, string>> = {
  monday: 'https://schema.org/Monday',
  tuesday: 'https://schema.org/Tuesday',
  wednesday: 'https://schema.org/Wednesday',
  thursday: 'https://schema.org/Thursday',
  friday: 'https://schema.org/Friday',
  saturday: 'https://schema.org/Saturday',
  sunday: 'https://schema.org/Sunday',
};

function absoluteUrl(siteUrl: string, src: string): string {
  return new URL(src, `${siteUrl}/`).href;
}

export function buildPetStoreJsonLd(content: SiteContent): Record<string, unknown> {
  const { site, business, hero, about } = content;
  const { address } = business;

  const regularHours = business.openingHours.flatMap((entry) =>
    entry.closed === true
      ? []
      : [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: SCHEMA_DAY[entry.day],
            opens: entry.opens,
            closes: entry.closes,
          },
        ],
  );

  const specialHours = getActiveSpecialHours(business.specialHours, buildDate).map((notice) => ({
    '@type': 'OpeningHoursSpecification',
    validFrom: notice.date,
    validThrough: notice.date,
    ...(notice.closed === true || notice.opens === undefined || notice.closes === undefined
      ? { opens: '00:00', closes: '00:00' }
      : { opens: notice.opens, closes: notice.closes }),
  }));

  const streetAddress = [`${address.street}, ${address.number}`, address.complement]
    .filter(Boolean)
    .join(' ');

  return {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    '@id': `${site.url}/#negocio`,
    name: business.tradeName,
    legalName: business.legalName,
    url: `${site.url}/`,
    logo: absoluteUrl(site.url, business.logo.src),
    image: [hero.image, ...about.gallery].map((image) => absoluteUrl(site.url, image.fallback.src)),
    telephone: business.phone.e164,
    email: business.email,
    priceRange: business.priceRange,
    foundingDate: String(business.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification: [...regularHours, ...specialHours],
    areaServed: business.areasServed,
    hasMap: business.googleBusinessProfileUrl,
    sameAs: [business.googleBusinessProfileUrl, ...business.socialLinks.map((link) => link.url)],
    ...(business.reviewSummary.reviewCount > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(business.reviewSummary.ratingValue),
        reviewCount: String(business.reviewSummary.reviewCount),
        bestRating: '5',
      },
    }),
  };
}

export function buildFaqPageJsonLd(faq: readonly FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer.join('\n\n') },
    })),
  };
}
