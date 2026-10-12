import acessorios from '@/assets/images/products/pendente-produto-acessorios.jpg?preset=card';
import higiene from '@/assets/images/products/pendente-produto-higiene.jpg?preset=card';
import petiscos from '@/assets/images/products/pendente-produto-petiscos.jpg?preset=card';
import racoes from '@/assets/images/products/pendente-produto-racoes.jpg?preset=card';
import { toImageAsset } from '@/lib/image-asset';
import type { ProductsContent } from '@/types/content';

function availabilityMessage(productName: string): string {
  return `Olá! Vim pelo site e gostaria de saber se vocês têm *${productName}* disponível.`;
}

export const products = {
  heading: 'Produtos para o dia a dia do seu pet',
  intro:
    'PENDENTE: frase curta sobre a loja (ex.: rações, petiscos e acessórios das marcas que você já conhece, com retirada na loja ou entrega no bairro).',
  items: [
    {
      id: 'racoes',
      kind: 'category',
      name: 'Rações',
      category: 'Alimentação',
      usage: 'PENDENTE: linhas disponíveis (filhotes, adultos, sênior, terapêuticas).',
      image: toImageAsset(racoes, 'PENDENTE: descrição da foto da prateleira de rações'),
      purchaseOptions: ['pickup', 'delivery'], // PENDENTE: confirmar formas de compra
      whatsappMessage: availabilityMessage('ração'),
    },
    {
      id: 'petiscos',
      kind: 'category',
      name: 'Petiscos',
      category: 'Alimentação',
      usage: 'PENDENTE: tipos de petiscos (naturais, bifinhos, ossos).',
      image: toImageAsset(petiscos, 'PENDENTE: descrição da foto de petiscos'),
      purchaseOptions: ['pickup', 'delivery'], // PENDENTE: confirmar formas de compra
      whatsappMessage: availabilityMessage('petiscos'),
    },
    {
      id: 'higiene',
      kind: 'category',
      name: 'Higiene e beleza',
      category: 'Cuidados',
      usage: 'PENDENTE: itens (shampoos, tapetes higiênicos, areia para gatos).',
      image: toImageAsset(higiene, 'PENDENTE: descrição da foto de produtos de higiene'),
      purchaseOptions: ['pickup'], // PENDENTE: confirmar formas de compra
      whatsappMessage: availabilityMessage('produtos de higiene'),
    },
    {
      id: 'acessorios',
      kind: 'category',
      name: 'Acessórios',
      category: 'Passeio e conforto',
      usage: 'PENDENTE: itens (coleiras, guias, camas, brinquedos).',
      image: toImageAsset(acessorios, 'PENDENTE: descrição da foto de acessórios'),
      purchaseOptions: ['pickup'], // PENDENTE: confirmar formas de compra
      whatsappMessage: availabilityMessage('acessórios'),
    },
  ],
  brands: [{ name: 'PENDENTE: Marca 1' }, { name: 'PENDENTE: Marca 2' }],
  purchaseNote:
    'PENDENTE: condições de retirada e entrega (bairros atendidos, prazo e valor mínimo).',
} as const satisfies ProductsContent;
