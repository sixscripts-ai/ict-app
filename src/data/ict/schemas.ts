import type { Entity } from '../../lib/types';

const timestamp = new Date().toISOString();
const uploadId = 'ict-master-database-2026-02-18';

export const ICT_SCHEMAS: Entity[] = [
  {
    id: 'schema-concept-encoding',
    type: 'schema',
    domain: 'schemas',
    name: 'Concept Encoding Schema',
    description: 'JSON schema for ICT concept storage including type, timeframe, candle data (OHLC for 3 candles), gap measurements, mitigation status, killzone context, and confluence scoring.',
    content: JSON.stringify({
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "https://ict-knowledge-engine.com/schemas/concept-encoding.schema.json",
      "title": "ICT Concept Encoding",
      "description": "Schema for storing detected ICT concepts with full context",
      "type": "object",
      "required": ["concept", "type", "timeframe", "timestamp"],
      "properties": {
        "concept": {
          "type": "string",
          "enum": ["FVG", "OB", "BOS", "SMS", "CHoCH", "Liquidity", "Displacement", "OTE", "Breaker", "Mitigation"]
        },
        "type": {
          "type": "string",
          "enum": ["bullish", "bearish", "neutral"]
        },
        "timeframe": {
          "type": "string",
          "enum": ["M1", "M5", "M15", "H1", "H4", "D1", "W1"]
        },
        "timestamp": {
          "type": "string",
          "format": "date-time"
        },
        "candles": {
          "type": "object",
          "properties": {
            "candle_1": {
              "type": "object",
              "properties": {
                "open": {"type": "number"},
                "high": {"type": "number"},
                "low": {"type": "number"},
                "close": {"type": "number"},
                "time": {"type": "string", "format": "date-time"}
              }
            },
            "candle_2": {
              "type": "object",
              "properties": {
                "open": {"type": "number"},
                "high": {"type": "number"},
                "low": {"type": "number"},
                "close": {"type": "number"},
                "time": {"type": "string", "format": "date-time"}
              }
            },
            "candle_3": {
              "type": "object",
              "properties": {
                "open": {"type": "number"},
                "high": {"type": "number"},
                "low": {"type": "number"},
                "close": {"type": "number"},
                "time": {"type": "string", "format": "date-time"}
              }
            }
          }
        },
        "gap_top": {"type": "number"},
        "gap_bottom": {"type": "number"},
        "gap_50_percent": {"type": "number"},
        "mitigated": {"type": "boolean"},
        "killzone": {
          "type": "string",
          "enum": ["London", "NY_AM", "NY_PM", "Asian", "None"]
        },
        "confluence_score": {"type": "number", "minimum": 0, "maximum": 10}
      }
    }, null, 2),
    metadata: {
      schema_version: '2020-12',
      validates: 'concept_detection',
      fields: [
        'concept', 'type', 'timeframe', 'timestamp',
        'candle_1', 'candle_2', 'candle_3',
        'gap_top', 'gap_bottom', 'gap_50_percent',
        'mitigated', 'killzone', 'confluence_score'
      ]
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 700,
      lineEnd: 750,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['schema', 'validation', 'json', 'concept', 'detection'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'schema-trade-signal',
    type: 'schema',
    domain: 'schemas',
    name: 'Trade Signal Schema',
    description: 'JSON schema for ICT trade signals including timestamp (ISO8601), symbol, direction (long/short), model, HTF bias, killzone, detailed confluences object, entry/stop/targets, risk-reward, and outcome.',
    content: JSON.stringify({
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "https://ict-knowledge-engine.com/schemas/trade-signal.schema.json",
      "title": "ICT Trade Signal",
      "description": "Schema for ICT trade signal generation and validation",
      "type": "object",
      "required": ["timestamp", "symbol", "direction", "model", "entry_price", "stop_loss", "target_1"],
      "properties": {
        "timestamp": {
          "type": "string",
          "format": "date-time",
          "description": "ISO8601 timestamp"
        },
        "symbol": {
          "type": "string",
          "description": "Trading pair (e.g., EURUSD, GBPUSD)"
        },
        "direction": {
          "type": "string",
          "enum": ["long", "short"]
        },
        "model": {
          "type": "string",
          "enum": ["silver_bullet", "judas_swing", "ict_2022", "unicorn", "turtle_soup", "ote_retracement", "breaker_reversal", "htf_ltf"]
        },
        "htf_bias": {
          "type": "string",
          "enum": ["bullish", "bearish", "neutral"]
        },
        "killzone": {
          "type": "string",
          "enum": ["London", "NY_AM", "NY_PM", "Asian"]
        },
        "confluences": {
          "type": "object",
          "properties": {
            "fvg": {"type": "boolean"},
            "order_block": {"type": "boolean"},
            "ote_zone": {"type": "boolean"},
            "liquidity_sweep": {"type": "boolean"},
            "smt_divergence": {"type": "boolean"},
            "displacement": {"type": "boolean"},
            "bos_sms": {"type": "boolean"}
          }
        },
        "confluence_count": {
          "type": "integer",
          "minimum": 0
        },
        "confluence_score": {
          "type": "number",
          "minimum": 0,
          "maximum": 10
        },
        "entry_price": {"type": "number"},
        "stop_loss": {"type": "number"},
        "target_1": {"type": "number"},
        "target_2": {"type": "number"},
        "risk_reward": {"type": "number"},
        "outcome": {
          "type": "string",
          "enum": ["WIN", "LOSS", "PENDING", "BREAKEVEN"]
        },
        "pips_result": {"type": "number"}
      }
    }, null, 2),
    metadata: {
      schema_version: '2020-12',
      validates: 'trade_signal',
      required_confluences_minimum: 3,
      minimum_score: 5.0
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 750,
      lineEnd: 800,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['schema', 'validation', 'json', 'trade', 'signal'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'schema-pd-array',
    type: 'schema',
    domain: 'schemas',
    name: 'PD Array Schema',
    description: 'JSON schema for Premium/Discount Arrays including type (OB/FVG/Breaker/Mitigation/Void), direction, timeframe, high/low boundaries, midpoint calculations (50%, 70.5%), candle index, mitigation status, confluence score, and HTF alignment.',
    content: JSON.stringify({
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "https://ict-knowledge-engine.com/schemas/pd-array.schema.json",
      "title": "PD Array",
      "description": "Schema for Premium/Discount Array storage",
      "type": "object",
      "required": ["type", "direction", "timeframe", "high", "low", "created_at_candle_index"],
      "properties": {
        "type": {
          "type": "string",
          "enum": ["OB", "FVG", "Breaker", "Mitigation", "Void", "NWOG", "NDOG"]
        },
        "direction": {
          "type": "string",
          "enum": ["bullish", "bearish"]
        },
        "timeframe": {
          "type": "string",
          "enum": ["M1", "M5", "M15", "H1", "H4", "D1", "W1"]
        },
        "high": {"type": "number"},
        "low": {"type": "number"},
        "midpoint_50": {
          "type": "number",
          "description": "50% equilibrium level"
        },
        "midpoint_70_5": {
          "type": "number",
          "description": "70.5% OTE sweet spot"
        },
        "created_at_candle_index": {
          "type": "integer",
          "description": "Candle index when PD Array formed"
        },
        "mitigated": {"type": "boolean"},
        "mitigated_at_candle_index": {"type": "integer"},
        "confluence_score": {"type": "number"},
        "htf_aligned": {"type": "boolean"},
        "priority_level": {
          "type": "integer",
          "minimum": 1,
          "maximum": 7,
          "description": "Priority in PD Array Matrix (1=highest)"
        }
      }
    }, null, 2),
    metadata: {
      schema_version: '2020-12',
      validates: 'pd_array',
      priority_order: ['OB', 'FVG', 'Breaker', 'Mitigation', 'Void', 'NWOG', 'NDOG']
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 337,
      lineEnd: 360,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['schema', 'validation', 'json', 'pd_array', 'hierarchy'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'schema-trade-setup',
    type: 'schema',
    domain: 'schemas',
    name: 'ICT Trade Setup Schema',
    description: 'Master JSON Schema for ICT trade setups. Validates complete trade lifecycle including meta information (model, session, pair), market context (bias, structure, killzone), setup details (PD arrays, confluences, entry model), execution parameters (entry/stop/targets), and result tracking (outcome, R-multiple, notes).',
    content: JSON.stringify({
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "https://ict-knowledge-engine.com/schemas/ict_trade_setup.schema.json",
      "title": "ICT Trade Setup",
      "description": "Master schema for validating complete ICT trade setups",
      "type": "object",
      "required": ["meta", "market", "setup", "execution"],
      "properties": {
        "meta": {
          "type": "object",
          "required": ["model", "session", "pair", "date"],
          "properties": {
            "model": { "type": "string", "enum": ["silver_bullet", "judas_swing", "ict_2022", "unicorn", "turtle_soup", "ote_retracement", "breaker_reversal", "market_maker", "htf_ltf"] },
            "session": { "type": "string", "enum": ["London", "NY_AM", "NY_PM", "Asian"] },
            "pair": { "type": "string" },
            "date": { "type": "string", "format": "date" },
            "timeframe_htf": { "type": "string" },
            "timeframe_ltf": { "type": "string" }
          }
        },
        "market": {
          "type": "object",
          "required": ["bias", "structure"],
          "properties": {
            "bias": { "type": "string", "enum": ["bullish", "bearish", "neutral"] },
            "structure": { "type": "string", "enum": ["uptrend", "downtrend", "range"] },
            "killzone_active": { "type": "boolean" },
            "daily_open_relation": { "type": "string", "enum": ["above", "below"] },
            "weekly_profile": { "type": "string" }
          }
        },
        "setup": {
          "type": "object",
          "required": ["pd_arrays", "confluence_score"],
          "properties": {
            "pd_arrays": { "type": "array", "items": { "type": "string" } },
            "confluences": { "type": "array", "items": { "type": "string" } },
            "confluence_score": { "type": "number", "minimum": 0, "maximum": 10 },
            "entry_model": { "type": "string" },
            "displacement_present": { "type": "boolean" },
            "liquidity_swept": { "type": "boolean" },
            "smt_confirmed": { "type": "boolean" }
          }
        },
        "execution": {
          "type": "object",
          "required": ["entry_price", "stop_loss", "target_1"],
          "properties": {
            "entry_price": { "type": "number" },
            "stop_loss": { "type": "number" },
            "target_1": { "type": "number" },
            "target_2": { "type": "number" },
            "target_3": { "type": "number" },
            "risk_percent": { "type": "number", "minimum": 0, "maximum": 5 },
            "risk_reward": { "type": "number" }
          }
        },
        "result": {
          "type": "object",
          "properties": {
            "outcome": { "type": "string", "enum": ["WIN", "LOSS", "BREAKEVEN", "PENDING"] },
            "r_multiple": { "type": "number" },
            "pips": { "type": "number" },
            "notes": { "type": "string" }
          }
        }
      }
    }, null, 2),
    metadata: {
      schema_version: '2020-12',
      validates: 'trade_setup',
      sections: ['meta', 'market', 'setup', 'execution', 'result'],
      models_supported: 9
    },
    sources: [{
      filePath: 'knowledge_base/schemas/ict_trade_setup.schema.json',
      lineStart: 1,
      lineEnd: 150,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['schema', 'validation', 'json', 'trade', 'setup', 'master'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'schema-trade-object',
    type: 'schema',
    domain: 'schemas',
    name: 'Trade Object Schema',
    description: 'JSON schema for individual trade records. Defines the complete trade object structure including entry details (price, time, reason), exit details (price, time, type), confluence array with weighted scoring, grading criteria (A+/A/B/C), position sizing, and post-trade review fields.',
    content: JSON.stringify({
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "https://ict-knowledge-engine.com/schemas/trade_object.json",
      "title": "Trade Object",
      "description": "Schema for a complete trade record with entry/exit/confluence/grading",
      "type": "object",
      "required": ["trade_id", "pair", "direction", "entry", "stop_loss"],
      "properties": {
        "trade_id": { "type": "string", "format": "uuid" },
        "pair": { "type": "string" },
        "direction": { "type": "string", "enum": ["long", "short"] },
        "model": { "type": "string" },
        "entry": {
          "type": "object",
          "required": ["price", "time"],
          "properties": {
            "price": { "type": "number" },
            "time": { "type": "string", "format": "date-time" },
            "reason": { "type": "string" },
            "timeframe": { "type": "string" },
            "pd_array_type": { "type": "string" }
          }
        },
        "exit": {
          "type": "object",
          "properties": {
            "price": { "type": "number" },
            "time": { "type": "string", "format": "date-time" },
            "type": { "type": "string", "enum": ["target_hit", "stop_hit", "manual_close", "breakeven", "trailing_stop"] }
          }
        },
        "stop_loss": { "type": "number" },
        "targets": {
          "type": "array",
          "items": { "type": "number" }
        },
        "confluences": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "weight": { "type": "number" },
              "present": { "type": "boolean" }
            }
          }
        },
        "confluence_score": { "type": "number", "minimum": 0, "maximum": 10 },
        "grade": {
          "type": "string",
          "enum": ["A+", "A", "B", "C", "F"],
          "description": "Trade setup quality grade"
        },
        "risk_percent": { "type": "number" },
        "risk_reward": { "type": "number" },
        "outcome": { "type": "string", "enum": ["WIN", "LOSS", "BREAKEVEN", "PENDING"] },
        "pips": { "type": "number" },
        "r_multiple": { "type": "number" },
        "review": {
          "type": "object",
          "properties": {
            "what_went_right": { "type": "string" },
            "what_went_wrong": { "type": "string" },
            "lesson": { "type": "string" },
            "screenshot_url": { "type": "string", "format": "uri" }
          }
        }
      }
    }, null, 2),
    metadata: {
      schema_version: '2020-12',
      validates: 'trade_object',
      grade_criteria: {
        'A+': '5+ confluences, killzone, HTF aligned, displacement',
        'A': '4 confluences, killzone, HTF aligned',
        'B': '3 confluences, partial alignment',
        'C': '2 confluences, missing key elements'
      }
    },
    sources: [{
      filePath: 'knowledge_base/schemas/trade_object.json',
      lineStart: 1,
      lineEnd: 120,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['schema', 'validation', 'json', 'trade', 'record', 'grading'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'schema-ontology',
    type: 'schema',
    domain: 'schemas',
    name: 'ICT Ontology',
    description: 'Comprehensive 37KB ICT ontology in YAML format. Defines concept classes (PD Arrays, Market Structure, Liquidity, Time-Based, Execution Models), properties for each concept, hierarchical relationships (is-a, part-of, depends-on, confirms, invalidates), and cross-concept mappings. Serves as the formal knowledge representation for all ICT methodology.',
    content: '# ICT Ontology (YAML) - 37KB Comprehensive Knowledge Representation\n\n## Concept Classes:\n- PD Arrays: FVG, IFVG, OB, Breaker, Mitigation, BPR, Liquidity Void, NWOG, NDOG, Volume Imbalance, Rejection Block, Propulsion Block, Vacuum Block, Suspension Block\n- Market Structure: BOS, CHoCH, SMS, Swing High, Swing Low, HH, HL, LH, LL\n- Liquidity: BSL, SSL, Equal Highs, Equal Lows, Trendline Liquidity, Inducement\n- Time-Based: Killzones, Macros, CBDR, Flout, Silver Bullet Windows, IPDA, True Day\n- Execution Models: Silver Bullet, Judas Swing, ICT 2022, Unicorn, Turtle Soup, OTE, Market Maker, Power of Three\n\n## Properties Per Concept:\n- Definition, Timeframes, Detection Rules, Confluence Weight\n- Bullish/Bearish Variants, Mitigation Rules, Priority Level\n\n## Relationships:\n- is-a (taxonomy): FVG is-a PD_Array\n- part-of (composition): OTE part-of Silver_Bullet\n- depends-on (prerequisite): Entry depends-on BOS\n- confirms (validation): SMT confirms Bias\n- invalidates (negation): Opposing_OB invalidates Setup\n- precedes (temporal): Displacement precedes FVG\n- contains (spatial): Killzone contains Macro',
    metadata: {
      size_kb: 37,
      format: 'yaml',
      concept_classes: 5,
      total_concepts: 45,
      relationship_types: 7,
      properties_per_concept: 7
    },
    sources: [{
      filePath: 'knowledge_base/schemas/ict_ontology.yaml',
      lineStart: 1,
      lineEnd: 900,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['schema', 'ontology', 'yaml', 'knowledge_representation', 'taxonomy'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'schema-sql',
    type: 'schema',
    domain: 'schemas',
    name: 'SQL Database Schema',
    description: 'SQL database schema defining tables for ICT concepts, trades, patterns, and relationships. Includes tables for concepts (with type, timeframe, detection_rules), trades (entry/exit/confluences/outcome), patterns (model, conditions, success_rate), concept_relationships (parent/child/type), trade_confluences (junction table), and killzone_schedules. Includes indexes for performance.',
    content: '# ICT SQL Database Schema\n\n## Tables:\n\n### concepts\n- id (UUID PK), name, type, category, timeframe, description\n- detection_rules (JSONB), confluence_weight (DECIMAL)\n- bullish_variant (TEXT), bearish_variant (TEXT)\n- priority_level (INT), mitigation_rules (JSONB)\n- created_at, updated_at\n\n### trades\n- id (UUID PK), pair, direction, model, session\n- entry_price, entry_time, exit_price, exit_time\n- stop_loss, target_1, target_2, target_3\n- risk_percent, risk_reward, r_multiple\n- outcome (ENUM: WIN/LOSS/BE/PENDING)\n- confluence_score, grade, pips, notes\n- created_at\n\n### patterns\n- id (UUID PK), model_name, conditions (JSONB)\n- success_rate (DECIMAL), sample_size (INT)\n- timeframes (TEXT[]), pairs (TEXT[])\n- avg_r_multiple, best_session\n- created_at, updated_at\n\n### concept_relationships\n- id (UUID PK), parent_concept_id (FK), child_concept_id (FK)\n- relationship_type (ENUM: depends_on/confirms/invalidates/precedes/contains)\n- weight (DECIMAL)\n\n### trade_confluences\n- trade_id (FK), concept_id (FK), present (BOOLEAN)\n- weight (DECIMAL), notes (TEXT)\n\n### killzone_schedules\n- id (UUID PK), name, start_time (TIME), end_time (TIME)\n- timezone, day_of_week (INT[]), active (BOOLEAN)\n\n## Indexes:\n- idx_trades_pair_outcome, idx_trades_model, idx_trades_session\n- idx_concepts_type, idx_concepts_category\n- idx_patterns_model, idx_relationships_type',
    metadata: {
      format: 'sql',
      tables: 6,
      indexes: 7,
      uses_jsonb: true,
      supports: ['concepts', 'trades', 'patterns', 'relationships', 'killzones']
    },
    sources: [{
      filePath: 'knowledge_base/schemas/schema.sql',
      lineStart: 1,
      lineEnd: 200,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['schema', 'sql', 'database', 'tables', 'indexes'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'schema-concept-relationships',
    type: 'schema',
    domain: 'schemas',
    name: 'Concept Relationships Schema',
    description: 'Canonical YAML source for concept wiring across the ICT methodology. Defines model blueprints (required/optional components per model), concept dependency graphs, causal chains (reversal sequence, power of 3, HTF→LTF), confluence weights (critical: 2.5, high: 1.5, moderate: 1.0, low: 0.5), anti-patterns with penalties (-2.0), and validation checklists.',
    content: '# Concept Relationships Schema (YAML)\n\n## Model Blueprints:\n- Silver Bullet: {required: [FVG, Displacement, Killzone_NY_AM], optional: [OB, SMT], time_window: "10:00-11:00 or 14:00-15:00"}\n- Judas Swing: {required: [Liquidity_Sweep, Displacement, FVG], optional: [OB, OTE], session: "London_Open"}\n- ICT 2022: {required: [BOS, FVG, OB], optional: [OTE, SMT], multi_tf: true}\n- Unicorn: {required: [OB, FVG, Breaker], optional: [SMT], rare: true}\n- Turtle Soup: {required: [Equal_Highs_Lows, Sweep, Reversal_FVG], session: "any"}\n\n## Dependency Graph:\n- FVG → depends_on: [Displacement]\n- OB → depends_on: [Candle_Before_Displacement]\n- BOS → depends_on: [Swing_Break, Close_Confirmation]\n- OTE → depends_on: [Swing_High, Swing_Low, Fib_62_79]\n- SMT → depends_on: [Correlated_Pair, Divergent_Move]\n\n## Causal Chains:\n- Reversal: Liquidity_Sweep → Displacement → FVG → BOS → Entry\n- Power_of_3: Accumulation → Manipulation → Distribution\n- HTF_to_LTF: HTF_Bias → HTF_PD_Array → LTF_Entry_Model → Execution\n\n## Confluence Weights:\n- Critical (2.5): HTF_Bias_Alignment, Killzone_Active, Displacement\n- High (1.5): FVG_Present, OB_Respected, BOS_Confirmed\n- Moderate (1.0): OTE_Zone, SMT_Divergence, Liquidity_Swept\n- Low (0.5): NWOG_Alignment, Session_Open_Relation\n- Penalties (-2.0): Counter_HTF_Bias, Outside_Killzone, No_Displacement\n\n## Anti-Patterns:\n- Chasing: Entry after move already completed\n- Counter-Trend: Trading against HTF bias without reversal confirmation\n- Low-Confluence: Fewer than 3 confirmations\n- Killzone-Miss: Trading outside active killzone\n- Revenge: Re-entering after stop hit without new setup',
    metadata: {
      format: 'yaml',
      model_blueprints: 5,
      dependency_chains: 5,
      causal_chains: 3,
      weight_categories: 5,
      anti_patterns: 5
    },
    sources: [{
      filePath: 'knowledge_base/schemas/concept_relationships.yaml',
      lineStart: 1,
      lineEnd: 713,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['schema', 'yaml', 'relationships', 'blueprints', 'confluence', 'weights'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
];
