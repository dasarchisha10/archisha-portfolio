import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiCpu, FiTool } from 'react-icons/fi';
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiPython, SiMysql, SiC, SiCplusplus, SiOpenjdk,
  SiGit, SiGithub, SiLinux, SiVisualstudiocode, SiVercel,
} from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

const skillCategories = [
  {
    title: 'Frontend',
    icon:  FiCode,
    color: '#7C5CFC',
    skills: [
      { name: 'HTML5',        Icon: SiHtml5,       color: '#E44D26' },
      { name: 'CSS3',         Icon: SiCss3,        color: '#1572B6' },
      { name: 'JavaScript',   Icon: SiJavascript,  color: '#F7DF1E' },
      { name: 'React.js',     Icon: SiReact,       color: '#61DAFB' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    title: 'Programming & Database',
    icon:  FiCpu,
    color: '#9E78FF',
    skills: [
      { name: 'Python', Icon: SiPython,    color: '#3776AB' },
      { name: 'SQL',    Icon: SiMysql,     color: '#00758F' },
      { name: 'C',      Icon: SiC,         color: '#A8B9CC' },
      { name: 'C++',    Icon: SiCplusplus, color: '#00599C' },
      { name: 'Java',   Icon: SiOpenjdk,   color: '#F89820' },
    ],
  },
  {
    title: 'Tools',
    icon:  FiTool,
    color: '#a78bfa',
    skills: [
      { name: 'Git',        Icon: SiGit,               color: '#F05033' },
      { name: 'GitHub',     Icon: SiGithub,             color: '#94a3b8' },
      { name: 'Linux',      Icon: SiLinux,              color: '#FCC624' },
      { name: 'VS Code',    Icon: SiVisualstudiocode,   color: '#007ACC' },
      { name: 'Vercel',     Icon: SiVercel,             color: '#000000' },
    ],
  },
];

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05 } },
};

const tagVariants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function SkillTag({ Icon, name, color, isDark }) {
  return (
    <motion.div
      variants={tagVariants}
      whileHover={{
        y:               -4,
        scale:           1.05,
        borderColor:     '#7C5CFC',
        backgroundColor: isDark ? 'rgba(124,92,252,0.14)' : 'rgba(124,92,252,0.06)',
        boxShadow:        '0 10px 24px rgba(124,92,252,0.2)',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '8px',
        padding:       '10px 16px',
        borderRadius:  '12px',
        borderWidth:   '1px',
        borderStyle:   'solid',
        borderColor:   isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        background:    isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
        cursor:        'default',
      }}
    >
      <Icon size={16} color={color} />
      <span
        style={{
          fontSize:   '13px',
          fontWeight: 600,
          color:      isDark ? '#e5e7eb' : '#374151',
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}

function SkillCategoryCard({ category, isDark, delay }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        borderRadius: '20px',
        padding:      '28px',
        background:   isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
        borderWidth:  '1px',
        borderStyle:  'solid',
        borderColor:  isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        boxShadow:    isDark
          ? '0 4px 24px rgba(0,0,0,0.25)'
          : '0 4px 20px rgba(124,92,252,0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div
          style={{
            width:          '40px',
            height:         '40px',
            borderRadius:   '12px',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            background:     `${category.color}20`,
          }}
        >
          <category.icon size={18} color={category.color} />
        </div>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: isDark ? '#ffffff' : '#111827' }}>
          {category.title}
        </h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
      >
        {category.skills.map((skill) => (
          <SkillTag
            key={skill.name}
            Icon={skill.Icon}
            name={skill.name}
            color={skill.color}
            isDark={isDark}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const { isDark } = useTheme();
  const ref         = useRef(null);
  const isInView    = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={ref}
      className={`relative py-28 overflow-hidden ${isDark ? 'bg-[#070B18]' : 'bg-white'}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl" />
        <div className="blob blob-delay-4 absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className={`text-sm font-semibold tracking-widest uppercase mb-3 ${
            isDark ? 'text-purple-400' : 'text-purple-600'
          }`}>
            What I Work With
          </p>
          <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
            My <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <SkillCategoryCard
              key={category.title}
              category={category}
              isDark={isDark}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}