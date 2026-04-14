import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import ResultsDashboard from './components/ResultsDashboard';
import History from './components/History';
import LandingPage from './components/LandingPage';
import StarField from './components/StarField';
import { Toaster } from 'react-hot-toast';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');
  const [darkMode, setDarkMode] = useState(true);
  const [parsedResume, setParsedResume] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Always keep dark class on html for dark background
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  const handleAnalysisComplete = (data) => {
    setParsedResume(data);
    setActiveTab('results');
    setIsAnalyzing(false);
  };

  const handleLogoClick = () => {
    setShowLanding(true);
  };

  if (showLanding) {
    return (
      <div className="min-h-screen" style={{ background: '#07091a' }}>
        <StarField />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <LandingPage onGetStarted={() => setShowLanding(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#07091a' }}>
      <StarField />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Toaster position="top-right" toastOptions={{ style: { background: '#1e1b4b', color: '#e0e7ff', border: '1px solid rgba(99,102,241,0.3)' } }} />
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          onLogoClick={handleLogoClick}
        />
        
        <main className="w-full px-2 py-6">
          {activeTab === 'upload' && (
            <UploadSection 
              onUploadStart={() => setIsAnalyzing(true)}
              onAnalysisComplete={handleAnalysisComplete}
              isAnalyzing={isAnalyzing}
            />
          )}
          
          {activeTab === 'results' && parsedResume && (
            <ResultsDashboard data={parsedResume} />
          )}

          {activeTab === 'history' && (
            <History onSelect={(data) => {
              setParsedResume(data);
              setActiveTab('results');
            }} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
