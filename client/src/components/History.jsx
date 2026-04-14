import React, { useState, useEffect } from 'react';
import { Trash2, ExternalLink, Calendar, FileText, Loader2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const History = ({ onSelect }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/history');
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/api/history/${id}`);
      setHistory(history.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const filteredHistory = history.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-500">Loading your history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Analysis History</h2>
          <p className="text-slate-500">View and manage your previous resume extractions.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search by name or file..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl glass bg-white/50 dark:bg-slate-800/50 border-white/10 focus:border-indigo-500 focus:outline-none w-full md:w-64"
          />
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <FileText className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={64} />
          <p className="text-slate-500 text-lg">No history found. Start by uploading a resume!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredHistory.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-6 cursor-pointer group hover:border-indigo-500/50"
                onClick={() => onSelect(item)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold text-xl">
                    {item.name?.charAt(0) || 'U'}
                  </div>
                  <button 
                    onClick={(e) => handleDelete(item.id, e)}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <h3 className="font-bold text-lg mb-1 truncate">{item.name}</h3>
                <p className="text-sm text-slate-500 mb-4 truncate">{item.fileName}</p>
                
                <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 text-indigo-500 font-semibold">
                    View Results
                    <ExternalLink size={12} />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default History;
