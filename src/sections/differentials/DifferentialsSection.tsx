import { Section } from '@/components/shared/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { cn } from 'cn';
import type { Business, Differential } from '@/types/content';
import { DifferentialItem } from './DifferentialItem';

export type DifferentialsSectionProps = {
  differentials: readonly Differential[];
  business: Business;
  whatsappMessage: string;
};

export function DifferentialsSection({
  differentials,
  business,
  whatsappMessage,
}: DifferentialsSectionProps) {
  return (
    <Section id="diferenciais" labelledBy="diferenciais-titulo" tone="muted">
      <SectionHeading
        id="diferenciais-titulo"
        eyebrow="Por que nos escolher"
        title="O que fazemos diferente"
      />
      <ul
        className={cn(
          'grid gap-6 sm:grid-cols-2',
          differentials.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
        )}
      >
        {differentials.map((differential) => (
          <li key={differential.id}>
            <DifferentialItem differential={differential} />
          </li>
        ))}
      </ul>
      <WhatsAppButton
        phone={business.whatsapp}
        message={whatsappMessage}
        context="differentials"
        size="lg"
        className="mt-10 w-full sm:w-auto"
      />
    </Section>
  );
}
