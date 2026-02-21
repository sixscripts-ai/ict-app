import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Warning, LinkBreak, MagnifyingGlass, FileText, ShieldCheck, ArrowRight } from '@phosphor-icons/react';
import type { Entity, Relationship, KnowledgeGap } from '@/lib/types';

interface KnowledgeGapViewProps {
  entities: Entity[];
  relationships: Relationship[];
  onEntitySelect: (entity: Entity) => void;
}

const SEVERITY_STYLES: Record<KnowledgeGap['severity'], { bg: string; text: string }> = {
  high: { bg: 'bg-red-500/20', text: 'text-red-400' },
  medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  low: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
};

const TYPE_ICONS: Record<KnowledgeGap['type'], typeof Warning> = {
  orphan: LinkBreak,
  weak_link: Warning,
  missing_relationship: ArrowRight,
  underdocumented: FileText,
};

const TYPE_LABELS: Record<KnowledgeGap['type'], string> = {
  orphan: 'Orphan',
  weak_link: 'Weak Link',
  missing_relationship: 'Missing Relationship',
  underdocumented: 'Underdocumented',
};

export function KnowledgeGapView({ entities, relationships, onEntitySelect }: KnowledgeGapViewProps) {
  const [filterType, setFilterType] = useState<KnowledgeGap['type'] | 'all'>('all');
  const [filterSeverity, setFilterSeverity] = useState<KnowledgeGap['severity'] | 'all'>('all');

  const gaps = useMemo(() => {
    const result: KnowledgeGap[] = [];

    // Build adjacency counts
    const relCounts = new Map<string, number>();
    relationships.forEach(r => {
      relCounts.set(r.sourceId, (relCounts.get(r.sourceId) || 0) + 1);
      relCounts.set(r.targetId, (relCounts.get(r.targetId) || 0) + 1);
    });

    // Build relationship type lookup per entity
    const entityRelTypes = new Map<string, Set<string>>();
    relationships.forEach(r => {
      if (!entityRelTypes.has(r.sourceId)) entityRelTypes.set(r.sourceId, new Set());
      entityRelTypes.get(r.sourceId)!.add(r.type);
      if (!entityRelTypes.has(r.targetId)) entityRelTypes.set(r.targetId, new Set());
      entityRelTypes.get(r.targetId)!.add(r.type);
    });

    entities.forEach(entity => {
      const count = relCounts.get(entity.id) || 0;
      const types = entityRelTypes.get(entity.id) || new Set<string>();

      // Orphans
      if (count === 0) {
        const severity: KnowledgeGap['severity'] =
          entity.type === 'concept' || entity.type === 'model' ? 'high' : 'medium';
        result.push({
          type: 'orphan',
          severity,
          entityId: entity.id,
          entityName: entity.name,
          description: `"${entity.name}" has no relationships to any other entity.`,
          suggestion: `Connect this ${entity.type} to related entities to strengthen the knowledge graph.`,
        });
      }

      // Weak links (exactly 1 relationship)
      if (count === 1) {
        result.push({
          type: 'weak_link',
          severity: 'low',
          entityId: entity.id,
          entityName: entity.name,
          description: `"${entity.name}" has only 1 relationship — it's weakly connected.`,
          suggestion: 'Add more relationships to strengthen this node in the graph.',
        });
      }

      // Underdocumented
      if (!entity.description || entity.description.length < 30) {
        const severity: KnowledgeGap['severity'] = entity.type === 'concept' ? 'high' : 'medium';
        result.push({
          type: 'underdocumented',
          severity,
          entityId: entity.id,
          entityName: entity.name,
          description: `"${entity.name}" has ${entity.description ? 'a very short' : 'no'} description.`,
          suggestion: 'Add a detailed description to improve discoverability and AI chat quality.',
        });
      }

      // Missing structural relationships
      if (entity.type === 'concept' && !types.has('CONCEPT_USED_IN_MODEL') && !types.has('CONCEPT_RELATED_TO') && !types.has('CONCEPT_DETECTED_BY')) {
        result.push({
          type: 'missing_relationship',
          severity: 'medium',
          entityId: entity.id,
          entityName: entity.name,
          description: `Concept "${entity.name}" is not linked to any model or related concept.`,
          suggestion: 'Create CONCEPT_USED_IN_MODEL or CONCEPT_RELATED_TO relationships.',
        });
      }

      if (entity.type === 'model' && !types.has('MODEL_PRODUCES_TRADE')) {
        result.push({
          type: 'missing_relationship',
          severity: 'medium',
          entityId: entity.id,
          entityName: entity.name,
          description: `Model "${entity.name}" has no trade examples linked.`,
          suggestion: 'Link trades using MODEL_PRODUCES_TRADE to document how this model performs.',
        });
      }
    });

    // Sort: high first, then medium, then low
    const severityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
    result.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return result;
  }, [entities, relationships]);

  const filteredGaps = useMemo(() => {
    return gaps.filter(g => {
      if (filterType !== 'all' && g.type !== filterType) return false;
      if (filterSeverity !== 'all' && g.severity !== filterSeverity) return false;
      return true;
    });
  }, [gaps, filterType, filterSeverity]);

  const typeCounts = useMemo(() => {
    const counts: Record<KnowledgeGap['type'], number> = {
      orphan: 0,
      weak_link: 0,
      missing_relationship: 0,
      underdocumented: 0,
    };
    gaps.forEach(g => counts[g.type]++);
    return counts;
  }, [gaps]);

  const healthScore = useMemo(() => {
    const raw = Math.round(100 - (gaps.length / Math.max(entities.length, 1)) * 100);
    return Math.max(0, Math.min(100, raw));
  }, [gaps, entities]);

  const healthColor =
    healthScore > 80
      ? 'text-[oklch(0.75_0.2_145)]'
      : healthScore >= 50
        ? 'text-yellow-400'
        : 'text-red-400';

  const entityMap = useMemo(() => {
    const map = new Map<string, Entity>();
    entities.forEach(e => map.set(e.id, e));
    return map;
  }, [entities]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Knowledge Gap Detector</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Analyze your knowledge base for structural gaps and improvement opportunities
        </p>
      </div>

      {/* Health score + summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="md:col-span-1 bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <ShieldCheck size={16} />
              Health Score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold ${healthColor}`}>{healthScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">{gaps.length} gaps found</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <LinkBreak size={16} />
              Orphans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{typeCounts.orphan}</div>
            <p className="text-xs text-muted-foreground mt-1">Disconnected entities</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Warning size={16} />
              Weak Links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{typeCounts.weak_link}</div>
            <p className="text-xs text-muted-foreground mt-1">Single-connection nodes</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <FileText size={16} />
              Underdocumented
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{typeCounts.underdocumented}</div>
            <p className="text-xs text-muted-foreground mt-1">Need more detail</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <ArrowRight size={16} />
              Missing Rels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{typeCounts.missing_relationship}</div>
            <p className="text-xs text-muted-foreground mt-1">Structural gaps</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Select value={filterType} onValueChange={(v) => setFilterType(v as KnowledgeGap['type'] | 'all')}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Gap Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="orphan">Orphans</SelectItem>
            <SelectItem value="weak_link">Weak Links</SelectItem>
            <SelectItem value="underdocumented">Underdocumented</SelectItem>
            <SelectItem value="missing_relationship">Missing Relationships</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterSeverity} onValueChange={(v) => setFilterSeverity(v as KnowledgeGap['severity'] | 'all')}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-sm text-muted-foreground flex items-center ml-2">
          Showing {filteredGaps.length} of {gaps.length} gaps
        </div>
      </div>

      {/* Gap list */}
      <ScrollArea className="h-[calc(100vh-480px)]">
        <div className="space-y-3">
          {filteredGaps.length === 0 ? (
            <Card className="p-12 text-center bg-card/50">
              {gaps.length === 0 ? (
                <>
                  <ShieldCheck size={48} className="mx-auto mb-4 text-[oklch(0.75_0.2_145)]" />
                  <p className="text-lg font-medium">Knowledge base is healthy!</p>
                  <p className="text-muted-foreground mt-1">No structural gaps detected.</p>
                </>
              ) : (
                <>
                  <MagnifyingGlass size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No gaps match the current filters.</p>
                </>
              )}
            </Card>
          ) : (
            filteredGaps.map((gap, i) => {
              const Icon = TYPE_ICONS[gap.type];
              const sev = SEVERITY_STYLES[gap.severity];
              const entity = gap.entityId ? entityMap.get(gap.entityId) : undefined;

              return (
                <Card
                  key={`${gap.type}-${gap.entityId || i}`}
                  className="p-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${sev.bg} flex-shrink-0`}>
                      <Icon size={18} className={sev.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge variant="outline" className={`text-xs ${sev.bg} ${sev.text} border-0`}>
                          {gap.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {TYPE_LABELS[gap.type]}
                        </Badge>
                        {entity && (
                          <button
                            className="text-sm font-medium text-primary hover:underline cursor-pointer"
                            onClick={() => onEntitySelect(entity)}
                          >
                            {entity.name}
                          </button>
                        )}
                      </div>
                      <p className="text-sm">{gap.description}</p>
                      <p className="text-xs text-muted-foreground mt-1 italic">{gap.suggestion}</p>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
