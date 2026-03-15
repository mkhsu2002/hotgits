import React from 'react';
import { motion } from 'motion/react';
import { Star, GitFork, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { GithubRepo } from '../types';

interface RepoCardProps {
  repo: GithubRepo;
  index: number;
}

export function RepoCard({ repo, index }: RepoCardProps) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      key={repo.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group block p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-800/50 hover:border-emerald-500/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="w-10 h-10 rounded-full bg-zinc-800"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-xs text-zinc-500 font-medium mb-0.5">{repo.owner.login}</p>
            <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors line-clamp-1">
              {repo.name}
            </h3>
          </div>
        </div>
      </div>

      <p className="text-sm text-zinc-400 mb-6 line-clamp-2 min-h-[2.5rem]">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-400/80 bg-emerald-400/10 px-2 py-1 rounded-md">
            <Star className="w-3.5 h-3.5" />
            <span className="font-medium">{repo.stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GitFork className="w-3.5 h-3.5" />
            <span>{repo.forks_count.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
              <span>{repo.language}</span>
            </div>
          )}
          <div
            className="flex items-center gap-1.5"
            title={`Created ${new Date(repo.created_at).toLocaleDateString()}`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDistanceToNow(new Date(repo.created_at))} ago</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
