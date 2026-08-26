import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiArrowRight, FiUser, FiBook,
  FiStar, FiFolder, FiMail, FiHome,
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const commands = [
  { id: 'home', label: 'Go to Home', section: '#home', icon: FiHome },
  { id: 'about', label: 'Go to About', section: '#about', icon: FiUser },
  { id: 'education', label: 'Go to Education', section: '#education', icon: FiBook },
  { id: 'skills', label: 'Go to Skills', section: '#skills', icon: FiStar },
  { id: 'projects', label: 'Go to Projects', section: '#projects', icon: FiFolder },
  { id: 'contact', label: 'Go to Contact', section: '#contact', icon: FiMail },
];

export default function CommandPalette() {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const execute = (cmd) => {
    document.querySelector(cmd.section)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      if (filtered[selectedIndex]) execute(filtered[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
          />

          {/* Palette panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`fixed top-1/4 left-1/2 -translate-x-1/2 z-[9991] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl ${
              isDark
                ? 'bg-[#111827] border border-white/10'
                : 'bg-white border border-gray-200'
            }`}
            style={{ boxShadow: '0 25px 60px rgba(124,92,252,0.2)' }}
          >
            {/* Search bar */}
            <div className={`flex items-center gap-3 px-5 py-4 border-b ${
              isDark ? 'border-white/10' : 'border-gray-100'
            }`}>
              <FiSearch className="text-purple-400 flex-shrink-0" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search sections..."
                className={`flex-1 bg-transparent outline-none text-sm font-medium ${
                  isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
              <kbd className={`px-2 py-1 rounded text-xs ${
                isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'
              }`}>ESC</kbd>
            </div>

            {/* Command list */}
            <div className="py-2 max-h-80 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className={`px-5 py-8 text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  No results found
                </p>
              ) : (
                filtered.map((cmd, i) => (
                  <motion.button
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 text-sm font-medium transition-colors duration-150 ${
                      selectedIndex === i
                        ? isDark
                          ? 'bg-purple-500/15 text-purple-300'
                          : 'bg-purple-50 text-purple-700'
                        : isDark
                        ? 'text-gray-300 hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedIndex === i ? 'bg-purple-500/25' : isDark ? 'bg-white/10' : 'bg-gray-100'
                    }`}>
                      <cmd.icon size={15} className={selectedIndex === i ? 'text-purple-400' : ''} />
                    </div>
                    <span className="flex-1 text-left">{cmd.label}</span>
                    {selectedIndex === i && <FiArrowRight size={14} className="text-purple-400" />}
                  </motion.button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className={`flex items-center justify-between px-5 py-3 border-t text-xs ${
              isDark ? 'border-white/10 text-gray-600' : 'border-gray-100 text-gray-400'
            }`}>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className={`px-1.5 py-0.5 rounded ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>↑</kbd>
                  <kbd className={`px-1.5 py-0.5 rounded ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className={`px-1.5 py-0.5 rounded ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>↵</kbd>
                  select
                </span>
              </div>
              <span>Ctrl + K to toggle</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}