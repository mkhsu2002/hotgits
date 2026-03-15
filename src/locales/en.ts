export const en = {
  header: {
    title: 'Hot GitHub Repos v0.5',
    subtitle: 'Track GitHub Trends with AI',
    settings: 'Settings'
  },
  filters: {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    all_languages: 'All Languages',
    bookmarks: 'My Bookmarks'
  },
  repo_card: {
    analyze: 'Analyze with AI',
    analyzing: 'Analyzing...',
    analyzed: 'Analyzed',
    bookmark: 'Bookmark',
    remove_bookmark: 'Remove Bookmark',
    no_description: 'No description provided.',
    last_updated: 'Last updated',
    ago: 'ago',
    ai_insight: 'AI Insight'
  },
  app: {
    loading: 'Scanning GitHub for trending repositories...',
    error: 'An error occurred while fetching data.',
    try_again: 'Try Again',
    no_repos: 'No trending repositories found for this criteria.',
    no_bookmarks: "You haven't bookmarked any repositories yet."
  },
  modal: {
    title: 'Setup Gemini API',
    subtitle: 'To ensure security, please use your own API Key.',
    disclaimer: 'Your key is stored only in your browser and will not be uploaded to any server.',
    placeholder: 'Enter your Gemini API Key',
    start: 'Start Using',
    no_key: 'No key? Get one for free here'
  }
};

export type Translations = typeof en;
