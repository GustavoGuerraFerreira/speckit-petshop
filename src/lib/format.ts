import type { DayOfWeek, PetSize, PostalAddress, PurchaseOption, Species } from '@/types/content';

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const ratingFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const integerFormatter = new Intl.NumberFormat('pt-BR');
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const SPECIES_LABELS: Record<Species, string> = { dog: 'Cães', cat: 'Gatos' };

const SIZE_LABELS: Record<PetSize, string> = {
  small: 'Porte pequeno',
  medium: 'Porte médio',
  large: 'Porte grande',
  giant: 'Porte gigante',
};

const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

const PURCHASE_OPTION_LABELS: Record<PurchaseOption, string> = {
  pickup: 'Retirada na loja',
  delivery: 'Entrega',
};

export function formatAddress(address: PostalAddress): string {
  const streetLine = [address.street, address.number, address.complement]
    .filter(Boolean)
    .join(', ');
  return `${streetLine} – ${address.neighborhood}, ${address.city} – ${address.state}, ${address.postalCode}`;
}

export function formatCurrencyBRL(value: number): string {
  return currencyFormatter.format(value);
}

function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${String(minutes)} min`;
  if (minutes === 0) return `${String(hours)}h`;
  return `${String(hours)}h${String(minutes).padStart(2, '0')}`;
}

export function formatDurationRange(range: Readonly<{ min: number; max: number }>): string {
  if (range.min === range.max) return formatMinutes(range.min);
  return `${formatMinutes(range.min)} a ${formatMinutes(range.max)}`;
}

export function getYearsActive(foundingYear: number, buildYear: number): number {
  return Math.max(0, buildYear - foundingYear);
}

export function formatRating(value: number): string {
  return ratingFormatter.format(value);
}

export function formatInteger(value: number): string {
  return integerFormatter.format(value);
}

export function formatIsoDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

export function speciesLabel(species: Species): string {
  return SPECIES_LABELS[species];
}

export function sizeLabel(size: PetSize): string {
  return SIZE_LABELS[size];
}

export function dayLabel(day: DayOfWeek): string {
  return DAY_LABELS[day];
}

export function purchaseOptionLabel(option: PurchaseOption): string {
  return PURCHASE_OPTION_LABELS[option];
}

const NO_BREAK_SPACE = '\u00a0';
const NON_BREAKING_HYPHEN = '\u2011';

/** Telefone sem quebra de linha: espaços e hífens não separáveis. */
export function formatPhoneDisplay(display: string): string {
  return display.replaceAll(' ', NO_BREAK_SPACE).replaceAll('-', NON_BREAKING_HYPHEN);
}
