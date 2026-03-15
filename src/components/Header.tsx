import React from 'react';
import { TrendingUp, Github, Settings, Languages } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

interface HeaderProps {
  onSettingsClick: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {t.header.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all border border-transparent hover:border-emerald-500/20"
            title="Switch Language"
          >
            <Languages className="w-4 h-4" />
            <span className="uppercase">{locale}</span>
          </button>
          
          <button
            onClick={onSettingsClick}
            className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all border border-transparent hover:border-emerald-500/20"
            title={t.header.settings}
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="w-px h-4 bg-white/10 mx-1"></div>
          
          <a
            href="https://github.com/mkhsu2002/github-hot"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
