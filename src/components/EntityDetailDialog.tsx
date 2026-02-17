import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { getEntityTypeIcon } from '@/lib/ai-processor';
import type { Entity, Relationship } from '@/lib/types';

interface EntityDetailDialogProps {
  entity: Entity | null;
  relationships: Relationship[];
  allEntities: Entity[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEntityClick: (entity: Entity) => void;
}

export function EntityDetailDialog({ 
  entity, 
  relationships, 
  allEntities,
  open, 
  onOpenChange,
  onEntityClick 
}: EntityDetailDialogProps) {
  if (!entity) return null;

  const relatedEntities = relationships
    .filter(rel => rel.sourceId === entity.id || rel.targetId === entity.id)
    .map(rel => {
      const targetId = rel.sourceId === entity.id ? rel.targetId : rel.sourceId;
      return {
        relationship: rel,
        entity: allEntities.find(e => e.id === targetId)
      };
    })
    .filter(item => item.entity);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getEntityTypeIcon(entity.type)}</span>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{entity.name}</DialogTitle>
              <div className="flex gap-2 mt-2">
                <Badge>{entity.type}</Badge>
                <Badge variant="secondary">{entity.domain}</Badge>
                {entity.validationStatus === 'valid' && (
                  <Badge className="bg-primary/20 text-primary">VALID</Badge>
                )}
                {entity.validationStatus === 'invalid' && (
                  <Badge variant="destructive">INVALID</Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1 overflow-hidden flex flex-col">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="relationships">Relationships ({relatedEntities.length})</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4">
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-4">
                {entity.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{entity.description}</p>
                  </div>
                )}

                {entity.tags && entity.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {entity.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {entity.sources && entity.sources.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Sources</h4>
                    <div className="space-y-2">
                      {entity.sources.map((source, idx) => (
                        <div key={idx} className="text-sm font-mono p-2 rounded-lg bg-secondary/30">
                          <p className="truncate">{source.filePath}</p>
                          {source.lineStart && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Lines {source.lineStart}{source.lineEnd ? `-${source.lineEnd}` : ''}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {entity.validationErrors && entity.validationErrors.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-destructive">Validation Errors</h4>
                    <div className="space-y-1">
                      {entity.validationErrors.map((error, idx) => (
                        <p key={idx} className="text-sm text-destructive">{error}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="content" className="mt-0">
              {entity.content ? (
                <ScrollArea className="h-[500px]">
                  <pre className="text-xs font-mono p-4 rounded-lg bg-secondary/30 overflow-x-auto">
                    {entity.content}
                  </pre>
                </ScrollArea>
              ) : (
                <p className="text-sm text-muted-foreground">No content available</p>
              )}
            </TabsContent>

            <TabsContent value="relationships" className="mt-0">
              {relatedEntities.length > 0 ? (
                <div className="space-y-3">
                  {relatedEntities.map(({ relationship, entity: relatedEntity }) => {
                    if (!relatedEntity) return null;
                    return (
                      <div
                        key={relationship.id}
                        className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                        onClick={() => {
                          onEntityClick(relatedEntity);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{getEntityTypeIcon(relatedEntity.type)}</span>
                          <div className="flex-1">
                            <p className="font-semibold">{relatedEntity.name}</p>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {relationship.type.replace(/_/g, ' ')}
                            </Badge>
                            {relatedEntity.description && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {relatedEntity.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No relationships found</p>
              )}
            </TabsContent>

            <TabsContent value="metadata" className="mt-0">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">ID</p>
                    <p className="font-mono text-xs mt-1">{entity.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="mt-1">{entity.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Domain</p>
                    <p className="mt-1">{entity.domain}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="text-xs mt-1">{new Date(entity.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Updated</p>
                    <p className="text-xs mt-1">{new Date(entity.updatedAt).toLocaleString()}</p>
                  </div>
                </div>

                {Object.keys(entity.metadata || {}).length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Additional Metadata</h4>
                      <pre className="text-xs font-mono p-3 rounded-lg bg-secondary/30 overflow-x-auto">
                        {JSON.stringify(entity.metadata, null, 2)}
                      </pre>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
