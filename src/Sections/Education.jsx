import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Book,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Guru Nanak Institute of Technology',
    year: 'Currently Pursuing',
    status: 'Currently Pursuing',
    type: 'Postgraduate',
    color: '#7C5CFC',
    Icon: GraduationCap,
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Techno India University',
    year: 'Completed 2025',
    status: 'Completed',
    type: 'Undergraduate',
    color: '#9E78FF',
    Icon: GraduationCap,
  },
  {
    degree: 'Higher Secondary (Class XII)',
    institution: 'Sodepur Chandrachur Vidyapith for Girls',
    year: 'Completed 2022',
    status: 'Completed',
    type: 'Higher Secondary',
    color: '#a78bfa',
    Icon: BookOpen,
  },
  {
    degree: 'Secondary (Class X)',
    institution: 'Sodepur Chandrachur Vidyapith for Girls',
    year: 'Completed 2020',
    status: 'Completed',
    type: 'Secondary',
    color: '#c4b5fd',
    Icon: Book,
  },
];

export default function Education() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="education"
      ref={ref}
      className={`relative py-28 ${isDark ? 'bg-[#0a0f1e]' : 'bg-gray-50'}`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob absolute -bottom-20 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
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
            Academic Journey
          </p>
          <h2
            className={`text-4xl md:text-5xl font-black ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            My <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className={`absolute left-8 top-0 bottom-0 w-[2px] ${
              isDark
                ? 'bg-gradient-to-b from-purple-600 via-purple-400 to-transparent'
                : 'bg-gradient-to-b from-purple-400 via-purple-200 to-transparent'
            }`}
          />

          <div className="space-y-8">
            {education.map((edu, i) => {
              const Icon = edu.Icon;
              const isPursuing = edu.status === 'Currently Pursuing';

              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative flex gap-8 items-start pl-20"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-5 top-6 w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center z-10"
                    style={{
                      backgroundColor: isDark ? '#070B18' : '#f8f9ff',
                      boxShadow: `0 0 15px ${edu.color}66`,
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: edu.color }}
                    />
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      x: 8,
                      boxShadow: `0 10px 40px ${edu.color}22`,
                    }}
                    className={`flex-1 p-6 rounded-2xl transition-all duration-300 ${
                      isDark ? 'glass' : 'bg-white border border-gray-100'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <span
                        className={`text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${
                          isDark
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-purple-100 text-purple-600'
                        }`}
                      >
                        {edu.type}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                          isPursuing
                            ? 'bg-green-500/20 text-green-400'
                            : isDark
                            ? 'bg-white/10 text-gray-400'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {isPursuing ? (
                          <Sparkles className="w-3 h-3" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3" />
                        )}
                        {edu.year}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div
                        className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${edu.color}1f`,
                          border: `1px solid ${edu.color}40`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: edu.color }}
                          strokeWidth={2.2}
                        />
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-bold mb-1 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {edu.degree}
                        </h3>
                        <p
                          style={{ color: edu.color }}
                          className="font-medium text-sm"
                        >
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}