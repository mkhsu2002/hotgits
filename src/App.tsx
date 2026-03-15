import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Loader2, Code as CodeIcon } from 'lucide-react';
import { useGithubTrending } from './hooks/useGithubTrending';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { RepoCard } from './components/RepoCard';
import { ApiKeyModal } from './components/ApiKeyModal';
import { TimeRange } from './services/github';

const LANGUAGES = [
  { value: 'all', label: 'All Languages' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'java', label: 'Java' },
  { value: 'c++', label: 'C++' },
  { value: 'ruby', label: 'Ruby' },
];

const LOCAL_STORAGE_KEY = 'gemini_api_key';

export default function App() {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [language, setLanguage] = useState('all');
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiModal, setShowApiModal] = useState(false);
  const { repos, loading, error, refresh } = useGithubTrending(timeRange, language);

  useEffect(() => {
    const savedKey = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      setShowApiModal(true);
    }
  }, []);

  const handleSaveApiKey = (newKey: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, newKey);
    setApiKey(newKey);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-emerald-500/30">
      <Header onSettingsClick={() => setShowApiModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          language={language}
          setLanguage={setLanguage}
          languages={LANGUAGES}
        />

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500"
              >
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
                <p className="text-sm">Scanning GitHub for trending repositories...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-red-400"
              >
                <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-center max-w-md">{error}</p>
                <button
                  onClick={refresh}
                  className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-sm transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            ) : repos.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500"
              >
                <CodeIcon className="w-12 h-12 mb-4 opacity-20" />
                <p>No trending repositories found for this criteria.</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {repos.map((repo, index) => (
                  <RepoCard key={repo.id} repo={repo} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <ApiKeyModal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        onSave={handleSaveApiKey}
        initialValue={apiKey}
      />
    </div>
  );
}
