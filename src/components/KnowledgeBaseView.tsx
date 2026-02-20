import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Brain,
  ChartLine,
  Warning,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  CaretDown,
  CaretUp,
  MagnifyingGlass,
  Scales,
  Lightning,
  BookOpen,
  ListChecks,
  Timer,
  Graph,
} from '@phosphor-icons/react';
import {
  ICT_CONCEPTS,
  ICT_MODELS,
  ICT_RELATIONSHIPS,
  ICT_ANTI_PATTERNS,
  ICT_TIME_RULES,
  ICT_CAUSAL_CHAINS,
  ICT_PRE_TRADE_CHECKLIST,
  ICT_CONFLUENCE_WEIGHTS,
  validatePreTrade,
} from '@/data/ict';
import type { RelationshipType } from '@/lib/types';
import type { PreTradeValidationInput } from '@/data/ict/pre-trade-checklist';

// ─── Static entity name map ───────────────────────────────────────────────────
const ENTITY_NAME_MAP = new Map<string, string>();
for (const e of [...ICT_CONCEPTS, ...ICT_MODELS]) {
  ENTITY_NAME_MAP.set(e.id, e.name);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function severityColor(severity: string) {
  if (severity === 'critical') return 'bg-red-500/15 text-red-400 border-red-500/30';
  if (severity === 'high') return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
  return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30';
}

function relTypeBadge(type: RelationshipType) {
  const map: Record<RelationshipType, string> = {
    CONCEPT_PREREQUISITE: 'bg-purple-500/15 text-purple-400',
    CONCEPT_RELATED_TO: 'bg-blue-500/15 text-blue-400',
    CONCEPT_USED_IN_MODEL: 'bg-emerald-500/15 text-emerald-400',
    MODEL_PRODUCES_TRADE: 'bg-yellow-500/15 text-yellow-400',
    TRADE_USES_CONCEPT: 'bg-teal-500/15 text-teal-400',
    SCHEMA_VALIDATES: 'bg-slate-500/15 text-slate-400',
    DOCUMENT_DEFINES: 'bg-indigo-500/15 text-indigo-400',
    CONCEPT_DETECTED_BY: 'bg-pink-500/15 text-pink-400',
  };
  return map[type] ?? 'bg-muted text-muted-foreground';
}

function confluenceWeightColor(w: number) {
  if (w >= 2.0) return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
  if (w >= 1.5) return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
  return 'bg-muted text-muted-foreground border-border';
}

function gradeColor(grade: string) {
  if (grade === 'A+') return 'text-emerald-400';
  if (grade === 'A') return 'text-blue-400';
  if (grade === 'B') return 'text-yellow-400';
  return 'text-red-400';
}

function getScoreGrade(score: number): string {
  if (score >= ICT_CONFLUENCE_WEIGHTS.thresholds.a_plus_setup) return 'A+';
  if (score >= ICT_CONFLUENCE_WEIGHTS.thresholds.good_setup) return 'A';
  if (score >= ICT_CONFLUENCE_WEIGHTS.thresholds.minimum_for_trade) return 'B';
  return 'F';
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConceptsTab() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      ICT_CONCEPTS.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description?.toLowerCase().includes(search.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
      ),
    [search],
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search concepts, tags, descriptions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {filtered.length} of {ICT_CONCEPTS.length} concepts
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((concept) => {
          const isOpen = expanded === concept.id;
          const meta = concept.metadata;
          return (
            <Card
              key={concept.id}
              className="border-border/60 hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => setExpanded(isOpen ? null : concept.id)}
            >
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-semibold leading-tight">{concept.name}</CardTitle>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {meta.abbreviation && (
                      <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0">
                        {meta.abbreviation}
                      </Badge>
                    )}
                    {meta.confluence_weight !== undefined && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 ${confluenceWeightColor(meta.confluence_weight)}`}
                      >
                        +{meta.confluence_weight}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {concept.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {concept.tags.slice(0, 4).map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px] px-1.5 py-0">
                      {t}
                    </Badge>
                  ))}
                </div>

                {/* Timeframes */}
                {meta.timeframes?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {meta.timeframes.map((tf: string) => (
                      <span
                        key={tf}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-mono"
                      >
                        {tf}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expand toggle */}
                <button
                  className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(isOpen ? null : concept.id);
                  }}
                >
                  {isOpen ? (
                    <>
                      <CaretUp size={12} /> Hide details
                    </>
                  ) : (
                    <>
                      <CaretDown size={12} /> Show details
                    </>
                  )}
                </button>

                {isOpen && (
                  <div className="space-y-3 pt-2 border-t border-border/40">
                    {meta.entry_rules?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-foreground/80 mb-1">Entry Rules</p>
                        <ul className="space-y-0.5">
                          {meta.entry_rules.map((r: string, i: number) => (
                            <li key={i} className="text-[11px] text-muted-foreground flex gap-1.5">
                              <ArrowRight size={10} className="mt-0.5 shrink-0 text-primary" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {meta.detection_rules && (
                      <div>
                        <p className="text-[11px] font-semibold text-foreground/80 mb-1">Detection</p>
                        <p className="text-[11px] text-muted-foreground">{meta.detection_rules}</p>
                      </div>
                    )}
                    {meta.invalidation && (
                      <div>
                        <p className="text-[11px] font-semibold text-foreground/80 mb-1">Invalidation</p>
                        <p className="text-[11px] text-muted-foreground">{meta.invalidation}</p>
                      </div>
                    )}
                    {meta.related_concepts?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-foreground/80 mb-1">Related</p>
                        <div className="flex flex-wrap gap-1">
                          {meta.related_concepts.map((rc: string) => (
                            <Badge key={rc} variant="outline" className="text-[10px] px-1.5 py-0 font-mono">
                              {rc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ModelsTab() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{ICT_MODELS.length} trading models</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ICT_MODELS.map((model) => {
          const isOpen = expanded === model.id;
          const meta = model.metadata;
          return (
            <Card
              key={model.id}
              className="border-border/60 hover:border-primary/40 transition-colors"
            >
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-semibold">{model.name}</CardTitle>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {meta.expected_rr && (
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      >
                        {meta.expected_rr} R
                      </Badge>
                    )}
                    {meta.confluence_minimum && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        min {meta.confluence_minimum}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">{model.description}</p>

                {/* Time windows */}
                {meta.time_windows?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {meta.time_windows.map((tw: { name: string; time: string; timezone: string }) => (
                      <span
                        key={tw.name}
                        className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                      >
                        {tw.name}: {tw.time} {tw.timezone}
                      </span>
                    ))}
                  </div>
                )}

                {/* Required concepts */}
                {meta.required_concepts?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {meta.required_concepts.map((rc: string) => (
                      <Badge
                        key={rc}
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono"
                      >
                        {rc}
                      </Badge>
                    ))}
                  </div>
                )}

                <button
                  className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : model.id)}
                >
                  {isOpen ? (
                    <>
                      <CaretUp size={12} /> Hide details
                    </>
                  ) : (
                    <>
                      <CaretDown size={12} /> Show details
                    </>
                  )}
                </button>

                {isOpen && (
                  <div className="space-y-3 pt-2 border-t border-border/40">
                    {meta.sequence?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-foreground/80 mb-1">Sequence</p>
                        <ol className="space-y-1">
                          {meta.sequence.map((step: string, i: number) => (
                            <li key={i} className="text-[11px] text-muted-foreground flex gap-2">
                              <span className="shrink-0 font-mono text-primary">{i + 1}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {meta.avoid_when?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-foreground/80 mb-1">Avoid When</p>
                        <ul className="space-y-0.5">
                          {meta.avoid_when.map((a: string, i: number) => (
                            <li key={i} className="text-[11px] text-muted-foreground flex gap-1.5">
                              <XCircle size={10} className="mt-0.5 shrink-0 text-red-400" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {meta.optional_concepts?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-foreground/80 mb-1">Optional</p>
                        <div className="flex flex-wrap gap-1">
                          {meta.optional_concepts.map((oc: string) => (
                            <Badge key={oc} variant="secondary" className="text-[10px] px-1.5 py-0 font-mono">
                              {oc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const REL_TYPES: RelationshipType[] = [
  'CONCEPT_PREREQUISITE',
  'CONCEPT_RELATED_TO',
  'CONCEPT_USED_IN_MODEL',
  'MODEL_PRODUCES_TRADE',
  'TRADE_USES_CONCEPT',
  'SCHEMA_VALIDATES',
  'DOCUMENT_DEFINES',
  'CONCEPT_DETECTED_BY',
];

const REL_TYPE_COUNTS = REL_TYPES.reduce(
  (acc, t) => {
    acc[t] = ICT_RELATIONSHIPS.filter((r) => r.type === t).length;
    return acc;
  },
  {} as Record<RelationshipType, number>,
);

const PAGE_SIZE = 50;

function RelationshipsTab() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<RelationshipType | 'all'>('all');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ICT_RELATIONSHIPS.filter((r) => {
      if (filterType !== 'all' && r.type !== filterType) return false;
      if (!q) return true;
      const src = ENTITY_NAME_MAP.get(r.sourceId) ?? r.sourceId;
      const tgt = ENTITY_NAME_MAP.get(r.targetId) ?? r.targetId;
      return src.toLowerCase().includes(q) || tgt.toLowerCase().includes(q);
    });
  }, [search, filterType]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = useMemo(() => filtered.slice(0, (page + 1) * PAGE_SIZE), [filtered, page]);

  return (
    <div className="space-y-4">
      {/* Type filter stat cards */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setFilterType('all'); setPage(0); }}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
            filterType === 'all'
              ? 'bg-primary/20 text-primary border-primary/40'
              : 'bg-card border-border/60 text-muted-foreground hover:border-primary/30'
          }`}
        >
          All ({ICT_RELATIONSHIPS.length})
        </button>
        {REL_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => { setFilterType(t); setPage(0); }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
              filterType === t
                ? 'bg-primary/20 text-primary border-primary/40'
                : 'bg-card border-border/60 text-muted-foreground hover:border-primary/30'
            }`}
          >
            {t.replace(/_/g, ' ')} ({REL_TYPE_COUNTS[t]})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by entity name…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-9"
          />
        </div>
        <Select
          value={filterType}
          onValueChange={(v) => { setFilterType(v as RelationshipType | 'all'); setPage(0); }}
        >
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {REL_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {visible.length} of {filtered.length} relationships
      </p>

      {/* Table */}
      <div className="rounded-lg border border-border/60 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-0 bg-card/50 px-4 py-2 text-[11px] font-semibold text-muted-foreground border-b border-border/40">
          <span>Source</span>
          <span className="text-center px-6">Type</span>
          <span>Target</span>
        </div>
        <ScrollArea className="h-[480px]">
          {visible.map((rel) => {
            const src = ENTITY_NAME_MAP.get(rel.sourceId) ?? rel.sourceId;
            const tgt = ENTITY_NAME_MAP.get(rel.targetId) ?? rel.targetId;
            return (
              <div
                key={rel.id}
                className="grid grid-cols-[1fr_auto_1fr] gap-0 px-4 py-2 border-b border-border/30 last:border-0 hover:bg-secondary/20 transition-colors"
              >
                <span className="text-xs font-medium truncate pr-2">{src}</span>
                <div className="flex items-center px-2">
                  <Badge className={`text-[10px] px-1.5 py-0 whitespace-nowrap ${relTypeBadge(rel.type)}`}>
                    {rel.type.replace(/_/g, ' ')}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground truncate pl-2">{tgt}</span>
              </div>
            );
          })}
        </ScrollArea>
      </div>

      {page + 1 < pageCount && (
        <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)}>
          Load {Math.min(100, (pageCount - page - 1) * PAGE_SIZE)} more
        </Button>
      )}
    </div>
  );
}

function AntiPatternsTab() {
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'moderate'>('all');

  const filtered = useMemo(
    () =>
      ICT_ANTI_PATTERNS.filter(
        (ap) => severityFilter === 'all' || ap.severity === severityFilter,
      ),
    [severityFilter],
  );

  return (
    <div className="space-y-4">
      {/* Severity filter */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'critical', 'high', 'moderate'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSeverityFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border capitalize transition-colors ${
              severityFilter === s
                ? 'bg-primary/20 text-primary border-primary/40'
                : 'bg-card border-border/60 text-muted-foreground hover:border-primary/30'
            }`}
          >
            {s === 'all' ? 'All severities' : s} ({s === 'all' ? ICT_ANTI_PATTERNS.length : ICT_ANTI_PATTERNS.filter((a) => a.severity === s).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ap) => (
          <Card key={ap.name} className="border-border/60">
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm font-semibold capitalize">
                  {ap.name.replace(/_/g, ' ')}
                </CardTitle>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0 capitalize ${severityColor(ap.severity)}`}
                  >
                    {ap.severity}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 bg-red-500/10 text-red-400 border-red-500/30"
                  >
                    {ap.penalty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2.5">
              <p className="text-xs text-muted-foreground">{ap.description}</p>
              {ap.symptom && (
                <div className="flex gap-1.5 items-start">
                  <Warning size={12} className="mt-0.5 shrink-0 text-orange-400" />
                  <p className="text-[11px] text-orange-400">{ap.symptom}</p>
                </div>
              )}
              <div className="space-y-1.5 pt-1 border-t border-border/40">
                <div className="flex gap-1.5 items-start">
                  <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
                  <p className="text-[11px] text-muted-foreground">
                    <span className="font-medium text-foreground/70">Why it fails: </span>
                    {ap.why_fails}
                  </p>
                </div>
                <div className="flex gap-1.5 items-start">
                  <CheckCircle size={12} className="mt-0.5 shrink-0 text-emerald-400" />
                  <p className="text-[11px] text-muted-foreground">
                    <span className="font-medium text-foreground/70">Fix: </span>
                    {ap.fix}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RulesTimingTab() {
  const kz = ICT_TIME_RULES.killzones;
  const chains = ICT_CAUSAL_CHAINS;

  return (
    <div className="space-y-8">
      {/* Killzones */}
      <section>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          Session Killzones
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {(
            [
              { key: 'asian', label: 'Asian', icon: '🌏', color: 'border-indigo-500/30 bg-indigo-500/5' },
              { key: 'london', label: 'London', icon: '🇬🇧', color: 'border-blue-500/30 bg-blue-500/5' },
              { key: 'ny_am', label: 'NY AM', icon: '🗽', color: 'border-emerald-500/30 bg-emerald-500/5' },
              { key: 'ny_pm', label: 'NY PM', icon: '🌆', color: 'border-orange-500/30 bg-orange-500/5' },
            ] as const
          ).map(({ key, label, icon, color }) => {
            const z = kz[key];
            return (
              <Card key={key} className={`border ${color}`}>
                <CardContent className="pt-4 pb-4 px-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span>{icon}</span>
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="text-[11px] font-mono text-primary">{z.time}</p>
                  <p className="text-[11px] text-muted-foreground">{z.behavior}</p>
                  <p className="text-[11px] text-foreground/70">{z.trade_style}</p>
                  {'best_setups' in z && z.best_setups && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {z.best_setups.map((s: string) => (
                        <Badge key={s} variant="secondary" className="text-[10px] px-1.5 py-0 font-mono">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Macro windows */}
      <section>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Timer size={16} className="text-primary" />
          Macro Windows
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ICT_TIME_RULES.macros.map((m) => (
            <Card key={m.name} className="border-border/60">
              <CardContent className="pt-3 pb-3 px-4 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-primary">{m.name}</span>
                <span className="text-[11px] text-muted-foreground text-right">{m.action}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {ICT_TIME_RULES.macro_times.times.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-1 rounded bg-secondary font-mono text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">{ICT_TIME_RULES.macro_times.usage}</p>
      </section>

      {/* Silver Bullet windows */}
      <section>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Lightning size={16} className="text-yellow-400" />
          Silver Bullet Windows
        </h3>
        <div className="flex flex-wrap gap-3">
          {ICT_TIME_RULES.silver_bullet_windows.map((w) => (
            <Card key={w.time} className="border-yellow-500/30 bg-yellow-500/5">
              <CardContent className="pt-3 pb-3 px-4 flex items-center gap-3">
                <span className="text-xs font-mono text-yellow-400">{w.time}</span>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">{w.session}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Avoid times */}
      <section>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Warning size={16} className="text-red-400" />
          Times to Avoid
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {ICT_TIME_RULES.avoid_times.map((a) => (
            <div
              key={a.time}
              className="flex gap-3 items-start p-3 rounded-lg border border-red-500/20 bg-red-500/5"
            >
              <XCircle size={14} className="mt-0.5 shrink-0 text-red-400" />
              <div>
                <p className="text-[11px] font-mono text-red-400">{a.time}</p>
                <p className="text-[11px] text-muted-foreground">{a.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Causal chains */}
      <section>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Graph size={16} className="text-primary" />
          Causal Chains
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {(
            [
              { key: 'reversal_sequence', label: 'Reversal Sequence' },
              { key: 'power_of_3', label: 'Power of Three' },
              { key: 'htf_to_ltf', label: 'HTF → LTF' },
            ] as const
          ).map(({ key, label }) => {
            const chain = chains[key];
            return (
              <Card key={key} className="border-border/60">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm">{label}</CardTitle>
                  <p className="text-[11px] text-muted-foreground">{chain.description}</p>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <ol className="space-y-2">
                    {chain.steps.map((step) => (
                      <li key={step.step} className="flex gap-2 items-start">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">
                          {step.step}
                        </span>
                        <div className="text-[11px] text-muted-foreground">
                          {'signal' in step && step.signal && (
                            <span className="text-foreground/80 font-medium">{step.signal}</span>
                          )}
                          {'action' in step && step.action && (
                            <span className="text-foreground/80 font-medium">{step.action}</span>
                          )}
                          {'phase' in step && step.phase && (
                            <span className="text-foreground/80 font-medium capitalize">{step.phase}</span>
                          )}
                          {'concept' in step && step.concept && (
                            <span className="text-muted-foreground"> — {String(step.concept).replace(/_/g, ' ')}</span>
                          )}
                          {'time' in step && step.time && (
                            <span className="text-muted-foreground"> — {step.time}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                  {'key_insight' in chain && chain.key_insight && (
                    <p className="mt-3 text-[11px] italic text-primary border-t border-border/40 pt-2">
                      {chain.key_insight}
                    </p>
                  )}
                  {'failure_mode' in chain && chain.failure_mode && (
                    <p className="mt-3 text-[11px] italic text-red-400 border-t border-border/40 pt-2">
                      {chain.failure_mode}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

const CHECKLIST_LABELS: Record<string, string> = {
  liquidity_swept: 'Liquidity swept',
  at_htf_poi: 'At HTF POI',
  htf_bias_determined: 'HTF bias determined',
  entry_zone_identified: 'Entry zone identified',
  stop_loss_defined: 'Stop loss defined',
  target_defined: 'Target defined',
  displacement_confirmed: 'Displacement confirmed',
  in_killzone: 'In killzone',
  risk_under_1_percent: 'Risk < 1%',
  against_htf_bias: 'Against HTF bias',
  news_in_30_min: 'News in 30 min',
  already_2_trades_today: 'Already 2 trades today',
  revenge_trading: 'Revenge trading',
  outside_all_killzones: 'Outside all killzones',
  no_clear_invalidation: 'No clear invalidation',
};

// Confluence weight factor groups for the live calculator
type FactorEntry = { key: string; label: string; value: number };

function buildConfluenceFactors(): { group: string; color: string; factors: FactorEntry[] }[] {
  const cw = ICT_CONFLUENCE_WEIGHTS;
  return [
    {
      group: 'Critical',
      color: 'text-red-400',
      factors: Object.entries(cw.critical).map(([k, v]) => ({
        key: k,
        label: k.replace(/_/g, ' '),
        value: v as number,
      })),
    },
    {
      group: 'High',
      color: 'text-orange-400',
      factors: Object.entries(cw.high).map(([k, v]) => ({
        key: k,
        label: k.replace(/_/g, ' '),
        value: v as number,
      })),
    },
    {
      group: 'Moderate',
      color: 'text-yellow-400',
      factors: Object.entries(cw.moderate).map(([k, v]) => ({
        key: k,
        label: k.replace(/_/g, ' '),
        value: v as number,
      })),
    },
    {
      group: 'High Precision',
      color: 'text-purple-400',
      factors: Object.entries(cw.high_precision).map(([k, v]) => ({
        key: k,
        label: k.replace(/_/g, ' '),
        value: v as number,
      })),
    },
    {
      group: 'Bonuses',
      color: 'text-emerald-400',
      factors: Object.entries(cw.bonuses).map(([k, v]) => ({
        key: k,
        label: k.replace(/_/g, ' '),
        value: v as number,
      })),
    },
    {
      group: 'Penalties',
      color: 'text-red-500',
      factors: Object.entries(cw.penalties).map(([k, v]) => ({
        key: k,
        label: k.replace(/_/g, ' '),
        value: v as number,
      })),
    },
  ];
}

const CONFLUENCE_FACTOR_GROUPS = buildConfluenceFactors();

function ChecklistConfluenceTab() {
  // Pre-trade checklist state
  const [checklistState, setChecklistState] = useState<PreTradeValidationInput>({});

  // Confluence calculator state
  const [activeFactors, setActiveFactors] = useState<Set<string>>(new Set());

  const validationResult = useMemo(() => validatePreTrade(checklistState), [checklistState]);

  const confluenceScore = useMemo(() => {
    let score = 0;
    for (const group of CONFLUENCE_FACTOR_GROUPS) {
      for (const f of group.factors) {
        if (activeFactors.has(f.key)) score += f.value;
      }
    }
    return Math.round(score * 10) / 10;
  }, [activeFactors]);

  const confluenceGrade = getScoreGrade(confluenceScore);

  const toggleFactor = (key: string) => {
    setActiveFactors((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleChecklistKey = (key: string, isRedFlag: boolean) => {
    setChecklistState((prev) => ({
      ...prev,
      [key]: isRedFlag ? (prev[key as keyof PreTradeValidationInput] ? false : true) : !prev[key as keyof PreTradeValidationInput],
    }));
  };

  const resetChecklist = () => setChecklistState({});
  const resetConfluence = () => setActiveFactors(new Set());

  const scoreColor =
    validationResult.score >= 90
      ? 'text-emerald-400'
      : validationResult.score >= 70
        ? 'text-blue-400'
        : validationResult.score >= 50
          ? 'text-yellow-400'
          : 'text-red-400';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ── Pre-trade checklist ───────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <ListChecks size={16} className="text-primary" />
            Pre-Trade Checklist
          </h3>
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={resetChecklist}>
            Reset
          </Button>
        </div>

        {/* Must have one */}
        <Card className="border-border/60">
          <CardContent className="pt-3 pb-3 px-4 space-y-2">
            <p className="text-[11px] font-semibold text-foreground/80 uppercase tracking-wide">
              Must Have At Least One
            </p>
            {ICT_PRE_TRADE_CHECKLIST.must_have_one.map((key) => {
              const checked = !!checklistState[key as keyof PreTradeValidationInput];
              return (
                <button
                  key={key}
                  onClick={() => toggleChecklistKey(key, false)}
                  className={`w-full flex items-center gap-2 p-2 rounded-md text-[11px] transition-colors ${
                    checked
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {checked ? <CheckCircle size={14} weight="fill" /> : <XCircle size={14} />}
                  {CHECKLIST_LABELS[key] ?? key.replace(/_/g, ' ')}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Must have all */}
        <Card className="border-border/60">
          <CardContent className="pt-3 pb-3 px-4 space-y-2">
            <p className="text-[11px] font-semibold text-foreground/80 uppercase tracking-wide">
              Must Have All
            </p>
            {ICT_PRE_TRADE_CHECKLIST.must_have_all.map((key) => {
              const checked = !!checklistState[key as keyof PreTradeValidationInput];
              return (
                <button
                  key={key}
                  onClick={() => toggleChecklistKey(key, false)}
                  className={`w-full flex items-center gap-2 p-2 rounded-md text-[11px] transition-colors ${
                    checked
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {checked ? <CheckCircle size={14} weight="fill" /> : <XCircle size={14} />}
                  {CHECKLIST_LABELS[key] ?? key.replace(/_/g, ' ')}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Should have */}
        <Card className="border-border/60">
          <CardContent className="pt-3 pb-3 px-4 space-y-2">
            <p className="text-[11px] font-semibold text-foreground/80 uppercase tracking-wide">
              Should Have
            </p>
            {ICT_PRE_TRADE_CHECKLIST.should_have.map((key) => {
              const checked = !!checklistState[key as keyof PreTradeValidationInput];
              return (
                <button
                  key={key}
                  onClick={() => toggleChecklistKey(key, false)}
                  className={`w-full flex items-center gap-2 p-2 rounded-md text-[11px] transition-colors ${
                    checked
                      ? 'bg-blue-500/15 text-blue-400'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {checked ? <CheckCircle size={14} weight="fill" /> : <XCircle size={14} />}
                  {CHECKLIST_LABELS[key] ?? key.replace(/_/g, ' ')}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Red flags */}
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="pt-3 pb-3 px-4 space-y-2">
            <p className="text-[11px] font-semibold text-red-400 uppercase tracking-wide">
              Red Flags (click to flag)
            </p>
            {ICT_PRE_TRADE_CHECKLIST.red_flags.map((key) => {
              const flagged = !!checklistState[key as keyof PreTradeValidationInput];
              return (
                <button
                  key={key}
                  onClick={() => toggleChecklistKey(key, true)}
                  className={`w-full flex items-center gap-2 p-2 rounded-md text-[11px] transition-colors ${
                    flagged
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-secondary/30 text-muted-foreground hover:bg-red-500/10'
                  }`}
                >
                  {flagged ? <Warning size={14} weight="fill" className="text-red-400" /> : <Warning size={14} />}
                  {CHECKLIST_LABELS[key] ?? key.replace(/_/g, ' ')}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Validation result */}
        <Card
          className={`border ${
            validationResult.can_trade ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'
          }`}
        >
          <CardContent className="pt-4 pb-4 px-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${scoreColor}`}>{validationResult.score}/100</span>
              <Badge
                className={`text-sm px-3 py-1 ${
                  validationResult.can_trade
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-red-500/20 text-red-400 border-red-500/40'
                }`}
              >
                {validationResult.can_trade ? 'CAN TRADE' : 'DO NOT TRADE'}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">{validationResult.recommendation}</p>
            {validationResult.warnings.length > 0 && (
              <ul className="space-y-0.5 pt-1 border-t border-border/40">
                {validationResult.warnings.map((w, i) => (
                  <li key={i} className="text-[11px] text-red-400 flex gap-1.5">
                    <Warning size={10} className="mt-0.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Confluence calculator ────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Scales size={16} className="text-primary" />
            Confluence Calculator
          </h3>
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={resetConfluence}>
            Reset
          </Button>
        </div>

        {/* Live score */}
        <Card
          className={`border ${
            confluenceGrade === 'A+'
              ? 'border-emerald-500/40 bg-emerald-500/5'
              : confluenceGrade === 'A'
                ? 'border-blue-500/40 bg-blue-500/5'
                : confluenceGrade === 'B'
                  ? 'border-yellow-500/40 bg-yellow-500/5'
                  : 'border-red-500/30 bg-red-500/5'
          }`}
        >
          <CardContent className="pt-4 pb-4 px-4 flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold tabular-nums">{confluenceScore.toFixed(1)}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Min: {ICT_CONFLUENCE_WEIGHTS.thresholds.minimum_for_trade} &nbsp;|&nbsp;
                Good: {ICT_CONFLUENCE_WEIGHTS.thresholds.good_setup} &nbsp;|&nbsp;
                A+: {ICT_CONFLUENCE_WEIGHTS.thresholds.a_plus_setup}
              </p>
            </div>
            <div className={`text-5xl font-black ${gradeColor(confluenceGrade)}`}>{confluenceGrade}</div>
          </CardContent>
        </Card>

        {/* Factor groups */}
        <ScrollArea className="h-[calc(100vh-22rem)] pr-1">
          <div className="space-y-4">
            {CONFLUENCE_FACTOR_GROUPS.map((group) => (
              <Card key={group.group} className="border-border/60">
                <CardContent className="pt-3 pb-3 px-4 space-y-2">
                  <p className={`text-[11px] font-semibold uppercase tracking-wide ${group.color}`}>
                    {group.group}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.factors.map((f) => {
                      const active = activeFactors.has(f.key);
                      return (
                        <button
                          key={f.key}
                          onClick={() => toggleFactor(f.key)}
                          className={`px-2.5 py-1 rounded-md text-[11px] border transition-colors flex items-center gap-1.5 ${
                            active
                              ? f.value < 0
                                ? 'bg-red-500/20 text-red-400 border-red-500/40'
                                : 'bg-primary/20 text-primary border-primary/40'
                              : 'bg-card border-border/60 text-muted-foreground hover:border-primary/30'
                          }`}
                        >
                          {f.label}
                          <span
                            className={`font-mono font-bold ${f.value < 0 ? 'text-red-400' : 'text-emerald-400'}`}
                          >
                            {f.value > 0 ? '+' : ''}{f.value}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function KnowledgeBaseView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">ICT Knowledge Base</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Complete reference for all ICT concepts, models, relationships, rules, and trade validation tools.
        </p>
      </div>

      <Tabs defaultValue="concepts">
        <TabsList className="mb-6 inline-flex w-max overflow-x-auto">
          <TabsTrigger value="concepts" className="gap-2">
            <Brain size={15} />
            Concepts ({ICT_CONCEPTS.length})
          </TabsTrigger>
          <TabsTrigger value="models" className="gap-2">
            <ChartLine size={15} />
            Models ({ICT_MODELS.length})
          </TabsTrigger>
          <TabsTrigger value="relationships" className="gap-2">
            <Graph size={15} />
            Relationships ({ICT_RELATIONSHIPS.length})
          </TabsTrigger>
          <TabsTrigger value="antipatterns" className="gap-2">
            <Warning size={15} />
            Anti-Patterns ({ICT_ANTI_PATTERNS.length})
          </TabsTrigger>
          <TabsTrigger value="rules" className="gap-2">
            <Clock size={15} />
            Rules &amp; Timing
          </TabsTrigger>
          <TabsTrigger value="checklist" className="gap-2">
            <ListChecks size={15} />
            Checklist &amp; Confluence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="concepts">
          <ConceptsTab />
        </TabsContent>
        <TabsContent value="models">
          <ModelsTab />
        </TabsContent>
        <TabsContent value="relationships">
          <RelationshipsTab />
        </TabsContent>
        <TabsContent value="antipatterns">
          <AntiPatternsTab />
        </TabsContent>
        <TabsContent value="rules">
          <RulesTimingTab />
        </TabsContent>
        <TabsContent value="checklist">
          <ChecklistConfluenceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
