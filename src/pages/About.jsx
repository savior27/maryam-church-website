import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Target,
  Eye,
  Heart,
  BookOpen,
  Users,
  Star,
  Info,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useInView, useDocumentTitle } from '../hooks';
import churchConfig from '../data/churchConfig';
import SectionHeading from '../components/SectionHeading';
import { isPlaceholder } from '../utils';

/**
 * About Page Component
 * 
 * Provides an in-depth introduction to the Ethiopian Orthodox Tewahedo Church parish,
 * including historical background, mission & vision statements, core spiritual values,
 * and an invitation to join the community.
 * Fully localized with immediate language switching support.
 */
export default function About() {
  const { t } = useLanguage();
  useDocumentTitle(t('nav.about') || 'About Us');

  // Scroll animations using useInView
  const [storyRef, storyInView] = useInView({ threshold: 0.1 });
  const [missionRef, missionInView] = useInView({ threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1 });
  const [communityRef, communityInView] = useInView({ threshold: 0.15 });

  const isFoundedPlaceholder = isPlaceholder(churchConfig.founded);

  return (
    <div className="bg-ivory min-h-screen">
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section
        className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-charcoal"
        aria-label="About Hero Banner"
      >
        {/* Background Image with Dark & Burgundy Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-center bg-[center_top] transition-transform duration-700 ease-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1548407260-da850faa41e8?w=1920&q=80')",
          }}
          role="img"
          aria-label="Ethiopian Orthodox Church sanctuary altar"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-burgundy-dark/75" />

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
              {t('nav.about') || 'About Us'}
            </span>
          </nav>

          {/* Page Title */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide drop-shadow-md">
            {t('about.title') || 'About Our Church'}
          </h1>

          {/* Gold Decorative Line */}
          <div
            className="w-16 h-1 bg-gold rounded-full mx-auto mt-4"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTENT SECTION: OUR STORY & HERITAGE
          ========================================================================= */}
      <section
        ref={storyRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        aria-labelledby="story-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Church Image Placeholder with Accent */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ${
              storyInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative">
              {/* Decorative background framing */}
              <div
                className="absolute -inset-2 bg-gradient-to-tr from-gold/30 to-burgundy/25 rounded-2xl blur-sm -z-10"
                aria-hidden="true"
              />

              <img
                src="https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800"
                alt="Ethiopian Orthodox Church ancient cross and holy sanctuary"
                className="w-full h-auto object-contain rounded-2xl shadow-xl border-4 border-white"
                loading="lazy"
              />

              {/* Founded Badge */}
              <div className="absolute -bottom-4 -right-4 sm:right-6 bg-burgundy text-white px-5 py-3 rounded-xl shadow-lg border border-gold/40 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gold" aria-hidden="true" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">
                    {t('about.foundedBadge') || 'Parish History'}
                  </span>
                  <span className="text-sm font-semibold">
                    {isFoundedPlaceholder
                      ? t('about.historicalParish') || 'Historical Parish'
                      : `${t('about.est') || 'Est.'} ${churchConfig.founded}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Story */}
          <div
            className={`lg:col-span-7 transition-all duration-700 animation-delay-200 ${
              storyInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            <SectionHeading
              label={t('about.storyLabel') || 'Ancient Apostolic Legacy'}
              title={t('about.storyHeading') || 'Our Story & Faith Tradition'}
              align="left"
              className="mb-6"
            />

            <div className="space-y-4 text-charcoal/80 text-base md:text-lg leading-relaxed">
              <p>
                {t('about.storyP1') ||
                  "The Ethiopian Orthodox Tewahedo Church stands among the most ancient Christian communions in the world, tracing its biblical foundations to the Old Testament faith of ancient Israel, the baptism of the Ethiopian Eunuch by Apostle Philip (Acts 8:26–40), and the official proclamation of Christianity as the state faith in the 4th century under the guidance of Saint Frumentius (Abba Selama, Kesate Berhan)."}
              </p>

              <p>
                {t('about.storyP2') ||
                  "Through the centuries, our holy church has faithfully safeguarded apostolic doctrine, sacred hymnody composed by Saint Yared, monastic spiritual ascetics, and holy patristic canons. Our parish carries forward this living spiritual legacy, cultivating prayerful devotion, holy communion, and genuine Christian love."}
              </p>

              <p>
                {t('about.storyP3') ||
                  "As a local parish community, our church continues this living testimony today. We provide a sacred home for spiritual nourishment, communal prayer, holy baptism, marriage blessings, Sunday School education, and compassionate community service."}
              </p>
            </div>

            {/* Historical Verification Notice Box */}
            <div className="mt-8 bg-gold/10 border border-gold/30 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 text-xs sm:text-sm text-charcoal/80">
              <Info className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-semibold text-charcoal block mb-0.5">
                  {t('about.noticeTitle') || 'Notice on Archival Chronicles'}
                </span>
                <p>
                  {t('about.noticeText') ||
                    'Detailed parish historical records, clergy biographies, and founding milestones displayed here are representative placeholders. Official verified archival chronicles and founding records will be updated and published by the church administration.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MISSION & VISION SECTION
          ========================================================================= */}
      <section
        ref={missionRef}
        className="bg-white py-16 md:py-24 border-y border-gray-100"
        aria-labelledby="mission-vision-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label={t('about.missionVisionLabel') || 'Purpose & Future'}
            title={t('about.missionVisionTitle') || 'Our Mission & Vision'}
            subtitle={
              t('about.missionVisionSubtitle') ||
              'Guiding our congregation in apostolic devotion, mutual love, and heavenly service'
            }
          />

          {/* Two Cards Side by Side */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${
              missionInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Mission Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8 border border-gray-100 border-t-4 border-t-gold flex flex-col justify-between">
              <div>
                {/* Target Icon */}
                <div className="w-14 h-14 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-gold" aria-hidden="true" />
                </div>

                <h3 className="font-heading text-2xl font-bold text-charcoal mb-4">
                  {t('about.mission') || 'Our Mission'}
                </h3>

                <p className="text-charcoal/80 text-base leading-relaxed mb-6">
                  {t('about.missionDesc') ||
                    'To proclaim the Holy Gospel of Our Lord and Savior Jesus Christ, faithfully administer the seven sacred mysteries (sacraments) according to ancient Ethiopian Orthodox Tewahedo canons, nurture sound biblical and theological education for youth and adults, and extend compassionate Christian charity to our neighbors and the wider world.'}
                </p>
              </div>

              {/* Sample Tag */}
              <div className="pt-4 border-t border-gray-100 text-xs text-charcoal/50 italic">
                {t('about.missionSample') || '* Sample mission statement — subject to parish clergy review'}
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8 border border-gray-100 border-t-4 border-t-gold flex flex-col justify-between">
              <div>
                {/* Eye Icon */}
                <div className="w-14 h-14 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-burgundy" aria-hidden="true" />
                </div>

                <h3 className="font-heading text-2xl font-bold text-charcoal mb-4">
                  {t('about.vision') || 'Our Vision'}
                </h3>

                <p className="text-charcoal/80 text-base leading-relaxed mb-6">
                  {t('about.visionDesc') ||
                    'To be a vibrant spiritual haven where souls find divine peace, where generations grow united in holiness and Orthodox Christian values, where our sacred religious and cultural heritage thrives, and where the light of Christ’s love transforms families and communities.'}
                </p>
              </div>

              {/* Sample Tag */}
              <div className="pt-4 border-t border-gray-100 text-xs text-charcoal/50 italic">
                {t('about.visionSample') || '* Sample vision statement — subject to parish clergy review'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR VALUES SECTION
          ========================================================================= */}
      <section
        ref={valuesRef}
        className="bg-ivory py-16 md:py-24"
        aria-labelledby="values-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label={t('about.valuesLabel') || 'Spiritual Pillars'}
            title={t('about.valuesTitle') || 'Our Core Values'}
            subtitle={
              t('about.valuesSubtitle') ||
              'The foundational virtues that define our communal worship and Christian witness'
            }
          />

          {/* Grid of 4 Value Cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${
              valuesInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Value 1: Faith & Prayer */}
            <div className="bg-white rounded-xl p-6 sm:p-7 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-5 flex-shrink-0">
                <Heart className="w-7 h-7 text-gold" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-bold text-charcoal mb-2">
                {t('about.values.faith') || 'Faith & Prayer'}
              </h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                {t('about.values.faithDesc') ||
                  'Devout prayer, holy fasting, and continuous adoration of the Holy Trinity through sacred liturgy and personal devotion.'}
              </p>
            </div>

            {/* Value 2: Scripture & Learning */}
            <div className="bg-white rounded-xl p-6 sm:p-7 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-5 flex-shrink-0">
                <BookOpen className="w-7 h-7 text-gold" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-bold text-charcoal mb-2">
                {t('about.values.scripture') || 'Scripture & Learning'}
              </h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                {t('about.values.scriptureDesc') ||
                  'Commitment to biblical truth, the writings of the Holy Fathers, and continuous spiritual instruction across all ages.'}
              </p>
            </div>

            {/* Value 3: Community & Fellowship */}
            <div className="bg-white rounded-xl p-6 sm:p-7 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-5 flex-shrink-0">
                <Users className="w-7 h-7 text-gold" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-bold text-charcoal mb-2">
                {t('about.values.community') || 'Community & Fellowship'}
              </h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                {t('about.values.communityDesc') ||
                  'Nurturing genuine Christian unity, embracing every family with open arms, and supporting one another through every season.'}
              </p>
            </div>

            {/* Value 4: Service & Charity */}
            <div className="bg-white rounded-xl p-6 sm:p-7 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-5 flex-shrink-0">
                <Star className="w-7 h-7 text-gold" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-bold text-charcoal mb-2">
                {t('about.values.service') || 'Service & Charity'}
              </h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                {t('about.values.serviceDesc') ||
                  'Living the Gospel through active works of mercy, visiting the sick and elderly, and extending loving support to the needy.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMMUNITY SECTION: FULL WIDTH BANNER WITH TEXT OVERLAY
          ========================================================================= */}
      <section
        ref={communityRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
        aria-labelledby="community-heading"
      >
        <div
          className={`relative rounded-3xl overflow-hidden shadow-2xl min-h-[360px] flex items-center justify-center p-8 sm:p-14 text-center bg-charcoal transition-all duration-700 ${
            communityInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Background Image with Rich Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1548407260-da850faa41e8?w=1600')",
            }}
            role="img"
            aria-label="Orthodox parishioners gathering in worship"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy-dark/95 via-charcoal/90 to-burgundy-dark/95" />

          {/* Content Overlay */}
          <div className="relative z-10 max-w-3xl mx-auto text-white">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 mb-4 inline-block">
              {t('about.communityLabel') || 'Belonging & Fellowship'}
            </span>

            <h2
              id="community-heading"
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4"
            >
              {t('about.communityTitle') || 'A Loving Community Rooted in Eternal Faith'}
            </h2>

            <div className="w-16 h-1 bg-gold rounded-full mx-auto mb-6" aria-hidden="true" />

            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              {t('about.communityDesc') ||
                'Whether you are an established member of our parish or stepping into an Ethiopian Orthodox sanctuary for the first time, you are welcome here. Experience ancient worship, receive spiritual counsel, and find your spiritual home.'}
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-burgundy"
            >
              <span>{t('about.communityBtn') || 'Connect With Us Today'}</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
