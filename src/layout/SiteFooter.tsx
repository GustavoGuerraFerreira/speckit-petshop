import { BusinessAddress } from '@/components/shared/BusinessAddress';
import { Container } from '@/components/shared/Container';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { OpeningHoursTable } from '@/components/shared/OpeningHoursTable';
import type { Business, NavItem, SocialNetwork } from '@/types/content';

const SOCIAL_LABELS: Readonly<Record<SocialNetwork, string>> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
};

const LINK_CLASS = 'inline-flex min-h-11 items-center underline-offset-4 hover:underline';

export type SiteFooterProps = {
  business: Business;
  navigation: readonly NavItem[];
  whatsappMessage: string;
  buildYear: number;
  /** Prefixo das âncoras: '' na home, '/' em outras páginas. */
  anchorBase: string;
};

export function SiteFooter({
  business,
  navigation,
  whatsappMessage,
  buildYear,
  anchorBase,
}: SiteFooterProps) {
  return (
    <footer className="surface-inverse pt-14 pb-floating-cta md:pb-10">
      <Container className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <BusinessAddress
            business={business}
            whatsappMessage={whatsappMessage}
            context="footer"
            className="text-inverse-foreground"
          />
        </div>

        <OpeningHoursTable hours={business.openingHours} className="text-inverse-muted" />

        <div className="space-y-8">
          <nav aria-label="Rodapé">
            <h2 className="mb-2 text-base font-semibold">Navegação</h2>
            <ul>
              {navigation.map((item) => (
                <li key={item.sectionId}>
                  <a href={`${anchorBase}#${item.sectionId}`} className={LINK_CLASS}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {business.socialLinks.length > 0 && (
            <div>
              <h2 className="mb-2 text-base font-semibold">Redes sociais</h2>
              <ul>
                {business.socialLinks.map((link) => (
                  <li key={link.network}>
                    <ExternalLink
                      href={link.url}
                      className={LINK_CLASS}
                      ariaLabel={`${SOCIAL_LABELS[link.network]} ${link.handle} do ${business.tradeName}`}
                    >
                      {SOCIAL_LABELS[link.network]} {link.handle}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>

      <Container className="mt-12 flex flex-col gap-2 border-t border-inverse-muted/30 pt-6 text-sm text-inverse-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {buildYear} {business.legalName} · CNPJ {business.cnpj}
        </p>
        <a href="/privacidade/" className={LINK_CLASS}>
          Aviso de privacidade
        </a>
      </Container>
    </footer>
  );
}
