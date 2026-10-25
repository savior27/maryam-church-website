import { Link } from 'react-router-dom';
import churchImage from "../images/photo_2026-10-24_21-55-15.jpg";
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Heart,
  ExternalLink,
  Sparkles,
  Church,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useInView, useDocumentTitle } from '../hooks';
import churchConfig from '../data/churchConfig';
import services from '../data/services';
import news from '../data/news';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import NewsCard from '../components/NewsCard';
import ContactCard from '../components/ContactCard';
import { isPlaceholder, getDirectionsLink } from '../utils';

/**
 * Home Page Component
 * 
 * The primary landing page for the Ethiopian Orthodox Tewahedo Church website.
 * Features Hero section, About preview, Services preview, News preview,
 * Contact & Location, and Call-to-action for donations.
 * Fully localized with immediate language switching support.
 */
export default function Home() {
  const { t, currentLanguage } = useLanguage();
  useDocumentTitle(t('nav.home') || 'Home');

  // Scroll animation hooks for each section
  const [aboutRef, aboutInView] = useInView({ threshold: 0.15 });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1 });
  const [newsRef, newsInView] = useInView({ threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.15 });

  // Preview data subsets
  const previewServices = services.slice(0, 3);
  const previewNews = news.slice(0, 3);

  // Address and map helpers
  const address = churchConfig.address || {};
  const map = churchConfig.map || {};
  const isAddressPlaceholder = isPlaceholder(address.full);
  const directionsUrl =
    map.googleMapsUrl || (!isAddressPlaceholder ? getDirectionsLink(address.full) : null);

  return (
    <div className="bg-ivory min-h-screen">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-charcoal"
        aria-label="Welcome Hero"
      >
        {/* Background Image with Dark & Burgundy Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-center bg-[center_top] transition-transform duration-1000 ease-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1548407260-da850faa41e8?w=1920&q=80')",
          }}
          role="img"
          aria-label="Ethiopian Orthodox Church sanctuary with sacred candlelight"
        />

        {/* Dual Layer Dark & Burgundy Overlay for Contrast */}
        <div className="absolute inset-0 bg-black/55 bg-gradient-to-t from-charcoal via-black/50 to-burgundy-dark/70" />

        {/* Centered Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center">
          {/* Small Top Label */}
          <div className="animate-fade-in-up">
            <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest font-body px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 mb-3 backdrop-blur-sm">
              {t('hero.label') || 'ETHIOPIAN ORTHODOX TEWAHEDO CHURCH'}
            </span>
          </div>

          {/* Gold Decorative Divider Line */}
          <div
            className="animate-fade-in-up animation-delay-100 w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full mx-auto my-3"
            aria-hidden="true"
          />

          {/* Main Heading */}
          <h1 className="animate-fade-in-up animation-delay-200 font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight my-4 drop-shadow-md">
            {t('hero.heading') || 'Welcome to Our Church'}
          </h1>

          {/* Subtitle Text */}
          <p className="animate-fade-in-up animation-delay-300 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-body leading-relaxed mb-10 drop-shadow">
            {t('hero.subtext') ||
              'Preserving ancient Christian faith, holy traditions, and communal spiritual life rooted in centuries of apostolic devotion.'}
          </p>

          {/* Call to Action Buttons */}
          <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary Button */}
            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              <span>{t('hero.primaryBtn') || 'Discover Our Church'}</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>

            {/* Secondary Button */}
            <Link
              to="/donations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold rounded-full px-8 py-4 hover:bg-white/15 transition-all duration-300 shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <Heart className="w-5 h-5 text-gold-light" aria-hidden="true" />
              <span>{t('hero.secondaryBtn') || 'Support Our Church'}</span>
            </Link>
          </div>
        </div>

        {/* Decorative Bottom Fade Transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* =========================================================================
          ABOUT PREVIEW SECTION
          ========================================================================= */}
      <section
        ref={aboutRef}
        className="bg-ivory py-20 md:py-28"
        aria-labelledby="about-preview-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image with rounded corners & shadow */}
            <div
              className={`lg:col-span-5 transition-all duration-700 ${
                aboutInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative group">
                {/* Decorative border frame accent */}
                <div
                  className="absolute -inset-2 bg-gradient-to-tr from-gold/30 to-burgundy/20 rounded-2xl blur-sm group-hover:blur transition-all duration-300 -z-10"
                  aria-hidden="true"
                />

                <img
                  src={churchImage}
                  alt="Ancient church cross and holy sanctuary"
                  className="w-full h-auto object-contain rounded-2xl shadow-xl border-4 border-white"
                  loading="lazy"
                />

                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-charcoal/90 backdrop-blur-md text-white p-4 rounded-xl border border-gold/40 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                      <Church className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gold font-semibold">
                        {t('home.apostolicHeritage') || 'Apostolic Heritage'}
                      </p>
                      <p className="text-sm font-heading font-medium text-ivory">
                        {t('home.unbrokenFaith') || 'Centuries of Unbroken Orthodox Faith'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text & Features */}
            <div
              className={`lg:col-span-7 transition-all duration-700 animation-delay-200 ${
                aboutInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
              }`}
            >
              <SectionHeading
                label={t('about.title') || 'About Our Church'}
                title={t('home.aboutPreviewTitle') || 'A Spiritual Sanctuary of Ancient Apostolic Faith'}
                subtitle={
                  t('about.subtitle') ||
                  'Preserving ancient Christian faith, holy traditions, and communal spiritual life rooted in centuries of apostolic devotion.'
                }
                align="left"
                className="mb-6"
              />

              <p className="text-charcoal/80 text-base md:text-lg leading-relaxed mb-6">
                {t('home.aboutPreviewDesc') ||
                  "The Ethiopian Orthodox Tewahedo Church is one of the world's oldest Christian communions, carrying the sacred fire of apostolic tradition, devout prayer, and profound biblical wisdom across generations."}
              </p>

              {/* Four Bullet Points with CheckCircle icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className="flex items-start gap-3 bg-white/70 p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm sm:text-base">
                      {t('home.bullets.faith') || 'Faith & Tradition'}
                    </h4>
                    <p className="text-xs text-charcoal/70 mt-0.5">
                      {t('home.bullets.faithDesc') || 'Rooted in canonical liturgy and ancient doctrine'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/70 p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm sm:text-base">
                      {t('home.bullets.community') || 'Community & Fellowship'}
                    </h4>
                    <p className="text-xs text-charcoal/70 mt-0.5">
                      {t('home.bullets.communityDesc') || 'Welcoming families, youth, and all in love'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/70 p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm sm:text-base">
                      {t('home.bullets.spiritual') || 'Spiritual Growth'}
                    </h4>
                    <p className="text-xs text-charcoal/70 mt-0.5">
                      {t('home.bullets.spiritualDesc') || 'Holy sacraments, fasting guidance, and prayer'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/70 p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm sm:text-base">
                      {t('home.bullets.heritage') || 'Cultural Heritage'}
                    </h4>
                    <p className="text-xs text-charcoal/70 mt-0.5">
                      {t('home.bullets.heritageDesc') || "Saint Yared's sacred chants, art, and wisdom"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Learn More Button */}
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-gold-dark hover:text-gold font-semibold text-base sm:text-lg group transition-colors"
                >
                  <span>{t('about.learnMore') || 'Learn More'}</span>
                  <ArrowRight
                    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 text-gold"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SERVICES PREVIEW SECTION
          ========================================================================= */}
      <section
        ref={servicesRef}
        className="bg-white py-20 md:py-28 border-t border-gray-100"
        aria-labelledby="services-preview-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label={t('home.servicesLabel') || 'Liturgical Life'}
            title={t('services.title') || 'Our Services'}
            subtitle={
              t('services.subtitle') ||
              'Join us in holy liturgy, communal prayer, and sacred celebrations throughout the week'
            }
          />

          {/* Grid of First 3 Services */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 transition-all duration-700 ${
              servicesInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            {previewServices.map((service) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                nameAmharic={service.nameAmharic}
                day={service.day}
                dayAmharic={service.dayAmharic}
                time={service.time}
                timeAmharic={service.timeAmharic}
                description={service.description}
                descriptionAmharic={service.descriptionAmharic}
                icon={service.icon}
              />
            ))}
          </div>

          {/* View All Services Link Button */}
          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-burgundy hover:bg-burgundy-light text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              <span>{t('home.viewAllServices') || 'View All Services'}</span>
              <ArrowRight className="w-4 h-4 text-gold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          NEWS PREVIEW SECTION
          ========================================================================= */}
      <section
        ref={newsRef}
        className="bg-ivory py-20 md:py-28 border-t border-gray-100"
        aria-labelledby="news-preview-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label={t('home.newsLabel') || 'Parish Announcements'}
            title={t('news.title') || 'News & Announcements'}
            subtitle={
              t('news.subtitle') ||
              'Stay informed with parish announcements, community news, and upcoming spiritual gatherings'
            }
          />

          {/* Grid of First 3 News Items */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 transition-all duration-700 ${
              newsInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            {previewNews.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={item.title}
                titleAmharic={item.titleAmharic}
                date={item.date}
                excerpt={item.excerpt}
                excerptAmharic={item.excerptAmharic}
                category={item.category}
                categoryAmharic={item.categoryAmharic}
                image={item.image}
                featured={false}
              />
            ))}
          </div>

          {/* View All News Button */}
          <div className="text-center">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal hover:bg-charcoal-light text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              <span>{t('home.viewAllNews') || t('news.allNews') || 'View All News'}</span>
              <ArrowRight className="w-4 h-4 text-gold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT & LOCATION SECTION
          ========================================================================= */}
      <section
        ref={contactRef}
        className="bg-white py-20 md:py-28 border-t border-gray-100"
        aria-labelledby="contact-preview-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label={t('home.contactLabel') || 'Visit & Connect'}
            title={t('contact.title') || 'Contact & Location'}
            subtitle={
              t('contact.subtitle') ||
              'We welcome you with open arms. Reach out for blessings, prayer requests, and parish inquiries'
            }
          />

          {/* Two-Column Layout */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-all duration-700 ${
              contactInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Left: ContactCard Component */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <ContactCard />
            </div>

            {/* Right: Location & Sanctuary Information Card */}
            <div className="lg:col-span-7 bg-ivory rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between h-full">
              <div>
                {/* Header with MapPin Icon */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-gold block">
                      {t('home.parishSanctuary') || 'Parish Sanctuary'}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-charcoal">
                      {t('home.churchAddressDirections') || 'Church Address & Directions'}
                    </h3>
                    <p className="text-sm text-charcoal/70 mt-1">
                      {t('home.joinSundayWorship') || 'Join our congregation for Sunday worship and weekly prayer.'}
                    </p>
                  </div>
                </div>

                {/* Address Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal/60 mb-1">
                      {t('contact.address') || 'Church Address'}
                    </h4>
                    {isAddressPlaceholder ? (
                      <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 text-sm text-charcoal/80">
                        <p className="font-medium text-burgundy">
                          {t('home.addressPendingNotice') || 'Official address details will be announced soon.'}
                        </p>
                        <p className="text-xs text-charcoal/70 mt-1">
                          {t('home.addressPendingHelp') ||
                            'Please reach out via telephone or WhatsApp for precise directions to our sacred sanctuary.'}
                        </p>
                      </div>
                    ) : (
                      <p className="text-base font-medium text-charcoal">
                        {address.full}
                      </p>
                    )}
                  </div>

                  {/* Region & Location Details */}
                  {(address.region || address.country) && (
                    <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-charcoal/70 pt-2">
                      {address.region && !isPlaceholder(address.region) && (
                        <div>
                          <span className="font-semibold text-charcoal">{t('contact.region') || 'Region'}: </span>
                          <span>{address.region}</span>
                        </div>
                      )}
                      {address.zone && !isPlaceholder(address.zone) && (
                        <div>
                          <span className="font-semibold text-charcoal">{t('contact.zone') || 'Zone'}: </span>
                          <span>{address.zone}</span>
                        </div>
                      )}
                      {address.country && (
                        <div>
                          <span className="font-semibold text-charcoal">{t('contact.country') || 'Country'}: </span>
                          <span>{currentLanguage === 'am' ? 'ኢትዮጵያ' : address.country}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Worship Etiquette Notice */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-xs sm:text-sm text-charcoal/75 mt-4">
                    <p className="font-semibold text-burgundy mb-1 flex items-center gap-1.5">
                      <Church className="w-4 h-4 text-gold" aria-hidden="true" />
                      <span>{t('home.visitingSanctuary') || 'Visiting the Sanctuary'}</span>
                    </p>
                    <p>
                      {t('home.dressCodeNotice') ||
                        'In keeping with holy Ethiopian Orthodox tradition, visitors are kindly encouraged to dress modestly (white Netela or shawls are customary for prayer). Shoes are removed before entering the holy sanctuary floor.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button: Get Directions */}
              <div className="pt-4 border-t border-gray-200">
                {directionsUrl ? (
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-charcoal hover:bg-charcoal-light text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
                  >
                    <MapPin className="w-4 h-4 text-gold" aria-hidden="true" />
                    <span>{t('home.getDirectionsMaps') || 'Get Directions on Google Maps'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/70" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-burgundy hover:bg-burgundy-light text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
                  >
                    <MapPin className="w-4 h-4 text-gold" aria-hidden="true" />
                    <span>{t('home.viewContactPage') || 'View Contact Page for Directions'}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION (CTA) SECTION
          ========================================================================= */}
      <section
        ref={ctaRef}
        className="relative bg-burgundy text-white py-20 md:py-24 overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Subtle Decorative Elements */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-burgundy-dark/60 via-transparent to-burgundy-dark/70 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div
          className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
            ctaInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Decorative Sparkle Icon */}
          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4 text-gold">
            <Sparkles className="w-6 h-6" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h2
            id="cta-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            {t('donation.title') || 'Support Our Church'}
          </h2>

          {/* Gold Decorative Divider */}
          <div
            className="w-16 h-1 bg-gold rounded-full mx-auto mb-6"
            aria-hidden="true"
          />

          {/* Subtitle */}
          <p className="text-white/85 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-body">
            {t('donation.subtitle') ||
              'Your generous contributions and tithes sustain our holy sanctuary, ministry, and community outreach.'}
          </p>

          {/* Donation Button */}
          <Link
            to="/donations"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full px-9 py-4 transition-all duration-300 shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-burgundy text-base sm:text-lg"
          >
            <Heart className="w-5 h-5 fill-white/20" aria-hidden="true" />
            <span>{t('home.makeContribution') || 'Make a Contribution'}</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
