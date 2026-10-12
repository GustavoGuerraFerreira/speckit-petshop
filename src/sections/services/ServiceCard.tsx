import { Check, Clock } from 'lucide-react';
import { ResponsiveImage } from '@/components/shared/ResponsiveImage';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatCurrencyBRL, formatDurationRange, sizeLabel, speciesLabel } from '@/lib/format';
import type { PhoneNumber, Service } from '@/types/content';

export type ServiceCardProps = {
  service: Service;
  whatsapp: PhoneNumber;
};

export function ServiceCard({ service, whatsapp }: ServiceCardProps) {
  return (
    <Card className="h-full gap-0 py-0 text-base shadow-card ring-0">
      <article className="flex h-full flex-col">
        <ResponsiveImage
          image={service.image}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="aspect-4/3"
        />
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <h3 className="text-h3 font-bold">{service.name}</h3>
            <p className="mt-2 text-muted-foreground">{service.description}</p>
          </div>

          <ul className="flex flex-wrap gap-2" aria-label="Para quem é indicado">
            {service.species.map((species) => (
              <li key={species}>
                <Badge variant="secondary">{speciesLabel(species)}</Badge>
              </li>
            ))}
            {service.sizes.map((size) => (
              <li key={size}>
                <Badge variant="outline">{sizeLabel(size)}</Badge>
              </li>
            ))}
          </ul>

          <div>
            <p className="font-semibold">O que está incluído</p>
            <ul className="mt-1 space-y-1">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="flex items-center gap-2 text-muted-foreground">
            <Clock aria-hidden="true" className="size-4 shrink-0" />
            <span>Duração estimada: {formatDurationRange(service.durationMinutes)}</span>
          </p>

          <div className="mt-auto border-t pt-4">
            <p>
              <span className="text-muted-foreground">A partir de </span>
              <span className="text-2xl font-bold text-primary">
                {formatCurrencyBRL(service.priceFrom)}
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              O preço varia conforme: {service.priceFactors.join(', ').toLowerCase()}.
            </p>
          </div>

          <WhatsAppButton
            phone={whatsapp}
            message={service.whatsappMessage}
            context={`service:${service.id}`}
            label={`Agendar ${service.name.toLowerCase()} pelo WhatsApp`}
            className="w-full"
          />
        </div>
      </article>
    </Card>
  );
}
