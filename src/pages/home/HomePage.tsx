import { buildDate } from '@/content/build-info';
import { PageShell } from '@/layout/PageShell';
import { getActiveSpecialHours } from '@/lib/opening-hours';
import { AboutSection } from '@/sections/about/AboutSection';
import { ContactSection } from '@/sections/contact/ContactSection';
import { DifferentialsSection } from '@/sections/differentials/DifferentialsSection';
import { FaqSection } from '@/sections/faq/FaqSection';
import { HeroSection } from '@/sections/hero/HeroSection';
import { ProductsSection } from '@/sections/products/ProductsSection';
import { ServicesSection } from '@/sections/services/ServicesSection';
import { TestimonialsSection } from '@/sections/testimonials/TestimonialsSection';
import type { SiteContent } from '@/types/content';

export type HomePageProps = { content: SiteContent };

// Ordem das seções definida pelo FR-001.
export function HomePage({ content }: HomePageProps) {
  const { business, messages } = content;

  return (
    <PageShell content={content}>
      <HeroSection hero={content.hero} business={business} />
      <AboutSection about={content.about} />
      <DifferentialsSection
        differentials={content.differentials}
        business={business}
        whatsappMessage={messages.general}
      />
      <ServicesSection services={content.services} business={business} />
      <ProductsSection products={content.products} business={business} />
      <TestimonialsSection
        testimonials={content.testimonials}
        business={business}
        whatsappMessage={messages.general}
      />
      <FaqSection faq={content.faq} business={business} whatsappMessage={messages.faq} />
      <ContactSection
        business={business}
        specialHours={getActiveSpecialHours(business.specialHours, buildDate)}
        whatsappMessage={messages.general}
      />
    </PageShell>
  );
}
