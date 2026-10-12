import { Phone } from 'lucide-react';
import { cn } from 'cn';
import { Button } from '@/components/ui/button';
import { buildTelUrl } from '@/lib/contact-links';
import { formatPhoneDisplay } from '@/lib/format';
import type { PhoneNumber } from '@/types/content';

export type PhoneLinkProps = {
  phone: PhoneNumber;
  context: string;
  variant?: 'button' | 'inline';
  className?: string;
};

export function PhoneLink({ phone, context, variant = 'inline', className }: PhoneLinkProps) {
  const link = (
    <a
      href={buildTelUrl(phone)}
      aria-label={`Ligar para ${phone.display}`}
      data-track="phone_click"
      data-track-context={context}
    >
      {variant === 'button' && <Phone aria-hidden="true" />}
      {formatPhoneDisplay(phone.display)}
    </a>
  );

  if (variant === 'button') {
    return (
      <Button asChild variant="outline" className={className}>
        {link}
      </Button>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4 hover:no-underline',
        className,
      )}
    >
      {link}
    </span>
  );
}
