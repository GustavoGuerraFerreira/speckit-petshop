import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { RatingStars } from '@/components/shared/RatingStars';
import { Section } from '@/components/shared/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { formatInteger, formatIsoDate, formatRating } from '@/lib/format';
import type { Business, Testimonial } from '@/types/content';
import { TestimonialCard } from './TestimonialCard';

export type TestimonialsSectionProps = {
  testimonials: readonly Testimonial[];
  business: Business;
  whatsappMessage: string;
};

export function TestimonialsSection({
  testimonials,
  business,
  whatsappMessage,
}: TestimonialsSectionProps) {
  const { reviewSummary } = business;

  return (
    <Section id="avaliacoes" labelledBy="avaliacoes-titulo">
      <SectionHeading id="avaliacoes-titulo" eyebrow="Avaliações" title="O que dizem os tutores" />

      <div className="mb-10 flex flex-col gap-2 rounded-xl bg-muted p-5 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-4xl font-extrabold text-primary">
          {formatRating(reviewSummary.ratingValue)}
        </p>
        <div>
          <RatingStars value={reviewSummary.ratingValue} showLabel={false} />
          <p className="text-muted-foreground">
            Média de {formatInteger(reviewSummary.reviewCount)} avaliações no {reviewSummary.source}{' '}
            (dados de {formatIsoDate(reviewSummary.referenceDate)})
          </p>
        </div>
      </div>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button asChild variant="outline" size="lg">
          <ExternalLink
            href={reviewSummary.url}
            data-track="reviews_click"
            data-track-context="testimonials"
          >
            Ver todas as avaliações no {reviewSummary.source}
            <ExternalLinkIcon aria-hidden="true" />
          </ExternalLink>
        </Button>
        <WhatsAppButton
          phone={business.whatsapp}
          message={whatsappMessage}
          context="testimonials"
          size="lg"
        />
      </div>
    </Section>
  );
}
