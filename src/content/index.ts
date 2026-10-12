import { validateOpeningHours } from '@/lib/opening-hours';
import type { SiteContent } from '@/types/content';
import { about } from './about';
import { buildYear } from './build-info';
import { business } from './business';
import { differentials } from './differentials';
import { faq } from './faq';
import { hero } from './hero';
import { messages } from './messages';
import { navigation } from './navigation';
import { privacy } from './privacy';
import { products } from './products';
import { services } from './services';
import { site } from './site';
import { testimonials } from './testimonials';

/**
 * Única porta de entrada do conteúdo (contracts/content-schema.md).
 * Assíncrona para que a troca por um CMS não altere os consumidores.
 */
export function loadSiteContent(): Promise<SiteContent> {
  validateOpeningHours(business.openingHours);
  return Promise.resolve({
    site,
    business,
    messages,
    navigation,
    hero,
    about,
    differentials,
    services,
    products,
    testimonials,
    faq,
    privacy,
    buildYear,
  });
}
