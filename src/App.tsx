import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Loader2, Code as CodeIcon, Bookmark as BookmarkIcon } from 'lucide-react';
import { useGithubTrending } from './hooks/useGithubTrending';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { RepoCard } from './components/RepoCard';
import { ApiKeyModal } from './components/ApiKeyModal';
import { TimeRange } from './services/github';
import { GithubRepo } from './types';
import { useI18n } from './hooks/useI18n';

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

const API_KEY_STORAGE_KEY = 'gemini_api_key';
const BOOKMARKS_STORAGE_KEY = 'gittrend_bookmarks';

export default function App() {
  const { t } = useI18n();
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [language, setLanguage] = useState('all');
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [bookmarks, setBookmarks] = useState<GithubRepo[]>([]);
  const { repos: trendingRepos, loading, error, refresh } = useGithubTrending(timeRange, language);

  useEffect(() => {
    // Load API Key
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      setShowApiModal(true);
    }

    // Load Bookmarks
    const savedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to parse bookmarks');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleSaveApiKey = (newKey: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, newKey);
    setApiKey(newKey);
  };

  const toggleBookmark = (repo: GithubRepo) => {
    setBookmarks(prev => {
      const isBookmarked = prev.some(b => b.id === repo.id);
      if (isBookmarked) {
        return prev.filter(b => b.id !== repo.id);
      } else {
        return [...prev, repo];
      }
    });
  };

  const isShowBookmarks = language === 'bookmarks';
  const displayRepos = isShowBookmarks ? bookmarks : trendingRepos;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-emerald-500/30">
      <Header onSettingsClick={() => setShowApiModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          language={language}
          setLanguage={setLanguage}
          languages={[...LANGUAGES, { value: 'bookmarks', label: t.filters.bookmarks }]}
        />

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading && !isShowBookmarks ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500"
              >
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
                <p className="text-sm">{t.app.loading}</p>
              </motion.div>
            ) : error && !isShowBookmarks ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-red-400"
              >
                <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-center max-w-md">{t.app.error}</p>
                <button
                  onClick={refresh}
                  className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-sm transition-colors border border-red-500/20"
                >
                  {t.app.try_again}
                </button>
              </motion.div>
            ) : displayRepos.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500"
              >
                {isShowBookmarks ? (
                  <>
                    <BookmarkIcon className="w-12 h-12 mb-4 opacity-20" />
                    <p>{t.app.no_bookmarks}</p>
                  </>
                ) : (
                  <>
                    <CodeIcon className="w-12 h-12 mb-4 opacity-20" />
                    <p>{t.app.no_repos}</p>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {displayRepos.map((repo, index) => (
                  <RepoCard 
                    key={repo.id} 
                    repo={repo} 
                    index={index} 
                    apiKey={apiKey}
                    isBookmarked={bookmarks.some(b => b.id === repo.id)}
                    onToggleBookmark={() => toggleBookmark(repo)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5">
        <div className="flex flex-col items-center justify-center gap-4 text-zinc-500">
          <p className="text-sm font-medium tracking-wide">
            open sourced @ FlyPig AI
          </p>
          <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">
            <span>Built with React 19</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span>Vite 6</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span>Gemini AI</span>
          </div>
        </div>
      </footer>

      <ApiKeyModal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        onSave={handleSaveApiKey}
        initialValue={apiKey}
      />
    </div>
  );
}
