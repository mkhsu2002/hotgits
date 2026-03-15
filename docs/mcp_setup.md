# Google AI MCP Server 設置指南

為了讓 AI 助理（如 Claude、Cline 或 Cursor）能夠更穩定且標準化地調用 Gemini API，我們建議安裝官方提供的 `google-ai` MCP Server。

## 為什麼要安裝？
- **一致性**：避免硬編碼 URL 或模型名稱。
- **標準化**：使用官方維護的工具集進行生成與分析。
- **自動化**：AI 可以自動發現並使用最適合的模型。

## 設置步驟

### 1. 獲取 Gemini API Key
如果您還沒有 API Key，請至 [Google AI Studio](https://aistudio.google.com/app/apikey) 申請。

### 2. 配置 MCP Settings
請根據您使用的工具，找到對應的設定檔並加入以下 JSON 片段。

#### 適用於 Claude Desktop / Cline (VS Code) / Cursor
請找到 `mcp_settings.json` 或 `claude_desktop_config.json`，在 `mcpServers` 區塊中加入：

```json
{
  "mcpServers": {
    "google-ai": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-google-ai"
      ],
      "env": {
        "GOOGLE_AI_API_KEY": "您的_GEMINI_API_KEY"
      }
    }
  }
}
```

### 3. 重啟工具
保存設定後，重啟您的 IDE 或 Claude Desktop 即可生效。

## 如何驗證？
在對話中輸入 `/mcp` 或詢問 AI：「請列出目前可用的 MCP 工具」，若看到 `google-ai` 相關工具即表示安裝成功。
