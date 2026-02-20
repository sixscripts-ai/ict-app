import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useKV } from '@/hooks/use-kv';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PaperPlaneRight, User, Brain, Trash, BookOpen, Target, ChartLine, Flask, Lightbulb, DownloadSimple, FileText, FileMd, Plus, PencilSimple, Check, X, ChatDots, List } from '@phosphor-icons/react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ChatMessage, ChatSession, Entity } from '@/lib/types';

/** Lightweight markdown renderer — no external deps needed */
function MarkdownContent({ content }: { content: string }) {
  const rendered = useMemo(() => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockLines: string[] = [];
    let listItems: { level: number; text: string; ordered: boolean; index: number }[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length === 0) return;
      const items = listItems.map((item, i) => (
        <li key={i} className="ml-4" style={{ marginLeft: `${item.level * 16}px` }}>
          {renderInline(item.text)}
        </li>
      ));
      const isOrdered = listItems[0].ordered;
      if (isOrdered) {
        elements.push(<ol key={key++} className="list-decimal list-inside space-y-1 my-2 text-sm">{items}</ol>);
      } else {
        elements.push(<ul key={key++} className="list-disc list-inside space-y-1 my-2 text-sm">{items}</ul>);
      }
      listItems = [];
    };

    const renderInline = (text: string): React.ReactNode => {
      const parts: React.ReactNode[] = [];
      let remaining = text;
      let inlineKey = 0;

      while (remaining.length > 0) {
        const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*/s) || remaining.match(/^(.*?)__(.+?)__/s);
        const codeMatch = remaining.match(/^(.*?)`([^`]+)`/);
        const italicMatch = remaining.match(/^(.*?)(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/s) || remaining.match(/^(.*?)(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/s);
        const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)/);

        type MatchInfo = { match: RegExpMatchArray; type: string; pos: number };
        const candidates: MatchInfo[] = [];
        if (boldMatch && boldMatch[1] !== undefined) candidates.push({ match: boldMatch, type: 'bold', pos: boldMatch[1].length });
        if (codeMatch && codeMatch[1] !== undefined) candidates.push({ match: codeMatch, type: 'code', pos: codeMatch[1].length });
        if (italicMatch && italicMatch[1] !== undefined) candidates.push({ match: italicMatch, type: 'italic', pos: italicMatch[1].length });
        if (linkMatch && linkMatch[1] !== undefined) candidates.push({ match: linkMatch, type: 'link', pos: linkMatch[1].length });

        if (candidates.length === 0) {
          parts.push(remaining);
          break;
        }

        candidates.sort((a, b) => a.pos - b.pos);
        const best = candidates[0];

        if (best.match[1]) {
          parts.push(best.match[1]);
        }

        if (best.type === 'bold') {
          parts.push(<strong key={inlineKey++} className="font-semibold text-foreground">{best.match[2]}</strong>);
          remaining = remaining.slice(best.match[0].length);
        } else if (best.type === 'code') {
          parts.push(<code key={inlineKey++} className="px-1.5 py-0.5 rounded bg-secondary/60 text-primary font-mono text-xs">{best.match[2]}</code>);
          remaining = remaining.slice(best.match[0].length);
        } else if (best.type === 'italic') {
          parts.push(<em key={inlineKey++} className="italic text-foreground/90">{best.match[2]}</em>);
          remaining = remaining.slice(best.match[0].length);
        } else if (best.type === 'link') {
          parts.push(
            <a key={inlineKey++} href={best.match[3]} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">
              {best.match[2]}
            </a>
          );
          remaining = remaining.slice(best.match[0].length);
        }
      }

      return parts.length === 1 ? parts[0] : <>{parts}</>;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trimStart().startsWith('```')) {
        if (!inCodeBlock) {
          flushList();
          inCodeBlock = true;
          codeBlockLang = line.trimStart().slice(3).trim();
          codeBlockLines = [];
          continue;
        } else {
          inCodeBlock = false;
          elements.push(
            <div key={key++} className="my-3 rounded-lg overflow-hidden border border-border/50">
              {codeBlockLang && (
                <div className="px-3 py-1.5 bg-secondary/60 text-xs text-muted-foreground font-mono border-b border-border/50">
                  {codeBlockLang}
                </div>
              )}
              <pre className="p-3 bg-secondary/30 overflow-x-auto">
                <code className="text-xs font-mono text-foreground/90 leading-relaxed">{codeBlockLines.join('\n')}</code>
              </pre>
            </div>
          );
          codeBlockLang = '';
          codeBlockLines = [];
          continue;
        }
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }

      const h3Match = line.match(/^###\s+(.+)/);
      const h2Match = line.match(/^##\s+(.+)/);
      const h1Match = line.match(/^#\s+(.+)/);
      if (h3Match) { flushList(); elements.push(<h4 key={key++} className="text-sm font-semibold mt-4 mb-1.5 text-foreground">{renderInline(h3Match[1])}</h4>); continue; }
      if (h2Match) { flushList(); elements.push(<h3 key={key++} className="text-base font-semibold mt-4 mb-2 text-foreground">{renderInline(h2Match[1])}</h3>); continue; }
      if (h1Match) { flushList(); elements.push(<h2 key={key++} className="text-lg font-semibold mt-4 mb-2 text-foreground">{renderInline(h1Match[1])}</h2>); continue; }

      if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
        flushList();
        elements.push(<hr key={key++} className="my-3 border-border/50" />);
        continue;
      }

      const ulMatch = line.match(/^(\s*)[-*+]\s+(.+)/);
      const olMatch = line.match(/^(\s*)(\d+)[.)]\s+(.+)/);
      if (ulMatch) {
        listItems.push({ level: Math.floor((ulMatch[1] || '').length / 2), text: ulMatch[2], ordered: false, index: 0 });
        continue;
      }
      if (olMatch) {
        listItems.push({ level: Math.floor((olMatch[1] || '').length / 2), text: olMatch[3], ordered: true, index: parseInt(olMatch[2]) });
        continue;
      }

      flushList();

      const bqMatch = line.match(/^>\s*(.*)/);
      if (bqMatch) {
        elements.push(
          <blockquote key={key++} className="border-l-2 border-primary/50 pl-3 py-1 my-2 text-sm text-foreground/80 italic">
            {renderInline(bqMatch[1])}
          </blockquote>
        );
        continue;
      }

      if (line.trim() === '') {
        continue;
      }

      elements.push(<p key={key++} className="text-sm leading-relaxed my-1.5">{renderInline(line)}</p>);
    }

    flushList();

    if (inCodeBlock && codeBlockLines.length > 0) {
      elements.push(
        <pre key={key++} className="p-3 my-3 bg-secondary/30 rounded-lg overflow-x-auto border border-border/50">
          <code className="text-xs font-mono text-foreground/90 leading-relaxed">{codeBlockLines.join('\n')}</code>
        </pre>
      );
    }

    return elements;
  }, [content]);

  return <div className="markdown-content">{rendered}</div>;
}

interface ChatViewProps {
  entities: Entity[];
  onAskQuestion: (question: string) => Promise<{ answer: string; sources: Entity[] }>;
}

interface PromptCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompts: string[];
  description: string;
}

function createSession(name?: string): ChatSession {
  const now = new Date().toISOString();
  return {
    id: `session-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: name || `Chat ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
}

export function ChatView({ entities, onAskQuestion }: ChatViewProps) {
  const [sessions, setSessions] = useKV<ChatSession[]>('chat-sessions', []);
  const [activeSessionId, setActiveSessionId] = useKV<string>('chat-active-session', '');
  // Legacy migration: read old flat chat-history and migrate once
  const [legacyMessages, , deleteLegacy] = useKV<ChatMessage[]>('chat-history', []);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('concepts');
  const [showSidebar, setShowSidebar] = useState(true);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const safeSessions = useMemo(() => sessions || [], [sessions]);

  // Migrate legacy chat-history into first session
  useEffect(() => {
    const legacy = legacyMessages || [];
    if (legacy.length > 0 && safeSessions.length === 0) {
      const migrated: ChatSession = {
        id: `session-migrated-${Date.now()}`,
        name: 'Previous Chat',
        createdAt: legacy[0]?.timestamp || new Date().toISOString(),
        updatedAt: legacy[legacy.length - 1]?.timestamp || new Date().toISOString(),
        messages: legacy,
      };
      setSessions([migrated]);
      setActiveSessionId(migrated.id);
      deleteLegacy();
    }
  }, [legacyMessages, safeSessions.length, setSessions, setActiveSessionId, deleteLegacy]);

  // Auto-create a session if none exist
  useEffect(() => {
    if (safeSessions.length === 0) {
      const first = createSession('New Chat');
      setSessions([first]);
      setActiveSessionId(first.id);
    } else if (!activeSessionId || !safeSessions.find(s => s.id === activeSessionId)) {
      setActiveSessionId(safeSessions[0].id);
    }
  }, [safeSessions, activeSessionId, setSessions, setActiveSessionId]);

  const activeSession = safeSessions.find(s => s.id === activeSessionId) || safeSessions[0];
  const safeMessages = useMemo(() => activeSession?.messages || [], [activeSession]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [safeMessages]);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const updateActiveSession = useCallback((updater: (session: ChatSession) => ChatSession) => {
    setSessions((current) => {
      const cur = current || [];
      return cur.map(s => s.id === activeSessionId ? updater(s) : s);
    });
  }, [activeSessionId, setSessions]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    updateActiveSession(s => ({
      ...s,
      updatedAt: new Date().toISOString(),
      messages: [...s.messages, userMessage],
    }));
    setInput('');
    setIsLoading(true);

    try {
      const { answer, sources } = await onAskQuestion(input);
      
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: answer,
        sources,
        timestamp: new Date().toISOString()
      };

      updateActiveSession(s => ({
        ...s,
        updatedAt: new Date().toISOString(),
        messages: [...s.messages, assistantMessage],
      }));
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your question.',
        timestamp: new Date().toISOString()
      };
      updateActiveSession(s => ({
        ...s,
        updatedAt: new Date().toISOString(),
        messages: [...s.messages, errorMessage],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSession = () => {
    const newSession = createSession();
    setSessions((current) => [newSession, ...(current || [])]);
    setActiveSessionId(newSession.id);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions((current) => {
      const cur = (current || []).filter(s => s.id !== sessionId);
      if (cur.length === 0) {
        const fresh = createSession('New Chat');
        setTimeout(() => setActiveSessionId(fresh.id), 0);
        return [fresh];
      }
      if (sessionId === activeSessionId) {
        setTimeout(() => setActiveSessionId(cur[0].id), 0);
      }
      return cur;
    });
    toast.success('Session deleted');
  };

  const handleRenameSession = (sessionId: string) => {
    if (!renameValue.trim()) { setRenamingId(null); return; }
    setSessions((current) =>
      (current || []).map(s => s.id === sessionId ? { ...s, name: renameValue.trim() } : s)
    );
    setRenamingId(null);
    toast.success('Session renamed');
  };

  const handleClearSession = () => {
    updateActiveSession(s => ({ ...s, messages: [], updatedAt: new Date().toISOString() }));
    toast.success('Session cleared');
  };

  const exportToMarkdown = () => {
    if (safeMessages.length === 0) {
      toast.error('No messages to export');
      return;
    }

    let markdown = `# ${activeSession?.name || 'ICT Chat'} Export\n\n`;
    markdown += `*Exported: ${new Date().toLocaleString()}*\n\n`;
    markdown += `**Total Messages:** ${safeMessages.length}\n\n`;
    markdown += '---\n\n';

    safeMessages.forEach((message, index) => {
      const role = message.role === 'user' ? 'User' : 'Assistant';
      const timestamp = new Date(message.timestamp).toLocaleString();
      
      markdown += `## ${role} - ${timestamp}\n\n`;
      markdown += `${message.content}\n\n`;
      
      if (message.sources && message.sources.length > 0) {
        markdown += '**Sources:**\n';
        message.sources.forEach(source => {
          markdown += `- ${source.name} (${source.type} - ${source.domain})\n`;
        });
        markdown += '\n';
      }
      
      if (index < safeMessages.length - 1) {
        markdown += '---\n\n';
      }
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ict-chat-${(activeSession?.name || 'export').replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Chat exported as Markdown');
  };

  const exportToJSON = () => {
    if (safeMessages.length === 0) {
      toast.error('No messages to export');
      return;
    }

    const exportData = {
      metadata: {
        sessionName: activeSession?.name,
        exportedAt: new Date().toISOString(),
        totalMessages: safeMessages.length,
        exportVersion: '2.0'
      },
      messages: safeMessages.map(message => ({
        id: message.id,
        role: message.role,
        content: message.content,
        timestamp: message.timestamp,
        sources: message.sources?.map(source => ({
          id: source.id,
          name: source.name,
          type: source.type,
          domain: source.domain,
          description: source.description
        }))
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ict-chat-${(activeSession?.name || 'export').replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Chat exported as JSON');
  };

  const promptCategories: PromptCategory[] = [
    {
      id: 'concepts',
      label: 'Concepts',
      icon: <BookOpen size={16} weight="duotone" />,
      description: 'Explore ICT concepts with precision and context',
      prompts: [
        "Define Fair Value Gap with bearish/bullish displacement examples.",
        "Explain Order Block formation and mitigation criteria in detail.",
        "What constitutes a valid Breaker Block vs regular Order Block?",
        "Detail the relationship between Displacement and Imbalance structures.",
        "Describe optimal trade entry zones within institutional reference points.",
        "Define Change of Character (CHoCH) vs Break of Structure (BOS) with price action examples.",
        "What makes a liquidity sweep valid for entry consideration?",
        "Explain the Market Structure Shift concept across multiple timeframes."
      ]
    },
    {
      id: 'models',
      label: 'Models',
      icon: <Target size={16} weight="duotone" />,
      description: 'Query trading models and execution frameworks',
      prompts: [
        "List the entry criteria and time windows for the Silver Bullet setup.",
        "Detail Model 12 requirements: OB + FVG + OTE confluence rules.",
        "What are the complete execution parameters for the Turtle Soup reversal?",
        "Explain the London Open Killzone trade model with displacement requirements.",
        "Show NY AM Session trade setup rules with institutional reference points.",
        "What confluence factors validate a Judas Swing entry signal?",
        "Detail the MMBM/MMSM model execution with PD array alignment.",
        "List Model 9 setup requirements and invalidation rules."
      ]
    },
    {
      id: 'trades',
      label: 'Trade Analysis',
      icon: <ChartLine size={16} weight="duotone" />,
      description: 'Filter and analyze trade execution data',
      prompts: [
        "Filter trades: OB + FVG confluence resulting in >2R returns.",
        "Show me high-probability A+ Setups from my training data.",
        "Which trades failed due to liquidity sweep invalidation?",
        "Compare win rates: London vs NY killzone executions.",
        "Show all Model 12 setups with OTE retracement confluence.",
        "List trades with displacement >20 pips preceding FVG entries.",
        "Filter negative examples: what were the root cause failures?",
        "Show trades where early entry resulted in stop loss hits.",
        "Which setups had 3+ PD array confluence and what was the outcome?"
      ]
    },
    {
      id: 'patterns',
      label: 'Patterns',
      icon: <Flask size={16} weight="duotone" />,
      description: 'Discover patterns and statistical insights',
      prompts: [
        "What displacement characteristics preceded my best FVG entries?",
        "Analyze common patterns in winning Silver Bullet executions.",
        "What time windows show highest win rate for London killzone entries?",
        "Compare liquidity sweep patterns: successful vs failed entries.",
        "Show correlation between OTE retracement depth and trade outcome.",
        "Which concept combinations appear most in A+ graded setups?",
        "Identify recurring failure patterns in negative training data.",
        "What confluence factors separate B setups from A+ setups statistically?"
      ]
    },
    {
      id: 'insights',
      label: 'Deep Insights',
      icon: <Lightbulb size={16} weight="duotone" />,
      description: 'Advanced analysis and strategic queries',
      prompts: [
        "What makes an institutional reference point high probability for reversals?",
        "Analyze the relationship between Market Structure and Order Flow alignment.",
        "How does multi-timeframe PD array confluence affect setup quality?",
        "What pre-entry conditions distinguish A+ setups from lower grades?",
        "Explain the sequence: liquidity grab > displacement > FVG > entry logic.",
        "How do session-specific characteristics affect setup performance?",
        "What role does volume/spread expansion play in displacement validation?",
        "Compare algorithmic behavior patterns: trending vs ranging market states."
      ]
    }
  ];

  const currentCategory = promptCategories.find(cat => cat.id === selectedCategory) || promptCategories[0];

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Session Sidebar */}
      <div className={`${showSidebar ? 'w-64' : 'w-0'} flex-shrink-0 transition-all duration-200 overflow-hidden border-r border-border/50`}>
        <div className="w-64 h-full flex flex-col">
          <div className="p-3 border-b border-border/50 flex items-center justify-between">
            <span className="text-sm font-semibold">Sessions</span>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleNewSession} title="New session">
              <Plus size={16} />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {safeSessions.map(session => (
                <div
                  key={session.id}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm ${
                    session.id === activeSessionId 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'hover:bg-secondary/40 border border-transparent'
                  }`}
                  onClick={() => setActiveSessionId(session.id)}
                >
                  <ChatDots size={14} className="flex-shrink-0" />
                  {renamingId === session.id ? (
                    <div className="flex-1 flex items-center gap-1">
                      <Input
                        value={renameValue}
                        onChange={e => setRenameValue(e.target.value)}
                        className="h-6 text-xs flex-1 py-0"
                        autoFocus
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleRenameSession(session.id);
                          if (e.key === 'Escape') setRenamingId(null);
                        }}
                        onClick={e => e.stopPropagation()}
                      />
                      <button className="text-green-400 hover:text-green-300" onClick={e => { e.stopPropagation(); handleRenameSession(session.id); }}>
                        <Check size={12} />
                      </button>
                      <button className="text-muted-foreground hover:text-foreground" onClick={e => { e.stopPropagation(); setRenamingId(null); }}>
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-medium">{session.name}</p>
                        <p className="text-[10px] text-muted-foreground">{session.messages.length} msgs</p>
                      </div>
                      <div className="hidden group-hover:flex items-center gap-0.5">
                        <button
                          className="p-0.5 rounded text-muted-foreground hover:text-foreground"
                          onClick={e => { e.stopPropagation(); setRenamingId(session.id); setRenameValue(session.name); }}
                          title="Rename"
                        >
                          <PencilSimple size={12} />
                        </button>
                        <button
                          className="p-0.5 rounded text-muted-foreground hover:text-red-400"
                          onClick={e => { e.stopPropagation(); handleDeleteSession(session.id); }}
                          title="Delete"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="mb-4 px-4 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowSidebar(!showSidebar)} title={showSidebar ? 'Hide sessions' : 'Show sessions'}>
              <List size={18} />
            </Button>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">{activeSession?.name || 'AI Chat'}</h1>
              <p className="text-xs text-muted-foreground">Ask questions about your ICT knowledge base</p>
            </div>
          </div>
          {safeMessages.length > 0 && (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <DownloadSimple size={16} />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={exportToMarkdown} className="gap-2 cursor-pointer">
                    <FileMd size={16} />
                    Export as Markdown
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportToJSON} className="gap-2 cursor-pointer">
                    <FileText size={16} />
                    Export as JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearSession}
                className="gap-2"
              >
                <Trash size={16} />
                Clear
              </Button>
            </div>
          )}
        </div>

        {safeMessages.length === 0 && (
          <div className="px-4">
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50 mb-4">
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20">
                    <Brain size={32} weight="duotone" className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">ICT Knowledge Analysis</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Query concepts, filter trade setups, analyze patterns, and explore model relationships
                    </p>
                  </div>
                </div>

                <div>
                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                    <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mb-4">
                      {promptCategories.map((category) => (
                        <TabsTrigger 
                          key={category.id} 
                          value={category.id}
                          className="gap-1.5 text-xs"
                        >
                          {category.icon}
                          <span className="hidden sm:inline">{category.label}</span>
                          <span className="sm:hidden">{category.label.slice(0, 5)}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground text-center">
                        {currentCategory.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto">
                      {currentCategory.prompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => setInput(prompt)}
                          className="p-3 text-left text-sm rounded-lg bg-secondary/30 hover:bg-secondary/50 hover:border-accent/30 transition-all border border-border/50 group"
                        >
                          <span className="group-hover:text-accent transition-colors">{prompt}</span>
                        </button>
                      ))}
                    </div>
                  </Tabs>
                </div>
              </div>
            </Card>
          </div>
        )}

        <ScrollArea className="flex-1 mb-4 px-4" ref={scrollRef}>
          <div className="space-y-4 pr-4">
            {safeMessages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <Brain size={20} weight="duotone" className="text-accent" />
                  </div>
                )}
                <Card className={`max-w-[80%] p-4 ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20' 
                    : 'bg-card/50 backdrop-blur border-border/50'
                }`}>
                  {message.role === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  ) : (
                    <MarkdownContent content={message.content} />
                  )}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.sources.map((source) => (
                          <Badge 
                            key={source.id} 
                            variant="secondary" 
                            className="text-xs hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                          >
                            {source.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground mt-2 block opacity-60">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </Card>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <User size={20} weight="duotone" className="text-primary" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                  <Brain size={20} weight="duotone" className="text-accent animate-pulse" />
                </div>
                <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="space-y-2 px-4 pb-4">
          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              placeholder="Ask about ICT concepts, filter trades, analyze patterns..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              disabled={isLoading}
              rows={1}
              className="flex-1 min-h-[40px] max-h-[120px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button onClick={handleSubmit} disabled={!input.trim() || isLoading} className="gap-2">
              <PaperPlaneRight size={16} weight="bold" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Knowledge base: {entities.length} entities</span>
            <span>{safeSessions.length} session{safeSessions.length !== 1 ? 's' : ''} · {safeMessages.length} messages</span>
          </div>
        </div>
      </div>
    </div>
  );
}
