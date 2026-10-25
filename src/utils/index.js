/**
 * Scroll to top of page
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString, locale = 'en-US') {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format phone number for display
 */
export function formatPhone(phone) {
  if (!phone || phone.includes('X')) return phone;
  return phone;
}

/**
 * Check if a config value is still a placeholder
 */
export function isPlaceholder(value) {
  if (!value) return true;
  return value.includes('to be provided') || 
         value.includes('XXXXXXXXX') || 
         value.includes('[') ||
         value === '';
}

/**
 * Generate WhatsApp chat link
 */
export function getWhatsAppLink(number) {
  if (!number) return null;
  // Remove any non-digit characters except +
  const cleaned = number.replace(/[^\d+]/g, '');
  return `https://wa.me/${cleaned.replace('+', '')}`;
}

/**
 * Generate Google Maps directions link
 */
export function getDirectionsLink(address) {
  if (!address) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}
