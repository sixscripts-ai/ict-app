import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Key, CheckCircle, XCircle, ArrowSquareOut, Brain, Robot, Star, Lightning, Desktop } from '@phosphor-icons/react';
import {
  PROVIDERS,
  type ProviderType,
  getActiveProvider,
  setActiveProvider,
  getProviderApiKey,
  setProviderApiKey,
  removeProviderApiKey,
  getProviderModel,
  setProviderModel,
  getOllamaUrl,
  setOllamaUrl,
  llm,
} from '@/lib/llm-client';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PROVIDER_ICONS: Record<ProviderType, React.ReactNode> = {
  openai:    <Brain size={20} weight="duotone" />,
  anthropic: <Robot size={20} weight="duotone" />,
  gemini:    <Star size={20} weight="duotone" />,
  minimax:   <Lightning size={20} weight="duotone" />,
  ollama:    <Desktop size={20} weight="duotone" />,
};

const PROVIDER_COLORS: Record<ProviderType, string> = {
  openai:    'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  anthropic: 'text-orange-400 border-orange-500/40 bg-orange-500/10',
  gemini:    'text-blue-400 border-blue-500/40 bg-blue-500/10',
  minimax:   'text-violet-400 border-violet-500/40 bg-violet-500/10',
  ollama:    'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
};

const PROVIDER_ACTIVE_COLORS: Record<ProviderType, string> = {
  openai:    'border-emerald-500 bg-emerald-500/15 shadow-emerald-500/20',
  anthropic: 'border-orange-500 bg-orange-500/15 shadow-orange-500/20',
  gemini:    'border-blue-500 bg-blue-500/15 shadow-blue-500/20',
  minimax:   'border-violet-500 bg-violet-500/15 shadow-violet-500/20',
  ollama:    'border-cyan-500 bg-cyan-500/15 shadow-cyan-500/20',
};

const PROVIDER_ORDER: ProviderType[] = ['openai', 'anthropic', 'gemini', 'minimax', 'ollama'];

function isConfigured(provider: ProviderType): boolean {
  if (provider === 'ollama') return true;
  return !!getProviderApiKey(provider);
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>(() => getActiveProvider());
  const [apiKey, setApiKeyState] = useState('');
  const [model, setModel] = useState('');
  const [ollamaUrl, setOllamaUrlState] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  // Load state when provider or dialog opens
  useEffect(() => {
    if (!open) return;
    setSelectedProvider(getActiveProvider());
  }, [open]);

  useEffect(() => {
    setApiKeyState(getProviderApiKey(selectedProvider) || '');
    const savedModel = getProviderModel(selectedProvider);
    const presetValues = PROVIDERS[selectedProvider].models.map(m => m.value);
    if (presetValues.includes(savedModel)) {
      setModel(savedModel);
      setCustomModel('');
    } else {
      setModel('__custom__');
      setCustomModel(savedModel);
    }
    setOllamaUrlState(getOllamaUrl());
  }, [selectedProvider]);

  const handleProviderSelect = (provider: ProviderType) => {
    setSelectedProvider(provider);
  };

  const resolvedModel = model === '__custom__' ? customModel.trim() : model;

  const handleSave = () => {
    // Save active provider
    setActiveProvider(selectedProvider);
    // Save API key
    if (selectedProvider !== 'ollama') {
      if (apiKey.trim()) {
        setProviderApiKey(selectedProvider, apiKey.trim());
      } else {
        removeProviderApiKey(selectedProvider);
      }
    }
    // Save model
    if (resolvedModel) {
      setProviderModel(selectedProvider, resolvedModel);
    }
    // Save Ollama URL
    if (selectedProvider === 'ollama') {
      setOllamaUrl(ollamaUrl.trim() || PROVIDERS.ollama.defaultBaseUrl);
    }
    toast.success('Settings saved', {
      description: `Active provider: ${PROVIDERS[selectedProvider].name} — ${resolvedModel || PROVIDERS[selectedProvider].defaultModel}`,
    });
    onOpenChange(false);
  };

  const handleTest = async () => {
    if (selectedProvider !== 'ollama' && !apiKey.trim()) {
      toast.error('Enter an API key first');
      return;
    }
    setIsTesting(true);
    // Temporarily persist so llm() picks it up
    setActiveProvider(selectedProvider);
    if (apiKey.trim()) setProviderApiKey(selectedProvider, apiKey.trim());
    if (resolvedModel) setProviderModel(selectedProvider, resolvedModel);
    if (selectedProvider === 'ollama') setOllamaUrl(ollamaUrl.trim() || PROVIDERS.ollama.defaultBaseUrl);

    try {
      const result = await llm('Reply with exactly: "OK"');
      if (result.toLowerCase().includes('ok') || result.length < 150) {
        toast.success('Connection successful!', { description: result.slice(0, 100) });
      } else {
        toast.success('Connected!', { description: result.slice(0, 100) });
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
    removeProviderApiKey(selectedProvider);
    setApiKeyState('');
    toast.info(`${PROVIDERS[selectedProvider].name} API key removed`);
  };

  const config = PROVIDERS[selectedProvider];
  const keyConfigured = isConfigured(selectedProvider);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key size={18} className="text-primary" />
            AI Model Configuration
          </DialogTitle>
          <DialogDescription>
            Choose a provider, set your API key, and select a model.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-1">

          {/* Provider picker */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Provider</Label>
            <div className="grid grid-cols-5 gap-2">
              {PROVIDER_ORDER.map((pid) => {
                const active = pid === selectedProvider;
                const configured = isConfigured(pid);
                return (
                  <button
                    key={pid}
                    onClick={() => handleProviderSelect(pid)}
                    className={[
                      'flex flex-col items-center gap-1.5 p-2.5 rounded-lg border transition-all text-center',
                      'hover:border-primary/50 hover:bg-primary/5',
                      active
                        ? `border shadow-sm ${PROVIDER_ACTIVE_COLORS[pid]}`
                        : 'border-border/50 bg-secondary/20',
                    ].join(' ')}
                  >
                    <span className={active ? PROVIDER_COLORS[pid].split(' ')[0] : 'text-muted-foreground'}>
                      {PROVIDER_ICONS[pid]}
                    </span>
                    <span className={`text-[10px] font-medium leading-tight ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {pid === 'minimax' ? 'MiniMax' : PROVIDERS[pid].name.split(' ')[0]}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${configured ? 'bg-green-500' : 'bg-border'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Status:</span>
            {keyConfigured ? (
              <Badge variant="outline" className="gap-1 text-xs border-green-500/40 text-green-400">
                <CheckCircle size={11} weight="fill" />
                {selectedProvider === 'ollama' ? 'Local — always available' : 'API key configured'}
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 text-xs border-destructive/40 text-destructive">
                <XCircle size={11} weight="fill" />
                No API key
              </Badge>
            )}
          </div>

          {/* API Key — hidden for Ollama */}
          {selectedProvider !== 'ollama' && (
            <div className="space-y-1.5">
              <Label htmlFor="api-key" className="text-sm">{config.name} API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder={config.apiKeyPlaceholder}
                value={apiKey}
                onChange={(e) => setApiKeyState(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {config.apiKeyHint}
                <a
                  href={config.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-0.5"
                >
                  Get key <ArrowSquareOut size={10} />
                </a>
              </p>
            </div>
          )}

          {/* Ollama base URL */}
          {selectedProvider === 'ollama' && (
            <div className="space-y-1.5">
              <Label htmlFor="ollama-url" className="text-sm">Ollama Base URL</Label>
              <Input
                id="ollama-url"
                type="url"
                placeholder={PROVIDERS.ollama.defaultBaseUrl}
                value={ollamaUrl}
                onChange={(e) => setOllamaUrlState(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Ollama must be running locally. Default: {PROVIDERS.ollama.defaultBaseUrl}
              </p>
            </div>
          )}

          {/* Model selector */}
          <div className="space-y-1.5">
            <Label htmlFor="model-select" className="text-sm">Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id="model-select" className="text-sm">
                <SelectValue placeholder="Select a model..." />
              </SelectTrigger>
              <SelectContent>
                {config.models.map((m) => (
                  <SelectItem key={m.value} value={m.value} className="text-sm">
                    {m.label}
                  </SelectItem>
                ))}
                <SelectItem value="__custom__" className="text-sm text-muted-foreground">
                  Custom model name...
                </SelectItem>
              </SelectContent>
            </Select>
            {model === '__custom__' && (
              <Input
                placeholder="e.g. llama3.1:latest or anthropic/claude-3"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                className="font-mono text-sm mt-1.5"
              />
            )}
          </div>

          {/* Info note */}
          <p className="text-xs text-muted-foreground bg-secondary/30 rounded-md px-3 py-2 border border-border/40">
            Keys are stored only in your browser's localStorage and sent exclusively to the provider's API endpoint.
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTest}
              disabled={isTesting || (selectedProvider !== 'ollama' && !apiKey.trim())}
            >
              {isTesting ? 'Testing...' : 'Test connection'}
            </Button>
            {keyConfigured && selectedProvider !== 'ollama' && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={handleClear}
              >
                Remove key
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
