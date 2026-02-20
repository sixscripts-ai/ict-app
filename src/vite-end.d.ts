/// <reference types="vite/client" />
declare const GITHUB_RUNTIME_PERMANENT_NAME: string
declare const BASE_KV_SERVICE_URL: string

interface SparkAPI {
  llmPrompt(strings: TemplateStringsArray, ...values: any[]): string[];
  llm(prompt: string[], model?: string, json?: boolean): Promise<string>;
}

declare const spark: SparkAPI;

interface Window {
  spark: SparkAPI;
}