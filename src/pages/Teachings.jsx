import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  BookOpen,
  Calendar,
  User,
  ArrowRight,
  Info,
  X,
  Share2,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useDocumentTitle, useCopyToClipboard } from '../hooks';
import SectionHeading from '../components/SectionHeading';
import teachings from '../data/teachings';

const CATEGORIES = [
  { key: 'All', labelEn: 'All', labelAm: 'ሁሉም' },
  { key: 'Spiritual Lesson', labelEn: 'Spiritual Lesson', labelAm: 'መንፈሳዊ ትምህርት' },
  { key: 'Church Teaching', labelEn: 'Church Teaching', labelAm: 'የቤተ ክርስቲያን አስተምህሮ' },
  { key: 'Faith & Prayer', labelEn: 'Faith & Prayer', labelAm: 'እምነትና ጸሎት' },
];

const CATEGORY_STYLES = {
  'Spiritual Lesson': 'bg-burgundy/10 text-burgundy border-burgundy/20',
  'Church Teaching': 'bg-gold/20 text-gold-dark border-gold/30',
  'Faith & Prayer': 'bg-green-deep/10 text-green-deep border-green-deep/20',
};

function formatTeachingDate(dateStr, isAmharic) {
  if (!dateStr) return '';
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString(isAmharic ? 'am-ET' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Teachings Page
 * 
 * Displays Orthodox spiritual lessons, patristic writings, and homilies
 * with category filtering, reading modal, and clear educational disclaimers.
 * Fully localized with instant language switching.
 */
export default function Teachings() {
  const { t, currentLanguage } = useLanguage();
  useDocumentTitle(t('nav.teachings') || 'Spiritual Teachings');
  const isAmharic = currentLanguage === 'am';

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTeaching, setSelectedTeaching] = useState(null);
  const { copied, copy } = useCopyToClipboard();

  const filteredTeachings = useMemo(() => {
    if (activeCategory === 'All') {
      return teachings;
    }
    return teachings.filter(
      (teaching) => teaching.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  const handleShare = (teaching) => {
    const url = window.location.href;
    const title = isAmharic && teaching.titleAmharic ? teaching.titleAmharic : teaching.title;
    copy(`${title} - ${url}`);
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1548407260-da850faa41e8?w=1920')",
          }}
          role="img"
          aria-label="Ethiopian Orthodox monastery and sacred scriptures"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-burgundy-dark/70" />

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
              {t('nav.teachings') || 'Spiritual Teachings'}
            </span>
          </nav>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide drop-shadow-md">
            {t('teachings.title') || 'Spiritual Teachings'}
          </h1>

          <div
            className="w-16 h-1 bg-gold rounded-full mx-auto mt-4"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          label={t('teachings.label') || 'Apostolic Wisdom & Guidance'}
          title={t('teachings.title') || 'Spiritual Teachings & Resources'}
          subtitle={
            t('teachings.subtitle') ||
            'Nurturing faith, Orthodox dogma, patristic wisdom, and spiritual endurance for daily Christian living.'
          }
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.key;
            const label = isAmharic ? category.labelAm : category.labelEn;
            return (
              <button
                key={category.key}
                type="button"
                onClick={() => setActiveCategory(category.key)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1 ${
                  isActive
                    ? 'bg-burgundy text-white shadow-md'
                    : 'bg-white text-charcoal border border-gray-200 hover:border-gold hover:text-burgundy hover:shadow-xs'
                }`}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Teachings Cards Grid */}
        {filteredTeachings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTeachings.map((teaching) => {
              const badgeStyle =
                CATEGORY_STYLES[teaching.category] ||
                'bg-gray-100 text-charcoal border-gray-200';

              const displayTitle = isAmharic && teaching.titleAmharic ? teaching.titleAmharic : teaching.title;
              const displayExcerpt = isAmharic && teaching.excerptAmharic ? teaching.excerptAmharic : teaching.excerpt;
              const displayCategory = isAmharic && teaching.categoryAmharic ? teaching.categoryAmharic : teaching.category;
              const displayAuthor = isAmharic && teaching.authorAmharic ? teaching.authorAmharic : (teaching.author || t('teachings.author'));

              return (
                <article
                  key={teaching.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Card Header Image Placeholder */}
                  <div className="relative aspect-video w-full overflow-hidden bg-charcoal/10">
                    <img
                      src={teaching.image}
                      alt={displayTitle}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold border backdrop-blur-xs shadow-xs ${badgeStyle}`}
                      >
                        {displayCategory}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Metadata: Author & Date */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/65 mb-3">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                          <span>{displayAuthor}</span>
                        </div>
                        {teaching.date && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                            <time dateTime={teaching.date}>
                              {formatTeachingDate(teaching.date, isAmharic)}
                            </time>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-xl font-bold text-charcoal mb-3 group-hover:text-burgundy transition-colors leading-snug">
                        {displayTitle}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-charcoal/75 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                        {displayExcerpt}
                      </p>
                    </div>

                    {/* Card Footer: Read More trigger */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedTeaching(teaching)}
                        className="inline-flex items-center gap-2 text-burgundy font-semibold text-sm hover:text-burgundy-light group-hover:translate-x-0.5 transition-all focus:outline-none focus:ring-1 focus:ring-gold rounded"
                      >
                        <span>{t('teachings.readTeaching') || 'Read Teaching'}</span>
                        <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShare(teaching)}
                        className="p-2 text-charcoal/60 hover:text-gold hover:bg-gold/10 rounded-full transition-colors"
                        title={t('teachings.shareTeaching') || 'Share Teaching'}
                        aria-label="Share Teaching"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-dashed border-gray-200 p-12 text-center max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-charcoal/30 mx-auto mb-3" />
            <p className="text-charcoal/70 font-medium">
              {isAmharic ? 'በዚህ ዘርፍ የተመዘገበ ትምህርት የለም።' : 'No teachings found in this category.'}
            </p>
          </div>
        )}

        {/* Notice on Spiritual Learning */}
        <div className="mt-16 bg-gold/10 border border-gold/30 rounded-xl p-6 sm:p-8 flex items-start gap-4">
          <Info className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading text-lg font-bold text-charcoal mb-1">
              {t('teachings.noticeTitle') || 'Spiritual & Patristic Teachings'}
            </h3>
            <p className="text-charcoal/80 text-sm md:text-base leading-relaxed">
              {t('teachings.noticeText') ||
                'The lessons and reflections presented here represent core orthodox Christian teachings of the Ethiopian Orthodox Tewahedo Church for spiritual edification.'}
            </p>
          </div>
        </div>
      </div>

      {/* Reading Modal Lightbox */}
      {selectedTeaching && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gold/30 p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={() => setSelectedTeaching(null)}
              className="absolute top-4 right-4 p-2 text-charcoal/60 hover:text-burgundy rounded-full hover:bg-gray-100 transition-colors"
              aria-label={t('teachings.close') || 'Close'}
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-burgundy/10 text-burgundy uppercase tracking-wider inline-block mb-3">
              {isAmharic && selectedTeaching.categoryAmharic
                ? selectedTeaching.categoryAmharic
                : selectedTeaching.category}
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-4 leading-snug">
              {isAmharic && selectedTeaching.titleAmharic
                ? selectedTeaching.titleAmharic
                : selectedTeaching.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-charcoal/60 mb-6 pb-4 border-b border-gray-100">
              <span className="font-medium text-gold-dark">
                {isAmharic && selectedTeaching.authorAmharic
                  ? selectedTeaching.authorAmharic
                  : (selectedTeaching.author || t('teachings.author'))}
              </span>
              <span>•</span>
              <span>{formatTeachingDate(selectedTeaching.date, isAmharic)}</span>
            </div>

            <div className="text-charcoal/85 text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                {isAmharic && selectedTeaching.contentAmharic
                  ? selectedTeaching.contentAmharic
                  : selectedTeaching.content}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleShare(selectedTeaching)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gold-dark hover:text-gold transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? (t('news.copied') || 'Link Copied!') : (t('teachings.shareTeaching') || 'Share Teaching')}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTeaching(null)}
                className="px-5 py-2 bg-charcoal hover:bg-charcoal-light text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors"
              >
                {t('teachings.close') || 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
