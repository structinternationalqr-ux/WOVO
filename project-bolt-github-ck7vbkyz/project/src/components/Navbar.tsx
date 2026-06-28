import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ar', label: 'AR', name: 'العربية' },
  { code: 'tr', label: 'TR', name: 'Türkçe' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/features', label: t('nav.features') },
    { to: '/pricing', label: t('nav.pricing') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-20 h-20 md:w-28 md:h-28 relative -my-3 flex-shrink-0 rounded-2xl overflow-hidden bg-white/[0.06] border border-white/10 p-1.5 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
              <img
                src="/Gemini_Generated_Image_10pseu10pseu10ps-removebg-preview.png"
                alt="WOVO"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  location.pathname === link.to ? 'text-platinum' : 'text-silver/80 hover:text-platinum'
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-platinum/80"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-sm font-medium text-silver/80 hover:text-platinum transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLang.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 glass-strong rounded-xl overflow-hidden shadow-glow"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangChange(lang.code)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        i18n.language === lang.code
                          ? 'text-platinum bg-white/[0.08]'
                          : 'text-silver/80 hover:text-platinum hover:bg-white/5'
                      }`}
                    >
                      <span className="font-semibold">{lang.label}</span>
                      <span className="ml-2 text-xs opacity-60">{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-silver/80 hover:text-platinum transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-base font-medium ${
                    location.pathname === link.to ? 'text-platinum' : 'text-silver/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      i18n.language === lang.code
                        ? 'text-platinum bg-white/10'
                        : 'text-silver/80 hover:bg-white/5'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
