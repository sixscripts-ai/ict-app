import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Database, BookOpen, Graph, MagnifyingGlass, ChartLine, Brain, Flask,
  ChatsCircle, GearSix, DownloadSimple, Lightning, ArrowRight, Tree,
  BookOpenText, GraduationCap, MagicWand, Upload
} from '@phosphor-icons/react';
import type { Entity } from '@/lib/types';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  entities: Entity[];
  onEntitySelect: (entity: Entity) => void;
  onNavigate: (tab: string) => void;
  onOpenSettings: () => void;
  onExport: () => void;
}

const ENTITY_TYPE_COLORS: Record<string, string> = {
  concept: '#00ff88',
  model: '#00d4ff',
  trade: '#ff3366',
  schema: '#ffd700',
  code_module: '#9d4edd',
  document: '#ff6b35',
  journal: '#fb8500',
  training_data: '#06ffa5',
  chart: '#4cc9f0'
};

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

type SectionHeader = { kind: 'section'; label: string };
type NavResult = { kind: 'nav'; id: string; label: string; description: string; icon: React.ReactNode; tab: string };
type ActionResult = { kind: 'action'; id: string; label: string; description: string; icon: React.ReactNode; onAction: () => void };
type EntityResult = { kind: 'entity'; entity: Entity };
type FlatResult = SectionHeader | NavResult | ActionResult | EntityResult;

const NAV_ITEMS: NavResult[] = [
  { kind: 'nav', id: 'dashboard', label: 'Dashboard', description: 'Overview, stats and quick actions', tab: 'dashboard', icon: <Database size={16} weight="duotone" /> },
  { kind: 'nav', id: 'knowledge', label: 'Knowledge Base', description: 'Browse ICT concepts, models, schemas and more', tab: 'knowledge', icon: <BookOpen size={16} weight="duotone" /> },
  { kind: 'nav', id: 'graph', label: 'Explore Graph', description: 'Visual knowledge graph with 3-degree path tracing', tab: 'graph', icon: <Graph size={16} weight="duotone" /> },
  { kind: 'nav', id: 'explorer', label: 'Entity Explorer', description: 'Table view with batch operations', tab: 'explorer', icon: <Tree size={16} weight="duotone" /> },
  { kind: 'nav', id: 'search', label: 'Semantic Search', description: 'Find entities by meaning and similarity', tab: 'search', icon: <MagnifyingGlass size={16} weight="duotone" /> },
  { kind: 'nav', id: 'analytics', label: 'Analytics', description: 'Trade performance metrics and charts', tab: 'analytics', icon: <ChartLine size={16} weight="duotone" /> },
  { kind: 'nav', id: 'patterns', label: 'Pattern Analysis', description: 'Discover relationship and concept patterns', tab: 'patterns', icon: <Brain size={16} weight="duotone" /> },
  { kind: 'nav', id: 'training', label: 'Training Data', description: 'AI training model and trade analysis', tab: 'training', icon: <GraduationCap size={16} weight="duotone" /> },
  { kind: 'nav', id: 'recommendations', label: 'Recommendations', description: 'AI-powered trade setup recommendations', tab: 'recommendations', icon: <MagicWand size={16} weight="duotone" /> },
  { kind: 'nav', id: 'chat', label: 'AI Chat', description: 'Ask questions about your ICT knowledge base', tab: 'chat', icon: <ChatsCircle size={16} weight="duotone" /> },
  { kind: 'nav', id: 'research', label: 'Research', description: '68+ source materials and NotebookLM', tab: 'research', icon: <BookOpenText size={16} weight="duotone" /> },
  { kind: 'nav', id: 'upload', label: 'Upload / Ingest', description: 'Upload files or ingest GitHub repositories', tab: 'upload', icon: <Upload size={16} weight="duotone" /> },
];

export function CommandPalette({
  open, onClose, entities, onEntitySelect, onNavigate, onOpenSettings, onExport
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const actionItems: ActionResult[] = useMemo(() => [
    {
      kind: 'action', id: 'settings', label: 'Open Settings',
      description: 'Configure AI providers, API keys and models',
      icon: <GearSix size={16} weight="duotone" />,
      onAction: () => { onOpenSettings(); onClose(); }
    },
    {
      kind: 'action', id: 'export', label: 'Export Knowledge Base',
      description: 'Download all entities and relationships as JSON',
      icon: <DownloadSimple size={16} weight="duotone" />,
      onAction: () => { onExport(); onClose(); }
    },
  ], [onOpenSettings, onExport, onClose]);

  const results = useMemo<FlatResult[]>(() => {
    const q = query.trim();

    if (!q) {
      return [
        { kind: 'section', label: 'Navigate' },
        ...NAV_ITEMS.slice(0, 6),
        { kind: 'section', label: 'Actions' },
        ...actionItems,
      ];
    }

    const out: FlatResult[] = [];

    const matchedEntities = entities
      .filter(e =>
        fuzzyMatch(q, e.name) ||
        (e.description && fuzzyMatch(q, e.description)) ||
        fuzzyMatch(q, e.type) ||
        fuzzyMatch(q, e.domain)
      )
      .slice(0, 8);

    if (matchedEntities.length > 0) {
      out.push({ kind: 'section', label: `Entities (${matchedEntities.length}${matchedEntities.length === 8 ? '+' : ''})` });
      matchedEntities.forEach(e => out.push({ kind: 'entity', entity: e }));
    }

    const matchedNav = NAV_ITEMS.filter(n =>
      fuzzyMatch(q, n.label) || fuzzyMatch(q, n.description)
    );
    if (matchedNav.length > 0) {
      out.push({ kind: 'section', label: 'Navigate' });
      matchedNav.forEach(n => out.push(n));
    }

    const matchedActions = actionItems.filter(a =>
      fuzzyMatch(q, a.label) || fuzzyMatch(q, a.description)
    );
    if (matchedActions.length > 0) {
      out.push({ kind: 'section', label: 'Actions' });
      matchedActions.forEach(a => out.push(a));
    }

    if (out.length === 0) {
      return [];
    }

    return out;
  }, [query, entities, actionItems]);

  const selectableItems = useMemo(
    () => results.filter((r): r is NavResult | ActionResult | EntityResult => r.kind !== 'section'),
    [results]
  );

  const execute = useCallback((item: NavResult | ActionResult | EntityResult) => {
    if (item.kind === 'entity') {
      onEntitySelect(item.entity);
      onClose();
    } else if (item.kind === 'nav') {
      onNavigate(item.tab);
      onClose();
    } else if (item.kind === 'action') {
      item.onAction();
    }
  }, [onEntitySelect, onNavigate, onClose]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (listRef.current) {
      const el = listRef.current.querySelector('[data-selected="true"]');
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, selectableItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = selectableItems[selectedIndex];
        if (item) execute(item);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose, selectableItems, selectedIndex, execute]);

  if (!open) return null;

  let selectableIdx = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl mx-4 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/60">
          <MagnifyingGlass size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search entities, navigate tabs, run actions…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground caret-primary"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded hover:bg-secondary/50"
            >
              Clear
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground">
              <kbd className="px-1.5 py-0.5 bg-secondary/60 rounded font-mono text-[10px]">⌘K</kbd>
              <span>to open</span>
            </div>
          )}
        </div>

        {/* Results list */}
        <div ref={listRef} className="max-h-[420px] overflow-y-auto overscroll-contain">
          {results.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-sm text-muted-foreground">No results for "<span className="text-foreground">{query}</span>"</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="py-1.5">
              {results.map((result, i) => {
                if (result.kind === 'section') {
                  return (
                    <div key={`s-${i}`} className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 select-none">
                      {result.label}
                    </div>
                  );
                }

                selectableIdx++;
                const isSelected = selectableIdx === selectedIndex;
                const capturedItem = result;

                if (result.kind === 'entity') {
                  return (
                    <div
                      key={result.entity.id}
                      data-selected={isSelected}
                      onClick={() => execute(capturedItem)}
                      className={`flex items-center gap-3 px-4 py-2.5 mx-1.5 rounded-lg cursor-pointer transition-colors select-none ${
                        isSelected
                          ? 'bg-primary/15 text-foreground'
                          : 'hover:bg-secondary/40 text-foreground/90'
                      }`}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-offset-1 ring-offset-card"
                        style={{
                          backgroundColor: ENTITY_TYPE_COLORS[result.entity.type] || '#888',
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{result.entity.name}</p>
                        {result.entity.description && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{result.entity.description}</p>
                        )}
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">{result.entity.type}</Badge>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 hidden sm:flex">{result.entity.domain}</Badge>
                      </div>
                    </div>
                  );
                }

                if (result.kind === 'nav') {
                  return (
                    <div
                      key={result.id}
                      data-selected={isSelected}
                      onClick={() => execute(capturedItem)}
                      className={`flex items-center gap-3 px-4 py-2.5 mx-1.5 rounded-lg cursor-pointer transition-colors select-none ${
                        isSelected ? 'bg-primary/15 text-foreground' : 'hover:bg-secondary/40 text-foreground/90'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-secondary/60 flex items-center justify-center flex-shrink-0 text-muted-foreground">
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{result.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                      </div>
                      <ArrowRight size={14} className={`flex-shrink-0 transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground/40'}`} />
                    </div>
                  );
                }

                if (result.kind === 'action') {
                  return (
                    <div
                      key={result.id}
                      data-selected={isSelected}
                      onClick={() => execute(capturedItem)}
                      className={`flex items-center gap-3 px-4 py-2.5 mx-1.5 rounded-lg cursor-pointer transition-colors select-none ${
                        isSelected ? 'bg-primary/15 text-foreground' : 'hover:bg-secondary/40 text-foreground/90'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{result.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                      </div>
                      <Lightning size={14} className={`flex-shrink-0 transition-colors ${isSelected ? 'text-accent' : 'text-accent/40'}`} />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border/50 bg-secondary/10">
          <div className="flex items-center gap-3.5 text-[11px] text-muted-foreground/70">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-secondary/70 rounded font-mono text-[10px]">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-secondary/70 rounded font-mono text-[10px]">↵</kbd> select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-secondary/70 rounded font-mono text-[10px]">Esc</kbd> close
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground/50">
            {entities.length.toLocaleString()} entities indexed
          </span>
        </div>
      </div>
    </div>
  );
}
