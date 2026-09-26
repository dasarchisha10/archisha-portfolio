import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', keyword: 'hero' },
  { label: 'About', keyword: 'about' },
  { label: 'Education', keyword: 'education' },
  { label: 'Skills', keyword: 'skills' },
  { label: 'Certificate', keyword: 'certif' },
  { label: 'Contact', keyword: 'contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  const findSectionByKeyword = (keyword) => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return null;

    return Array.from(mainElement.children).find((child) => {
      const content = child.innerHTML?.toLowerCase() || '';
      const componentName = child.constructor?.name?.toLowerCase() || '';
      return content.includes(keyword) || componentName.includes(keyword);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (window.scrollY < 100) {
        setActive('Home');
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (const link of navLinks) {
        const section = findSectionByKeyword(link.keyword);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActive(link.label);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const timeoutId = setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  const scrollTo = (keyword, label) => {
    setActive(label);
    setMenuOpen(false);

    if (label === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const section = findSectionByKeyword(keyword);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
        scrolled || menuOpen ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-4 md:mx-8 lg:mx-16 rounded-2xl px-6 py-3 transition-all duration-500 ${
          menuOpen
            ? isDark
              ? 'bg-[#0b0f1f]/85 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)]'
              : 'bg-white/90 backdrop-blur-2xl border border-purple-100 shadow-[0_20px_60px_rgba(99,102,241,0.18)]'
            : scrolled
            ? isDark
              ? 'glass glow-purple'
              : 'glass-light shadow-lg shadow-purple-500/10'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-black">
            <span className="text-gradient">A</span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>D</span>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.keyword, link.label)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 group ${
                  active === link.label
                    ? 'text-purple-400'
                    : isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
                {active === link.label && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-purple-300 rounded-full"
                  />
                )}
                <span className="absolute inset-0 rounded-lg bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors duration-300" />
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isDark
                  ? 'bg-white/10 text-yellow-300 hover:bg-white/20'
                  : 'bg-gray-100 text-purple-600 hover:bg-gray-200'
              }`}
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </motion.button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu — FROSTED BACKGROUND ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden"
            >
              {/* Divider */}
              <div
                className={`mt-3 mb-3 h-[1px] ${
                  isDark ? 'bg-white/10' : 'bg-purple-100'
                }`}
              />

              <div className="pb-2 flex flex-col gap-1.5">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    onClick={() => scrollTo(link.keyword, link.label)}
                    className={`relative py-3 px-4 rounded-xl text-sm font-semibold text-left transition-all duration-300 ${
                      active === link.label
                        ? isDark
                          ? 'bg-gradient-to-r from-purple-500/25 to-purple-500/10 text-purple-200 border border-purple-400/30'
                          : 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 border border-purple-200'
                        : isDark
                        ? 'text-gray-200 hover:bg-white/[0.07] hover:text-white border border-transparent'
                        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700 border border-transparent'
                    }`}
                  >
                    {/* Active indicator dot */}
                    {active === link.label && (
                      <span
                        className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
                          isDark ? 'bg-purple-400' : 'bg-purple-600'
                        }`}
                        style={{
                          boxShadow: isDark
                            ? '0 0 10px rgba(158,120,255,0.9)'
                            : '0 0 8px rgba(99,102,241,0.6)',
                        }}
                      />
                    )}
                    <span className={active === link.label ? 'pl-3' : ''}>
                      {link.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}