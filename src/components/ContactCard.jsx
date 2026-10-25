import { Phone, MessageCircle, MapPin, Mail, UserCheck } from 'lucide-react';
import churchConfig from '../data/churchConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { isPlaceholder, getWhatsAppLink, getDirectionsLink } from '../utils';

/**
 * ContactCard Component
 * 
 * Admin contact and direct reach card with Call, WhatsApp,
 * Email, and Map Directions actions with complete multi-language support.
 */
export default function ContactCard() {
  const { t, currentLanguage } = useLanguage();
  const admin = churchConfig.admin || {};
  const address = churchConfig.address || {};
  const map = churchConfig.map || {};

  const isPhonePlaceholder = isPlaceholder(admin.phone);
  const isEmailPlaceholder = isPlaceholder(admin.email);
  const isAddressPlaceholder = isPlaceholder(address.full);
  const isNamePlaceholder = isPlaceholder(admin.name);

  const hasWhatsApp = Boolean(admin.whatsapp && !isPlaceholder(admin.whatsapp));
  const whatsAppLink = hasWhatsApp ? getWhatsAppLink(admin.whatsapp) : null;

  const directionsUrl = map.googleMapsUrl || (!isAddressPlaceholder ? getDirectionsLink(address.full) : null);

  const displayTitle =
    currentLanguage === 'am'
      ? admin.titleAmharic || t('contact.administrator')
      : admin.title || t('contact.administrator');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 max-w-md w-full">
      {/* Header with Admin Info */}
      <div className="flex items-start gap-4 pb-5 border-b border-gray-100 mb-5">
        <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0">
          <Phone className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <span className="text-xs uppercase tracking-wider font-semibold text-gold font-body block">
            {t('contact.directAssistance') || 'Direct Assistance'}
          </span>
          <h3 className="font-heading text-lg font-bold text-charcoal truncate">
            {displayTitle}
          </h3>
          {!isNamePlaceholder && admin.name && (
            <p className="text-xs text-charcoal/70 flex items-center gap-1 mt-0.5">
              <UserCheck className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
              <span>{admin.name}</span>
            </p>
          )}
          <p className="text-base font-semibold text-burgundy mt-1">
            {admin.phone || (currentLanguage === 'am' ? 'ስልክ ቁጥር በቅርቡ ይገለጻል' : 'Phone number to be provided')}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-5">
        {/* Call Now Button */}
        {isPhonePlaceholder ? (
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-burgundy/60 text-white/80 font-medium rounded-lg cursor-not-allowed text-sm"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>{t('contact.callPending') || 'Call Now (Pending Setup)'}</span>
          </button>
        ) : (
          <a
            href={`tel:${admin.phone}`}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-burgundy hover:bg-burgundy-light text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>{t('contact.callNow') || 'Call Now'}</span>
          </a>
        )}

        {/* WhatsApp Button (conditional) */}
        {hasWhatsApp && whatsAppLink ? (
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>{t('contact.chatWhatsApp') || 'WhatsApp Message'}</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366]/40 text-white/80 font-medium rounded-lg cursor-not-allowed text-sm"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>{t('contact.whatsappPending') || 'WhatsApp (Pending)'}</span>
          </button>
        )}

        {/* Get Directions Button */}
        {directionsUrl ? (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-charcoal hover:bg-charcoal-light text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
          >
            <MapPin className="w-4 h-4 text-gold" aria-hidden="true" />
            <span>{t('contact.getDirections') || 'Get Directions'}</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-charcoal/60 text-white/80 font-medium rounded-lg cursor-not-allowed text-sm"
          >
            <MapPin className="w-4 h-4 text-gold/60" aria-hidden="true" />
            <span>{currentLanguage === 'am' ? 'አቅጣጫ (በዝግጅት ላይ)' : 'Directions (Pending Map)'}</span>
          </button>
        )}
      </div>

      {/* Email Link (if available and not placeholder) */}
      {!isEmailPlaceholder && admin.email && (
        <div className="pt-3 border-t border-gray-100 text-center">
          <a
            href={`mailto:${admin.email}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-charcoal/80 hover:text-burgundy transition-colors"
          >
            <Mail className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
            <span>{admin.email}</span>
          </a>
        </div>
      )}
    </div>
  );
}

export { ContactCard };
