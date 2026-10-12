import { Container } from '@/components/shared/Container';
import { formatIsoDate } from '@/lib/format';
import { PageShell } from '@/layout/PageShell';
import type { SiteContent } from '@/types/content';

export type PrivacyPageProps = { content: SiteContent };

export default function PrivacyPage({ content }: PrivacyPageProps) {
  const { privacy } = content;

  return (
    <PageShell content={content} anchorBase="/">
      <Container as="article" className="max-w-3xl py-12 md:py-20">
        <h1 className="text-display font-extrabold tracking-tight">{privacy.title}</h1>
        <p className="mt-3 text-muted-foreground">
          Última atualização:{' '}
          <time dateTime={privacy.lastUpdated}>{formatIsoDate(privacy.lastUpdated)}</time>
        </p>
        {privacy.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-h3 font-bold">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </Container>
    </PageShell>
  );
}
