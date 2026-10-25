import { Link } from 'react-router-dom';
import { ChevronRight, Heart, HandHeart, AlertCircle, ArrowRight, ShieldCheck, Church } from 'lucide-react';
import { useDocumentTitle } from '../hooks';
import { useLanguage } from '../i18n/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import DonationCard from '../components/DonationCard';
import churchBuildingImage from '../images/photo_2026-10-24_21-55-15.jpg';

/**
 * Donations & Church Support Page
 * Provides bank account transfer details, step-by-step instructions,
 * security advisories, and pastoral gratitude.
 */
export default function Donations() {
  const { t, currentLanguage } = useLanguage();
  const isAmharic = currentLanguage === 'am';

  useDocumentTitle(t('donation.title') || (isAmharic ? 'ቤተ ክርስቲያናችንን ይደግፉ' : 'Support Our Church'));

  const transferSteps = [
    t('donation.step1') ||
      (isAmharic
        ? 'ከላይ የተጠቀሰውን ይፋዊ የቤተ ክርስቲያን የባንክ ሂሳብ ቁጥር ይቅዱ።'
        : "Copy the church's verified account number."),
    t('donation.step2') ||
      (isAmharic
        ? 'የሞባይል ባንክ መተግበሪያዎን ይክፈቱ ወይም በአቅራቢያዎ ወደሚገኝ ባንክ ቅርንጫፍ ይሂዱ።'
        : 'Open your preferred banking application or visit your bank.'),
    t('donation.step3') ||
      (isAmharic
        ? 'የሂሳብ ባለቤቱ ስም ከቤተ ክርስቲያናችን ስም ጋር መመሳሰሉን ያረጋግጡ።'
        : 'Transfer your contribution using the official account details.'),
    t('donation.step4') ||
      (isAmharic
        ? 'የልገሳዎን መጠን በማስገባት ክፍያውን በሰላም ያጠናቅቁና ደረሰኝዎን ይያዙ።'
        : 'Keep your transaction receipt.'),
  ];

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden flex items-center justify-center bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transform transition-transform duration-1000"
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
              {t('nav.donations') || t('donation.title') || (isAmharic ? 'ቤተ ክርስቲያናችንን ይደግፉ' : 'Support Our Church')}
            </span>
          </nav>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t('donation.title') || (isAmharic ? 'ቤተ ክርስቲያናችንን ይደግፉ' : 'Support Our Church')}
          </h1>
          <div className="h-1 w-20 bg-gold mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 space-y-12 md:space-y-16">
        {/* Introduction Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-gold mb-4 shadow-2xs">
            <Heart className="w-6 h-6 fill-gold/20" />
          </div>
          <SectionHeading
            label={t('donation.generosityLabel') || (isAmharic ? 'ልግስናና መንፈሳዊ ኃላፊነት' : 'Generosity & Stewardship')}
            title={t('donation.title') || (isAmharic ? 'ቤተ ክርስቲያናችንን ይደግፉ' : 'Support Our Church')}
            subtitle={
              t('donation.subtitle') ||
              (isAmharic
                ? 'የእርስዎ ልግስና እና አስራት ለቤተ መቅደሳችን አገልግሎት መጠናከርና መስፋፋት ወሳኝ ነው'
                : 'Your generosity can help support our church, its spiritual activities, and its community services. Thank you for considering a contribution.')
            }
          />
        </div>

        {/* Important Notice */}
        <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-xl bg-gold/10 border border-gold/30 text-charcoal/85 text-xs sm:text-sm flex items-start gap-3 shadow-2xs">
          <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-charcoal font-semibold">
              {t('donation.importantNoticeTitle') || (isAmharic ? 'አስፈላጊ ማስታወሻ፦ ' : 'Important Notice: ')}
            </strong>
            {t('donation.importantNoticeText') ||
              (isAmharic
                ? 'ይህ ድረ-ገጽ የባንክ መረጃዎችን ብቻ ያሳያል፤ ክፍያዎችን በቀጥታ አይቀበልም። እባክዎ ይፋዊውን የቤተ ክርስቲያን የባንክ ሂሳብ መጠቀሞን ያረጋግጡ።'
                : 'This website displays donation instructions only. It does not process or verify payments. Please ensure you are using the official church bank account details.')}
          </p>
        </div>

        {/* Bank Account Card */}
        <section aria-labelledby="bank-account-heading" className="max-w-lg mx-auto">
          <h2 id="bank-account-heading" className="sr-only">
            {t('donation.churchAccountDetails') || (isAmharic ? 'የቤተ ክርስቲያኑ የባንክ ሂሳብ መረጃ' : 'Bank Account Transfer')}
          </h2>
          <DonationCard />
        </section>

        {/* Donation Instructions Steps */}
        <section
          aria-labelledby="donation-steps-heading"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-gold" />
            <h3
              id="donation-steps-heading"
              className="font-heading text-xl sm:text-2xl font-bold text-charcoal text-center"
            >
              {t('donation.instructionsTitle') || (isAmharic ? 'ልገሳዎን እንዴት ማስተላለፍ እንደሚችሉ' : 'Donation Instructions')}
            </h3>
          </div>

          <ol className="space-y-5">
            {transferSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-gold text-white font-bold flex items-center justify-center flex-shrink-0 text-sm shadow-xs mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-charcoal/85 text-sm sm:text-base leading-relaxed">
                    {step}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Thank You Section */}
        <section
          aria-labelledby="thank-you-heading"
          className="bg-white rounded-2xl border border-gold/40 shadow-md p-8 sm:p-10 max-w-3xl mx-auto text-center relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto mb-4">
            <HandHeart className="w-8 h-8" />
          </div>
          <h3
            id="thank-you-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3"
          >
            {isAmharic ? 'ስለ ቅዱስ ድጋፍዎ እናመሰግናለን' : 'Thank You for Your Sacred Support'}
          </h3>
          <p className="text-charcoal/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-4">
            {isAmharic
              ? '«እያንዳንዱ በልቡ እንዳሰበ ይስጥ፥ በኀዘን ወይም በግድ አይደለም፤ እግዚአብሔር በደስታ የሚሰጠውን ይወዳልና።» (፪ኛ ቆሮንቶስ ፱፥፯)'
              : '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." (2 Corinthians 9:7)'}
          </p>
          <p className="text-xs sm:text-sm text-gold-dark font-medium italic">
            {t('donation.thankYou') ||
              (isAmharic
                ? 'ልዑል እግዚአብሔር ስለ መልካም አሳብዎና በጎ ልገሳዎ አብዝቶ ይባርክዎ።'
                : 'May the Almighty God multiply your blessings, peace, and health for supporting His holy altar and community.')}
          </p>
        </section>

        {/* =========================================================================
            CHURCH BUILDING FUNDRAISING SECTION
            ========================================================================= */}
        <section
          aria-labelledby="church-building-heading"
          className="relative bg-charcoal rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto"
        >
          {/* Church Photo */}
          <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden">
            <img
              src={churchBuildingImage}
              alt={isAmharic
                ? 'እየተገነባ ያለው የቅድስት ማርያም ቤተ ክርስቲያን'
                : 'St. Mary Ethiopian Orthodox Tewahedo Church building'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <Church className="w-4.5 h-4.5 text-gold" aria-hidden="true" />
              </div>
              <span className="text-xs uppercase tracking-widest text-gold font-semibold drop-shadow">
                {isAmharic ? 'የቤተ መቅደስ ግንባታ' : 'Church Building Project'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-8 md:px-10 py-8 sm:py-10 space-y-6">
            {/* Heading */}
            <div className="text-center">
              <h3
                id="church-building-heading"
                className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3"
              >
                {isAmharic
                  ? 'የእግዚአብሔርን ቤት ለማጠናቀቅ ይርዱን'
                  : 'Help Us Complete the House of God'}
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full mx-auto" aria-hidden="true" />
            </div>

            {/* Scripture */}
            <blockquote className="text-center px-4">
              <p className="text-gold/90 italic text-sm sm:text-base font-serif leading-relaxed">
                {isAmharic
                  ? '«የሰማዩ አምላክ ያከናውንልናል፤ እኛ ባሪያዎቹም ተነሥተን እንሠራለን።»'
                  : '"The God of heaven will give us success. We his servants will start rebuilding."'}
              </p>
              <cite className="block mt-1.5 text-xs text-gold/60 font-semibold not-italic tracking-wide">
                {isAmharic ? '— ነህምያ ፪፥፳' : '— Nehemiah 2:20'}
              </cite>
            </blockquote>

            {/* Message */}
            <div className="space-y-4 text-white/85 text-sm sm:text-base leading-relaxed">
              <p>
                {isAmharic
                  ? 'በከታቤሮ፣ አጋሮ፣ ኢትዮጵያ የምትገኘው የተወደደችው የቅድስት ማርያም ኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያናችን አዲስ የአምልኮ ቤት በመገንባት ላይ ትገኛለች። በእግዚአብሔር ጸጋና በማኅበረሰባችን ቁርጠኝነት ግንባታው ተጀምሮ ቢራመድም ይህን ቅዱስ ስፍራ ለማጠናቀቅ ገና ብዙ ሥራ ይቀራል።'
                  : 'Our beloved St. Mary Ethiopian Orthodox Tewahedo Church in Ketabero, Agaro, Ethiopia, is in the process of building a new house of worship. Through God\'s grace and the dedication of our community, construction has progressed, but work remains to complete this sacred place.'}
              </p>
              <p>
                {isAmharic
                  ? 'ምዕመናንን፣ ቤተሰቦችን፣ ወዳጆችንና ሁሉንም በጎ ፈቃደኞች ይህን ቅዱስ ሥራ ለማጠናቀቅ እንዲቀላቀሉን በፍቅር እንጋብዛለን።'
                  : 'We warmly invite our faithful, families, friends, and all people of goodwill to join us in completing this holy work.'}
              </p>
              <p>
                {isAmharic
                  ? 'የእርስዎ ልገሳ ትልቅም ይሁን ትንሽ — መጪዎቹ ትውልዶች እግዚአብሔርን የሚያመልኩበት፣ መንፈሳዊ መመሪያ የሚያገኙበት፣ ቅዱሳት ምሥጢራትን የሚያከብሩበትና በእምነት የሚያድጉበትን ቅዱስ ስፍራ ለማጠናቀቅ ያግዛል።'
                  : 'Your contribution, whether large or small, can help us complete a place where future generations can worship God, receive spiritual guidance, celebrate the Holy Sacraments, and grow in faith.'}
              </p>
              <p className="font-medium text-white">
                {isAmharic
                  ? 'በእምነት፣ በፍቅርና በልግስና ተባብረን የእግዚአብሔርን ቤት እናጠናቅቅ።'
                  : 'Together, with faith, love, and generosity, we can complete the house of God.'}
              </p>
            </div>

            {/* Decorative divider */}
            <div className="w-12 h-0.5 bg-gold/40 rounded-full mx-auto" aria-hidden="true" />

            {/* Closing statement */}
            <p className="text-center text-gold font-heading text-sm sm:text-base font-semibold italic tracking-wide">
              {isAmharic
                ? 'በፍቅር ስጡ። በእምነት ገንቡ። ለመጪዎቹ ትውልዶች ቅርስ ተዉ።'
                : 'Give with love. Build with faith. Leave a legacy for generations to come.'}
            </p>

            {/* CTA Button — links to Contact page */}
            <div className="text-center pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal text-sm sm:text-base"
              >
                <Heart className="w-4.5 h-4.5 fill-white/20" aria-hidden="true" />
                <span>
                  {isAmharic
                    ? 'የቤተ ክርስቲያን ግንባታን ይደግፉ'
                    : 'Support Our Church Building'}
                </span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Other Methods */}
        <div className="max-w-2xl mx-auto text-center pt-4">
          <p className="text-xs sm:text-sm text-charcoal/70 mb-3">
            {isAmharic
              ? 'ተጨማሪ የልገሳ አማራጮች ወደፊት ሊጨመሩ ይችላሉ። ለበለጠ መረጃ እባክዎ ቤተ ክርስቲያኑን ያነጋግሩ።'
              : 'Additional donation methods may be added. Please contact the church for more information.'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-burgundy hover:text-gold transition-colors group"
          >
            <span>{isAmharic ? 'የቤተ ክርስቲያኑን አስተዳደር ያነጋግሩ' : 'Contact Church Administration'}</span>
            <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
