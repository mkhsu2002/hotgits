# GitTrend v0.2 - GitHub Trend Tracker

一個美觀且現代化的 GitHub 熱門專案追蹤工具，基於 React 19 與 Vite 6 構建。

## 🚀 功能特點
- **實時追蹤**: 向 GitHub Search API 獲取每日、每週、每月的熱門專案。
- **語言篩選**: 快速切換不同程式語言的趨勢。
- **極簡美學**: 採用深色模式、毛玻璃效果與平滑動畫。
- **優化設計**: (v0.2) 核心元件拆解、客製化 Hook 分離商業邏輯。
- **部署就緒**: 針對 Cloudflare Pages 進行了安全性標頭與環境配置。

## 🛠 技術棧
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4, Lucide React (Icons)
- **Animation**: Motion (Framer Motion)
- **Tooling**: Vite 6, date-fns

## 📦 版本說明
### v0.2 (當前)
- **程式碼重構**: 將 `App.tsx` 拆分為 `Header`, `Filters`, `RepoCard` 等可複用元件。
- **架構優化**: 引入 `useGithubTrending` Hook 管理資料獲取狀態。
- **部署增強**: 加入 `_headers` 安全設定。
- **準備部署**: 具備 Cloudflare Pages 部署條件。

### v0.1
- 初始版本：核心追蹤功能與基本介面。

## 🛠 本地開發
```bash
npm install
npm run dev
```

## 🌐 部署至 Cloudflare Pages
1. 將專案推送到 GitHub。
2. 在 Cloudflare 控制台連接此倉庫。
3. Build command: `npm run build`
4. Build output directory: `dist`
