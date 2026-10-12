import { ICONS } from '@/components/shared/icon-map';
import type { Differential } from '@/types/content';

export type DifferentialItemProps = { differential: Differential };

export function DifferentialItem({ differential }: DifferentialItemProps) {
  const Icon = ICONS[differential.icon];

  return (
    <article className="h-full rounded-xl bg-card p-6 shadow-card">
      <span className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <h3 className="text-h3 font-bold">{differential.title}</h3>
      <p className="mt-2">{differential.description}</p>
      <p className="mt-3 text-sm text-muted-foreground">{differential.evidence}</p>
    </article>
  );
}
