import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Database, BookOpen, Target, TrendUp, Cube, Code, Notebook, CirclesThreePlus } from '@phosphor-icons/react';
import type { DatabaseStats, DomainType, EntityType } from '@/lib/types';

interface DashboardViewProps {
  stats: DatabaseStats;
}

export function DashboardView({ stats }: DashboardViewProps) {
  const domainIcons: Record<DomainType, React.ReactNode> = {
    concepts: <BookOpen size={24} />,
    models: <Target size={24} />,
    trades: <TrendUp size={24} />,
    schemas: <Cube size={24} />,
    training_data: <Database size={24} />,
    knowledge_base: <BookOpen size={24} />,
    code: <Code size={24} />,
    journal: <Notebook size={24} />,
    charts: <Database size={24} />,
    rag_data: <Database size={24} />,
    relationships: <CirclesThreePlus size={24} />
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">ICT Knowledge Engine</h1>
        <p className="text-muted-foreground mt-1">AI-powered structured database for ICT trading methodology</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Database size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Total Entities</p>
              <p className="text-2xl font-semibold">{stats.totalEntities.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-accent/10">
              <CirclesThreePlus size={24} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Relationships</p>
              <p className="text-2xl font-semibold">{stats.totalRelationships.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Database size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Total Uploads</p>
              <p className="text-2xl font-semibold">{stats.totalUploads.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <h2 className="text-xl font-semibold mb-4">Entities by Domain</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.keys(stats.entitiesByDomain) as DomainType[]).map((domain) => {
            const count = stats.entitiesByDomain[domain] || 0;
            return (
              <div key={domain} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="text-primary">
                  {domainIcons[domain]}
                </div>
                <div>
                  <p className="text-sm font-medium">{domainLabels[domain]}</p>
                  <p className="text-xl font-semibold">{count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {stats.recentActivity.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No recent activity</p>
            ) : (
              stats.recentActivity.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
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
