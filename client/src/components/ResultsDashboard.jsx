import React from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Code, Terminal, Download, Star, Sparkles, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const ResultsDashboard = ({ data }) => {
  if (!data) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Header / Overview */}
      <motion.div variants={item} className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 border-none bg-gradient-to-br from-indigo-600/10 to-purple-600/10">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
          {data.name?.charAt(0) || 'U'}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold">{data.name}</h2>
            <div className="flex items-center gap-2 bg-indigo-500/20 px-3 py-1 rounded-full text-indigo-500 text-sm font-semibold">
              <Star size={14} fill="currentColor" />
              Score: {data.matchingScore}%
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Mail size={16} /> {data.email}</span>
            <span className="flex items-center gap-1"><Phone size={16} /> {data.phone}</span>
            <span className="flex items-center gap-1"><MapPin size={16} /> {data.location}</span>
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-300 italic">"{data.summary}"</p>
        </div>
        <button 
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `${data.name || 'resume'}_analysis.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Download size={20} />
          Export JSON
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Experience & Education */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          <motion.section variants={item} className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="text-indigo-500" />
              Professional Experience
            </h3>
            <div className="space-y-8">
              {data.experience?.map((exp, i) => (
                <div key={i} className="relative pl-8 border-l-2 border-indigo-500/30">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
                  <div className="flex flex-col md:flex-row md:justify-between mb-2">
                    <h4 className="font-bold text-lg">{exp.role}</h4>
                    <span className="text-sm font-medium text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full h-fit">{exp.duration}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-3">{exp.company}</p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section variants={item} className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="text-indigo-500" />
              Education
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.education?.map((edu, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-white/5">
                  <h4 className="font-bold">{edu.degree}</h4>
                  <p className="text-slate-500 dark:text-slate-400">{edu.university}</p>
                  <p className="text-sm text-indigo-500 mt-2">{edu.year}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Projects */}
          <motion.section variants={item} className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Terminal className="text-indigo-500" />
              Key Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects?.map((proj, i) => (
                <div key={i} className="group p-5 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 hover:from-indigo-500/10 hover:to-purple-500/10 transition-all border border-white/5">
                  <h4 className="font-bold mb-2 flex items-center justify-between">
                    {proj.title}
                    <Sparkles size={16} className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{proj.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Skills & Insights Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          <motion.section variants={item} className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Code className="text-indigo-500" />
              Skill Cloud
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-white/10 text-sm font-medium hover:scale-105 hover:border-indigo-500/50 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Progress / Resume Strength */}
          <motion.section variants={item} className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-indigo-500" />
              Resume Strength
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span>Overall Rating</span>
                  <span>{data.matchingScore}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${data.matchingScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                  />
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                  <Sparkles size={14} />
                  AI Suggestions
                </p>
                <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
                  {data.suggestions?.map((s, i) => (
                    <li key={i}>• {s}</li>
                  )) || (
                    <>
                      <li>• Add more quantitative metrics to experience.</li>
                      <li>• Highlight role-specific keywords.</li>
                      <li>• Expand on key technical projects.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDashboard;
