import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './context/ThemeContext';

import CustomCursor    from './components/CustomCursor';
import LoadingScreen   from './components/LoadingScreen';
import ScrollProgress  from './components/ScrollProgress';
import Navbar          from './components/Navbar';
import Footer          from './components/Footer';
import CommandPalette  from './components/CommandPalette';
import FloatingIcons   from './components/FloatingIcons';

import Hero         from './sections/Hero';
import About        from './sections/About';
import Education    from './sections/Education';
import Skills       from './sections/Skills';
import Projects     from './sections/Projects';
import Certificates from './sections/Certificates';
import HireMe       from './sections/HireMe';
import Contact      from './sections/Contact';

export default function App() {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/*
            Canvas is fixed, z-index: 3
            All section content uses "relative z-10" = z-index 10
            So icons (z:3) appear ABOVE section backgrounds
            but BELOW all text, cards, buttons (z:10)
          */}
          <FloatingIcons />

          {/*
            IMPORTANT: This wrapper has NO position or z-index.
            This prevents it from creating a stacking context
            that would trap the floating icons behind it.
          */}
          <div className={`min-h-screen transition-colors duration-500 ${
            isDark ? 'bg-[#070B18] text-white' : 'bg-white text-gray-900'
          }`}>
            <CustomCursor />
            <ScrollProgress />
            <CommandPalette />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Education />
              <Skills />
              <Projects />
              <Certificates />
              <HireMe />
              <Contact />
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}