import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/shared/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import type { AboutContent } from '@/types/content';
import { SpaceGallery } from './SpaceGallery';
import { TeamMemberCard } from './TeamMemberCard';

export type AboutSectionProps = { about: AboutContent };

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <Section id="sobre" labelledBy="sobre-titulo">
      <SectionHeading id="sobre-titulo" eyebrow="Sobre nós" title={about.heading} />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          {about.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="border-l-4 border-primary pl-4 font-medium">{about.mission}</p>
        </div>

        <ul className="space-y-4">
          {about.team.map((member) => (
            <li key={member.id}>
              <TeamMemberCard member={member} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <SpaceGallery images={about.gallery} />
      </div>

      <Button asChild variant="link" className="mt-8 px-0">
        <a href="#servicos">
          Conhecer os serviços
          <ArrowRight aria-hidden="true" />
        </a>
      </Button>
    </Section>
  );
}
