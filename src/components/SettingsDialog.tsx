import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Key, CheckCircle, XCircle, ArrowSquareOut, Info } from '@phosphor-icons/react';
import { getApiKey, setApiKey, removeApiKey, getBaseUrl, setBaseUrl, isLLMConfigured } from '@/lib/llm-client';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [apiKey, setApiKeyState] = useState(() => getApiKey() || '');
  const [baseUrl, setBaseUrlState] = useState(() => getBaseUrl());
  const [isTesting, setIsTesting] = useState(false);

  const configured = isLLMConfigured();

  const handleSave = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey.trim());
    } else {
      removeApiKey();
    }
    setBaseUrl(baseUrl.trim() || 'https://api.openai.com/v1');
    toast.success('Settings saved');
    onOpenChange(false);
  };

  const handleTest = async () => {
    if (!apiKey.trim()) {
      toast.error('Enter an API key first');
      return;
    }
    setIsTesting(true);
    try {
      const { llm } = await import('@/lib/llm-client');
      // Temporarily save so llm() picks it up
      setApiKey(apiKey.trim());
      setBaseUrl(baseUrl.trim() || 'https://api.openai.com/v1');
      const result = await llm('Reply with exactly: "OK"', 'gpt-4o-mini');
      if (result.toLowerCase().includes('ok') || result.length < 100) {
        toast.success('API key works!', { description: result.slice(0, 80) });
      } else {
        toast.success('Connected!', { description: result.slice(0, 80) });
      }
    } catch (err) {
      toast.error('Connection failed', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleClear = () => {
    removeApiKey();
    setApiKeyState('');
    toast.info('API key removed');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key size={18} className="text-primary" />
            AI Settings
          </DialogTitle>
          <DialogDescription>
            Configure your LLM API key to enable AI-powered features (Chat, Training, Pattern Analysis).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            {configured ? (
              <Badge variant="outline" className="gap-1 border-green-500/40 text-green-400">
                <CheckCircle size={12} weight="fill" />
                API key configured
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 border-destructive/40 text-destructive">
                <XCircle size={12} weight="fill" />
                No API key
              </Badge>
            )}
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="api-key">OpenAI API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Your key is stored only in your browser's localStorage and never sent anywhere except the API endpoint below.
            </p>
          </div>

          {/* Base URL */}
          <div className="space-y-2">
            <Label htmlFor="base-url">API Base URL</Label>
            <Input
              id="base-url"
              type="url"
              placeholder="https://api.openai.com/v1"
              value={baseUrl}
              onChange={(e) => setBaseUrlState(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Use OpenRouter, Groq, local Ollama, or any OpenAI-compatible endpoint.
            </p>
          </div>

          {/* Compatible providers */}
          <Card className="p-3 bg-secondary/30 border-border/40">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info size={14} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground mb-1">Compatible providers</p>
                <ul className="space-y-0.5 list-none">
                  <li>• <strong>OpenAI</strong> — api.openai.com/v1 (gpt-4o, gpt-4o-mini)</li>
                  <li>• <strong>OpenRouter</strong> — openrouter.ai/api/v1 (many models)</li>
                  <li>• <strong>Groq</strong> — api.groq.com/openai/v1 (llama, mixtral)</li>
                  <li>• <strong>Ollama</strong> — localhost:11434/v1 (local models)</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleTest} disabled={isTesting || !apiKey.trim()}>
              {isTesting ? 'Testing...' : 'Test connection'}
            </Button>
            {configured && (
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={handleClear}>
                Remove key
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>

        <div className="pt-1 border-t border-border/40 mt-1">
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            Get an OpenAI API key
            <ArrowSquareOut size={11} />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
