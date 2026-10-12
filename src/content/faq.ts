import type { FaqItem } from '@/types/content';

// CR-008: perguntas reais recebidas pelo atendimento. Respostas dependem do cliente.
export const faq = [
  {
    id: 'carteira-de-vacinacao',
    question: 'Preciso levar a carteira de vacinação?',
    answer: ['PENDENTE: resposta (vacinas exigidas e se aceita foto da carteira).'],
  },
  {
    id: 'tempo-de-servico',
    question: 'Quanto tempo demora o banho e a tosa?',
    answer: ['PENDENTE: tempo médio por serviço e se o tutor é avisado ao terminar.'],
  },
  {
    id: 'busca-e-entrega',
    question: 'Vocês buscam e levam o pet em casa?',
    answer: ['PENDENTE: bairros atendidos, valor e horários do táxi dog.'],
  },
  {
    id: 'formas-de-pagamento',
    question: 'Quais formas de pagamento vocês aceitam?',
    answer: ['PENDENTE: Pix, cartões, dinheiro, pacotes mensais.'],
  },
  {
    id: 'pets-ansiosos-ou-agressivos',
    question: 'Meu pet é ansioso ou agressivo. Vocês atendem?',
    answer: ['PENDENTE: como a equipe lida com pets ansiosos, idosos ou reativos.'],
  },
  {
    id: 'cancelamento',
    question: 'Posso remarcar ou cancelar o horário?',
    answer: ['PENDENTE: prazo para remarcar ou cancelar sem custo.'],
  },
] as const satisfies readonly FaqItem[];
