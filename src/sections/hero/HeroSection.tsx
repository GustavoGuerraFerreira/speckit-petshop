import { ArrowDown } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { ResponsiveImage } from '@/components/shared/ResponsiveImage';
import { TrustSignalList } from '@/components/shared/TrustSignalList';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { Button } from '@/components/ui/button';
import type { Business, HeroContent } from '@/types/content';

export type HeroSectionProps = {
  hero: HeroContent;
  business: Business;
};

export function HeroSection({ hero, business }: HeroSectionProps) {
  const { primaryCta, secondaryCta } = hero;

  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      tabIndex={-1}
      className="bg-muted outline-none"
    >
      <Container className="grid items-center gap-8 py-6 md:py-12 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div className="flex flex-col gap-5">
          <h1
            id="inicio-titulo"
            className="text-display font-extrabold tracking-tight text-balance"
          >
            {hero.title}
          </h1>
          <p className="text-lead text-muted-foreground">{hero.subtitle}</p>

          <TrustSignalList signals={hero.trustSignals} />

          <div
            id="hero-cta"
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <WhatsAppButton
              phone={business.whatsapp}
              message={primaryCta.whatsappMessage ?? primaryCta.label}
              context={primaryCta.trackingContext}
              label={primaryCta.label}
              size="lg"
              className="w-full sm:w-auto"
            />
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href={`#${secondaryCta.target ?? 'servicos'}`}>
                {secondaryCta.label}
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{business.whatsappResponseNote}</p>
        </div>

        <ResponsiveImage
          image={hero.image}
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="aspect-4/3 rounded-2xl shadow-card"
        />
      </Container>
    </section>
  );
}
