import type { PhoneNumber } from '@/types/content';

// Formatos definidos em specs/001-petshop-home/contracts/contact-links.md.
const BRAZILIAN_E164 = /^\+55\d{10,11}$/;
const MAX_WHATSAPP_MESSAGE_LENGTH = 500;

function assertValidPhone(phone: PhoneNumber): void {
  if (!BRAZILIAN_E164.test(phone.e164)) {
    throw new Error(`Telefone fora do formato E.164 brasileiro: "${phone.e164}"`);
  }
}

export function buildWhatsAppUrl(phone: PhoneNumber, message: string): string {
  assertValidPhone(phone);
  const trimmed = message.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_WHATSAPP_MESSAGE_LENGTH) {
    throw new Error(
      `Mensagem de WhatsApp deve ter entre 1 e ${String(MAX_WHATSAPP_MESSAGE_LENGTH)} caracteres.`,
    );
  }
  return `https://wa.me/${phone.e164.slice(1)}?text=${encodeURIComponent(trimmed)}`;
}

export function buildTelUrl(phone: PhoneNumber): string {
  assertValidPhone(phone);
  return `tel:${phone.e164}`;
}

export function buildDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function buildMailtoUrl(email: string): string {
  return `mailto:${email}`;
}
