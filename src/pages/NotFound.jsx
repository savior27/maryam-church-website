import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Church } from 'lucide-react';
import { useDocumentTitle } from '../hooks';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * 404 Not Found Page
 * Dignified, spiritually respectful 404 error page with Ethiopian Orthodox motif
 * and simple navigation back to safety.
 */
export default function NotFound() {
  const { t, currentLanguage } = useLanguage();
  const isAmharic = currentLanguage === 'am';

  useDocumentTitle(t('common.pageNotFound') || (isAmharic ? 'ገጹ አልተገኘም' : 'Page Not Found'));

  return (
    <div className="bg-ivory min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Decorative Church Cross Motif */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gold/15 border-2 border-gold/40 flex items-center justify-center text-gold shadow-sm mb-3">
            {/* Ethiopian Orthodox Cross / Church Icon */}
            <Church className="w-10 h-10 text-gold" aria-hidden="true" />
          </div>
          {/* Decorative Gold Cross Line */}
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 bg-gold/50 rounded-full" />
            <span className="text-gold text-lg">✝</span>
            <div className="h-0.5 w-8 bg-gold/50 rounded-full" />
          </div>
        </div>

        {/* Large 404 Headline */}
        <p className="font-heading text-8xl md:text-9xl font-bold text-gold tracking-tight select-none mb-2 drop-shadow-xs">
          404
        </p>

        {/* Heading */}
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4">
          {t('common.pageNotFound') || (isAmharic ? 'ገጹ አልተገኘም' : 'Page Not Found')}
        </h1>

        {/* Description */}
        <p className="text-charcoal/70 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-8">
          {t('common.pageNotFoundDesc') ||
            (isAmharic
              ? 'የፈለጉት ገጽ አልተገኘም ወይም ተዛውሯል።'
              : "The page you're looking for doesn't exist or has been moved.")}
        </p>

        {/* Navigation Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-burgundy hover:bg-burgundy-light text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>{t('common.returnHome') || (isAmharic ? 'ወደ ዋና ገጽ ይመለሱ' : 'Return to Home')}</span>
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-charcoal font-semibold px-6 py-3.5 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>{t('common.goBack') || (isAmharic ? 'ወደ ኋላ ተመለስ' : 'Go Back')}</span>
          </button>
        </div>

        {/* Spiritual footer blessing */}
        <div className="mt-12 pt-8 border-t border-gold/20">
          <p className="text-xs text-charcoal/50 italic">
            {t('common.scriptureVerse') ||
              (isAmharic
                ? '«በሙሉ ልብህ በእግዚአብሔር ታመን፥ በራስህም ማስተዋል አትደገፍ፤» (ምሳሌ 3፥5)'
                : '"Trust in the Lord with all your heart, and do not lean on your own understanding." (Proverbs 3:5)')}
          </p>
        </div>
      </div>
    </div>
  );
}
