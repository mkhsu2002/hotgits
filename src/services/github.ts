import { GithubSearchResponse } from '../types';
import { subDays, formatISO } from 'date-fns';

export type TimeRange = 'daily' | 'weekly' | 'monthly';

export const fetchTrendingRepos = async (
  timeRange: TimeRange,
  language?: string
): Promise<GithubSearchResponse> => {
  const now = new Date();
  let dateFrom;

  switch (timeRange) {
    case 'daily':
      dateFrom = subDays(now, 1);
      break;
    case 'weekly':
      dateFrom = subDays(now, 7);
      break;
    case 'monthly':
      dateFrom = subDays(now, 30);
      break;
  }

  const formattedDate = formatISO(dateFrom, { representation: 'date' });
  let query = `created:>${formattedDate}`;
  
  if (language && language !== 'all') {
    query += ` language:${language}`;
  }

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    query
  )}&sort=stars&order=desc&per_page=30`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch trending repositories');
  }

  return response.json();
};
