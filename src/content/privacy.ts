import type { PrivacyContent } from '@/types/content';
import { business } from './business';

export const privacy = {
  title: 'Aviso de privacidade',
  lastUpdated: '2026-10-12', // PENDENTE: data de publicação revisada
  sections: [
    {
      heading: 'Quem é o responsável pelos dados',
      paragraphs: [
        `${business.legalName}, inscrita no CNPJ ${business.cnpj}, é a controladora dos dados tratados neste site, nos termos da Lei nº 13.709/2018 (LGPD).`,
      ],
    },
    {
      heading: 'Quais dados coletamos neste site',
      paragraphs: [
        'Este site não possui formulários e não pede nenhum dado pessoal. Não usamos cookies próprios de rastreamento nem de publicidade.',
        'PENDENTE: se uma ferramenta de análise de acesso sem cookies for contratada, descrever aqui qual é e quais dados agregados ela registra.',
      ],
    },
    {
      heading: 'Serviços de terceiros',
      paragraphs: [
        'Ao tocar nos botões de WhatsApp, a conversa acontece no aplicativo WhatsApp, sujeito à política de privacidade da Meta. Ao tocar em "Como chegar" ou em "Ver mapa interativo", o Google Maps é aberto ou carregado e passa a seguir a política de privacidade do Google.',
        'O mapa interativo só é carregado depois que você pede, para que nenhum serviço de terceiros seja acionado sem a sua ação.',
      ],
    },
    {
      heading: 'Seus direitos',
      paragraphs: [
        `Você pode solicitar confirmação, acesso, correção ou eliminação de dados pessoais que tenha compartilhado conosco pelo e-mail ${business.email}.`,
        'PENDENTE: revisão do texto final pelo cliente ou por assessoria jurídica.',
      ],
    },
  ],
} as const satisfies PrivacyContent;
