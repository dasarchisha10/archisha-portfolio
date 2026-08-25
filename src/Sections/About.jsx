import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCode, FiHeart, FiBook, FiZap, FiDownload } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const traits = [
  { icon: FiCode, title: 'Clean Code', desc: 'Writing maintainable, readable, and efficient code.' },
  { icon: FiHeart, title: 'UI/UX Passion', desc: 'Creating beautiful and intuitive user experiences.' },
  { icon: FiBook, title: 'Always Learning', desc: 'Continuously exploring new tools and technologies.' },
  { icon: FiZap, title: 'Problem Solver', desc: 'Breaking down complex problems into simple solutions.' },
];

export default function About() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className={`relative py-28 overflow-hidden ${
        isDark ? 'bg-[#070B18]' : 'bg-white'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob blob-delay-2 absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className={`text-sm font-semibold tracking-widest uppercase mb-3 ${
            isDark ? 'text-purple-400' : 'text-purple-600'
          }`}>Get to know me</p>
          <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1"
          >
            <div className={`p-8 rounded-2xl ${isDark ? 'glass' : 'bg-gray-50 border border-gray-100'}`}>
              <h3 className={`text-2xl font-bold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Hello! I'm <span className="text-gradient">Archisha Das</span> 👋
              </h3>
              <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>
                  I'm a passionate <span className={isDark ? 'text-purple-300 font-semibold' : 'text-purple-600 font-semibold'}>Frontend Developer</span> currently
                  pursuing my <span className={isDark ? 'text-white font-semibold' : 'text-gray-800 font-semibold'}>Master of Computer Applications (MCA)</span> at
                  Guru Nanak Institute of Technology.
                </p>
                <p>
                  I completed my <span className={isDark ? 'text-white font-semibold' : 'text-gray-800 font-semibold'}>Bachelor of Computer Applications (BCA)</span> from
                  Techno India University, which gave me a strong foundation in programming and software development.
                </p>
                <p>
                  My journey in web development is driven by a deep love for crafting elegant, user-friendly interfaces.
                  I enjoy turning design concepts into reality through clean code and smooth interactions.
                </p>
                <p>
                  When I'm not coding, I'm exploring new design trends, learning about the latest frontend technologies,
                  and looking for creative ways to improve user experience.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300"
                style={{ boxShadow: '0 0 20px rgba(124, 92, 252, 0.3)' }}
              >
                <FiDownload /> Download Resume
              </motion.button>
            </div>
          </motion.div>

          {/* Right — Trait cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(124, 92, 252, 0.15)' }}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  isDark
                    ? 'glass hover:border-purple-500/30'
                    : 'bg-white border border-gray-100 hover:border-purple-200'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                  <trait.icon size={22} />
                </div>
                <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {trait.title}
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {trait.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}