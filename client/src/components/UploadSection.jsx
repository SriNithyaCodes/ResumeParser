import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload, FileText, CheckCircle, Loader2, AlertCircle,
  Sparkles, Brain, Zap, Target, Users, Clock, TrendingUp,
  Shield, Code, ChevronRight, Star, Award, Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

/* ── Left Sidebar ────────────────────────────────────────────── */
const LeftSidebar = () => {
  const stats = [
    { icon: <Users size={18} />, label: 'Resumes Parsed', value: '10M+', color: '#6366f1' },
    { icon: <Target size={18} />, label: 'ATS Accuracy', value: '99.9%', color: '#22c55e' },
    { icon: <Clock size={18} />, label: 'Avg. Parse Time', value: '0.5s', color: '#f59e0b' },
    { icon: <TrendingUp size={18} />, label: 'Time Saved/Week', value: '40hrs', color: '#a855f7' },
  ];

  const recentFormats = [
    { fmt: 'PDF', pct: 72, color: '#6366f1' },
    { fmt: 'DOCX', pct: 21, color: '#a855f7' },
    { fmt: 'Image', pct: 7, color: '#06b6d4' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-5"
    >
      {/* Live Stats */}
      <div
        className="rounded-3xl p-6"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}
      >
        <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-5 flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-400 inline-block"
          />
          Live Platform Stats
        </p>
        <div className="space-y-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: s.color + '18', color: s.color, border: `1px solid ${s.color}30` }}
              >
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 truncate">{s.label}</p>
                <p className="text-xl font-black text-white leading-tight">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Format Distribution */}
      <div
        className="rounded-3xl p-6"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}
      >
        <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-5">
          Format Distribution
        </p>
        <div className="space-y-3">
          {recentFormats.map((f, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span className="text-slate-300">{f.fmt}</span>
                <span style={{ color: f.color }}>{f.pct}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${f.pct}%` }}
                  transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${f.color}, ${f.color}80)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills extracted example */}
      <div
        className="rounded-3xl p-6"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}
      >
        <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-4">
          Skills We Detect
        </p>
        <div className="flex flex-wrap gap-2">
          {['Python', 'React', 'SQL', 'AWS', 'Node.js', 'ML', 'Java', 'Docker', 'TypeScript'].map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-300"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Right Sidebar ───────────────────────────────────────────── */
const RightSidebar = () => {
  const tips = [
    { icon: <Award size={16} />, text: 'Use quantified achievements (e.g. "increased revenue by 30%")', color: '#f59e0b' },
    { icon: <Target size={16} />, text: 'Mirror keywords from the job description for higher ATS scores', color: '#6366f1' },
    { icon: <Lightbulb size={16} />, text: 'Keep your resume to 1-2 pages for best readability', color: '#22c55e' },
    { icon: <Code size={16} />, text: 'List technical skills clearly in a dedicated skills section', color: '#a855f7' },
    { icon: <Star size={16} />, text: 'Include GitHub or portfolio links for tech roles', color: '#06b6d4' },
  ];

  const features = [
    { icon: <Shield size={16} />, label: '100% Private', desc: 'Your data never leaves your server', color: '#22c55e' },
    { icon: <Zap size={16} />, label: 'Instant Results', desc: 'Analysis in under 1 second', color: '#f59e0b' },
    { icon: <Brain size={16} />, label: 'GPT-Powered', desc: 'Deep contextual understanding', color: '#a855f7' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-5"
    >
      {/* ATS Score Preview */}
      <div
        className="rounded-3xl p-6"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}
      >
        <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-5">
          Sample ATS Score
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-300 text-sm font-semibold">Overall Match</span>
          <span className="text-2xl font-black text-white">87<span className="text-indigo-400 text-lg">%</span></span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '87%' }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)' }}
          />
        </div>
        {[
          { label: 'Skills Match', pct: 92, color: '#22c55e' },
          { label: 'Experience', pct: 84, color: '#6366f1' },
          { label: 'Education', pct: 78, color: '#f59e0b' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <span className="text-xs text-slate-500 w-24 shrink-0">{item.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.pct}%` }}
                transition={{ duration: 1, delay: 0.6 + i * 0.15 }}
                className="h-full rounded-full"
                style={{ background: item.color }}
              />
            </div>
            <span className="text-xs font-bold w-8 text-right" style={{ color: item.color }}>{item.pct}%</span>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div
        className="rounded-3xl p-6"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}
      >
        <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-4 flex items-center gap-2">
          <Lightbulb size={13} /> Resume Tips
        </p>
        <div className="space-y-3">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-start gap-3 group cursor-default"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: tip.color + '18', color: tip.color }}
              >
                {tip.icon}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{tip.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Badges */}
      <div
        className="rounded-3xl p-6"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}
      >
        <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-4">
          Why HireLens AI
        </p>
        <div className="space-y-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: f.color + '18', color: f.color, border: `1px solid ${f.color}30` }}
              >
                {f.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{f.label}</p>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
              <ChevronRight size={14} className="text-slate-600 ml-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Upload Section ─────────────────────────────────────── */
const UploadSection = ({ onUploadStart, onAnalysisComplete, isAnalyzing }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) { setFile(selectedFile); setError(null); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!file) return;
    onUploadStart();
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const response = await axios.post('http://localhost:5000/api/parse-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onAnalysisComplete(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze resume. Please try again.');
      onAnalysisComplete(null);
    }
  };

  const steps = [
    { icon: <Upload size={16} />, label: 'Upload', done: !!file },
    { icon: <Brain size={16} />, label: 'AI Analysis', active: isAnalyzing },
    { icon: <Sparkles size={16} />, label: 'Results', done: false },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 pb-12">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 pt-4"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-bold mb-5"
          animate={{ boxShadow: ['0 0 0px #6366f1', '0 0 20px #6366f140', '0 0 0px #6366f1'] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Zap size={13} className="text-yellow-400" /> Powered by GPT + OCR Engine
        </motion.div>
        <h1 className="text-6xl md:text-7xl font-black text-white mb-3 leading-tight">
          Analyse Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
            Resume
          </span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Upload any resume and let our AI extract structured insights, skills, and ATS scores in seconds.
        </p>
      </motion.div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] xl:grid-cols-[320px_1fr_320px] gap-6">
        {/* LEFT */}
        <LeftSidebar />

        {/* CENTER */}
        <div className="space-y-5">
          {/* Step Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3"
          >
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-2">
                  <motion.div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                      step.done ? 'text-green-400' : step.active ? 'text-indigo-400' : 'text-slate-600'
                    }`}
                    style={{
                      background: step.done ? 'rgba(34,197,94,0.12)' : step.active ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                      border: step.done ? '1px solid rgba(34,197,94,0.3)' : step.active ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                    animate={step.active ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {step.icon}
                  </motion.div>
                  <span className={`text-sm font-semibold hidden sm:block ${step.done ? 'text-green-400' : step.active ? 'text-indigo-400' : 'text-slate-600'}`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 max-w-12 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Drop Zone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            {...getRootProps()}
            className="relative rounded-3xl p-1 cursor-pointer"
            style={{
              background: isDragActive
                ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                : 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(168,85,247,0.5))',
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div
              className="rounded-[1.4rem] p-14 text-center relative overflow-hidden"
              style={{ background: isDragActive ? 'rgba(99,102,241,0.1)' : '#0c0d24' }}
            >
              <input {...getInputProps()} />

              {/* Corner marks */}
              {[
                { cls: 'top-3 left-3', bt: '2px solid #6366f1', bl: '2px solid #6366f1', br: 'none', bb: 'none', br2: '4px 0 0 0' },
                { cls: 'top-3 right-3', bt: '2px solid #6366f1', bl: 'none', br: '2px solid #6366f1', bb: 'none', br2: '0 4px 0 0' },
                { cls: 'bottom-3 left-3', bt: 'none', bl: '2px solid #6366f1', br: 'none', bb: '2px solid #6366f1', br2: '0 0 0 4px' },
                { cls: 'bottom-3 right-3', bt: 'none', bl: 'none', br: '2px solid #6366f1', bb: '2px solid #6366f1', br2: '0 0 4px 0' },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-8 h-8 ${c.cls}`}
                  style={{ borderTop: c.bt, borderLeft: c.bl, borderRight: c.br, borderBottom: c.bb, borderRadius: c.br2 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}

              {isAnalyzing && <div className="scan-line" />}

              <div className="flex flex-col items-center gap-6">
                <motion.div
                  className="w-28 h-28 rounded-3xl flex items-center justify-center"
                  style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)' }}
                  animate={isAnalyzing ? { rotate: 360 } : { scale: [1, 1.05, 1] }}
                  transition={isAnalyzing ? { duration: 2, repeat: Infinity, ease: 'linear' } : { duration: 3, repeat: Infinity }}
                >
                  {isAnalyzing ? <Loader2 size={48} className="text-indigo-400 animate-spin" />
                    : file ? <FileText size={48} className="text-indigo-400" />
                    : <Upload size={48} className="text-indigo-400" />}
                </motion.div>

                <AnimatePresence mode="wait">
                  {isAnalyzing ? (
                    <motion.div key="analyzing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
                      <p className="text-3xl font-black text-white mb-2">Analysing Resume…</p>
                      <p className="text-slate-400 text-lg">Our AI is extracting insights</p>
                      <motion.div className="flex justify-center gap-2 mt-5">
                        {[0,1,2,3,4].map((i) => (
                          <motion.div key={i} className="w-2.5 h-2.5 rounded-full bg-indigo-500"
                            animate={{ scale: [1, 1.7, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
                        ))}
                      </motion.div>
                    </motion.div>
                  ) : file ? (
                    <motion.div key="file" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 font-bold mb-3">
                        <CheckCircle size={16} /> File Ready
                      </div>
                      <p className="text-2xl font-black text-white">{file.name}</p>
                      <p className="text-slate-400 mt-1 text-lg">{(file.size / 1024).toFixed(1)} KB · click to change</p>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
                      <p className="text-3xl font-black text-white mb-2">
                        {isDragActive ? '✨ Drop it here!' : 'Drag & Drop your Resume'}
                      </p>
                      <p className="text-slate-400 text-lg mb-5">or click to browse files</p>
                      <div className="flex items-center justify-center gap-3">
                        {['PDF', 'DOCX', 'PNG', 'JPG'].map((fmt) => (
                          <span key={fmt} className="px-4 py-1.5 rounded-xl text-sm font-black text-indigo-300"
                            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}>
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="p-4 rounded-2xl flex items-center gap-3 text-red-400 border border-red-500/20"
                style={{ background: 'rgba(239,68,68,0.08)' }}>
                <AlertCircle size={20} className="shrink-0" />
                <span className="font-semibold">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analyse Button */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex justify-center">
            <motion.button
              onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}
              disabled={!file || isAnalyzing}
              whileHover={file && !isAnalyzing ? { scale: 1.05, boxShadow: '0 0 50px rgba(99,102,241,0.55)' } : {}}
              whileTap={file && !isAnalyzing ? { scale: 0.97 } : {}}
              className="flex items-center gap-3 px-16 py-6 rounded-2xl font-black text-xl text-white w-full max-w-sm justify-center"
              style={{
                background: !file || isAnalyzing ? 'rgba(99,102,241,0.2)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                boxShadow: file && !isAnalyzing ? '0 0 30px rgba(99,102,241,0.4)' : 'none',
                cursor: !file || isAnalyzing ? 'not-allowed' : 'pointer',
                opacity: !file || isAnalyzing ? 0.55 : 1,
              }}
            >
              {isAnalyzing ? (
                <><Loader2 className="animate-spin" size={24} /> Extracting Insights…</>
              ) : (
                <><Brain size={24} /> Analyse Resume <Sparkles size={18} className="text-yellow-300" /></>
              )}
            </motion.button>
          </motion.div>

          {/* Trust line */}
          <p className="text-center text-slate-600 text-sm">
            🔒 Your file is processed securely and never stored on third-party servers.
          </p>
        </div>

        {/* RIGHT */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default UploadSection;
