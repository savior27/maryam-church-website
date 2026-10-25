import { Link } from 'react-router-dom';
import { ChevronRight, Info, PhoneCall, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useInView, useDocumentTitle } from '../hooks';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import services from '../data/services';

/**
 * Services Page
 * 
 * Displays the complete liturgical service and prayer schedule of the
 * Ethiopian Orthodox Tewahedo Church parish, along with administrative
 * notices and direct contact options with full multi-language translations.
 */
export default function Services() {
  const { t } = useLanguage();
  useDocumentTitle(t('nav.services') || 'Church Services');
  const [gridRef, isInView] = useInView({ threshold: 0.1 });

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-charcoal">
        {/* Background Image with Dark & Burgundy Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920')",
          }}
          role="img"
          aria-label="Ethiopian Orthodox Church sanctuary altar and sacred books"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-burgundy-dark/70" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs md:text-sm text-ivory/80 mb-3"
          >
            <Link
              to="/"
              className="hover:text-gold transition-colors focus:outline-none focus:ring-1 focus:ring-gold rounded px-1"
            >
              {t('nav.home') || 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
            <span className="text-gold font-medium" aria-current="page">
              {t('nav.services') || 'Services'}
            </span>
          </nav>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide drop-shadow-md">
            {t('services.title') || 'Church Services'}
          </h1>

          <div
            className="w-16 h-1 bg-gold rounded-full mx-auto mt-4"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Heading */}
        <SectionHeading
          label={t('services.label') || 'Divine Worship & Prayer'}
          title={t('services.title') || 'Our Services & Schedule'}
          subtitle={t('services.sampleScheduleNotice') || 'Sample schedules - actual times to be confirmed by the church'}
        />

        {/* Services Grid with useInView Animation */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {services.map((service) => (
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

        {/* Additional Info Box */}
        <section
          aria-labelledby="services-notice-title"
          className="mt-12 md:mt-16 bg-gold/10 border border-gold/30 rounded-xl p-6 sm:p-8 flex items-start gap-4 transition-all duration-300 hover:border-gold/50"
        >
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold-dark mt-0.5">
            <Info className="w-5 h-5 text-gold-dark" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="services-notice-title"
              className="font-heading text-lg font-bold text-charcoal mb-1"
            >
              {t('services.noticeTitle') || 'Notice on Liturgical Times'}
            </h2>
            <p className="text-charcoal/80 text-sm md:text-base leading-relaxed">
              {t('services.noticeText') ||
                'Service times and schedules shown are samples. Please contact the church administration to confirm current service times.'}
            </p>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section
          aria-labelledby="services-cta-heading"
          className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10 text-center relative overflow-hidden"
        >
          {/* Subtle decorative background accent */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-burgundy via-gold to-burgundy"
            aria-hidden="true"
          />

          <h2
            id="services-cta-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3"
          >
            {t('services.questionsTitle') || 'Questions about our services?'}
          </h2>

          <p className="text-charcoal/75 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            {t('services.questionsDesc') ||
              'Whether you need spiritual counsel, baptism, wedding blessings, or prayer requests, our clergy and church council are here to serve and guide you in holy faith.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-burgundy hover:bg-burgundy-light text-white font-medium text-sm sm:text-base shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              <PhoneCall className="w-4 h-4 text-gold" aria-hidden="true" />
              <span>{t('services.contactOffice') || 'Contact Church Office'}</span>
            </Link>

            <Link
              to="/calendar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ivory hover:bg-ivory-dark text-charcoal border border-gray-200 font-medium text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              <Calendar className="w-4 h-4 text-burgundy" aria-hidden="true" />
              <span>{t('services.viewCalendar') || 'View Liturgical Calendar'}</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
