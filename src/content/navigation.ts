import type { NavItem } from '@/types/content';

export const navigation = [
  { label: 'Sobre', sectionId: 'sobre' },
  { label: 'Serviços', sectionId: 'servicos' },
  { label: 'Produtos', sectionId: 'produtos' },
  { label: 'Avaliações', sectionId: 'avaliacoes' },
  { label: 'Dúvidas', sectionId: 'duvidas' },
  { label: 'Contato', sectionId: 'contato' },
] as const satisfies readonly NavItem[];
