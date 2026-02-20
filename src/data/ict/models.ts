import type { Entity } from '../../lib/types';

const timestamp = new Date().toISOString();
const uploadId = 'ict-master-database-2026-02-18';

export const ICT_MODELS: Entity[] = [
  {
    id: 'model-silver-bullet',
    type: 'model',
    domain: 'models',
    name: 'Silver Bullet',
    description: 'Precision intraday entry framework operating EXCLUSIVELY 10-11 AM EST (or 2-3 PM EST). Time-based liquidity run setup with mandatory sequence: Liquidity Sweep → SMS → FVG retracement → Delivery. If setup fails, stop trading for the day.',
    content: 'Silver Bullet Sequence: 1) Liquidity Sweep at/before 10AM (raids BSL or SSL), 2) SMS: Price displaces opposite the raid with structure confirmation, 3) Execution Zone: Enter on FVG/OB retracement aligned with OTE, 4) Delivery: Target opposite intraday liquidity (30-60 min typically). Rules: Time is THE filter - no setup outside 10-11 AM counts. Raid + displacement + FVG sequence is mandatory. Typically 1-2R scalps.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['liquidity_sweep', 'displacement', 'fvg', 'market_structure_shift'],
      optional_concepts: ['smt', 'order_block', 'ote'],
      time_windows: [
        { name: 'AM Silver Bullet', time: '10:00-11:00', timezone: 'ET' },
        { name: 'PM Silver Bullet', time: '14:00-15:00', timezone: 'ET' }
      ],
      anti_patterns: ['entry_before_liquidity_sweep', 'counter_trend_without_htf_level', 'fvg_without_displacement'],
      avoid_when: ['No clear HTF bias', 'Major news in window', 'FVG already 50%+ filled'],
      confluence_minimum: 5.0,
      expected_rr: '1:2 to 1:3',
      sequence: [
        'Liquidity Sweep (at/before 10am)',
        'SMS with displacement opposite raid',
        'FVG/OB forms during displacement',
        'Retracement to execution zone (OTE)',
        'Delivery to opposite liquidity'
      ],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.3, concept_relationships.yaml'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 387,
        lineEnd: 410,
        uploadId,
        uploadedAt: timestamp
      },
      {
        filePath: 'knowledge_base/concept_relationships.yaml',
        lineStart: 20,
        lineEnd: 35,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'high_probability', 'time_based', 'killzone', 'intraday'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-judas-swing',
    type: 'model',
    domain: 'models',
    name: 'Judas Swing',
    description: 'False move before real move that lures traders in wrong direction, creating liquidity before institutional delivery. Early-session trap typically before 10:00 AM EST. The manipulation IS the entry signal when displacement confirms reversal.',
    content: 'Judas Swing Purpose: Trap liquidity, induce retail participation, fuel institutional positions in opposite direction. Timing: London Open (2-5 AM EST) or NY AM (7-10 AM EST) most common. Trading Rule: Never chase early Killzone breakouts - assume Judas Swing until displacement confirms direction. The Judas IS the manipulation phase of AMD (Power of Three).',
    metadata: {
      category: 'execution_model',
      required_concepts: ['time_of_day_macro', 'liquidity_sweep', 'displacement'],
      optional_concepts: ['order_block', 'fvg', 'power_of_three'],
      time_windows: [
        { name: 'London Open', time: '02:00-05:00', timezone: 'ET' },
        { name: 'NY Open', time: '07:00-10:00', timezone: 'ET' }
      ],
      anti_patterns: ['chasing_early_breakout', 'entry_without_displacement'],
      avoid_when: ['After 10am without setup', 'Low volatility sessions'],
      confluence_minimum: 4.0,
      expected_rr: '1:2 to 1:4',
      sequence: [
        'Early killzone breakout (false move)',
        'Liquidity sweep of obvious level',
        'Displacement opposite direction',
        'Entry on retracement',
        'Delivery to opposite liquidity'
      ],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.2, concept_relationships.yaml',
      insight: 'The Judas Swing IS the manipulation phase of AMD'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 350,
        lineEnd: 385,
        uploadId,
        uploadedAt: timestamp
      },
      {
        filePath: 'knowledge_base/concept_relationships.yaml',
        lineStart: 37,
        lineEnd: 50,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'manipulation', 'time_based', 'liquidity_trap', 'early_session'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-ict-2022',
    type: 'model',
    domain: 'models',
    name: 'ICT 2022 Model',
    description: 'Full AMD (Accumulation-Manipulation-Distribution) cycle trade. Core principle: "Price is nothing without time." Components: Daily bias, liquidity sweeps, MSS on lower TFs, PD Array targeting. Best at session opens (London, NY).',
    content: 'ICT 2022 Execution: London (3 AM NY): Mark NY midnight to London open range, wait for liquidity sweep, identify MSS with displacement, execute at PD Array retest. New York (8 AM NY): If London swept use OTE from London range, if London ranged mark NY midnight-open and look for sweep. Target opposite side of accumulation range.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['accumulation_range', 'manipulation_sweep', 'displacement', 'fvg'],
      optional_concepts: ['order_block', 'ote', 'premium_discount'],
      time_windows: [
        { name: 'London Open', time: '03:00-05:00', timezone: 'ET' },
        { name: 'NY Open', time: '08:00-10:00', timezone: 'ET' }
      ],
      anti_patterns: ['skipping_accumulation_phase', 'entering_before_manipulation'],
      avoid_when: ['No clear accumulation range', 'Major news events'],
      confluence_minimum: 6.0,
      expected_rr: '1:3 to 1:5',
      sequence: [
        'Mark accumulation range (midnight-open)',
        'Wait for manipulation sweep',
        'Confirm MSS with displacement',
        'Enter at PD Array (FVG/OB)',
        'Target opposite side of range'
      ],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.7, concept_relationships.yaml',
      time_context: 'Best at session opens (London, NY)'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 480,
        lineEnd: 520,
        uploadId,
        uploadedAt: timestamp
      },
      {
        filePath: 'knowledge_base/concept_relationships.yaml',
        lineStart: 65,
        lineEnd: 75,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'amd_cycle', 'session_open', 'full_cycle', 'high_probability'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-unicorn',
    type: 'model',
    domain: 'models',
    name: 'Unicorn Setup',
    description: 'Order Block with FVG inside - highest probability setup in ICT. Rare occurrence (2-3 per week). Requires OB + FVG inside OB boundaries + HTF bias alignment. Entry inside the FVG portion of the OB for maximum precision.',
    content: 'Unicorn Requirements: Order Block identified, Fair Value Gap forms INSIDE the Order Block boundaries, HTF bias aligned with setup direction. Rarity: 2-3 per week makes this special. Probability: Highest of all ICT setups. Entry: Inside the FVG portion of the OB (confluence of both concepts).',
    metadata: {
      category: 'execution_model',
      required_concepts: ['order_block', 'fvg_inside_ob', 'htf_bias_alignment'],
      optional_concepts: ['ote', 'displacement', 'liquidity_sweep'],
      time_windows: [
        { name: 'Any Killzone', time: 'During KZ hours', timezone: 'ET' }
      ],
      anti_patterns: ['forcing_unicorn', 'entering_outside_fvg'],
      avoid_when: ['HTF not aligned', 'FVG outside OB boundaries'],
      confluence_minimum: 7.0,
      expected_rr: '1:3 to 1:6',
      sequence: [
        'Identify Order Block',
        'Confirm FVG forms INSIDE OB',
        'Verify HTF bias alignment',
        'Enter in FVG portion of OB',
        'Target liquidity or HTF objective'
      ],
      source_reference: 'concept_relationships.yaml',
      rarity: 'Uncommon — maybe 2-3 per week',
      probability: 'Highest of all setups',
      entry: 'Inside the FVG portion of the OB'
    },
    sources: [
      {
        filePath: 'knowledge_base/concept_relationships.yaml',
        lineStart: 77,
        lineEnd: 86,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'highest_probability', 'rare', 'confluence', 'precision'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-turtle-soup',
    type: 'model',
    domain: 'models',
    name: 'Turtle Soup',
    description: 'Liquidity grab reversal setup where price sweeps obvious highs/lows (turtle stops), then immediately reverses. Speed of reversal is KEY. Targets traders caught on wrong side. Entry on reversal candle, SL beyond sweep.',
    content: 'Turtle Soup Formation: Clear liquidity pool (equal highs/lows, obvious levels), Liquidity sweep occurs, IMMEDIATE reversal (speed is critical). Best Conditions: Obvious level run (equal highs/lows, prior week high/low), Impulsive move through level fails to follow through, No displacement confirming breakout. Entry: On reversal candle. Stop: Beyond the sweep. Target: Opposite liquidity.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['clear_liquidity_pool', 'liquidity_sweep', 'immediate_reversal'],
      optional_concepts: ['fvg', 'smt', 'displacement'],
      time_windows: [
        { name: 'Any Killzone', time: 'Especially London/NY Open', timezone: 'ET' }
      ],
      anti_patterns: ['waiting_too_long', 'entering_before_reversal'],
      avoid_when: ['Slow reversal', 'No clear liquidity pool'],
      confluence_minimum: 5.0,
      expected_rr: '1:2 to 1:4',
      sequence: [
        'Identify clear liquidity pool',
        'Wait for sweep of level',
        'Watch for IMMEDIATE reversal',
        'Enter on reversal candle',
        'Stop beyond sweep, target opposite liquidity'
      ],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 7.1, concept_relationships.yaml',
      key: 'Speed — the faster the reversal, the better'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 600,
        lineEnd: 630,
        uploadId,
        uploadedAt: timestamp
      },
      {
        filePath: 'knowledge_base/concept_relationships.yaml',
        lineStart: 88,
        lineEnd: 97,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'reversal', 'liquidity_grab', 'false_breakout', 'speed'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-ote-retracement',
    type: 'model',
    domain: 'models',
    name: 'OTE Retracement Model',
    description: 'Retracement entry after displacement leg using Fibonacci 62-79% zone. Sweet spot: 70.5%. Requires displacement + fibonacci + MSS. Confluence zone provides optimal risk/reward entries.',
    content: 'OTE Model: After displacement creates impulse leg, apply Fibonacci retracement. Zone: 62-79% retracement. Sweet spot: 70.5% (0.705 fib). Requirements: Displacement leg (mandatory), MSS confirmation, Fibonacci retracement tool. Entry: Within OTE zone, preferably at 70.5% when aligned with FVG or OB. Most effective during Killzones.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['displacement', 'fibonacci_retracement', 'market_structure_break'],
      optional_concepts: ['fvg', 'order_block', 'premium_discount'],
      time_windows: [
        { name: 'Any Killzone', time: 'Best during active sessions', timezone: 'ET' }
      ],
      anti_patterns: ['entering_before_ote', 'chasing_past_79'],
      avoid_when: ['No displacement', 'No MSS', 'Against HTF bias'],
      confluence_minimum: 5.0,
      expected_rr: '1:2 to 1:4',
      sequence: [
        'Identify displacement leg',
        'Confirm MSS',
        'Apply Fibonacci (swing low to high or vice versa)',
        'Wait for retracement to 62-79% zone',
        'Enter at 70.5% sweet spot or with FVG/OB confluence'
      ],
      source_reference: 'concept_relationships.yaml',
      confluence_zone: '62-79% retracement',
      sweet_spot: '70.5%'
    },
    sources: [
      {
        filePath: 'knowledge_base/concept_relationships.yaml',
        lineStart: 52,
        lineEnd: 63,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'retracement', 'fibonacci', 'ote', 'precision'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-breaker-block-reversal',
    type: 'model',
    domain: 'models',
    name: 'Breaker Block Reversal',
    description: 'Failed Order Block reversal model. Requires liquidity sweep through high/low + displacement through OB that causes it to fail. Failed OB becomes Breaker Block and acts as S/R. Entry at breaker body.',
    content: 'Breaker Formation: Liquidity sweep occurs at high/low, Displacement moves THROUGH Order Block (OB fails), Failed OB becomes Breaker Block. Entry Rules: Enter at the breaker body (highest up-close or lowest down-close), Confirm with structure, Stop beyond breaker. Most reliable after HTF liquidity events.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['liquidity_sweep_high_low', 'displacement_through_ob'],
      optional_concepts: ['breaker_block', 'htf_bias', 'smt'],
      time_windows: [
        { name: 'Any Killzone', time: 'After liquidity events', timezone: 'ET' }
      ],
      anti_patterns: ['entering_before_ob_fails', 'no_displacement'],
      avoid_when: ['OB holds', 'No liquidity sweep', 'Weak displacement'],
      confluence_minimum: 5.5,
      expected_rr: '1:2 to 1:4',
      sequence: [
        'Identify Order Block',
        'Wait for liquidity sweep',
        'Displacement breaks THROUGH OB',
        'OB fails and becomes Breaker',
        'Enter at breaker body on retest'
      ],
      source_reference: 'concept_relationships.yaml',
      entry_rules: ['Enter at the breaker body (highest up-close or lowest down-close)']
    },
    sources: [
      {
        filePath: 'knowledge_base/concept_relationships.yaml',
        lineStart: 58,
        lineEnd: 64,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'reversal', 'breaker', 'failed_ob', 'liquidity'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-htf-ltf-process',
    type: 'model',
    domain: 'models',
    name: 'HTF→LTF Multi-Timeframe Entry Process',
    description: 'Always align with higher timeframe bias. Three-layer process: Layer 1 HTF sweep context (Daily/4H), Layer 2 ITF confirmation (H1/M15 BOS/SMS + displacement), Layer 3 LTF execution (M5/M1 retrace into OB/FVG at OTE). Never the other way around.',
    content: 'HTF→LTF Process: Layer 1 (Context): Determine HTF bias on Daily/4H, identify HTF POI (liquidity, FVG, OB). Layer 2 (Confirmation): Wait for price at HTF POI with patience, drop to H1/M15 for BOS/SMS + displacement. Layer 3 (Execution): Drop to M5/M1 for entry, find LTF confirmation (displacement, BOS, FVG), enter on retrace into OB/FVG at OTE. Failure Mode: Trading LTF without HTF context = gambling.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['market_structure', 'killzones', 'displacement', 'ote'],
      optional_concepts: ['fvg', 'order_block', 'liquidity', 'daily_bias'],
      time_windows: [
        { name: 'During Killzones', time: 'After HTF setup', timezone: 'ET' }
      ],
      anti_patterns: ['ltf_without_htf', 'skipping_layers', 'impatience'],
      avoid_when: ['No HTF bias', 'HTF POI not reached', 'Against HTF structure'],
      confluence_minimum: 7.0,
      expected_rr: '1:3 to 1:6',
      sequence: [
        'Layer 1: Determine HTF bias (Daily/4H)',
        'Identify HTF POI (FVG, OB, liquidity)',
        'Layer 2: Wait for HTF POI, confirm on ITF (H1/M15)',
        'Look for BOS/SMS + displacement on ITF',
        'Layer 3: Drop to LTF (M5/M1) for execution',
        'Enter on retrace to OB/FVG at OTE'
      ],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 6.1',
      failure_mode: 'Trading LTF without HTF context = gambling'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 552,
        lineEnd: 598,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'multi_timeframe', 'htf_ltf', 'process', 'systematic'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-am-silver-bullet',
    type: 'model',
    domain: 'models',
    name: 'AM Silver Bullet',
    description: 'The most reliable Silver Bullet variant occurring in the 10-11 AM ET window during peak New York volume. Highest probability due to overlapping London/NY liquidity. Requires same mandatory sequence: Liquidity Sweep → SMS → FVG retracement → Delivery.',
    content: 'AM Silver Bullet is the primary Silver Bullet window. 10-11 AM ET coincides with peak NY volume and London overlap, producing the highest probability setups. Sequence: 1) Pre-10 AM liquidity sweep (raids BSL or SSL), 2) 10:00-10:15 displacement opposite the sweep with SMS, 3) FVG forms during displacement, 4) Enter on FVG retracement at OTE, 5) Deliver to opposite liquidity by 11 AM. The AM window is statistically superior because institutional order flow peaks during London/NY overlap. If no setup by 10:30, stand down.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['liquidity_sweep', 'displacement', 'fvg', 'market_structure_shift', 'time_of_day_macro'],
      optional_concepts: ['smt', 'order_block', 'ote', 'premium_discount'],
      time_windows: [
        { name: 'AM Silver Bullet', time: '10:00-11:00', timezone: 'ET' }
      ],
      anti_patterns: ['entry_before_liquidity_sweep', 'counter_trend_without_htf_level', 'fvg_without_displacement', 'forcing_after_1030'],
      avoid_when: ['No clear HTF bias', 'Major news in window', 'FVG already 50%+ filled', 'No sweep by 10:15'],
      confluence_minimum: 5.5,
      expected_rr: '1:2 to 1:3',
      sequence: [
        'Pre-10 AM liquidity sweep occurs',
        'SMS with displacement opposite sweep (10:00-10:15)',
        'FVG/OB forms during displacement',
        'Retracement to execution zone (OTE)',
        'Delivery to opposite liquidity by 11 AM'
      ],
      entry_rules: ['Enter only within FVG formed during displacement', 'Must have clear SMS before entry', 'Time filter: 10:00-10:30 ideal entry window'],
      invalidation: ['No sweep by 10:15', 'Price consolidates without displacement', 'FVG filled beyond 50% before entry'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.3',
      variant_of: 'model-silver-bullet',
      reliability: 'Highest of all Silver Bullet variants due to peak volume'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 387,
        lineEnd: 410,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'high_probability', 'time_based', 'killzone', 'intraday', 'silver_bullet', 'ny_session'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-pm-silver-bullet',
    type: 'model',
    domain: 'models',
    name: 'PM Silver Bullet',
    description: 'Second-opportunity Silver Bullet variant in the 2-3 PM ET window. Often reverses or extends the AM session move. Lower probability than AM but valid when AM missed or failed. May present reversal setups fading the AM delivery.',
    content: 'PM Silver Bullet operates in the 2-3 PM ET window, the second institutional order flow window. Characteristics: 1) May reverse the AM session direction — watch for exhaustion of AM delivery, 2) Can extend AM direction if HTF objective not yet reached, 3) Same sequence applies: Sweep → SMS → FVG → Delivery. Key difference: PM often involves fading the AM move back toward the session open or toward unfilled FVGs left by the AM session. If AM Silver Bullet delivered, PM may offer a retrace trade.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['liquidity_sweep', 'displacement', 'fvg', 'market_structure_shift', 'time_of_day_macro'],
      optional_concepts: ['smt', 'order_block', 'ote', 'am_session_context'],
      time_windows: [
        { name: 'PM Silver Bullet', time: '14:00-15:00', timezone: 'ET' }
      ],
      anti_patterns: ['entry_before_liquidity_sweep', 'ignoring_am_context', 'forcing_continuation_after_exhaustion'],
      avoid_when: ['No clear HTF bias', 'AM already delivered full range', 'Major news in window', 'Low volume environment'],
      confluence_minimum: 5.0,
      expected_rr: '1:2 to 1:3',
      sequence: [
        'Assess AM session delivery and remaining objectives',
        'Liquidity sweep at/before 2 PM',
        'SMS with displacement opposite sweep',
        'FVG forms during displacement',
        'Enter on FVG retracement, deliver by 3 PM'
      ],
      entry_rules: ['Enter only within FVG from displacement', 'Check if AM objective was met — if yes, look for reversal', 'Time filter: 14:00-14:30 ideal entry window'],
      invalidation: ['No sweep by 14:15', 'AM move already exhausted all HTF targets', 'Consolidation without displacement'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.3',
      variant_of: 'model-silver-bullet',
      relationship_to_am: 'Often reverses AM direction or extends unfinished AM objective'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 387,
        lineEnd: 410,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'time_based', 'killzone', 'intraday', 'silver_bullet', 'ny_session', 'second_opportunity'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-london-silver-bullet',
    type: 'model',
    domain: 'models',
    name: 'London Silver Bullet',
    description: 'London session Silver Bullet variant in the 3-4 AM ET window. First opportunity of the day during London open. Targets London session liquidity and often sets up the Judas Swing for NY. Requires same core sequence in London killzone.',
    content: 'London Silver Bullet operates in the 3-4 AM ET window during London open. This is the earliest Silver Bullet variant. Sequence: 1) Asia session high/low sweep at London open, 2) SMS with displacement, 3) FVG forms, 4) Enter on retracement. Key context: London Silver Bullet often creates the directional bias for the day. The move established here may be the "real" move or the Judas Swing that NY reverses. Works best when Asia ranged tightly, providing clean liquidity pools.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['liquidity_sweep', 'displacement', 'fvg', 'market_structure_shift', 'asia_range'],
      optional_concepts: ['smt', 'order_block', 'ote', 'judas_swing'],
      time_windows: [
        { name: 'London Silver Bullet', time: '03:00-04:00', timezone: 'ET' }
      ],
      anti_patterns: ['entry_before_asia_sweep', 'ignoring_asia_range', 'fvg_without_displacement'],
      avoid_when: ['Wide Asia range (no clean sweep)', 'No clear liquidity pools', 'Bank holidays (London)'],
      confluence_minimum: 4.5,
      expected_rr: '1:2 to 1:3',
      sequence: [
        'Mark Asia session high/low',
        'Wait for London open sweep of Asia level',
        'SMS with displacement opposite sweep',
        'FVG forms during displacement',
        'Enter on FVG retracement, target London session objective'
      ],
      entry_rules: ['Enter only after Asia range sweep confirmed', 'FVG must form during displacement candle(s)', 'Time filter: 03:00-03:30 ideal entry window'],
      invalidation: ['No Asia range sweep by 03:15', 'Wide Asia range lacks clean levels', 'Displacement fails to produce FVG'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.3',
      variant_of: 'model-silver-bullet',
      session_context: 'First Silver Bullet of the day — sets directional bias'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 387,
        lineEnd: 410,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'time_based', 'killzone', 'intraday', 'silver_bullet', 'london_session', 'asia_sweep'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-power-of-three',
    type: 'model',
    domain: 'models',
    name: 'Power of Three (AMD)',
    description: 'Universal Accumulation → Manipulation → Distribution framework. The foundational ICT model that all other models are variations of. Fractal across ALL timeframes: works on 1-minute candles to monthly charts. Identifies the three-phase institutional cycle in every price movement.',
    content: 'Power of Three (AMD): Phase 1 ACCUMULATION: Price consolidates in a range, smart money builds positions. Retail sees "choppy market." Phase 2 MANIPULATION: False breakout/Judas Swing sweeps liquidity from one side of the range. Retail gets trapped. Phase 3 DISTRIBUTION: Real move opposite the manipulation, delivering price to the true objective. Smart money distributes to trapped retail. Application: Every timeframe exhibits AMD. Daily candle: Asia=Accumulation, London=Manipulation, NY=Distribution. Weekly: Mon-Tue=Accumulation, Wed=Manipulation, Thu-Fri=Distribution. This IS the market algorithm.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['accumulation_range', 'manipulation_sweep', 'distribution_delivery', 'liquidity_sweep'],
      optional_concepts: ['displacement', 'fvg', 'order_block', 'market_structure_shift'],
      time_windows: [
        { name: 'Daily AMD', time: 'Asia→London→NY', timezone: 'ET' },
        { name: 'Weekly AMD', time: 'Mon-Tue→Wed→Thu-Fri', timezone: 'ET' },
        { name: 'Intraday AMD', time: 'Any session open', timezone: 'ET' }
      ],
      anti_patterns: ['entering_during_accumulation', 'chasing_manipulation', 'counter_distribution'],
      avoid_when: ['Cannot identify accumulation phase', 'Manipulation not yet occurred', 'Distribution already underway'],
      confluence_minimum: 5.0,
      expected_rr: '1:3 to 1:5',
      sequence: [
        'Identify accumulation range (consolidation)',
        'Wait for manipulation (false breakout/liquidity sweep)',
        'Confirm manipulation via displacement opposite the sweep',
        'Enter during early distribution phase',
        'Target: opposite side of accumulation range or HTF objective'
      ],
      entry_rules: ['Never enter during accumulation — wait for manipulation', 'Manipulation must sweep clear liquidity', 'Distribution confirmed by displacement + SMS'],
      invalidation: ['Manipulation follows through (becomes real breakout)', 'No displacement after sweep', 'Distribution stalls at accumulation boundary'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.1',
      fractal_nature: 'Works on ALL timeframes: 1m to Monthly',
      core_principle: 'Every price movement follows AMD — this IS the algorithm'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 300,
        lineEnd: 348,
        uploadId,
        uploadedAt: timestamp
      },
      {
        filePath: 'knowledge_base/concept_relationships.yaml',
        lineStart: 1,
        lineEnd: 18,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'foundational', 'amd_cycle', 'fractal', 'universal', 'all_timeframes'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-po3-candle',
    type: 'model',
    domain: 'models',
    name: 'PO3 on Candle',
    description: 'Each individual candle embodies AMD: Open = Accumulation (reference point), Wick = Manipulation (false move away from delivery), Body = Distribution (real move/delivery). Understanding candle anatomy through AMD lens reveals institutional intent on every timeframe.',
    content: 'PO3 on Candle: Every candle tells the AMD story. OPEN: The accumulation reference point — where price begins. WICK (against body direction): The manipulation — a false move designed to sweep stops and grab liquidity. BODY: The distribution — the real delivery of price in the intended direction. Bullish candle: opens, wicks DOWN (manipulation sweeps sell stops), body closes UP (distribution). Bearish candle: opens, wicks UP (manipulation sweeps buy stops), body closes DOWN (distribution). Application: Use this to read intent. Long lower wick = buy-side manipulation completed. Long upper wick = sell-side manipulation completed. Works on any timeframe candle.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['candle_anatomy', 'accumulation_range', 'manipulation_sweep', 'distribution_delivery'],
      optional_concepts: ['displacement', 'fvg', 'institutional_candle'],
      time_windows: [
        { name: 'Any Timeframe', time: 'All candles exhibit PO3', timezone: 'ET' }
      ],
      anti_patterns: ['ignoring_wick_context', 'reading_candle_without_amd_lens', 'using_traditional_candlestick_patterns'],
      avoid_when: ['Doji candles (indecision)', 'Extremely low volume candles'],
      confluence_minimum: 3.0,
      expected_rr: 'Contextual — used for reading, not standalone entry',
      sequence: [
        'Identify candle open (accumulation reference)',
        'Observe wick against delivery direction (manipulation)',
        'Body shows distribution (true direction)',
        'Use as context for higher-level model execution'
      ],
      entry_rules: ['Not a standalone entry model — used for reading price action', 'Long wick = manipulation completed in that direction', 'Body direction reveals institutional intent'],
      invalidation: ['Doji or spinning top (no clear body direction)', 'Inside bar may delay AMD reading'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.1',
      key_insight: 'Every candle IS a Power of Three cycle in miniature'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 300,
        lineEnd: 330,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'candle_reading', 'amd_cycle', 'fractal', 'price_action', 'context'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-mmbm',
    type: 'model',
    domain: 'models',
    name: 'Market Maker Buy Model',
    description: 'Complete bullish reversal roadmap. Institutional accumulation model: Sweep Sell-Side Liquidity (SSL) → Displacement up → Re-accumulation at discount PD arrays → Target Buy-Side Liquidity (BSL). The full bullish reversal playbook from smart money perspective.',
    content: 'Market Maker Buy Model (MMBM): Phase 1 SELL-SIDE SWEEP: Price raids SSL (equal lows, previous lows, stop losses). Smart money buys from panicking sellers. Phase 2 DISPLACEMENT UP: Aggressive bullish displacement with FVGs, confirming accumulation complete. SMS/BOS on LTF. Phase 3 RE-ACCUMULATION: Price retraces to discount PD arrays (bullish OB, bullish FVG, OTE zone). This is the entry zone. Phase 4 EXPANSION TO BSL: Price delivers to buy-side targets (equal highs, previous highs, premium arrays). Smart money distributes longs to breakout buyers. Application: Identify SSL pool → wait for sweep → confirm displacement → enter at discount PD array → target BSL.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['sell_side_liquidity', 'displacement', 'pd_arrays_discount', 'buy_side_liquidity'],
      optional_concepts: ['order_block', 'fvg', 'ote', 'smt', 'breaker_block'],
      time_windows: [
        { name: 'Any Killzone', time: 'Best at session opens after sweep', timezone: 'ET' }
      ],
      anti_patterns: ['buying_before_ssl_sweep', 'chasing_after_displacement', 'ignoring_premium_discount'],
      avoid_when: ['HTF bearish bias', 'No clear SSL pool to sweep', 'Displacement lacks conviction'],
      confluence_minimum: 6.0,
      expected_rr: '1:3 to 1:5',
      sequence: [
        'Identify sell-side liquidity pool (equal lows, stops)',
        'Wait for SSL sweep (manipulation)',
        'Confirm bullish displacement (FVGs, candle bodies)',
        'Enter at discount PD array retracement (OB/FVG at OTE)',
        'Target buy-side liquidity (equal highs, premium arrays)'
      ],
      entry_rules: ['Only enter after SSL sweep confirmed', 'Displacement must produce FVG or break structure', 'Entry in discount zone only (below 50% of displacement)'],
      invalidation: ['Price returns below SSL sweep level', 'Displacement fails (no FVG, weak candles)', 'HTF structure remains bearish'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.5',
      model_type: 'bullish_reversal',
      smart_money_action: 'Accumulate at SSL → Distribute at BSL'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 420,
        lineEnd: 455,
        uploadId,
        uploadedAt: timestamp
      },
      {
        filePath: 'knowledge_base/concept_relationships.yaml',
        lineStart: 100,
        lineEnd: 115,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'bullish', 'reversal', 'market_maker', 'full_cycle', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-mmsm',
    type: 'model',
    domain: 'models',
    name: 'Market Maker Sell Model',
    description: 'Complete bearish reversal roadmap. Institutional distribution model: Sweep Buy-Side Liquidity (BSL) → Displacement down → Re-distribution at premium PD arrays → Target Sell-Side Liquidity (SSL). The full bearish reversal playbook from smart money perspective.',
    content: 'Market Maker Sell Model (MMSM): Phase 1 BUY-SIDE SWEEP: Price raids BSL (equal highs, previous highs, stop losses). Smart money sells to euphoric buyers. Phase 2 DISPLACEMENT DOWN: Aggressive bearish displacement with FVGs, confirming distribution complete. SMS/BOS on LTF. Phase 3 RE-DISTRIBUTION: Price retraces to premium PD arrays (bearish OB, bearish FVG, OTE zone). This is the entry zone. Phase 4 EXPANSION TO SSL: Price delivers to sell-side targets (equal lows, previous lows, discount arrays). Smart money covers shorts from panicking sellers. Application: Identify BSL pool → wait for sweep → confirm displacement → enter at premium PD array → target SSL.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['buy_side_liquidity', 'displacement', 'pd_arrays_premium', 'sell_side_liquidity'],
      optional_concepts: ['order_block', 'fvg', 'ote', 'smt', 'breaker_block'],
      time_windows: [
        { name: 'Any Killzone', time: 'Best at session opens after sweep', timezone: 'ET' }
      ],
      anti_patterns: ['selling_before_bsl_sweep', 'chasing_after_displacement', 'ignoring_premium_discount'],
      avoid_when: ['HTF bullish bias', 'No clear BSL pool to sweep', 'Displacement lacks conviction'],
      confluence_minimum: 6.0,
      expected_rr: '1:3 to 1:5',
      sequence: [
        'Identify buy-side liquidity pool (equal highs, stops)',
        'Wait for BSL sweep (manipulation)',
        'Confirm bearish displacement (FVGs, candle bodies)',
        'Enter at premium PD array retracement (OB/FVG at OTE)',
        'Target sell-side liquidity (equal lows, discount arrays)'
      ],
      entry_rules: ['Only enter after BSL sweep confirmed', 'Displacement must produce FVG or break structure', 'Entry in premium zone only (above 50% of displacement)'],
      invalidation: ['Price returns above BSL sweep level', 'Displacement fails (no FVG, weak candles)', 'HTF structure remains bullish'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.6',
      model_type: 'bearish_reversal',
      smart_money_action: 'Distribute at BSL → Accumulate at SSL'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 456,
        lineEnd: 478,
        uploadId,
        uploadedAt: timestamp
      },
      {
        filePath: 'knowledge_base/concept_relationships.yaml',
        lineStart: 116,
        lineEnd: 130,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'bearish', 'reversal', 'market_maker', 'full_cycle', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-london-close-model',
    type: 'model',
    domain: 'models',
    name: 'London Close Model',
    description: 'Fade the London/NY AM move during the 10 AM-12 PM ET window as London traders close positions. Profits are taken on London session moves, creating predictable retracement. Works best when London produced a strong directional move that needs profit-taking.',
    content: 'London Close Model: Between 10 AM and 12 PM ET, London traders begin closing positions established during London open (3-5 AM ET). This creates a predictable retracement/reversal of the London session move. Execution: 1) Identify the London session range and direction, 2) At 10 AM look for signs of exhaustion, 3) Enter fade of London direction at premium/discount PD arrays, 4) Target 50-79% retracement of London range. Best when: London produced a strong, clean directional move. The bigger the London move, the larger the retracement. Avoid when: London was range-bound (nothing to fade).',
    metadata: {
      category: 'execution_model',
      required_concepts: ['london_session_range', 'profit_taking', 'pd_arrays', 'time_of_day_macro'],
      optional_concepts: ['fvg', 'order_block', 'ote', 'displacement'],
      time_windows: [
        { name: 'London Close', time: '10:00-12:00', timezone: 'ET' }
      ],
      anti_patterns: ['fading_weak_london_move', 'entering_before_exhaustion_signs', 'targeting_full_reversal'],
      avoid_when: ['London session was range-bound', 'Strong continuation bias on HTF', 'Major NY news pending'],
      confluence_minimum: 4.5,
      expected_rr: '1:2 to 1:3',
      sequence: [
        'Mark London session range and direction (3-5 AM move)',
        'At 10 AM assess for exhaustion of London move',
        'Enter fade at premium/discount PD array',
        'Target 50-79% retracement of London session range',
        'Close before 12 PM or at target'
      ],
      entry_rules: ['Fade direction of London move only', 'Enter at PD array (OB/FVG) aligned with fade direction', 'Retracement target, not full reversal'],
      invalidation: ['London move continues with new displacement', 'No exhaustion signs by 10:30', 'HTF trend strongly supports London direction'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.8',
      model_type: 'retracement_fade',
      session_context: 'London profit-taking creates predictable retracement'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 522,
        lineEnd: 550,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'london_close', 'fade', 'retracement', 'session_based', 'profit_taking'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-ict-stinger',
    type: 'model',
    domain: 'models',
    name: 'ICT Stinger',
    description: 'RSI or Stochastic divergence occurring precisely at an OTE retracement level. Combines classical indicator divergence with ICT PD array confluence. The "stinger" is the moment oscillator divergence aligns with OTE — a high-conviction signal.',
    content: 'ICT Stinger Setup: 1) Identify displacement leg and apply OTE (62-79% fib zone), 2) As price retraces to OTE, check RSI or Stochastic for divergence, 3) Bullish Stinger: Price makes lower low at OTE but RSI/Stoch makes higher low, 4) Bearish Stinger: Price makes higher high at OTE but RSI/Stoch makes lower high, 5) Enter at the OTE level when divergence confirms. The Stinger adds oscillator confirmation to the standard OTE model. This is NOT a standalone indicator trade — the OTE context is mandatory. Best on M15-H1 timeframes for the divergence read.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['ote', 'rsi_divergence', 'stochastic_divergence', 'displacement'],
      optional_concepts: ['fvg', 'order_block', 'market_structure_shift', 'premium_discount'],
      time_windows: [
        { name: 'Any Killzone', time: 'When OTE + divergence align', timezone: 'ET' }
      ],
      anti_patterns: ['divergence_without_ote', 'indicator_only_trading', 'forcing_divergence'],
      avoid_when: ['No clear displacement leg', 'OTE zone not reached', 'Divergence is marginal/unclear'],
      confluence_minimum: 6.0,
      expected_rr: '1:2 to 1:4',
      sequence: [
        'Identify displacement leg',
        'Apply Fibonacci — mark OTE zone (62-79%)',
        'Wait for price to retrace into OTE',
        'Check RSI/Stochastic for divergence at OTE',
        'Enter when divergence confirms at OTE level'
      ],
      entry_rules: ['OTE zone is primary — divergence is confirmation', 'Divergence must be clear (not marginal)', 'Best on M15-H1 for divergence clarity'],
      invalidation: ['Price blows through OTE (past 79%)', 'No divergence at OTE', 'Indicators confirm move (no divergence)'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 5.2',
      key_insight: 'Oscillator divergence at OTE = highest conviction retracement entry'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 500,
        lineEnd: 520,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'divergence', 'ote', 'oscillator', 'confluence', 'high_conviction'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-iofed',
    type: 'model',
    domain: 'models',
    name: 'Institutional Order Flow Entry Drill',
    description: 'LTF precision entry drill: Displacement → FVG formation → Retrace into FVG → Continuation in delivery direction. The fundamental building block for all ICT LTF entries. Every ICT model uses IOFED at the execution layer.',
    content: 'IOFED (Institutional Order Flow Entry Drill): This is the universal LTF execution sequence that applies to ALL ICT models at the entry layer. Step 1 DISPLACEMENT: Aggressive candles (large bodies, small wicks) that break structure. This IS institutional order flow. Step 2 FVG FORMATION: Displacement creates Fair Value Gap(s). These are the footprint of institutions. Step 3 RETRACE: Price returns to the FVG. This is the entry zone — institutions left unfilled orders here. Step 4 CONTINUATION: Price continues in the displacement direction, delivering to target. Key: IOFED is not a standalone model — it is the EXECUTION DRILL used within other models. Silver Bullet uses IOFED. MMBM/MMSM use IOFED. HTF→LTF process uses IOFED at Layer 3.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['displacement', 'fvg', 'retracement', 'continuation'],
      optional_concepts: ['order_block', 'ote', 'market_structure_shift'],
      time_windows: [
        { name: 'Any Active Session', time: 'During displacement events', timezone: 'ET' }
      ],
      anti_patterns: ['entering_without_displacement', 'skipping_fvg_wait', 'chasing_past_fvg'],
      avoid_when: ['No displacement (weak candles)', 'FVG already filled', 'Against HTF bias'],
      confluence_minimum: 4.0,
      expected_rr: '1:2 to 1:3',
      sequence: [
        'Identify displacement (aggressive candles breaking structure)',
        'Mark FVG(s) created by displacement',
        'Wait for price to retrace into FVG',
        'Enter within FVG boundaries',
        'Target: continuation in displacement direction'
      ],
      entry_rules: ['Displacement must be aggressive (large bodies, small wicks)', 'FVG must be clear and unfilled', 'Enter only on retrace INTO FVG, not before or after'],
      invalidation: ['FVG fully filled (price passes through)', 'No continuation after retrace', 'Structure breaks against displacement direction'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 4.1',
      key_insight: 'IOFED is the universal execution drill — every ICT model uses it at the entry layer',
      usage: 'Building block, not standalone'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 410,
        lineEnd: 440,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'ltf_entry', 'drill', 'universal', 'building_block', 'displacement', 'fvg'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-cbdr-asia-sd-model',
    type: 'model',
    domain: 'models',
    name: 'CBDR/Asia SD Model',
    description: 'Combines Central Bank Dealer Range (CBDR: 2-8 PM ET) and Asia Range standard deviation projections to forecast next-session targets. The signature statistical model for projecting price magnitudes. Uses ±1 to ±2.5 SD from range midpoint as targets and reversal zones.',
    content: 'CBDR/Asia SD Model: Step 1) Mark CBDR: 2:00 PM - 8:00 PM ET range (Central Bank Dealer Range). Step 2) Mark Asia Range: 7:00 PM - 12:00 AM ET. Step 3) Calculate SD projections from each range midpoint: ±1 SD (68% probability target), ±2 SD (95% probability extreme), ±2.5 SD (reversal likely). Step 4) London/NY session price typically reaches 1-2 SD projections. Step 5) Beyond ±2 SD = overextended, look for reversal setups. Application: Use SD projections as profit targets and reversal zones. When price reaches +2 SD from CBDR, look for MMSM. When price reaches -2 SD, look for MMBM. Combine with daily bias for directional filter.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['cbdr', 'asia_range', 'standard_deviation', 'range_projection'],
      optional_concepts: ['daily_bias', 'premium_discount', 'time_of_day_macro', 'mmbm', 'mmsm'],
      time_windows: [
        { name: 'CBDR Formation', time: '14:00-20:00', timezone: 'ET' },
        { name: 'Asia Range', time: '19:00-00:00', timezone: 'ET' },
        { name: 'Projection Active', time: '00:00-16:00 (next day)', timezone: 'ET' }
      ],
      anti_patterns: ['ignoring_sd_levels', 'expecting_3sd_regularly', 'trading_against_sd_bias'],
      avoid_when: ['CBDR is abnormally wide (news)', 'Holiday sessions', 'CBDR and Asia give conflicting projections'],
      confluence_minimum: 5.0,
      expected_rr: '1:2 to 1:4',
      sequence: [
        'Mark CBDR (2-8 PM ET previous day)',
        'Mark Asia Range (7 PM-12 AM ET)',
        'Calculate ±1, ±2, ±2.5 SD from range midpoints',
        'Use SD levels as London/NY session targets',
        'Beyond ±2 SD: look for reversal setups'
      ],
      entry_rules: ['SD projections are targets/zones, not standalone entries', 'Combine with other ICT models for execution', 'Reversal setups triggered at ±2 SD or beyond'],
      invalidation: ['Major news distorts ranges', 'CBDR > average daily range (anomalous)', 'SD projections from CBDR and Asia conflict significantly'],
      source_reference: 'ICT_MASTER_LIBRARY.md Part 2.4',
      sd_levels: {
        '1_sd': '68% probability — normal target',
        '2_sd': '95% probability — extended target',
        '2_5_sd': 'Reversal likely — overextended'
      }
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 200,
        lineEnd: 250,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'statistical', 'cbdr', 'asia_range', 'standard_deviation', 'projection', 'targets'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-ict-model-12',
    type: 'model',
    domain: 'models',
    name: 'ICT Model 12 — Scalping Intraday',
    description: 'Intraday scalping model targeting 20-pip moves using Order Block + FVG confluence. Designed for quick in-and-out executions during killzones. High win rate, small targets, tight stops. The bread-and-butter intraday scalp.',
    content: 'ICT Model 12 — Scalping Intraday: Designed for 15-25 pip targets with tight risk. Execution: 1) Establish daily bias from HTF (D1/H4), 2) During killzone, identify OB + FVG confluence on M5/M1, 3) Enter at OB that contains FVG (or FVG at OB level), 4) Stop: Beyond OB (typically 8-12 pips), 5) Target: 20 pips or next liquidity pool. Characteristics: High frequency — multiple setups per session. Small targets — do not hold for runners. Tight stops — OB failure = immediate exit. Best during London and NY killzones when volatility supports 20-pip moves.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['order_block', 'fvg', 'daily_bias', 'killzone'],
      optional_concepts: ['ote', 'displacement', 'market_structure_shift', 'premium_discount'],
      time_windows: [
        { name: 'London KZ', time: '02:00-05:00', timezone: 'ET' },
        { name: 'NY KZ', time: '08:30-11:00', timezone: 'ET' }
      ],
      anti_patterns: ['holding_for_runners', 'entering_outside_killzone', 'ignoring_daily_bias'],
      avoid_when: ['Low volatility sessions', 'No daily bias established', 'Major news in next 30 min'],
      confluence_minimum: 4.5,
      expected_rr: '1:1.5 to 1:2.5',
      sequence: [
        'Establish daily bias (D1/H4)',
        'Wait for killzone',
        'Identify OB + FVG confluence on M5/M1',
        'Enter at OB/FVG confluence zone',
        'Target 20 pips or next liquidity, stop beyond OB'
      ],
      entry_rules: ['OB and FVG must align (ideally FVG inside OB)', 'Daily bias is directional filter', 'Enter only during killzone hours'],
      invalidation: ['OB violated (price closes beyond)', 'Daily bias changes mid-trade', 'Target not reached within 45 min — reassess'],
      source_reference: 'ICT Model 12 Mentorship',
      target: '15-25 pips',
      stop_loss: '8-12 pips (beyond OB)',
      frequency: 'Multiple setups per session'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 640,
        lineEnd: 670,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'scalping', 'intraday', 'ob_fvg', 'high_frequency', 'quick_targets'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-ict-model-7',
    type: 'model',
    domain: 'models',
    name: 'ICT Model 7 — Universal Trading Model',
    description: 'Comprehensive universal model using IPDA data ranges and Market Maker profiles. Combines weekly/daily range analysis with institutional footprint identification. Framework for all market conditions using IPDA lookback periods (20/40/60 day) to identify premium/discount and key levels.',
    content: 'ICT Model 7 — Universal Trading Model: Foundation: IPDA (Interbank Price Delivery Algorithm) operates on 20/40/60-day lookback periods. Step 1) Mark IPDA Data Ranges: 20-day (current dealing range), 40-day (intermediate), 60-day (long-term context). Step 2) Identify premium/discount within each range. Step 3) Read Market Maker Profile: Where are they likely positioned? What liquidity are they targeting? Step 4) Identify the current IPDA objective: Which old high/low, FVG, or OB is the algorithm seeking? Step 5) Execute using any ICT entry model (Silver Bullet, IOFED, etc.) aligned with IPDA direction. This is the "meta-model" that provides context for all other models.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['ipda_data_ranges', 'market_maker_profile', 'premium_discount', 'liquidity'],
      optional_concepts: ['fvg', 'order_block', 'displacement', 'daily_bias', 'weekly_profile'],
      time_windows: [
        { name: 'Weekly Planning', time: 'Sunday/Monday analysis', timezone: 'ET' },
        { name: 'Daily Execution', time: 'During killzones', timezone: 'ET' }
      ],
      anti_patterns: ['ignoring_ipda_ranges', 'trading_without_weekly_context', 'counter_ipda_direction'],
      avoid_when: ['IPDA ranges conflicting across timeframes', 'Price in equilibrium of all ranges', 'No clear IPDA objective identifiable'],
      confluence_minimum: 6.5,
      expected_rr: '1:3 to 1:6',
      sequence: [
        'Mark IPDA data ranges (20/40/60-day)',
        'Identify premium/discount zones within ranges',
        'Read Market Maker Profile (position, objective)',
        'Determine IPDA current objective (old high/low, FVG, OB)',
        'Execute with aligned ICT entry model during killzone'
      ],
      entry_rules: ['IPDA direction is the primary directional filter', 'Only enter trades aligned with IPDA objective', 'Use 20-day range for immediate context, 60-day for macro context'],
      invalidation: ['IPDA objective reached (reassess)', 'Market Maker profile shifts (new data)', 'All IPDA ranges become equilibrium'],
      source_reference: 'ICT Model 7 Mentorship Series',
      ipda_lookbacks: ['20-day: current dealing range', '40-day: intermediate context', '60-day: long-term institutional context'],
      model_type: 'universal_framework'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 670,
        lineEnd: 710,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'universal', 'ipda', 'market_maker', 'framework', 'comprehensive', 'all_conditions'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'model-ict-model-9',
    type: 'model',
    domain: 'models',
    name: 'ICT Model 9 — One Shot One Kill',
    description: 'Weekly single-trade model targeting 50-75 pips. One high-probability trade per week, maximum patience, maximum conviction. Wait for the A+ setup, execute once, done for the week. The sniper approach to ICT trading.',
    content: 'ICT Model 9 — One Shot One Kill: Philosophy: One trade per week. 50-75 pip target. Maximum selectivity. Execution: 1) Sunday: Analyze weekly chart, mark IPDA objectives, identify weekly bias. 2) Monday-Tuesday: Mark accumulation, observe manipulation developing. 3) Wednesday-Thursday: Execute THE trade — typically after Wednesday manipulation (mid-week reversal). 4) Target: 50-75 pips (one clean swing). 5) Done for the week regardless of outcome. Selection Criteria: Only A+ setups — HTF bias + killzone + PD array + SMS + FVG. If criteria not met by Thursday, no trade that week. Risk: 1-2% maximum per trade. This model builds discipline and forces quality over quantity.',
    metadata: {
      category: 'execution_model',
      required_concepts: ['weekly_bias', 'ipda_data_ranges', 'pd_arrays', 'market_structure_shift', 'fvg'],
      optional_concepts: ['smt', 'order_block', 'ote', 'mid_week_reversal', 'displacement'],
      time_windows: [
        { name: 'Analysis', time: 'Sunday evening', timezone: 'ET' },
        { name: 'Observation', time: 'Monday-Tuesday', timezone: 'ET' },
        { name: 'Execution', time: 'Wednesday-Thursday killzones', timezone: 'ET' }
      ],
      anti_patterns: ['taking_multiple_trades', 'forcing_setup', 'trading_friday', 'reducing_target'],
      avoid_when: ['No clear weekly bias', 'Holiday week', 'Major central bank week (unless aligned)', 'A+ criteria not met by Thursday'],
      confluence_minimum: 7.5,
      expected_rr: '1:3 to 1:5',
      sequence: [
        'Sunday: Weekly analysis, mark IPDA objectives and bias',
        'Monday-Tuesday: Observe accumulation and developing manipulation',
        'Wednesday: Watch for mid-week reversal / manipulation completion',
        'Execute single trade at A+ PD array with full confluence',
        'Target 50-75 pips, done for the week'
      ],
      entry_rules: ['Only A+ setups — all confluence must align', 'One trade per week maximum', 'Must have HTF bias + killzone + PD array + SMS + FVG', 'Risk 1-2% of account'],
      invalidation: ['Weekly bias invalidated', 'Setup criteria degraded below A+', 'Thursday passes without setup — stand down'],
      source_reference: 'ICT Model 9 Mentorship Series',
      target: '50-75 pips per week',
      frequency: 'One trade per week maximum',
      philosophy: 'Quality over quantity — the sniper approach'
    },
    sources: [
      {
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        lineStart: 710,
        lineEnd: 750,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    tags: ['execution_model', 'swing', 'weekly', 'sniper', 'one_trade', 'high_conviction', 'discipline'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
];
