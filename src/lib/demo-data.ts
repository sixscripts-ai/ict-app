import type { Entity, Relationship } from './types';

export function generateDemoData(): { entities: Entity[]; relationships: Relationship[] } {
  const timestamp = new Date().toISOString();
  const uploadId = 'demo-upload-1';

  const entities: Entity[] = [
    {
      id: 'concept-fair-value-gap',
      type: 'concept',
      domain: 'concepts',
      name: 'Fair Value Gap (FVG)',
      description: 'A three-candle pattern where the first candle\'s high does not overlap with the third candle\'s low (bullish FVG) or vice versa (bearish FVG). Represents an imbalance in price delivery.',
      content: JSON.stringify({
        name: 'Fair Value Gap',
        definition: 'A three-candle pattern indicating inefficiency in price delivery',
        category: 'price_action',
        detection_rules: 'Candle 1 high < Candle 3 low (bullish) OR Candle 1 low > Candle 3 high (bearish)',
        related_concepts: ['Displacement', 'Imbalance', 'Order Block']
      }, null, 2),
      metadata: {
        category: 'price_action',
        detection_rules: 'Three-candle pattern with gap between candle 1 and 3',
        related_concepts: ['Displacement', 'Imbalance', 'Order Block']
      },
      sources: [{
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 45,
        lineEnd: 52,
        uploadId,
        uploadedAt: timestamp
      }],
      tags: ['price_action', 'core_concept'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'concept-order-block',
      type: 'concept',
      domain: 'concepts',
      name: 'Order Block (OB)',
      description: 'The last bullish candle before a bearish displacement (bearish OB) or the last bearish candle before a bullish displacement (bullish OB). Represents institutional order flow.',
      content: JSON.stringify({
        name: 'Order Block',
        definition: 'Last opposing candle before displacement',
        category: 'structure',
        detection_rules: 'Last up-close candle before down displacement OR last down-close before up displacement',
        related_concepts: ['Displacement', 'Liquidity', 'Fair Value Gap']
      }, null, 2),
      metadata: {
        category: 'structure',
        detection_rules: 'Last opposing candle before strong directional move',
        related_concepts: ['Displacement', 'Liquidity', 'Fair Value Gap']
      },
      sources: [{
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 65,
        lineEnd: 73,
        uploadId,
        uploadedAt: timestamp
      }],
      tags: ['structure', 'core_concept'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'concept-displacement',
      type: 'concept',
      domain: 'concepts',
      name: 'Displacement',
      description: 'A strong, impulsive price move with large candle bodies and minimal wicks, often leaving Fair Value Gaps. Signals institutional activity and directional conviction.',
      content: JSON.stringify({
        name: 'Displacement',
        definition: 'Strong impulsive move indicating smart money activity',
        category: 'price_action',
        detection_rules: 'Multiple large-bodied candles in same direction, minimal wicks, FVGs present',
        related_concepts: ['Fair Value Gap', 'Order Block', 'Break of Structure']
      }, null, 2),
      metadata: {
        category: 'price_action',
        detection_rules: 'Series of strong candles with minimal retracement',
        related_concepts: ['Fair Value Gap', 'Order Block', 'Break of Structure']
      },
      sources: [{
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 88,
        lineEnd: 96,
        uploadId,
        uploadedAt: timestamp
      }],
      tags: ['price_action', 'core_concept'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'concept-bos',
      type: 'concept',
      domain: 'concepts',
      name: 'Break of Structure (BOS)',
      description: 'When price breaks a swing high (in an uptrend) or swing low (in a downtrend), confirming trend continuation and shift in market structure.',
      content: JSON.stringify({
        name: 'Break of Structure',
        definition: 'Break of previous swing point confirming trend direction',
        category: 'structure',
        detection_rules: 'Price closes beyond most recent swing high/low in trend direction',
        related_concepts: ['Market Structure', 'Displacement', 'Change of Character']
      }, null, 2),
      metadata: {
        category: 'structure',
        detection_rules: 'Price breaks and closes beyond swing point',
        related_concepts: ['Market Structure', 'Displacement', 'Change of Character']
      },
      sources: [{
        filePath: 'knowledge_base/concepts/break_of_structure.md',
        uploadId,
        uploadedAt: timestamp
      }],
      tags: ['structure', 'confirmation'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'concept-choch',
      type: 'concept',
      domain: 'concepts',
      name: 'Change of Character (CHoCH)',
      description: 'When price breaks a swing point opposite to the current trend direction, suggesting potential trend reversal or major retracement.',
      content: JSON.stringify({
        name: 'Change of Character',
        definition: 'Break against trend indicating potential reversal',
        category: 'structure',
        detection_rules: 'Price breaks swing point opposite to trend direction',
        related_concepts: ['Break of Structure', 'Market Structure Shift', 'Liquidity']
      }, null, 2),
      metadata: {
        category: 'structure',
        detection_rules: 'Break of counter-trend swing point',
        related_concepts: ['Break of Structure', 'Market Structure Shift', 'Liquidity']
      },
      sources: [{
        filePath: 'knowledge_base/concepts/change_of_character.md',
        uploadId,
        uploadedAt: timestamp
      }],
      tags: ['structure', 'reversal'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'model-silver-bullet',
      type: 'model',
      domain: 'models',
      name: 'Silver Bullet',
      description: 'A high-probability trading model targeting the first hour of London (02:00-03:00 ET) or New York (09:00-10:00 ET) killzones. Looks for FVG + OB confluence after liquidity sweep.',
      content: JSON.stringify({
        name: 'Silver Bullet',
        description: 'Killzone-specific high-probability setup',
        entry_rules: 'Enter on 50% retracement of FVG during killzone after liquidity grab',
        timeframes: ['5m entry', '15m/1H bias'],
        concepts_used: ['Fair Value Gap', 'Order Block', 'Liquidity', 'Killzone', 'Optimal Trade Entry']
      }, null, 2),
      metadata: {
        entry_rules: 'Wait for killzone, identify FVG, enter at 50% retracement with OB confluence',
        killzones: ['London 02:00-03:00 ET', 'New York 09:00-10:00 ET'],
        concepts_used: ['Fair Value Gap', 'Order Block', 'Liquidity', 'Killzone', 'Optimal Trade Entry']
      },
      sources: [{
        filePath: 'knowledge_base/models/silver_bullet.md',
        uploadId,
        uploadedAt: timestamp
      }],
      tags: ['trading_model', 'high_probability', 'killzone'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'model-turtle-soup',
      type: 'model',
      domain: 'models',
      name: 'Turtle Soup',
      description: 'A liquidity grab reversal setup where price sweeps obvious highs/lows (turtle stops), then reverses. Targets traders caught on wrong side.',
      content: JSON.stringify({
        name: 'Turtle Soup',
        description: 'False breakout reversal model',
        entry_rules: 'Enter on reversal after liquidity sweep of obvious level',
        concepts_used: ['Liquidity', 'Stop Hunt', 'Fair Value Gap', 'Judas Swing']
      }, null, 2),
      metadata: {
        entry_rules: 'Wait for sweep of obvious high/low, enter on strong reversal candle',
        concepts_used: ['Liquidity', 'Stop Hunt', 'Fair Value Gap', 'Judas Swing']
      },
      sources: [{
        filePath: 'knowledge_base/models/turtle_soup.md',
        uploadId,
        uploadedAt: timestamp
      }],
      tags: ['trading_model', 'reversal', 'liquidity_grab'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'trade-2026-01-20-eurusd',
      type: 'trade',
      domain: 'trades',
      name: '2026-01-20_LON_EURUSD_OBFVG_001',
      description: 'Trade: EURUSD LONG',
      content: JSON.stringify({
        meta: {
          trade_id: '2026-01-20_LON_EURUSD_OBFVG_001',
          example_type: 'positive',
          grade: 'A+'
        },
        market: {
          pair: 'EURUSD',
          direction: 'LONG',
          session: 'London'
        },
        setup: {
          model: 'Silver Bullet',
          concepts_used: ['Fair Value Gap', 'Order Block', 'Optimal Trade Entry'],
          confluence: ['5m FVG', '15m OB', 'Liquidity sweep']
        },
        execution: {
          entry: 1.0850,
          stop: 1.0830,
          targets: [1.0880, 1.0900],
          risk_reward: '1:2.5'
        },
        result: {
          outcome: 'WIN',
          pnl: '+2.3R',
          notes: 'Perfect Silver Bullet execution during London killzone'
        }
      }, null, 2),
      metadata: {
        pair: 'EURUSD',
        direction: 'LONG',
        session: 'London',
        model: 'Silver Bullet',
        outcome: 'WIN',
        pnl: '+2.3R',
        grade: 'A+'
      },
      sources: [{
        filePath: 'data/training/positive/2026-01-20_LON_EURUSD_OBFVG_001.json',
        uploadId,
        uploadedAt: timestamp
      }],
      validationStatus: 'valid',
      tags: ['long', 'silver_bullet', 'positive', 'london'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'trade-2026-01-18-gbpusd',
      type: 'trade',
      domain: 'trades',
      name: '2026-01-18_NY_GBPUSD_FAIL_001',
      description: 'Trade: GBPUSD SHORT',
      content: JSON.stringify({
        meta: {
          trade_id: '2026-01-18_NY_GBPUSD_FAIL_001',
          example_type: 'negative',
          grade: 'F'
        },
        market: {
          pair: 'GBPUSD',
          direction: 'SHORT',
          session: 'New York'
        },
        setup: {
          model: 'Order Block + FVG',
          concepts_used: ['Fair Value Gap', 'Order Block'],
          problems: ['Traded against HTF bias', 'No liquidity sweep', 'Early entry']
        },
        execution: {
          entry: 1.2700,
          stop: 1.2720,
          targets: [1.2650],
          risk_reward: '1:2.5'
        },
        result: {
          outcome: 'LOSS',
          pnl: '-1R',
          notes: 'Entered against 4H bias, no proper setup. Lesson: Always confirm HTF direction'
        }
      }, null, 2),
      metadata: {
        pair: 'GBPUSD',
        direction: 'SHORT',
        session: 'New York',
        model: 'Order Block + FVG',
        outcome: 'LOSS',
        pnl: '-1R',
        grade: 'F',
        failure_reasons: ['HTF bias conflict', 'No liquidity confirmation', 'Rushed entry']
      },
      sources: [{
        filePath: 'data/training/negative/2026-01-18_NY_GBPUSD_FAIL_001.json',
        uploadId,
        uploadedAt: timestamp
      }],
      validationStatus: 'valid',
      tags: ['short', 'negative', 'new_york', 'lesson'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'code-fvg-detector',
      type: 'code_module',
      domain: 'code',
      name: 'fvg.py',
      description: 'Python module with 1 classes and 3 functions',
      content: `class FVGDetector:
    """Detects Fair Value Gaps in price data"""
    
    def detect(self, candles):
        """Main detection method"""
        fvgs = []
        for i in range(len(candles) - 2):
            if self._is_bullish_fvg(candles[i:i+3]):
                fvgs.append(self._create_fvg(candles[i:i+3], 'bullish'))
            elif self._is_bearish_fvg(candles[i:i+3]):
                fvgs.append(self._create_fvg(candles[i:i+3], 'bearish'))
        return fvgs
    
    def _is_bullish_fvg(self, three_candles):
        """Check if pattern is bullish FVG"""
        return three_candles[0]['high'] < three_candles[2]['low']
    
    def _is_bearish_fvg(self, three_candles):
        """Check if pattern is bearish FVG"""
        return three_candles[0]['low'] > three_candles[2]['high']`,
      metadata: {
        language: 'python',
        classes: ['FVGDetector'],
        functions: ['detect', '_is_bullish_fvg', '_is_bearish_fvg']
      },
      sources: [{
        filePath: 'src/ict_agent/detectors/fvg.py',
        uploadId,
        uploadedAt: timestamp
      }],
      tags: ['python', 'code', 'detector'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'schema-trade-setup',
      type: 'schema',
      domain: 'schemas',
      name: 'ict_trade_setup.schema.json',
      description: 'Master JSON Schema for ICT trade setups',
      content: JSON.stringify({
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://example.com/ict-trade-setup.schema.json",
        "title": "ICT Trade Setup",
        "description": "Complete schema for ICT trade setup records",
        "type": "object",
        "required": ["meta", "market", "setup", "execution"],
        "properties": {
          "meta": {
            "type": "object",
            "required": ["trade_id", "example_type"],
            "properties": {
              "trade_id": { "type": "string" },
              "example_type": { "enum": ["positive", "negative"] },
              "grade": { "type": "string" }
            }
          },
          "market": {
            "type": "object",
            "required": ["pair", "direction", "session"],
            "properties": {
              "pair": { "type": "string" },
              "direction": { "enum": ["LONG", "SHORT"] },
              "session": { "enum": ["London", "New York", "Asia"] }
            }
          }
        }
      }, null, 2),
      metadata: {
        schema_version: '2020-12',
        validates: 'trade_setup'
      },
      sources: [{
        filePath: 'data/schemas/ict_trade_setup.schema.json',
        uploadId,
        uploadedAt: timestamp
      }],
      tags: ['schema', 'validation', 'json'],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      id: 'document-master-library',
      type: 'document',
      domain: 'knowledge_base',
      name: 'ICT_MASTER_LIBRARY.md',
      description: '800+ line master reference covering all ICT concepts, models, and implementation details',
      content: '# ICT Master Library\n\nComprehensive reference for Inner Circle Trader methodology...\n\n## Part 1: Core Concepts\n- Fair Value Gap\n- Order Block\n- Displacement\n...',
      metadata: {
        line_count: 823,
        sections: 10,
        concepts_defined: 47,
        models_described: 12
      },
      sources: [{
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        uploadId,
        uploadedAt: timestamp
      }],
      tags: ['documentation', 'master_reference', 'comprehensive'],
      createdAt: timestamp,
      updatedAt: timestamp
    }
  ];

  const relationships: Relationship[] = [
    {
      id: 'rel-fvg-displacement',
      type: 'CONCEPT_RELATED_TO',
      sourceId: 'concept-fair-value-gap',
      targetId: 'concept-displacement',
      metadata: { reason: 'FVGs are created by displacement moves' },
      createdAt: timestamp
    },
    {
      id: 'rel-fvg-ob',
      type: 'CONCEPT_RELATED_TO',
      sourceId: 'concept-fair-value-gap',
      targetId: 'concept-order-block',
      metadata: { reason: 'OB + FVG confluence is high probability' },
      createdAt: timestamp
    },
    {
      id: 'rel-ob-displacement',
      type: 'CONCEPT_RELATED_TO',
      sourceId: 'concept-order-block',
      targetId: 'concept-displacement',
      metadata: { reason: 'Order blocks form before displacement' },
      createdAt: timestamp
    },
    {
      id: 'rel-displacement-bos',
      type: 'CONCEPT_RELATED_TO',
      sourceId: 'concept-displacement',
      targetId: 'concept-bos',
      metadata: { reason: 'Displacement often creates BOS' },
      createdAt: timestamp
    },
    {
      id: 'rel-bos-choch',
      type: 'CONCEPT_RELATED_TO',
      sourceId: 'concept-bos',
      targetId: 'concept-choch',
      metadata: { reason: 'Opposite structure shifts' },
      createdAt: timestamp
    },
    {
      id: 'rel-sb-fvg',
      type: 'CONCEPT_USED_IN_MODEL',
      sourceId: 'concept-fair-value-gap',
      targetId: 'model-silver-bullet',
      metadata: { importance: 'critical' },
      createdAt: timestamp
    },
    {
      id: 'rel-sb-ob',
      type: 'CONCEPT_USED_IN_MODEL',
      sourceId: 'concept-order-block',
      targetId: 'model-silver-bullet',
      metadata: { importance: 'critical' },
      createdAt: timestamp
    },
    {
      id: 'rel-sb-trade',
      type: 'MODEL_PRODUCES_TRADE',
      sourceId: 'model-silver-bullet',
      targetId: 'trade-2026-01-20-eurusd',
      metadata: { result: 'WIN' },
      createdAt: timestamp
    },
    {
      id: 'rel-trade-fvg',
      type: 'TRADE_USES_CONCEPT',
      sourceId: 'trade-2026-01-20-eurusd',
      targetId: 'concept-fair-value-gap',
      metadata: {},
      createdAt: timestamp
    },
    {
      id: 'rel-trade-ob',
      type: 'TRADE_USES_CONCEPT',
      sourceId: 'trade-2026-01-20-eurusd',
      targetId: 'concept-order-block',
      metadata: {},
      createdAt: timestamp
    },
    {
      id: 'rel-trade2-fvg',
      type: 'TRADE_USES_CONCEPT',
      sourceId: 'trade-2026-01-18-gbpusd',
      targetId: 'concept-fair-value-gap',
      metadata: {},
      createdAt: timestamp
    },
    {
      id: 'rel-trade2-ob',
      type: 'TRADE_USES_CONCEPT',
      sourceId: 'trade-2026-01-18-gbpusd',
      targetId: 'concept-order-block',
      metadata: {},
      createdAt: timestamp
    },
    {
      id: 'rel-fvg-detector',
      type: 'CONCEPT_DETECTED_BY',
      sourceId: 'concept-fair-value-gap',
      targetId: 'code-fvg-detector',
      metadata: {},
      createdAt: timestamp
    },
    {
      id: 'rel-schema-trade1',
      type: 'SCHEMA_VALIDATES',
      sourceId: 'schema-trade-setup',
      targetId: 'trade-2026-01-20-eurusd',
      metadata: { status: 'valid' },
      createdAt: timestamp
    },
    {
      id: 'rel-schema-trade2',
      type: 'SCHEMA_VALIDATES',
      sourceId: 'schema-trade-setup',
      targetId: 'trade-2026-01-18-gbpusd',
      metadata: { status: 'valid' },
      createdAt: timestamp
    },
    {
      id: 'rel-doc-fvg',
      type: 'DOCUMENT_DEFINES',
      sourceId: 'document-master-library',
      targetId: 'concept-fair-value-gap',
      metadata: {},
      createdAt: timestamp
    },
    {
      id: 'rel-doc-ob',
      type: 'DOCUMENT_DEFINES',
      sourceId: 'document-master-library',
      targetId: 'concept-order-block',
      metadata: {},
      createdAt: timestamp
    },
    {
      id: 'rel-doc-sb',
      type: 'DOCUMENT_DEFINES',
      sourceId: 'document-master-library',
      targetId: 'model-silver-bullet',
      metadata: {},
      createdAt: timestamp
    }
  ];

  return { entities, relationships };
}
