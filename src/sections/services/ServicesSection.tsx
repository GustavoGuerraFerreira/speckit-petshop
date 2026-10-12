import { Section } from '@/components/shared/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { Business, Service } from '@/types/content';
import { ServiceCard } from './ServiceCard';

export type ServicesSectionProps = {
  services: readonly Service[];
  business: Business;
};

export function ServicesSection({ services, business }: ServicesSectionProps) {
  return (
    <Section id="servicos" labelledBy="servicos-titulo">
      <SectionHeading
        id="servicos-titulo"
        eyebrow="Serviços"
        title="Banho, tosa e cuidados com preço claro"
        description={`Atendemos cães e gatos de ${business.address.neighborhood} e região. Escolha o serviço e agende direto pelo WhatsApp.`}
      />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.id}>
            <ServiceCard service={service} whatsapp={business.whatsapp} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
