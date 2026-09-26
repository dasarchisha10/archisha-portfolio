import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const roles = ['Frontend Developer', 'React Developer', 'Web Developer', 'MCA Student'];

const techIcons = [
  { label: 'HTML',   color: '#E44D26', pos: 'top-[10%] left-[2%]'    },
  { label: 'CSS',    color: '#1572B6', pos: 'top-[20%] right-[3%]'   },
  { label: 'JS',     color: '#F7DF1E', pos: 'bottom-[25%] left-[3%]' },
  { label: 'React',  color: '#61DAFB', pos: 'top-[55%] right-[2%]'   },
  { label: 'Python', color: '#3776AB', pos: 'bottom-[10%] right-[8%]'},
  { label: 'SQL',    color: '#00758F', pos: 'top-[40%] left-[1%]'    },
];

export default function Hero() {
  const { isDark } = useTheme();
  const [roleIndex,  setRoleIndex]  = useState(0);
  const [displayed,  setDisplayed]  = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="home"
      style={{ position: 'relative', zIndex: 10 }}
      className={`relative min-h-screen flex items-center overflow-hidden ${
        isDark
          ? 'bg-[#070B18]'
          : 'bg-gradient-to-br from-purple-50 via-white to-blue-50'
      }`}
    >
      {/* ── Background ambient blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute -top-40 -left-40 w-72 sm:w-80 lg:w-96 h-72 sm:h-80 lg:h-96 bg-purple-600/20 rounded-full filter blur-3xl" />
        <div className="blob blob-delay-2 absolute top-1/2 -right-20 w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 bg-purple-400/15 rounded-full filter blur-3xl" />
        <div className="blob blob-delay-4 absolute -bottom-20 left-1/3 w-56 sm:w-64 lg:w-72 h-56 sm:h-64 lg:h-72 bg-indigo-500/10 rounded-full filter blur-3xl" />
      </div>

      {/* ── Small floating tech icons (only on xl+ to avoid overlap) ── */}
      {techIcons.map((tech, i) => (
        <motion.div
          key={tech.label}
          className={`absolute ${tech.pos} hidden xl:flex flex-col items-center gap-1`}
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          <div
            className="glass w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold"
            style={{ boxShadow: `0 0 20px ${tech.color}33` }}
          >
            <span style={{ color: tech.color }}>{tech.label}</span>
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-16 pt-24 sm:pt-28 lg:pt-28 pb-16 sm:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16">

          {/* ════════════ LEFT CONTENT ════════════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex-1 w-full text-center lg:text-left order-2 lg:order-1"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <span
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-5 sm:mb-6 ${
                  isDark
                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants} className="mb-4">
              <p className={`text-base sm:text-lg font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Hi, I'm
              </p>
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Archisha
                <br />
                <span className="text-gradient">Das</span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl font-semibold mb-5 sm:mb-6 h-7 sm:h-8"
            >
              <span className="text-gradient">{displayed}</span>
              <span className="animate-pulse text-purple-400 ml-1">|</span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className={`max-w-xl text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 mx-auto lg:mx-0 px-2 sm:px-0 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              A passionate Frontend Developer pursuing MCA at Guru Nanak Institute of Technology,
              Sodepur, Kolkata. I love building responsive, interactive, and visually stunning
              web experiences using modern technologies.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124,92,252,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300"
              >
                View Projects <FiArrowRight />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl font-semibold border transition-all duration-300 ${
                  isDark
                    ? 'border-purple-500/40 text-purple-300 hover:bg-purple-500/10'
                    : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                <FiDownload /> Download CV
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 mt-7 sm:mt-8 justify-center lg:justify-start"
            >
              {[
                { Icon: FiGithub,   href: 'https://github.com/dasarchisha10', label: 'GitHub'   },
                { Icon: FiLinkedin, href: 'https://linkedin.com/',             label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isDark
                      ? 'bg-white/10 text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 border border-white/10'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                  }`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ════════════ RIGHT — PREMIUM ORGANIC IMAGE ════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex-shrink-0 flex items-center justify-center order-1 lg:order-2
                       w-[280px] h-[320px]
                       sm:w-[340px] sm:h-[390px]
                       md:w-[380px] md:h-[440px]
                       lg:w-[400px] lg:h-[460px]"
          >
            {/* Layer 1 — Outer ambient glow */}
            <div
              className="absolute inset-0"
              style={{
                background: isDark
                  ? 'radial-gradient(circle at 50% 50%, rgba(124,92,252,0.20) 0%, rgba(124,92,252,0.06) 50%, transparent 72%)'
                  : 'radial-gradient(circle at 50% 50%, rgba(124,92,252,0.14) 0%, rgba(124,92,252,0.04) 50%, transparent 72%)',
                filter: 'blur(2px)',
              }}
            />

            {/* Layer 2 — Dot grid */}
            <div
              className="absolute inset-0"
              style={{
                opacity: 0.07,
                backgroundImage: `radial-gradient(${
                  isDark ? 'rgba(158,120,255,0.9)' : 'rgba(124,92,252,0.7)'
                } 1.2px, transparent 1.2px)`,
                backgroundSize: '22px 22px',
              }}
            />

            {/* Layer 3 — Organic SVG morphing blob */}
            <svg
              className="absolute w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] md:w-[320px] md:h-[320px] lg:w-[340px] lg:h-[340px]"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor={isDark ? '#7C5CFC' : '#9E78FF'} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={isDark ? '#4F46E5' : '#7C5CFC'} stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <motion.path
                fill="url(#blobGrad)"
                animate={{
                  d: [
                    'M200,40 C272,40 352,92 366,182 C380,272 330,360 240,380 C150,400 54,356 30,266 C6,176 56,76 140,48 C162,40 180,40 200,40Z',
                    'M200,35 C286,46 356,106 355,196 C354,286 294,366 204,376 C114,386 39,320 24,234 C9,148 70,60 154,40 C176,34 186,34 200,35Z',
                    'M200,42 C264,34 356,84 370,174 C384,264 340,356 250,378 C160,400 54,360 28,272 C2,184 50,80 138,48 C164,40 180,48 200,42Z',
                    'M200,40 C272,40 352,92 366,182 C380,272 330,360 240,380 C150,400 54,356 30,266 C6,176 56,76 140,48 C162,40 180,40 200,40Z',
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>

            {/* Layer 4 — Slow spinning decorative ring */}
            <div
              className="absolute rounded-full border border-purple-500/18 animate-spin-slow
                         w-[260px] h-[260px]
                         sm:w-[315px] sm:h-[315px]
                         md:w-[350px] md:h-[350px]
                         lg:w-[370px] lg:h-[370px]"
            />

            {/* Layer 5 — Inner purple glow */}
            <div
              className="absolute rounded-full
                         w-[180px] h-[180px]
                         sm:w-[215px] sm:h-[215px]
                         md:w-[240px] md:h-[240px]
                         lg:w-[255px] lg:h-[255px]"
              style={{
                background: isDark
                  ? 'radial-gradient(circle, rgba(124,92,252,0.22) 0%, transparent 72%)'
                  : 'radial-gradient(circle, rgba(124,92,252,0.13) 0%, transparent 72%)',
                filter: 'blur(18px)',
              }}
            />

            {/* Layer 6 — Profile image (ORGANIC shape) */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.025 }}
              className="relative z-10
                         w-[210px] h-[245px]
                         sm:w-[250px] sm:h-[295px]
                         md:w-[280px] md:h-[325px]
                         lg:w-[295px] lg:h-[345px]"
            >
              <div
                style={{
                  width:        '100%',
                  height:       '100%',
                  borderRadius: '62% 38% 52% 48% / 44% 56% 44% 56%',
                  overflow:     'hidden',
                  border:       '2.5px solid rgba(124,92,252,0.45)',
                  boxShadow: isDark
                    ? '0 0 55px rgba(124,92,252,0.34), 0 22px 60px rgba(0,0,0,0.45)'
                    : '0 0 40px rgba(124,92,252,0.22), 0 22px 50px rgba(124,92,252,0.1)',
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Archisha Das"
                  style={{
                    width:        '100%',
                    height:       '100%',
                    objectFit:    'cover',
                    objectPosition: 'top center',
                  }}
                />
              </div>
            </motion.div>

            {/* ── Floating badge — top right ── */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute z-20 top-2 sm:top-4 lg:top-7 -right-1 sm:-right-2"
            >
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-md ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white'
                    : 'bg-white/90 border border-purple-100 text-purple-700'
                }`}
                style={{ boxShadow: '0 4px 22px rgba(124,92,252,0.25)' }}
              >
                <span style={{ color: '#61DAFB' }}>⚛</span> React.js
              </div>
            </motion.div>

            {/* ── Floating badge — bottom left ── */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
              className="absolute z-20 bottom-2 sm:bottom-4 lg:bottom-7 -left-1 sm:-left-2"
            >
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-md ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white'
                    : 'bg-white/90 border border-purple-100 text-purple-700'
                }`}
                style={{ boxShadow: '0 4px 22px rgba(124,92,252,0.25)' }}
              >
                <span style={{ color: '#E44D26' }}>&lt;/&gt;</span> Frontend Dev
              </div>
            </motion.div>

            {/* ── Small pulsing accent dots ── */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="absolute z-20 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
              style={{
                top: '46px',
                left: '14px',
                background: 'rgba(124,92,252,0.7)',
                boxShadow:  '0 0 14px rgba(124,92,252,0.7)',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute z-20 w-1.5 h-1.5 rounded-full"
              style={{
                bottom: '58px',
                right: '8px',
                background: 'rgba(158,120,255,0.6)',
                boxShadow:  '0 0 10px rgba(158,120,255,0.6)',
              }}
            />
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <p className={`text-[10px] sm:text-xs tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Scroll
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-8 sm:h-10 lg:h-12 bg-gradient-to-b from-purple-500 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}