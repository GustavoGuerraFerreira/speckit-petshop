import { MessageCircle } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/lib/contact-links';
import type { PhoneNumber } from '@/types/content';
import { VisuallyHidden } from './VisuallyHidden';

export type WhatsAppButtonProps = {
  phone: PhoneNumber;
  message: string;
  context: string;
  label?: string;
  /** Rótulo para leitor de tela quando `iconOnly`. */
  iconOnly?: boolean;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
};

export function WhatsAppButton({
  phone,
  message,
  context,
  label = 'Agendar pelo WhatsApp',
  iconOnly = false,
  variant = 'whatsapp',
  size = 'default',
  className,
}: WhatsAppButtonProps) {
  return (
    <Button asChild variant={variant} size={iconOnly ? 'icon' : size} className={className}>
      <a
        href={buildWhatsAppUrl(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
        data-track-context={context}
      >
        <MessageCircle aria-hidden="true" />
        {iconOnly ? <VisuallyHidden>{label}</VisuallyHidden> : label}
        <VisuallyHidden> (abre o WhatsApp em nova aba)</VisuallyHidden>
      </a>
    </Button>
  );
}
