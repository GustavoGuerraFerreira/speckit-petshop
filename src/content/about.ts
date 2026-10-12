import areaDeSecagem from '@/assets/images/about/pendente-espaco-area-de-secagem.jpg?preset=gallery';
import recepcao from '@/assets/images/about/pendente-espaco-recepcao.jpg?preset=gallery';
import salaDeBanho from '@/assets/images/about/pendente-espaco-sala-de-banho.jpg?preset=gallery';
import banhista from '@/assets/images/team/pendente-equipe-banhista.jpg?preset=portrait';
import groomer from '@/assets/images/team/pendente-equipe-groomer-responsavel.jpg?preset=portrait';
import { toImageAsset } from '@/lib/image-asset';
import type { AboutContent } from '@/types/content';
import { business } from './business';

const { address, foundingYear } = business;

export const about = {
  heading: 'Quem cuida do seu pet',
  story: [
    `Desde ${String(foundingYear)}, cuidamos de cães e gatos de ${address.neighborhood} e região, em ${address.city}. PENDENTE: história real do petshop em 2 ou 3 frases curtas.`,
    'PENDENTE: como o atendimento funciona na prática (ex.: avaliação do pet na chegada, horário marcado para evitar espera, fotos enviadas ao tutor).',
  ],
  mission:
    'PENDENTE: missão em linguagem concreta (ex.: devolver seu pet limpo, calmo e no horário combinado).',
  gallery: [
    toImageAsset(recepcao, 'PENDENTE: descrição da foto da recepção'),
    toImageAsset(salaDeBanho, 'PENDENTE: descrição da foto da sala de banho'),
    toImageAsset(areaDeSecagem, 'PENDENTE: descrição da foto da área de secagem'),
  ],
  team: [
    {
      id: 'groomer-responsavel',
      name: 'PENDENTE: Nome',
      role: 'Groomer responsável',
      qualifications: ['PENDENTE: certificação em tosa e ano'],
      photo: toImageAsset(groomer, 'PENDENTE: nome e função da pessoa na foto'),
    },
    {
      id: 'banhista',
      name: 'PENDENTE: Nome',
      role: 'Banhista',
      qualifications: ['PENDENTE: formação ou tempo de experiência'],
      photo: toImageAsset(banhista, 'PENDENTE: nome e função da pessoa na foto'),
    },
  ],
} as const satisfies AboutContent;
