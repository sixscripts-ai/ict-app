/**
 * Multi-provider LLM client.
 *
 * Supports: OpenAI, Anthropic, Google Gemini, MiniMax, and Ollama (local).
 * Also provides a window.spark shim for legacy code that uses
 * window.spark.llmPrompt / window.spark.llm.
 */

export type ProviderType = 'openai' | 'anthropic' | 'gemini' | 'minimax' | 'ollama';

const SYSTEM_PROMPT =
  'You are an expert on ICT (Inner Circle Trader) trading methodology. Be precise, technical, and reference specific ICT concepts.';

// ---------------------------------------------------------------------------
// Storage keys
// ---------------------------------------------------------------------------
const STORAGE_PROVIDER    = 'ict-llm-provider';
const STORAGE_KEY_PREFIX  = 'ict-llm-key-';
const STORAGE_MODEL_PREFIX = 'ict-llm-model-';
const STORAGE_OLLAMA_URL  = 'ict-llm-ollama-url';

// ---------------------------------------------------------------------------
// Provider metadata
// ---------------------------------------------------------------------------
export interface ModelOption { value: string; label: string }

export interface ProviderConfig {
  id: ProviderType;
  name: string;
  defaultBaseUrl: string;
  defaultModel: string;
  models: ModelOption[];
  requiresApiKey: boolean;
  showBaseUrl: boolean;
  apiKeyPlaceholder: string;
  apiKeyHint: string;
  docsUrl: string;
}

export const PROVIDERS: Record<ProviderType, ProviderConfig> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    defaultBaseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o',
    models: [
      { value: 'gpt-4o',       label: 'GPT-4o' },
      { value: 'gpt-4o-mini',  label: 'GPT-4o Mini' },
      { value: 'gpt-4-turbo',  label: 'GPT-4 Turbo' },
      { value: 'o1-mini',      label: 'o1 Mini' },
      { value: 'o3-mini',      label: 'o3 Mini' },
    ],
    requiresApiKey: true,
    showBaseUrl: false,
    apiKeyPlaceholder: 'sk-...',
    apiKeyHint: 'Get your key at platform.openai.com',
    docsUrl: 'https://platform.openai.com/api-keys',
  },

  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    defaultBaseUrl: 'https://api.anthropic.com/v1',
    defaultModel: 'claude-3-5-sonnet-20241022',
    models: [
      { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
      { value: 'claude-3-5-haiku-20241022',  label: 'Claude 3.5 Haiku' },
      { value: 'claude-3-opus-20240229',     label: 'Claude 3 Opus' },
      { value: 'claude-3-haiku-20240307',    label: 'Claude 3 Haiku' },
    ],
    requiresApiKey: true,
    showBaseUrl: false,
    apiKeyPlaceholder: 'sk-ant-...',
    apiKeyHint: 'Get your key at console.anthropic.com',
    docsUrl: 'https://console.anthropic.com/settings/keys',
  },

  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    defaultBaseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    defaultModel: 'gemini-2.0-flash',
    models: [
      { value: 'gemini-2.0-flash',     label: 'Gemini 2.0 Flash' },
      { value: 'gemini-1.5-pro',       label: 'Gemini 1.5 Pro' },
      { value: 'gemini-1.5-flash',     label: 'Gemini 1.5 Flash' },
      { value: 'gemini-1.5-flash-8b',  label: 'Gemini 1.5 Flash 8B' },
    ],
    requiresApiKey: true,
    showBaseUrl: false,
    apiKeyPlaceholder: 'AIza...',
    apiKeyHint: 'Get your key at aistudio.google.com',
    docsUrl: 'https://aistudio.google.com/app/apikey',
  },

  minimax: {
    id: 'minimax',
    name: 'MiniMax',
    defaultBaseUrl: 'https://api.minimax.io/v1',
    defaultModel: 'MiniMax-M2.5',
    models: [
      { value: 'MiniMax-M2.5',     label: 'MiniMax M2.5' },
      { value: 'MiniMax-M1',       label: 'MiniMax M1' },
      { value: 'MiniMax-Text-01',  label: 'MiniMax Text-01' },
    ],
    requiresApiKey: true,
    showBaseUrl: false,
    apiKeyPlaceholder: 'eyJ...',
    apiKeyHint: 'Get your key at platform.minimax.io',
    docsUrl: 'https://platform.minimax.io/user-center/basic-information/interface-key',
  },

  ollama: {
    id: 'ollama',
    name: 'Ollama',
    defaultBaseUrl: 'http://localhost:11434/v1',
    defaultModel: 'llama3.2',
    models: [
      { value: 'llama3.2',          label: 'Llama 3.2 (3B)' },
      { value: 'llama3.2:1b',       label: 'Llama 3.2 (1B)' },
      { value: 'llama3.1',          label: 'Llama 3.1 (8B)' },
      { value: 'llama3.1:70b',      label: 'Llama 3.1 (70B)' },
      { value: 'mistral',           label: 'Mistral 7B' },
      { value: 'mixtral',           label: 'Mixtral 8x7B' },
      { value: 'deepseek-r1',       label: 'DeepSeek R1' },
      { value: 'phi4',              label: 'Phi-4' },
      { value: 'qwen2.5',           label: 'Qwen 2.5' },
    ],
    requiresApiKey: false,
    showBaseUrl: true,
    apiKeyPlaceholder: '',
    apiKeyHint: 'Ollama runs locally — no API key required.',
    docsUrl: 'https://ollama.com',
  },
};

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------
export function getActiveProvider(): ProviderType {
  const stored = localStorage.getItem(STORAGE_PROVIDER);
  if (stored && stored in PROVIDERS) return stored as ProviderType;
  // Migrate: if old single-key exists, assume openai
  if (localStorage.getItem('ict-llm-api-key')) return 'openai';
  return 'openai';
}

export function setActiveProvider(provider: ProviderType): void {
  localStorage.setItem(STORAGE_PROVIDER, provider);
}

export function getProviderApiKey(provider: ProviderType): string | null {
  const key = localStorage.getItem(STORAGE_KEY_PREFIX + provider);
  if (key) return key;
  // Migrate legacy openai key
  if (provider === 'openai') {
    const legacy = localStorage.getItem('ict-llm-api-key');
    if (legacy) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'openai', legacy);
      localStorage.removeItem('ict-llm-api-key');
      return legacy;
    }
  }
  return null;
}

export function setProviderApiKey(provider: ProviderType, key: string): void {
  localStorage.setItem(STORAGE_KEY_PREFIX + provider, key);
}

export function removeProviderApiKey(provider: ProviderType): void {
  localStorage.removeItem(STORAGE_KEY_PREFIX + provider);
}

export function getProviderModel(provider: ProviderType): string {
  return (
    localStorage.getItem(STORAGE_MODEL_PREFIX + provider) ||
    PROVIDERS[provider].defaultModel
  );
}

export function setProviderModel(provider: ProviderType, model: string): void {
  localStorage.setItem(STORAGE_MODEL_PREFIX + provider, model);
}

export function getOllamaUrl(): string {
  return localStorage.getItem(STORAGE_OLLAMA_URL) || PROVIDERS.ollama.defaultBaseUrl;
}

export function setOllamaUrl(url: string): void {
  localStorage.setItem(STORAGE_OLLAMA_URL, url);
}

export function isLLMConfigured(): boolean {
  const provider = getActiveProvider();
  if (provider === 'ollama') return true;
  return !!getProviderApiKey(provider);
}

// Legacy shim functions removed (unused)
// getApiKey, setApiKey, removeApiKey, getBaseUrl, setBaseUrl


// ---------------------------------------------------------------------------
// llmPrompt — tagged template literal helper
// ---------------------------------------------------------------------------
export function llmPrompt(strings: TemplateStringsArray | string[], ...values: unknown[]): string {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Per-provider fetch implementations
// ---------------------------------------------------------------------------
async function callOpenAICompatible(
  promptStr: string,
  model: string,
  baseUrl: string,
  apiKey: string,
  jsonMode: boolean,
): Promise<string> {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: promptStr },
      ],
      ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err.slice(0, 200)}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response generated.';
}

async function callAnthropic(
  promptStr: string,
  model: string,
  apiKey: string,
  jsonMode: boolean,
): Promise<string> {
  const systemContent = SYSTEM_PROMPT + (jsonMode ? ' Always respond with valid JSON.' : '');
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system: systemContent,
      messages: [{ role: 'user', content: promptStr }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API ${response.status}: ${err.slice(0, 200)}`);
  }
  const data = await response.json();
  return data.content?.[0]?.text || 'No response generated.';
}

async function callGemini(
  promptStr: string,
  model: string,
  apiKey: string,
  jsonMode: boolean,
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const systemText = SYSTEM_PROMPT + (jsonMode ? ' Always respond with valid JSON.' : '');
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemText }] },
      contents: [{ role: 'user', parts: [{ text: promptStr }] }],
      generationConfig: {
        maxOutputTokens: 4096,
        temperature: 0.7,
        ...(jsonMode ? { responseMimeType: 'application/json' } : {}),
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API ${response.status}: ${err.slice(0, 200)}`);
  }
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
}

// ---------------------------------------------------------------------------
// Main llm() function
// ---------------------------------------------------------------------------
export async function llm(
  prompt: string | string[],
  _model?: string,
  jsonMode = false,
): Promise<string> {
  const provider = getActiveProvider();
  const apiKey   = getProviderApiKey(provider);
  const model    = getProviderModel(provider);
  const promptStr = Array.isArray(prompt) ? prompt.join('') : prompt;

  if (provider !== 'ollama' && !apiKey) {
    return jsonMode
      ? JSON.stringify({ error: 'No API key configured. Open Settings to configure your AI provider.' })
      : 'AI features require an API key. Open Settings (gear icon) to configure your AI provider.';
  }

  try {
    switch (provider) {
      case 'anthropic':
        return await callAnthropic(promptStr, model, apiKey!, jsonMode);

      case 'gemini':
        return await callGemini(promptStr, model, apiKey!, jsonMode);

      case 'openai':
      case 'minimax': {
        const baseUrl = PROVIDERS[provider].defaultBaseUrl;
        return await callOpenAICompatible(promptStr, model, baseUrl, apiKey!, jsonMode);
      }

      case 'ollama': {
        const baseUrl = getOllamaUrl();
        return await callOpenAICompatible(promptStr, model, baseUrl, 'ollama', jsonMode);
      }
    }
  } catch (error) {
    console.error('[LLM] Request failed:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return jsonMode
        ? JSON.stringify({ error: 'Network error — check your connection and endpoint.' })
        : 'Network error — unable to reach the LLM API. Check your connection and endpoint in Settings.';
    }
    throw error;
  }
}

// ---------------------------------------------------------------------------
// window.spark shim
// ---------------------------------------------------------------------------
export function initSparkShim(): void {
  (window as any).spark = {
    llmPrompt,
    llm,
    kv: {
      keys: async () => {
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith('ict-kv:')) keys.push(key.slice(7));
        }
        return keys;
      },
      get: async <T,>(key: string): Promise<T | undefined> => {
        try {
          const raw = localStorage.getItem('ict-kv:' + key);
          return raw ? JSON.parse(raw) : undefined;
        } catch { return undefined; }
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
