import React from 'react';
import { Sun, Moon, UploadCloud, History as HistoryIcon, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ activeTab, setActiveTab, darkMode, setDarkMode, onLogoClick }) => {
  return (
    <nav
      className="sticky top-0 z-50 px-6 py-4"
      style={{
        background: 'rgba(7, 9, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.15)',
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={onLogoClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              boxShadow: '0 0 16px rgba(99,102,241,0.4)',
            }}
            animate={{ boxShadow: ['0 0 10px rgba(99,102,241,0.3)', '0 0 24px rgba(99,102,241,0.6)', '0 0 10px rgba(99,102,241,0.3)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Cpu className="text-white" size={20} />
          </motion.div>
          <span
            className="text-xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            HireLens AI
          </span>
        </motion.div>

        {/* Tabs */}
        <div
          className="hidden md:flex items-center gap-1 p-1 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {[
            { id: 'upload', label: 'Upload', icon: <UploadCloud size={16} /> },
            { id: 'history', label: 'History', icon: <HistoryIcon size={16} /> },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                color: activeTab === tab.id ? '#818cf8' : '#64748b',
                background:
                  activeTab === tab.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                border:
                  activeTab === tab.id ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
              }}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(99,102,241,0.1)' }}
                  transition={{ type: 'spring', duration: 0.4 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Dark mode toggle */}
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {darkMode ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-indigo-400" />
          )}
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
