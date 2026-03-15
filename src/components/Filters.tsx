import React from 'react';
import { Code } from 'lucide-react';
import { TimeRange } from '../services/github';

interface FiltersProps {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  language: string;
  setLanguage: (lang: string) => void;
  languages: { value: string; label: string }[];
}

export function Filters({ timeRange, setTimeRange, language, setLanguage, languages }: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
      <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
        {(['daily', 'weekly', 'monthly'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
              timeRange === range
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="relative">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="appearance-none bg-zinc-900/50 border border-white/5 text-zinc-300 text-sm rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all cursor-pointer"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value} className="bg-zinc-900">
              {lang.label}
            </option>
          ))}
        </select>
        <Code className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  );
}
