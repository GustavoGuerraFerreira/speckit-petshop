import { cn } from 'cn';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { useAnyInView } from '@/hooks/use-in-view';
import type { PhoneNumber } from '@/types/content';

// Ids dos elementos que já oferecem contato na tela (FR-008).
const CONTACT_ELEMENT_IDS = ['hero-cta', 'contato'] as const;

export type FloatingWhatsAppProps = {
  phone: PhoneNumber;
  message: string;
};

export function FloatingWhatsApp({ phone, message }: FloatingWhatsAppProps) {
  const contactVisible = useAnyInView(CONTACT_ELEMENT_IDS, true);

  return (
    <div
      inert={contactVisible}
      className={cn(
        'fixed right-4 bottom-4 z-30 motion-safe:transition-all motion-safe:duration-200 md:hidden',
        contactVisible
          ? 'pointer-events-none translate-y-4 opacity-0'
          : 'translate-y-0 opacity-100',
      )}
    >
      <WhatsAppButton
        phone={phone}
        message={message}
        context="floating"
        size="lg"
        className="rounded-full shadow-floating"
      />
    </div>
  );
}
