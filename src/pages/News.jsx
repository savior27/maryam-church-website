import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, ArrowRight, Sparkles, Info, Tag } from 'lucide-react';
import { useDocumentTitle } from '../hooks';
import { useLanguage } from '../i18n/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import NewsCard from '../components/NewsCard';
import news from '../data/news';
import { formatDate } from '../utils';

/**
 * News & Announcements Listing Page
 * Displays church news, announcements, liturgical celebrations, and community updates
 * with complete multi-language support.
 */
export default function News() {
  const { t, currentLanguage } = useLanguage();
  useDocumentTitle(t('nav.news') || 'News & Announcements');
  const isAmharic = currentLanguage === 'am';

  const featuredArticle = news.find((item) => item.featured) || (news.length > 0 ? news[0] : null);
  const recentArticles = featuredArticle
    ? news.filter((item) => item.id !== featuredArticle.id)
    : news;

  return (
    <div className="bg-ivory min-h-screen pb-20">
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

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs sm:text-sm text-ivory/80 mb-3"
          >
            <Link to="/" className="hover:text-gold transition-colors duration-200">
              {t('nav.home') || 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gold/70" />
            <span className="text-gold font-medium">{t('nav.news') || 'News'}</span>
          </nav>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t('news.title') || 'News & Announcements'}
          </h1>
          <div className="h-1 w-20 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        {/* Sample Notice Banner */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg bg-gold/10 border border-gold/30 text-charcoal/80 text-xs sm:text-sm text-center">
            <Info className="w-4 h-4 text-gold flex-shrink-0" />
            <span>{t('news.sampleNotice') || 'News items shown are sample content.'}</span>
          </div>
        </div>

        {/* Featured Article Section */}
        {featuredArticle && (
          <section className="mb-16 md:mb-20" aria-labelledby="featured-news-heading">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-gold" />
              <h2
                id="featured-news-heading"
                className="font-heading text-2xl md:text-3xl font-bold text-charcoal"
              >
                {t('news.featured') || 'Featured Announcement'}
              </h2>
            </div>

            <article className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gold/20 hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Image (Left on desktop) */}
                <div className="lg:col-span-7 relative overflow-hidden aspect-video lg:aspect-auto min-h-[300px] md:min-h-[380px] bg-ivory">
                  <img
                    src={featuredArticle.image}
                    alt={isAmharic && featuredArticle.titleAmharic ? featuredArticle.titleAmharic : featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-burgundy text-white font-semibold text-xs tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md border border-gold/30 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      {t('news.featured') || 'Featured'}
                    </span>
                    {(featuredArticle.category || featuredArticle.categoryAmharic) && (
                      <span className="bg-charcoal/85 backdrop-blur-xs text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                        {isAmharic && featuredArticle.categoryAmharic ? featuredArticle.categoryAmharic : featuredArticle.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content (Right on desktop) */}
                <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-white">
                  <div>
                    {/* Date */}
                    {featuredArticle.date && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-charcoal/60 mb-3">
                        <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                        <time dateTime={featuredArticle.date}>
                          {formatDate(featuredArticle.date, isAmharic ? 'am-ET' : 'en-US')}
                        </time>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal hover:text-burgundy transition-colors leading-tight mb-4">
                      <Link to={`/news/${featuredArticle.id}`}>
                        {isAmharic && featuredArticle.titleAmharic ? featuredArticle.titleAmharic : featuredArticle.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-charcoal/80 text-base leading-relaxed line-clamp-4 mb-6">
                      {isAmharic && featuredArticle.excerptAmharic ? featuredArticle.excerptAmharic : featuredArticle.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      to={`/news/${featuredArticle.id}`}
                      className="inline-flex items-center gap-2 text-base font-semibold text-burgundy hover:text-gold transition-colors group"
                    >
                      <span>{t('news.readMore') || 'Read More'}</span>
                      <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Recent Announcements Grid */}
        <section aria-labelledby="recent-announcements-heading">
          <SectionHeading
            label={t('news.label') || 'Parish Updates'}
            title={t('news.recent') || 'Recent Announcements'}
            subtitle={t('news.subtitle') || 'Stay connected with ongoing church liturgies, spiritual gatherings, and parish activities.'}
          />

          {recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {recentArticles.map((item) => (
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
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100 max-w-md mx-auto">
              <Tag className="w-12 h-12 text-gold mx-auto mb-3 opacity-60" />
              <p className="text-charcoal/70">
                {isAmharic ? 'በዚህ ወቅት የተመዘገበ ሌላ ዜና የለም።' : 'No other announcements at this time.'}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
