import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cross, Menu, X, Globe, ChevronDown, Heart } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import churchConfig from '../data/churchConfig';

/**
 * Header Component for Ethiopian Orthodox Tewahedo Church
 * Features:
 * - Transparent at top of page, transitions to solid white with shadow on scroll (> 50px)
 * - Desktop clean horizontal navigation with active link highlighting
 * - Mobile full-screen animated drawer navigation with lock-scroll
 * - Language switcher dropdown (EN, AM, OM) with click-outside detection
 * - Fully accessible with semantic tags, ARIA attributes, and keyboard navigation support
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const { t, currentLanguage, setLanguage, languages } = useLanguage();
  const location = useLocation();
  const langDropdownRef = useRef(null);

  // Available language options with fallbacks
  const availableLanguages = languages && languages.length > 0 ? languages : [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
    { code: 'om', name: 'Afaan Oromo', nativeName: 'Afaan Oromoo' },
  ];

  // Scroll listener for transparent -> solid transition (> 50px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track route change to close mobile menu and dropdowns
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setIsMobileMenuOpen(false);
    setIsLangDropdownOpen(false);
  }

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Localized church name based on current language
  const localizedChurchName =
    currentLanguage === 'am'
      ? (churchConfig.churchNameAmharic || churchConfig.churchName)
      : currentLanguage === 'om'
      ? (churchConfig.churchNameOromo || churchConfig.churchName)
      : churchConfig.churchName;

  // Navigation items mapping
  const navItems = [
    { path: '/', label: t('nav.home') || 'Home' },
    { path: '/about', label: t('nav.about') || 'About Us' },
    { path: '/services', label: t('nav.services') || 'Services' },
    { path: '/calendar', label: t('nav.calendar') || 'Calendar' },
    { path: '/news', label: t('nav.news') || 'News' },
    { path: '/teachings', label: t('nav.teachings') || 'Teachings' },
    { path: '/gallery', label: t('nav.gallery') || 'Gallery' },
    { 
      path: '/donations', 
      label: t('nav.donations') || t('donation.title') || 'Donations', 
      isCta: true 
    },
    { path: '/contact', label: t('nav.contact') || t('contact.title') || 'Contact Us' },
  ];

  // Helper to determine if link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/95 text-[#242124] shadow-md backdrop-blur-md border-b border-[#FAF7F0]'
          : 'bg-gradient-to-b from-black/70 via-black/35 to-transparent text-white'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Church Brand (Left) */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C6A15B] rounded-lg p-1 transition-transform"
            aria-label={`${localizedChurchName} - Home`}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#641E2B] text-[#C6A15B] border border-[#C6A15B]/70 shadow-md group-hover:scale-105 transition-transform duration-200">
              <Cross className="w-5 h-5 stroke-[2.3]" aria-hidden="true" />
            </div>
            <div className="flex flex-col text-left">
              <span
                className={`font-serif font-bold text-sm sm:text-base lg:text-lg leading-tight tracking-tight transition-colors duration-200 ${
                  isScrolled
                    ? 'text-[#242124] group-hover:text-[#641E2B]'
                    : 'text-white group-hover:text-white/90 drop-shadow-sm'
                }`}
              >
                {localizedChurchName}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
                {t('hero.label') || 'Ethiopian Orthodox Tewahedo'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Center / Right) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            role="navigation"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const active = isActive(item.path);

              if (item.isCta) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold text-white bg-[#C6A15B] hover:bg-[#a8873d] shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-2.5 py-2 text-xs xl:text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C6A15B] ${
                    active
                      ? 'text-[#C6A15B] font-semibold'
                      : isScrolled
                      ? 'text-[#242124] hover:text-[#C6A15B]'
                      : 'text-white/95 hover:text-[#C6A15B] drop-shadow-sm'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#C6A15B] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}

            {/* Desktop Language Selector Dropdown (Far Right) */}
            <div className="relative ml-2 pl-2 border-l border-white/20" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                aria-expanded={isLangDropdownOpen}
                aria-haspopup="true"
                aria-label="Choose website language"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-[#C6A15B] ${
                  isScrolled
                    ? 'border-[#C6A15B]/50 text-[#242124] hover:border-[#C6A15B] hover:text-[#C6A15B] bg-[#FAF7F0]'
                    : 'border-white/40 text-white hover:border-[#C6A15B] hover:text-[#C6A15B] bg-black/25'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-[#C6A15B]" aria-hidden="true" />
                <span>{currentLanguage.toUpperCase()}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isLangDropdownOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isLangDropdownOpen && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl ring-1 ring-black/10 py-1.5 z-50 animate-fadeIn divide-y divide-gray-100"
                >
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-gray-500">
                    Select Language / ቋንቋ ይምረጡ
                  </div>
                  <div className="py-1">
                    {availableLanguages.map((lang) => {
                      const isSelected = currentLanguage === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangDropdownOpen(false);
                          }}
                          role="menuitem"
                          className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors ${
                            isSelected
                              ? 'bg-[#641E2B]/10 text-[#641E2B] font-bold'
                              : 'text-[#242124] hover:bg-[#FAF7F0] hover:text-[#C6A15B]'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-semibold text-[10px] uppercase px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                              {lang.code.toUpperCase()}
                            </span>
                            <span>{lang.nativeName || lang.name}</span>
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#C6A15B]" aria-hidden="true" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Right Controls: Language Badge + Hamburger Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick language toggle badge on mobile top bar */}
            <button
              type="button"
              onClick={() => {
                const nextLang =
                  currentLanguage === 'en' ? 'am' : currentLanguage === 'am' ? 'om' : 'en';
                setLanguage(nextLang);
              }}
              aria-label={`Current language: ${currentLanguage.toUpperCase()}. Tap to switch.`}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase transition-colors border ${
                isScrolled
                  ? 'border-[#C6A15B]/50 text-[#242124] bg-[#FAF7F0]'
                  : 'border-white/30 text-white bg-black/30'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#C6A15B]" aria-hidden="true" />
              <span>{currentLanguage.toUpperCase()}</span>
            </button>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-overlay"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C6A15B] ${
                isScrolled
                  ? 'text-[#242124] hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7 text-[#C6A15B]" aria-hidden="true" />
              ) : (
                <Menu className="w-7 h-7" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Full-Screen Overlay Navigation */}
      <div
        id="mobile-navigation-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-0 z-50 bg-[#242124] text-[#FAF7F0] lg:hidden flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-x-0'
            : 'opacity-0 pointer-events-none translate-x-full'
        }`}
      >
        {/* Mobile Overlay Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#3a373a]">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3"
            aria-label={`${localizedChurchName} - Home`}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#641E2B] text-[#C6A15B] border border-[#C6A15B]/70 shadow-md">
              <Cross className="w-5 h-5 stroke-[2.3]" aria-hidden="true" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-sm text-[#FAF7F0] leading-tight">
                {localizedChurchName}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold">
                {t('hero.label') || 'Ethiopian Orthodox Tewahedo'}
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 text-[#C6A15B] hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
          >
            <X className="w-7 h-7" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path);

            if (item.isCta) {
              return (
                <div key={item.path} className="pt-3 pb-2">
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-semibold text-white bg-[#C6A15B] hover:bg-[#a8873d] shadow-lg transition-all"
                  >
                    <Heart className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? 'bg-[#641E2B] text-[#C6A15B] font-bold border-l-4 border-[#C6A15B]'
                    : 'text-[#FAF7F0]/90 hover:bg-[#3a373a] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <span className="w-2 h-2 rounded-full bg-[#C6A15B]" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Drawer Footer: Language Selector & Blessings */}
        <div className="p-6 border-t border-[#3a373a] bg-[#242124]/90 space-y-4">
          <div>
            <div className="text-xs uppercase font-semibold text-[#C6A15B] mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Language / ቋንቋ / Afaan</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {availableLanguages.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#641E2B] text-[#C6A15B] border border-[#C6A15B]'
                        : 'bg-[#3a373a] text-white/80 hover:bg-[#3a373a]/80'
                    }`}
                  >
                    <span className="uppercase text-[10px] text-gray-300">{lang.code}</span>
                    <span className="truncate">{lang.nativeName || lang.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center text-xs text-white/50 pt-2 border-t border-[#3a373a]">
            {t('footer.tagline') || 'Rooted in Ancient Faith, Guided by Tradition'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
