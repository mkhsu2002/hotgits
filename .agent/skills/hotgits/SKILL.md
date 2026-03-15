---
name: hotgits-dev
description: 專指 hotgits (Hot GitHub Repos) 專案的開發與維護規範
---

# Hot GitHub Repos (hotgits) 開發指令

當你參與此專案的開發或維護時，必須嚴格遵守以下規則：

## 1. AI 模型配置 (核心規則)
- **禁止硬編碼**：禁止在 Service 中直接寫死模型名稱或 API 網址。
- **統一來源**：所有 AI 相關設定必須引用 `src/config.ts` 中的 `AI_CONFIG`。
- **預設型號**：目前使用 `gemini-3-flash-preview` (API v1beta)。

## 2. 安全性與 CSP
- **Content Security Policy**：本專案使用 `public/_headers` 管理 Cloudflare Pages 的安全標頭。
- **連線許可**：若新增或更換 API 網址，必須同步更新 `_headers` 中的 `connect-src` 指令，否則瀏覽器會阻擋請求。

## 3. 品牌與 UI 規範
- **專案標題**：UI 顯示標題統一為 `Hot GitHub Repos v0.5`。
- **i18n**：禁止在元件中直接寫入硬編碼的繁體中文或英文，必須更新 `src/locales/` 下的翻譯檔。
- **頁尾標記**：頁尾必須保留 `open sourced @ FlyPig AI`。

## 4. 技術棧
- **Frontend**: React 19 (using `motion/react` for animations)
- **Tooling**: Vite 6
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React

## 5. 常見任務指令
- **更換模型**：修改 `src/config.ts` 中的 `modelId`。
- **新增語系文字**：同時更新 `src/locales/zh.ts` 與 `src/locales/en.ts` 並確保 Key 值對應。
