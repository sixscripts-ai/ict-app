import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import { initSparkShim } from './lib/llm-client'

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

// Initialize the window.spark shim before rendering
// so any code referencing window.spark.llm/llmPrompt works
initSparkShim()

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)
