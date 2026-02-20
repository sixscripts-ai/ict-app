/**
 * Spark LLM API replacement.
 * 
 * Provides a drop-in replacement for window.spark.llmPrompt and window.spark.llm.
 * 
 * When an API key is configured (via localStorage "ict-llm-api-key"), it calls
 * the OpenAI-compatible chat completions endpoint. Otherwise, it returns a
 * graceful "no API key configured" message so the app doesn't crash.
 * 
 * The base URL can also be configured via localStorage "ict-llm-base-url" to
 * support OpenRouter, local models, etc.
 */

const LLM_API_KEY_STORAGE = 'ict-llm-api-key';
const LLM_BASE_URL_STORAGE = 'ict-llm-base-url';
const DEFAULT_BASE_URL = 'https://api.openai.com/v1';

export function getApiKey(): string | null {
  return localStorage.getItem(LLM_API_KEY_STORAGE);
}

export function setApiKey(key: string): void {
  localStorage.setItem(LLM_API_KEY_STORAGE, key);
}

export function removeApiKey(): void {
  localStorage.removeItem(LLM_API_KEY_STORAGE);
}

export function getBaseUrl(): string {
  return localStorage.getItem(LLM_BASE_URL_STORAGE) || DEFAULT_BASE_URL;
}

export function setBaseUrl(url: string): void {
  localStorage.setItem(LLM_BASE_URL_STORAGE, url);
}

export function isLLMConfigured(): boolean {
  return !!getApiKey();
}

/**
 * Tagged template literal replacement for window.spark.llmPrompt.
 * Joins template strings and interpolated values into a single prompt string.
 */
export function llmPrompt(strings: TemplateStringsArray | string[], ...values: any[]): string {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += String(values[i]);
    }
  }
  return result;
}

/**
 * Drop-in replacement for window.spark.llm.
 * Calls an OpenAI-compatible chat completions API.
 * 
 * @param prompt - The prompt string (from llmPrompt)
 * @param model - Model name (default: gpt-4o)
 * @param jsonMode - Whether to request JSON output
 */
export async function llm(
  prompt: string | string[],
  model: string = 'gpt-4o',
  jsonMode: boolean = false
): Promise<string> {
  const apiKey = getApiKey();
  const baseUrl = getBaseUrl();

  // If prompt is an array (legacy Spark format), join it
  const promptStr = Array.isArray(prompt) ? prompt.join('') : prompt;

  if (!apiKey) {
    return jsonMode
      ? JSON.stringify({ error: 'No API key configured. Go to Settings to add your OpenAI API key.' })
      : 'AI features require an API key. Open the Settings panel (gear icon in the header) to configure your OpenAI API key. You can also use OpenRouter or any OpenAI-compatible endpoint.';
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert on ICT (Inner Circle Trader) trading methodology. Be precise, technical, and reference specific ICT concepts.',
          },
          {
            role: 'user',
            content: promptStr,
          },
        ],
        ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[LLM] API error:', response.status, errorBody);
      throw new Error(`API error ${response.status}: ${errorBody.slice(0, 200)}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response generated.';
  } catch (error) {
    console.error('[LLM] Request failed:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return jsonMode
        ? JSON.stringify({ error: 'Network error — check your internet connection.' })
        : 'Network error — unable to reach the LLM API. Check your internet connection and API endpoint configuration.';
    }
    throw error;
  }
}

/**
 * Initialize the window.spark shim so existing code that uses
 * window.spark.llmPrompt and window.spark.llm continues to work.
 */
export function initSparkShim(): void {
  (window as any).spark = {
    llmPrompt,
    llm,
    kv: {
      keys: async () => {
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith('ict-kv:')) {
            keys.push(key.slice(7));
          }
        }
        return keys;
      },
      get: async <T,>(key: string): Promise<T | undefined> => {
        try {
          const raw = localStorage.getItem('ict-kv:' + key);
          return raw ? JSON.parse(raw) : undefined;
        } catch {
          return undefined;
        }
      },
      set: async <T,>(key: string, value: T): Promise<void> => {
        localStorage.setItem('ict-kv:' + key, JSON.stringify(value));
      },
      delete: async (key: string): Promise<void> => {
        localStorage.removeItem('ict-kv:' + key);
      },
    },
    user: async () => ({ login: 'local-user' }),
  };
}
