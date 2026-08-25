import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={`relative py-14 overflow-hidden ${isDark ? 'bg-[#070B18]' : 'bg-gray-50'}`}>

      {/* ── Top gradient border ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      {/* ── Bottom radial glow ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center bottom, rgba(124,92,252,0.12) 0%, transparent 72%)'
            : 'radial-gradient(ellipse at center bottom, rgba(124,92,252,0.07) 0%, transparent 72%)',
        }}
      />

      {/* ── Large background branding watermark ── */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-black whitespace-nowrap tracking-tight"
          style={{
            fontSize:   'clamp(3rem, 11vw, 8.5rem)',
            letterSpacing: '-0.03em',
            color: isDark
              ? 'rgba(255,255,255,0.025)'
              : 'rgba(124,92,252,0.055)',
          }}
        >
          &lt;Archisha /&gt;
        </span>
      </div>

      {/* ── Thin decorative top accent line ── */}
      <div
        className="absolute top-[2px] left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to right, transparent, rgba(124,92,252,0.12) 30%, rgba(158,120,255,0.08) 70%, transparent)'
            : 'linear-gradient(to right, transparent, rgba(124,92,252,0.08) 30%, rgba(158,120,255,0.05) 70%, transparent)',
        }}
      />

      {/* ── Corner decorative shapes ── */}
      <div
        className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at top left, rgba(124,92,252,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle at top left, rgba(124,92,252,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at top right, rgba(158,120,255,0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle at top right, rgba(158,120,255,0.03) 0%, transparent 70%)',
        }}
      />

      {/* ── Footer content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="text-2xl font-black">
            <span className="text-gradient">A</span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>D</span>
          </div>

          {/* Copyright */}
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Made with ❤️ by{' '}
            <span className="text-gradient font-semibold">Archisha Das</span>
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { Icon: FiGithub,   href: 'https://github.com/dasarchisha10'     },
              { Icon: FiLinkedin, href: 'https://linkedin.com/'                 },
              { Icon: FiMail,     href: 'mailto:dasarchisha19@gmail.com'        },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  isDark
                    ? 'bg-white/10 text-gray-400 hover:bg-purple-500/20 hover:text-purple-400 border border-white/10'
                    : 'bg-white text-gray-500 hover:text-purple-600 hover:bg-purple-50 border border-gray-200'
                }`}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Ctrl+K hint */}
        <div className="mt-6 text-center">
          <p className={`text-xs ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
            Press{' '}
            <kbd className={`px-1.5 py-0.5 rounded text-xs mx-0.5 ${
              isDark ? 'bg-white/10 text-gray-500' : 'bg-gray-200 text-gray-500'
            }`}>Ctrl</kbd>
            +
            <kbd className={`px-1.5 py-0.5 rounded text-xs mx-0.5 ${
              isDark ? 'bg-white/10 text-gray-500' : 'bg-gray-200 text-gray-500'
            }`}>K</kbd>
            {' '}to navigate quickly
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center text-white z-50"
        style={{ boxShadow: '0 0 20px rgba(124,92,252,0.4)' }}
      >
        <FiArrowUp size={18} />
      </motion.button>
    </footer>
  );
}