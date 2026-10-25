import {
  BookOpen,
  Church,
  Sun,
  Moon,
  Star,
  Heart,
  Music,
  Users,
  Clock,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

// Map icon string names (case-insensitive) to Lucide icon components
const ICON_MAP = {
  bookopen: BookOpen,
  book: BookOpen,
  church: Church,
  sun: Sun,
  moon: Moon,
  star: Star,
  heart: Heart,
  music: Music,
  users: Users,
};

/**
 * ServiceCard Component
 * 
 * Displays liturgical service or prayer meeting details with custom icon,
 * schedule timing, and gold border-top accent with full multi-language support.
 */
export default function ServiceCard({
  name,
  nameAmharic,
  day,
  dayAmharic,
  time,
  timeAmharic,
  description,
  descriptionAmharic,
  icon,
}) {
  const { currentLanguage } = useLanguage();
  const isAmharic = currentLanguage === 'am';

  const displayName = isAmharic && nameAmharic ? nameAmharic : name;
  const displayDay = isAmharic && dayAmharic ? dayAmharic : day;
  const displayTime = isAmharic && timeAmharic ? timeAmharic : time;
  const displayDescription = isAmharic && descriptionAmharic ? descriptionAmharic : description;

  // Resolve icon component dynamically with Church as fallback
  const normalizedIconKey = typeof icon === 'string' ? icon.toLowerCase().replace(/[-_\s]/g, '') : '';
  const IconComponent = ICON_MAP[normalizedIconKey] || Church;

  return (
    <div
      className="group bg-white rounded-xl p-6 border border-gray-100 border-t-[3px] border-t-gold shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300 flex flex-col h-full"
    >
      {/* Icon at top */}
      <div className="w-12 h-12 rounded-lg bg-burgundy/5 text-burgundy flex items-center justify-center mb-4 group-hover:bg-burgundy group-hover:text-gold transition-colors duration-300 flex-shrink-0">
        <IconComponent className="w-6 h-6" aria-hidden="true" />
      </div>

      {/* Service Name */}
      <h3 className="font-heading text-xl font-bold text-charcoal mb-3 group-hover:text-burgundy transition-colors">
        {displayName}
      </h3>

      {/* Day and Time info with Calendar and Clock icons */}
      {(displayDay || displayTime) && (
        <div className="space-y-2 text-sm text-charcoal/75 mb-4 py-3 border-y border-gray-100">
          {displayDay && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
              <span className="font-medium">{displayDay}</span>
            </div>
          )}
          {displayTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
              <span>{displayTime}</span>
            </div>
          )}
        </div>
      )}

      {/* Description text */}
      {displayDescription && (
        <p className="text-charcoal/80 text-sm leading-relaxed mt-auto">
          {displayDescription}
        </p>
      )}
    </div>
  );
}

export { ServiceCard };
