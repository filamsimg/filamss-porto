/**
 * Utility functions for WhatsApp number normalization and direct chat link generation.
 */

/**
 * Normalizes any phone number into an international numeric string for WhatsApp.
 * Converts Indonesian local numbers starting with '0' (e.g. 085853685622) into '6285853685622'.
 */
export function formatWhatsAppNumber(phone?: string): string {
  if (!phone) return '';
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Creates a direct wa.me chat URL with an optional default greeting message.
 */
export function getWhatsAppUrl(phone?: string, message?: string): string {
  const number = formatWhatsAppNumber(phone);
  if (!number) return '#';
  const baseUrl = `https://wa.me/${number}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}
