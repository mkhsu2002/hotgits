import { useState, useEffect } from 'react';
import { fetchTrendingRepos, TimeRange } from '../services/github';
import { GithubRepo } from '../types';

export function useGithubTrending(timeRange: TimeRange, language: string) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTrendingRepos(timeRange, language);
      setRepos(data.items);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, [timeRange, language]);

  return { repos, loading, error, refresh: loadRepos };
}
