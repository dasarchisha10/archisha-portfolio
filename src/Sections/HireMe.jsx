import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiDownload, FiSend } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function HireMe() {
  const { isDark } = useTheme();
  const ref       = useRef(null);
  const isInView  = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="hire"
      ref={ref}
      className={`relative py-24 overflow-hidden ${
        isDark ? 'bg-[#0a0f1e]' : 'bg-purple-50'
      }`}
    >
      {/* Background blob */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden text-center px-8 py-16 md:px-16"
          style={{
            background:  'linear-gradient(145deg, #0d0818 0%, #170f2e 50%, #0d0818 100%)',
            border:      '1px solid rgba(124,92,252,0.22)',
            boxShadow:   '0 0 80px rgba(124,92,252,0.14), 0 40px 80px rgba(0,0,0,0.45)',
          }}
        >
          {/* Center ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full bg-purple-600/12 filter blur-3xl" />
          </div>

          {/* Download icon box */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative z-10 flex justify-center mb-8"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: 'rgba(124,92,252,0.2)',
                border:     '1.5px solid rgba(124,92,252,0.4)',
                boxShadow:  '0 0 30px rgba(124,92,252,0.25)',
              }}
            >
              <FiDownload size={34} className="text-purple-300" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 text-4xl md:text-5xl font-black text-white mb-5"
          >
            Ready to{' '}
            <span className="text-gradient">Hire?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-10 text-gray-300 text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10"
          >
            I'm open to internships, part-time roles, and project collaborations
            where creativity, clean code, and great user experience matter.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative z-10 flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(124,92,252,0.55)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300"
              style={{ boxShadow: '0 0 22px rgba(124,92,252,0.35)' }}
            >
              <FiDownload size={18} /> Download Resume
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white border border-white/25 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              <FiSend size={18} /> Contact Me
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}