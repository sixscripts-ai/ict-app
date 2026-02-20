import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Copy, Check, PencilSimple, X, FloppyDisk, Tag, Plus } from '@phosphor-icons/react';
import { getEntityTypeIcon } from '@/lib/ai-processor';
import type { Entity, Relationship } from '@/lib/types';

interface EntityDetailDialogProps {
  entity: Entity | null;
  relationships: Relationship[];
  allEntities: Entity[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEntityClick: (entity: Entity) => void;
  onEntityUpdate?: (id: string, updates: Partial<Pick<Entity, 'name' | 'description' | 'tags'>>) => void;
}

export function EntityDetailDialog({ 
  entity, 
  relationships, 
  allEntities,
  open, 
  onOpenChange,
  onEntityClick,
  onEntityUpdate
}: EntityDetailDialogProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftDescription, setDraftDescription] = useState('');
  const [draftTags, setDraftTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Reset edit state whenever the entity changes or dialog closes
  useEffect(() => {
    setIsEditing(false);
    setNewTag('');
    if (entity) {
      setDraftName(entity.name);
      setDraftDescription(entity.description || '');
      setDraftTags(entity.tags ? [...entity.tags] : []);
    }
  }, [entity, open]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const handleSave = () => {
    if (!entity || !onEntityUpdate) return;
    onEntityUpdate(entity.id, {
      name: draftName.trim() || entity.name,
      description: draftDescription,
      tags: draftTags,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!entity) return;
    setDraftName(entity.name);
    setDraftDescription(entity.description || '');
    setDraftTags(entity.tags ? [...entity.tags] : []);
    setNewTag('');
    setIsEditing(false);
  };

  const handleAddTag = () => {
    const t = newTag.trim();
    if (t && !draftTags.includes(t)) {
      setDraftTags(prev => [...prev, t]);
    }
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setDraftTags(prev => prev.filter(t => t !== tag));
  };

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
          <div className="flex items-start gap-3">
            <span className="text-3xl mt-1">{getEntityTypeIcon(entity.type)}</span>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <Input
                  value={draftName}
                  onChange={e => setDraftName(e.target.value)}
                  className="text-xl font-semibold h-9 mb-2"
                  autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
                />
              ) : (
                <DialogTitle className="text-2xl">{entity.name}</DialogTitle>
              )}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge>{entity.type}</Badge>
                <Badge variant="secondary">{entity.domain}</Badge>
                {entity.validationStatus === 'valid' && (
                  <Badge className="bg-primary/20 text-primary">VALID</Badge>
                )}
                {entity.validationStatus === 'invalid' && (
                  <Badge variant="destructive">INVALID</Badge>
                )}
                {onEntityUpdate && (
                  <div className="ml-auto flex items-center gap-1.5">
                    {isEditing ? (
                      <>
                        <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs text-muted-foreground" onClick={handleCancel}>
                          <X size={13} /> Cancel
                        </Button>
                        <Button size="sm" className="h-7 gap-1.5 text-xs" onClick={handleSave}>
                          <FloppyDisk size={13} /> Save
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground" onClick={() => setIsEditing(true)}>
                        <PencilSimple size={13} /> Edit
                      </Button>
                    )}
                  </div>
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
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  {isEditing ? (
                    <textarea
                      value={draftDescription}
                      onChange={e => setDraftDescription(e.target.value)}
                      rows={4}
                      className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                      placeholder="Add a description…"
                    />
                  ) : (
                    entity.description
                      ? <p className="text-sm text-muted-foreground">{entity.description}</p>
                      : <p className="text-sm text-muted-foreground/50 italic">No description</p>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {draftTags.map(tag => (
                          <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                            {tag}
                            <button
                              className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
                              onClick={() => handleRemoveTag(tag)}
                            >
                              <X size={10} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-muted-foreground" />
                        <Input
                          value={newTag}
                          onChange={e => setNewTag(e.target.value)}
                          placeholder="Add tag…"
                          className="h-7 text-xs flex-1"
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                        />
                        <Button size="sm" variant="ghost" className="h-7 px-2" onClick={handleAddTag}>
                          <Plus size={13} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    (entity.tags && entity.tags.length > 0) ? (
                      <div className="flex flex-wrap gap-2">
                        {entity.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground/50 italic">No tags</p>
                    )
                  )}
                </div>

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
                <div className="space-y-4">
                  {(() => {
                    const byType = relatedEntities.reduce((acc, item) => {
                      if (!item.entity) return acc;
                      const relType = item.relationship.type;
                      if (!acc[relType]) acc[relType] = [];
                      acc[relType].push(item);
                      return acc;
                    }, {} as Record<string, typeof relatedEntities>);

                    const relationshipLabels: Record<string, { label: string; description: string }> = {
                      'CONCEPT_USED_IN_MODEL': { label: 'Used in Models', description: 'Models that incorporate this concept' },
                      'MODEL_PRODUCES_TRADE': { label: 'Produces Trades', description: 'Trades generated using this model' },
                      'CONCEPT_RELATED_TO': { label: 'Related Concepts', description: 'Other concepts with connections' },
                      'CONCEPT_DETECTED_BY': { label: 'Detected By Code', description: 'Code modules that identify this concept' },
                      'TRADE_USES_CONCEPT': { label: 'Uses Concepts', description: 'Concepts applied in this trade' },
                      'SCHEMA_VALIDATES': { label: 'Validates', description: 'Data validated by this schema' },
                      'DOCUMENT_DEFINES': { label: 'Defines', description: 'Entities defined in this document' },
                      'CONCEPT_PREREQUISITE': { label: 'Prerequisites', description: 'Required foundational concepts' }
                    };

                    return Object.entries(byType).map(([relType, items]) => (
                      <div key={relType}>
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-foreground">
                            {relationshipLabels[relType]?.label || relType.replace(/_/g, ' ')}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {relationshipLabels[relType]?.description || ''}
                          </p>
                        </div>
                        <div className="space-y-2">
                          {items.map(({ relationship, entity: relatedEntity }) => {
                            if (!relatedEntity) return null;
                            return (
                              <div
                                key={relationship.id}
                                className="group p-3 rounded-lg bg-secondary/30 hover:bg-accent/20 hover:border-accent/50 border border-transparent transition-all cursor-pointer"
                                onClick={() => {
                                  onEntityClick(relatedEntity);
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-2xl transition-transform group-hover:scale-110">
                                    {getEntityTypeIcon(relatedEntity.type)}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                                        {relatedEntity.name}
                                      </p>
                                      <Badge variant="outline" className="text-xs">
                                        {relatedEntity.type}
                                      </Badge>
                                    </div>
                                    {relatedEntity.description && (
                                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                        {relatedEntity.description}
                                      </p>
                                    )}
                                    {relatedEntity.tags && relatedEntity.tags.length > 0 && (
                                      <div className="flex gap-1 mt-2 flex-wrap">
                                        {relatedEntity.tags.slice(0, 3).map(tag => (
                                          <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-muted-foreground group-hover:text-accent transition-colors">
                                    →
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No relationships found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This entity is not connected to other entities in the knowledge graph
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="metadata" className="mt-0">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">ID</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-mono text-xs truncate">{entity.id}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 flex-shrink-0"
                        onClick={() => copyToClipboard(entity.id, 'id')}
                        title="Copy ID"
                      >
                        {copiedKey === 'id' ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                      </Button>
                    </div>
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
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Additional Metadata</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1.5 text-xs"
                          onClick={() => copyToClipboard(JSON.stringify(entity.metadata, null, 2), 'metadata')}
                        >
                          {copiedKey === 'metadata' ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                          {copiedKey === 'metadata' ? 'Copied!' : 'Copy JSON'}
                        </Button>
                      </div>
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
