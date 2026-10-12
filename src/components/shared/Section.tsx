import type { ReactNode } from 'react';
import { cn } from 'cn';
import type { SectionId } from '@/types/content';
import { Container } from './Container';

export type SectionProps = {
  id: SectionId;
  labelledBy: string;
  tone?: 'default' | 'muted';
  className?: string;
  children: ReactNode;
};

export function Section({ id, labelledBy, tone = 'default', className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={-1}
      className={cn('py-16 outline-none md:py-24', tone === 'muted' && 'bg-muted', className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
