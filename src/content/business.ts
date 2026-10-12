import mapPreview from '@/assets/images/contact/pendente-mapa-localizacao.jpg?preset=gallery';
import logo from '@/assets/images/brand/pendente-logo.svg';
import { toImageAsset } from '@/lib/image-asset';
import type { Business } from '@/types/content';

// Fonte única de nome, endereço, telefone, horários e avaliações (FR-022).
// Nenhum outro arquivo pode repetir esses dados.
export const business = {
  tradeName: 'PENDENTE: Nome do Petshop',
  legalName: 'PENDENTE: Razão Social Ltda.',
  cnpj: 'PENDENTE: 00.000.000/0000-00',
  foundingYear: 2015, // PENDENTE: ano de fundação real
  address: {
    street: 'PENDENTE: Rua',
    number: 'PENDENTE: nº',
    neighborhood: 'PENDENTE: Bairro',
    city: 'PENDENTE: Cidade',
    state: 'SP', // PENDENTE: UF
    postalCode: '00000-000', // PENDENTE: CEP
    country: 'BR',
  },
  geo: { latitude: -23.55052, longitude: -46.633308 }, // PENDENTE: coordenadas reais
  phone: { e164: '+551100000000', display: 'PENDENTE: (11) 0000-0000' },
  whatsapp: { e164: '+5511900000000', display: 'PENDENTE: (11) 90000-0000' },
  email: 'pendente@dominio-pendente.com.br', // PENDENTE: e-mail oficial
  whatsappResponseNote: 'PENDENTE: Respondemos de segunda a sábado, a partir das 8h.',
  openingHours: [
    { day: 'monday', opens: '08:00', closes: '18:00' }, // PENDENTE: horários reais
    { day: 'tuesday', opens: '08:00', closes: '18:00' },
    { day: 'wednesday', opens: '08:00', closes: '18:00' },
    { day: 'thursday', opens: '08:00', closes: '18:00' },
    { day: 'friday', opens: '08:00', closes: '18:00' },
    { day: 'saturday', opens: '08:00', closes: '14:00' },
    { day: 'sunday', closed: true },
  ],
  specialHours: [],
  priceRange: '$$', // PENDENTE: confirmar faixa de preço
  googleBusinessProfileUrl: 'https://www.google.com/maps', // PENDENTE: link do Perfil da Empresa
  mapsDirectionsQuery: 'PENDENTE: endereço completo para rota',
  mapEmbedUrl: 'https://www.google.com/maps/embed', // PENDENTE: URL de incorporação do mapa
  mapPreview: toImageAsset(mapPreview, 'PENDENTE: mapa com a localização do petshop'),
  socialLinks: [
    // PENDENTE: perfis reais
    { network: 'instagram', url: 'https://www.instagram.com/', handle: '@pendente' },
  ],
  reviewSummary: {
    ratingValue: 4.9, // PENDENTE: nota real no Google
    reviewCount: 0, // PENDENTE: total real de avaliações
    source: 'Google',
    referenceDate: '2026-10-12', // PENDENTE: data de referência
    url: 'https://www.google.com/maps', // PENDENTE: link das avaliações
  },
  areasServed: ['PENDENTE: Bairro 1', 'PENDENTE: Bairro 2'],
  logo: { src: logo, width: 160, height: 40 },
} as const satisfies Business;
