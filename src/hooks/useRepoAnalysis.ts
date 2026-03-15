import { useState } from 'react';
import { analyzeRepo, GeminiAnalysis } from '../services/gemini';

export function useRepoAnalysis(apiKey: string) {
  const [analysis, setAnalysis] = useState<Record<string, GeminiAnalysis>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string | null>>({});

  const performAnalysis = async (
    repoId: string,
    repoName: string,
    description: string,
    language: string
  ) => {
    if (!apiKey) {
      setError(prev => ({ ...prev, [repoId]: '請先設定 Gemini API Key' }));
      return;
    }

    if (analysis[repoId]) return;

    setLoading(prev => ({ ...prev, [repoId]: true }));
    setError(prev => ({ ...prev, [repoId]: null }));

    try {
      const data = await analyzeRepo(repoName, description, language, apiKey);
      setAnalysis(prev => ({ ...prev, [repoId]: data }));
    } catch (err: any) {
      setError(prev => ({ ...prev, [repoId]: err.message || '分析失敗' }));
    } finally {
      setLoading(prev => ({ ...prev, [repoId]: false }));
    }
  };

  return { analysis, loading, error, performAnalysis };
}
