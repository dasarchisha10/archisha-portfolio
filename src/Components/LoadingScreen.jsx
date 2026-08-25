import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.random() * 4 + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070B18]"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob absolute top-1/3 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl" />
        <div className="blob blob-delay-2 absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full filter blur-3xl" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 text-center mb-12"
      >
        <div className="text-6xl font-black mb-3">
          <span className="text-gradient">A</span>
          <span className="text-white">D</span>
        </div>
        <p className="text-gray-400 text-sm tracking-[0.4em] uppercase font-light">
          Portfolio
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 w-72"
      >
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-gray-500 text-xs">
          <span>Loading...</span>
          <span>{Math.floor(Math.min(progress, 100))}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}