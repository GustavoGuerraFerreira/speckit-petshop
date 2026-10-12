import { BusinessAddress } from '@/components/shared/BusinessAddress';
import { DirectionsLink } from '@/components/shared/DirectionsLink';
import { OpeningHoursTable } from '@/components/shared/OpeningHoursTable';
import { PhoneLink } from '@/components/shared/PhoneLink';
import { Section } from '@/components/shared/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import type { Business, SpecialHoursNotice } from '@/types/content';
import { MapFacade } from './MapFacade';

export type ContactSectionProps = {
  business: Business;
  specialHours: readonly SpecialHoursNotice[];
  whatsappMessage: string;
};

export function ContactSection({ business, specialHours, whatsappMessage }: ContactSectionProps) {
  return (
    <Section id="contato" labelledBy="contato-titulo">
      <SectionHeading
        id="contato-titulo"
        eyebrow="Contato"
        title="Fale com a gente ou venha nos visitar"
        description={business.whatsappResponseNote}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton
              phone={business.whatsapp}
              message={whatsappMessage}
              context="contact"
              size="lg"
            />
            <PhoneLink phone={business.phone} context="contact" variant="button" />
          </div>
          <BusinessAddress
            business={business}
            whatsappMessage={whatsappMessage}
            context="contact"
          />
          <OpeningHoursTable hours={business.openingHours} specialHours={specialHours} />
        </div>

        <div className="space-y-4">
          <MapFacade business={business} />
          <DirectionsLink
            query={business.mapsDirectionsQuery}
            context="contact"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </Section>
  );
}
