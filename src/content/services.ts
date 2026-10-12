import banho from '@/assets/images/services/pendente-servico-banho.jpg?preset=card';
import hidratacao from '@/assets/images/services/pendente-servico-hidratacao.jpg?preset=card';
import taxiDog from '@/assets/images/services/pendente-servico-taxi-dog.jpg?preset=card';
import tosaHigienica from '@/assets/images/services/pendente-servico-tosa-higienica.jpg?preset=card';
import tosaMaquina from '@/assets/images/services/pendente-servico-tosa-maquina.jpg?preset=card';
import tosaTesoura from '@/assets/images/services/pendente-servico-tosa-tesoura.jpg?preset=card';
import { toImageAsset } from '@/lib/image-asset';
import type { Service } from '@/types/content';
import { business } from './business';

const { neighborhood } = business.address;

function scheduleMessage(serviceName: string): string {
  return `Olá! Vim pelo site e gostaria de agendar *${serviceName}*.`;
}

// PENDENTE: preços, durações, portes e itens inclusos confirmados pelo cliente.
export const services = [
  {
    id: 'banho',
    slug: 'banho',
    name: 'Banho',
    description: `PENDENTE: descrição do banho com o diferencial do petshop em ${neighborhood}.`,
    species: ['dog', 'cat'],
    sizes: ['small', 'medium', 'large', 'giant'],
    includes: ['PENDENTE: itens inclusos (ex.: limpeza de ouvidos, corte de unhas, perfume)'],
    durationMinutes: { min: 60, max: 120 }, // PENDENTE: duração real
    priceFrom: 60, // PENDENTE: preço real
    priceFactors: ['Porte', 'Tipo e comprimento da pelagem', 'Presença de nós'],
    image: toImageAsset(banho, 'PENDENTE: descrição da foto de banho'),
    whatsappMessage: scheduleMessage('Banho'),
  },
  {
    id: 'tosa-maquina',
    slug: 'tosa-na-maquina',
    name: 'Tosa na máquina',
    description: 'PENDENTE: descrição da tosa na máquina e para quais raças é indicada.',
    species: ['dog'],
    sizes: ['small', 'medium', 'large'],
    includes: ['Banho completo', 'PENDENTE: demais itens inclusos'],
    durationMinutes: { min: 90, max: 150 }, // PENDENTE: duração real
    priceFrom: 90, // PENDENTE: preço real
    priceFactors: ['Porte', 'Estilo de tosa', 'Estado da pelagem'],
    image: toImageAsset(tosaMaquina, 'PENDENTE: descrição da foto de tosa na máquina'),
    whatsappMessage: scheduleMessage('Tosa na máquina'),
  },
  {
    id: 'tosa-tesoura',
    slug: 'tosa-na-tesoura',
    name: 'Tosa na tesoura',
    description: 'PENDENTE: descrição da tosa na tesoura e do acabamento por raça.',
    species: ['dog'],
    sizes: ['small', 'medium'],
    includes: ['Banho completo', 'PENDENTE: demais itens inclusos'],
    durationMinutes: { min: 120, max: 180 }, // PENDENTE: duração real
    priceFrom: 120, // PENDENTE: preço real
    priceFactors: ['Porte', 'Raça e estilo de corte', 'Estado da pelagem'],
    image: toImageAsset(tosaTesoura, 'PENDENTE: descrição da foto de tosa na tesoura'),
    whatsappMessage: scheduleMessage('Tosa na tesoura'),
  },
  {
    id: 'tosa-higienica',
    slug: 'tosa-higienica',
    name: 'Tosa higiênica',
    description: 'PENDENTE: descrição da tosa higiênica (regiões aparadas).',
    species: ['dog', 'cat'],
    sizes: ['small', 'medium', 'large', 'giant'],
    includes: ['PENDENTE: regiões aparadas'],
    durationMinutes: { min: 30, max: 45 }, // PENDENTE: duração real
    priceFrom: 35, // PENDENTE: preço real
    priceFactors: ['Porte', 'Comportamento do pet'],
    image: toImageAsset(tosaHigienica, 'PENDENTE: descrição da foto de tosa higiênica'),
    whatsappMessage: scheduleMessage('Tosa higiênica'),
  },
  {
    id: 'hidratacao',
    slug: 'hidratacao',
    name: 'Hidratação',
    description: 'PENDENTE: descrição da hidratação e produtos usados.',
    species: ['dog', 'cat'],
    sizes: ['small', 'medium', 'large', 'giant'],
    includes: ['PENDENTE: itens inclusos'],
    durationMinutes: { min: 30, max: 60 }, // PENDENTE: duração real
    priceFrom: 40, // PENDENTE: preço real
    priceFactors: ['Porte', 'Comprimento da pelagem'],
    image: toImageAsset(hidratacao, 'PENDENTE: descrição da foto de hidratação'),
    whatsappMessage: scheduleMessage('Hidratação'),
  },
  {
    id: 'taxi-dog',
    slug: 'taxi-dog',
    name: 'Táxi dog (busca e entrega)',
    description: `PENDENTE: como funciona a busca e entrega e quais bairros são atendidos além de ${neighborhood}.`,
    species: ['dog', 'cat'],
    sizes: ['small', 'medium', 'large'],
    includes: ['Busca e entrega em casa', 'PENDENTE: transporte em caixa ou cinto de segurança'],
    durationMinutes: { min: 20, max: 40 }, // PENDENTE: tempo de trajeto
    priceFrom: 20, // PENDENTE: preço real
    priceFactors: ['Distância', 'Porte'],
    image: toImageAsset(taxiDog, 'PENDENTE: descrição da foto do táxi dog'),
    whatsappMessage: scheduleMessage('Táxi dog'),
  },
] as const satisfies readonly Service[];
