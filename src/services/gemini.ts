
export interface GeminiAnalysis {
  summary: string;
  highlights: string[];
  useCases: string[];
}

export const analyzeRepo = async (
  repoName: string,
  description: string,
  language: string,
  apiKey: string
): Promise<GeminiAnalysis> => {
  const prompt = `
你是一個專業的開源軟體分析師。請針對以下 GitHub 專案提供簡短且精確的分析（使用繁體中文）。

專案名稱: ${repoName}
描述: ${description}
主要語言: ${language}

請回傳 JSON 格式如下：
{
  "summary": "一句話總結這個專案的核心價值",
  "highlights": ["亮點 1", "亮點 2", "亮點 3"],
  "useCases": ["適用場景 1", "適用場景 2"]
}
  `;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Gemini 服務暫時無法使用');
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!content) {
    throw new Error('Gemini 未能產生有效的分析內容');
  }

  try {
    return JSON.parse(content) as GeminiAnalysis;
  } catch (e) {
    console.error('Failed to parse Gemini response:', content);
    throw new Error('Gemini 回傳格式錯誤');
  }
};
