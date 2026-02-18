import type { Entity, Relationship, RelationshipType, EntityType, ChatMessage } from './types';

export interface AIGraphNode {
  id: string;
  type: EntityType;
  name: string;
  description?: string;
  content?: string;
  embedding?: number[];
  metadata: Record<string, any>;
  tags: string[];
  weight: number;
  connections: string[];
}

export interface AIGraphEdge {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  weight: number;
  metadata?: Record<string, any>;
  flowDirection?: 'forward' | 'backward' | 'bidirectional';
}

export interface LogicFlowStep {
  id: string;
  type: 'condition' | 'action' | 'query' | 'inference' | 'aggregation';
  input: string[];
  output: string;
  operation: string;
  metadata?: Record<string, any>;
}

export interface LogicFlow {
  id: string;
  name: string;
  description: string;
  steps: LogicFlowStep[];
  entryPoint: string;
  exitPoints: string[];
  metadata?: Record<string, any>;
}

export interface ChatSessionCache {
  sessionId: string;
  messages: ChatMessage[];
  context: {
    activeEntities: string[];
    referencedConcepts: Map<string, number>;
    queryHistory: string[];
    conversationTopic?: string;
    inferredIntent?: string;
  };
  graphSnapshot: {
    nodes: AIGraphNode[];
    edges: AIGraphEdge[];
    focusNodes: string[];
  };
  reasoning: {
    lastInference: string;
    confidenceScore: number;
    logicFlow?: LogicFlow;
    enrichmentSources: string[];
  };
  createdAt: string;
  lastUpdatedAt: string;
  expiresAt: string;
}

export interface MarkdownEnrichment {
  sourceFile: string;
  extractedConcepts: string[];
  extractedRelationships: Array<{
    from: string;
    to: string;
    type: RelationshipType;
    context: string;
  }>;
  codeBlocks: Array<{
    language: string;
    content: string;
    metadata?: Record<string, any>;
  }>;
  sections: Array<{
    heading: string;
    level: number;
    content: string;
  }>;
  metadata: {
    wordCount: number;
    conceptDensity: number;
    technicalComplexity: number;
  };
}

export class AIGraphInternal {
  private nodes: Map<string, AIGraphNode>;
  private edges: Map<string, AIGraphEdge>;
  private sessionCache: Map<string, ChatSessionCache>;
  private enrichmentCache: Map<string, MarkdownEnrichment>;
  private logicFlows: Map<string, LogicFlow>;

  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
    this.sessionCache = new Map();
    this.enrichmentCache = new Map();
    this.logicFlows = new Map();
  }

  buildFromEntities(entities: Entity[], relationships: Relationship[]): void {
    this.nodes.clear();
    this.edges.clear();

    entities.forEach(entity => {
      const node: AIGraphNode = {
        id: entity.id,
        type: entity.type,
        name: entity.name,
        description: entity.description,
        content: entity.content,
        metadata: entity.metadata,
        tags: entity.tags,
        weight: this.calculateNodeWeight(entity),
        connections: []
      };
      this.nodes.set(entity.id, node);
    });

    relationships.forEach(rel => {
      const edge: AIGraphEdge = {
        id: rel.id,
        source: rel.sourceId,
        target: rel.targetId,
        type: rel.type,
        weight: this.calculateEdgeWeight(rel),
        metadata: rel.metadata,
        flowDirection: this.determineFlowDirection(rel.type)
      };
      this.edges.set(rel.id, edge);

      const sourceNode = this.nodes.get(rel.sourceId);
      const targetNode = this.nodes.get(rel.targetId);
      if (sourceNode) sourceNode.connections.push(rel.targetId);
      if (targetNode && edge.flowDirection === 'bidirectional') {
        targetNode.connections.push(rel.sourceId);
      }
    });
  }

  enrichFromMarkdown(filepath: string, content: string): MarkdownEnrichment {
    const enrichment: MarkdownEnrichment = {
      sourceFile: filepath,
      extractedConcepts: [],
      extractedRelationships: [],
      codeBlocks: [],
      sections: [],
      metadata: {
        wordCount: 0,
        conceptDensity: 0,
        technicalComplexity: 0
      }
    };

    const lines = content.split('\n');
    let currentSection = '';
    let currentLevel = 0;
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockContent = '';

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          enrichment.codeBlocks.push({
            language: codeBlockLang,
            content: codeBlockContent.trim()
          });
          codeBlockContent = '';
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeBlockLang = trimmed.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent += line + '\n';
        return;
      }

      if (trimmed.startsWith('#')) {
        const level = trimmed.match(/^#+/)?.[0].length || 1;
        const heading = trimmed.replace(/^#+\s*/, '');
        enrichment.sections.push({
          heading,
          level,
          content: currentSection
        });
        currentSection = '';
        currentLevel = level;
      } else {
        currentSection += line + '\n';
      }

      const conceptPatterns = [
        /(?:^|\s)(Fair Value Gap|FVG|Order Block|OB|Breaker Block|BB|Displacement|Imbalance|Liquidity|OTE|BOS|CHoCH|Market Structure|Killzone|PD Array|Silver Bullet|Model \d+|Turtle Soup|Judas Swing)(?:\s|$|,|\.|\))/gi
      ];

      conceptPatterns.forEach(pattern => {
        const matches = trimmed.match(pattern);
        if (matches) {
          matches.forEach(match => {
            const concept = match.trim().replace(/[,.)]/g, '');
            if (!enrichment.extractedConcepts.includes(concept)) {
              enrichment.extractedConcepts.push(concept);
            }
          });
        }
      });

      const relationshipPattern = /(\w+(?:\s+\w+)*)\s+(?:uses?|requires?|depends on|is part of|contains?|produces?|defines?)\s+(\w+(?:\s+\w+)*)/gi;
      const relMatches = trimmed.matchAll(relationshipPattern);
      for (const match of relMatches) {
        enrichment.extractedRelationships.push({
          from: match[1],
          to: match[2],
          type: this.inferRelationshipType(match[0]),
          context: line
        });
      }
    });

    enrichment.metadata.wordCount = content.split(/\s+/).length;
    enrichment.metadata.conceptDensity = enrichment.extractedConcepts.length / Math.max(enrichment.metadata.wordCount, 1) * 100;
    enrichment.metadata.technicalComplexity = this.calculateTechnicalComplexity(enrichment);

    this.enrichmentCache.set(filepath, enrichment);
    return enrichment;
  }

  createOrUpdateSession(sessionId: string, messages: ChatMessage[], entities: Entity[]): ChatSessionCache {
    const existingSession = this.sessionCache.get(sessionId);

    const activeEntities = new Set<string>();
    const referencedConcepts = new Map<string, number>();
    const queryHistory: string[] = [];

    messages.forEach(msg => {
      if (msg.role === 'user') {
        queryHistory.push(msg.content);
      }
      
      if (msg.sources) {
        msg.sources.forEach(source => {
          activeEntities.add(source.id);
          const count = referencedConcepts.get(source.name) || 0;
          referencedConcepts.set(source.name, count + 1);
        });
      }

      entities.forEach(entity => {
        if (msg.content.toLowerCase().includes(entity.name.toLowerCase())) {
          activeEntities.add(entity.id);
        }
      });
    });

    const focusNodes = Array.from(activeEntities).slice(0, 20);
    const graphSnapshot = this.buildSubgraph(focusNodes);

    const conversationTopic = this.inferConversationTopic(messages);
    const inferredIntent = this.inferIntent(messages[messages.length - 1]?.content || '');

    const session: ChatSessionCache = {
      sessionId,
      messages,
      context: {
        activeEntities: Array.from(activeEntities),
        referencedConcepts,
        queryHistory,
        conversationTopic,
        inferredIntent
      },
      graphSnapshot,
      reasoning: {
        lastInference: inferredIntent,
        confidenceScore: this.calculateConfidence(messages),
        enrichmentSources: Array.from(this.enrichmentCache.keys()),
        logicFlow: existingSession?.reasoning?.logicFlow
      },
      createdAt: existingSession?.createdAt || new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    this.sessionCache.set(sessionId, session);
    return session;
  }

  buildLogicFlow(query: string, context: ChatSessionCache): LogicFlow {
    const flowId = `flow-${Date.now()}`;
    const steps: LogicFlowStep[] = [];

    const intent = context.reasoning.inferredIntent || '';

    if (intent.includes('filter') || intent.includes('search')) {
      steps.push({
        id: `${flowId}-step-1`,
        type: 'query',
        input: ['entities', 'query'],
        output: 'filtered_entities',
        operation: 'filter_by_criteria'
      });

      steps.push({
        id: `${flowId}-step-2`,
        type: 'aggregation',
        input: ['filtered_entities'],
        output: 'results',
        operation: 'sort_and_rank'
      });
    } else if (intent.includes('define') || intent.includes('explain')) {
      steps.push({
        id: `${flowId}-step-1`,
        type: 'query',
        input: ['knowledge_base', 'concept_name'],
        output: 'concept_entity',
        operation: 'lookup_concept'
      });

      steps.push({
        id: `${flowId}-step-2`,
        type: 'query',
        input: ['concept_entity', 'relationships'],
        output: 'related_entities',
        operation: 'find_relationships'
      });

      steps.push({
        id: `${flowId}-step-3`,
        type: 'inference',
        input: ['concept_entity', 'related_entities'],
        output: 'explanation',
        operation: 'synthesize_explanation'
      });
    } else if (intent.includes('analyze') || intent.includes('compare')) {
      steps.push({
        id: `${flowId}-step-1`,
        type: 'query',
        input: ['entities', 'criteria'],
        output: 'target_entities',
        operation: 'multi_entity_lookup'
      });

      steps.push({
        id: `${flowId}-step-2`,
        type: 'aggregation',
        input: ['target_entities'],
        output: 'metrics',
        operation: 'calculate_statistics'
      });

      steps.push({
        id: `${flowId}-step-3`,
        type: 'inference',
        input: ['metrics', 'target_entities'],
        output: 'analysis',
        operation: 'generate_insights'
      });
    } else {
      steps.push({
        id: `${flowId}-step-1`,
        type: 'query',
        input: ['knowledge_base', 'query'],
        output: 'relevant_entities',
        operation: 'semantic_search'
      });

      steps.push({
        id: `${flowId}-step-2`,
        type: 'inference',
        input: ['relevant_entities', 'context'],
        output: 'answer',
        operation: 'generate_response'
      });
    }

    const flow: LogicFlow = {
      id: flowId,
      name: `Flow for: ${query.slice(0, 50)}`,
      description: `Logic flow for ${intent}`,
      steps,
      entryPoint: steps[0]?.id || '',
      exitPoints: [steps[steps.length - 1]?.id || ''],
      metadata: {
        intent,
        createdAt: new Date().toISOString()
      }
    };

    this.logicFlows.set(flowId, flow);
    return flow;
  }

  getSession(sessionId: string): ChatSessionCache | undefined {
    const session = this.sessionCache.get(sessionId);
    if (!session) return undefined;

    if (new Date(session.expiresAt) < new Date()) {
      this.sessionCache.delete(sessionId);
      return undefined;
    }

    return session;
  }

  getEnrichment(filepath: string): MarkdownEnrichment | undefined {
    return this.enrichmentCache.get(filepath);
  }

  getLogicFlow(flowId: string): LogicFlow | undefined {
    return this.logicFlows.get(flowId);
  }

  private buildSubgraph(focusNodeIds: string[]): ChatSessionCache['graphSnapshot'] {
    const nodes: AIGraphNode[] = [];
    const edges: AIGraphEdge[] = [];
    const included = new Set<string>(focusNodeIds);

    focusNodeIds.forEach(nodeId => {
      const node = this.nodes.get(nodeId);
      if (node) {
        nodes.push(node);
        
        node.connections.forEach(connId => {
          if (!included.has(connId)) {
            const connNode = this.nodes.get(connId);
            if (connNode) {
              nodes.push(connNode);
              included.add(connId);
            }
          }
        });
      }
    });

    this.edges.forEach(edge => {
      if (included.has(edge.source) && included.has(edge.target)) {
        edges.push(edge);
      }
    });

    return { nodes, edges, focusNodes: focusNodeIds };
  }

  private calculateNodeWeight(entity: Entity): number {
    let weight = 1.0;
    
    if (entity.type === 'concept') weight += 2.0;
    if (entity.type === 'model') weight += 1.5;
    if (entity.type === 'trade') weight += 0.5;
    
    weight += entity.tags.length * 0.1;
    weight += entity.sources.length * 0.2;
    
    return weight;
  }

  private calculateEdgeWeight(relationship: Relationship): number {
    let weight = 1.0;
    
    const typeWeights: Record<string, number> = {
      'CONCEPT_USED_IN_MODEL': 2.0,
      'MODEL_PRODUCES_TRADE': 1.5,
      'CONCEPT_RELATED_TO': 1.2,
      'TRADE_USES_CONCEPT': 1.0,
      'CONCEPT_PREREQUISITE': 2.5
    };
    
    weight = typeWeights[relationship.type] || 1.0;
    
    return weight;
  }

  private determineFlowDirection(type: RelationshipType): 'forward' | 'backward' | 'bidirectional' {
    const bidirectional: RelationshipType[] = ['CONCEPT_RELATED_TO'];
    const backward: RelationshipType[] = ['CONCEPT_DETECTED_BY'];
    
    if (bidirectional.includes(type)) return 'bidirectional';
    if (backward.includes(type)) return 'backward';
    return 'forward';
  }

  private inferRelationshipType(text: string): RelationshipType {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('uses') || lowerText.includes('contains')) {
      return 'CONCEPT_USED_IN_MODEL';
    }
    if (lowerText.includes('defines')) {
      return 'DOCUMENT_DEFINES';
    }
    if (lowerText.includes('requires') || lowerText.includes('depends')) {
      return 'CONCEPT_PREREQUISITE';
    }
    if (lowerText.includes('produces')) {
      return 'MODEL_PRODUCES_TRADE';
    }
    
    return 'CONCEPT_RELATED_TO';
  }

  private calculateTechnicalComplexity(enrichment: MarkdownEnrichment): number {
    let complexity = 0;
    
    complexity += enrichment.extractedConcepts.length * 2;
    complexity += enrichment.codeBlocks.length * 5;
    complexity += enrichment.extractedRelationships.length * 3;
    complexity += enrichment.sections.filter(s => s.level <= 2).length * 1;
    
    return Math.min(complexity, 100);
  }

  private inferConversationTopic(messages: ChatMessage[]): string {
    const allContent = messages.map(m => m.content).join(' ').toLowerCase();
    
    const topics = {
      'concepts': ['concept', 'define', 'definition', 'what is', 'explain'],
      'trading': ['trade', 'entry', 'exit', 'setup', 'execution', 'killzone'],
      'models': ['model', 'silver bullet', 'turtle soup', 'judas'],
      'analysis': ['analyze', 'compare', 'statistics', 'win rate', 'performance'],
      'patterns': ['pattern', 'confluence', 'pd array', 'displacement']
    };
    
    let maxScore = 0;
    let detectedTopic = 'general';
    
    Object.entries(topics).forEach(([topic, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (allContent.match(new RegExp(keyword, 'g'))?.length || 0);
      }, 0);
      
      if (score > maxScore) {
        maxScore = score;
        detectedTopic = topic;
      }
    });
    
    return detectedTopic;
  }

  private inferIntent(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.match(/define|what is|explain|describe/)) {
      return 'define_concept';
    }
    if (lowerQuery.match(/filter|show|list|find|search/)) {
      return 'filter_data';
    }
    if (lowerQuery.match(/analyze|compare|statistics|win rate|performance/)) {
      return 'analyze_data';
    }
    if (lowerQuery.match(/how|why|when|where/)) {
      return 'explain_mechanism';
    }
    if (lowerQuery.match(/relationship|connection|link|related/)) {
      return 'explore_relationships';
    }
    
    return 'general_query';
  }

  private calculateConfidence(messages: ChatMessage[]): number {
    if (messages.length === 0) return 0.5;
    
    let confidence = 0.5;
    
    const recentMessages = messages.slice(-5);
    const messagesWithSources = recentMessages.filter(m => m.sources && m.sources.length > 0);
    confidence += (messagesWithSources.length / recentMessages.length) * 0.3;
    
    if (messages.length > 3) confidence += 0.1;
    if (messages.length > 10) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  clearExpiredSessions(): number {
    const now = new Date();
    let cleared = 0;
    
    this.sessionCache.forEach((session, sessionId) => {
      if (new Date(session.expiresAt) < now) {
        this.sessionCache.delete(sessionId);
        cleared++;
      }
    });
    
    return cleared;
  }

  exportSessionCache(sessionId: string): string {
    const session = this.sessionCache.get(sessionId);
    if (!session) return '{}';
    
    return JSON.stringify({
      ...session,
      context: {
        ...session.context,
        referencedConcepts: Array.from(session.context.referencedConcepts.entries())
      }
    }, null, 2);
  }

  importSessionCache(sessionData: string): boolean {
    try {
      const parsed = JSON.parse(sessionData);
      parsed.context.referencedConcepts = new Map(parsed.context.referencedConcepts);
      this.sessionCache.set(parsed.sessionId, parsed);
      return true;
    } catch {
      return false;
    }
  }
}

export const createAIGraphInternal = (): AIGraphInternal => {
  return new AIGraphInternal();
};
