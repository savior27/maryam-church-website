import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Info,
  Navigation,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks';
import { useLanguage } from '../i18n/LanguageContext';
import ContactCard from '../components/ContactCard';
import churchConfig from '../data/churchConfig';
import { isPlaceholder, getWhatsAppLink, getDirectionsLink } from '../utils';

/**
 * Church Contact Page
 * Displays admin reach cards, quick action channels (Call, WhatsApp, Email),
 * verified sanctuary address, office hours, and interactive map embed.
 */
export default function Contact() {
  const { t, currentLanguage } = useLanguage();
  const isAmharic = currentLanguage === 'am';

  useDocumentTitle(t('contact.title') || (isAmharic ? 'ያግኙን' : 'Contact Us'));

  const admin = churchConfig.admin || {};
  const address = churchConfig.address || {};
  const map = churchConfig.map || {};

  const isPhonePlaceholder = isPlaceholder(admin.phone);
  const isEmailPlaceholder = isPlaceholder(admin.email);
  const isAddressPlaceholder = isPlaceholder(address.full);
  const isMapEmbedValid = Boolean(map.embedUrl && !isPlaceholder(map.embedUrl));

  const hasWhatsApp = Boolean(admin.whatsapp && !isPlaceholder(admin.whatsapp));
  const whatsAppPhone = hasWhatsApp ? admin.whatsapp : admin.phone;
  const whatsAppLink = getWhatsAppLink(whatsAppPhone);

  const directionsUrl =
    map.googleMapsUrl ||
    (!isAddressPlaceholder ? getDirectionsLink(address.full) : null) ||
    'https://maps.google.com';

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden flex items-center justify-center bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1548407260-da850faa41e8?w=1600&auto=format&fit=crop&q=80')",
          }}
        />
        {/* Dark Burgundy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-burgundy-dark/70 to-charcoal/80" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs sm:text-sm text-ivory/80 mb-3"
          >
            <Link to="/" className="hover:text-gold transition-colors duration-200">
              {t('nav.home') || (isAmharic ? 'ዋና ገጽ' : 'Home')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gold/70" />
            <span className="text-gold font-medium">
              {t('nav.contact') || t('contact.title') || (isAmharic ? 'ያግኙን' : 'Contact Us')}
            </span>
          </nav>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t('contact.title') || (isAmharic ? 'ያግኙን' : 'Contact Us')}
          </h1>
          <div className="h-1 w-20 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 space-y-12">
        {/* Notice Banner */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gold/10 border border-gold/30 text-charcoal/85 text-xs sm:text-sm text-center shadow-xs">
            <Info className="w-4 h-4 text-gold flex-shrink-0" />
            <span>
              {t('contact.noticePlaceholder') ||
                (isAmharic
                  ? 'የቀረቡት አድራሻዎችና ስልኮች ለናሙና የቀረቡ ናቸው፤ ይፋዊ መረጃዎች በቅርቡ ይዘመናሉ።'
                  : 'Contact information shown uses placeholder values. Official church contact details will be updated.')}
            </span>
          </div>
        </div>

        {/* Quick Contact Options (Three cards in a row) */}
        <section aria-labelledby="quick-contact-heading">
          <h2 id="quick-contact-heading" className="sr-only">
            {isAmharic ? 'ፈጣን የመገናኛ አማራጮች' : 'Quick Contact Options'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Call Us */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col items-center text-center border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mb-4">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-charcoal mb-1">
                {t('contact.callUs') || (isAmharic ? 'ይደውሉልን' : 'Call Us')}
              </h3>
              <p className="text-xs text-charcoal/60 mb-3 uppercase tracking-wider font-semibold">
                {t('contact.parishOffice') || (isAmharic ? 'የሰበካ ጽሕፈት ቤትና ጥያቄዎች' : 'Parish Office & Inquiries')}
              </p>
              <p className="text-sm sm:text-base font-semibold text-charcoal mb-6 truncate max-w-full">
                {admin.phone || '+251XXXXXXXXX'}
              </p>
              {isPhonePlaceholder ? (
                <button
                  type="button"
                  disabled
                  className="mt-auto w-full py-2.5 px-4 rounded-lg bg-burgundy/50 text-white/80 text-sm font-medium cursor-not-allowed"
                >
                  {t('contact.callPending') || (isAmharic ? 'ይደውሉ (በዝግጅት ላይ)' : 'Call Now (Pending)')}
                </button>
              ) : (
                <a
                  href={`tel:${admin.phone}`}
                  className="mt-auto w-full py-2.5 px-4 rounded-lg bg-burgundy hover:bg-burgundy-light text-white text-sm font-medium transition-colors shadow-xs"
                >
                  {t('contact.callNow') || (isAmharic ? 'አሁን ይደውሉ' : 'Call Now')}
                </a>
              )}
            </div>

            {/* 2. WhatsApp */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col items-center text-center border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-charcoal mb-1">
                {t('contact.whatsapp') || 'WhatsApp'}
              </h3>
              <p className="text-xs text-charcoal/60 mb-3 uppercase tracking-wider font-semibold">
                {t('contact.directMessaging') || (isAmharic ? 'የቀጥታ መልዕክት' : 'Direct Messaging')}
              </p>
              <p className="text-sm sm:text-base font-semibold text-charcoal mb-6 truncate max-w-full">
                {hasWhatsApp ? admin.whatsapp : (isAmharic ? 'በቅርቡ ይጀምራል' : 'Available soon')}
              </p>
              {hasWhatsApp && whatsAppLink ? (
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-medium transition-colors shadow-xs"
                >
                  {t('contact.chatWhatsApp') || (isAmharic ? 'በዋትስአፕ ያነጋግሩን' : 'Chat on WhatsApp')}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-auto w-full py-2.5 px-4 rounded-lg bg-[#25D366]/40 text-white/80 text-sm font-medium cursor-not-allowed"
                >
                  {t('contact.whatsappPending') || (isAmharic ? 'ዋትስአፕ (በዝግጅት ላይ)' : 'WhatsApp (Pending)')}
                </button>
              )}
            </div>

            {/* 3. Email */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col items-center text-center border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-gold/15 text-gold-dark flex items-center justify-center mb-4">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-charcoal mb-1">
                {t('contact.email') || (isAmharic ? 'ኢሜይል' : 'Email')}
              </h3>
              <p className="text-xs text-charcoal/60 mb-3 uppercase tracking-wider font-semibold">
                {t('contact.writtenInquiries') || (isAmharic ? 'የጽሑፍ ጥያቄዎች' : 'Written Inquiries')}
              </p>
              <p className="text-sm sm:text-base font-semibold text-charcoal mb-6 truncate max-w-full">
                {admin.email || 'church@example.com'}
              </p>
              {isEmailPlaceholder ? (
                <button
                  type="button"
                  disabled
                  className="mt-auto w-full py-2.5 px-4 rounded-lg bg-charcoal/40 text-white/80 text-sm font-medium cursor-not-allowed"
                >
                  {t('contact.emailPending') || (isAmharic ? 'ኢሜይል (በዝግጅት ላይ)' : 'Send Email (Pending)')}
                </button>
              ) : (
                <a
                  href={`mailto:${admin.email}`}
                  className="mt-auto w-full py-2.5 px-4 rounded-lg bg-charcoal hover:bg-charcoal-light text-white text-sm font-medium transition-colors shadow-xs"
                >
                  {t('contact.sendEmail') || (isAmharic ? 'ኢሜይል ይላኩ' : 'Send Email')}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Two-Column Layout (Desktop: Left Contact Info & Hours, Right Location/Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-center lg:justify-start">
              <ContactCard />
            </div>

            {/* Office Hours Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gold/15 text-gold flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-gold">
                    {t('contact.timetable') || (isAmharic ? 'የደብሩ መርሃ ግብር' : 'Parish Timetable')}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-charcoal">
                    {t('contact.officeHours') || (isAmharic ? 'የቢሮ ሰዓታት' : 'Office Hours')}
                  </h3>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-ivory border border-gray-100">
                <p className="text-sm text-charcoal/80 leading-relaxed font-medium">
                  {isAmharic ? '[በቤተ ክርስቲያኑ የሚገለጽ]' : '[To be provided by church]'}
                </p>
                <p className="text-xs text-charcoal/60 mt-1">
                  {t('contact.officeHoursDesc') ||
                    (isAmharic
                      ? 'የካህናት የምክርና የቢሮ አገልግሎት ሰዓት እዚህ ይገለጻል።'
                      : 'Clergy counseling and parish administration schedule will be posted here.')}
                </p>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-burgundy">
                    {t('contact.parishLocation') || (isAmharic ? 'የደብሩ መገኛ' : 'Parish Location')}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-charcoal">
                    {t('contact.physicalAddress') || (isAmharic ? 'ትክክለኛ አድራሻ' : 'Physical Address')}
                  </h3>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-ivory border border-gray-100 space-y-2">
                <p className="text-sm font-semibold text-charcoal">
                  {address.full || (isAmharic ? '[የቤተ ክርስቲያኑ ሙሉ አድራሻ ይገለጻል]' : '[Full church address to be provided]')}
                </p>
                {(address.zone || address.region || address.country) && (
                  <p className="text-xs text-charcoal/70">
                    {[address.woreda, address.zone, address.region, address.country]
                      .filter((val) => val && !isPlaceholder(val))
                      .join(', ') || (isAmharic ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ደብር' : 'Ethiopian Orthodox Parish')}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Location & Google Maps */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-gold" />
                <h3 className="font-heading text-xl font-bold text-charcoal">
                  {t('contact.parishMap') || (isAmharic ? 'የደብሩ ካርታና የመገኛ አቅጣጫ' : 'Parish Map & Sanctuary Directions')}
                </h3>
              </div>
            </div>

            {/* Map Frame or Placeholder */}
            <div className="w-full rounded-xl overflow-hidden bg-ivory border border-gray-200 mb-6 min-h-[360px] md:min-h-[440px] flex items-center justify-center">
              {isMapEmbedValid ? (
                <iframe
                  title={isAmharic ? 'የቤተ ክርስቲያኑ መገኛ ካርታ' : 'Church Location Map'}
                  src={map.embedUrl}
                  className="w-full h-[400px] md:h-[480px] border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="p-8 text-center max-w-md">
                  <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-charcoal mb-2">
                    {t('contact.interactiveMap') || (isAmharic ? 'የካርታ መገኛ' : 'Interactive Map')}
                  </h4>
                  <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
                    {t('contact.mapPendingDesc') ||
                      (isAmharic
                        ? 'ትክክለኛው መጋጠሚያ ሲረጋገጥ ካርታው እዚህ ይለጠፋል።'
                        : 'Map location will be added when verified coordinates are provided.')}
                  </p>
                  <span className="inline-block text-xs uppercase tracking-wider text-gold font-semibold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                    {isAmharic ? 'ትክክለኛው መጋጠሚያ በዝግጅት ላይ ነው' : 'Geographic Coordinates Pending'}
                  </span>
                </div>
              )}
            </div>

            {/* Get Directions Button */}
            <div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-lg bg-charcoal hover:bg-charcoal-light text-white font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm text-sm sm:text-base group"
              >
                <MapPin className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                <span>{t('contact.getDirections') || (isAmharic ? 'በጉግል ካርታ አቅጣጫ ይመልከቱ' : 'Get Directions in Google Maps')}</span>
                <ExternalLink className="w-4 h-4 text-white/70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
