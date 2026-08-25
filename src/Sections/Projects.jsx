import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiPlus } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const filters = ['All', 'React', 'JavaScript', 'Python'];

// ✏️ REPLACE THESE with your actual projects later!
const projects = [
  {
    id: 1,
    title: 'Add Your Project Here',
    description: 'Replace this with your first real project description. Add the GitHub link and live demo link below.',
    tags: ['React', 'JavaScript'],
    placeholder: true,
  },
  {
    id: 2,
    title: 'Add Your Project Here',
    description: 'Replace this with your second real project description. Describe what it does and what you learned.',
    tags: ['JavaScript'],
    placeholder: true,
  },
  {
    id: 3,
    title: 'Add Your Project Here',
    description: 'Replace this with your third real project description. You can also add a Python project here.',
    tags: ['Python'],
    placeholder: true,
  },
];

function ProjectCard({ project, isDark, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
        isDark
          ? 'glass hover:border-purple-500/30'
          : 'bg-white border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/10'
      }`}
    >
      {/* Image placeholder */}
      <div className={`relative w-full h-52 overflow-hidden ${
        isDark ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/50' : 'bg-gradient-to-br from-purple-50 to-indigo-50'
      }`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 90 }}
            className="w-16 h-16 rounded-2xl border-2 border-dashed border-purple-400/50 flex items-center justify-center"
          >
            <FiPlus size={28} className="text-purple-400" />
          </motion.div>
          <p className="text-purple-400/70 text-sm">Add project screenshot</p>
        </div>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-purple-900/60 backdrop-blur-sm flex items-center justify-center gap-4"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white border border-white/30"
          >
            <FiGithub size={18} />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white border border-white/30"
          >
            <FiExternalLink size={18} />
          </motion.a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { isDark } = useTheme();
  const [active, setActive] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(active));

  return (
    <section
      id="projects"
      ref={ref}
      className={`relative py-28 ${isDark ? 'bg-[#0a0f1e]' : 'bg-gray-50'}`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob absolute top-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className={`text-sm font-semibold tracking-widest uppercase mb-3 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            What I've Built
          </p>
          <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className={`max-w-lg mx-auto text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            These are placeholder cards. Replace them with your real projects when you're ready!
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                active === filter
                  ? 'bg-gradient-to-r from-purple-600 to-purple-400 text-white'
                  : isDark
                  ? 'glass text-gray-300 hover:text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                isDark={isDark}
                delay={i * 0.1}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}