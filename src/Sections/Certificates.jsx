import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiAward, FiExternalLink, FiX } from 'react-icons/fi';
import {
  SiPython,
  SiGoogle,
  SiCoursera,
  SiInfosys,
  SiOpenai,
} from 'react-icons/si';
import { FaRobot } from 'react-icons/fa6';
import { HiOutlineShieldCheck } from 'react-icons/hi2';
import { useTheme } from '../context/ThemeContext';

const certs = [
  {
    id: 1,
    title: 'Full Stack Python',
    issuer: 'Infosys',
    year: '2024',
    color: '#3776AB',
    image: '/certificates/certificate_page-0001.jpg',
    Logo: SiPython,
    logoColor: '#3776AB',
  },
  {
    id: 2,
    title: 'Google Cybersecurity',
    issuer: 'Coursera',
    year: '2024',
    color: '#4285F4',
    image: '/certificates/certificate_page-0002.jpg',
    Logo: SiGoogle,
    logoColor: '#4285F4',
    SecondaryLogo: SiCoursera,
    secondaryColor: '#0056D2',
  },
  {
    id: 3,
    title: 'AI for Developers Workshop',
    issuer: 'GUVI × HCL',
    year: '2026',
    color: '#7C5CFC',
    image: '/certificates/certificate_3.jpeg',
    Logo: FaRobot,
    logoColor: '#7C5CFC',
  },
];

export default function Certificates() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [preview, setPreview] = useState(null);

  return (
    <section
      id="certificates"
      ref={ref}
      className={`relative py-28 overflow-hidden ${
        isDark ? 'bg-[#0a0f1e]' : 'bg-gray-50'
      }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="blob absolute top-0 right-0 w-80 h-80 rounded-full filter blur-3xl"
          style={{ background: 'rgba(124,92,252,0.08)' }}
        />
        <div
          className="blob blob-delay-2 absolute bottom-0 left-0 w-72 h-72 rounded-full filter blur-3xl"
          style={{ background: 'rgba(99,102,241,0.06)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p
            className={`text-sm font-semibold tracking-widest uppercase mb-3 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}
          >
            Credentials
          </p>
          <h2
            className={`text-4xl md:text-5xl font-black ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            My <span className="text-gradient">Certificates</span>
          </h2>
          <p
            className={`mt-4 text-sm max-w-md mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Click any certificate to view it in full size
          </p>
        </motion.div>

        {/* Certificate cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, i) => {
            const Logo = cert.Logo;
            const SecondaryLogo = cert.SecondaryLogo;
            const isPursuing = cert.year === '2026';

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                onClick={() => setPreview(cert)}
                className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isDark
                    ? 'bg-[#111827] border border-white/10 hover:border-purple-500/40'
                    : 'bg-white border border-gray-100 hover:border-purple-200 hover:shadow-xl'
                }`}
                style={{
                  boxShadow: isDark
                    ? '0 4px 30px rgba(0,0,0,0.3)'
                    : '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                {/* Certificate image preview */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: '200px',
                    background: isDark ? '#0d1117' : '#f8f9ff',
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/50 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold">
                        <FiExternalLink size={16} />
                        View Full
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Certificate info */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Logo block */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${cert.logoColor}15`,
                        border: `1px solid ${cert.logoColor}30`,
                      }}
                    >
                      <Logo
                        size={22}
                        style={{ color: cert.logoColor }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-bold text-base mb-1 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {cert.title}
                      </h3>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <p
                            className="text-sm font-medium truncate"
                            style={{ color: cert.color }}
                          >
                            {cert.issuer}
                          </p>
                          {SecondaryLogo && (
                            <SecondaryLogo
                              size={14}
                              style={{ color: cert.secondaryColor }}
                              className="shrink-0"
                            />
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                            isPursuing
                              ? isDark
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-green-100 text-green-700'
                              : isDark
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-purple-100 text-purple-600'
                          }`}
                        >
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div
                    className={`mt-4 pt-4 flex items-center gap-2 border-t ${
                      isDark ? 'border-white/8' : 'border-gray-100'
                    }`}
                  >
                    <FiAward
                      size={14}
                      className={
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }
                    />
                    <span
                      className={`text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Certificate of Completion
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Full-screen preview modal ── */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[9990] flex items-center justify-center p-4"
            style={{
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
            >
              {/* Close button */}
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-black/80 transition-colors"
              >
                <FiX size={18} />
              </button>

              {/* Full certificate image */}
              <img
                src={preview.image}
                alt={preview.title}
                className="w-full h-auto"
              />

              {/* Info bar */}
              <div className="px-6 py-4 bg-[#111827] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${preview.logoColor}20`,
                      border: `1px solid ${preview.logoColor}40`,
                    }}
                  >
                    <preview.Logo
                      size={18}
                      style={{ color: preview.logoColor }}
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{preview.title}</h3>
                    <p
                      className="text-sm"
                      style={{ color: preview.color }}
                    >
                      {preview.issuer} · {preview.year}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPreview(null)}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}