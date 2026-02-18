# Agent Skills System

## Overview

The Agent Skills system provides a powerful, modular framework for executing AI-powered analysis tasks on your ICT Knowledge Engine database. Each skill is a specialized capability that can query, analyze, learn from, and provide recommendations based on your trading data.

## Architecture

### Core Components

1. **AgentSkill**: Individual skill definition with parameters, execution logic, and metadata
2. **AgentSkillRegistry**: Central registry that manages all skills and tracks execution history
3. **SkillExecutionContext**: Runtime context providing access to entities, relationships, and AI graph
4. **SkillResult**: Standardized result format with data, confidence, sources, and reasoning

### Skill Categories

- **Query**: Retrieve and filter data (concepts, trades, models)
- **Analysis**: Deep analysis of patterns, performance, and correlations
- **Learning**: Pattern recognition and knowledge extraction
- **Recommendation**: AI-powered suggestions for improvement
- **Extraction**: Parse and extract structured data
- **Validation**: Validate data quality and schema compliance
- **Relationship**: Explore and map entity connections

## Built-in Skills

### 1. Concept Definition (`concept-definition`)
**Category**: Query  
**Complexity**: Basic

Retrieve detailed definition of an ICT concept with bearish/bullish context, detection rules, and related concepts.

**Parameters**:
- `conceptName` (required): Name of the ICT concept
- `includeExamples` (optional): Include trade examples

**Example Usage**:
```typescript
const result = await registry.executeSkill('concept-definition', {
  conceptName: 'Fair Value Gap',
  includeExamples: true
}, context);
```

**Example Queries**:
- "Define Fair Value Gap with bearish/bullish displacement examples"
- "What is an Order Block and how is it detected?"
- "Explain Displacement in ICT methodology"

---

### 2. Trade Filter (`trade-filter`)
**Category**: Query  
**Complexity**: Intermediate

Query trades with specific setup criteria, risk/reward ratios, confluences, and outcomes.

**Parameters**:
- `concepts` (optional): Required concepts array
- `minRiskReward` (optional): Minimum R:R ratio
- `outcome` (optional): "win", "loss", or "breakeven"
- `session` (optional): "LON", "NY", or "ASI"
- `model` (optional): ICT model name
- `minGrade` (optional): Minimum quality grade (1-10)

**Example Usage**:
```typescript
const result = await registry.executeSkill('trade-filter', {
  concepts: ['Order Block', 'Fair Value Gap'],
  minRiskReward: 2,
  outcome: 'win'
}, context);
```

**Example Queries**:
- "Filter trades: OB + FVG confluence resulting in >2R returns"
- "Show me all Silver Bullet trades in the NY session"
- "List trades with A+ grade (9-10) that resulted in losses"

---

### 3. Model Analysis (`model-analysis`)
**Category**: Analysis  
**Complexity**: Intermediate

Retrieve model definition, entry criteria, time windows, required confluences, and historical performance.

**Parameters**:
- `modelName` (required): Name of the ICT model
- `includePerformance` (optional): Include performance statistics

**Example Queries**:
- "List the entry criteria and time windows for the Silver Bullet setup"
- "Analyze the Turtle Soup model performance"
- "What confluences are required for Model 12?"

---

### 4. Confluence Detection (`confluence-detection`)
**Category**: Analysis  
**Complexity**: Advanced

Identify trades with specific concept confluences and analyze their success rates.

**Parameters**:
- `requiredConcepts` (required): Concepts that must all be present
- `minConfluenceCount` (optional): Minimum number of concepts (default: 2)

**Example Queries**:
- "Find all OB + FVG + OTE confluences"
- "Which 3-concept confluences have the highest win rate?"
- "Analyze displacement + liquidity sweep combinations"

---

### 5. Pattern Recognition (`pattern-recognition`)
**Category**: Learning  
**Complexity**: Expert

Discover recurring patterns in successful or failed trades using AI pattern analysis.

**Parameters**:
- `focusOn` (optional): "wins", "losses", or "all" (default: "wins")
- `minOccurrences` (optional): Minimum pattern frequency (default: 3)

**Example Queries**:
- "What patterns appear in my winning trades?"
- "Identify common failure patterns"
- "Discover setup patterns with 80%+ win rate"

---

### 6. Setup Grade Analysis (`setup-grade-analysis`)
**Category**: Analysis  
**Complexity**: Intermediate

Analyze trades by quality grade (A+, A, B, C) and correlate with outcomes.

**Parameters**:
- `minGrade` (optional): Minimum grade (1-10)
- `gradeCategory` (optional): "A+", "A", "B", or "C"

**Example Queries**:
- "Show me high-probability A+ Setups from my training data"
- "What is the win rate for B-grade setups?"
- "Compare outcomes across all quality grades"

---

### 7. Concept Relationship Map (`concept-relationship-map`)
**Category**: Relationship  
**Complexity**: Intermediate

Build a relationship map showing how concepts connect and depend on each other.

**Parameters**:
- `rootConcept` (optional): Start from a specific concept
- `depth` (optional): Relationship depth to explore (default: 2)

**Example Queries**:
- "Show me all concepts related to Fair Value Gap"
- "Map the prerequisite chain for Order Block"
- "What concepts are closely connected to Displacement?"

---

### 8. Trade Statistics (`trade-statistics`)
**Category**: Analysis  
**Complexity**: Basic

Compute comprehensive statistics on trade performance, win rates, and risk metrics.

**Parameters**:
- `groupBy` (optional): "session", "model", "concept", "timeframe"
- `dateRange` (optional): Filter by date range

**Example Queries**:
- "What's my overall win rate?"
- "Show statistics by trading session"
- "Calculate average risk/reward by model"

---

### 9. Killzone Analysis (`killzone-analysis`)
**Category**: Analysis  
**Complexity**: Intermediate

Analyze trade performance across different ICT killzones (LON, NY, ASI).

**Parameters**:
- `killzone` (optional): Specific killzone to analyze

**Example Queries**:
- "Which killzone has my best win rate?"
- "Analyze NY session performance"
- "Compare all killzone statistics"

---

### 10. Risk/Reward Analysis (`risk-reward-analysis`)
**Category**: Analysis  
**Complexity**: Intermediate

Analyze risk/reward ratios and their correlation with win rates and setup quality.

**Parameters**:
- `minRR` (optional): Minimum R:R ratio to analyze

**Example Queries**:
- "What is my average R:R on winning trades?"
- "Show trades with >3R and their win rate"
- "Correlate setup grade with achieved R:R"

---

### 11. Concept Usage Analysis (`concept-usage-analysis`)
**Category**: Analysis  
**Complexity**: Intermediate

Determine which concepts are used most frequently and their correlation with success.

**Parameters**:
- `sortBy` (optional): "frequency", "winRate", "avgRR" (default: "frequency")

**Example Queries**:
- "Which concepts appear most in my trades?"
- "What concepts have the highest win rate?"
- "Show concept frequency and performance"

---

### 12. Failure Analysis (`failure-analysis`)
**Category**: Learning  
**Complexity**: Advanced

Deep analysis of losing trades to identify root causes and patterns.

**Parameters**:
- `focusArea` (optional): Specific failure type to focus on

**Example Queries**:
- "Why did my trades fail?"
- "Analyze common failure patterns"
- "Show root causes of losses"

---

### 13. Timeframe Correlation (`timeframe-correlation`)
**Category**: Analysis  
**Complexity**: Advanced

Analyze multi-timeframe confluence and its impact on trade success.

**Parameters**:
- `primaryTimeframe` (optional): Primary timeframe to analyze

**Example Queries**:
- "Do multi-timeframe setups perform better?"
- "Analyze HTF alignment impact on success"
- "Show correlation between timeframe and win rate"

---

### 14. Liquidity Profile (`liquidity-profile`)
**Category**: Analysis  
**Complexity**: Advanced

Analyze liquidity concepts and their usage patterns in trades.

**Parameters**:
- `liquidityType` (optional): "sweep", "grab", "pool", "void"

**Example Queries**:
- "Analyze liquidity sweep effectiveness"
- "How often do liquidity grabs lead to wins?"
- "Show liquidity pool targeting success"

---

### 15. Displacement Detection (`displacement-detection`)
**Category**: Analysis  
**Complexity**: Advanced

Identify and analyze displacement events and their trading outcomes.

**Parameters**:
- `minCandles` (optional): Minimum displacement candle count

**Example Queries**:
- "How effective are displacement setups?"
- "Analyze strong displacement trades"
- "Show displacement + FVG combinations"

---

### 16. Recommendation Engine (`recommendation-engine`)
**Category**: Recommendation  
**Complexity**: Expert

AI-powered recommendations for concepts to study, models to practice, and patterns to focus on.

**Parameters**:
- `focusArea` (optional): Specific area for recommendations

**Example Queries**:
- "What should I focus on improving?"
- "Recommend concepts to study next"
- "What patterns should I practice?"

## Using Skills in Code

### Basic Execution

```typescript
import { createDefaultSkillRegistry } from '@/lib/agent-skills';

const registry = createDefaultSkillRegistry();

const result = await registry.executeSkill(
  'concept-definition',
  { conceptName: 'Fair Value Gap' },
  { entities, relationships, aiGraph }
);

if (result.success) {
  console.log('Data:', result.data);
  console.log('Confidence:', result.confidence);
  console.log('Reasoning:', result.reasoning);
  console.log('Sources:', result.sources);
}
```

### Skill Chains

Execute multiple skills in sequence with data flow between them:

```typescript
registry.registerChain({
  id: 'concept-to-trades-analysis',
  name: 'Concept to Trades Analysis',
  description: 'Analyze a concept and then filter trades using it',
  skills: ['concept-definition', 'trade-filter'],
  dataFlow: [
    {
      from: 'concept-definition',
      to: 'trade-filter',
      mapping: {
        'concept.name': 'concepts[0]'
      }
    }
  ]
});

const results = await registry.executeChain(
  'concept-to-trades-analysis',
  { conceptName: 'Order Block' },
  context
);
```

### Custom Skills

Create your own custom skills:

```typescript
const customSkill: AgentSkill = {
  id: 'my-custom-skill',
  name: 'My Custom Analysis',
  description: 'Custom analysis logic',
  category: 'analysis',
  complexity: 'intermediate',
  parameters: [
    {
      name: 'param1',
      type: 'string',
      required: true,
      description: 'First parameter'
    }
  ],
  requiredEntities: ['trade'],
  outputFormat: 'Custom result format',
  examples: ['Example query 1', 'Example query 2'],
  execute: async (params, context) => {
    // Your custom logic here
    const data = {}; // Process data
    
    return {
      success: true,
      data,
      confidence: 0.9,
      sources: [],
      reasoning: 'Analysis complete'
    };
  }
};

registry.registerSkill(customSkill);
```

## Skill Result Structure

All skills return a standardized `SkillResult`:

```typescript
interface SkillResult {
  success: boolean;              // Whether execution succeeded
  data: any;                     // Result data (skill-specific)
  confidence: number;            // Confidence score (0-1)
  sources: Entity[];             // Referenced entities
  reasoning: string;             // Explanation of result
  warnings?: string[];           // Optional warnings
  suggestedFollowUp?: string[];  // Suggested next queries
}
```

## Performance Tracking

The registry tracks execution history and provides statistics:

```typescript
const stats = registry.getExecutionStats();

console.log('Total Executions:', stats.totalExecutions);
console.log('Success Rate:', stats.successRate);
console.log('Average Confidence:', stats.averageConfidence);
console.log('Average Duration:', stats.averageDuration);
console.log('Skill Usage:', stats.skillUsage);
```

## UI Integration

The `SkillsView` component provides a user-friendly interface for:
- Browsing available skills by category
- Viewing skill details and examples
- Entering parameters and executing skills
- Viewing results with confidence scores
- Following suggested actions
- Navigating to referenced entities

Access it via the "Skills" tab in the main navigation with the lightning bolt icon (⚡).

## Best Practices

1. **Start Simple**: Begin with basic query skills before advanced analysis
2. **Check Confidence**: Review confidence scores to assess result reliability
3. **Use Suggestions**: Follow suggested follow-up queries to explore deeper
4. **Chain Skills**: Combine skills for complex multi-step analysis
5. **Review Sources**: Check referenced entities for context
6. **Track Performance**: Monitor execution stats to identify useful skills

## Future Extensions

Potential areas for expansion:
- **Natural Language Processing**: Parse natural language queries to skill execution
- **Skill Composition**: Auto-compose skills based on query intent
- **Learning from Feedback**: Improve skill accuracy based on user corrections
- **Parallelization**: Execute independent skills in parallel
- **Caching**: Cache frequently executed skill results
- **Versioning**: Version skills for backward compatibility
