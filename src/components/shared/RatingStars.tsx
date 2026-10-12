import { Star } from 'lucide-react';
import { cn } from 'cn';
import { formatRating } from '@/lib/format';

const STAR_COUNT = 5;

export type RatingStarsProps = {
  value: number;
  /** Exibe "Nota X de 5" visível; se falso, o texto fica apenas para leitor de tela. */
  showLabel?: boolean;
  className?: string;
};

export function RatingStars({ value, showLabel = true, className }: RatingStarsProps) {
  const filled = Math.round(value);
  const label = `Nota ${formatRating(value)} de ${String(STAR_COUNT)}`;

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="inline-flex text-primary" aria-hidden="true">
        {Array.from({ length: STAR_COUNT }, (_, index) => (
          <Star key={index} className={cn('size-4', index < filled && 'fill-current')} />
        ))}
      </span>
      <span className={cn('text-sm font-medium', !showLabel && 'sr-only')}>{label}</span>
    </span>
  );
}
