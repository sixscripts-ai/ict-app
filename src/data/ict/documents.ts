import type { Entity } from '../../lib/types';

const timestamp = new Date().toISOString();
const uploadId = 'ict-master-database-2026-02-18';

export const ICT_DOCUMENTS: Entity[] = [
  {
    id: 'document-ict-master-library',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT Master Library',
    description: 'Comprehensive 826-line reference covering all ICT concepts, models, and implementation details across 10 parts. The definitive source document for Inner Circle Trader methodology. Includes core concepts, advanced concepts, execution models, time-based trading, confirmation tools, multi-timeframe workflow, special models, and algorithmic implementation.',
    content: '# ICT Master Library - Comprehensive Training Data\n\nPart 1: Core Concepts (Market Structure, BOS, SMS, CHoCH, FVG, Order Block, Displacement, Liquidity, OTE, Premium/Discount)\nPart 2: Advanced Concepts (Breaker Block, Mitigation Block, BPR, Liquidity Void, PD Array Matrix)\nPart 3: Execution Models (Power of Three, Judas Swing, Silver Bullet, ICT 2022, Market Maker Models)\nPart 4: Time-Based Concepts (Killzones, Macro Times, IPDA, Daily Bias)\nPart 5: Confirmation Tools (SMT Divergence, Institutional Order Flow, Model Stacking)\nPart 6: Multi-Timeframe Workflow (HTF→LTF Process)\nPart 7: Special Models (Turtle Soup, Equity Runs)\nPart 8: Algorithmic Implementation (Python, smartmoneyconcepts library)\nPart 9: Risk Management\nPart 10: Data Schemas',
    metadata: {
      line_count: 826,
      sections: 10,
      concepts_defined: 47,
      models_described: 12,
      created: '2026-01',
      format: 'markdown',
      primary_topics: [
        'Core ICT Concepts',
        'Market Structure',
        'Price Action',
        'Time-Based Trading',
        'Execution Models',
        'Multi-Timeframe Analysis',
        'Algorithmic Detection',
        'Risk Management'
      ]
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 826,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'master_reference', 'comprehensive', 'ict', 'methodology'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-concept-relationships',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Concept Relationships YAML',
    description: 'Canonical 713-line source of truth for ICT concept relationships across 13 sections. Defines model requirements, concept dependencies, causal chains, time rules, confluence weights, anti-patterns, PD array taxonomy, IPDA ranges, entry blueprints, risk management, pair-specific rules, pre-trade validation, and trade correlations. Version 2.0, updated 2026-02-17.',
    content: '# ICT Concept Relationships - Canonical Source\n\nSections:\n1. Model Requirements (Silver Bullet, Judas Swing, OTE, Breaker Reversal, ICT 2022, Unicorn, Turtle Soup)\n2. Concept Dependencies (FVG, IFVG, OB, MSS, Liquidity, Displacement, Market Structure, OTE, SMT, Advanced PD Arrays)\n3. Causal Chains (Reversal Sequence, Power of 3, HTF→LTF)\n4. Time Rules (Killzones, Macros, Opening Prices, Silver Bullet Windows, Avoid Times)\n5. Confluence Weights (Critical: 2.5, High: 1.5, Moderate: 1.0, Penalties: -2.0)\n6. Anti-Patterns (10 common mistakes with fixes)\n7. PD Array Taxonomy (Hierarchy and relationships)\n8. IPDA Data Ranges (20/40/60 day lookback)\n9. Entry Model Blueprints (Quick reference)\n10. Risk Management (1-2% per trade, invalidation rules)\n11. Pair-Specific Rules (EUR/USD, GBP/USD, USD/JPY, XAU/USD)\n12. Pre-Trade Validation (Must-have, should-have, red flags)\n13. Trade Correlations (Winning/losing combinations)',
    metadata: {
      line_count: 713,
      sections: 13,
      version: '2.0',
      updated: '2026-02-17',
      format: 'yaml',
      primary_topics: [
        'Model Requirements',
        'Concept Dependencies',
        'Causal Chains',
        'Time Rules',
        'Confluence Scoring',
        'Anti-Patterns',
        'Validation Rules'
      ]
    },
    sources: [{
      filePath: 'knowledge_base/concept_relationships.yaml',
      lineStart: 1,
      lineEnd: 713,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'relationships', 'yaml', 'canonical', 'rules'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-ict-learning-system',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT Learning System',
    description: 'Documentation for the ICT learning and training system. Covers pattern library structure, real-time learning mechanisms, YouTube transcript ingestion pipelines, concept graph construction, and continuous improvement feedback loops. Defines how the system learns from new examples and refines its understanding of ICT concepts.',
    content: '# ICT Learning System\n\n## Pattern Library\n- Positive examples (winning trades)\n- Negative examples (losing trades)\n- Edge cases and special conditions\n- Context-dependent variations\n\n## Real-Time Learning\n- Trade execution monitoring\n- Outcome tracking and analysis\n- Pattern recognition improvement\n- Concept refinement based on results\n\n## YouTube Transcript Ingestion\n- ICT Mentorship 2022 series\n- Concept extraction from videos\n- Automated transcript processing\n- Key insight identification\n\n## Concept Graph\n- Node: Concepts, models, trades\n- Edges: Relationships, dependencies\n- Weight: Confluence scores\n- Validation: Pre-trade checklist\n\n## Continuous Improvement\n- Feedback loops from trade results\n- Confluence weight adjustment\n- Anti-pattern identification\n- Model performance tracking',
    metadata: {
      format: 'markdown',
      components: [
        'Pattern Library',
        'Real-Time Learning',
        'YouTube Ingestion',
        'Concept Graph',
        'Feedback Loops'
      ],
      integrations: [
        'Trade journal',
        'Video transcripts',
        'Concept relationships',
        'Performance metrics'
      ]
    },
    sources: [{
      filePath: 'knowledge_base/ICT_LEARNING_SYSTEM.md',
      lineStart: 1,
      lineEnd: 500,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'learning', 'system', 'ai', 'training'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-terminology',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT Terminology Glossary',
    description: 'Comprehensive ICT glossary with 30+ term definitions and 36 abbreviations. Covers all key ICT terminology from basic concepts (FVG, OB, BOS) to advanced terms (IFVG, BPR, IPDA). Each term includes definition, context of use, and related concepts.',
    content: '# ICT Terminology & Glossary\n\n## Terms (30+):\n- Fair Value Gap, Order Block, Break of Structure, Change of Character\n- Displacement, Liquidity, Premium/Discount, Optimal Trade Entry\n- Breaker Block, Mitigation Block, Balanced Price Range\n- Inversion FVG, Kill Zone, Macro, Silver Bullet\n- Market Maker Model, Power of Three, Judas Swing\n- SMT Divergence, Institutional Order Flow, PD Array Matrix\n- IPDA, CBDR, True Day, Accumulation, Distribution, Manipulation\n- Turtle Soup, Unicorn, Equity Run, Liquidity Void\n\n## Abbreviations (36):\nFVG, OB, BOS, CHoCH, SMS, BSL, SSL, OTE, HTF, LTF,\nIPDA, CBDR, PD, BPR, IFVG, SMT, IOF, NWOG, NDOG,\nMSS, MMBM, MMSM, ICT, AMD, P3, KZ, SB, JS, TS,\nHH, HL, LH, LL, ATR, R:R, SD',
    metadata: {
      terms_count: 30,
      abbreviations_count: 36,
      format: 'yaml',
      categories: ['Core Concepts', 'Advanced Concepts', 'Models', 'Time-Based', 'Structure']
    },
    sources: [{
      filePath: 'knowledge_base/terminology.yaml',
      lineStart: 1,
      lineEnd: 200,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'glossary', 'terminology', 'abbreviations', 'reference'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-knowledge-sources',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT Knowledge Sources Index',
    description: 'Master index of all ICT knowledge sources used in the knowledge engine. Catalogs YouTube mentorship series, transcripts, processed documents, schemas, code modules, and external references with their status, quality rating, and coverage mapping.',
    content: '# ICT Knowledge Sources\n\n## Source Categories:\n- YouTube Mentorship Series (2022, 2023, 2024)\n- Processed Transcripts\n- Community Analysis Documents\n- Schema Definitions\n- Code Implementations\n- Concept Relationship Maps\n\n## Coverage:\n- Core Concepts: 100%\n- Advanced Concepts: 95%\n- Execution Models: 90%\n- Time-Based Trading: 85%\n- Risk Management: 80%',
    metadata: {
      format: 'markdown',
      source_categories: 6,
      coverage_tracking: true
    },
    sources: [{
      filePath: 'knowledge_base/ICT_KNOWLEDGE_SOURCES.md',
      lineStart: 1,
      lineEnd: 150,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'index', 'sources', 'catalog', 'coverage'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-concept-graph',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT Concept Graph',
    description: 'JSON concept graph with 100 nodes and 216 edges representing the complete ICT methodology knowledge structure. Includes 4 learning paths (beginner→advanced), concept clustering by domain, prerequisite chains, and weighted edges for confluence scoring. Nodes represent concepts/models/tools, edges represent relationships (depends-on, confirms, invalidates, precedes).',
    content: '# ICT Concept Graph\n\n## Statistics:\n- Nodes: 100 (concepts, models, tools, sessions)\n- Edges: 216 (relationships between nodes)\n- Learning Paths: 4\n\n## Node Categories:\n- Core Concepts (25 nodes): FVG, OB, BOS, CHoCH, Liquidity, etc.\n- Advanced Concepts (20 nodes): IFVG, BPR, Breaker, Mitigation, etc.\n- Execution Models (15 nodes): Silver Bullet, Judas Swing, ICT 2022, etc.\n- Time-Based (15 nodes): Killzones, Macros, CBDR, IPDA, etc.\n- Tools (10 nodes): SMT, IOF, Displacement, OTE, etc.\n- Sessions/Pairs (15 nodes): London, NY, Forex pairs, etc.\n\n## Learning Paths:\n1. Beginner: Market Structure → Liquidity → FVG → OB\n2. Intermediate: BOS/CHoCH → Displacement → PD Arrays → OTE\n3. Advanced: Models → Multi-TF → Confluence → Risk\n4. Expert: Market Maker Models → IPDA → Intermarket → Live Execution\n\n## Edge Types:\n- depends-on (78 edges)\n- confirms (52 edges)\n- invalidates (28 edges)\n- precedes (34 edges)\n- part-of (24 edges)',
    metadata: {
      format: 'json',
      nodes: 100,
      edges: 216,
      learning_paths: 4,
      edge_types: 5,
      node_categories: 6
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 800,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'graph', 'concepts', 'relationships', 'learning_paths'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-ict-advanced-concepts',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT Advanced Concepts',
    description: 'Deep dive into advanced ICT concepts including Inversion Fair Value Gaps (IFVG), Standard Deviation projections, and specialized block types: Propulsion Blocks (continuation), Rejection Blocks (reversal wicks), and Vacuum Blocks (unfilled gaps acting as magnets). Each concept includes identification rules, trading applications, and examples.',
    content: '# ICT Advanced Concepts\n\n## IFVG (Inversion Fair Value Gap)\n- FVG that gets traded through and flips polarity\n- Former resistance becomes support (and vice versa)\n- High-probability re-entry point\n\n## Standard Deviation Projections\n- Used with CBDR range for target projection\n- 1SD, 2SD, 2.5SD, 3SD, 4SD levels\n- Asian range * multiplier for session targets\n\n## Propulsion Block\n- Consolidation within a displacement move\n- Acts as continuation point\n- Found within strong trending moves\n\n## Rejection Block\n- Formed by long wicks rejecting a level\n- Wick body becomes the zone\n- Strong reversal signal at key levels\n\n## Vacuum Block\n- Unfilled gap that acts as price magnet\n- Price drawn to fill the vacuum\n- Often found in session gaps',
    metadata: {
      format: 'markdown',
      concepts: ['IFVG', 'Standard Deviation', 'Propulsion Block', 'Rejection Block', 'Vacuum Block'],
      difficulty: 'advanced'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/ICT_ADVANCED_CONCEPTS.md',
      lineStart: 1,
      lineEnd: 300,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'advanced', 'ifvg', 'blocks'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-a-plus-setup',
    type: 'document',
    domain: 'knowledge_base',
    name: 'A+ Setup Template',
    description: 'Ashton\'s A+ trade setup template with real +$691 trade example. Documents the complete checklist for qualifying an A+ setup: HTF bias alignment, killzone timing, displacement + FVG, OB confluence, OTE zone entry, SMT divergence, and minimum 3R target. Includes annotated trade walkthrough.',
    content: '# A+ Setup Template\n\n## A+ Criteria Checklist:\n1. HTF Bias: Clear daily/4H direction\n2. Killzone: Trading within active session\n3. Displacement: Strong impulsive move creating FVG\n4. FVG: Fair Value Gap for entry\n5. OB: Order Block alignment with FVG\n6. OTE: Entry within 62-79% retracement\n7. SMT: Divergence confirmation on correlated pair\n8. Target: Minimum 3R risk-reward\n\n## Real Trade Example: +$691\n- Pair: EUR/USD\n- Session: NY AM Kill Zone\n- Model: Silver Bullet\n- HTF Bias: Bearish (Daily BOS)\n- Entry: Short at FVG 50% within OB\n- Confluences: 6/8 (FVG + OB + OTE + KZ + Displacement + BOS)\n- Grade: A+\n- Result: +3.2R, +$691',
    metadata: {
      format: 'markdown',
      trade_result: '+$691',
      grade: 'A+',
      confluences: 6,
      r_multiple: 3.2
    },
    sources: [{
      filePath: 'knowledge_base/concepts/a_plus_setup_template.md',
      lineStart: 1,
      lineEnd: 150,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'setup', 'a_plus', 'template', 'trade_example'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-advanced-inversion',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Advanced Inversion Concepts',
    description: 'Advanced document covering IFVG (Inversion Fair Value Gaps), BPR (Balanced Price Range), and Reclaimed Order Blocks. Explains how PD arrays change polarity when violated, creating high-probability re-entry zones. Includes detection rules, trading rules, and common mistakes.',
    content: '# Advanced Inversion Concepts\n\n## IFVG (Inversion FVG)\n- FVG that price trades through completely\n- Polarity flips: bullish FVG becomes bearish zone\n- Re-entry on retest of inverted zone\n- Higher probability than original FVG\n\n## BPR (Balanced Price Range)\n- Overlapping bullish + bearish FVG at same level\n- Creates balanced/fair value zone\n- Strong support/resistance\n- Equilibrium point for institutional activity\n\n## Reclaimed Order Block\n- OB that was broken then reclaimed\n- Similar to breaker but price returns inside\n- Enhanced confluence when combined with IFVG\n- Requires displacement on reclaim',
    metadata: {
      format: 'markdown',
      concepts: ['IFVG', 'BPR', 'Reclaimed OB'],
      difficulty: 'advanced'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/advanced_inversion_concepts.md',
      lineStart: 1,
      lineEnd: 200,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'advanced', 'inversion', 'ifvg', 'bpr'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-advanced-pd-arrays',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Advanced PD Arrays',
    description: 'Detailed documentation of advanced Premium/Discount Array types: Volume Imbalance (gap between candle bodies), Rejection Blocks (wick-based zones), Propulsion Blocks (continuation within displacement), Suspension Blocks (consolidation in trend), and Vacuum Blocks (unfilled magnets). Includes priority rankings and confluence rules.',
    content: '# Advanced PD Arrays\n\n## Volume Imbalance\n- Gap between close of one candle and open of next\n- Body-to-body gap (not wick-based like FVG)\n- Often filled quickly, acts as short-term magnet\n\n## Rejection Block\n- Zone defined by long wick rejection\n- Wick body = zone boundaries\n- Strong at HTF levels and session extremes\n\n## Propulsion Block\n- Small consolidation within displacement\n- Continuation signal within strong moves\n- Entry on retest during pullback\n\n## Suspension Block\n- Pause/consolidation within trending move\n- Price suspends before continuing\n- Lower probability than Propulsion\n\n## Vacuum Block\n- Unfilled gap acting as price magnet\n- Session gaps, NWOG/NDOG variants\n- Price drawn to fill these levels\n\n## PD Array Priority (Advanced):\n1. Order Block\n2. FVG\n3. Breaker\n4. Rejection Block\n5. Propulsion Block\n6. Volume Imbalance\n7. Vacuum Block',
    metadata: {
      format: 'markdown',
      pd_array_types: ['Volume Imbalance', 'Rejection Block', 'Propulsion Block', 'Suspension Block', 'Vacuum Block'],
      difficulty: 'advanced'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/advanced_pd_arrays.md',
      lineStart: 1,
      lineEnd: 250,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'advanced', 'pd_arrays', 'volume_imbalance', 'blocks'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-cbdr-concept',
    type: 'document',
    domain: 'knowledge_base',
    name: 'CBDR Concept',
    description: 'Central Bank Dealers Range (CBDR) documentation. CBDR spans 2PM-8PM EST, typical range 20-30 pips. Used with Standard Deviation projections (1SD-4SD) for session targets. Includes range calculation, SD projection methodology, and application with Asian range for London/NY session targets.',
    content: '# CBDR - Central Bank Dealers Range\n\n## Definition:\n- Time: 2:00 PM - 8:00 PM EST (14:00-20:00)\n- Typical Range: 20-30 pips\n- Purpose: Defines institutional accumulation range\n\n## Standard Deviation Projections:\n- 1SD: CBDR range * 1 (from high/low)\n- 2SD: CBDR range * 2\n- 2.5SD: CBDR range * 2.5\n- 3SD: CBDR range * 3\n- 4SD: CBDR range * 4\n\n## Application:\n1. Mark CBDR high and low\n2. Calculate range in pips\n3. Project SD levels above/below\n4. Use as session targets\n5. Combine with Asian range for confirmation\n\n## Key Rules:\n- Range < 40 pips: Valid for SD projection\n- Range > 40 pips: May indicate early expansion\n- Best with London/NY sessions\n- Combine with HTF bias for direction',
    metadata: {
      format: 'markdown',
      time_range: '14:00-20:00 EST',
      typical_range_pips: '20-30',
      sd_levels: ['1SD', '2SD', '2.5SD', '3SD', '4SD']
    },
    sources: [{
      filePath: 'knowledge_base/concepts/cbdr.md',
      lineStart: 1,
      lineEnd: 120,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'cbdr', 'standard_deviation', 'time_based'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-concepts-models-processed',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT Concepts & Models Processed',
    description: 'Processed reference document covering the ICT Liquidity Framework, Order Blocks, Fair Value Gaps, and Kill Zones in structured format. Synthesized from multiple mentorship sources into a single cohesive document with detection rules, trading rules, and implementation notes for each concept.',
    content: '# ICT Concepts & Models - Processed Reference\n\n## Liquidity Framework:\n- BSL/SSL identification\n- Engineered liquidity (equal highs/lows)\n- Liquidity sweeps as entry triggers\n- Smart money vs retail liquidity\n\n## Order Blocks:\n- Bullish OB: Last bearish candle before bullish displacement\n- Bearish OB: Last bullish candle before bearish displacement\n- Mitigation rules and timeframe hierarchy\n\n## Fair Value Gaps:\n- Three-candle pattern detection\n- Consequent encroachment (50%)\n- IFVG identification and trading\n\n## Kill Zones:\n- London: 2:00-5:00 AM EST\n- NY AM: 9:30-12:00 PM EST\n- NY PM: 1:30-4:00 PM EST\n- Asian: 8:00 PM-12:00 AM EST',
    metadata: {
      format: 'markdown',
      topics: ['Liquidity Framework', 'Order Blocks', 'FVGs', 'Kill Zones'],
      processing_status: 'complete'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/ict_concepts_models_processed.md',
      lineStart: 1,
      lineEnd: 400,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'processed', 'liquidity', 'ob', 'fvg', 'killzones'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-macros-detailed',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT Macros Detailed',
    description: 'Detailed documentation of ICT macro time windows: 9:50-10:10, 10:50-11:10, 1:50-2:10, and 3:15-3:45 EST. Each macro window is a specific 20-minute period where algorithmic activity creates predictable price runs. Includes purpose, typical behavior, and how to trade around each macro.',
    content: '# ICT Macro Windows - Detailed Guide\n\n## Macro Windows (EST):\n\n### Macro 1: 9:50 - 10:10 AM\n- Purpose: Initial liquidity grab after market open\n- Behavior: Price runs one direction to sweep stops\n- Trading: Wait for sweep, then look for reversal\n\n### Macro 2: 10:50 - 11:10 AM\n- Purpose: Mid-morning algorithmic recalibration\n- Behavior: Often creates Silver Bullet setup\n- Trading: FVG entry during this window\n\n### Macro 3: 1:50 - 2:10 PM\n- Purpose: Afternoon session initiation\n- Behavior: Liquidity sweep before PM expansion\n- Trading: PM Silver Bullet window overlap\n\n### Macro 4: 3:15 - 3:45 PM\n- Purpose: End-of-day positioning\n- Behavior: Final algorithmic price run\n- Trading: Last chance setups, often volatile\n\n## Key Rules:\n- Each macro is approximately 20 minutes\n- Expect liquidity sweeps during macro windows\n- Best setups form at macro boundaries\n- Combine with killzone for confluence',
    metadata: {
      format: 'markdown',
      macro_windows: ['9:50-10:10', '10:50-11:10', '1:50-2:10', '3:15-3:45'],
      window_duration_minutes: 20
    },
    sources: [{
      filePath: 'knowledge_base/concepts/ict_macros_detailed.md',
      lineStart: 1,
      lineEnd: 180,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'macros', 'time_windows', 'algorithmic'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-market-structure-breaks',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT Market Structure Breaks Processed',
    description: 'Processed document distinguishing Natural vs Classic market structure breaks. Natural breaks occur with displacement and volume, representing genuine institutional activity. Classic breaks are simple swing point violations. Covers BOS, CHoCH, SMS classification with confirmation requirements for each type.',
    content: '# Market Structure Breaks - Natural vs Classic\n\n## Natural Break (Institutional):\n- Accompanied by displacement candle\n- Volume spike confirmation\n- Creates FVG in the process\n- Higher probability reversal/continuation\n- Used for A+ setups\n\n## Classic Break (Simple):\n- Price simply crosses swing level\n- No displacement requirement\n- May or may not create FVG\n- Lower probability signal\n- Needs additional confluence\n\n## BOS Classification:\n- Natural BOS: Close beyond swing with displacement\n- Classic BOS: Any close beyond swing\n\n## CHoCH Classification:\n- Natural CHoCH: First counter-trend break with displacement\n- Classic CHoCH: First counter-trend break (any)\n\n## SMS (Shift in Market Structure):\n- Always requires displacement\n- CHoCH + displacement = SMS\n- Strongest reversal signal\n- Minimum 2x ATR displacement candle',
    metadata: {
      format: 'markdown',
      break_types: ['Natural', 'Classic'],
      structure_events: ['BOS', 'CHoCH', 'SMS'],
      processing_status: 'complete'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/ict_market_structure_breaks_processed.md',
      lineStart: 1,
      lineEnd: 200,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'processed', 'market_structure', 'bos', 'choch', 'sms'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-intermarket',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Intermarket Analysis',
    description: 'ICT Intermarket Analysis covering SMT (Smart Money Technique) divergence and DXY correlations. Explains how to use correlated pairs (EUR/USD vs GBP/USD, DXY inverse correlation) for trade confirmation. SMT divergence occurs when correlated pairs fail to make corresponding highs/lows, signaling reversal.',
    content: '# Intermarket Analysis\n\n## SMT Divergence:\n- Compare correlated pairs for divergent behavior\n- If EUR/USD makes new low but GBP/USD does NOT → Bullish SMT\n- If EUR/USD makes new high but GBP/USD does NOT → Bearish SMT\n- Strongest at key liquidity levels\n\n## DXY Correlations:\n- EUR/USD: Inverse to DXY\n- GBP/USD: Inverse to DXY\n- USD/JPY: Positive with DXY\n- XAU/USD: Inverse to DXY (mostly)\n\n## Application:\n1. Check DXY structure for dollar bias\n2. Confirm with correlated pair divergence\n3. Use SMT as confluence for entry\n4. Higher timeframe SMT = stronger signal\n\n## Common SMT Pairs:\n- EUR/USD ↔ GBP/USD\n- EUR/USD ↔ DXY (inverse)\n- NQ ↔ ES (equity indices)\n- XAU/USD ↔ DXY (inverse)',
    metadata: {
      format: 'markdown',
      topics: ['SMT Divergence', 'DXY Correlations'],
      pairs: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'XAU/USD', 'DXY']
    },
    sources: [{
      filePath: 'knowledge_base/concepts/intermarket_analysis.md',
      lineStart: 1,
      lineEnd: 150,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'intermarket', 'smt', 'dxy', 'correlations'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-ifvg',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Inversion Fair Value Gap',
    description: 'Dedicated document on IFVG (Inversion Fair Value Gap) identification and trading. An IFVG forms when price trades completely through an existing FVG, flipping its polarity. The former support becomes resistance and vice versa. Includes identification steps, entry rules, stop placement, and real examples.',
    content: '# Inversion Fair Value Gap (IFVG)\n\n## Definition:\n- A Fair Value Gap that has been completely traded through\n- Polarity inverts: bullish FVG becomes bearish zone\n- Higher probability than original untested FVG\n\n## Identification Steps:\n1. Identify existing FVG (bullish or bearish)\n2. Wait for price to trade completely through the FVG\n3. The FVG zone now becomes an inverted zone\n4. Look for price to return to the IFVG zone\n5. Entry on retest of the inverted zone\n\n## Trading Rules:\n- Bullish IFVG: Former bearish FVG, now acts as support\n- Bearish IFVG: Former bullish FVG, now acts as resistance\n- Entry: On first retest of IFVG zone\n- Stop: Beyond the IFVG boundary\n- Target: Next PD array or liquidity level\n\n## Key Notes:\n- IFVG within OB = highest probability\n- HTF IFVG > LTF IFVG in reliability\n- Best during active killzone\n- Combine with displacement for A+ setup',
    metadata: {
      format: 'markdown',
      concept: 'IFVG',
      difficulty: 'advanced',
      trading_rules: ['Entry on retest', 'Stop beyond boundary', 'Target at next PD array']
    },
    sources: [{
      filePath: 'knowledge_base/concepts/inversion_fair_value_gap.md',
      lineStart: 1,
      lineEnd: 120,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'ifvg', 'inversion', 'fvg', 'advanced'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-ipda',
    type: 'document',
    domain: 'knowledge_base',
    name: 'IPDA Core Theory',
    description: 'Core theory document on IPDA (Interbank Price Delivery Algorithm). Explains IPDA as the institutional algorithm that drives price delivery between PD arrays. Covers how IPDA seeks liquidity, delivers price to PD arrays, operates on 20/40/60 day data ranges, and creates the algorithmic price runs observed in macro windows.',
    content: '# IPDA - Interbank Price Delivery Algorithm\n\n## Core Theory:\n- IPDA is the algorithm that delivers price between institutional levels\n- Seeks liquidity pools (BSL/SSL) for execution\n- Delivers price to PD Arrays for institutional entry\n- Operates on cyclical data ranges (20/40/60 day)\n\n## How IPDA Works:\n1. Identify premium/discount zones from HTF\n2. Seek liquidity in one direction (manipulation)\n3. Deliver price to PD array in opposite direction\n4. Fill institutional orders at optimal levels\n5. Expand to next target (distribution)\n\n## IPDA Data Ranges:\n- 20-day: Short-term institutional memory\n- 40-day: Medium-term price objectives\n- 60-day: Long-term institutional targets\n\n## Key Principles:\n- Price is not random; it follows algorithmic rules\n- IPDA respects PD arrays from higher timeframes first\n- Macro windows are IPDA execution periods\n- Every swing has a purpose in IPDA context',
    metadata: {
      format: 'markdown',
      concept: 'IPDA',
      data_ranges: [20, 40, 60],
      difficulty: 'advanced'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/ipda.md',
      lineStart: 1,
      lineEnd: 150,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'ipda', 'algorithm', 'institutional', 'core_theory'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-ipda-data-ranges',
    type: 'document',
    domain: 'knowledge_base',
    name: 'IPDA Data Ranges',
    description: 'Detailed documentation of IPDA 20/40/60 day lookback data ranges. Explains how institutional algorithms reference specific historical periods (20-day for near-term, 40-day for intermediate, 60-day for strategic) to identify liquidity targets, PD arrays, and price objectives. Includes calculation methods and application examples.',
    content: '# IPDA Data Ranges - 20/40/60 Day Lookback\n\n## 20-Day Range (Short-Term):\n- Lookback: Last 20 trading days\n- Purpose: Near-term liquidity targets\n- PD Arrays: Most recently formed, highest priority\n- Use: Intraday and short swing trades\n\n## 40-Day Range (Intermediate):\n- Lookback: Last 40 trading days\n- Purpose: Medium-term price objectives\n- PD Arrays: Intermediate institutional levels\n- Use: Swing trades (days to weeks)\n\n## 60-Day Range (Strategic):\n- Lookback: Last 60 trading days (approx. 1 quarter)\n- Purpose: Long-term strategic targets\n- PD Arrays: Major institutional reference points\n- Use: Position trades, HTF bias\n\n## Calculation:\n1. Mark high and low of N-day range\n2. Identify all PD arrays within range\n3. Map liquidity levels (BSL/SSL)\n4. Premium zone: Above 50% of range\n5. Discount zone: Below 50% of range\n\n## Application:\n- HTF bias from 60-day range direction\n- Targets from 40-day PD arrays\n- Entry triggers from 20-day structures',
    metadata: {
      format: 'markdown',
      ranges: ['20-day', '40-day', '60-day'],
      concept: 'IPDA Data Ranges'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/ipda_data_ranges.md',
      lineStart: 1,
      lineEnd: 160,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'ipda', 'data_ranges', 'lookback', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-ipda-theory',
    type: 'document',
    domain: 'knowledge_base',
    name: 'IPDA Theory - Institutional AI',
    description: 'Theoretical framework for IPDA as institutional AI/algorithm. Proposes that IPDA operates as an automated price delivery system used by central banks and market makers. Covers IPDA decision tree, order flow routing, liquidity seeking behavior, and how it creates the predictable patterns ICT traders exploit.',
    content: '# IPDA Theory - The Institutional Algorithm\n\n## IPDA as AI:\n- Not a single algorithm but a framework of institutional execution\n- Central banks and market makers use algorithmic execution\n- Creates predictable patterns in price delivery\n- ICT methodology reverse-engineers these patterns\n\n## IPDA Decision Tree:\n1. Assess current market position (premium/discount)\n2. Identify nearest unmitigated PD arrays\n3. Seek liquidity for order execution\n4. Deliver price to PD array for fills\n5. Continue to next objective\n\n## Order Flow Routing:\n- Retail orders cluster at obvious levels\n- IPDA routes price to collect these orders\n- Stop hunts = liquidity collection\n- Fake breakouts = manipulation phase\n\n## Predictable Patterns:\n- Power of Three (AMD) cycle\n- Time-based execution (killzones, macros)\n- PD array respect in order of priority\n- Multi-timeframe alignment',
    metadata: {
      format: 'markdown',
      concept: 'IPDA Theory',
      framework: 'Institutional AI',
      difficulty: 'advanced'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/ipda_theory.md',
      lineStart: 1,
      lineEnd: 180,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'ipda', 'theory', 'institutional', 'algorithm', 'ai'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-market-maker-concepts',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Market Maker Models Overview',
    description: 'Overview of Market Maker Buy Model (MMBM) and Market Maker Sell Model (MMSM). Explains the complete market maker cycle: accumulation, manipulation (Judas swing), distribution (true move). Covers the buy model (smart money accumulating longs) and sell model (smart money distributing/shorting) with phase identification.',
    content: '# Market Maker Models - MMBM & MMSM\n\n## Market Maker Buy Model (MMBM):\n- Smart money accumulating long positions\n- Phase 1: Accumulation (Asian/early session range)\n- Phase 2: Manipulation (fake selloff to sweep SSL)\n- Phase 3: Distribution (true bullish expansion)\n- Phase 4: Re-distribution/profit taking\n\n## Market Maker Sell Model (MMSM):\n- Smart money distributing/building short positions\n- Phase 1: Accumulation (range-bound)\n- Phase 2: Manipulation (fake rally to sweep BSL)\n- Phase 3: Distribution (true bearish expansion)\n- Phase 4: Re-accumulation at lower prices\n\n## Identification:\n- HTF: Determine which model is active (bias)\n- LTF: Identify current phase\n- Entry: After manipulation phase completes\n- Exit: During distribution phase\n\n## Key Rules:\n- MMBM: Look for SSL sweep → bullish displacement → FVG\n- MMSM: Look for BSL sweep → bearish displacement → FVG\n- Combine with killzone timing\n- AMD (Accumulation-Manipulation-Distribution) pattern',
    metadata: {
      format: 'markdown',
      models: ['MMBM', 'MMSM'],
      phases: ['Accumulation', 'Manipulation', 'Distribution'],
      difficulty: 'intermediate'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/market_maker_models.md',
      lineStart: 1,
      lineEnd: 200,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'market_maker', 'mmbm', 'mmsm', 'amd'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-missing-checklist',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Missing Concepts Checklist',
    description: 'Coverage checklist tracking which ICT concepts have been fully documented, partially covered, or are missing from the knowledge base. Used for maintaining completeness and identifying gaps in the knowledge engine\'s coverage of ICT methodology.',
    content: '# Missing Concepts Checklist\n\n## Fully Documented:\n- [x] FVG, IFVG, BPR\n- [x] Order Block, Breaker, Mitigation\n- [x] BOS, CHoCH, SMS\n- [x] Liquidity (BSL/SSL)\n- [x] Kill Zones, Macros\n- [x] Silver Bullet, Judas Swing\n- [x] OTE, Premium/Discount\n- [x] SMT Divergence\n\n## Partially Covered:\n- [ ] NWOG/NDOG (needs examples)\n- [ ] Volume Imbalance (needs detection code)\n- [ ] Turtle Soup (needs backtesting data)\n- [ ] Unicorn Model (needs full walkthrough)\n\n## Missing/Needs Work:\n- [ ] Seasonal Tendencies\n- [ ] COT Data Integration\n- [ ] News Event Filters\n- [ ] Advanced Position Sizing\n- [ ] Correlation Matrix Updates\n- [ ] Backtesting Framework',
    metadata: {
      format: 'markdown',
      fully_documented: 8,
      partially_covered: 4,
      missing: 6,
      last_audit: '2026-02'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/missing_concepts_checklist.md',
      lineStart: 1,
      lineEnd: 80,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'checklist', 'coverage', 'audit', 'gaps'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-sibi-bisi',
    type: 'document',
    domain: 'knowledge_base',
    name: 'SIBI & BISI ICT Transcript',
    description: 'Transcript-based document covering SIBI (Sell-side Imbalance Buy-side Inefficiency) and BISI (Buy-side Imbalance Sell-side Inefficiency) — ICT\'s formal names for bearish and bullish FVGs respectively. Explains the institutional perspective: SIBI = bearish FVG where selling overpowered buying, BISI = bullish FVG where buying overpowered selling.',
    content: '# SIBI & BISI - ICT Transcript\n\n## SIBI (Sell-side Imbalance, Buy-side Inefficiency):\n- Formal ICT name for Bearish FVG\n- Selling pressure overpowered buying\n- Creates inefficiency gap favoring sellers\n- Price should return to fill (partially or fully)\n- Acts as resistance/supply zone\n\n## BISI (Buy-side Imbalance, Sell-side Inefficiency):\n- Formal ICT name for Bullish FVG\n- Buying pressure overpowered selling\n- Creates inefficiency gap favoring buyers\n- Price should return to fill\n- Acts as support/demand zone\n\n## Consequent Encroachment:\n- 50% level of SIBI/BISI\n- Key retracement target within the gap\n- Often acts as precise entry point\n\n## Key Insights from Transcript:\n- ICT emphasizes SIBI/BISI over simple FVG terminology\n- Institutional framing helps understand why gaps form\n- Imbalance = institutional urgency\n- Inefficiency = unfilled orders waiting',
    metadata: {
      format: 'markdown',
      concepts: ['SIBI', 'BISI', 'Consequent Encroachment'],
      source_type: 'transcript'
    },
    sources: [{
      filePath: 'knowledge_base/concepts/sibi_bisi_ict.md',
      lineStart: 1,
      lineEnd: 130,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'concepts', 'sibi', 'bisi', 'fvg', 'transcript'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-ashton-cbdr-asia',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Ashton CBDR + Asia Method',
    description: 'Ashton\'s personal CBDR + Asian range combination method. Combines CBDR (2PM-8PM) with Asian range (8PM-12AM) for enhanced Standard Deviation projections. Uses the larger of the two ranges for SD calculations, with specific rules for London and NY session target projection.',
    content: '# Ashton\'s CBDR + Asia Method\n\n## Method Overview:\n- Combine CBDR and Asian range for better SD projections\n- Use larger range for more conservative targets\n- Apply to London and NY sessions\n\n## Steps:\n1. Mark CBDR range (2PM-8PM EST)\n2. Mark Asian range (8PM-12AM EST)\n3. Use the LARGER range for SD projections\n4. Project SD levels from both ranges\n5. Confluence where both SD levels align\n\n## SD Projections:\n- 1SD: Conservative first target\n- 2SD: Standard session target\n- 2.5SD: Extended target\n- 3SD: Exceptional expansion\n- 4SD: Rare, volatile sessions only\n\n## Key Rules:\n- If CBDR > Asian: Market showing early hand\n- If Asian > CBDR: Normal conditions\n- Best when both ranges < 40 pips each\n- SD confluence (both ranges project same level) = high probability',
    metadata: {
      format: 'markdown',
      method: 'CBDR + Asian Range',
      author: 'Ashton',
      ranges: ['CBDR', 'Asian'],
      sd_levels: ['1SD', '2SD', '2.5SD', '3SD', '4SD']
    },
    sources: [{
      filePath: 'knowledge_base/models/ashton_cbdr_asia_method.md',
      lineStart: 1,
      lineEnd: 120,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'cbdr', 'asian_range', 'standard_deviation', 'personal_method'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-2022-mentorship',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT 2022 Mentorship',
    description: '41-episode breakdown of the ICT 2022 Mentorship YouTube series. Each episode summarized with key concepts taught, timestamps for critical lessons, and extracted trading rules. Covers the complete progression from market structure basics through advanced model execution.',
    content: '# ICT 2022 Mentorship - 41 Episode Breakdown\n\n## Series Overview:\n- 41 episodes covering complete ICT methodology\n- Progressive learning from basics to advanced\n- Real chart examples and live analysis\n\n## Episode Categories:\n- Episodes 1-10: Market Structure Foundations\n- Episodes 11-20: PD Arrays & Liquidity\n- Episodes 21-30: Execution Models\n- Episodes 31-41: Advanced Application & Live Trading\n\n## Key Episodes:\n- Ep 3: Market Structure (BOS/CHoCH)\n- Ep 7: Fair Value Gaps\n- Ep 12: Order Blocks\n- Ep 18: Kill Zones & Time\n- Ep 22: Silver Bullet Model\n- Ep 28: ICT 2022 Model\n- Ep 35: Market Maker Models\n- Ep 41: Putting It All Together\n\n## Extracted Rules:\n- 47 core trading rules identified\n- 12 model-specific checklists\n- 23 anti-pattern warnings',
    metadata: {
      format: 'markdown',
      episodes: 41,
      source: 'YouTube',
      year: 2022,
      rules_extracted: 47,
      models_covered: 12
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_2022_mentorship.md',
      lineStart: 1,
      lineEnd: 500,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'mentorship', '2022', 'youtube', 'episodes', 'comprehensive'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-2026-smart-money',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT 2026 Smart Money Jan 06',
    description: 'Live tape reading session from January 6, 2026. Documents real-time ICT analysis including market structure identification, liquidity mapping, PD array detection, and trade execution with commentary. Demonstrates how to apply ICT concepts in live market conditions.',
    content: '# ICT 2026 Smart Money - January 06 Live Tape Reading\n\n## Session Overview:\n- Date: January 6, 2026\n- Session: NY AM Kill Zone\n- Focus: Live tape reading with ICT concepts\n\n## Analysis Flow:\n1. HTF Bias: Daily bearish (BOS to downside)\n2. H4 Structure: Lower highs, lower lows\n3. Liquidity Map: BSL above equal highs at 1.0950\n4. PD Arrays: Bearish OB at 1.0935, FVG 1.0920-1.0930\n5. Macro Window: 9:50 AM sweep of 1.0940\n6. Entry: Short at FVG 50% (1.0925)\n7. Stop: Above OB (1.0940)\n8. Target: SSL at 1.0880\n\n## Key Observations:\n- Market respected 40-day IPDA range\n- CBDR projected 2.5SD target aligned with SSL\n- SMT confirmed with GBP/USD divergence\n- Displacement candle at 10:02 AM',
    metadata: {
      format: 'markdown',
      date: '2026-01-06',
      session: 'NY_AM',
      type: 'live_tape_reading',
      pair: 'EUR/USD'
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_2026_smart_money_jan_06.md',
      lineStart: 1,
      lineEnd: 200,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'live_trading', '2026', 'tape_reading', 'smart_money'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-model-12-transcript',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Charter Price Action Model 12',
    description: '594-line transcript of ICT Charter Price Action Model 12. Covers the scalping model focused on FVG/OB confluence within macro windows. Detailed execution rules for 1-5 minute timeframe entries with specific entry triggers, stop placement, and partial profit rules.',
    content: '# ICT Charter Price Action Model 12 - Transcript\n\n## Model Overview (594 lines):\n- Scalping model for intraday execution\n- Timeframe: 1-5 minute charts\n- Focus: FVG/OB confluence at macro times\n\n## Execution Rules:\n- Entry: M1/M5 FVG within OB zone during macro\n- Stop: Beyond OB boundary (tight)\n- Target 1: Next LTF PD array (partial)\n- Target 2: HTF PD array (runner)\n\n## Key Components:\n1. Pre-session: Mark HTF levels (H4/D1)\n2. Identify killzone and macro windows\n3. Wait for displacement at macro time\n4. Enter at FVG within OB\n5. Scale out at predefined targets\n\n## Partial Profit Rules:\n- 50% off at 1R\n- 25% off at 2R\n- 25% runner to HTF target\n- Move stop to breakeven after 1R\n\n## Specific Triggers:\n- FVG must form within 3 candles of OB\n- Displacement candle > 2x M5 ATR\n- Must be within active macro window\n- HTF bias alignment required',
    metadata: {
      format: 'markdown',
      line_count: 594,
      model_number: 12,
      timeframe: 'M1-M5',
      type: 'scalping',
      source_type: 'transcript'
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_charter_price_action_model_12.md',
      lineStart: 1,
      lineEnd: 594,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'model_12', 'scalping', 'transcript', 'fvg', 'ob'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-model-7-tape',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Charter Price Action Model 7',
    description: 'ICT Charter Price Action Model 7 documentation. Mid-timeframe model operating on H1/M15 charts focusing on kill zone entries with OTE retracement into PD arrays. Includes tape reading methodology and real-time decision framework.',
    content: '# ICT Charter Price Action Model 7\n\n## Model Specifications:\n- Timeframe: H1 for structure, M15 for entry\n- Session: London and NY AM kill zones\n- Style: Intraday swing (hold 2-8 hours)\n\n## Setup Requirements:\n1. H1 BOS/CHoCH establishing direction\n2. M15 pullback into OTE zone (62-79%)\n3. FVG or OB within OTE zone\n4. Kill zone timing (London or NY AM)\n5. Displacement confirmation on entry TF\n\n## Tape Reading Framework:\n- Read price from left to right\n- Identify where liquidity rests\n- Note displacement candles\n- Track PD array interactions\n- Observe time alignment\n\n## Risk Management:\n- Stop: Beyond M15 swing structure\n- Target 1: H1 PD array (2R minimum)\n- Target 2: H4 liquidity level (3R+)\n- Max risk: 1.5% per trade',
    metadata: {
      format: 'markdown',
      model_number: 7,
      timeframe: 'H1/M15',
      style: 'intraday_swing'
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_charter_price_action_model_7.md',
      lineStart: 1,
      lineEnd: 300,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'model_7', 'intraday', 'tape_reading'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-model-7-trade-plan',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Model 7 Trade Plan',
    description: '500-line trade plan template for ICT Model 7. Complete pre-trade planning document including daily bias determination, session preparation checklist, entry criteria, risk parameters, target identification, and post-trade review framework.',
    content: '# Model 7 Trade Plan (500 lines)\n\n## Pre-Session:\n1. Daily bias from D1/H4 structure\n2. Mark key H4 PD arrays\n3. Identify H1 swing levels\n4. Map liquidity (BSL/SSL)\n5. Note IPDA data range levels\n\n## Session Preparation:\n- CBDR range marked\n- Asian range marked\n- SD projections calculated\n- News events checked\n- Correlated pairs reviewed (SMT)\n\n## Entry Criteria:\n- [ ] H1 BOS/CHoCH confirmed\n- [ ] M15 OTE zone reached (62-79%)\n- [ ] FVG or OB present in OTE\n- [ ] Kill zone active\n- [ ] Displacement candle formed\n- [ ] Confluence score >= 5.0\n- [ ] Risk <= 1.5%\n\n## Trade Management:\n- Entry → 1R: Hold full position\n- 1R hit: Close 50%, move stop to BE\n- 2R hit: Close 25%\n- Runner: Trail to H4 target\n\n## Post-Trade Review:\n- Screenshot entry and exit\n- Grade the setup (A+/A/B/C)\n- Note what worked/didn\'t\n- Update pattern library\n- Adjust confluence weights if needed',
    metadata: {
      format: 'markdown',
      line_count: 500,
      model_number: 7,
      sections: ['Pre-Session', 'Session Prep', 'Entry Criteria', 'Management', 'Review']
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_charter_price_action_model_7_trade_plan.md',
      lineStart: 1,
      lineEnd: 500,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'model_7', 'trade_plan', 'checklist', 'template'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-model-7-universal',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Model 7 Universal Application',
    description: '529-line document on universal application of ICT Model 7 across all markets. Covers adaptation for Forex, Indices (NQ/ES), Crypto, and Commodities with pair-specific modifications for killzone timing, pip calculations, volatility adjustments, and session-specific rules.',
    content: '# Model 7 - Universal Application (529 lines)\n\n## Forex Application:\n- Standard killzone times (EST)\n- Pip-based calculations\n- SMT across correlated pairs\n- DXY correlation for USD pairs\n\n## Indices (NQ/ES) Application:\n- Modified killzone: 9:30 AM open focus\n- Point-based calculations (not pips)\n- Equity-specific macros: 9:50, 10:50, 1:50\n- ES/NQ SMT divergence\n\n## Crypto Application:\n- 24/7 market: Use London/NY killzones\n- BTC/ETH SMT divergence\n- Higher volatility: Wider stops\n- Weekend session considerations\n\n## Commodities (XAU/USD, Oil):\n- XAU: Inverse DXY correlation\n- Oil: Inventory report timing\n- Wider ATR: Adjust position size\n- Specific session tendencies\n\n## Universal Adjustments:\n- Volatility normalization (ATR-based)\n- Position sizing by instrument\n- Killzone modifications by timezone\n- Confluence weight adjustments per market',
    metadata: {
      format: 'markdown',
      line_count: 529,
      model_number: 7,
      markets: ['Forex', 'Indices', 'Crypto', 'Commodities']
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_charter_price_action_model_7_universal.md',
      lineStart: 1,
      lineEnd: 529,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'model_7', 'universal', 'multi_market', 'adaptation'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-month8-essentials',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Month 8 Day Trading Essentials',
    description: 'ICT Core Content Month 8 Lesson 01: Day Trading Essentials. Foundation lesson covering the essential concepts for ICT day trading including session timing, daily bias framework, PD array hierarchy for intraday, risk rules, and the importance of patience and selectivity in trade selection.',
    content: '# ICT Core Month 8 - Lesson 01: Day Trading Essentials\n\n## Essential Framework:\n1. Session Timing: Know your killzones\n2. Daily Bias: Determine direction before session\n3. PD Array Hierarchy: Know what to prioritize\n4. Risk Rules: Max 1-2% per trade\n5. Patience: Wait for A+ setups only\n\n## Daily Bias Determination:\n- D1 candle direction and location\n- H4 structure (trend/range)\n- Previous day\'s high/low relation\n- Weekly profile context\n- News event awareness\n\n## Intraday PD Array Priority:\n1. Unmitigated OB in killzone\n2. FVG within OTE zone\n3. Breaker at HTF level\n4. IFVG at confluence\n5. Liquidity void fill\n\n## Key Essentials:\n- Trade only during killzones\n- Minimum 3 confluences for entry\n- Know your invalidation BEFORE entry\n- One good trade per session is enough\n- Review every trade (win or loss)',
    metadata: {
      format: 'markdown',
      series: 'ICT Core Content',
      month: 8,
      lesson: 1,
      topic: 'Day Trading Essentials'
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_core_month8_01_essentials.md',
      lineStart: 1,
      lineEnd: 200,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'month8', 'essentials', 'day_trading', 'foundation'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-month8-defining-range',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Month 8 Defining the Range',
    description: 'ICT Core Content Month 8 Lesson 02: Defining the Range with IPDA True Day concept. Explains how to define the true trading day using IPDA principles — the true day runs from midnight to midnight (not market open). Covers IPDA range calculation, premium/discount within the true day, and how to frame intraday trades.',
    content: '# ICT Core Month 8 - Lesson 02: Defining the Range (IPDA True Day)\n\n## IPDA True Day:\n- True day: Midnight EST to Midnight EST\n- Not based on market open/close\n- IPDA algorithm resets at midnight\n- All session calculations reference true day\n\n## Range Definition:\n1. Mark midnight opening price\n2. Identify Asian session range\n3. Calculate CBDR\n4. Determine premium/discount from true day open\n5. Frame London/NY within this context\n\n## Premium/Discount Framework:\n- Above midnight open: Premium\n- Below midnight open: Discount\n- Trade longs in discount\n- Trade shorts in premium\n\n## IPDA True Day Application:\n- Opening price = midnight candle open\n- High of day likely in premium (if bullish day)\n- Low of day likely in discount (if bearish day)\n- Session high/low often set during killzones\n\n## Practical Steps:\n1. Mark midnight opening price on M15 chart\n2. Note Asian session range relative to open\n3. Determine if price is premium or discount\n4. Look for setups aligned with true day framework',
    metadata: {
      format: 'markdown',
      series: 'ICT Core Content',
      month: 8,
      lesson: 2,
      topic: 'IPDA True Day'
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_core_month8_02_defining_range.md',
      lineStart: 1,
      lineEnd: 180,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'month8', 'ipda', 'true_day', 'range', 'midnight_open'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-month8-cbdr',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Month 8 CBDR Lesson',
    description: 'ICT Core Content Month 8 Lesson 03: CBDR (Central Bank Dealers Range) in-depth lesson. Covers CBDR calculation (2PM-8PM EST), Asian range overlay, Standard Deviation projection methodology, and practical application for setting session targets during London and NY killzones.',
    content: '# ICT Core Month 8 - Lesson 03: CBDR\n\n## CBDR Detailed:\n- Time: 2:00 PM - 8:00 PM EST\n- Represents institutional accumulation\n- Sets the stage for London expansion\n\n## Calculation:\n1. Mark high of 2PM-8PM candles\n2. Mark low of 2PM-8PM candles\n3. Range = High - Low (in pips)\n4. If range < 40 pips: Valid\n5. If range > 40 pips: Early expansion warning\n\n## SD Projection from CBDR:\n- Project from CBDR HIGH (upside targets)\n- Project from CBDR LOW (downside targets)\n- 1SD = CBDR_range * 1 (added to high/low)\n- 2SD = CBDR_range * 2\n- 2.5SD = CBDR_range * 2.5\n- 3SD = CBDR_range * 3\n\n## London Session Application:\n- London often expands to 2-2.5SD\n- Use CBDR SD as London targets\n- Combine with HTF PD arrays\n\n## NY Session Application:\n- NY can extend to 3-4SD\n- Use combined CBDR + Asian for NY\n- Macro windows often reach SD levels\n\n## Best Practices:\n- Mark CBDR on M15 chart\n- Color code SD levels\n- Note which SD levels align with HTF PD arrays\n- Tighten targets when CBDR range is wide',
    metadata: {
      format: 'markdown',
      series: 'ICT Core Content',
      month: 8,
      lesson: 3,
      topic: 'CBDR'
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_core_month8_03_cbdr.md',
      lineStart: 1,
      lineEnd: 200,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'month8', 'cbdr', 'standard_deviation', 'session_targets'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-model-12-processed',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Model 12 OB/FVG Processed',
    description: 'Processed and structured version of ICT Model 12 focusing on OB/FVG scalping methodology. Distilled from the raw 594-line transcript into actionable rules, decision trees, and checklists. Includes specific candle-by-candle entry logic for M1 scalping within macro windows.',
    content: '# ICT Model 12 - OB/FVG Scalping (Processed)\n\n## Processed Rules:\n\n### Pre-Conditions:\n- Active macro window (9:50, 10:50, 1:50, 3:15)\n- HTF bias confirmed (D1/H4)\n- H1 structure aligned\n\n### Entry Logic (M1 Chart):\n1. Wait for displacement candle in macro\n2. Identify FVG created by displacement\n3. Check for OB below/above FVG\n4. If FVG + OB overlap → A+ zone\n5. Enter at 50% of FVG (limit order)\n6. Stop beyond OB (add 1 pip buffer)\n\n### Decision Tree:\n- Displacement → FVG formed? → Yes → OB present? → Yes → Enter\n- Displacement → FVG formed? → No → Wait/Skip\n- FVG formed → OB present? → No → Lower grade entry (B)\n\n### Scalp Management:\n- 1R: Close 60%, move stop to BE\n- 2R: Close 20%\n- 3R: Close remaining 20%\n- Max hold time: 30 minutes\n\n### Invalidation:\n- Price closes beyond OB = invalid\n- New opposing displacement = invalid\n- Macro window ends = reduce/close',
    metadata: {
      format: 'markdown',
      model_number: 12,
      processing_status: 'complete',
      entry_type: 'scalping',
      timeframe: 'M1'
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_model_12_obfvg_processed.md',
      lineStart: 1,
      lineEnd: 250,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'model_12', 'processed', 'scalping', 'ob', 'fvg'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-model-9',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Model 9 One Shot One Kill',
    description: 'ICT Model 9: One Shot One Kill weekly model. A higher-timeframe model where the trader takes one high-probability trade per week. Uses weekly/daily structure for bias, H4/H1 for entry, and targets the full week\'s expansion. Emphasizes quality over quantity with strict A+ setup requirements.',
    content: '# ICT Model 9 - One Shot One Kill (Weekly Model)\n\n## Model Philosophy:\n- One high-probability trade per week\n- Quality over quantity\n- Target the week\'s primary expansion\n\n## Weekly Framework:\n- Monday: Observation (often manipulation)\n- Tuesday: Setup formation (prime entry day)\n- Wednesday: Continuation or reversal\n- Thursday: Profit target day\n- Friday: Close/reduce before weekend\n\n## Setup Requirements:\n1. Weekly candle bias (previous week\'s close)\n2. Daily BOS/CHoCH on Monday/Tuesday\n3. H4 PD array alignment\n4. H1 entry model (OTE + FVG/OB)\n5. Minimum 4R target (weekly expansion)\n\n## Entry Rules:\n- Enter Tuesday or Wednesday only\n- Requires weekly bias alignment\n- Must have daily displacement\n- Entry at H1 PD array confluence\n- Stop beyond daily swing structure\n\n## Target Rules:\n- Target: Opposite weekly liquidity level\n- Partial at 2R, runner for 4R+\n- Close runner by Friday NY PM\n- Never hold over weekend\n\n## Key Stats:\n- Average: 1-2 trades per week\n- Target win rate: 60%+\n- Average R: 3-5R per winning trade',
    metadata: {
      format: 'markdown',
      model_number: 9,
      style: 'weekly_swing',
      entry_days: ['Tuesday', 'Wednesday'],
      target_r: '4R+'
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_model_9_one_shot_one_kill.md',
      lineStart: 1,
      lineEnd: 300,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'model_9', 'weekly', 'one_shot_one_kill', 'swing'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-models-processed',
    type: 'document',
    domain: 'knowledge_base',
    name: 'ICT Models Processed Catalog',
    description: 'Complete catalog of all ICT trading models in processed/structured format. Each model includes: overview, requirements, entry rules, stop/target rules, best session, typical R-multiple, and difficulty rating. Covers Silver Bullet, Judas Swing, ICT 2022, Unicorn, Turtle Soup, OTE, Market Maker, and numbered Charter models.',
    content: '# ICT Models - Processed Catalog\n\n## Model Index:\n\n### Silver Bullet:\n- Windows: 10-11AM, 2-3PM EST\n- Core: FVG during time window\n- R: 2-3R typical\n- Difficulty: Intermediate\n\n### Judas Swing:\n- Session: London Open\n- Core: Liquidity sweep → reversal\n- R: 3-5R typical\n- Difficulty: Intermediate\n\n### ICT 2022:\n- Session: Any killzone\n- Core: Multi-TF BOS → FVG → OB\n- R: 2-4R typical\n- Difficulty: Advanced\n\n### Unicorn:\n- Session: Any\n- Core: OB + FVG + Breaker overlap\n- R: 3-5R (rare, high probability)\n- Difficulty: Advanced\n\n### Turtle Soup:\n- Session: Any\n- Core: Equal highs/lows sweep → reversal\n- R: 2-3R typical\n- Difficulty: Intermediate\n\n### OTE Retracement:\n- Session: Any killzone\n- Core: 62-79% fib into PD array\n- R: 2-3R typical\n- Difficulty: Beginner\n\n### Market Maker (MMBM/MMSM):\n- Session: Full day\n- Core: AMD cycle identification\n- R: 5-10R (full cycle)\n- Difficulty: Expert\n\n### Charter Models (1-12):\n- Various timeframes and styles\n- See individual model documents\n- Difficulty: Varies',
    metadata: {
      format: 'markdown',
      models_count: 8,
      charter_models: 12,
      processing_status: 'complete'
    },
    sources: [{
      filePath: 'knowledge_base/models/ict_models_processed.md',
      lineStart: 1,
      lineEnd: 400,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'models', 'catalog', 'processed', 'comprehensive', 'index'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'document-market-maker-model',
    type: 'document',
    domain: 'knowledge_base',
    name: 'Market Maker Model Framework',
    description: 'Complete MMBM/MMSM (Market Maker Buy/Sell Model) framework documentation. Covers the full market maker cycle theory: how smart money accumulates, manipulates (Judas swing), and distributes. Includes phase identification on multiple timeframes, entry/exit rules per phase, and how to determine which model is active.',
    content: '# Market Maker Model - MMBM/MMSM Framework\n\n## Theory:\n- Markets are not random; they follow a dealer cycle\n- Market makers accumulate, manipulate, distribute\n- ICT calls this AMD: Accumulation, Manipulation, Distribution\n- Power of Three: Same concept (3 phases)\n\n## MMBM (Buy Model) Phases:\n1. Accumulation: Price ranges, smart money buys\n2. Manipulation: Judas swing DOWN (sweep SSL)\n3. Distribution: True move UP (expansion)\n4. Smart money sells to latecomers at premium\n\n## MMSM (Sell Model) Phases:\n1. Accumulation: Price ranges, smart money sells\n2. Manipulation: Judas swing UP (sweep BSL)\n3. Distribution: True move DOWN (expansion)\n4. Smart money covers at discount\n\n## Multi-Timeframe Application:\n- Weekly: Determine which model is active\n- Daily: Identify current phase\n- H4: Refine phase boundaries\n- H1/M15: Entry timing within phase\n\n## Entry Rules:\n- MMBM Entry: After manipulation low is set (SSL sweep confirmed)\n  → Enter long on LTF displacement + FVG\n- MMSM Entry: After manipulation high is set (BSL sweep confirmed)\n  → Enter short on LTF displacement + FVG\n\n## Determining Active Model:\n- Weekly structure bullish → MMBM likely\n- Weekly structure bearish → MMSM likely\n- Daily AMD pattern confirms\n- Kill zone timing aligns with phase\n\n## Advanced Notes:\n- Full MMBM/MMSM can take 1-3 days\n- Intraday version: Same phases within one session\n- Fractal: AMD exists on all timeframes\n- Nest models within models for highest probability',
    metadata: {
      format: 'markdown',
      models: ['MMBM', 'MMSM'],
      framework: 'AMD',
      phases: 4,
      timeframes: ['Weekly', 'Daily', 'H4', 'H1', 'M15'],
      difficulty: 'expert'
    },
    sources: [{
      filePath: 'knowledge_base/models/market_maker_model.md',
      lineStart: 1,
      lineEnd: 350,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['documentation', 'model', 'market_maker', 'mmbm', 'mmsm', 'amd', 'framework', 'advanced'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
];
