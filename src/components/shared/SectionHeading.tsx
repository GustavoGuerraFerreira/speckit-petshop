import { cn } from 'cn';

export type SectionHeadingProps = {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  align?: 'start' | 'center';
};

export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  align = 'start',
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 max-w-2xl md:mb-14', align === 'center' && 'mx-auto text-center')}>
      {eyebrow !== undefined && (
        <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
      )}
      <h2 id={id} className="text-h2 font-bold tracking-tight text-balance">
        {title}
      </h2>
      {description !== undefined && (
        <p className="mt-4 text-lead text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
