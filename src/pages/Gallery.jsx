import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Eye, X, ChevronLeft, Info, Camera } from 'lucide-react';
import { useDocumentTitle } from '../hooks';
import { useLanguage } from '../i18n/LanguageContext';
import { galleryImages, galleryCategories } from '../data/gallery';

/**
 * Photo Gallery Page
 * Features category filtering, responsive thumbnail grid, hover interactions,
 * keyboard-accessible modal lightbox, and placeholder attribution.
 */
export default function Gallery() {
  const { t, currentLanguage } = useLanguage();
  const isAmharic = currentLanguage === 'am';

  useDocumentTitle(t('nav.gallery') || (isAmharic ? 'የፎቶ ማህደር' : 'Gallery'));

  const [activeCategory, setActiveCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper to get localized category name
  const getCategoryLabel = useCallback((category) => {
    if (category === 'All') return t('gallery.all') || (isAmharic ? 'ሁሉም' : 'All');
    if (category === 'Church Building') return t('gallery.categories.churchBuilding') || (isAmharic ? 'የቤተ መቅደስ ሕንፃ' : category);
    if (category === 'Religious Celebrations') return t('gallery.categories.religiousCelebrations') || (isAmharic ? 'ሃይማኖታዊ በዓላት' : category);
    if (category === 'Community Activities') return t('gallery.categories.communityActivities') || (isAmharic ? 'የማኅበረሰብ እንቅስቃሴዎች' : category);
    if (category === 'Church Events') return t('gallery.categories.churchEvents') || (isAmharic ? 'የቤተ ክርስቲያን ዝግጅቶች' : category);
    return category;
  }, [t, isAmharic]);

  // Filter images based on active category
  const filteredImages = useMemo(() => {
    if (!galleryImages || galleryImages.length === 0) return [];
    if (activeCategory === 'All') return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    if (filteredImages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    if (filteredImages.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  // Handle keyboard events (Escape, ArrowLeft, ArrowRight) and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeLightbox, nextImage, prevImage]);

  const currentImage = filteredImages[currentIndex];

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
              {t('nav.gallery') || (isAmharic ? 'የፎቶ ማህደር' : 'Gallery')}
            </span>
          </nav>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t('gallery.title') || (isAmharic ? 'የፎቶ እና ቪዲዮ ማህደር' : 'Photo Gallery')}
          </h1>
          <div className="h-1 w-20 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14">
        {/* Placeholder Notice */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gold/10 border border-gold/30 text-charcoal/85 text-xs sm:text-sm text-center shadow-xs">
            <Info className="w-4 h-4 text-gold flex-shrink-0" />
            <span>
              {t('gallery.sampleNotice') ||
                (isAmharic
                  ? 'የቀረቡት ፎቶግራፎች የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያንን ቅዱስ ሥርዓትና አምልኮት የሚያሳዩ ናሙናዎች ናቸው።'
                  : 'Photos shown are temporary placeholder images. Church photographs will be added when provided.')}
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {galleryCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-burgundy text-white shadow-sm ring-2 ring-burgundy/30'
                    : 'bg-white border border-gray-200 text-charcoal hover:border-gold hover:text-burgundy'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            );
          })}
        </div>

        {/* Image Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {filteredImages.map((image, idx) => {
              const currentCaption = isAmharic && image.captionAmharic ? image.captionAmharic : image.caption;
              const currentAlt = isAmharic && image.altAmharic ? image.altAmharic : (image.alt || (isAmharic ? 'የደብሩ ፎቶግራፍ' : 'Parish photograph'));
              const currentCategoryName = isAmharic && image.categoryAmharic ? image.categoryAmharic : image.category;

              return (
                <div
                  key={image.id || idx}
                  onClick={() => openLightbox(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 aspect-square shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  role="button"
                  tabIndex={0}
                  aria-label={isAmharic ? `ፎቶ ይመልከቱ: ${currentCaption || currentAlt}` : `View photo: ${currentCaption || currentAlt}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(idx);
                    }
                  }}
                >
                  {/* Thumbnail Image */}
                  <img
                    src={image.src}
                    alt={currentAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Hover Overlay with Eye Icon */}
                  <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                    <div className="w-11 h-11 rounded-full bg-gold/90 text-charcoal flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-md mb-2">
                      <Eye className="w-5 h-5" />
                    </div>
                    {currentCaption && (
                      <p className="text-white text-xs line-clamp-2 px-2 font-medium">
                        {currentCaption}
                      </p>
                    )}
                    {currentCategoryName && (
                      <span className="mt-1 text-[10px] uppercase tracking-wider text-gold font-semibold">
                        {currentCategoryName}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100 max-w-md mx-auto">
            <Camera className="w-12 h-12 text-gold mx-auto mb-3 opacity-60" />
            <p className="text-charcoal/70">
              {isAmharic ? 'በዚህ ምድብ ውስጥ የተካተቱ ፎቶዎች የሉም።' : 'No photos available in this category.'}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={isAmharic ? 'የምስል ማሳያ' : 'Image Lightbox'}
        >
          {/* Top Control Bar */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-3">
            <span className="text-white/70 text-xs sm:text-sm font-medium">
              {currentIndex + 1} / {filteredImages.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label={t('gallery.close') || (isAmharic ? 'ዝጋ' : 'Close Lightbox')}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            aria-label={t('gallery.prev') || (isAmharic ? 'ቀዳሚ' : 'Previous Image')}
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            aria-label={t('gallery.next') || (isAmharic ? 'ቀጣይ' : 'Next Image')}
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Modal Content Container (prevents backdrop click on image itself) */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Centered Large Image */}
            <div className="relative max-h-[70vh] flex items-center justify-center overflow-hidden rounded-lg shadow-2xl bg-black">
              <img
                src={currentImage.src}
                alt={isAmharic && currentImage.altAmharic ? currentImage.altAmharic : (currentImage.alt || (isAmharic ? 'የተለቀቀ ፎቶ' : 'Enlarged photo'))}
                className="max-h-[70vh] w-auto max-w-full object-contain animate-fade-in"
              />
            </div>

            {/* Caption & Category Footer */}
            <div className="mt-4 text-center max-w-2xl px-4">
              {(isAmharic && currentImage.captionAmharic ? currentImage.captionAmharic : currentImage.caption) && (
                <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                  {isAmharic && currentImage.captionAmharic ? currentImage.captionAmharic : currentImage.caption}
                </p>
              )}
              {(isAmharic && currentImage.categoryAmharic ? currentImage.categoryAmharic : currentImage.category) && (
                <p className="text-gold text-xs uppercase tracking-wider font-semibold mt-1">
                  {isAmharic && currentImage.categoryAmharic ? currentImage.categoryAmharic : currentImage.category}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
