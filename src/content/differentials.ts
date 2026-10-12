import type { Differential } from '@/types/content';

// FR-018: afirmações concretas e verificáveis. Todos os itens abaixo dependem de
// confirmação do cliente antes da publicação.
export const differentials = [
  {
    id: 'secagem-sem-gaiola',
    title: 'Secagem sem gaiola de calor', // PENDENTE: confirmar com o cliente
    description: 'PENDENTE: como é feita a secagem (soprador manual, temperatura controlada).',
    evidence: 'PENDENTE: evidência (ex.: equipamento utilizado).',
    icon: 'wind',
  },
  {
    id: 'profissionais-certificados',
    title: 'Profissionais com certificação em tosa', // PENDENTE: confirmar com o cliente
    description: 'PENDENTE: quem é certificado e por qual instituição.',
    evidence: 'PENDENTE: certificado e ano.',
    icon: 'award',
  },
  {
    id: 'fotos-durante-o-banho',
    title: 'Fotos do seu pet durante o atendimento', // PENDENTE: confirmar com o cliente
    description: 'PENDENTE: como e quando as fotos são enviadas ao tutor.',
    evidence: 'PENDENTE: canal de envio (ex.: WhatsApp).',
    icon: 'video',
  },
  {
    id: 'produtos-hipoalergenicos',
    title: 'Produtos hipoalergênicos e registrados', // PENDENTE: confirmar com o cliente
    description: 'PENDENTE: linha de produtos usada no banho.',
    evidence: 'PENDENTE: marca e registro no MAPA.',
    icon: 'shield-check',
  },
] as const satisfies readonly Differential[];
