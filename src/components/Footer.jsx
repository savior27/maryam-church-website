import { Link } from 'react-router-dom';
import {
  Cross,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Heart,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
import { useLanguage } from '../i18n/LanguageContext';
import churchConfig from '../data/churchConfig';

/**
 * Footer Component for Ethiopian Orthodox Tewahedo Church
 * Features:
 * - 4-Column responsive grid layout (Column 1: Identity, Column 2: Quick Links, Column 3: Services, Column 4: Contact)
 * - Deep Charcoal background (#242124) with Gold (#C6A15B) accents and Ivory (#FAF7F0) text
 * - Social media links (conditional on URL provided in churchConfig)
 * - Multi-language support (English, Amharic, Afaan Oromo) via useLanguage
 * - Bottom bar with copyright year from config and spiritual blessing
 */
const Footer = () => {
  const { t, currentLanguage } = useLanguage();

  // Localized church name based on current language
  const localizedChurchName =
    currentLanguage === 'am'
      ? (churchConfig.churchNameAmharic || churchConfig.churchName)
      : currentLanguage === 'om'
      ? (churchConfig.churchNameOromo || churchConfig.churchName)
      : churchConfig.churchName;

  // Localized tagline
  const churchTagline =
    currentLanguage === 'am'
      ? churchConfig.churchTaglineAmharic || t('footer.tagline')
      : t('footer.tagline') || churchConfig.churchTagline || 'Rooted in Ancient Faith, Guided by Tradition, Serving in Heavenly Love';

  // Quick navigation links
  const quickLinks = [
    { path: '/', label: t('nav.home') || 'Home' },
    { path: '/about', label: t('nav.about') || 'About Us' },
    { path: '/services', label: t('nav.services') || 'Services' },
    { path: '/calendar', label: t('nav.calendar') || 'Calendar' },
    { path: '/news', label: t('nav.news') || 'News' },
    { path: '/teachings', label: t('nav.teachings') || 'Teachings' },
    { path: '/gallery', label: t('nav.gallery') || 'Gallery' },
    { path: '/donations', label: t('nav.donations') || t('donation.title') || 'Donations' },
    { path: '/contact', label: t('nav.contact') || t('contact.title') || 'Contact Us' },
  ];

  // Liturgical & parish services
  const parishServices = [
    {
      title: t('footer.parishLiturgy') || 'Divine Liturgy (Holy Qiddase)',
      desc: t('footer.parishLiturgyTime') || 'Sundays & Holy Feast Days',
    },
    {
      title: t('footer.parishPrayer') || 'Prayer Services (Kidan & Mahlet)',
      desc: t('footer.parishPrayerTime') || 'Morning & Evening Liturgical Prayers',
    },
    {
      title: t('footer.parishSchool') || 'Sunday School & Youth Ministry',
      desc: t('footer.parishSchoolTime') || 'Faith Education for Children & Youth',
    },
    {
      title: t('footer.parishCharity') || 'Community Programs & Charity',
      desc: t('footer.parishCharityTime') || 'Outreach, Fellowship & Relief',
    },
  ];

  // Social media channels (only included if URL is provided in churchConfig)
  const socialChannels = [
    {
      platform: 'Facebook',
      url: churchConfig.socialMedia?.facebook,
      icon: FacebookIcon,
    },
    {
      platform: 'YouTube',
      url: churchConfig.socialMedia?.youtube,
      icon: YoutubeIcon,
    },
    {
      platform: 'Telegram',
      url: churchConfig.socialMedia?.telegram,
      icon: MessageCircle,
    },
    {
      platform: 'Instagram',
      url: churchConfig.socialMedia?.instagram,
      icon: InstagramIcon,
    },
  ].filter((channel) => Boolean(channel.url && channel.url.trim()));

  const copyrightYear = churchConfig.copyrightYear || new Date().getFullYear();

  return (
    <footer
      className="bg-[#242124] text-[#FAF7F0] relative border-t-4 border-[#C6A15B]"
      role="contentinfo"
      aria-label="Site Footer"
    >
      {/* Decorative Gold Cross Accent at Top Center */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#641E2B] text-[#C6A15B] border-2 border-[#C6A15B] shadow-md z-10">
        <Cross className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
      </div>

      {/* Main 4-Column Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Church Identity */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C6A15B] rounded-lg p-1"
              aria-label={`${localizedChurchName} - Home`}
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#641E2B] text-[#C6A15B] border border-[#C6A15B]/70 shadow-lg group-hover:scale-105 transition-transform duration-200">
                <Cross className="w-6 h-6 stroke-[2.3]" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base lg:text-lg text-[#FAF7F0] leading-tight">
                  {localizedChurchName}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold">
                  {t('hero.label') || 'Ethiopian Orthodox Tewahedo'}
                </span>
              </div>
            </Link>

            {/* Gold Divider */}
            <div className="w-16 h-0.5 bg-[#C6A15B] rounded-full" aria-hidden="true" />

            <p className="text-[#FAF7F0]/80 text-sm leading-relaxed">
              {churchTagline}
            </p>

            <div className="pt-2">
              <Link
                to="/donations"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#641E2B] hover:bg-[#7d2a38] border border-[#C6A15B]/60 shadow-sm transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
              >
                <Heart className="w-3.5 h-3.5 text-[#C6A15B] fill-current" aria-hidden="true" />
                <span>{t('donation.title') || 'Support Our Church'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C6A15B] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-[#C6A15B] text-base lg:text-lg font-semibold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" aria-hidden="true" />
              {t('footer.quickLinks') || 'Quick Links'}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center gap-2 text-sm text-[#FAF7F0]/80 hover:text-[#C6A15B] transition-colors duration-200 group focus:outline-none focus:ring-1 focus:ring-[#C6A15B] rounded py-0.5"
                  >
                    <ChevronRight
                      className="w-3.5 h-3.5 text-[#C6A15B]/60 group-hover:text-[#C6A15B] group-hover:translate-x-0.5 transition-all"
                      aria-hidden="true"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="font-serif text-[#C6A15B] text-base lg:text-lg font-semibold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" aria-hidden="true" />
              {t('footer.services') || t('services.title') || 'Our Services'}
            </h3>
            <ul className="space-y-3.5">
              {parishServices.map((service, index) => (
                <li key={index} className="group">
                  <Link
                    to="/services"
                    className="block focus:outline-none focus:ring-1 focus:ring-[#C6A15B] rounded p-1 -m-1"
                  >
                    <div className="text-sm font-medium text-[#FAF7F0] group-hover:text-[#C6A15B] transition-colors duration-200 flex items-center justify-between">
                      <span>{service.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-[#C6A15B] transition-all" aria-hidden="true" />
                    </div>
                    <div className="text-xs text-[#FAF7F0]/60 mt-0.5">
                      {service.desc}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-[#3a373a]">
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C6A15B] hover:text-[#d4b477] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
              >
                <span>{t('services.schedule') || 'Weekly Liturgical Schedule'}</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-serif text-[#C6A15B] text-base lg:text-lg font-semibold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" aria-hidden="true" />
              {t('footer.contact') || t('contact.title') || 'Contact Us'}
            </h3>
            <div className="space-y-3.5 text-sm">
              
              {/* Address */}
              {churchConfig.address?.full && (
                <div className="flex items-start gap-3 text-[#FAF7F0]/80">
                  <MapPin className="w-4 h-4 text-[#C6A15B] mt-1 shrink-0" aria-hidden="true" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-medium text-[#FAF7F0]">{churchConfig.address.full}</p>
                    {churchConfig.address.country && (
                      <p className="text-[#FAF7F0]/60">{churchConfig.address.country}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Phone */}
              {churchConfig.admin?.phone && (
                <div className="flex items-center gap-3 text-[#FAF7F0]/80">
                  <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${churchConfig.admin.phone.replace(/\s+/g, '')}`}
                    className="text-xs hover:text-[#C6A15B] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C6A15B] rounded"
                  >
                    {churchConfig.admin.phone}
                  </a>
                </div>
              )}

              {/* Email */}
              {churchConfig.admin?.email && (
                <div className="flex items-center gap-3 text-[#FAF7F0]/80">
                  <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${churchConfig.admin.email}`}
                    className="text-xs hover:text-[#C6A15B] transition-colors truncate max-w-[200px] focus:outline-none focus:ring-1 focus:ring-[#C6A15B] rounded"
                    title={churchConfig.admin.email}
                  >
                    {churchConfig.admin.email}
                  </a>
                </div>
              )}

              {/* Contact Page Link */}
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C6A15B] hover:text-[#d4b477] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                >
                  <span>{t('contact.getDirections') || 'Get Directions'}</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Social Channels */}
      <div className="border-t border-[#3a373a] bg-[#1d1b1d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F0]/60">
          
          {/* Copyright notice */}
          <div className="text-center sm:text-left flex items-center gap-2">
            <span>
              &copy; {copyrightYear} {localizedChurchName}. {t('footer.copyright') || 'All rights reserved.'}
            </span>
          </div>

          {/* Social Media Links (if provided in config) */}
          {socialChannels.length > 0 && (
            <div
              className="flex items-center gap-3"
              aria-label="Social Media Links"
            >
              {socialChannels.map((channel) => {
                const IconComponent = channel.icon;
                return (
                  <a
                    key={channel.platform}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${channel.platform} page`}
                    className="p-2 rounded-full bg-[#242124] text-[#FAF7F0]/80 hover:text-[#C6A15B] hover:bg-[#641E2B] transition-all duration-200 border border-[#3a373a] hover:border-[#C6A15B] focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  >
                    <IconComponent className="w-4 h-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          )}

          {/* Spiritual Peace / Blessing in Ethiopian Tradition */}
          <div className="text-center sm:text-right text-[11px] text-[#C6A15B]/80 font-medium tracking-wide">
            {t('footer.blessing') || 'May God Bless & Protect Our Holy Sanctuary'}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
