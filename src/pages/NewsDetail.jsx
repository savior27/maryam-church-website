import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, AlertCircle, Share2, Church } from 'lucide-react';
import { useDocumentTitle, useCopyToClipboard } from '../hooks';
import { useLanguage } from '../i18n/LanguageContext';
import news from '../data/news';
import { formatDate } from '../utils';

/**
 * Single News & Announcement Detail Page
 * Displays full article text, high-res image, publishing metadata, and navigation
 * with complete multi-language translations.
 */
export default function NewsDetail() {
  const { id } = useParams();
  const { t, currentLanguage } = useLanguage();
  const isAmharic = currentLanguage === 'am';

  const article = news.find((item) => String(item.id) === String(id));
  const { copied, copy } = useCopyToClipboard();

  const displayTitle = article
    ? (isAmharic && article.titleAmharic ? article.titleAmharic : article.title)
    : t('news.articleNotFound') || 'Article Not Found';

  useDocumentTitle(displayTitle);

  if (!article) {
    return (
      <div className="bg-ivory min-h-screen py-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10 text-center">
          <div className="w-16 h-16 bg-burgundy/10 text-burgundy rounded-full flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="w-8 h-8" aria-hidden="true" />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3">
            {t('news.articleNotFound') || 'Article Not Found'}
          </h1>
          <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed mb-6">
            {t('news.articleNotFoundDesc') ||
              'The announcement or article you are searching for does not exist or may have been archived.'}
          </p>
          <Link
            to="/news"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-burgundy hover:bg-burgundy-light text-white font-medium px-6 py-3 rounded-full transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('news.backToNews') || 'Return to News'}</span>
          </Link>
        </div>
      </div>
    );
  }

  const displayExcerpt = isAmharic && article.excerptAmharic ? article.excerptAmharic : article.excerpt;
  const displayContent = isAmharic && article.contentAmharic ? article.contentAmharic : article.content;
  const displayCategory = isAmharic && article.categoryAmharic ? article.categoryAmharic : article.category;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: displayTitle,
        text: displayExcerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      copy(window.location.href);
    }
  };

  const paragraphs = displayContent
    ? displayContent.split('\n\n').filter((p) => p.trim().length > 0)
    : [displayExcerpt];

  return (
    <article className="bg-ivory min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation Link */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{t('news.backToNews') || 'Back to News'}</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-charcoal/70 hover:text-burgundy bg-white border border-gray-200 hover:border-gold px-3 py-1.5 rounded-full transition-colors shadow-2xs"
            title={t('news.share') || 'Share'}
          >
            <Share2 className="w-3.5 h-3.5 text-gold" />
            <span>{copied ? (t('news.copied') || 'Link Copied!') : (t('news.share') || 'Share')}</span>
          </button>
        </div>

        {/* Article Header Card */}
        <header className="mb-8">
          {/* Category Badge */}
          {displayCategory && (
            <span className="inline-block bg-burgundy/10 text-burgundy border border-burgundy/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              {displayCategory}
            </span>
          )}

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-5">
            {displayTitle}
          </h1>

          {/* Date and Author */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-charcoal/70">
            {article.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                <time dateTime={article.date}>{formatDate(article.date, isAmharic ? 'am-ET' : 'en-US')}</time>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{isAmharic ? 'የደብሩ አስተዳደር' : 'Parish Administration'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-burgundy font-medium">
              <Church className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{t('hero.label') || 'Ethiopian Orthodox Tewahedo Church'}</span>
            </div>
          </div>

          {/* Gold Decorative Divider */}
          <div className="gold-divider w-full mt-6" aria-hidden="true" />
        </header>

        {/* Featured Image */}
        {article.image && (
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-white">
            <img
              src={article.image}
              alt={displayTitle}
              className="w-full h-auto max-h-[520px] object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Article Excerpt Callout (if available) */}
        {displayExcerpt && (
          <div className="mb-8 p-6 rounded-xl bg-gold/10 border-l-4 border-gold text-charcoal/90 font-medium text-lg leading-relaxed italic">
            "{displayExcerpt}"
          </div>
        )}

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-12">
          <div className="prose prose-lg max-w-none text-charcoal/85 text-base sm:text-lg leading-relaxed space-y-6">
            {paragraphs.map((para, index) => (
              <p key={index} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Blessing Footer */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="font-heading text-gold text-base sm:text-lg italic">
              {isAmharic
                ? '«ሰላምና በረከት ለመላው የደብራችን ማኅበረሰብ ይሁን።»'
                : '"Peace and blessings be with our entire parish community."'}
            </p>
          </div>
        </div>

        {/* Bottom Back Navigation */}
        <div className="pt-6 border-t border-gold/30 flex items-center justify-between">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-base font-semibold text-burgundy hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{t('news.backToNews') || 'Back to News'}</span>
          </Link>

          <Link
            to="/"
            className="text-xs sm:text-sm text-charcoal/60 hover:text-burgundy transition-colors"
          >
            {t('common.returnHome') || 'Return to Home'}
          </Link>
        </div>
      </div>
    </article>
  );
}
