import { useLanguage } from '../i18n/LanguageContext';

const AMHARIC_MONTHS = [
  'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ',
  'ሐምሌ', 'ነሐሴ', 'መስከረም', 'ጥቅምት', 'ሕዳር', 'ታኅሣሥ'
];

/**
 * Extracts month abbreviation and day string from various date formats
 */
function parseEventDate(rawDate, isAmharic) {
  if (!rawDate) {
    return { month: isAmharic ? 'ቀን' : 'DATE', day: '--' };
  }

  if (typeof rawDate === 'object' && rawDate.month && rawDate.day) {
    return rawDate;
  }

  const dateString = String(rawDate).trim();
  const parsed = new Date(dateString);

  if (!isNaN(parsed.getTime())) {
    const monthIndex = parsed.getMonth();
    return {
      month: isAmharic ? AMHARIC_MONTHS[monthIndex] : parsed.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: String(parsed.getDate()),
    };
  }

  const tokens = dateString.split(/[\s,]+/);
  if (tokens.length >= 2) {
    return {
      month: tokens[0].slice(0, 3).toUpperCase(),
      day: tokens[1],
    };
  }

  return {
    month: isAmharic ? 'ቀን' : dateString.slice(0, 3).toUpperCase(),
    day: '--',
  };
}

/**
 * EventCard Component
 * 
 * Displays an event or liturgical calendar entry with a styled date block
 * and color-coded indicator based on event type, with full translation support.
 */
export default function EventCard({
  title,
  titleAmharic,
  date,
  type = 'event',
  description,
  descriptionAmharic,
}) {
  const { t, currentLanguage } = useLanguage();
  const isAmharic = currentLanguage === 'am';

  const EVENT_TYPE_STYLES = {
    feast: {
      boxBg: 'bg-burgundy text-white',
      borderColor: 'border-l-burgundy',
      badge: 'bg-burgundy/10 text-burgundy border border-burgundy/20',
      label: t('calendar.feastDay') || 'Feast Day',
    },
    fast: {
      boxBg: 'bg-green-deep text-white',
      borderColor: 'border-l-green-deep',
      badge: 'bg-green-deep/10 text-green-deep border border-green-deep/20',
      label: t('calendar.fastingPeriod') || 'Fasting Period',
    },
    saint: {
      boxBg: 'bg-gold text-white',
      borderColor: 'border-l-gold',
      badge: 'bg-gold/15 text-gold-dark border border-gold/30',
      label: t('calendar.saintsDay') || "Saint's Day",
    },
    event: {
      boxBg: 'bg-charcoal text-white',
      borderColor: 'border-l-charcoal',
      badge: 'bg-charcoal/10 text-charcoal border border-charcoal/20',
      label: t('calendar.churchEvent') || 'Church Event',
    },
  };

  const normalizedType = typeof type === 'string' ? type.toLowerCase() : 'event';
  const typeConfig = EVENT_TYPE_STYLES[normalizedType] || EVENT_TYPE_STYLES.event;
  const { month, day } = parseEventDate(date, isAmharic);

  const displayTitle = isAmharic && titleAmharic ? titleAmharic : title;
  const displayDescription = isAmharic && descriptionAmharic ? descriptionAmharic : description;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border-l-4 ${typeConfig.borderColor}`}
    >
      {/* Left: Date Display Block */}
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow-xs ${typeConfig.boxBg}`}
      >
        <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase opacity-90 leading-none mb-1">
          {month}
        </span>
        <span className="font-heading text-2xl sm:text-3xl font-bold leading-none">
          {day}
        </span>
      </div>

      {/* Right: Event title, description, and type badge */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${typeConfig.badge}`}>
            {typeConfig.label}
          </span>
        </div>

        <h3 className="font-heading text-lg sm:text-xl font-bold text-charcoal leading-snug">
          {displayTitle}
        </h3>

        {displayDescription && (
          <p className="text-sm text-charcoal/70 line-clamp-2 mt-1.5 leading-relaxed">
            {displayDescription}
          </p>
        )}
      </div>
    </div>
  );
}

export { EventCard };
