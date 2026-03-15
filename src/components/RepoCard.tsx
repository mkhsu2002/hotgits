import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, GitFork, Calendar, Sparkles, Loader2, ChevronRight, Check, Bookmark, Scale, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { GithubRepo } from '../types';
import { useRepoAnalysis } from '../hooks/useRepoAnalysis';
import { useI18n } from '../hooks/useI18n';

interface RepoCardProps {
  key?: React.Key;
  repo: GithubRepo;
  index: number;
  apiKey: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export function RepoCard({ repo, index, apiKey, isBookmarked, onToggleBookmark }: RepoCardProps) {
  const { t } = useI18n();
  const { analysis, loading, error, performAnalysis } = useRepoAnalysis(apiKey);
  const repoAnalysis = analysis[repo.id];
  const isAnalyzing = loading[repo.id];
  const analysisError = error[repo.id];

  const handleAnalyze = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    performAnalysis(
      repo.id.toString(),
      repo.full_name || repo.name,
      repo.description || '',
      repo.language || 'Unknown'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex flex-col p-5 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-800/60 hover:border-emerald-500/30 transition-all duration-500 shadow-xl overflow-hidden"
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 z-0"
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              className="w-10 h-10 rounded-2xl bg-zinc-800 shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <p className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase mb-0.5">{repo.owner.login}</p>
              <h3 className="text-sm font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                {repo.name}
              </h3>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleBookmark();
              }}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isBookmarked 
                  ? 'bg-amber-500/20 text-amber-400' 
                  : 'bg-white/5 text-zinc-400 hover:bg-amber-500/20 hover:text-amber-400'
              }`}
              title={isBookmarked ? t.repo_card.remove_bookmark : t.repo_card.bookmark}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`p-2 rounded-xl transition-all duration-300 ${
                repoAnalysis 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-white/5 text-zinc-400 hover:bg-emerald-500/20 hover:text-emerald-400'
              }`}
              title={t.repo_card.analyze}
            >
              {isAnalyzing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : repoAnalysis ? (
                <Check className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <p className="text-sm text-zinc-400 mb-6 line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {repo.description || t.repo_card.no_description}
        </p>

        <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-lg border border-emerald-400/10" title="Stars">
              <Star className="w-3 h-3" />
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5" title="Forks">
              <GitFork className="w-3 h-3" />
              <span>{repo.forks_count.toLocaleString()}</span>
            </div>
            {repo.open_issues_count > 0 && (
              <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5" title="Open Issues">
                <AlertCircle className="w-3 h-3 text-amber-500/70" />
                <span>{repo.open_issues_count}</span>
              </div>
            )}
            {repo.license && (
              <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5" title={repo.license.name}>
                <Scale className="w-3 h-3" />
                <span>{repo.license.spdx_id || 'License'}</span>
              </div>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-3">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <span className="font-medium">{repo.language}</span>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {repoAnalysis && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2 text-emerald-400">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">{t.repo_card.ai_insight}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed mb-3 font-medium">
                  {repoAnalysis.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {repoAnalysis.highlights.map((h, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {analysisError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] text-red-400"
            >
              {analysisError}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto flex items-center justify-between text-[10px] text-zinc-600">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3 h-3" />
            <span>{t.repo_card.last_updated} {formatDistanceToNow(new Date(repo.updated_at || repo.created_at))} {t.repo_card.ago}</span>
          </div>
          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}
