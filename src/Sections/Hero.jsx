import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const roles = ['Frontend Developer', 'React Developer', 'Web Developer', 'MCA Student'];

const techIcons = [
  { label: 'HTML',   color: '#E44D26', pos: 'top-[10%] left-[5%]'   },
  { label: 'CSS',    color: '#1572B6', pos: 'top-[20%] right-[8%]'  },
  { label: 'JS',     color: '#F7DF1E', pos: 'bottom-[25%] left-[8%]'},
  { label: 'React',  color: '#61DAFB', pos: 'top-[55%] right-[5%]'  },
  { label: 'Python', color: '#3776AB', pos: 'bottom-[10%] right-[15%]'},
  { label: 'SQL',    color: '#00758F', pos: 'top-[40%] left-[2%]'   },
];

export default function Hero() {
  const { isDark } = useTheme();
  const [roleIndex,   setRoleIndex]   = useState(0);
  const [displayed,   setDisplayed]   = useState('');
  const [isDeleting,  setIsDeleting]  = useState(false);

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
      style={{ position: 'relative', zIndex: 10 }}
      className={`relative min-h-screen flex items-center overflow-hidden ${
        isDark
          ? 'bg-[#070B18]'
          : 'bg-gradient-to-br from-purple-50 via-white to-blue-50'
      }`}
    >
      {/* ── Background ambient blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl" />
        <div className="blob blob-delay-2 absolute top-1/2 -right-20 w-80 h-80 bg-purple-400/15 rounded-full filter blur-3xl" />
        <div className="blob blob-delay-4 absolute -bottom-20 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full filter blur-3xl" />
      </div>

      {/* ── Small floating tech icons (sides) ── */}
      {techIcons.map((tech, i) => (
        <motion.div
          key={tech.label}
          className={`absolute ${tech.pos} hidden lg:flex flex-col items-center gap-1`}
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* ════════════ LEFT CONTENT ════════════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={itemVariants}>
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                isDark
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Opportunities
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
              <p className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Hi, I'm
              </p>
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Archisha
                <br />
                <span className="text-gradient">Das</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="text-xl md:text-2xl font-semibold mb-6 h-8">
              <span className="text-gradient">{displayed}</span>
              <span className="animate-pulse text-purple-400 ml-1">|</span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className={`max-w-xl text-base leading-relaxed mb-10 mx-auto lg:mx-0 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              A passionate Frontend Developer pursuing MCA at Guru Nanak Institute of Technology,
              Sodepur, Kolkata. I love building responsive, interactive, and visually stunning
              web experiences using modern technologies.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124,92,252,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300"
              >
                View Projects <FiArrowRight />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all duration-300 ${
                  isDark
                    ? 'border-purple-500/40 text-purple-300 hover:bg-purple-500/10'
                    : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                <FiDownload /> Download CV
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="flex gap-4 mt-8 justify-center lg:justify-start">
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
            className="relative flex-shrink-0 flex items-center justify-center"
            style={{ width: '400px', height: '460px' }}
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
              className="absolute"
              style={{
                width: '340px', height: '340px',
                top: '50%', left: '50%',
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
              className="absolute rounded-full border border-purple-500/18 animate-spin-slow"
              style={{ width: '370px', height: '370px' }}
            />

            {/* Layer 5 — Inner purple glow */}
            <div
              className="absolute rounded-full"
              style={{
                width: '255px', height: '255px',
                background: isDark
                  ? 'radial-gradient(circle, rgba(124,92,252,0.22) 0%, transparent 72%)'
                  : 'radial-gradient(circle, rgba(124,92,252,0.13) 0%, transparent 72%)',
                filter: 'blur(18px)',
              }}
            />

            {/* Layer 6 — Profile image (ORGANIC shape — not a circle) */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.025 }}
              className="relative z-10"
              style={{ width: '295px', height: '345px' }}
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
              className="absolute z-20"
              style={{ top: '28px', right: '-8px' }}
            >
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md ${
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
              className="absolute z-20"
              style={{ bottom: '28px', left: '-8px' }}
            >
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md ${
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
              className="absolute z-20"
              style={{
                top: '62px', left: '22px',
                width: '10px', height: '10px',
                borderRadius: '50%',
                background: 'rgba(124,92,252,0.7)',
                boxShadow:  '0 0 14px rgba(124,92,252,0.7)',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute z-20"
              style={{
                bottom: '78px', right: '12px',
                width: '7px', height: '7px',
                borderRadius: '50%',
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className={`text-xs tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Scroll
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}