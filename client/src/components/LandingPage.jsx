import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import {
  Zap, Shield, FileText,
  ArrowRight, CheckCircle, Star, Sparkles, Brain, Cpu, Database, Bot
} from 'lucide-react';

/* ─── Floating Particle ──────────────────────────────────────── */
const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.4, 1],
    }}
    transition={{
      duration: style.duration,
      repeat: Infinity,
      delay: style.delay,
      ease: 'easeInOut',
    }}
  />
);

/* ─── Animated SVG Robot ─────────────────────────────────────── */
const AIRobot = ({ mousePos }) => {
  const robotRef = useRef(null);

  const getEyeOffset = useCallback((eyeCenterX, eyeCenterY) => {
    if (!robotRef.current || !mousePos) return { x: 0, y: 0 };
    const rect = robotRef.current.getBoundingClientRect();
    const robotCX = rect.left + eyeCenterX * (rect.width / 320);
    const robotCY = rect.top + eyeCenterY * (rect.height / 380);
    const dx = mousePos.x - robotCX;
    const dy = mousePos.y - robotCY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(Math.hypot(dx, dy), 5);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  }, [mousePos]);

  const leftEye = getEyeOffset(112, 130);
  const rightEye = getEyeOffset(208, 130);

  return (
    <motion.div
      ref={robotRef}
      className="relative select-none"
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        viewBox="0 0 320 380"
        width="340"
        height="408"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow behind robot */}
        <ellipse cx="160" cy="360" rx="100" ry="18" fill="url(#glowGrad)" opacity="0.6" />

        {/* Antenna */}
        <motion.line
          x1="160" y1="30" x2="160" y2="58"
          stroke="#818cf8" strokeWidth="4" strokeLinecap="round"
          animate={{ scaleY: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx="160" cy="22" r="10" fill="#6366f1"
          animate={{ r: [10, 13, 10], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <circle cx="160" cy="22" r="5" fill="#c7d2fe" />

        {/* Head */}
        <rect x="68" y="58" width="184" height="136" rx="32" fill="url(#headGrad)" />
        <rect x="68" y="58" width="184" height="136" rx="32" stroke="#6366f1" strokeWidth="2" opacity="0.5" />

        {/* Head shine */}
        <ellipse cx="130" cy="82" rx="30" ry="10" fill="white" opacity="0.08" transform="rotate(-15 130 82)" />

        {/* Left Eye socket */}
        <ellipse cx="112" cy="130" rx="30" ry="30" fill="#0f172a" />
        <ellipse cx="112" cy="130" rx="30" ry="30" stroke="#6366f1" strokeWidth="2" />
        {/* Left Eye iris */}
        <motion.circle cx={112 + leftEye.x} cy={130 + leftEye.y} r="14" fill="url(#eyeGrad)" />
        <motion.circle cx={112 + leftEye.x} cy={130 + leftEye.y} r="7" fill="#0ea5e9" />
        <motion.circle cx={112 + leftEye.x - 3} cy={130 + leftEye.y - 3} r="3" fill="white" opacity="0.9" />
        {/* Left Eye glow ring */}
        <motion.circle
          cx="112" cy="130" r="30"
          stroke="#6366f1" strokeWidth="1.5" fill="none" opacity="0.4"
          animate={{ r: [30, 34, 30], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Right Eye socket */}
        <ellipse cx="208" cy="130" rx="30" ry="30" fill="#0f172a" />
        <ellipse cx="208" cy="130" rx="30" ry="30" stroke="#6366f1" strokeWidth="2" />
        {/* Right Eye iris */}
        <motion.circle cx={208 + rightEye.x} cy={130 + rightEye.y} r="14" fill="url(#eyeGrad)" />
        <motion.circle cx={208 + rightEye.x} cy={130 + rightEye.y} r="7" fill="#0ea5e9" />
        <motion.circle cx={208 + rightEye.x - 3} cy={130 + rightEye.y - 3} r="3" fill="white" opacity="0.9" />
        <motion.circle
          cx="208" cy="130"
          r="30" stroke="#6366f1" strokeWidth="1.5" fill="none" opacity="0.4"
          animate={{ r: [30, 34, 30], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />

        {/* Mouth / scan strip */}
        <rect x="100" y="168" width="120" height="14" rx="7" fill="#1e293b" />
        <motion.rect
          x="104" y="170" width="20" height="10" rx="5" fill="#6366f1"
          animate={{ x: [104, 196, 104] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Neck */}
        <rect x="140" y="194" width="40" height="20" rx="6" fill="#1e1b4b" />
        <line x1="148" y1="194" x2="148" y2="214" stroke="#6366f1" strokeWidth="1" opacity="0.5" />
        <line x1="160" y1="194" x2="160" y2="214" stroke="#6366f1" strokeWidth="1" opacity="0.5" />
        <line x1="172" y1="194" x2="172" y2="214" stroke="#6366f1" strokeWidth="1" opacity="0.5" />

        {/* Body */}
        <rect x="52" y="214" width="216" height="120" rx="28" fill="url(#bodyGrad)" />
        <rect x="52" y="214" width="216" height="120" rx="28" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />

        {/* Body panel lines */}
        <line x1="100" y1="224" x2="100" y2="324" stroke="#6366f1" strokeWidth="1" opacity="0.2" />
        <line x1="220" y1="224" x2="220" y2="324" stroke="#6366f1" strokeWidth="1" opacity="0.2" />

        {/* Center chest orb */}
        <motion.circle
          cx="160" cy="266" r="24" fill="url(#orbGrad)"
          animate={{ r: [24, 27, 24], opacity: [0.9, 0.6, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="160" cy="266" r="14" fill="#6366f1" opacity="0.8" />
        <motion.circle
          cx="160" cy="266" r="6" fill="white"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Left chest indicator */}
        <motion.rect x="78" y="248" width="14" height="8" rx="4" fill="#22c55e"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
        <motion.rect x="78" y="262" width="14" height="8" rx="4" fill="#6366f1"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} />
        <motion.rect x="78" y="276" width="14" height="8" rx="4" fill="#f59e0b"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }} />

        {/* Right chest bar graph */}
        {[230, 242, 254, 266].map((x, i) => (
          <motion.rect
            key={i} x={x} y={280 - (i + 1) * 8} width="8" height={(i + 1) * 8} rx="3"
            fill="#6366f1" opacity="0.7"
            animate={{ height: [(i + 1) * 8, (i + 2) * 8, (i + 1) * 8], y: [280 - (i + 1) * 8, 280 - (i + 2) * 8, 280 - (i + 1) * 8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* Left arm */}
        <motion.g
          animate={{ rotate: [0, 8, 0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '52px', originY: '240px' }}
        >
          <rect x="12" y="228" width="40" height="72" rx="20" fill="url(#armGrad)" />
          <rect x="12" y="228" width="40" height="72" rx="20" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
          {/* Left hand */}
          <ellipse cx="32" cy="318" rx="20" ry="16" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" opacity="0.9" />
          <motion.line x1="22" y1="314" x2="22" y2="326" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"
            animate={{ y1: [314, 310, 314], y2: [326, 322, 326] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }} />
          <motion.line x1="32" y1="312" x2="32" y2="328" stroke="#818cf8" strokeWidth="2" strokeLinecap="round"
            animate={{ y1: [312, 308, 312], y2: [328, 324, 328] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }} />
          <motion.line x1="42" y1="314" x2="42" y2="326" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"
            animate={{ y1: [314, 310, 314], y2: [326, 322, 326] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.5 }} />
        </motion.g>

        {/* Right arm */}
        <motion.g
          animate={{ rotate: [0, -8, 0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{ originX: '268px', originY: '240px' }}
        >
          <rect x="268" y="228" width="40" height="72" rx="20" fill="url(#armGrad)" />
          <rect x="268" y="228" width="40" height="72" rx="20" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
          {/* Right hand */}
          <ellipse cx="288" cy="318" rx="20" ry="16" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" opacity="0.9" />
          <motion.line x1="278" y1="314" x2="278" y2="326" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"
            animate={{ y1: [314, 310, 314], y2: [326, 322, 326] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
          <motion.line x1="288" y1="312" x2="288" y2="328" stroke="#818cf8" strokeWidth="2" strokeLinecap="round"
            animate={{ y1: [312, 308, 312], y2: [328, 324, 328] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
          <motion.line x1="298" y1="314" x2="298" y2="326" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"
            animate={{ y1: [314, 310, 314], y2: [326, 322, 326] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }} />
        </motion.g>

        {/* Legs */}
        <rect x="104" y="334" width="44" height="36" rx="14" fill="url(#legGrad)" />
        <rect x="172" y="334" width="44" height="36" rx="14" fill="url(#legGrad)" />
        <ellipse cx="126" cy="372" rx="26" ry="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" opacity="0.7" />
        <ellipse cx="194" cy="372" rx="26" ry="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" opacity="0.7" />

        {/* Gradients */}
        <defs>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="headGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f0f2a" />
          </linearGradient>
          <linearGradient id="armGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="legGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id="eyeGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </radialGradient>
          <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
          </radialGradient>
        </defs>
      </svg>

      {/* Orbiting data badges */}
      {[
        { label: 'NLP', angle: 0, color: '#6366f1', icon: '🧠' },
        { label: 'OCR', angle: 120, color: '#22c55e', icon: '👁️' },
        { label: 'AI', angle: 240, color: '#f59e0b', icon: '⚡' },
      ].map(({ label, angle, color, icon }) => (
        <motion.div
          key={label}
          className="absolute text-xs font-bold px-3 py-1.5 rounded-full border flex items-center gap-1.5"
          style={{
            borderColor: color + '60',
            background: color + '18',
            color,
            top: '50%',
            left: '50%',
            transformOrigin: '0 0',
          }}
          animate={{
            rotate: [angle, angle + 360],
            x: [
              80 * Math.cos((angle * Math.PI) / 180) - 28,
              80 * Math.cos(((angle + 360) * Math.PI) / 180) - 28,
            ],
            y: [
              80 * Math.sin((angle * Math.PI) / 180) - 12,
              80 * Math.sin(((angle + 360) * Math.PI) / 180) - 12,
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <span>{icon}</span> {label}
        </motion.div>
      ))}
    </motion.div>
  );
};

/* ─── Typing Text ─────────────────────────────────────────────── */
const words = ['Recruiters', 'HR Teams', 'Enterprises', 'Startups'];
const TypingText = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-1 h-12 md:h-20 bg-indigo-400 ml-1 align-middle"
      />
    </span>
  );
};

/* ─── Main Landing Page ──────────────────────────────────────── */
const LandingPage = ({ onGetStarted }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Random particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    width: Math.random() * 6 + 2,
    height: Math.random() * 6 + 2,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    background: ['#6366f1', '#a855f7', '#06b6d4', '#22c55e', '#f59e0b'][i % 5],
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 4,
  }));

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 14 } },
  };

  const features = [
    {
      icon: <Zap size={28} className="text-yellow-400" />,
      title: 'Lightning Fast',
      desc: 'Parse resumes in under 0.5 seconds with our GPU-accelerated NLP engine.',
      color: '#f59e0b',
    },
    {
      icon: <FileText size={28} className="text-blue-400" />,
      title: 'Multi-Format',
      desc: 'PDF, DOCX, and scanned images via OCR — we handle everything you throw at us.',
      color: '#3b82f6',
    },
    {
      icon: <Brain size={28} className="text-purple-400" />,
      title: 'Deep AI Analysis',
      desc: 'Structured insights, skill matching, ATS scoring, and personalised suggestions.',
      color: '#a855f7',
    },
    {
      icon: <Database size={28} className="text-cyan-400" />,
      title: 'Smart History',
      desc: 'Store, retrieve, and compare every parsed resume in your personal vault.',
      color: '#06b6d4',
    },
    {
      icon: <Shield size={28} className="text-green-400" />,
      title: '100% Private',
      desc: 'Your data stays yours. End-to-end processing with zero third-party storage.',
      color: '#22c55e',
    },
    {
      icon: <Cpu size={28} className="text-red-400" />,
      title: 'ATS Scoring',
      desc: 'Real-time ATS compatibility scoring so candidates know exactly where they stand.',
      color: '#f43f5e',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#07091a' }}>
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p, i) => (
          <Particle key={i} style={p} />
        ))}
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center px-4 pt-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Text */}
          <div>
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-400 text-sm font-bold mb-8 backdrop-blur-sm"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles size={16} />
              </motion.span>
              Next-Gen AI Recruitment Platform
            </motion.div>

            <motion.h1
              variants={item}
              className="text-6xl md:text-7xl xl:text-8xl font-black mb-6 tracking-tight leading-[1.05]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="text-white">Hire</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                Lens
              </span>
              <span className="text-white"> AI</span>
            </motion.h1>

            <motion.div
              variants={item}
              className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight"
            >
              <span className="text-slate-300">Built for </span>
              <TypingText />
            </motion.div>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed"
            >
              Transform raw resumes into{' '}
              <span className="text-indigo-400 font-semibold">structured intelligence</span>{' '}
              using precision OCR and advanced NLP. Stop manual screening.{' '}
              <span className="text-purple-400 font-semibold">Start smart hiring.</span>
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={onGetStarted}
                className="flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  boxShadow: '0 0 20px rgba(99,102,241,0.35)',
                }}
              >
                <Bot size={22} />
                Launch Parser
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-slate-300 border border-white/15"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}
              >
                <Star size={20} className="text-yellow-400" fill="currentColor" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Live stats strip */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10"
            >
              {[
                { value: '10M+', label: 'Resumes Parsed' },
                { value: '99.9%', label: 'Accuracy' },
                { value: '0.5s', label: 'Parse Speed' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl font-black text-white">{value}</p>
                  <p className="text-sm text-slate-500 font-medium">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Robot */}
          <motion.div
            variants={item}
            className="flex justify-center items-center relative"
          >
            {/* Halo rings */}
            {[180, 240, 300].map((size, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-indigo-500/20"
                style={{ width: size, height: size }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.04, 1] }}
                transition={{
                  rotate: { duration: 12 + i * 4, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 3, repeat: Infinity },
                }}
              />
            ))}
            {/* Glow blob */}
            <div
              className="absolute w-80 h-80 rounded-full blur-[80px] opacity-30"
              style={{ background: 'radial-gradient(circle, #6366f1, #a855f7)' }}
            />
            <AIRobot mousePos={mousePos} />

            {/* Floating chips */}
            <motion.div
              className="absolute top-4 right-0 px-4 py-2.5 rounded-2xl text-sm font-bold text-green-400 border border-green-500/30"
              style={{ background: 'rgba(34,197,94,0.1)', backdropFilter: 'blur(8px)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CheckCircle size={14} className="inline mr-1.5" />
              ATS Score: 94%
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-0 px-4 py-2.5 rounded-2xl text-sm font-bold text-purple-400 border border-purple-500/30"
              style={{ background: 'rgba(168,85,247,0.1)', backdropFilter: 'blur(8px)' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Sparkles size={14} className="inline mr-1.5" />
              Skills Extracted: 18
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURES ─────────────────────────── */}
      <section className="relative z-10 py-32 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-indigo-400 font-bold tracking-widest text-sm uppercase mb-4">
              Why HireLens AI
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Everything you need to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                hire smarter.
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Powerful features built for modern HR teams who refuse to settle for slow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: `0 20px 60px ${f.color}25` }}
                className="rounded-3xl p-8 border border-white/8 cursor-default group transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  style={{ background: f.color + '20', border: `1px solid ${f.color}40` }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {f.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                {/* Bottom line */}
                <motion.div
                  className="mt-6 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(to right, ${f.color}, transparent)` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────── */}
      <section className="relative z-10 py-32 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative text-center rounded-[2.5rem] overflow-hidden py-24 px-8"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))',
              border: '1px solid rgba(99,102,241,0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Glow orbs inside CTA */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-8"
            >
              <Bot size={60} className="text-indigo-400" />
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 relative z-10">
              Ready to upgrade
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                your hiring?
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-xl mx-auto mb-12 relative z-10">
              Join thousands of recruiters saving 40+ hours per week.
              <br />
              Start free — no credit card needed.
            </p>
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: '0 0 60px rgba(99,102,241,0.6)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onGetStarted}
              className="relative z-10 text-xl font-black px-14 py-6 rounded-2xl text-white inline-flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                boxShadow: '0 0 30px rgba(99,102,241,0.4)',
              }}
            >
              <Bot size={24} /> Get Started Free
              <ArrowRight size={22} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="relative z-10 py-10 px-4 border-t border-white/5 text-center text-slate-600 text-sm">
        <p>
          © 2026{' '}
          <span className="text-indigo-400 font-semibold">HireLens AI</span>. All rights
          reserved. Built with ❤️ for HR Teams.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
