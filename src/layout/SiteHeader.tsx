import { Container } from '@/components/shared/Container';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import type { Business, NavItem } from '@/types/content';
import { MobileNav } from './MobileNav';

export type SiteHeaderProps = {
  business: Business;
  navigation: readonly NavItem[];
  whatsappMessage: string;
  anchorBase: string;
};

export function SiteHeader({ business, navigation, whatsappMessage, anchorBase }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
      <Container className="flex h-header items-center justify-between gap-4">
        <a href={`${anchorBase}#inicio`} className="flex min-h-11 shrink-0 items-center">
          <img
            src={business.logo.src}
            alt={business.tradeName}
            width={business.logo.width}
            height={business.logo.height}
            className="h-9 w-auto"
          />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={`${anchorBase}#${item.sectionId}`}
                  className="inline-flex min-h-11 items-center rounded-lg px-3 font-medium hover:bg-muted"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton
            phone={business.whatsapp}
            message={whatsappMessage}
            context="header"
            className="hidden sm:inline-flex"
          />
          <WhatsAppButton
            phone={business.whatsapp}
            message={whatsappMessage}
            context="header"
            iconOnly
            className="sm:hidden"
          />
          <div className="lg:hidden">
            <MobileNav items={navigation} anchorBase={anchorBase} />
          </div>
        </div>
      </Container>
    </header>
  );
}
