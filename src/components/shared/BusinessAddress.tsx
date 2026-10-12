import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { cn } from 'cn';
import { buildMailtoUrl, buildWhatsAppUrl } from '@/lib/contact-links';
import { formatAddress, formatPhoneDisplay } from '@/lib/format';
import type { Business } from '@/types/content';
import { PhoneLink } from './PhoneLink';
import { VisuallyHidden } from './VisuallyHidden';

export type BusinessAddressProps = {
  business: Business;
  whatsappMessage: string;
  context: string;
  className?: string;
};

const LINK_CLASS =
  'inline-flex min-h-11 items-center underline underline-offset-4 hover:no-underline';

/** Único componente que exibe nome, endereço e contatos (FR-022). */
export function BusinessAddress({
  business,
  whatsappMessage,
  context,
  className,
}: BusinessAddressProps) {
  return (
    <address className={cn('space-y-1 not-italic', className)}>
      <p className="font-semibold">{business.tradeName}</p>
      <p className="flex gap-2">
        <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0" />
        <span>{formatAddress(business.address)}</span>
      </p>
      <p className="flex items-center gap-2">
        <Phone aria-hidden="true" className="size-5 shrink-0" />
        <PhoneLink phone={business.phone} context={context} className="text-current" />
      </p>
      <p className="flex items-center gap-2">
        <MessageCircle aria-hidden="true" className="size-5 shrink-0" />
        <a
          href={buildWhatsAppUrl(business.whatsapp, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
          data-track-context={context}
          className={LINK_CLASS}
        >
          <VisuallyHidden>WhatsApp: </VisuallyHidden>
          {formatPhoneDisplay(business.whatsapp.display)}
          <VisuallyHidden> (abre o WhatsApp em nova aba)</VisuallyHidden>
        </a>
      </p>
      <p className="flex items-center gap-2">
        <Mail aria-hidden="true" className="size-5 shrink-0" />
        <a
          href={buildMailtoUrl(business.email)}
          data-track="email_click"
          data-track-context={context}
          className={cn(LINK_CLASS, 'break-all')}
        >
          {business.email}
        </a>
      </p>
    </address>
  );
}
