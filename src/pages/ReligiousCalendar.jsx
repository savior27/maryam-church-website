import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Info,
  Clock,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useDocumentTitle } from '../hooks';
import SectionHeading from '../components/SectionHeading';
import EventCard from '../components/EventCard';
import events from '../data/events';

const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_AM = ['እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ'];

const MONTH_NAMES_AM = [
  'ጃንዋሪ (ጥር)', 'ፌብሩዋሪ (የካቲት)', 'ማርች (መጋቢት)', 'ኤፕሪል (ሚያዝያ)',
  'ሜይ (ግንቦት)', 'ጁን (ሰኔ)', 'ጁላይ (ሐምሌ)', 'ኦገስት (ነሐሴ)',
  'ሴፕቴምበር (መስከረም)', 'ኦክቶበር (ጥቅምት)', 'ኖቬምበር (ሕዳር)', 'ዲሴምበር (ታኅሣሥ)'
];

const EVENT_COLORS = {
  feast: 'bg-burgundy',
  fast: 'bg-green-deep',
  saint: 'bg-gold',
  event: 'bg-charcoal',
};

function getYearMonthPrefix(year, monthZeroIndexed) {
  const monthPadded = String(monthZeroIndexed + 1).padStart(2, '0');
  return `${year}-${monthPadded}`;
}

function isEventOnDay(event, dateStr) {
  if (!event || !dateStr) return false;
  if (event.date === dateStr) return true;
  if (event.endDate) {
    return dateStr >= event.date && dateStr <= event.endDate;
  }
  return false;
}

function isEventInMonth(event, year, monthZeroIndexed) {
  if (!event) return false;
  const daysInMonth = new Date(year, monthZeroIndexed + 1, 0).getDate();
  const monthStart = `${getYearMonthPrefix(year, monthZeroIndexed)}-01`;
  const monthEnd = `${getYearMonthPrefix(year, monthZeroIndexed)}-${String(daysInMonth).padStart(2, '0')}`;

  const eventStart = event.date;
  const eventEnd = event.endDate || event.date;

  return eventStart <= monthEnd && eventEnd >= monthStart;
}

/**
 * ReligiousCalendar Page
 * 
 * Interactive liturgical calendar featuring month navigation, visual calendar
 * grid with event type dot indicators, responsive mobile list view, and event cards.
 * Fully localized with instant language switching.
 */
export default function ReligiousCalendar() {
  const { t, currentLanguage } = useLanguage();
  useDocumentTitle(t('nav.calendar') || 'Religious Calendar');
  const isAmharic = currentLanguage === 'am';

  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    if (today.getFullYear() === 2025 || today.getFullYear() === 2026) {
      return new Date(today.getFullYear(), today.getMonth(), 1);
    }
    return new Date(2025, 8, 1); // September 2025
  });

  const [selectedDay, setSelectedDay] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const handleSetToday = () => {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDay(now.getDate());
  };

  const handleJumpTo = (jumpYear, jumpMonth) => {
    setCurrentDate(new Date(jumpYear, jumpMonth, 1));
    setSelectedDay(null);
  };

  const monthName = isAmharic
    ? `${MONTH_NAMES_AM[month]} ${year}`
    : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const monthEvents = useMemo(() => {
    return events.filter((e) => isEventInMonth(e, year, month));
  }, [year, month]);

  const displayedEvents = useMemo(() => {
    if (selectedDay === null) {
      return monthEvents;
    }
    const targetDateStr = `${getYearMonthPrefix(year, month)}-${String(selectedDay).padStart(2, '0')}`;
    return events.filter((e) => isEventOnDay(e, targetDateStr));
  }, [monthEvents, selectedDay, year, month]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const today = useMemo(() => new Date(), []);
  const isCurrentMonthThisMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const calendarCells = useMemo(() => {
    const cells = [];

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      cells.push({
        day: dayNum,
        isCurrentMonth: false,
        key: `prev-${dayNum}`,
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${getYearMonthPrefix(year, month)}-${String(d).padStart(2, '0')}`;
      const dayEvents = events.filter((e) => isEventOnDay(e, dateStr));
      const isToday = isCurrentMonthThisMonth && today.getDate() === d;
      const isSelected = selectedDay === d;

      cells.push({
        day: d,
        dateStr,
        isCurrentMonth: true,
        isToday,
        isSelected,
        events: dayEvents,
        key: `current-${d}`,
      });
    }

    const totalCells = cells.length;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let j = 1; j <= remaining; j++) {
      cells.push({
        day: j,
        isCurrentMonth: false,
        key: `next-${j}`,
      });
    }

    return cells;
  }, [year, month, daysInMonth, firstDayOfWeek, daysInPrevMonth, isCurrentMonthThisMonth, today, selectedDay]);

  const weekdays = isAmharic ? WEEKDAYS_AM : WEEKDAYS_EN;

  const legendItems = [
    { type: 'feast', label: t('calendar.feastDay') || 'Feast Day', dotColor: 'bg-burgundy' },
    { type: 'fast', label: t('calendar.fastingPeriod') || 'Fasting Period', dotColor: 'bg-green-deep' },
    { type: 'saint', label: t('calendar.saintsDay') || "Saint's Day", dotColor: 'bg-gold' },
    { type: 'event', label: t('calendar.churchEvent') || 'Church Event', dotColor: 'bg-charcoal' },
  ];

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1548625361-1959779df340?w=1920')",
          }}
          role="img"
          aria-label="Ethiopian Orthodox liturgical feast cross and scripture"
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
              {t('nav.calendar') || 'Religious Calendar'}
            </span>
          </nav>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide drop-shadow-md">
            {t('calendar.title') || 'Religious Calendar'}
          </h1>

          <div
            className="w-16 h-1 bg-gold rounded-full mx-auto mt-4"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          label={t('calendar.label') || 'Liturgical Seasons & Commemorations'}
          title={t('calendar.title') || 'Church Calendar & Feast Days'}
          subtitle={
            t('calendar.subtitle') ||
            'Explore annual holy feast days, canonical fasting periods, and saintly memorials observed in the Ethiopian Orthodox Tewahedo Church tradition.'
          }
        />

        {/* Quick Season Navigation Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60 mr-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-gold" /> {isAmharic ? 'ቀጥታ መሸጋገሪያ፦' : 'Quick Jump:'}
          </span>
          <button
            type="button"
            onClick={() => handleJumpTo(2025, 8)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              year === 2025 && month === 8
                ? 'bg-burgundy text-white shadow-xs'
                : 'bg-white border border-gray-200 text-charcoal/80 hover:border-gold hover:text-burgundy'
            }`}
          >
            {isAmharic ? 'መስቀል (መስከረም 2018)' : 'Meskel (Sep 2025)'}
          </button>
          <button
            type="button"
            onClick={() => handleJumpTo(2025, 10)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              year === 2025 && month === 10
                ? 'bg-burgundy text-white shadow-xs'
                : 'bg-white border border-gray-200 text-charcoal/80 hover:border-gold hover:text-burgundy'
            }`}
          >
            {isAmharic ? 'የደብሩ ጉባኤ (ሕዳር 2018)' : 'Parish Day (Nov 2025)'}
          </button>
          <button
            type="button"
            onClick={() => handleJumpTo(2026, 0)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              year === 2026 && month === 0
                ? 'bg-burgundy text-white shadow-xs'
                : 'bg-white border border-gray-200 text-charcoal/80 hover:border-gold hover:text-burgundy'
            }`}
          >
            {isAmharic ? 'ጥምቀት (ጥር 2018)' : 'Timkat (Jan 2026)'}
          </button>
          <button
            type="button"
            onClick={() => handleJumpTo(2026, 1)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              year === 2026 && month === 1
                ? 'bg-burgundy text-white shadow-xs'
                : 'bg-white border border-gray-200 text-charcoal/80 hover:border-gold hover:text-burgundy'
            }`}
          >
            {isAmharic ? 'ዓቢይ ጾም (የካቲት 2018)' : 'Great Lent (Feb 2026)'}
          </button>
          <button
            type="button"
            onClick={() => handleJumpTo(2026, 3)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              year === 2026 && month === 3
                ? 'bg-burgundy text-white shadow-xs'
                : 'bg-white border border-gray-200 text-charcoal/80 hover:border-gold hover:text-burgundy'
            }`}
          >
            {isAmharic ? 'ፋሲካ / ትንሣኤ (ሚያዝያ 2018)' : 'Fasika / Easter (Apr 2026)'}
          </button>
        </div>

        {/* Calendar Card Container */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12">
          {/* Calendar Header with Navigation */}
          <div className="bg-gradient-to-r from-burgundy via-burgundy-dark to-charcoal text-white p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gold">
                <CalendarIcon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                  {isAmharic ? 'የሥርዓተ አምልኮ ወር' : 'Liturgical Month'}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
                  {monthName}
                </h2>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSetToday}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Go to Today"
              >
                {t('calendar.today') || 'Today'}
              </button>
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous Month"
                className="p-2 rounded-lg bg-white/10 hover:bg-gold hover:text-charcoal transition-all focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next Month"
                className="p-2 rounded-lg bg-white/10 hover:bg-gold hover:text-charcoal transition-all focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop Visual Calendar Grid */}
          <div className="hidden md:block p-6">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekdays.map((dayName, idx) => (
                <div
                  key={dayName}
                  className={`text-center py-2 text-xs font-bold uppercase tracking-wider ${
                    idx === 0 || idx === 6 ? 'text-burgundy' : 'text-charcoal/70'
                  }`}
                >
                  {dayName}
                </div>
              ))}
            </div>

            {/* Day Cells Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarCells.map((cell) => {
                if (!cell.isCurrentMonth) {
                  return (
                    <div
                      key={cell.key}
                      className="min-h-[90px] p-2 rounded-xl bg-gray-50/50 text-gray-300 border border-transparent select-none"
                    >
                      <span className="text-sm font-medium">{cell.day}</span>
                    </div>
                  );
                }

                const hasEvents = cell.events && cell.events.length > 0;

                return (
                  <button
                    key={cell.key}
                    type="button"
                    onClick={() => {
                      setSelectedDay(cell.isSelected ? null : cell.day);
                    }}
                    className={`min-h-[90px] p-2.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between group relative ${
                      cell.isSelected
                        ? 'border-gold bg-gold/10 ring-2 ring-gold/40 shadow-sm'
                        : cell.isToday
                        ? 'border-burgundy bg-burgundy/5'
                        : hasEvents
                        ? 'border-gray-200 hover:border-gold hover:shadow-sm bg-white'
                        : 'border-gray-100 hover:border-gray-300 bg-white'
                    }`}
                  >
                    {/* Day number header */}
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                          cell.isToday
                            ? 'bg-burgundy text-white font-bold'
                            : cell.isSelected
                            ? 'bg-gold text-charcoal font-bold'
                            : 'text-charcoal group-hover:text-burgundy'
                        }`}
                      >
                        {cell.day}
                      </span>
                      {hasEvents && (
                        <span className="text-[10px] font-bold text-burgundy opacity-80">
                          {cell.events.length} {isAmharic ? 'በዓል' : (cell.events.length === 1 ? 'event' : 'events')}
                        </span>
                      )}
                    </div>

                    {/* Event Preview Chips / Dots */}
                    {hasEvents && (
                      <div className="mt-2 space-y-1 w-full overflow-hidden">
                        <div className="hidden lg:block text-[11px] font-medium text-charcoal/90 truncate leading-tight">
                          {isAmharic && cell.events[0].titleAmharic
                            ? cell.events[0].titleAmharic
                            : cell.events[0].title}
                        </div>

                        {/* Dot indicators */}
                        <div className="flex items-center gap-1.5 pt-0.5">
                          {cell.events.slice(0, 3).map((e) => (
                            <span
                              key={e.id}
                              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                EVENT_COLORS[e.type] || 'bg-charcoal'
                              }`}
                              title={`${isAmharic && e.titleAmharic ? e.titleAmharic : e.title}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Calendar: Compact List View */}
          <div className="md:hidden p-4 space-y-3">
            <div className="text-xs text-charcoal/70 mb-2 flex items-center justify-between">
              <span>{isAmharic ? `${monthName} የተመዘገቡ በዓላት፦` : `Days with celebrations for ${monthName}:`}</span>
              {selectedDay !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="text-burgundy underline font-medium"
                >
                  {isAmharic ? 'ሁሉንም አሳይ' : 'Clear day filter'}
                </button>
              )}
            </div>

            {monthEvents.length === 0 ? (
              <div className="p-6 text-center text-charcoal/60 bg-gray-50 rounded-xl text-sm">
                {t('calendar.noEvents') || 'No events recorded for this month.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {monthEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3 bg-white border border-gray-100 rounded-xl flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          EVENT_COLORS[evt.type] || 'bg-charcoal'
                        }`}
                      />
                      <div>
                        <p className="text-sm font-bold text-charcoal leading-snug">
                          {isAmharic && evt.titleAmharic ? evt.titleAmharic : evt.title}
                        </p>
                        <p className="text-xs text-charcoal/60">
                          {evt.date} {evt.endDate ? `to ${evt.endDate}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs capitalize font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-charcoal/80">
                      {isAmharic
                        ? (evt.type === 'feast' ? 'በዓል' : evt.type === 'fast' ? 'ጾም' : evt.type === 'saint' ? 'ቅዱስ' : 'ዝግጅት')
                        : evt.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Event Type Legend Bar */}
          <div className="bg-gray-50/80 border-t border-gray-100 p-4 sm:p-5 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs">
            <span className="font-semibold text-charcoal/80 uppercase tracking-wider">
              {isAmharic ? 'የቀለማት መመሪያ፦' : 'Liturgical Legend:'}
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {legendItems.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full shadow-xs ${item.dotColor}`}
                    aria-hidden="true"
                  />
                  <span className="text-charcoal/80 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Day Status Bar */}
        {selectedDay !== null && (
          <div className="mb-6 flex items-center justify-between bg-gold/15 border border-gold/40 rounded-xl p-4 text-sm">
            <div className="flex items-center gap-2 text-charcoal">
              <Clock className="w-4 h-4 text-gold-dark" />
              <span>
                {isAmharic ? 'የተመረጠው ቀን፦ ' : 'Showing commemorations for '}
                <strong className="font-heading">
                  {selectedDay} {monthName}
                </strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedDay(null)}
              className="text-xs font-semibold px-3 py-1 bg-burgundy text-white rounded-lg hover:bg-burgundy-light transition-colors"
            >
              {isAmharic ? `${monthName} ሁሉንም አሳይ` : `Show All in ${monthName}`}
            </button>
          </div>
        )}

        {/* Events List Below Calendar */}
        <section aria-labelledby="month-events-heading" className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3
              id="month-events-heading"
              className="font-heading text-2xl font-bold text-charcoal flex items-center gap-2"
            >
              <span>{t('calendar.upcomingEvents') || 'Commemorations & Events'}</span>
              <span className="text-xs bg-gold/20 text-gold-dark font-sans px-2.5 py-0.5 rounded-full font-semibold">
                {displayedEvents.length} {isAmharic ? 'በዓላት' : (displayedEvents.length === 1 ? 'Event' : 'Events')}
              </span>
            </h3>

            {selectedDay === null && (
              <span className="text-xs text-charcoal/60 hidden sm:inline">
                {isAmharic ? 'ዝርዝር ለማየት ማንኛውንም ቀን ይጫኑ' : 'Click any calendar day to inspect specific dates'}
              </span>
            )}
          </div>

          {displayedEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {displayedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  titleAmharic={event.titleAmharic}
                  date={event.date}
                  type={event.type}
                  description={event.description}
                  descriptionAmharic={event.descriptionAmharic}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center">
              <Layers className="w-10 h-10 text-charcoal/30 mx-auto mb-3" />
              <h4 className="font-heading text-lg font-bold text-charcoal mb-1">
                {t('calendar.noEvents') || 'No Events Recorded'}
              </h4>
              <p className="text-sm text-charcoal/70 max-w-md mx-auto mb-4">
                {isAmharic
                  ? 'ለዚህ ወር የተመዘገበ በዓል የለም። እባክዎ ሌሎች ወራትን ይመልከቱ።'
                  : 'No liturgical events or feast days recorded for this month. Please check other months or contact the church office.'}
              </p>
            </div>
          )}
        </section>

        {/* Important Liturgical Notice */}
        <section
          aria-labelledby="calendar-notice-title"
          className="mt-12 md:mt-16 bg-gold/10 border border-gold/30 rounded-xl p-6 sm:p-8 flex items-start gap-4 transition-all duration-300 hover:border-gold/50"
        >
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold-dark mt-0.5">
            <Info className="w-5 h-5 text-gold-dark" aria-hidden="true" />
          </div>
          <div>
            <h3
              id="calendar-notice-title"
              className="font-heading text-lg font-bold text-charcoal mb-1"
            >
              {isAmharic ? 'የቀን መቁጠሪያ ማስታወሻ' : 'Liturgical Calendar Notice'}
            </h3>
            <p className="text-charcoal/80 text-sm md:text-base leading-relaxed">
              {t('calendar.calendarNotice') ||
                'The Ethiopian Orthodox Church calendar follows the Ge\'ez calendar system. Movable feast dates vary each liturgical year.'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
