import { useEffect, useRef } from 'react';

const TECH = [
  { text: '</>', color: '#E44D26' },
  { text: '{ }', color: '#7C5CFC' },
  { text: 'JS',  color: '#F7DF1E' },
  { text: '⚛',  color: '#61DAFB' },
  { text: 'Py',  color: '#3776AB' },
  { text: 'SQL', color: '#00758F' },
  { text: 'git', color: '#F05033' },
  { text: 'npm', color: '#CB3837' },
  { text: 'API', color: '#9E78FF' },
  { text: '$_',  color: '#22D3EE' },
  { text: '<h>', color: '#E44D26' },
  { text: '=>',  color: '#F7DF1E' },
  { text: '.jsx',color: '#61DAFB' },
  { text: 'def', color: '#3776AB' },
  { text: 'CSS', color: '#1572B6' },
  { text: '&&',  color: '#F7DF1E' },
  { text: '[ ]', color: '#A78BFA' },
  { text: 'SSH', color: '#10B981' },
  { text: '01',  color: '#A78BFA' },
  { text: 'fn()',color: '#F59E0B' },
];

function makeIcon(w, h, scatter) {
  const t = TECH[Math.floor(Math.random() * TECH.length)];
  return {
    x:        Math.random() * w,
    y:        scatter ? Math.random() * h : h + 30 + Math.random() * 150,
    vy:       -(0.3 + Math.random() * 0.65),
    vx:       (Math.random() - 0.5) * 0.25,
    size:     26 + Math.random() * 22,
    opacity:  0.15 + Math.random() * 0.13,
    rotation: Math.random() * Math.PI * 2,
    rotSpd:   (Math.random() - 0.5) * 0.007,
    text:     t.text,
    color:    t.color,
    state:    'floating',
    fallVy:   0,
    timer:    0,
  };
}

function respawn(icon, w, h) {
  Object.assign(icon, makeIcon(w, h, false));
}

export default function FloatingIcons() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const iconsRef  = useRef([]);
  const rafRef    = useRef(null);
  const dimsRef   = useRef({ w: 1, h: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w   = window.innerWidth;
      const h   = window.innerHeight;
      canvas.width        = w * dpr;
      canvas.height       = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      dimsRef.current = { w, h };
    };
    resize();

    // force a first paint right after sizing so it can't appear blank
    const { w, h } = dimsRef.current;
    ctx.clearRect(0, 0, w, h);


    // re-create icons using the correct dimensions for the first frame
    iconsRef.current = Array.from(
      { length: 28 },
      (_, i) => makeIcon(w, h, i < 20)
    );


    const onMove  = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = ()  => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize',     resize);

    function tick() {
      const { w, h } = dimsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      ctx.clearRect(0, 0, w, h);

      for (const ic of iconsRef.current) {
        if (ic.state === 'waiting') {
          if (--ic.timer <= 0) respawn(ic, w, h);
          continue;
        }

        if (ic.state === 'floating') {
          const dx = ic.x - mx;
          const dy = ic.y - my;
          if (dx * dx + dy * dy < 85 * 85) {
            ic.state  = 'falling';
            ic.fallVy = 1.0 + Math.random() * 1.4;
          }
          ic.y        += ic.vy;
          ic.x        += ic.vx;
          ic.rotation += ic.rotSpd;
          if (ic.x < -60)    ic.x = w + 60;
          if (ic.x > w + 60) ic.x = -60;
          if (ic.y < -60)  {
            ic.y = h + 60;
            ic.x = Math.random() * w;
          }
        } else {
          ic.fallVy   += 0.3;
          ic.y        += ic.fallVy;
          ic.x        += Math.sin(ic.y * 0.04) * 2.2;
          ic.rotation += ic.rotSpd * 6;
          if (ic.y > h + 120) {
            ic.state = 'waiting';
            ic.timer = 80 + Math.floor(Math.random() * 160);
          }
        }

        const alpha = ic.state === 'falling' ? ic.opacity * 0.5 : ic.opacity;
        ctx.save();
        ctx.translate(ic.x, ic.y);
        ctx.rotate(ic.rotation);
        ctx.globalAlpha  = alpha;
        ctx.font         = `bold ${Math.round(ic.size)}px 'Courier New', monospace`;
        ctx.fillStyle    = ic.color;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor  = ic.color;
        ctx.shadowBlur   = 16;
        ctx.fillText(ic.text, 0, 0);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize',     resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:       'fixed',
        top:            0,
        left:           0,
        pointerEvents:  'none',
        zIndex:         1,
        opacity:        1,
      }}
    />
  );
}