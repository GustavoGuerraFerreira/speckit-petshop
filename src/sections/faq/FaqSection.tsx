import { Section } from '@/components/shared/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Business, FaqItem } from '@/types/content';

export type FaqSectionProps = {
  faq: readonly FaqItem[];
  business: Business;
  whatsappMessage: string;
};

export function FaqSection({ faq, business, whatsappMessage }: FaqSectionProps) {
  return (
    <Section id="duvidas" labelledBy="duvidas-titulo" tone="muted">
      <SectionHeading id="duvidas-titulo" eyebrow="Dúvidas" title="Perguntas frequentes" />

      <Accordion type="multiple" className="max-w-3xl rounded-xl bg-card px-4 shadow-card sm:px-6">
        {faq.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="min-h-14 items-center py-4 text-lg font-semibold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            {/* forceMount: a resposta fica no HTML pré-renderizado (oculta com `hidden` quando fechada). */}
            <AccordionContent forceMount className="pb-5 text-base text-muted-foreground">
              {item.answer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-10 max-w-3xl">
        <p className="mb-4 text-h3 font-bold">Ainda tem dúvidas?</p>
        <WhatsAppButton
          phone={business.whatsapp}
          message={whatsappMessage}
          context="faq"
          label="Fale conosco pelo WhatsApp"
          size="lg"
          className="w-full sm:w-auto"
        />
      </div>
    </Section>
  );
}
