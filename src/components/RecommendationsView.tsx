import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Sparkle, TrendUp, ChartLine, Lightbulb, ArrowRight, Target, ChartBar } from '@phosphor-icons/react';
import type { Entity, Relationship } from '@/lib/types';
import type { AIGraphInternal } from '@/lib/schema';

interface RecommendationsViewProps {
  entities: Entity[];
  relationships: Relationship[];
  aiGraph: AIGraphInternal;
  onEntitySelect: (entity: Entity) => void;
}

interface Recommendation {
  entity: Entity;
  similarity: number;
  reason: string;
  category: 'similar_setup' | 'concept_match' | 'pattern_alignment' | 'outcome_correlation';
  confidenceScore: number;
  relatedEntities: Entity[];
}

interface PatternInsight {
  id: string;
  name: string;
  description: string;
  trades: Entity[];
  avgSimilarity: number;
  winRate: number;
  commonConcepts: string[];
  riskRewardAvg: number;
}

export function RecommendationsView({ entities, relationships, aiGraph, onEntitySelect }: RecommendationsViewProps) {
  const [selectedTrade, setSelectedTrade] = useState<Entity | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [patternInsights, setPatternInsights] = useState<PatternInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'trade' | 'pattern'>('trade');

  const tradeEntities = useMemo(() => entities.filter(e => e.type === 'trade'), [entities]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const conceptEntities = useMemo(() => entities.filter(e => e.type === 'concept'), [entities]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modelEntities = useMemo(() => entities.filter(e => e.type === 'model'), [entities]);

  const generatePatternInsights = useCallback(async () => {
    // Basic pattern analysis based on clustering similar trades
    const clusters = await aiGraph.clusterNodes(0.65);
    const insights: PatternInsight[] = [];
    
    // Process only clusters that contain trades
    for (const [clusterId, nodeIds] of clusters.entries()) {
      const clusterNodes = nodeIds.map(id => entities.find(e => e.id === id)).filter(Boolean) as Entity[];
      const tradesInCluster = clusterNodes.filter(n => n.type === 'trade');
      
      if (tradesInCluster.length >= 2) {
        // Find common concepts
        const conceptCounts = new Map<string, number>();
        
        tradesInCluster.forEach(trade => {
          const related = relationships
            .filter(r => (r.sourceId === trade.id || r.targetId === trade.id) && r.type.includes('CONCEPT'))
            .map(r => r.sourceId === trade.id ? r.targetId : r.sourceId);
            
          related.forEach(id => {
            conceptCounts.set(id, (conceptCounts.get(id) || 0) + 1);
          });
        });
        
        let totalWin = 0;
        let totalRR = 0;
        let validTrades = 0;
        
        tradesInCluster.forEach(t => {
          if (t.metadata?.result === 'draw') return;
          if (t.metadata?.result === 'win') totalWin++;
          if (t.metadata?.rr_ratio) totalRR += t.metadata.rr_ratio;
          validTrades++;
        });
        
        // Find concepts present in at least 50% of trades
        const significantConcepts: string[] = [];
        conceptCounts.forEach((count, id) => {
          if (count >= tradesInCluster.length * 0.5) {
            const concept = entities.find(e => e.id === id);
            if (concept) significantConcepts.push(concept.name);
          }
        });
        
        insights.push({
          id: `pattern-${clusterId}`,
          name: `Pattern Cluster ${clusterId}`,
          description: `Identified from ${tradesInCluster.length} similar trades sharing ${significantConcepts.length} concepts`,
          trades: tradesInCluster,
          avgSimilarity: 0.85, // Mock for now
          winRate: validTrades > 0 ? totalWin / validTrades : 0,
          riskRewardAvg: validTrades > 0 ? totalRR / validTrades : 0,
          commonConcepts: significantConcepts.slice(0, 5)
        });
      }
    }
    
    setPatternInsights(insights.sort((a, b) => b.winRate - a.winRate));
  }, [entities, relationships, aiGraph]);

  useEffect(() => {
    if (tradeEntities.length > 0) {
      generatePatternInsights();
    }
  }, [tradeEntities, generatePatternInsights]);

  const generateRecommendations = async (trade: Entity) => {
    setLoading(true);
    setSelectedTrade(trade);
    
    try {
      const similarTrades = await aiGraph.findSimilarNodes(trade.id, 10, false);
      
      const tradeRelationships = relationships.filter(
        r => r.sourceId === trade.id || r.targetId === trade.id
      );
      
      const connectedConceptIds = tradeRelationships
        .filter(r => r.type === 'TRADE_USES_CONCEPT')
        .map(r => r.targetId);
      
      const connectedConcepts = entities.filter(e => connectedConceptIds.includes(e.id));
      
      const recommendations: Recommendation[] = [];
      
      for (const { node, similarity } of similarTrades) {
        const relatedEntity = entities.find(e => e.id === node.id);
        if (!relatedEntity || relatedEntity.type !== 'trade') continue;
        
        const relatedConceptIds = relationships
          .filter(r => r.sourceId === relatedEntity.id && r.type === 'TRADE_USES_CONCEPT')
          .map(r => r.targetId);
        
        const sharedConcepts = connectedConceptIds.filter(id => relatedConceptIds.includes(id));
        const sharedConceptNames = sharedConcepts
          .map(id => entities.find(e => e.id === id)?.name)
          .filter(Boolean);
        
        const category = determineCategory(similarity, sharedConcepts.length, relatedEntity.metadata);
        const reason = generateReason(category, similarity, sharedConceptNames as string[], relatedEntity);
        
        recommendations.push({
          entity: relatedEntity,
          similarity,
          reason,
          category,
          confidenceScore: similarity * (0.7 + (sharedConcepts.length * 0.1)),
          relatedEntities: connectedConcepts
        });
      }
      
      recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);
      setRecommendations(recommendations.slice(0, 8));
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const determineCategory = (
    similarity: number,
    sharedConceptCount: number,
    metadata: Record<string, unknown>
  ): Recommendation['category'] => {
    if (similarity > 0.8) return 'similar_setup';
    if (sharedConceptCount >= 3) return 'concept_match';
    if ((metadata as any)?.grade && (metadata as any).grade >= 8) return 'outcome_correlation';
    return 'pattern_alignment';
  };

  const generateReason = (
    category: Recommendation['category'],
    similarity: number,
    sharedConcepts: string[],
    entity: Entity
  ): string => {
    const simPercent = (similarity * 100).toFixed(0);
    
    switch (category) {
      case 'similar_setup':
        return `Highly similar trade setup (${simPercent}% match) with comparable market conditions`;
      case 'concept_match':
        return `Shares ${sharedConcepts.length} key concepts: ${sharedConcepts.slice(0, 3).join(', ')}`;
      case 'pattern_alignment':
        return `Similar pattern alignment (${simPercent}% similarity) in execution structure`;
      case 'outcome_correlation':
        return `High-quality setup (Grade ${entity.metadata?.grade || 'A'}) with ${simPercent}% similarity`;
      default:
        return `Related trade with ${simPercent}% similarity`;
    }
  };

  const getCategoryIcon = (category: Recommendation['category']) => {
    switch (category) {
      case 'similar_setup': return <Target size={16} weight="fill" />;
      case 'concept_match': return <Lightbulb size={16} weight="fill" />;
      case 'pattern_alignment': return <ChartLine size={16} weight="fill" />;
      case 'outcome_correlation': return <TrendUp size={16} weight="fill" />;
    }
  };

  const getCategoryColor = (category: Recommendation['category']) => {
    switch (category) {
      case 'similar_setup': return 'bg-primary/10 text-primary border-primary/20';
      case 'concept_match': return 'bg-accent/10 text-accent border-accent/20';
      case 'pattern_alignment': return 'bg-warning/10 text-warning border-warning/20';
      case 'outcome_correlation': return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getOutcomeColor = (metadata: Record<string, unknown>) => {
    const result = (metadata as any)?.result || (metadata as any)?.outcome;
    const pnl = (metadata as any)?.pnl;
    
    if (result === 'win' || result === 'profit' || (pnl && pnl > 0)) {
      return 'text-primary';
    } else if (result === 'loss' || (pnl && pnl < 0)) {
      return 'text-destructive';
    }
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">AI-Powered Recommendations</h2>
        <p className="text-sm text-muted-foreground">
          Discover related trades and patterns using semantic similarity analysis
        </p>
      </div>

      <Tabs value={analysisMode} onValueChange={(v) => setAnalysisMode(v as typeof analysisMode)}>
        <TabsList>
          <TabsTrigger value="trade" className="gap-2">
            <ChartLine size={16} />
            Trade Recommendations
          </TabsTrigger>
          <TabsTrigger value="pattern" className="gap-2">
            <ChartBar size={16} />
            Pattern Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trade" className="space-y-6 mt-6">
          {tradeEntities.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Sparkle size={48} className="text-muted-foreground mb-4" weight="duotone" />
                <p className="text-muted-foreground text-center">
                  No trades available yet. Upload trade data to get personalized recommendations.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target size={20} />
                    Select a Trade
                  </CardTitle>
                  <CardDescription>
                    Choose a trade to find similar setups and discover related patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tradeEntities.slice(0, 12).map((trade) => (
                      <Button
                        key={trade.id}
                        variant={selectedTrade?.id === trade.id ? 'default' : 'outline'}
                        className="justify-start text-left h-auto py-3 px-4"
                        onClick={() => generateRecommendations(trade)}
                      >
                        <div className="flex flex-col items-start gap-1 w-full">
                          <span className="font-medium text-sm truncate w-full">{trade.name}</span>
                          <div className="flex items-center gap-2 text-xs">
                            <span className={getOutcomeColor(trade.metadata)}>
                              {trade.metadata?.result || trade.metadata?.outcome || 'Unknown'}
                            </span>
                            {trade.metadata?.grade && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                Grade {trade.metadata.grade}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {loading ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Sparkle size={48} className="text-primary mb-4 animate-pulse" weight="duotone" />
                    <p className="text-sm text-muted-foreground">Analyzing semantic similarities...</p>
                  </CardContent>
                </Card>
              ) : recommendations.length > 0 && selectedTrade ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">Recommendations for {selectedTrade.name}</h3>
                    <Badge variant="secondary">{recommendations.length} found</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {recommendations.map((rec, index) => (
                      <Card
                        key={rec.entity.id}
                        className="hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => onEntitySelect(rec.entity)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-base mb-1 flex items-center gap-2">
                                <span className="truncate">{rec.entity.name}</span>
                              </CardTitle>
                              <CardDescription className="text-xs">{rec.reason}</CardDescription>
                            </div>
                            <Badge variant="outline" className={`shrink-0 ${getCategoryColor(rec.category)}`}>
                              <span className="flex items-center gap-1">
                                {getCategoryIcon(rec.category)}
                                #{index + 1}
                              </span>
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Similarity Score</span>
                              <span className="font-medium">{(rec.similarity * 100).toFixed(1)}%</span>
                            </div>
                            <Progress value={rec.similarity * 100} className="h-1.5" />
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Confidence</span>
                              <span className="font-medium">{(rec.confidenceScore * 100).toFixed(1)}%</span>
                            </div>
                            <Progress value={rec.confidenceScore * 100} className="h-1.5" />
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${getOutcomeColor(rec.entity.metadata)}`}>
                                {rec.entity.metadata?.result || rec.entity.metadata?.outcome || 'Unknown'}
                              </span>
                              {rec.entity.metadata?.riskReward && (
                                <span className="text-xs text-muted-foreground">
                                  {rec.entity.metadata.riskReward}R
                                </span>
                              )}
                            </div>
                            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
                              View Details
                              <ArrowRight size={14} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : selectedTrade && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-muted-foreground">No similar trades found</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="pattern" className="space-y-6 mt-6">
          {patternInsights.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ChartBar size={48} className="text-muted-foreground mb-4" weight="duotone" />
                <p className="text-muted-foreground text-center">
                  {tradeEntities.length < 3
                    ? 'Need at least 3 trades to identify patterns. Upload more trade data.'
                    : 'Analyzing patterns... This may take a moment.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">Discovered Trading Patterns</h3>
                <Badge variant="secondary">{patternInsights.length} patterns</Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {patternInsights.map((pattern) => (
                  <Card key={pattern.id} className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-base mb-1 flex items-center gap-2">
                            <ChartBar size={18} weight="duotone" className="text-primary" />
                            {pattern.name}
                          </CardTitle>
                          <CardDescription className="text-xs">{pattern.description}</CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            pattern.winRate >= 70
                              ? 'bg-primary/10 text-primary border-primary/20'
                              : pattern.winRate >= 50
                              ? 'bg-accent/10 text-accent border-accent/20'
                              : 'bg-destructive/10 text-destructive border-destructive/20'
                          }
                        >
                          {pattern.winRate.toFixed(0)}% WR
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-xl font-semibold">{pattern.trades.length}</div>
                          <div className="text-xs text-muted-foreground">Trades</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold">
                            {(pattern.avgSimilarity * 100).toFixed(0)}%
                          </div>
                          <div className="text-xs text-muted-foreground">Similarity</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold">
                            {pattern.riskRewardAvg > 0 ? `${pattern.riskRewardAvg.toFixed(1)}R` : 'N/A'}
                          </div>
                          <div className="text-xs text-muted-foreground">Avg R:R</div>
                        </div>
                      </div>

                      {pattern.commonConcepts.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs font-medium text-muted-foreground">Common Concepts</div>
                          <div className="flex flex-wrap gap-1.5">
                            {pattern.commonConcepts.map((concept) => (
                              <Badge key={concept} variant="secondary" className="text-xs">
                                {concept}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => {
                          if (pattern.trades[0]) {
                            setAnalysisMode('trade');
                            generateRecommendations(pattern.trades[0]);
                          }
                        }}
                      >
                        <Sparkle size={16} />
                        Explore Pattern Trades
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
