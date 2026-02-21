import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, BookOpen, Target, TrendUp, Cube, Code, Notebook, CirclesThreePlus, Graph, ChatsCircle, Brain, Lightning, Sparkle, ArrowRight, ChartLine, BookOpenText, Heart, Warning, Crown, Star } from '@phosphor-icons/react';
import { StatCard } from '@/components/shared/StatCard';
import type { DatabaseStats, DomainType, Entity, Relationship } from '@/lib/types';

interface DashboardViewProps {
  stats: DatabaseStats;
  onNavigate?: (tab: string) => void;
  entities?: Entity[];
  relationships?: Relationship[];
  favorites?: string[];
  onToggleFavorite?: (entityId: string) => void;
  onEntitySelect?: (entity: Entity) => void;
}

export function DashboardView({ stats, onNavigate, entities = [], relationships = [], favorites = [], onToggleFavorite, onEntitySelect }: DashboardViewProps) {
  const domainIcons: Record<DomainType, React.ReactNode> = {
    concepts: <BookOpen size={24} weight="duotone" />,
    models: <Target size={24} weight="duotone" />,
    trades: <TrendUp size={24} weight="duotone" />,
    schemas: <Cube size={24} weight="duotone" />,
    training_data: <Database size={24} weight="duotone" />,
    knowledge_base: <BookOpen size={24} weight="duotone" />,
    code: <Code size={24} weight="duotone" />,
    journal: <Notebook size={24} weight="duotone" />,
    charts: <ChartLine size={24} weight="duotone" />,
    rag_data: <Database size={24} weight="duotone" />,
    relationships: <CirclesThreePlus size={24} weight="duotone" />
  };

  const domainLabels: Record<DomainType, string> = {
    concepts: 'Concepts',
    models: 'Models',
    trades: 'Trades',
    schemas: 'Schemas',
    training_data: 'Training Data',
    knowledge_base: 'Knowledge Base',
    code: 'Code Modules',
    journal: 'Journal Entries',
    charts: 'Charts',
    rag_data: 'RAG Data',
    relationships: 'Relationships'
  };

  const domainColors: Record<DomainType, string> = {
    concepts: 'text-green-400',
    models: 'text-blue-400',
    trades: 'text-red-400',
    schemas: 'text-yellow-400',
    training_data: 'text-purple-400',
    knowledge_base: 'text-orange-400',
    code: 'text-violet-400',
    journal: 'text-amber-400',
    charts: 'text-cyan-400',
    rag_data: 'text-teal-400',
    relationships: 'text-pink-400'
  };

  const quickActions = [
    { label: 'Explore Graph', icon: <Graph size={18} weight="duotone" />, tab: 'graph', description: 'Visualize knowledge connections' },
    { label: 'AI Chat', icon: <ChatsCircle size={18} weight="duotone" />, tab: 'chat', description: 'Ask questions about ICT' },
    { label: 'Semantic Search', icon: <Sparkle size={18} weight="duotone" />, tab: 'search', description: 'Find concepts by meaning' },
    { label: 'Patterns', icon: <Brain size={18} weight="duotone" />, tab: 'patterns', description: 'Discover trading patterns' },
    { label: 'Analytics', icon: <ChartLine size={18} weight="duotone" />, tab: 'analytics', description: 'Trade performance metrics' },
    { label: 'Research', icon: <BookOpenText size={18} weight="duotone" />, tab: 'research', description: '68+ source materials' },
  ];

  const hasData = stats.totalEntities > 0;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-card/50 border border-primary/20 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">v2.0</Badge>
            {hasData && <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Knowledge Base Loaded</Badge>}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">ICT Knowledge Engine</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed">
            AI-powered knowledge graph for Inner Circle Trader methodology. Explore {stats.totalEntities} entities 
            connected through {stats.totalRelationships} relationships spanning concepts, models, trades, and more.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Entities"
          value={stats.totalEntities.toLocaleString()}
          icon={<Database size={22} weight="duotone" className="text-primary" />}
        />
        <StatCard
          label="Relationships"
          value={stats.totalRelationships.toLocaleString()}
          icon={<CirclesThreePlus size={22} weight="duotone" className="text-accent" />}
          iconContainerClassName="bg-accent/10"
          className="hover:border-accent/50"
        />
        <StatCard
          label="Entity Types"
          value={Object.keys(stats.entitiesByType).filter(k => (stats.entitiesByType as Record<string, number>)[k] > 0).length}
          icon={<Lightning size={22} weight="duotone" className="text-yellow-400" />}
          iconContainerClassName="bg-yellow-500/10"
        />
        <StatCard
          label="Domains"
          value={Object.keys(stats.entitiesByDomain).filter(k => (stats.entitiesByDomain as Record<string, number>)[k] > 0).length}
          icon={<Brain size={22} weight="duotone" className="text-purple-400" />}
          iconContainerClassName="bg-purple-500/10"
        />
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.tab}
              onClick={() => onNavigate?.(action.tab)}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 border border-transparent hover:border-primary/20 transition-all group text-center"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                {action.icon}
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition-colors">{action.label}</span>
              <span className="text-[10px] text-muted-foreground">{action.description}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Favorites */}
      {favorites.length > 0 && (() => {
        const favEntities = entities.filter(e => favorites.includes(e.id));
        if (favEntities.length === 0) return null;
        return (
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-yellow-400" weight="fill" />
                <h2 className="text-lg font-semibold">Favorites</h2>
                <Badge variant="secondary" className="text-xs">{favEntities.length}</Badge>
              </div>
              {onNavigate && (
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground hover:text-primary" onClick={() => onNavigate('explorer')}>
                  View all <ArrowRight size={12} />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {favEntities.slice(0, 6).map(entity => (
                <div
                  key={entity.id}
                  className="group flex items-start gap-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 border border-transparent hover:border-yellow-500/20 transition-all cursor-pointer"
                  onClick={() => onEntitySelect?.(entity)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold truncate group-hover:text-yellow-400 transition-colors">{entity.name}</p>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 flex-shrink-0">{entity.type}</Badge>
                    </div>
                    {entity.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{entity.description}</p>
                    )}
                  </div>
                  {onToggleFavorite && (
                    <button
                      className="flex-shrink-0 p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(entity.id); }}
                      title="Remove from favorites"
                    >
                      <Star size={16} weight="fill" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {favEntities.length > 6 && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                +{favEntities.length - 6} more — view in Explorer
              </p>
            )}
          </Card>
        );
      })()}

      {/* Entities by Domain */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Knowledge Graph Breakdown</h2>
          {onNavigate && (
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground hover:text-primary" onClick={() => onNavigate('explorer')}>
              View all <ArrowRight size={12} />
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.keys(stats.entitiesByDomain) as DomainType[])
            .filter(domain => (stats.entitiesByDomain[domain] || 0) > 0)
            .map((domain) => {
              const count = stats.entitiesByDomain[domain] || 0;
              return (
                <div key={domain} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors border border-transparent hover:border-border/50">
                  <div className={domainColors[domain]}>
                    {domainIcons[domain]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{domainLabels[domain]}</p>
                    <p className="text-lg font-semibold">{count}</p>
                  </div>
                </div>
              );
          })}
        </div>
      </Card>

      {/* Knowledge Health */}
      {entities.length > 0 && (() => {
        const relCountById: Record<string, number> = {};
        relationships.forEach(r => {
          relCountById[r.sourceId] = (relCountById[r.sourceId] || 0) + 1;
          relCountById[r.targetId] = (relCountById[r.targetId] || 0) + 1;
        });
        const orphanCount = entities.filter(e => !(relCountById[e.id])).length;
        const avgRels = entities.length > 0 ? (relationships.length * 2) / entities.length : 0;
        const topConnected = [...entities]
          .sort((a, b) => (relCountById[b.id] || 0) - (relCountById[a.id] || 0))
          .slice(0, 3);
        const typeDistribution = Object.entries(
          entities.reduce((acc, e) => { acc[e.type] = (acc[e.type] || 0) + 1; return acc; }, {} as Record<string, number>)
        ).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const maxCount = typeDistribution[0]?.[1] || 1;
        const healthScore = Math.min(100, Math.round(
          (Math.min(avgRels / 4, 1) * 50) +
          (Math.max(0, 1 - orphanCount / Math.max(entities.length, 1)) * 50)
        ));
        const healthColor = healthScore >= 70 ? 'text-green-400' : healthScore >= 40 ? 'text-yellow-400' : 'text-red-400';
        const healthLabel = healthScore >= 70 ? 'Healthy' : healthScore >= 40 ? 'Fair' : 'Sparse';

        return (
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-rose-400" weight="duotone" />
                <h2 className="text-lg font-semibold">Knowledge Health</h2>
              </div>
              <div className={`flex items-center gap-1.5 text-sm font-semibold ${healthColor}`}>
                <span className="text-2xl font-bold">{healthScore}</span>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] text-muted-foreground font-normal">/ 100</span>
                  <span className="text-xs">{healthLabel}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats column */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg relationships / entity</span>
                  <span className="font-semibold tabular-nums">{avgRels.toFixed(1)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Warning size={13} className="text-yellow-400" /> Orphan entities
                  </span>
                  <span className={`font-semibold tabular-nums ${orphanCount > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {orphanCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total relationships</span>
                  <span className="font-semibold tabular-nums">{relationships.length}</span>
                </div>
              </div>

              {/* Type distribution */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Type Distribution</p>
                {typeDistribution.map(([type, count]) => (
                  <div key={type} className="space-y-0.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground/80 capitalize">{type.replace('_', ' ')}</span>
                      <span className="text-muted-foreground tabular-nums">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary/40 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/60 transition-all"
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Top connected */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Crown size={12} className="text-yellow-400" /> Most Connected
                </p>
                <div className="space-y-2">
                  {topConnected.map((entity, i) => (
                    <div key={entity.id} className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground/60 font-mono text-xs w-4">{i + 1}.</span>
                      <span className="flex-1 truncate text-foreground/90">{entity.name}</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 flex-shrink-0">
                        {relCountById[entity.id] || 0}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        );
      })()}

      {/* Recent Activity */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ScrollArea className="h-[250px]">
          <div className="space-y-2">
            {stats.recentActivity.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-muted-foreground">No recent processing activity</p>
                <p className="text-xs text-muted-foreground">Upload files or use the chat to generate activity</p>
              </div>
            ) : (
              stats.recentActivity.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20">
                  <Badge variant={log.status === 'completed' ? 'default' : log.status === 'error' ? 'destructive' : 'secondary'}>
                    {log.status}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono truncate">{log.filePath}</p>
                    <p className="text-xs text-muted-foreground mt-1">{log.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
