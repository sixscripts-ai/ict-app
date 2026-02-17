import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { getEntityTypeIcon } from '@/lib/ai-processor';
import type { Entity, DomainType, EntityType } from '@/lib/types';

interface ExplorerViewProps {
  entities: Entity[];
  onEntitySelect: (entity: Entity) => void;
}

export function ExplorerView({ entities, onEntitySelect }: ExplorerViewProps) {
  const [search, setSearch] = useState('');
  const [filterDomain, setFilterDomain] = useState<DomainType | 'all'>('all');
  const [filterType, setFilterType] = useState<EntityType | 'all'>('all');

  const filtered = entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(search.toLowerCase()) ||
                         entity.description?.toLowerCase().includes(search.toLowerCase());
    const matchesDomain = filterDomain === 'all' || entity.domain === filterDomain;
    const matchesType = filterType === 'all' || entity.type === filterType;
    return matchesSearch && matchesDomain && matchesType;
  });

  const groupedByDomain = filtered.reduce((acc, entity) => {
    if (!acc[entity.domain]) acc[entity.domain] = [];
    acc[entity.domain].push(entity);
    return acc;
  }, {} as Record<DomainType, Entity[]>);

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
        </div>
      </Card>

      <div className="text-sm text-muted-foreground">
        Showing {filtered.length} of {entities.length} entities
      </div>

      <ScrollArea className="h-[calc(100vh-320px)]">
        <div className="space-y-6">
          {Object.keys(groupedByDomain).length === 0 ? (
            <Card className="p-12 text-center bg-card/50">
              <MagnifyingGlass size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No entities found</p>
            </Card>
          ) : (
            Object.entries(groupedByDomain).map(([domain, domainEntities]) => (
              <div key={domain}>
                <h3 className="text-lg font-semibold mb-3 capitalize">{domain.replace('_', ' ')}</h3>
                <div className="grid gap-3">
                  {domainEntities.map((entity) => (
                    <Card
                      key={entity.id}
                      className="p-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all cursor-pointer hover:scale-[1.01]"
                      onClick={() => onEntitySelect(entity)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{getEntityTypeIcon(entity.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold">{entity.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {entity.type}
                            </Badge>
                            {entity.validationStatus === 'valid' && (
                              <Badge className="text-xs bg-primary/20 text-primary">VALID</Badge>
                            )}
                            {entity.validationStatus === 'invalid' && (
                              <Badge variant="destructive" className="text-xs">INVALID</Badge>
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
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
