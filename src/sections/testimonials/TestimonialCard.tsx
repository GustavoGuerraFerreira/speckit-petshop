import { RatingStars } from '@/components/shared/RatingStars';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatIsoDate } from '@/lib/format';
import type { Testimonial } from '@/types/content';

export type TestimonialCardProps = { testimonial: Testimonial };

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full gap-0 p-6 text-base shadow-card ring-0">
      <article className="flex h-full flex-col gap-4">
        <RatingStars value={testimonial.rating} />
        <blockquote className="flex-1">
          <p>“{testimonial.text}”</p>
        </blockquote>
        <footer className="flex flex-wrap items-center justify-between gap-2">
          <cite className="font-semibold not-italic">{testimonial.authorName}</cite>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">Avaliação no {testimonial.source}</Badge>
            <time dateTime={testimonial.date}>{formatIsoDate(testimonial.date)}</time>
          </span>
        </footer>
      </article>
    </Card>
  );
}
