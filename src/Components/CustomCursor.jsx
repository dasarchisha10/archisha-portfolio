import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [visible,  setVisible]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [burst,    setBurst]    = useState(false);
  const [burstPos, setBurstPos] = useState({ x: 0, y: 0 });

  // Raw mouse position (motion values — update without re-render)
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  // Inner dot — very tight, near-instant
  const ix = useSpring(mx, { stiffness: 850, damping: 42, mass: 0.07 });
  const iy = useSpring(my, { stiffness: 850, damping: 42, mass: 0.07 });

  // Outer ring — lazy spring, creates trailing effect
  const ox = useSpring(mx, { stiffness: 135, damping: 19, mass: 0.45 });
  const oy = useSpring(my, { stiffness: 135, damping: 19, mass: 0.45 });

  useEffect(() => {
    // Skip on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const down = (e) => {
      setClicking(true);
      setBurstPos({ x: e.clientX, y: e.clientY });
      setBurst(true);
      setTimeout(() => setBurst(false), 500);
    };

    document.addEventListener('mousemove',  move,           { passive: true });
    document.addEventListener('mouseenter', () => setVisible(true));
    document.addEventListener('mouseleave', () => setVisible(false));
    document.addEventListener('mousedown',  down);
    document.addEventListener('mouseup',    () => setClicking(false));

    const attach = () => {
      document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], label'
      ).forEach((el) => {
        el.addEventListener('mouseenter', () => setHovering(true));
        el.addEventListener('mouseleave', () => setHovering(false));
      });
    };
    attach();
    const timer = setInterval(attach, 2200);

    return () => {
      document.removeEventListener('mousemove',  move);
      document.removeEventListener('mousedown',  down);
      clearInterval(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* ── Outer trailing ring: circle → squircle on hover ── */}
      <motion.div
        className="fixed pointer-events-none z-[9997]"
        style={{
          x: ox,
          y: oy,
          translateX: '-50%',
          translateY: '-50%',
          borderStyle: 'solid',
          borderWidth: '1.5px',
        }}
        animate={{
          width:  clicking ? 24 : hovering ? 56 : 38,
          height: clicking ? 24 : hovering ? 56 : 38,
          borderRadius: hovering ? '14px' : '50%',
          rotate: hovering ? 45 : 0,
          borderColor: hovering
            ? 'rgba(124, 92, 252, 1)'
            : 'rgba(158, 120, 255, 0.55)',
          backgroundColor: hovering
            ? 'rgba(124, 92, 252, 0.09)'
            : 'rgba(124, 92, 252, 0)',
          boxShadow: hovering
            ? '0 0 24px rgba(124,92,252,0.45), 0 0 48px rgba(124,92,252,0.12)'
            : '0 0 10px rgba(124,92,252,0.18)',
        }}
        transition={{ type: 'spring', stiffness: 230, damping: 23 }}
      />

      {/* ── Inner precise dot ── */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: ix,
          y: iy,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          backgroundColor: '#7C5CFC',
        }}
        animate={{
          width:  clicking ? 2 : hovering ? 4 : 7,
          height: clicking ? 2 : hovering ? 4 : 7,
          opacity: hovering ? 0.6 : 1,
          boxShadow: clicking
            ? '0 0 8px rgba(124,92,252,0.8)'
            : '0 0 12px rgba(124,92,252,1), 0 0 24px rgba(124,92,252,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 36 }}
      />

      {/* ── Click burst ripple ── */}
      <AnimatePresence>
        {burst && (
          <motion.div
            key={`burst-${burstPos.x}-${burstPos.y}`}
            className="fixed pointer-events-none z-[9998] rounded-full"
            style={{
              left: burstPos.x,
              top: burstPos.y,
              translateX: '-50%',
              translateY: '-50%',
              border: '1.5px solid rgba(124,92,252,0.7)',
              backgroundColor: 'transparent',
            }}
            initial={{ width: 8, height: 8, opacity: 1 }}
            animate={{ width: 72, height: 72, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.44, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}