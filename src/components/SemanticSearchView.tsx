import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MagnifyingGlass, Sparkle, ArrowsClockwise } from '@phosphor-icons/react';
import type { Entity } from '@/lib/types';
import type { AIGraphInternal } from '@/lib/schema';

interface SemanticSearchViewProps {
  entities: Entity[];
  aiGraph: AIGraphInternal;
  onEntitySelect: (entity: Entity) => void;
}

interface SearchResult {
  entity: Entity;
  similarity: number;
  reason: string;
}

export function SemanticSearchView({ entities, aiGraph, onEntitySelect }: SemanticSearchViewProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState<number>(0);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    const startTime = performance.now();

    try {
      const semanticResults = await aiGraph.semanticSearch(query, 15);
      
      const searchResults: SearchResult[] = semanticResults.map(r => {
        const entity = entities.find(e => e.id === r.node.id);
        return entity ? {
          entity,
          similarity: r.similarity,
          reason: r.similarity > 0.8 ? 'Highly relevant' : 
                  r.similarity > 0.6 ? 'Relevant' : 
                  'Possibly relevant'
        } : null;
      }).filter((r): r is SearchResult => r !== null);

      setResults(searchResults);
      setSearchTime(performance.now() - startTime);
    } catch (error) {
      console.error('Semantic search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFindSimilar = async (entityId: string) => {
    setIsSearching(true);
    const startTime = performance.now();

    try {
      const similarResults = await aiGraph.findSimilarNodes(entityId, 10, false);
      
      const searchResults: SearchResult[] = similarResults.map(r => {
        const entity = entities.find(e => e.id === r.node.id);
        return entity ? {
          entity,
          similarity: r.similarity,
          reason: r.connectionType === 'direct' ? 'Direct connection' : 'Semantically similar'
        } : null;
      }).filter((r): r is SearchResult => r !== null);

      setResults(searchResults);
      setSearchTime(performance.now() - startTime);
    } catch (error) {
      console.error('Similar nodes search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const getSimilarityColor = (similarity: number): string => {
    if (similarity >= 0.8) return 'text-primary';
    if (similarity >= 0.6) return 'text-accent';
    return 'text-muted-foreground';
  };

  const getSimilarityBadge = (similarity: number) => {
    if (similarity >= 0.8) return <Badge className="bg-primary/20 text-primary">High Match</Badge>;
    if (similarity >= 0.6) return <Badge variant="secondary">Medium Match</Badge>;
    return <Badge variant="outline">Low Match</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkle className="text-primary" size={24} />
            Semantic Search
          </CardTitle>
          <CardDescription>
            Find entities using AI-powered vector similarity search. Query by meaning, not just keywords.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              id="semantic-search-input"
              placeholder="Search by meaning... (e.g., 'price imbalance during market manipulation')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !query.trim()}
              className="gap-2"
            >
              <MagnifyingGlass size={18} />
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {searchTime > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Found {results.length} results in {searchTime.toFixed(0)}ms
            </p>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Search Results</h3>
            <p className="text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
          </div>

          <div className="grid gap-4">
            {results.map((result, index) => (
              <Card 
                key={result.entity.id}
                className="border-border/50 hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => onEntitySelect(result.entity)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-mono font-semibold ${getSimilarityColor(result.similarity)}`}>
                          {(result.similarity * 100).toFixed(1)}%
                        </span>
                        <Separator orientation="vertical" className="h-4" />
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {result.entity.name}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {result.entity.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {result.entity.domain}
                        </Badge>
                        {getSimilarityBadge(result.similarity)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFindSimilar(result.entity.id);
                      }}
                      className="gap-1.5"
                    >
                      <ArrowsClockwise size={14} />
                      Similar
                    </Button>
                  </div>
                </CardHeader>

                {result.entity.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {result.entity.description}
                    </p>
                    {result.entity.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {result.entity.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {results.length === 0 && query && !isSearching && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <MagnifyingGlass size={48} className="mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              No results found. Try a different query or make sure entities have been uploaded.
            </p>
          </CardContent>
        </Card>
      )}

      {entities.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Sparkle size={48} className="mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              Upload some entities first to enable semantic search.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
