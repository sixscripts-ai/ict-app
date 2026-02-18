# AI Graph Internal Schema System

## Overview

The `schema.ts` file implements a sophisticated AI-powered graph intelligence system for the ICT Knowledge Engine. It provides session caching, markdown enrichment, and logic flow support to enhance chat interactions with deep contextual understanding.

## Core Components

### AIGraphInternal Class

The main class that orchestrates the intelligent graph system with the following capabilities:

#### 1. **Graph Construction**
- Builds an internal graph representation from entities and relationships
- Calculates node weights based on entity type, tags, and sources
- Determines edge weights and flow directions for relationships
- Maintains bidirectional connections for efficient traversal

#### 2. **Markdown Enrichment**
Automatically extracts structured knowledge from markdown files:
- **Concept Extraction**: Identifies ICT terminology (FVG, Order Block, Displacement, etc.)
- **Relationship Detection**: Finds connections between concepts using natural language patterns
- **Code Block Parsing**: Extracts and categorizes embedded code snippets
- **Section Analysis**: Builds a hierarchical structure of document content
- **Complexity Metrics**: Calculates technical complexity and concept density

Example enrichment process:
```typescript
const enrichment = aiGraph.enrichFromMarkdown('ICT_MASTER_LIBRARY.md', markdownContent);
// Returns:
// - extractedConcepts: ['Fair Value Gap', 'Order Block', 'Displacement']
// - extractedRelationships: [{from: 'FVG', to: 'Displacement', type: 'CONCEPT_PREREQUISITE'}]
// - codeBlocks: [...]
// - metadata: {wordCount: 5000, conceptDensity: 3.2, technicalComplexity: 78}
```

#### 3. **Session Caching**
Maintains intelligent chat session state:
- **Message History**: Stores full conversation context
- **Active Entities**: Tracks which entities are currently being discussed
- **Referenced Concepts**: Counts concept mentions to understand focus areas
- **Query History**: Records all user queries for pattern analysis
- **Conversation Topic**: Automatically infers the main discussion topic
- **Intent Detection**: Determines user intent (define, filter, analyze, explain)
- **Graph Snapshot**: Captures relevant subgraph for current conversation
- **Confidence Scoring**: Measures AI confidence based on available sources

Session structure:
```typescript
{
  sessionId: "session-123456",
  messages: [...],
  context: {
    activeEntities: ["entity-1", "entity-2"],
    referencedConcepts: Map<"Fair Value Gap" → 5, "Order Block" → 3>,
    queryHistory: ["Define FVG", "Show OB trades"],
    conversationTopic: "concepts",
    inferredIntent: "define_concept"
  },
  graphSnapshot: {
    nodes: [...],
    edges: [...],
    focusNodes: ["entity-1", "entity-2"]
  },
  reasoning: {
    lastInference: "define_concept",
    confidenceScore: 0.85,
    logicFlow: {...},
    enrichmentSources: ["ICT_MASTER_LIBRARY.md"]
  },
  expiresAt: "2024-01-21T12:00:00Z"
}
```

#### 4. **Logic Flow Generation**
Creates execution plans for different query types:

**Define/Explain Queries:**
```
Step 1: Query knowledge_base for concept
Step 2: Find relationships to concept
Step 3: Synthesize explanation from concept + relationships
```

**Filter/Search Queries:**
```
Step 1: Filter entities by criteria
Step 2: Sort and rank results
```

**Analyze/Compare Queries:**
```
Step 1: Lookup multiple entities
Step 2: Calculate statistics
Step 3: Generate insights from metrics
```

## Key Features

### Automatic Intent Detection
The system analyzes user queries to determine intent:
- **define_concept**: Questions about definitions ("What is FVG?")
- **filter_data**: Search and filtering ("Show trades with OB + FVG")
- **analyze_data**: Statistical analysis ("Compare win rates")
- **explain_mechanism**: How/why questions ("How does displacement work?")
- **explore_relationships**: Connection queries ("What relates to FVG?")

### Conversation Topic Inference
Detects the main conversation theme:
- **concepts**: Discussion about ICT concepts
- **trading**: Trade execution and setups
- **models**: Trading models and frameworks
- **analysis**: Performance and statistics
- **patterns**: Pattern recognition and confluence

### Subgraph Extraction
Efficiently extracts relevant portions of the knowledge graph:
- Starts with focus nodes (active entities)
- Expands to include first-degree connections
- Filters edges to only include connected nodes
- Optimized for quick contextual retrieval

### Session Expiration
Automatic cleanup of old sessions:
- Sessions expire after 24 hours by default
- Periodic cleanup runs every hour
- Expired sessions are automatically removed

## Integration with Chat System

The AI Graph Internal system is integrated into `App.tsx` to enhance the chat experience:

```typescript
// Initialize the system
const aiGraphRef = useRef(createAIGraphInternal());
const sessionIdRef = useRef(`session-${Date.now()}`);

// Build graph from entities and relationships
useEffect(() => {
  if (safeEntities.length > 0) {
    aiGraphRef.current.buildFromEntities(safeEntities, safeRelationships);
  }
}, [safeEntities, safeRelationships]);

// Use in chat question handler
const handleAskQuestion = async (question: string) => {
  const aiGraph = aiGraphRef.current;
  
  // Create/update session with current context
  aiGraph.createOrUpdateSession(sessionId, chatMessages, entities);
  const session = aiGraph.getSession(sessionId);
  
  // Generate logic flow for query
  const logicFlow = aiGraph.buildLogicFlow(question, session);
  
  // Enrich from markdown documents
  const enrichmentContext = entities
    .filter(e => e.type === 'document' && e.content)
    .map(e => aiGraph.enrichFromMarkdown(e.name, e.content));
  
  // Build enhanced prompt with session context
  const prompt = `...includes session context, enrichment data, logic flow...`;
  
  return await spark.llm(prompt);
};
```

## Benefits

1. **Contextual Understanding**: The AI maintains awareness of conversation history and focus
2. **Smart Enrichment**: Automatically extracts knowledge from markdown documents
3. **Intelligent Routing**: Logic flows optimize query execution paths
4. **Performance**: Session caching reduces redundant processing
5. **Scalability**: Efficient subgraph extraction handles large knowledge bases
6. **Adaptability**: Intent detection allows tailored responses for different query types

## Data Flow

```
User Query
    ↓
Session Update (track context)
    ↓
Intent Detection (classify query type)
    ↓
Logic Flow Generation (plan execution)
    ↓
Markdown Enrichment (extract knowledge)
    ↓
Subgraph Extraction (get relevant data)
    ↓
Enhanced Prompt (with all context)
    ↓
LLM Processing
    ↓
Response + Sources
```

## Future Enhancements

- **Vector Embeddings**: Add semantic search capabilities to AIGraphNode
- **Pattern Learning**: Learn from successful query patterns
- **Cache Optimization**: Intelligent cache warming for frequently accessed subgraphs
- **Multi-Session Analysis**: Cross-session pattern detection
- **Enrichment Training**: Fine-tune extraction patterns based on domain knowledge
- **Flow Optimization**: Learn optimal logic flows from execution results
