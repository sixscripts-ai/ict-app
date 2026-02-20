import { useState, useMemo, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { MagnifyingGlass, Funnel, CheckSquare, Square, Star } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getEntityTypeIcon } from '@/lib/ai-processor';
import { BatchOperationsBar } from '@/components/BatchOperationsBar';
import { exportEntities } from '@/lib/export-utils';
import { toast } from 'sonner';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Entity, DomainType, EntityType, Relationship } from '@/lib/types';

interface ExplorerViewProps {
  entities: Entity[];
  relationships?: Relationship[];
  onEntitySelect: (entity: Entity) => void;
  onBatchReclassify?: (entities: Entity[], domain: DomainType, type: EntityType) => void;
  onBatchDelete?: (entities: Entity[]) => void;
  favorites?: string[];
  onToggleFavorite?: (entityId: string) => void;
}

export function ExplorerView({ entities, relationships = [], onEntitySelect, onBatchReclassify, onBatchDelete, favorites = [], onToggleFavorite }: ExplorerViewProps) {
  const [search, setSearch] = useState('');
  const [filterDomain, setFilterDomain] = useState<DomainType | 'all'>('all');
  const [filterType, setFilterType] = useState<EntityType | 'all'>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  const [minRiskReward, setMinRiskReward] = useState<number[]>([0]);
  const [maxRiskReward, setMaxRiskReward] = useState<number[]>([10]);
  const [minQualityGrade, setMinQualityGrade] = useState<number[]>([0]);
  const [filterTradeResult, setFilterTradeResult] = useState<'all' | 'win' | 'loss'>('all');
  const [filterTag, setFilterTag] = useState('');
  const [filterOrphan, setFilterOrphan] = useState<'all' | 'orphan' | 'connected'>('all');
  const [filterFavorites, setFilterFavorites] = useState(false);
  
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedEntityIds, setSelectedEntityIds] = useState<Set<string>>(new Set());

  const calculateRR = (entity: Entity): number | null => {
    if (entity.type !== 'trade') return null;
    
    const entry = entity.metadata?.execution?.entry_price || entity.metadata?.entry;
    const stop = entity.metadata?.execution?.stop_loss || entity.metadata?.stop;
    const target = entity.metadata?.execution?.target || entity.metadata?.target;
    
    if (!entry || !stop || !target) return null;
    
    const risk = Math.abs(entry - stop);
    const reward = Math.abs(target - entry);
    
    if (risk === 0) return null;
    return reward / risk;
  };

  const getQualityGrade = (entity: Entity): number | null => {
    if (entity.type !== 'trade') return null;
    
    return entity.metadata?.setup?.quality_grade || 
           entity.metadata?.quality_grade || 
           entity.metadata?.grade || 
           null;
  };

  const getTradeResult = (entity: Entity): 'win' | 'loss' | null => {
    if (entity.type !== 'trade') return null;
    
    const result = entity.metadata?.execution?.result || 
                   entity.metadata?.result ||
                   entity.metadata?.meta?.example_type;
    
    if (result === 'WIN' || result === 'win' || result === 'positive') return 'win';
    if (result === 'LOSS' || result === 'loss' || result === 'negative') return 'loss';
    return null;
  };

  // Build connected-entity lookup for orphan filter
  const connectedIds = useMemo(() => {
    const ids = new Set<string>();
    relationships.forEach(r => { ids.add(r.sourceId); ids.add(r.targetId); });
    return ids;
  }, [relationships]);

  // Unique tags across all entities for tag filter dropdown
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    entities.forEach(e => e.tags?.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [entities]);

  const filtered = useMemo(() => entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(search.toLowerCase()) ||
                         entity.description?.toLowerCase().includes(search.toLowerCase());
    const matchesDomain = filterDomain === 'all' || entity.domain === filterDomain;
    const matchesType = filterType === 'all' || entity.type === filterType;
    
    if (!matchesSearch || !matchesDomain || !matchesType) return false;

    // Favorites filter
    if (filterFavorites && !favorites.includes(entity.id)) return false;

    // Tag filter
    if (filterTag && !(entity.tags || []).includes(filterTag)) return false;

    // Orphan filter
    if (filterOrphan === 'orphan' && connectedIds.has(entity.id)) return false;
    if (filterOrphan === 'connected' && !connectedIds.has(entity.id)) return false;
    
    if (entity.type === 'trade' && showAdvancedFilters) {
      const rr = calculateRR(entity);
      if (rr !== null) {
        if (rr < minRiskReward[0] || rr > maxRiskReward[0]) return false;
      }
      
      const grade = getQualityGrade(entity);
      if (grade !== null && grade < minQualityGrade[0]) return false;
      
      const result = getTradeResult(entity);
      if (filterTradeResult !== 'all' && result !== filterTradeResult) return false;
    }
    
    return true;
  }), [entities, search, filterDomain, filterType, showAdvancedFilters, minRiskReward, maxRiskReward, minQualityGrade, filterTradeResult, filterFavorites, favorites, filterTag, filterOrphan, connectedIds]);

  const groupedByDomain = useMemo(() => filtered.reduce((acc, entity) => {
    if (!acc[entity.domain]) acc[entity.domain] = [];
    acc[entity.domain].push(entity);
    return acc;
  }, {} as Record<DomainType, Entity[]>), [filtered]);

  const resetAdvancedFilters = () => {
    setMinRiskReward([0]);
    setMaxRiskReward([10]);
    setMinQualityGrade([0]);
    setFilterTradeResult('all');
    setFilterTag('');
    setFilterOrphan('all');
    setFilterFavorites(false);
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedEntityIds(new Set());
    }
  };

  const toggleEntitySelection = (entityId: string) => {
    const newSelected = new Set(selectedEntityIds);
    if (newSelected.has(entityId)) {
      newSelected.delete(entityId);
    } else {
      newSelected.add(entityId);
    }
    setSelectedEntityIds(newSelected);
  };

  const selectAllFiltered = () => {
    const allFilteredIds = new Set(filtered.map(e => e.id));
    setSelectedEntityIds(allFilteredIds);
  };

  const clearSelection = () => {
    setSelectedEntityIds(new Set());
  };

  const selectedEntities = entities.filter(e => selectedEntityIds.has(e.id));

  // Build flat row list for virtualizer: interleave domain headers and entity rows
  type VirtualRow = { kind: 'header'; domain: string } | { kind: 'entity'; entity: Entity };
  const virtualRows = useMemo<VirtualRow[]>(() => {
    const rows: VirtualRow[] = [];
    Object.entries(groupedByDomain).forEach(([domain, domainEntities]) => {
      rows.push({ kind: 'header', domain });
      domainEntities.forEach(entity => rows.push({ kind: 'entity', entity }));
    });
    return rows;
  }, [groupedByDomain]);

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: virtualRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback((index: number) => virtualRows[index]?.kind === 'header' ? 48 : 108, [virtualRows]),
    overscan: 8,
  });

  const handleBatchReclassify = (entities: Entity[], domain: DomainType, type: EntityType) => {
    if (onBatchReclassify) {
      onBatchReclassify(entities, domain, type);
    }
  };

  const handleBatchDelete = (entities: Entity[]) => {
    if (onBatchDelete) {
      onBatchDelete(entities);
    }
  };

  const handleBatchExport = (entities: Entity[], format: 'json' | 'csv') => {
    try {
      exportEntities(entities, format);
      toast.success(`Exported ${entities.length} entities as ${format.toUpperCase()}`, {
        description: `Downloaded ${entities.length} ${entities.length === 1 ? 'entity' : 'entities'} to your device`
      });
    } catch (error) {
      toast.error('Export failed', {
        description: error instanceof Error ? error.message : 'Failed to export entities'
      });
    }
  };

  const handleEntityClick = (entity: Entity) => {
    if (selectionMode) {
      toggleEntitySelection(entity.id);
    } else {
      onEntitySelect(entity);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Explorer</h1>
        <p className="text-muted-foreground mt-1">Browse and search all entities</p>
      </div>

      <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
        <div className="flex gap-2 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search entities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filterDomain} onValueChange={(v) => setFilterDomain(v as DomainType | 'all')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              <SelectItem value="concepts">Concepts</SelectItem>
              <SelectItem value="models">Models</SelectItem>
              <SelectItem value="trades">Trades</SelectItem>
              <SelectItem value="schemas">Schemas</SelectItem>
              <SelectItem value="code">Code</SelectItem>
              <SelectItem value="knowledge_base">Knowledge Base</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={(v) => setFilterType(v as EntityType | 'all')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="concept">Concept</SelectItem>
              <SelectItem value="model">Model</SelectItem>
              <SelectItem value="trade">Trade</SelectItem>
              <SelectItem value="schema">Schema</SelectItem>
              <SelectItem value="code_module">Code Module</SelectItem>
              <SelectItem value="document">Document</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={showAdvancedFilters ? 'default' : 'outline'}
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="gap-2"
          >
            <Funnel size={16} />
            Advanced
          </Button>
          {favorites.length > 0 && (
            <Button
              variant={filterFavorites ? 'default' : 'outline'}
              onClick={() => setFilterFavorites(!filterFavorites)}
              className="gap-2"
            >
              <Star size={16} weight={filterFavorites ? 'fill' : 'regular'} className={filterFavorites ? 'text-yellow-400' : ''} />
              Favorites ({favorites.length})
            </Button>
          )}
          <div className="w-px h-8 bg-border" />
          <Button
            variant={selectionMode ? 'default' : 'outline'}
            onClick={toggleSelectionMode}
            className="gap-2"
          >
            <CheckSquare size={16} />
            {selectionMode ? 'Exit Selection' : 'Select Multiple'}
          </Button>
          {selectionMode && filtered.length > 0 && (
            <Button
              variant="outline"
              onClick={selectAllFiltered}
              className="gap-2"
            >
              Select All ({filtered.length})
            </Button>
          )}
        </div>

        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Min Risk:Reward Ratio</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={minRiskReward}
                    onValueChange={setMinRiskReward}
                    min={0}
                    max={10}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono min-w-[3ch]">{minRiskReward[0].toFixed(1)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Max Risk:Reward Ratio</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={maxRiskReward}
                    onValueChange={setMaxRiskReward}
                    min={0}
                    max={10}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono min-w-[3ch]">{maxRiskReward[0].toFixed(1)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Min Quality Grade</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={minQualityGrade}
                    onValueChange={setMinQualityGrade}
                    min={0}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono min-w-[3ch]">{minQualityGrade[0]}/10</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Trade Result</Label>
                <Select value={filterTradeResult} onValueChange={(v) => setFilterTradeResult(v as 'all' | 'win' | 'loss')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="win">Wins Only</SelectItem>
                    <SelectItem value="loss">Losses Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Tag Filter</Label>
                <Select value={filterTag || '__all__'} onValueChange={(v) => setFilterTag(v === '__all__' ? '' : v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">All Tags</SelectItem>
                    {allTags.map(tag => (
                      <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Connection Status</Label>
                <Select value={filterOrphan} onValueChange={(v) => setFilterOrphan(v as 'all' | 'orphan' | 'connected')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Entities</SelectItem>
                    <SelectItem value="connected">Connected Only</SelectItem>
                    <SelectItem value="orphan">Orphans Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="ghost"
                  onClick={resetAdvancedFilters}
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filtered.length} of {entities.length} entities
        </div>
        {selectionMode && selectedEntityIds.size > 0 && (
          <Badge variant="secondary" className="gap-2">
            <CheckSquare size={14} />
            {selectedEntityIds.size} selected
          </Badge>
        )}
      </div>

      <div
        ref={parentRef}
        className="h-[calc(100vh-320px)] overflow-auto"
      >
        {Object.keys(groupedByDomain).length === 0 ? (
          <Card className="p-12 text-center bg-card/50">
            <MagnifyingGlass size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No entities found</p>
          </Card>
        ) : (
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map(virtualItem => {
              const row = virtualRows[virtualItem.index];
              if (row.kind === 'header') {
                return (
                  <div
                    key={`header-${row.domain}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                    className="flex items-end pb-2"
                  >
                    <h3 className="text-lg font-semibold capitalize">{row.domain.replace('_', ' ')}</h3>
                  </div>
                );
              }

              const entity = row.entity;
              const rr = calculateRR(entity);
              const grade = getQualityGrade(entity);
              const result = getTradeResult(entity);
              const isSelected = selectedEntityIds.has(entity.id);

              return (
                <div
                  key={entity.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                    padding: '4px 0',
                  }}
                >
                  <Card
                    className={`p-4 bg-card/50 backdrop-blur border-border/50 transition-all cursor-pointer h-full ${
                      isSelected
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'hover:border-primary/50 hover:scale-[1.005]'
                    }`}
                    onClick={() => handleEntityClick(entity)}
                  >
                    <div className="flex items-start gap-3">
                      {selectionMode && (
                        <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleEntitySelection(entity.id)}
                          />
                        </div>
                      )}
                      <span className="text-2xl">{getEntityTypeIcon(entity.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold">{entity.name}</h4>
                          {favorites.includes(entity.id) && (
                            <Star size={14} weight="fill" className="text-yellow-400 flex-shrink-0" />
                          )}
                          <Badge variant="secondary" className="text-xs">
                            {entity.type}
                          </Badge>
                          {entity.validationStatus === 'valid' && (
                            <Badge className="text-xs bg-primary/20 text-primary">VALID</Badge>
                          )}
                          {entity.validationStatus === 'invalid' && (
                            <Badge variant="destructive" className="text-xs">INVALID</Badge>
                          )}
                          {rr !== null && (
                            <Badge variant="outline" className="text-xs font-mono">
                              RR: {rr.toFixed(2)}
                            </Badge>
                          )}
                          {grade !== null && (
                            <Badge variant="outline" className="text-xs">
                              Grade: {grade}/10
                            </Badge>
                          )}
                          {result && (
                            <Badge variant={result === 'win' ? 'default' : 'destructive'} className="text-xs">
                              {result.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                        {entity.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {entity.description}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {entity.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-secondary/50">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {onToggleFavorite && (
                        <button
                          className={`flex-shrink-0 p-1.5 rounded-md transition-colors ${
                            favorites.includes(entity.id)
                              ? 'text-yellow-400 hover:text-yellow-300'
                              : 'text-muted-foreground/40 hover:text-yellow-400'
                          }`}
                          onClick={(e) => { e.stopPropagation(); onToggleFavorite(entity.id); }}
                          title={favorites.includes(entity.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Star size={18} weight={favorites.includes(entity.id) ? 'fill' : 'regular'} />
                        </button>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BatchOperationsBar
        selectedEntities={selectedEntities}
        onClearSelection={clearSelection}
        onReclassify={handleBatchReclassify}
        onDelete={handleBatchDelete}
        onExport={handleBatchExport}
      />
    </div>
  );
}
