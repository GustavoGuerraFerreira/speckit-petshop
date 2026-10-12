import type { DayOfWeek, OpeningHoursEntry, SpecialHoursNotice } from '@/types/content';

export const WEEK_ORDER: readonly DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export function validateOpeningHours(entries: readonly OpeningHoursEntry[]): void {
  if (entries.length !== WEEK_ORDER.length) {
    throw new Error('O horário de funcionamento deve ter exatamente 7 entradas (seg → dom).');
  }
  entries.forEach((entry, index) => {
    if (entry.day !== WEEK_ORDER[index]) {
      throw new Error(`Horário fora de ordem na posição ${String(index)}: "${entry.day}".`);
    }
    if (entry.closed === true) return;
    if (!TIME_PATTERN.test(entry.opens) || !TIME_PATTERN.test(entry.closes)) {
      throw new Error(`Horário inválido em "${entry.day}": use HH:MM (24h).`);
    }
    if (entry.opens >= entry.closes) {
      throw new Error(`Em "${entry.day}", a abertura deve ser antes do fechamento.`);
    }
  });
}

export function getActiveSpecialHours(
  notices: readonly SpecialHoursNotice[],
  buildDate: Date,
): SpecialHoursNotice[] {
  const today = buildDate.toISOString().slice(0, 10);
  return notices.filter((notice) => notice.validUntil >= today);
}

/** Índice em WEEK_ORDER do dia atual no fuso do navegador. */
export function getTodayIndex(now: Date): number {
  return (now.getDay() + 6) % 7;
}
