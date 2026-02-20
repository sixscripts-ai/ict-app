/// <reference types="vite/client" />

interface Window {
  spark: {
    llmPrompt(strings: TemplateStringsArray | string[], ...values: any[]): string;
    llm(prompt: string | string[], model?: string, jsonMode?: boolean): Promise<string>;
    kv: {
      keys(): Promise<string[]>;
      get<T>(key: string): Promise<T | undefined>;
      set<T>(key: string, value: T): Promise<void>;
      delete(key: string): Promise<void>;
    };
    user(): Promise<{ login: string }>;
  };
}

declare module 'jspdf' {
  class jsPDF {
    constructor(...args: any[]);
    text(text: string, x: number, y: number, options?: any): jsPDF;
    setFontSize(size: number): jsPDF;
    setFont(font: string, style?: string): jsPDF;
    setTextColor(...args: any[]): jsPDF;
    setDrawColor(...args: any[]): jsPDF;
    setFillColor(...args: any[]): jsPDF;
    rect(x: number, y: number, w: number, h: number, style?: string): jsPDF;
    roundedRect(x: number, y: number, w: number, h: number, rx: number, ry: number, style?: string): jsPDF;
    line(x1: number, y1: number, x2: number, y2: number): jsPDF;
    addPage(): jsPDF;
    save(filename: string): jsPDF;
    output(type: string): any;
    getNumberOfPages(): number;
    setPage(page: number): jsPDF;
    internal: { pageSize: { getWidth: () => number; getHeight: () => number } };
    addImage(data: string, format: string, x: number, y: number, w: number, h: number): jsPDF;
  }
  export default jsPDF;
}

declare module 'html2canvas' {
  function html2canvas(element: HTMLElement, options?: any): Promise<HTMLCanvasElement>;
  export default html2canvas;
}
