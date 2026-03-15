import { Translations } from './en';

export const zh: Translations = {
  header: {
    title: 'hotgits',
    subtitle: '使用 AI 追蹤 GitHub 熱門趨勢',
    settings: '設定'
  },
  filters: {
    daily: '本日熱門',
    weekly: '本週熱門',
    monthly: '本月熱門',
    all_languages: '所有語言',
    bookmarks: '我的收藏'
  },
  repo_card: {
    analyze: 'AI 分析專案',
    analyzing: '正在分析...',
    analyzed: '分析完成',
    bookmark: '收藏專案',
    remove_bookmark: '移除收藏',
    no_description: '這個專案沒有提供描述。',
    last_updated: '最後更新',
    ago: '前',
    ai_insight: 'AI 洞察'
  },
  app: {
    loading: '正在掃描 GitHub 熱門專案...',
    error: '獲取資料時發生錯誤。',
    try_again: '再試一次',
    no_repos: '找不到符合條件的熱門專案。',
    no_bookmarks: "您尚未收藏任何專案。"
  },
  modal: {
    title: '設定 Gemini API',
    subtitle: '為了確保安全，請使用您自己的 API Key。',
    disclaimer: '您的 Key 只會儲存在瀏覽器中，不會上傳至伺服器。',
    placeholder: '輸入您的 Gemini API Key',
    start: '開始使用',
    no_key: '還沒有 Key? 點此免費獲取'
  }
};
