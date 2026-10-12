import type { Testimonial } from '@/types/content';

// CR-006: somente avaliações reais, copiadas de fonte pública (Google), com data.
export const testimonials = [
  {
    id: 'avaliacao-1',
    authorName: 'PENDENTE: Nome S.',
    rating: 5, // PENDENTE: nota real
    text: 'PENDENTE: texto real da avaliação no Google.',
    source: 'Google',
    date: '2026-10-12', // PENDENTE: data real
  },
  {
    id: 'avaliacao-2',
    authorName: 'PENDENTE: Nome S.',
    rating: 5, // PENDENTE: nota real
    text: 'PENDENTE: texto real da avaliação no Google.',
    source: 'Google',
    date: '2026-10-12', // PENDENTE: data real
  },
  {
    id: 'avaliacao-3',
    authorName: 'PENDENTE: Nome S.',
    rating: 5, // PENDENTE: nota real
    text: 'PENDENTE: texto real da avaliação no Google.',
    source: 'Google',
    date: '2026-10-12', // PENDENTE: data real
  },
] as const satisfies readonly Testimonial[];
