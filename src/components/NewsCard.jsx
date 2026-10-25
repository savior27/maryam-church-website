import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Church } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { formatDate } from '../utils';

/**
 * NewsCard Component
 * 
 * News & Announcement card with image, category badge, date, excerpt,
 * full-card navigation link, and multi-language support.
 */
export default function NewsCard({
  id,
  title,
  titleAmharic,
  date,
  excerpt,
  excerptAmharic,
  category,
  categoryAmharic,
  image,
  featured = false,
}) {
  const { t, currentLanguage } = useLanguage();
  const isAmharic = currentLanguage === 'am';

  const displayTitle = isAmharic && titleAmharic ? titleAmharic : title;
  const displayExcerpt = isAmharic && excerptAmharic ? excerptAmharic : excerpt;
  const displayCategory = isAmharic && categoryAmharic ? categoryAmharic : category;

  // Format date
  const displayDate = date
    ? !isNaN(new Date(date).getTime()) && String(date).includes('-')
      ? formatDate(date, isAmharic ? 'am-ET' : 'en-US')
      : date
    : null;

  return (
    <Link
      to={`/news/${id}`}
      className={`group block bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${
        featured ? 'md:grid md:grid-cols-12 items-stretch' : 'flex flex-col h-full'
      }`}
    >
      {/* Thumbnail Image Container */}
      <div
        className={`relative overflow-hidden bg-ivory ${
          featured
            ? 'md:col-span-7 aspect-[4/3] sm:aspect-video md:aspect-auto md:min-h-[260px]'
            : 'aspect-[4/3] sm:aspect-video w-full'
        }`}
      >
        {image ? (
          <img
            src={image}
            alt={displayTitle || 'News image'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-gradient-to-br from-ivory to-ivory-dark text-burgundy/40">
            <Church className="w-12 h-12 mb-2 opacity-60" aria-hidden="true" />
            <span className="text-xs uppercase tracking-wider font-semibold opacity-70">
              {t('hero.label') || 'Ethiopian Orthodox Church'}
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div
        className={`p-6 flex flex-col justify-between ${
          featured ? 'md:col-span-5' : 'flex-1'
        }`}
      >
        <div>
          {/* Category Badge & Date Row */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {displayCategory && (
              <span className="inline-block bg-burgundy/10 text-burgundy text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {displayCategory}
              </span>
            )}

            {displayDate && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-gold flex-shrink-0" aria-hidden="true" />
                <span>{displayDate}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3
            className={`font-heading font-bold text-charcoal group-hover:text-burgundy transition-colors line-clamp-2 mb-3 leading-snug ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {displayTitle}
          </h3>

          {/* Excerpt */}
          {displayExcerpt && (
            <p
              className={`text-gray-600 leading-relaxed mb-4 ${
                featured ? 'line-clamp-4 text-base' : 'line-clamp-3 text-sm'
              }`}
            >
              {displayExcerpt}
            </p>
          )}
        </div>

        {/* Read More Link Visual */}
        <div className="pt-2 flex items-center gap-1.5 text-sm font-semibold text-gold group-hover:text-gold-dark transition-colors">
          <span>{t('news.readMore') || 'Read More'}</span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}

export { NewsCard };
