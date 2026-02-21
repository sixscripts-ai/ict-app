import type { Entity, Relationship, RelationshipType, EntityType } from './types';
import type { AIGraphInternal } from './schema';

export type SkillCategory = 
  | 'analysis'
  | 'extraction'
  | 'validation'
  | 'relationship'
  | 'query'
  | 'learning'
  | 'recommendation';

export type SkillComplexity = 'basic' | 'intermediate' | 'advanced' | 'expert';

export interface SkillParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: unknown;
}

export interface SkillResult {
  success: boolean;
  data: unknown;
  confidence: number;
  sources: Entity[];
  reasoning: string;
  warnings?: string[];
  suggestedFollowUp?: string[];
}

export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  complexity: SkillComplexity;
  parameters: SkillParameter[];
  requiredEntities: EntityType[];
  outputFormat: string;
  examples: string[];
  execute: (params: Record<string, unknown>, context: SkillExecutionContext) => Promise<SkillResult>;
}

export interface SkillExecutionContext {
  entities: Entity[];
  relationships: Relationship[];
  aiGraph: AIGraphInternal;
  sessionId?: string;
  userPreferences?: Record<string, unknown>;
}

export interface SkillChain {
  id: string;
  name: string;
  description: string;
  skills: string[];
  dataFlow: Array<{
    from: string;
    to: string;
    mapping: Record<string, string>;
  }>;
}

export class AgentSkillRegistry {
  private skills: Map<string, AgentSkill>;
  private chains: Map<string, SkillChain>;
  private executionHistory: Array<{
    skillId: string;
    timestamp: string;
    duration: number;
    success: boolean;
    confidence: number;
  }>;

  constructor() {
    this.skills = new Map();
    this.chains = new Map();
    this.executionHistory = [];
    this.registerDefaultSkills();
  }

  private registerDefaultSkills(): void {
    this.registerSkill(createConceptDefinitionSkill());
    this.registerSkill(createTradeFilterSkill());
    this.registerSkill(createModelAnalysisSkill());
    this.registerSkill(createConfluenceDetectionSkill());
    this.registerSkill(createPatternRecognitionSkill());
    this.registerSkill(createSetupGradeAnalysisSkill());
    this.registerSkill(createConceptRelationshipMapSkill());
    this.registerSkill(createTradeStatisticsSkill());
    this.registerSkill(createKillzoneAnalysisSkill());
    this.registerSkill(createRiskRewardAnalysisSkill());
    this.registerSkill(createConceptUsageAnalysisSkill());
    this.registerSkill(createFailureAnalysisSkill());
    this.registerSkill(createTimeframeCorrelationSkill());
    this.registerSkill(createLiquidityProfileSkill());
    this.registerSkill(createDisplacementDetectionSkill());
    this.registerSkill(createRecommendationEngineSkill());
  }

  registerSkill(skill: AgentSkill): void {
    this.skills.set(skill.id, skill);
  }

  registerChain(chain: SkillChain): void {
    this.chains.set(chain.id, chain);
  }

  async executeSkill(
    skillId: string,
    params: Record<string, unknown>,
    context: SkillExecutionContext
  ): Promise<SkillResult> {
    const skill = this.skills.get(skillId);
    if (!skill) {
      throw new Error(`Skill not found: ${skillId}`);
    }

    const startTime = Date.now();
    try {
      const result = await skill.execute(params, context);
      const duration = Date.now() - startTime;

      this.executionHistory.push({
        skillId,
        timestamp: new Date().toISOString(),
        duration,
        success: result.success,
        confidence: result.confidence,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.executionHistory.push({
        skillId,
        timestamp: new Date().toISOString(),
        duration,
        success: false,
        confidence: 0,
      });
      throw error;
    }
  }

  async executeChain(
    chainId: string,
    initialParams: Record<string, unknown>,
    context: SkillExecutionContext
  ): Promise<SkillResult[]> {
    const chain = this.chains.get(chainId);
    if (!chain) {
      throw new Error(`Skill chain not found: ${chainId}`);
    }

    const results: SkillResult[] = [];
    const currentParams = { ...initialParams };

    for (let i = 0; i < chain.skills.length; i++) {
      const skillId = chain.skills[i];
      const result = await this.executeSkill(skillId, currentParams, context);
      results.push(result);

      if (!result.success) {
        break;
      }

      if (i < chain.skills.length - 1) {
        const dataFlow = chain.dataFlow.find(
          df => df.from === skillId && df.to === chain.skills[i + 1]
        );
        if (dataFlow) {
          for (const [from, to] of Object.entries(dataFlow.mapping)) {
            currentParams[to] = result.data[from];
          }
        }
      }
    }

    return results;
  }

  getSkill(skillId: string): AgentSkill | undefined {
    return this.skills.get(skillId);
  }

  listSkills(category?: SkillCategory): AgentSkill[] {
    const allSkills = Array.from(this.skills.values());
    return category
      ? allSkills.filter(skill => skill.category === category)
      : allSkills;
  }

  getExecutionStats(): {
    totalExecutions: number;
    successRate: number;
    averageConfidence: number;
    averageDuration: number;
    skillUsage: Record<string, number>;
  } {
    const total = this.executionHistory.length;
    const successful = this.executionHistory.filter(e => e.success).length;
    const avgConfidence =
      this.executionHistory.reduce((sum, e) => sum + e.confidence, 0) / total || 0;
    const avgDuration =
      this.executionHistory.reduce((sum, e) => sum + e.duration, 0) / total || 0;

    const usage: Record<string, number> = {};
    for (const exec of this.executionHistory) {
      usage[exec.skillId] = (usage[exec.skillId] || 0) + 1;
    }

    return {
      totalExecutions: total,
      successRate: total > 0 ? successful / total : 0,
      averageConfidence: avgConfidence,
      averageDuration: avgDuration,
      skillUsage: usage,
    };
  }
}

function createConceptDefinitionSkill(): AgentSkill {
  return {
    id: 'concept-definition',
    name: 'Define ICT Concept',
    description: 'Retrieve detailed definition of an ICT concept with bearish/bullish context, detection rules, and related concepts',
    category: 'query',
    complexity: 'basic',
    parameters: [
      {
        name: 'conceptName',
        type: 'string',
        required: true,
        description: 'Name of the ICT concept (e.g., "Fair Value Gap", "Order Block")',
      },
      {
        name: 'includeExamples',
        type: 'boolean',
        required: false,
        description: 'Include trade examples that used this concept',
        defaultValue: true,
      },
    ],
    requiredEntities: ['concept'],
    outputFormat: 'Structured concept definition with related entities',
    examples: [
      'Define Fair Value Gap with bearish/bullish displacement examples',
      'What is an Order Block and how is it detected?',
      'Explain Displacement in ICT methodology',
    ],
    execute: async (params, context) => {
      const conceptName = params.conceptName.toLowerCase();
      const concept = context.entities.find(
        e => e.type === 'concept' && e.name.toLowerCase().includes(conceptName)
      );

      if (!concept) {
        return {
          success: false,
          data: null,
          confidence: 0,
          sources: [],
          reasoning: `Concept "${params.conceptName}" not found in knowledge base`,
          warnings: ['Concept not found. Available concepts can be viewed in the Explorer.'],
        };
      }

      const relatedConcepts = context.relationships
        .filter(r => r.type === 'CONCEPT_RELATED_TO' && (r.sourceId === concept.id || r.targetId === concept.id))
        .map(r => {
          const relatedId = r.sourceId === concept.id ? r.targetId : r.sourceId;
          return context.entities.find(e => e.id === relatedId);
        })
        .filter((e): e is Entity => e !== undefined);

      const usedInModels = context.relationships
        .filter(r => r.type === 'CONCEPT_USED_IN_MODEL' && r.sourceId === concept.id)
        .map(r => context.entities.find(e => e.id === r.targetId))
        .filter((e): e is Entity => e !== undefined);

      const detectedBy = context.relationships
        .filter(r => r.type === 'CONCEPT_DETECTED_BY' && r.sourceId === concept.id)
        .map(r => context.entities.find(e => e.id === r.targetId))
        .filter((e): e is Entity => e !== undefined);

      const tradeExamples = params.includeExamples
        ? context.relationships
            .filter(r => r.type === 'TRADE_USES_CONCEPT' && r.targetId === concept.id)
            .map(r => context.entities.find(e => e.id === r.sourceId))
            .filter((e): e is Entity => e !== undefined)
            .slice(0, 5)
        : [];

      return {
        success: true,
        data: {
          concept,
          relatedConcepts,
          usedInModels,
          detectedBy,
          tradeExamples,
          statistics: {
            totalRelated: relatedConcepts.length,
            usedInModelsCount: usedInModels.length,
            tradeUsageCount: tradeExamples.length,
          },
        },
        confidence: 1.0,
        sources: [concept, ...relatedConcepts, ...usedInModels],
        reasoning: `Found concept "${concept.name}" with ${relatedConcepts.length} related concepts and usage in ${usedInModels.length} models`,
        suggestedFollowUp: [
          `Show me trades using ${concept.name}`,
          `What models use ${concept.name}?`,
          ...relatedConcepts.slice(0, 2).map(rc => `Tell me about ${rc.name}`),
        ],
      };
    },
  };
}

function createTradeFilterSkill(): AgentSkill {
  return {
    id: 'trade-filter',
    name: 'Filter Trades by Criteria',
    description: 'Query trades with specific setup criteria, risk/reward ratios, confluences, and outcomes',
    category: 'query',
    complexity: 'intermediate',
    parameters: [
      {
        name: 'concepts',
        type: 'string[]',
        required: false,
        description: 'Required concepts (e.g., ["Order Block", "Fair Value Gap"])',
      },
      {
        name: 'minRiskReward',
        type: 'number',
        required: false,
        description: 'Minimum risk/reward ratio',
      },
      {
        name: 'outcome',
        type: 'string',
        required: false,
        description: 'Trade outcome: "win", "loss", or "breakeven"',
      },
      {
        name: 'session',
        type: 'string',
        required: false,
        description: 'Trading session: "LON", "NY", "ASI"',
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: 'ICT model used (e.g., "Silver Bullet")',
      },
      {
        name: 'minGrade',
        type: 'number',
        required: false,
        description: 'Minimum setup quality grade (1-10)',
      },
    ],
    requiredEntities: ['trade'],
    outputFormat: 'Filtered list of trades with statistics',
    examples: [
      'Filter trades: OB + FVG confluence resulting in >2R returns',
      'Show me all Silver Bullet trades in the NY session',
      'List trades with A+ grade (9-10) that resulted in losses',
    ],
    execute: async (params, context) => {
      let filteredTrades = context.entities.filter(e => e.type === 'trade');

      if (params.concepts && params.concepts.length > 0) {
        filteredTrades = filteredTrades.filter(trade => {
          const tradeConcepts = context.relationships
            .filter(r => r.type === 'TRADE_USES_CONCEPT' && r.sourceId === trade.id)
            .map(r => context.entities.find(e => e.id === r.targetId))
            .filter((e): e is Entity => e !== undefined);

          return params.concepts.every((reqConcept: string) =>
            tradeConcepts.some(tc => tc.name.toLowerCase().includes(reqConcept.toLowerCase()))
          );
        });
      }

      if (params.minRiskReward) {
        filteredTrades = filteredTrades.filter(trade => {
          const rr = trade.metadata?.riskReward || trade.metadata?.risk_reward;
          return rr && rr >= params.minRiskReward;
        });
      }

      if (params.outcome) {
        filteredTrades = filteredTrades.filter(trade => {
          const result = trade.metadata?.result?.toLowerCase();
          return result === params.outcome.toLowerCase();
        });
      }

      if (params.session) {
        filteredTrades = filteredTrades.filter(trade => {
          const session = trade.metadata?.session || trade.metadata?.killzone;
          return session && session.toLowerCase().includes(params.session.toLowerCase());
        });
      }

      if (params.model) {
        filteredTrades = filteredTrades.filter(trade => {
          const tradeModels = context.relationships
            .filter(r => r.type === 'MODEL_PRODUCES_TRADE' && r.targetId === trade.id)
            .map(r => context.entities.find(e => e.id === r.sourceId))
            .filter((e): e is Entity => e !== undefined);

          return tradeModels.some(m => m.name.toLowerCase().includes(params.model.toLowerCase()));
        });
      }

      if (params.minGrade) {
        filteredTrades = filteredTrades.filter(trade => {
          const grade = trade.metadata?.grade || trade.metadata?.setup_grade;
          return grade && grade >= params.minGrade;
        });
      }

      const wins = filteredTrades.filter(t => t.metadata?.result?.toLowerCase() === 'win').length;
      const losses = filteredTrades.filter(t => t.metadata?.result?.toLowerCase() === 'loss').length;
      const avgRR =
        filteredTrades.reduce((sum, t) => sum + (t.metadata?.riskReward || t.metadata?.risk_reward || 0), 0) /
        filteredTrades.length;

      return {
        success: true,
        data: {
          trades: filteredTrades,
          count: filteredTrades.length,
          statistics: {
            totalTrades: filteredTrades.length,
            wins,
            losses,
            winRate: filteredTrades.length > 0 ? wins / filteredTrades.length : 0,
            averageRR: avgRR || 0,
          },
        },
        confidence: 0.95,
        sources: filteredTrades.slice(0, 10),
        reasoning: `Filtered ${context.entities.filter(e => e.type === 'trade').length} trades down to ${filteredTrades.length} matching criteria`,
        suggestedFollowUp: [
          'Analyze the failure patterns in these trades',
          'What concepts appear most frequently in winning trades?',
          'Compare these results to overall database statistics',
        ],
      };
    },
  };
}

function createModelAnalysisSkill(): AgentSkill {
  return {
    id: 'model-analysis',
    name: 'Analyze ICT Model',
    description: 'Retrieve model definition, entry criteria, time windows, required confluences, and historical performance',
    category: 'analysis',
    complexity: 'intermediate',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        required: true,
        description: 'Name of the ICT model (e.g., "Silver Bullet", "Turtle Soup")',
      },
      {
        name: 'includePerformance',
        type: 'boolean',
        required: false,
        description: 'Include performance statistics from historical trades',
        defaultValue: true,
      },
    ],
    requiredEntities: ['model'],
    outputFormat: 'Model definition with performance metrics',
    examples: [
      'List the entry criteria and time windows for the Silver Bullet setup',
      'Analyze the Turtle Soup model performance',
      'What confluences are required for Model 12?',
    ],
    execute: async (params, context) => {
      const modelName = params.modelName.toLowerCase();
      const model = context.entities.find(
        e => e.type === 'model' && e.name.toLowerCase().includes(modelName)
      );

      if (!model) {
        return {
          success: false,
          data: null,
          confidence: 0,
          sources: [],
          reasoning: `Model "${params.modelName}" not found in knowledge base`,
          warnings: ['Model not found. Available models can be viewed in the Explorer.'],
        };
      }

      const requiredConcepts = context.relationships
        .filter(r => r.type === 'CONCEPT_USED_IN_MODEL' && r.targetId === model.id)
        .map(r => context.entities.find(e => e.id === r.sourceId))
        .filter((e): e is Entity => e !== undefined);

      const historicalTrades = context.relationships
        .filter(r => r.type === 'MODEL_PRODUCES_TRADE' && r.sourceId === model.id)
        .map(r => context.entities.find(e => e.id === r.targetId))
        .filter((e): e is Entity => e !== undefined);

      const performance = params.includePerformance
        ? {
            totalTrades: historicalTrades.length,
            wins: historicalTrades.filter(t => t.metadata?.result?.toLowerCase() === 'win').length,
            losses: historicalTrades.filter(t => t.metadata?.result?.toLowerCase() === 'loss').length,
            averageRR:
              historicalTrades.reduce((sum, t) => sum + (t.metadata?.riskReward || 0), 0) /
                historicalTrades.length || 0,
            averageGrade:
              historicalTrades.reduce((sum, t) => sum + (t.metadata?.grade || 0), 0) /
                historicalTrades.length || 0,
          }
        : null;

      return {
        success: true,
        data: {
          model,
          requiredConcepts,
          historicalTrades: historicalTrades.slice(0, 10),
          performance,
        },
        confidence: 1.0,
        sources: [model, ...requiredConcepts, ...historicalTrades.slice(0, 5)],
        reasoning: `Found model "${model.name}" with ${requiredConcepts.length} required concepts and ${historicalTrades.length} historical trades`,
        suggestedFollowUp: [
          `Show me the best ${model.name} trades`,
          `What makes a high-quality ${model.name} setup?`,
          'Compare this model to other models in the database',
        ],
      };
    },
  };
}

function createConfluenceDetectionSkill(): AgentSkill {
  return {
    id: 'confluence-detection',
    name: 'Detect Confluence Patterns',
    description: 'Identify trades with specific concept confluences and analyze their success rates',
    category: 'analysis',
    complexity: 'advanced',
    parameters: [
      {
        name: 'requiredConcepts',
        type: 'string[]',
        required: true,
        description: 'Concepts that must all be present',
      },
      {
        name: 'minConfluenceCount',
        type: 'number',
        required: false,
        description: 'Minimum number of concepts present',
        defaultValue: 2,
      },
    ],
    requiredEntities: ['trade', 'concept'],
    outputFormat: 'Confluence analysis with success metrics',
    examples: [
      'Find all OB + FVG + OTE confluences',
      'Which 3-concept confluences have the highest win rate?',
      'Analyze displacement + liquidity sweep combinations',
    ],
    execute: async (params, context) => {
      const trades = context.entities.filter(e => e.type === 'trade');
      
      const confluenceTrades = trades.map(trade => {
        const concepts = context.relationships
          .filter(r => r.type === 'TRADE_USES_CONCEPT' && r.sourceId === trade.id)
          .map(r => context.entities.find(e => e.id === r.targetId))
          .filter((e): e is Entity => e !== undefined);

        const hasRequired = params.requiredConcepts.every((reqConcept: string) =>
          concepts.some(c => c.name.toLowerCase().includes(reqConcept.toLowerCase()))
        );

        return {
          trade,
          concepts,
          confluenceCount: concepts.length,
          hasRequired,
        };
      }).filter(tc => tc.hasRequired && tc.confluenceCount >= (params.minConfluenceCount || 2));

      const wins = confluenceTrades.filter(tc => tc.trade.metadata?.result?.toLowerCase() === 'win').length;
      const total = confluenceTrades.length;

      return {
        success: true,
        data: {
          trades: confluenceTrades.map(tc => tc.trade),
          confluencePatterns: confluenceTrades.map(tc => ({
            tradeId: tc.trade.id,
            tradeName: tc.trade.name,
            concepts: tc.concepts.map(c => c.name),
            result: tc.trade.metadata?.result,
            rr: tc.trade.metadata?.riskReward,
          })),
          statistics: {
            totalMatches: total,
            wins,
            losses: total - wins,
            winRate: total > 0 ? wins / total : 0,
          },
        },
        confidence: 0.9,
        sources: confluenceTrades.map(tc => tc.trade).slice(0, 10),
        reasoning: `Found ${total} trades with required confluence: ${params.requiredConcepts.join(' + ')}`,
        suggestedFollowUp: [
          'What time sessions were these trades in?',
          'Compare to trades without this confluence',
          'Analyze failure reasons for losing confluence trades',
        ],
      };
    },
  };
}

function createPatternRecognitionSkill(): AgentSkill {
  return {
    id: 'pattern-recognition',
    name: 'Recognize Trading Patterns',
    description: 'Discover recurring patterns in successful or failed trades using AI pattern analysis',
    category: 'learning',
    complexity: 'expert',
    parameters: [
      {
        name: 'focusOn',
        type: 'string',
        required: false,
        description: 'Focus on "wins", "losses", or "all"',
        defaultValue: 'wins',
      },
      {
        name: 'minOccurrences',
        type: 'number',
        required: false,
        description: 'Minimum times pattern must appear',
        defaultValue: 3,
      },
    ],
    requiredEntities: ['trade'],
    outputFormat: 'Discovered patterns with occurrence frequency',
    examples: [
      'What patterns appear in my winning trades?',
      'Identify common failure patterns',
      'Discover setup patterns with 80%+ win rate',
    ],
    execute: async (params, context) => {
      let targetTrades = context.entities.filter(e => e.type === 'trade');

      if (params.focusOn === 'wins') {
        targetTrades = targetTrades.filter(t => t.metadata?.result?.toLowerCase() === 'win');
      } else if (params.focusOn === 'losses') {
        targetTrades = targetTrades.filter(t => t.metadata?.result?.toLowerCase() === 'loss');
      }

      const patterns = new Map<string, { trades: Entity[]; frequency: number }>();

      for (const trade of targetTrades) {
        const concepts = context.relationships
          .filter(r => r.type === 'TRADE_USES_CONCEPT' && r.sourceId === trade.id)
          .map(r => context.entities.find(e => e.id === r.targetId))
          .filter((e): e is Entity => e !== undefined)
          .map(c => c.name)
          .sort()
          .join(' + ');

        if (concepts) {
          const existing = patterns.get(concepts);
          if (existing) {
            existing.trades.push(trade);
            existing.frequency++;
          } else {
            patterns.set(concepts, { trades: [trade], frequency: 1 });
          }
        }
      }

      const significantPatterns = Array.from(patterns.entries())
        .filter(([_, data]) => data.frequency >= (params.minOccurrences || 3))
        .sort((a, b) => b[1].frequency - a[1].frequency)
        .map(([pattern, data]) => ({
          pattern,
          frequency: data.frequency,
          trades: data.trades,
          avgRR: data.trades.reduce((sum, t) => sum + (t.metadata?.riskReward || 0), 0) / data.trades.length,
          avgGrade: data.trades.reduce((sum, t) => sum + (t.metadata?.grade || 0), 0) / data.trades.length,
        }));

      return {
        success: true,
        data: {
          patterns: significantPatterns,
          totalPatterns: significantPatterns.length,
          mostFrequent: significantPatterns[0],
        },
        confidence: 0.85,
        sources: significantPatterns.flatMap(p => p.trades).slice(0, 10),
        reasoning: `Analyzed ${targetTrades.length} ${params.focusOn} trades and found ${significantPatterns.length} recurring patterns`,
        suggestedFollowUp: [
          'Analyze the highest performing pattern in detail',
          'Compare winning patterns to losing patterns',
          'What time sessions do these patterns occur in?',
        ],
      };
    },
  };
}

function createSetupGradeAnalysisSkill(): AgentSkill {
  return {
    id: 'setup-grade-analysis',
    name: 'Analyze Setup Quality Grades',
    description: 'Analyze trades by quality grade (A+, A, B, C) and correlate with outcomes',
    category: 'analysis',
    complexity: 'intermediate',
    parameters: [
      {
        name: 'minGrade',
        type: 'number',
        required: false,
        description: 'Minimum grade (1-10 scale)',
      },
      {
        name: 'gradeCategory',
        type: 'string',
        required: false,
        description: 'Grade category: "A+", "A", "B", "C"',
      },
    ],
    requiredEntities: ['trade'],
    outputFormat: 'Grade analysis with performance correlation',
    examples: [
      'Show me high-probability A+ Setups from my training data',
      'What is the win rate for B-grade setups?',
      'Compare outcomes across all quality grades',
    ],
    execute: async (params, context) => {
      const trades = context.entities.filter(e => e.type === 'trade');

      const gradeMap: Record<string, { min: number; max: number }> = {
        'A+': { min: 9, max: 10 },
        A: { min: 7, max: 8 },
        B: { min: 5, max: 6 },
        C: { min: 1, max: 4 },
      };

      let filteredTrades = trades;

      if (params.minGrade) {
        filteredTrades = filteredTrades.filter(t => (t.metadata?.grade || 0) >= params.minGrade);
      }

      if (params.gradeCategory) {
        const range = gradeMap[params.gradeCategory];
        if (range) {
          filteredTrades = filteredTrades.filter(
            t => (t.metadata?.grade || 0) >= range.min && (t.metadata?.grade || 0) <= range.max
          );
        }
      }

      const byGrade: Record<string, { trades: Entity[]; wins: number; total: number }> = {};

      for (const [category, range] of Object.entries(gradeMap)) {
        const gradeTrades = trades.filter(
          t => (t.metadata?.grade || 0) >= range.min && (t.metadata?.grade || 0) <= range.max
        );
        byGrade[category] = {
          trades: gradeTrades,
          wins: gradeTrades.filter(t => t.metadata?.result?.toLowerCase() === 'win').length,
          total: gradeTrades.length,
        };
      }

      return {
        success: true,
        data: {
          filteredTrades,
          byGrade,
          statistics: Object.entries(byGrade).map(([grade, data]) => ({
            grade,
            count: data.total,
            winRate: data.total > 0 ? data.wins / data.total : 0,
          })),
        },
        confidence: 0.95,
        sources: filteredTrades.slice(0, 10),
        reasoning: `Analyzed ${trades.length} trades across quality grades, filtered to ${filteredTrades.length} matching criteria`,
        suggestedFollowUp: [
          'What concepts appear most in A+ setups?',
          'Show me failed A+ setups for analysis',
          'Compare time sessions across grades',
        ],
      };
    },
  };
}

function createConceptRelationshipMapSkill(): AgentSkill {
  return {
    id: 'concept-relationship-map',
    name: 'Map Concept Relationships',
    description: 'Build a relationship map showing how concepts connect and depend on each other',
    category: 'relationship',
    complexity: 'intermediate',
    parameters: [
      {
        name: 'rootConcept',
        type: 'string',
        required: false,
        description: 'Start from a specific concept',
      },
      {
        name: 'depth',
        type: 'number',
        required: false,
        description: 'Relationship depth to explore',
        defaultValue: 2,
      },
    ],
    requiredEntities: ['concept'],
    outputFormat: 'Concept relationship graph',
    examples: [
      'Show me all concepts related to Fair Value Gap',
      'Map the prerequisite chain for Order Block',
      'What concepts are closely connected to Displacement?',
    ],
    execute: async (params, context) => {
      const concepts = context.entities.filter(e => e.type === 'concept');
      let rootConcepts: Entity[] = concepts;

      if (params.rootConcept) {
        const root = concepts.find(c => c.name.toLowerCase().includes(params.rootConcept.toLowerCase()));
        if (root) {
          rootConcepts = [root];
        }
      }

      const visited = new Set<string>();
      const relationshipMap: Array<{
        from: Entity;
        to: Entity;
        type: RelationshipType;
        depth: number;
      }> = [];

      const explore = (conceptId: string, currentDepth: number) => {
        if (currentDepth > (params.depth || 2) || visited.has(conceptId)) return;
        visited.add(conceptId);

        const relationships = context.relationships.filter(
          r =>
            (r.sourceId === conceptId || r.targetId === conceptId) &&
            (r.type === 'CONCEPT_RELATED_TO' || r.type === 'CONCEPT_PREREQUISITE')
        );

        for (const rel of relationships) {
          const relatedId = rel.sourceId === conceptId ? rel.targetId : rel.sourceId;
          const fromEntity = context.entities.find(e => e.id === rel.sourceId);
          const toEntity = context.entities.find(e => e.id === rel.targetId);

          if (fromEntity && toEntity) {
            relationshipMap.push({
              from: fromEntity,
              to: toEntity,
              type: rel.type,
              depth: currentDepth,
            });

            if (currentDepth < (params.depth || 2)) {
              explore(relatedId, currentDepth + 1);
            }
          }
        }
      };

      for (const root of rootConcepts) {
        explore(root.id, 0);
      }

      return {
        success: true,
        data: {
          relationshipMap,
          totalRelationships: relationshipMap.length,
          uniqueConcepts: Array.from(visited).length,
        },
        confidence: 0.95,
        sources: rootConcepts,
        reasoning: `Mapped ${relationshipMap.length} relationships across ${Array.from(visited).length} concepts`,
        suggestedFollowUp: [
          'Visualize this relationship map in the graph view',
          'Which concepts have the most connections?',
          'Show prerequisite learning paths',
        ],
      };
    },
  };
}

function createTradeStatisticsSkill(): AgentSkill {
  return {
    id: 'trade-statistics',
    name: 'Calculate Trade Statistics',
    description: 'Compute comprehensive statistics on trade performance, win rates, and risk metrics',
    category: 'analysis',
    complexity: 'basic',
    parameters: [
      {
        name: 'groupBy',
        type: 'string',
        required: false,
        description: 'Group by: "session", "model", "concept", "timeframe"',
      },
      {
        name: 'dateRange',
        type: 'object',
        required: false,
        description: 'Filter by date range',
      },
    ],
    requiredEntities: ['trade'],
    outputFormat: 'Statistical summary of trades',
    examples: [
      "What's my overall win rate?",
      'Show statistics by trading session',
      'Calculate average risk/reward by model',
    ],
    execute: async (params, context) => {
      const trades = context.entities.filter(e => e.type === 'trade');

      const wins = trades.filter(t => t.metadata?.result?.toLowerCase() === 'win');
      const losses = trades.filter(t => t.metadata?.result?.toLowerCase() === 'loss');
      const breakeven = trades.filter(t => t.metadata?.result?.toLowerCase() === 'breakeven');

      const totalRR = trades.reduce((sum, t) => sum + (t.metadata?.riskReward || 0), 0);
      const avgRR = trades.length > 0 ? totalRR / trades.length : 0;

      const totalGrade = trades.reduce((sum, t) => sum + (t.metadata?.grade || 0), 0);
      const avgGrade = trades.length > 0 ? totalGrade / trades.length : 0;

      const groupedStats: Record<string, { total: number; wins: number; winRate: number }> = {};

      if (params.groupBy === 'session') {
        const sessions = new Set(trades.map(t => t.metadata?.session || t.metadata?.killzone).filter(Boolean));
        for (const session of sessions) {
          const sessionTrades = trades.filter(
            t => (t.metadata?.session || t.metadata?.killzone) === session
          );
          const sessionWins = sessionTrades.filter(t => t.metadata?.result?.toLowerCase() === 'win');
          groupedStats[session] = {
            total: sessionTrades.length,
            wins: sessionWins.length,
            winRate: sessionTrades.length > 0 ? sessionWins.length / sessionTrades.length : 0,
          };
        }
      }

      return {
        success: true,
        data: {
          overview: {
            totalTrades: trades.length,
            wins: wins.length,
            losses: losses.length,
            breakeven: breakeven.length,
            winRate: trades.length > 0 ? wins.length / trades.length : 0,
            averageRR: avgRR,
            averageGrade: avgGrade,
          },
          groupedStats,
        },
        confidence: 1.0,
        sources: trades.slice(0, 10),
        reasoning: `Analyzed ${trades.length} total trades with ${wins.length} wins and ${losses.length} losses`,
        suggestedFollowUp: [
          'Break down statistics by model',
          'Show my best performing trades',
          'Analyze failure patterns in losses',
        ],
      };
    },
  };
}

function createKillzoneAnalysisSkill(): AgentSkill {
  return {
    id: 'killzone-analysis',
    name: 'Analyze Killzone Performance',
    description: 'Analyze trade performance across different ICT killzones (LON, NY, ASI)',
    category: 'analysis',
    complexity: 'intermediate',
    parameters: [
      {
        name: 'killzone',
        type: 'string',
        required: false,
        description: 'Specific killzone: "LON", "NY", "ASI"',
      },
    ],
    requiredEntities: ['trade'],
    outputFormat: 'Killzone performance breakdown',
    examples: [
      'Which killzone has my best win rate?',
      'Analyze NY session performance',
      'Compare all killzone statistics',
    ],
    execute: async (params, context) => {
      const trades = context.entities.filter(e => e.type === 'trade');

      const killzones = ['LON', 'NY', 'ASI'];
      const analysis: Record<string, {
        totalTrades: number;
        wins: number;
        losses: number;
        winRate: number;
        avgRR: number;
        trades: Entity[];
      }> = {};

      for (const kz of killzones) {
        const kzTrades = trades.filter(
          t =>
            (t.metadata?.session?.includes(kz) || t.metadata?.killzone?.includes(kz))
        );
        const wins = kzTrades.filter(t => t.metadata?.result?.toLowerCase() === 'win');

        analysis[kz] = {
          totalTrades: kzTrades.length,
          wins: wins.length,
          losses: kzTrades.length - wins.length,
          winRate: kzTrades.length > 0 ? wins.length / kzTrades.length : 0,
          avgRR:
            kzTrades.reduce((sum, t) => sum + (t.metadata?.riskReward || 0), 0) / kzTrades.length || 0,
          trades: kzTrades,
        };
      }

      const bestKZ = Object.entries(analysis).reduce((best, [kz, data]) => {
        return data.winRate > (best.data?.winRate || 0) ? { kz, data } : best;
      }, {} as { kz?: string, data?: typeof analysis[string] });

      return {
        success: true,
        data: {
          analysis,
          bestPerforming: bestKZ,
        },
        confidence: 0.9,
        sources: trades.slice(0, 10),
        reasoning: `Analyzed performance across ${killzones.length} killzones with ${trades.length} total trades`,
        suggestedFollowUp: [
          `Show me winning trades from ${bestKZ.kz} session`,
          'What models work best in each killzone?',
          'Compare concept usage across killzones',
        ],
      };
    },
  };
}

function createRiskRewardAnalysisSkill(): AgentSkill {
  return {
    id: 'risk-reward-analysis',
    name: 'Analyze Risk/Reward Metrics',
    description: 'Analyze risk/reward ratios and their correlation with win rates and setup quality',
    category: 'analysis',
    complexity: 'intermediate',
    parameters: [
      {
        name: 'minRR',
        type: 'number',
        required: false,
        description: 'Minimum R:R ratio to analyze',
      },
    ],
    requiredEntities: ['trade'],
    outputFormat: 'Risk/reward analysis with correlations',
    examples: [
      'What is my average R:R on winning trades?',
      'Show trades with >3R and their win rate',
      'Correlate setup grade with achieved R:R',
    ],
    execute: async (params, context) => {
      let trades = context.entities.filter(e => e.type === 'trade');

      if (params.minRR) {
        trades = trades.filter(t => (t.metadata?.riskReward || 0) >= params.minRR);
      }

      const wins = trades.filter(t => t.metadata?.result?.toLowerCase() === 'win');
      const losses = trades.filter(t => t.metadata?.result?.toLowerCase() === 'loss');

      const avgRRWins = wins.reduce((sum, t) => sum + (t.metadata?.riskReward || 0), 0) / wins.length || 0;
      const avgRRLosses =
        losses.reduce((sum, t) => sum + (t.metadata?.riskReward || 0), 0) / losses.length || 0;

      const rrRanges = [
        { label: '0-1R', min: 0, max: 1 },
        { label: '1-2R', min: 1, max: 2 },
        { label: '2-3R', min: 2, max: 3 },
        { label: '3R+', min: 3, max: Infinity },
      ];

      const byRange = rrRanges.map(range => {
        const rangeTrades = trades.filter(
          t => (t.metadata?.riskReward || 0) >= range.min && (t.metadata?.riskReward || 0) < range.max
        );
        const rangeWins = rangeTrades.filter(t => t.metadata?.result?.toLowerCase() === 'win');

        return {
          range: range.label,
          count: rangeTrades.length,
          wins: rangeWins.length,
          winRate: rangeTrades.length > 0 ? rangeWins.length / rangeTrades.length : 0,
        };
      });

      return {
        success: true,
        data: {
          overview: {
            totalTrades: trades.length,
            avgRRWins,
            avgRRLosses,
          },
          byRange,
        },
        confidence: 0.9,
        sources: trades.slice(0, 10),
        reasoning: `Analyzed R:R metrics across ${trades.length} trades`,
        suggestedFollowUp: [
          'Which models produce the highest R:R?',
          'Show me 3R+ winning trades for study',
          'Analyze why some high R:R setups failed',
        ],
      };
    },
  };
}

function createConceptUsageAnalysisSkill(): AgentSkill {
  return {
    id: 'concept-usage-analysis',
    name: 'Analyze Concept Usage',
    description: 'Determine which concepts are used most frequently and their correlation with success',
    category: 'analysis',
    complexity: 'intermediate',
    parameters: [
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: 'Sort by: "frequency", "winRate", "avgRR"',
        defaultValue: 'frequency',
      },
    ],
    requiredEntities: ['concept', 'trade'],
    outputFormat: 'Concept usage statistics',
    examples: [
      'Which concepts appear most in my trades?',
      'What concepts have the highest win rate?',
      'Show concept frequency and performance',
    ],
    execute: async (params, context) => {
      const concepts = context.entities.filter(e => e.type === 'concept');
      const trades = context.entities.filter(e => e.type === 'trade');

      const usage = concepts.map(concept => {
        const conceptTrades = context.relationships
          .filter(r => r.type === 'TRADE_USES_CONCEPT' && r.targetId === concept.id)
          .map(r => context.entities.find(e => e.id === r.sourceId))
          .filter((e): e is Entity => e !== undefined);

        const wins = conceptTrades.filter(t => t.metadata?.result?.toLowerCase() === 'win');
        const avgRR =
          conceptTrades.reduce((sum, t) => sum + (t.metadata?.riskReward || 0), 0) / conceptTrades.length ||
          0;

        return {
          concept,
          frequency: conceptTrades.length,
          trades: conceptTrades,
          wins: wins.length,
          winRate: conceptTrades.length > 0 ? wins.length / conceptTrades.length : 0,
          avgRR,
        };
      });

      const sorted = usage.sort((a, b) => {
        if (params.sortBy === 'winRate') return b.winRate - a.winRate;
        if (params.sortBy === 'avgRR') return b.avgRR - a.avgRR;
        return b.frequency - a.frequency;
      });

      return {
        success: true,
        data: {
          conceptUsage: sorted,
          topConcept: sorted[0],
        },
        confidence: 0.95,
        sources: concepts,
        reasoning: `Analyzed usage of ${concepts.length} concepts across ${trades.length} trades`,
        suggestedFollowUp: [
          `Show me trades using ${sorted[0]?.concept.name}`,
          'Which concepts are underutilized?',
          'Compare concept usage in wins vs losses',
        ],
      };
    },
  };
}

function createFailureAnalysisSkill(): AgentSkill {
  return {
    id: 'failure-analysis',
    name: 'Analyze Trade Failures',
    description: 'Deep analysis of losing trades to identify root causes and patterns',
    category: 'learning',
    complexity: 'advanced',
    parameters: [
      {
        name: 'focusArea',
        type: 'string',
        required: false,
        description: 'Focus on specific failure type',
      },
    ],
    requiredEntities: ['trade'],
    outputFormat: 'Failure pattern analysis',
    examples: [
      'Why did my trades fail?',
      'Analyze common failure patterns',
      'Show root causes of losses',
    ],
    execute: async (params, context) => {
      const losses = context.entities.filter(
        e => e.type === 'trade' && e.metadata?.result?.toLowerCase() === 'loss'
      );

      const failureReasons = new Map<string, Entity[]>();

      for (const trade of losses) {
        const reason =
          trade.metadata?.failure_reason ||
          trade.metadata?.failureReason ||
          trade.metadata?.failure_analysis?.root_cause ||
          'Unknown';

        const existing = failureReasons.get(reason);
        if (existing) {
          existing.push(trade);
        } else {
          failureReasons.set(reason, [trade]);
        }
      }

      const patterns = Array.from(failureReasons.entries())
        .map(([reason, trades]) => ({
          reason,
          count: trades.length,
          percentage: (trades.length / losses.length) * 100,
          trades,
          avgGrade: trades.reduce((sum, t) => sum + (t.metadata?.grade || 0), 0) / trades.length,
        }))
        .sort((a, b) => b.count - a.count);

      return {
        success: true,
        data: {
          totalFailures: losses.length,
          patterns,
          mostCommon: patterns[0],
        },
        confidence: 0.85,
        sources: losses.slice(0, 10),
        reasoning: `Identified ${patterns.length} distinct failure patterns across ${losses.length} losing trades`,
        suggestedFollowUp: [
          'What can I learn from these failures?',
          'Show me similar failures that later succeeded',
          'Create a checklist to avoid these mistakes',
        ],
      };
    },
  };
}

function createTimeframeCorrelationSkill(): AgentSkill {
  return {
    id: 'timeframe-correlation',
    name: 'Analyze Timeframe Correlations',
    description: 'Analyze multi-timeframe confluence and its impact on trade success',
    category: 'analysis',
    complexity: 'advanced',
    parameters: [
      {
        name: 'primaryTimeframe',
        type: 'string',
        required: false,
        description: 'Primary timeframe to analyze',
      },
    ],
    requiredEntities: ['trade'],
    outputFormat: 'Timeframe correlation analysis',
    examples: [
      'Do multi-timeframe setups perform better?',
      'Analyze HTF alignment impact on success',
      'Show correlation between timeframe and win rate',
    ],
    execute: async (params, context) => {
      const trades = context.entities.filter(e => e.type === 'trade');

      const mtfTrades = trades.filter(t => t.metadata?.mtf_alignment || t.metadata?.multiTimeframe);
      const singleTfTrades = trades.filter(
        t => !t.metadata?.mtf_alignment && !t.metadata?.multiTimeframe
      );

      const mtfWins = mtfTrades.filter(t => t.metadata?.result?.toLowerCase() === 'win');
      const singleWins = singleTfTrades.filter(t => t.metadata?.result?.toLowerCase() === 'win');

      return {
        success: true,
        data: {
          multiTimeframe: {
            total: mtfTrades.length,
            wins: mtfWins.length,
            winRate: mtfTrades.length > 0 ? mtfWins.length / mtfTrades.length : 0,
          },
          singleTimeframe: {
            total: singleTfTrades.length,
            wins: singleWins.length,
            winRate: singleTfTrades.length > 0 ? singleWins.length / singleTfTrades.length : 0,
          },
        },
        confidence: 0.8,
        sources: [...mtfTrades.slice(0, 5), ...singleTfTrades.slice(0, 5)],
        reasoning: `Compared ${mtfTrades.length} MTF trades to ${singleTfTrades.length} single-TF trades`,
        suggestedFollowUp: [
          'Show me the best multi-timeframe setups',
          'What is the ideal timeframe combination?',
          'Do certain concepts require MTF alignment?',
        ],
      };
    },
  };
}

function createLiquidityProfileSkill(): AgentSkill {
  return {
    id: 'liquidity-profile',
    name: 'Build Liquidity Profile',
    description: 'Analyze liquidity concepts and their usage patterns in trades',
    category: 'analysis',
    complexity: 'advanced',
    parameters: [
      {
        name: 'liquidityType',
        type: 'string',
        required: false,
        description: 'Type: "sweep", "grab", "pool", "void"',
      },
    ],
    requiredEntities: ['concept', 'trade'],
    outputFormat: 'Liquidity analysis',
    examples: [
      'Analyze liquidity sweep effectiveness',
      'How often do liquidity grabs lead to wins?',
      'Show liquidity pool targeting success',
    ],
    execute: async (params, context) => {
      const liquidityConcepts = context.entities.filter(
        e =>
          e.type === 'concept' &&
          (e.name.toLowerCase().includes('liquidity') ||
            e.name.toLowerCase().includes('sweep') ||
            e.name.toLowerCase().includes('grab'))
      );

      const profiles = liquidityConcepts.map(concept => {
        const trades = context.relationships
          .filter(r => r.type === 'TRADE_USES_CONCEPT' && r.targetId === concept.id)
          .map(r => context.entities.find(e => e.id === r.sourceId))
          .filter((e): e is Entity => e !== undefined);

        const wins = trades.filter(t => t.metadata?.result?.toLowerCase() === 'win');

        return {
          concept,
          usage: trades.length,
          wins: wins.length,
          winRate: trades.length > 0 ? wins.length / trades.length : 0,
        };
      });

      return {
        success: true,
        data: {
          profiles,
          totalLiquidityConcepts: liquidityConcepts.length,
        },
        confidence: 0.85,
        sources: liquidityConcepts,
        reasoning: `Analyzed ${liquidityConcepts.length} liquidity-related concepts`,
        suggestedFollowUp: [
          'Show me trades with liquidity sweeps',
          'Compare liquidity concepts to other setups',
          'What sessions have the most liquidity events?',
        ],
      };
    },
  };
}

function createDisplacementDetectionSkill(): AgentSkill {
  return {
    id: 'displacement-detection',
    name: 'Detect Displacement Patterns',
    description: 'Identify and analyze displacement events and their trading outcomes',
    category: 'analysis',
    complexity: 'advanced',
    parameters: [
      {
        name: 'minCandles',
        type: 'number',
        required: false,
        description: 'Minimum displacement candle count',
      },
    ],
    requiredEntities: ['concept', 'trade'],
    outputFormat: 'Displacement analysis',
    examples: [
      'How effective are displacement setups?',
      'Analyze strong displacement trades',
      'Show displacement + FVG combinations',
    ],
    execute: async (params, context) => {
      const displacementConcept = context.entities.find(
        e => e.type === 'concept' && e.name.toLowerCase().includes('displacement')
      );

      if (!displacementConcept) {
        return {
          success: false,
          data: null,
          confidence: 0,
          sources: [],
          reasoning: 'Displacement concept not found in knowledge base',
        };
      }

      const trades = context.relationships
        .filter(r => r.type === 'TRADE_USES_CONCEPT' && r.targetId === displacementConcept.id)
        .map(r => context.entities.find(e => e.id === r.sourceId))
        .filter((e): e is Entity => e !== undefined);

      const wins = trades.filter(t => t.metadata?.result?.toLowerCase() === 'win');
      const avgRR = trades.reduce((sum, t) => sum + (t.metadata?.riskReward || 0), 0) / trades.length || 0;

      return {
        success: true,
        data: {
          totalDisplacementTrades: trades.length,
          wins: wins.length,
          winRate: trades.length > 0 ? wins.length / trades.length : 0,
          avgRR,
          trades,
        },
        confidence: 0.9,
        sources: [displacementConcept, ...trades.slice(0, 10)],
        reasoning: `Found ${trades.length} trades using displacement with ${wins.length} wins`,
        suggestedFollowUp: [
          'Show displacement + Order Block setups',
          'What makes a strong displacement?',
          'Compare displacement to other momentum concepts',
        ],
      };
    },
  };
}

function createRecommendationEngineSkill(): AgentSkill {
  return {
    id: 'recommendation-engine',
    name: 'Generate Trade Recommendations',
    description: 'AI-powered recommendations for concepts to study, models to practice, and patterns to focus on',
    category: 'recommendation',
    complexity: 'expert',
    parameters: [
      {
        name: 'focusArea',
        type: 'string',
        required: false,
        description: 'Focus recommendations on specific area',
      },
    ],
    requiredEntities: ['trade', 'concept', 'model'],
    outputFormat: 'Personalized recommendations',
    examples: [
      'What should I focus on improving?',
      'Recommend concepts to study next',
      'What patterns should I practice?',
    ],
    execute: async (params, context) => {
      const concepts = context.entities.filter(e => e.type === 'concept');
      // const models = context.entities.filter(e => e.type === 'model');

      const trades = context.entities.filter(e => e.type === 'trade');
      const wins = trades.filter(t => t.metadata?.result?.toLowerCase() === 'win');
      const losses = trades.filter(t => t.metadata?.result?.toLowerCase() === 'loss');

      const winningConcepts = new Map<string, number>();
      for (const win of wins) {
        const usedConcepts = context.relationships
          .filter(r => r.type === 'TRADE_USES_CONCEPT' && r.sourceId === win.id)
          .map(r => r.targetId);

        for (const conceptId of usedConcepts) {
          winningConcepts.set(conceptId, (winningConcepts.get(conceptId) || 0) + 1);
        }
      }

      const topWinningConcepts = Array.from(winningConcepts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id]) => concepts.find(c => c.id === id))
        .filter((c): c is Entity => c !== undefined);

      const underutilizedConcepts = concepts.filter(concept => {
        const usage = context.relationships.filter(
          r => r.type === 'TRADE_USES_CONCEPT' && r.targetId === concept.id
        ).length;
        return usage < 3;
      });

      const recommendations = {
        strengthenSkills: topWinningConcepts.slice(0, 3).map(c => ({
          concept: c.name,
          reason: 'You have high success with this concept',
          action: `Study ${c.name} in depth and refine execution`,
        })),
        exploreNew: underutilizedConcepts.slice(0, 3).map(c => ({
          concept: c.name,
          reason: 'Underutilized in your trading',
          action: `Add ${c.name} to your analysis checklist`,
        })),
        improvementAreas:
          losses.length > 0
            ? [
                {
                  area: 'Trade Execution',
                  reason: `${losses.length} losses detected`,
                  action: 'Review failure analysis and create prevention checklist',
                },
              ]
            : [],
      };

      return {
        success: true,
        data: recommendations,
        confidence: 0.85,
        sources: [...topWinningConcepts, ...underutilizedConcepts.slice(0, 3)],
        reasoning: `Generated personalized recommendations based on ${trades.length} trades`,
        suggestedFollowUp: [
          'Show me examples of my strongest setups',
          'Create a learning plan for new concepts',
          'Analyze my biggest improvement opportunity',
        ],
      };
    },
  };
}

export function createDefaultSkillRegistry(): AgentSkillRegistry {
  return new AgentSkillRegistry();
}
