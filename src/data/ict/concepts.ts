import type { Entity } from '../../lib/types';

const timestamp = new Date().toISOString();
const uploadId = 'ict-master-database-2026-02-18';

export const ICT_CONCEPTS: Entity[] = [
  // ===== CORE CONCEPTS (Part 1) =====
  {
    id: 'concept-market-structure',
    type: 'concept',
    domain: 'concepts',
    name: 'Market Structure',
    description: 'The foundational layer of ICT methodology representing the real-time footprint of Smart Money. Shows whether institutions are accumulating (bullish) or distributing (bearish) through the sequence of swing highs and lows.',
    content: 'Market Structure is validated by displacement and confirms trend direction through Higher Highs/Higher Lows (bullish) or Lower Lows/Lower Highs (bearish). Timeframe priority: Daily > 4H > 1H > 15M > 5M. Always confirm structure on 1H and Daily before intraday entries.',
    metadata: {
      category: 'structure',
      abbreviation: 'MS',
      detection_rules: 'Identify swing highs and lows, track sequence (HH/HL = bullish, LL/LH = bearish), confirm with displacement',
      entry_rules: ['Confirm structure on higher timeframe first', 'Wait for displacement to validate breaks', 'Without displacement, break is liquidity raid not structure'],
      invalidation: 'Structure shift confirmed by counter-trend displacement breaking key swing points',
      related_concepts: ['bos', 'sms-mss', 'choch', 'displacement'],
      confluence_weight: 2.0,
      timeframes: ['M1', 'M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 1.1'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 40,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['structure', 'core_concept', 'foundation', 'smart_money'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-bos',
    type: 'concept',
    domain: 'concepts',
    name: 'Break of Structure (BOS)',
    description: 'A continuation signal where price breaks a previous swing point IN THE SAME DIRECTION as the prevailing trend with visible displacement. Confirms trend continuation and provides entry opportunities on retracements.',
    content: 'BOS occurs when price breaks and closes beyond a previous swing high (in uptrend) or swing low (in downtrend) WITH displacement. This validates institutional continuation of the current trend. Look for entries on retracements to OTE, FVG, or Order Blocks after BOS confirmation.',
    metadata: {
      category: 'structure',
      abbreviation: 'BOS',
      detection_rules: 'Price breaks previous swing point in trend direction with displacement candle(s)',
      entry_rules: ['Wait for BOS confirmation with displacement', 'Enter on retracement to FVG/OB/OTE', 'Target opposite liquidity'],
      invalidation: 'Immediate reversal through BOS point or counter-trend MSS',
      related_concepts: ['market-structure', 'displacement', 'sms-mss', 'choch'],
      confluence_weight: 1.5,
      timeframes: ['M5', 'M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 1.2'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 42,
      lineEnd: 65,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['structure', 'continuation', 'confirmation', 'core_concept'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-sms-mss',
    type: 'concept',
    domain: 'concepts',
    name: 'Shift in Market Structure (SMS/MSS)',
    description: 'A reversal signal where price breaks a swing point AGAINST the current trend with clear displacement. Indicates institutional shift from one directional bias to another. NOT an entry signal alone - wait for new structure to form.',
    content: 'SMS/MSS occurs when price breaks against the prevailing trend with displacement through a protected swing low/high. This signals potential reversal but requires confirmation through new structure formation. More significant than CHoCH.',
    metadata: {
      category: 'structure',
      abbreviation: 'SMS/MSS',
      detection_rules: 'Price breaks swing point against trend with displacement through protected level',
      entry_rules: ['NOT an entry signal by itself', 'Wait for new structure to form', 'Look for liquidity sweep confirmation', 'Enter on retest of broken structure'],
      invalidation: 'Immediate BOS back in original trend direction',
      related_concepts: ['market-structure', 'bos', 'choch', 'displacement', 'liquidity'],
      confluence_weight: 1.5,
      timeframes: ['M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 1.2'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 42,
      lineEnd: 75,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['structure', 'reversal', 'confirmation', 'core_concept'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-choch',
    type: 'concept',
    domain: 'concepts',
    name: 'Change of Character (CHoCH)',
    description: 'A long-term reversal signal where price breaks against trend at key structure points. Weaker than SMS but alerts traders to weakening dominant trend. Early warning of potential major trend shift.',
    content: 'CHoCH signals major trend weakening when price breaks counter-trend swing points. Acts as early warning system before full SMS confirmation. Often precedes larger market reversals.',
    metadata: {
      category: 'structure',
      abbreviation: 'CHoCH',
      detection_rules: 'Break of counter-trend swing point at key levels',
      entry_rules: ['Early warning only, not entry signal', 'Prepare for potential reversal', 'Wait for SMS confirmation'],
      invalidation: 'Strong BOS reasserting original trend',
      related_concepts: ['bos', 'sms-mss', 'market-structure'],
      confluence_weight: 1.0,
      timeframes: ['H1', 'H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 1.2'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 42,
      lineEnd: 75,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['structure', 'reversal', 'early_warning', 'core_concept'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-fvg',
    type: 'concept',
    domain: 'concepts',
    name: 'Fair Value Gap (FVG)',
    description: 'A three-candle imbalance formation where price moved so rapidly that opposing liquidity was skipped. Bullish FVG: Candle 1 high < Candle 3 low. Bearish FVG: Candle 1 low > Candle 3 high. Price often retraces to fill 50% of the gap before continuing.',
    content: 'FVG forms when displacement creates an inefficiency. Gap between candle 1 and candle 3 represents institutional imbalance. Entry at 50% Consequent Encroachment (CE) provides optimal risk/reward. Stop loss goes beyond gap-creating candle. MUST follow displacement - gaps without displacement are low probability.',
    metadata: {
      category: 'price_action',
      abbreviation: 'FVG',
      detection_rules: 'Three-candle pattern: Bullish if C1.high < C3.low, Bearish if C1.low > C3.high. Must follow displacement.',
      entry_rules: ['Enter at 50% CE of gap', 'Stop beyond gap candle', 'Only after confirmed BOS/SMS', 'Avoid if 50%+ already filled'],
      invalidation: 'Gap fills completely before entry or closes through far side',
      related_concepts: ['displacement', 'order-block', 'ote', 'pd-array', 'inversion-fvg'],
      confluence_weight: 1.5,
      timeframes: ['M1', 'M5', 'M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 1.3'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 77,
      lineEnd: 120,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['price_action', 'core_concept', 'pd_array', 'imbalance', 'entry_zone'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-order-block',
    type: 'concept',
    domain: 'concepts',
    name: 'Order Block (OB)',
    description: 'The last opposite-colored candle before displacement. Bullish OB = last DOWN candle before bullish displacement. Bearish OB = last UP candle before bearish displacement. Represents institutional order accumulation zone.',
    content: 'Order Blocks mark where institutions placed orders before displacing price. Price respects OB body or 50% midpoint on retests. Invalidated if body is broken by close. Best when combined with FVG (Unicorn setup) or aligned with OTE zones.',
    metadata: {
      category: 'structure',
      abbreviation: 'OB',
      detection_rules: 'Last red candle before bullish displacement OR last green candle before bearish displacement. Must have displacement to validate.',
      entry_rules: ['Entry at open or 50% of block body', 'Price may wick through but should respect body', 'Use as re-entry on retracements'],
      invalidation: 'Body broken - price closes through 50% of OB body',
      related_concepts: ['displacement', 'fvg', 'breaker-block', 'pd-array', 'mitigation-block'],
      confluence_weight: 1.5,
      timeframes: ['M5', 'M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 1.4'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 122,
      lineEnd: 145,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['structure', 'core_concept', 'pd_array', 'entry_zone', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-displacement',
    type: 'concept',
    domain: 'concepts',
    name: 'Displacement',
    description: 'Strong, impulsive price move with large-bodied candles (2x+ average range), minimal wicks, creating FVGs and OBs. The footprint of institutional order flow. REQUIRED for all valid ICT setups. Without displacement, setups are weak and should be ignored.',
    content: 'Displacement is the institutional commitment signal - long bodies, minimal opposite wicks, breaks structure with authority. Validates BOS, SMS, FVGs, and OBs. No displacement = no smart money sponsorship = low probability setup. This is THE filter for all ICT concepts.',
    metadata: {
      category: 'confirmation',
      abbreviation: 'DISP',
      detection_rules: 'Large-bodied candle(s), 2x+ avg range, minimal opposite wick, breaks structure with authority',
      entry_rules: ['Do not enter ANY setup without displacement confirmation', 'Wait for displacement before validating FVG/OB', 'Displacement must break structure, not just move price'],
      invalidation: 'Immediate reversal or weak follow-through',
      related_concepts: ['fvg', 'order-block', 'bos', 'sms-mss', 'liquidity-void'],
      confluence_weight: 2.5,
      timeframes: ['M1', 'M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 1.5'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 147,
      lineEnd: 170,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['confirmation', 'critical', 'core_concept', 'institutional', 'smart_money'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-liquidity',
    type: 'concept',
    domain: 'concepts',
    name: 'Liquidity',
    description: 'Resting stop orders that price is DRAWN to. Buy-Side Liquidity (BSL) above swing highs where shorts have stops. Sell-Side Liquidity (SSL) below swing lows where longs have stops. Equal highs/lows, PDH/PDL, session extremes are liquidity pools. Price sweeps these before real moves.',
    content: 'Liquidity pools include: Equal highs/lows, trendline liquidity, previous day/week highs/lows, session extremes, Asia range. Smart Money needs liquidity to fill large orders. Liquidity sweep → displacement opposite direction = high probability reversal. If there is no liquidity to draw on, there is no reason for price to move.',
    metadata: {
      category: 'liquidity',
      abbreviation: 'LIQ',
      detection_rules: 'Identify equal highs/lows, swing extremes, previous day/week/session highs/lows, trendline liquidity',
      entry_rules: ['Do not trade UNTIL liquidity is swept', 'Wait for sweep then displacement opposite', 'Liquidity sweep without displacement = failed setup'],
      invalidation: 'No sweep occurs or double sweep in same direction',
      related_concepts: ['displacement', 'smt', 'bpr', 'turtle-soup', 'judas-swing'],
      confluence_weight: 2.5,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 1.6'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 172,
      lineEnd: 205,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['liquidity', 'critical', 'core_concept', 'target', 'stop_hunt'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-ote',
    type: 'concept',
    domain: 'concepts',
    name: 'Optimal Trade Entry (OTE)',
    description: 'The 61.8% to 79% Fibonacci retracement zone where Smart Money re-engages after displacement. Sweet spot: 70.5%. Only use after confirmed displacement and BOS/SMS. Often aligns with FVGs and OBs for maximum confluence.',
    content: 'OTE zone boundaries: 61.8% (upper), 70.5% (smart money sweet spot), 79% (lower). Measure from swing low to swing high (bullish) or vice versa. Most effective during Killzones. Confluence with FVG or OB inside OTE zone = highest probability setups.',
    metadata: {
      category: 'fib_based',
      abbreviation: 'OTE',
      detection_rules: 'Apply Fibonacci retracement after displacement leg. Zone is 61.8-79%.',
      entry_rules: ['Only after confirmed displacement and BOS/SMS', 'Measure swing low to high (bullish) or high to low (bearish)', 'Sweet spot entry at 70.5%', 'Best during Killzones'],
      invalidation: 'Price fails to react in OTE zone or breaks beyond 79%',
      related_concepts: ['fvg', 'order-block', 'displacement', 'premium-discount'],
      confluence_weight: 1.0,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 1.7'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 207,
      lineEnd: 230,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['fib_based', 'core_concept', 'entry_zone', 'confluence', 'retracement'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-premium-discount',
    type: 'concept',
    domain: 'concepts',
    name: 'Premium/Discount Zones',
    description: 'The 50% midpoint of any swing divides price into expensive (premium) and cheap (discount) zones. Bullish narrative: buy discount, target premium. Bearish narrative: sell premium, target discount. Filters low-probability setups across all timeframes.',
    content: 'Premium = above 50% (expensive). Discount = below 50% (cheap). Trading rules: Buy in discount only with bullish bias, sell in premium only with bearish bias. Bullish FVG in premium = low probability. Bearish OB in discount = unlikely to hold.',
    metadata: {
      category: 'price_action',
      abbreviation: 'P/D',
      detection_rules: 'Calculate 50% midpoint of swing high to swing low range',
      entry_rules: ['Bullish trades: Only enter in discount zone', 'Bearish trades: Only enter in premium zone', 'Avoid counter-zone setups'],
      invalidation: 'Narrative changes or structure shift',
      related_concepts: ['ote', 'market-structure', 'daily-bias'],
      confluence_weight: 1.0,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 1.8'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 232,
      lineEnd: 250,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['price_action', 'core_concept', 'filter', 'zones'],
    createdAt: timestamp,
    updatedAt: timestamp
  },

  // ===== ADVANCED CONCEPTS (Part 2) =====
  {
    id: 'concept-breaker-block',
    type: 'concept',
    domain: 'concepts',
    name: 'Breaker Block',
    description: 'A failed Order Block that causes market structure shift and becomes support/resistance. Forms when price fails to continue from OB, breaks through it, then respects it as opposite polarity. Entry at breaker body after confirmation.',
    content: 'Formation: 1) OB forms, 2) Price fails to continue, 3) Structure breaks THROUGH the OB, 4) Failed OB becomes Breaker Block. Entry on retest of broken level with HTF bias confirmation. Strongest after liquidity sweep.',
    metadata: {
      category: 'advanced',
      abbreviation: 'BB',
      detection_rules: 'OB that failed and was broken through, now acting as S/R from opposite side',
      entry_rules: ['Wait for clear break through OB', 'Confirm with HTF bias', 'Enter on retest of breaker body'],
      invalidation: 'Price breaks back through breaker',
      related_concepts: ['order-block', 'liquidity', 'displacement'],
      confluence_weight: 1.0,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 2.1'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 252,
      lineEnd: 275,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['advanced', 'pd_array', 'reversal', 'structure'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-mitigation-block',
    type: 'concept',
    domain: 'concepts',
    name: 'Mitigation Block',
    description: 'A candle formed by failed breakout or liquidity raid that is later revisited and respected. Different from OB (origin of move) - Mitigation Blocks come from FAILED moves. Use only after SMS or liquidity raid confirmation.',
    content: 'Mitigation Blocks form when false breakout/raid candle becomes reaction zone. Often align with FVGs or OBs. Confirm raid and reversal first before trading. Strongest at key structure levels after liquidity sweeps.',
    metadata: {
      category: 'advanced',
      abbreviation: 'MB',
      detection_rules: 'Candle from failed breakout or liquidity raid that gets revisited',
      entry_rules: ['Use only after SMS or liquidity raid', 'Confirm reversal first', 'Often align with FVG/OB'],
      invalidation: 'Price breaks through mitigation block',
      related_concepts: ['order-block', 'liquidity', 'bpr'],
      confluence_weight: 1.0,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 2.2'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 277,
      lineEnd: 295,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['advanced', 'pd_array', 'failed_move', 'raid'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-bpr',
    type: 'concept',
    domain: 'concepts',
    name: 'Balanced Price Range (BPR)',
    description: 'Forms after aggressive liquidity sweep high/low when price returns and trades back inside the range. Midpoint acts as reaction level for re-entries when initial move was missed.',
    content: 'Formation: 1) Liquidity sweep occurs, 2) Structure breaks, 3) Price retraces inside range. Midpoint becomes key reaction point. Strongest after BOS that sweeps liquidity and immediately rebalances. Use for second-chance entries.',
    metadata: {
      category: 'advanced',
      abbreviation: 'BPR',
      detection_rules: 'After liquidity sweep, price returns and consolidates inside previously swept range',
      entry_rules: ['Midpoint is reaction level', 'Use for missed initial moves', 'Strongest after BOS + sweep + rebalance'],
      invalidation: 'Range breaks significantly',
      related_concepts: ['liquidity', 'displacement', 'mitigation-block'],
      confluence_weight: 1.0,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 2.3'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 297,
      lineEnd: 315,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['advanced', 'post_sweep', 'reentry', 'range'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-liquidity-void',
    type: 'concept',
    domain: 'concepts',
    name: 'Liquidity Void',
    description: 'Long-bodied candle with minimal/no wick overlap - extreme imbalance where price moved too fast. Visual representation of institutional delivery with no opposing volume. Midpoint often acts as reaction point.',
    content: 'Characteristics: No opposing transaction volume, appears during major institutional legs, extreme imbalance. Not entry signal but displacement confirmation. Price may rebalance to midpoint before continuation. Combine with BOS, OB, or FVG.',
    metadata: {
      category: 'advanced',
      abbreviation: 'LV',
      detection_rules: 'Long-bodied candle with no/minimal wick overlap showing extreme imbalance',
      entry_rules: ['Displacement confirmation not entry signal', 'Midpoint may be reaction point', 'Combine with BOS/OB/FVG'],
      invalidation: 'Price consolidates within void',
      related_concepts: ['displacement', 'fvg', 'volume-imbalance'],
      confluence_weight: 1.0,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 2.4'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 317,
      lineEnd: 335,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['advanced', 'imbalance', 'displacement', 'extreme_move'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-pd-array',
    type: 'concept',
    domain: 'concepts',
    name: 'PD Array Matrix',
    description: 'Premium/Discount Array hierarchy. Priority order: OB > FVG > Breaker > Mitigation > Void > NWOG/NDOG. Use in conjunction with ICT 2022 Model or Silver Bullet. HTF PD Arrays take priority. Always combine with structure and time.',
    content: 'PD Arrays are the institutional tools for framing setups. Components in priority: Order Blocks (entry zones), Fair Value Gaps (imbalances), Breaker Blocks (failed OBs as S/R), Mitigation Blocks (post-raid zones), Liquidity Voids (extreme imbalances), New Week/Day Opening Gaps.',
    metadata: {
      category: 'advanced',
      abbreviation: 'PDA',
      detection_rules: 'Hierarchy of premium/discount zones used by institutions',
      entry_rules: ['Use with ICT 2022 or Silver Bullet', 'HTF arrays take priority', 'Combine with structure and time'],
      invalidation: 'Array invalidation depends on specific PD Array type',
      related_concepts: ['order-block', 'fvg', 'breaker-block', 'mitigation-block', 'liquidity-void'],
      confluence_weight: 1.5,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 2.5'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 337,
      lineEnd: 360,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['advanced', 'framework', 'hierarchy', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-inversion-fvg',
    type: 'concept',
    domain: 'concepts',
    name: 'Inversion FVG (IFVG)',
    description: 'When price closes THROUGH original FVG, it flips polarity. Bullish FVG becomes bearish support, bearish FVG becomes bullish resistance. Requires candle closure validation to confirm inversion.',
    content: 'IFVG forms when price invalidates original FVG by closing through it. Original gap then acts as opposite polarity. Entry on retest of inverted FVG from new side. Must wait for candle close confirmation of flip.',
    metadata: {
      category: 'advanced',
      abbreviation: 'IFVG',
      detection_rules: 'Price closes through original FVG body, invalidating it',
      entry_rules: ['Wait for candle close through FVG', 'Wait for retest from opposite side', 'Confirm with structure'],
      invalidation: 'Price closes back through inverted FVG',
      related_concepts: ['fvg', 'displacement'],
      confluence_weight: 0.5,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 2 (implied)'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 77,
      lineEnd: 120,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['advanced', 'fvg', 'inversion', 'polarity_flip'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-smt',
    type: 'concept',
    domain: 'concepts',
    name: 'SMT Divergence',
    description: 'Smart Money Tool - comparative analysis between correlated instruments where one makes new swing but other fails to confirm. EUR/USD vs GBP/USD, ES vs NQ, DXY vs EUR/USD. The pair that DOESN\'T make new extreme shows true direction. Weight: 1.5x at liquidity sweep.',
    content: 'Example: EUR/USD makes lower low, GBP/USD does NOT = Bullish SMT. NQ makes higher high, ES does NOT = Bearish SMT. Best after liquidity sweep, confirms SMS, during Killzones. NOT entry signal alone - filter and confirmation tool.',
    metadata: {
      category: 'confirmation',
      abbreviation: 'SMT',
      detection_rules: 'Compare correlated pairs/instruments - one makes new extreme, other fails',
      entry_rules: ['Use after liquidity sweep', 'Confirms SMS', 'Best during Killzones', 'NOT entry signal alone'],
      invalidation: 'Both instruments confirm same direction',
      related_concepts: ['liquidity', 'sms-mss', 'killzones'],
      confluence_weight: 1.5,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 5.1'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 500,
      lineEnd: 525,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['confirmation', 'divergence', 'correlation', 'filter'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-ipda',
    type: 'concept',
    domain: 'concepts',
    name: 'IPDA (Interbank Price Delivery Algorithm)',
    description: 'ICT concept that price movements are driven by liquidity zones and imbalances, not random. Smart Money follows structured rules to: accumulate liquidity, balance imbalances, deliver price between pools. Framework: Price + Time + Liquidity. Uses 20/40/60 day lookback ranges.',
    content: 'IPDA is the algorithm governing institutional price delivery. Analysis points: Price (key levels, PD Arrays), Time (session behavior, macros), Liquidity (inaccuracy areas to cover). Not random - price seeks liquidity or rebalance by design.',
    metadata: {
      category: 'advanced',
      abbreviation: 'IPDA',
      detection_rules: 'Framework combining price levels, time windows, and liquidity targets',
      entry_rules: ['Identify liquidity target', 'Confirm time window', 'Use PD Arrays for entry', 'Price seeks liquidity or rebalance'],
      invalidation: 'Multiple failed deliveries at expected times',
      related_concepts: ['liquidity', 'pd-array', 'killzones', 'macro-times'],
      confluence_weight: 1.5,
      timeframes: ['H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 4.3'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 450,
      lineEnd: 475,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['advanced', 'framework', 'algorithm', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },

  // ===== TIME-BASED CONCEPTS (Part 4) =====
  {
    id: 'concept-killzones',
    type: 'concept',
    domain: 'concepts',
    name: 'Killzones',
    description: 'Specific trading sessions with distinct institutional behavior. London (2-5 AM ET) engineers liquidity. NY AM (7-10 AM ET) has highest volume and biggest moves - BEST session. NY PM (1-3 PM ET) for continuation/reversal. Asian (7-10 PM ET) for accumulation. AVOID 11AM-12:30PM dead zone.',
    content: 'London Killzone: Sets stage for day, Judas Swings. NY AM: Primary trading session, Silver Bullet setups. NY PM: Secondary opportunities. Asian: Low volatility consolidation. Do not take entries outside Killzones especially lunch 11-12:30 PM.',
    metadata: {
      category: 'time_based',
      abbreviation: 'KZ',
      detection_rules: 'Time-based: London 2-5am, NY AM 7-10am, NY PM 1-3pm, Asian 7-10pm ET',
      entry_rules: ['Only trade during Killzones', 'Best: NY AM 7-10am', 'AVOID 11am-12:30pm lunch', 'AVOID after 5pm close'],
      invalidation: 'N/A - time-based concept',
      related_concepts: ['macro-times', 'judas-swing', 'silver-bullet', 'power-of-three'],
      confluence_weight: 1.5,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 4.1'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 400,
      lineEnd: 430,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['time_based', 'critical', 'session', 'timing'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-macro-times',
    type: 'concept',
    domain: 'concepts',
    name: 'ICT Macro Times',
    description: 'Specific 20-minute intervals where algorithm seeks liquidity or reprices FVGs. Key times: 09:30, 09:50, 10:10, 10:50, 11:10, 13:10, 13:50, 14:10, 14:50, 15:10, 15:50 ET. Look for displacement/FVG formation at these exact times for high probability setups.',
    content: 'Macro times are algorithmic price delivery windows. Short institutional instructions creating events. Add confluence to trading decisions. Most powerful: 09:50-10:10 (Silver Bullet setup), 10:50-11:10 (reversal/cleanup), 13:10-13:40 (PM session).',
    metadata: {
      category: 'time_based',
      abbreviation: 'MACRO',
      detection_rules: 'Exact time windows: 09:30, 09:50, 10:10, 10:50, 11:10, 13:10, 13:50, 14:10, 14:50, 15:10, 15:50 ET',
      entry_rules: ['Look for displacement at macro times', 'Watch for FVG formation', 'Combine with Killzone analysis'],
      invalidation: 'N/A - time-based concept',
      related_concepts: ['killzones', 'silver-bullet', 'displacement', 'fvg'],
      confluence_weight: 1.5,
      timeframes: ['M1', 'M5', 'M15'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 4.2'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 432,
      lineEnd: 448,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['time_based', 'critical', 'timing', 'algorithm'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-daily-bias',
    type: 'concept',
    domain: 'concepts',
    name: 'Daily Bias Model',
    description: 'Pre-session determination of buy/sell day using HTF context. Components: HTF structure (Daily/4H/1H), Draw on Liquidity target, Premium/Discount position, Key liquidity pools (PDH/PDL, weekly), Time of week. Bullish bias = buy discount only. Bearish bias = sell premium only.',
    content: 'Daily Bias prevents counter-trend trading. Check: 1) HTF market structure, 2) Liquidity draw target, 3) Premium or discount current position, 4) Key pools (PDH/PDL), 5) Time of week (Monday accumulation, Friday expansion). Recalculate after major BOS/SMS or HTF liquidity event.',
    metadata: {
      category: 'time_based',
      abbreviation: 'DB',
      detection_rules: 'Analyze HTF structure, liquidity targets, premium/discount, PDH/PDL, day of week',
      entry_rules: ['Bullish bias: Only buy in discount', 'Bearish bias: Only sell in premium', 'Recalculate after HTF BOS/SMS'],
      invalidation: 'HTF structure shift or major liquidity event',
      related_concepts: ['premium-discount', 'liquidity', 'market-structure', 'killzones'],
      confluence_weight: 2.0,
      timeframes: ['H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 4.4'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 477,
      lineEnd: 498,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['time_based', 'filter', 'bias', 'htf', 'pre_session'],
    createdAt: timestamp,
    updatedAt: timestamp
  },

  // ===== STRUCTURAL CONCEPTS =====
  {
    id: 'concept-power-of-three',
    type: 'concept',
    domain: 'concepts',
    name: 'Power of Three (AMD)',
    description: 'Three-phase session cycle: Accumulation (Asian) → Manipulation (London/Judas) → Distribution (NY). The manipulation IS the entry signal - it sweeps liquidity. Smart Money builds positions (A), traps retail (M), delivers to target (D).',
    content: 'Session application: Asian session accumulates (range/consolidation), London open manipulates (Judas Swing sweeps), NY session distributes (real move to opposite liquidity). Trading: 1) Identify accumulation range, 2) Wait for manipulation sweep, 3) Enter after displacement confirms distribution, 4) Target opposite liquidity.',
    metadata: {
      category: 'structure',
      abbreviation: 'PO3/AMD',
      detection_rules: 'Identify accumulation range, watch for manipulation sweep, confirm distribution displacement',
      entry_rules: ['Identify accumulation range', 'Wait for manipulation sweep', 'Enter after displacement', 'Target opposite liquidity'],
      invalidation: 'Failed distribution or reversal back into accumulation',
      related_concepts: ['judas-swing', 'killzones', 'liquidity', 'displacement'],
      confluence_weight: 1.5,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 3.1'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 362,
      lineEnd: 385,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['structure', 'session', 'cycle', 'manipulation'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-volume-imbalance',
    type: 'concept',
    domain: 'concepts',
    name: 'Volume Imbalance',
    description: 'Advanced PD array concept requiring displacement and volume analysis. Represents institutional imbalance with no opposing volume. Similar to liquidity void but specifically focused on volume characteristics.',
    content: 'Volume Imbalance shows where institutions moved price without opposition. Requires advanced PD arrays understanding plus displacement confirmation. Used for precision entries in conjunction with other concepts.',
    metadata: {
      category: 'advanced',
      abbreviation: 'VI',
      detection_rules: 'Requires advanced PD arrays + displacement + volume analysis',
      entry_rules: ['Combine with displacement', 'Use with PD Array Matrix', 'Confirm with HTF bias'],
      invalidation: 'Price consolidates within imbalance',
      related_concepts: ['pd-array', 'displacement', 'liquidity-void'],
      confluence_weight: 1.0,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'concept_relationships.yaml'
    },
    sources: [{
      filePath: 'knowledge_base/concept_relationships.yaml',
      lineStart: 100,
      lineEnd: 110,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['advanced', 'pd_array', 'imbalance', 'volume'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-rejection-block',
    type: 'concept',
    domain: 'concepts',
    name: 'Rejection Block',
    description: 'Advanced PD array requiring liquidity sweep and strong rejection. Forms when price aggressively rejects from a level after liquidity run. Shows institutional commitment to direction.',
    content: 'Rejection Block forms at key levels after liquidity sweep with strong opposing candle. Shows smart money defending level. Requires advanced PD arrays understanding plus liquidity sweep confirmation.',
    metadata: {
      category: 'advanced',
      abbreviation: 'RB',
      detection_rules: 'Requires advanced PD arrays + liquidity sweep + strong rejection candle',
      entry_rules: ['Wait for liquidity sweep', 'Confirm strong rejection', 'Enter on retest'],
      invalidation: 'Level breaks after initial rejection',
      related_concepts: ['pd-array', 'liquidity', 'displacement'],
      confluence_weight: 1.0,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'concept_relationships.yaml'
    },
    sources: [{
      filePath: 'knowledge_base/concept_relationships.yaml',
      lineStart: 110,
      lineEnd: 120,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['advanced', 'pd_array', 'rejection', 'liquidity'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-institutional-order-flow',
    type: 'concept',
    domain: 'concepts',
    name: 'Institutional Order Flow',
    description: 'Dominant direction Smart Money pushes price - underlying bias driving structure and delivery. Building blocks: HH/HL or LL/LH structure, SMS shifts, liquidity targets, displacement events, time windows. Rule: Do not counter flow - "You will get steamrolled".',
    content: 'Institutional Order Flow is the smart money river - swim with it or get destroyed. Components: Market structure (HH/HL bullish, LL/LH bearish), Structure shifts (SMS confirms changes), Liquidity targets (where they\'re going), Displacement (institutional commitment), Time delivery windows (when they move).',
    metadata: {
      category: 'confirmation',
      abbreviation: 'IOF',
      detection_rules: 'Combine market structure + SMS + liquidity targets + displacement + time windows',
      entry_rules: ['Do not counter flow', 'Wait for confirmed SMS and divergence to counter', 'Align all trades with dominant flow'],
      invalidation: 'Confirmed SMS with multiple confluences',
      related_concepts: ['market-structure', 'sms-mss', 'liquidity', 'displacement', 'killzones'],
      confluence_weight: 2.0,
      timeframes: ['H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md Part 5.2'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 527,
      lineEnd: 550,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['confirmation', 'critical', 'bias', 'smart_money', 'flow'],
    createdAt: timestamp,
    updatedAt: timestamp
  },

  // ===== EXPANDED ICT CONCEPTS - Foundation & Market Phases =====
  {
    id: 'concept-accumulation',
    type: 'concept',
    domain: 'concepts',
    name: 'Accumulation',
    description: 'Accumulation is the first phase of the AMD (Accumulation, Manipulation, Distribution) cycle where smart money quietly builds positions within a consolidation range. During this phase, price trades sideways creating equal highs and equal lows, which simultaneously builds liquidity pools above and below the range that will later be targeted.',
    content: 'During accumulation, institutional players are pairing their orders against retail participants who are trading the range boundaries. The equal highs and lows formed during this phase represent resting stop-loss orders and pending breakout orders that create the liquidity pools smart money needs. Traders should identify accumulation by looking for tight consolidation ranges with relatively equal highs and lows, typically occurring during low-volume sessions like Asia. The transition from accumulation to manipulation is signaled when price sharply sweeps one side of the range before reversing into the distribution phase.',
    metadata: {
      category: 'market_phase',
      abbreviation: 'ACC',
      detection_rules: 'Look for tight consolidation ranges forming equal highs and equal lows. Volume should be relatively low. Often occurs during Asia session or early in a killzone. The range boundaries should be tested multiple times without a decisive break.',
      entry_rules: ['Wait for accumulation range to be clearly defined with at least 3 touches on each boundary', 'Do not enter during accumulation — wait for manipulation sweep', 'Identify which side of the range has more liquidity to anticipate manipulation direction'],
      invalidation: 'Accumulation is invalidated if price breaks decisively through one side of the range with strong displacement and does not return, indicating distribution has begun without a clear manipulation phase.',
      related_concepts: ['power-of-three', 'distribution', 'liquidity', 'consolidation', 'killzones', 'asia-session'],
      confluence_weight: 1.2,
      timeframes: ['M5', 'M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md — AMD Cycle / Power of Three'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['accumulation', 'amd', 'smart-money', 'range', 'consolidation', 'power-of-three'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-adr',
    type: 'concept',
    domain: 'concepts',
    name: 'Average Daily Range',
    description: 'The Average Daily Range (ADR) measures the average pip distance between the high and low of daily candles over a specified lookback period, typically 5, 10, or 20 days. ADR serves as a statistical tool to gauge how much price is likely to move in a given trading day, helping traders set realistic profit targets and determine when a daily move may be exhausted.',
    content: 'ADR is calculated by averaging the high-to-low range of daily candles over the chosen period. When price has already moved 80-100% of its ADR, the probability of further expansion diminishes significantly, signaling traders to avoid chasing entries. Conversely, when price has only moved 20-30% of ADR, there is substantial room for expansion in the anticipated direction. ICT traders use ADR in conjunction with daily bias and draw on liquidity to determine whether sufficient range remains to reach their targets before the day ends.',
    metadata: {
      category: 'measurement',
      abbreviation: 'ADR',
      detection_rules: 'Calculate the average high-to-low range of the last 5, 10, or 20 daily candles. Compare current day range consumption against ADR to assess remaining expansion potential. Mark ADR projections from the daily open or session low/high.',
      entry_rules: ['Only take trades when less than 60% of ADR has been consumed', 'Use ADR as a profit target filter — if target exceeds remaining ADR, reduce position or skip trade', 'Compare ADR with CBDR and Asia Range standard deviation projections for confluence'],
      invalidation: 'ADR-based analysis is less reliable on high-impact news days (NFP, FOMC) where volatility can exceed 150-200% of normal ADR. Also less reliable on holiday-shortened sessions.',
      related_concepts: ['cbdr', 'asia-range', 'daily-bias', 'killzones'],
      confluence_weight: 0.8,
      timeframes: ['D1'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md — ADR / Range Analysis'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['adr', 'average-daily-range', 'measurement', 'range', 'volatility', 'target'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-algorithmic-pairing',
    type: 'concept',
    domain: 'concepts',
    name: 'Algorithmic Pairing',
    description: 'Algorithmic Pairing is the foundational ICT principle that the Interbank Price Delivery Algorithm (IPDA) must pair every buy order with a corresponding sell order to facilitate price delivery. This mechanism ensures that for every transaction executed in the market, there is a counterparty, and institutional algorithms actively seek liquidity pools to match their large orders.',
    content: 'The IPDA does not move price randomly — it algorithmically seeks areas where resting orders exist to pair against. When smart money needs to fill a large buy program, the algorithm drives price down into sell-side liquidity pools (stop losses below swing lows) to pair those sell orders against their buy orders. This is why liquidity sweeps and stop hunts occur with such precision. Understanding algorithmic pairing explains why price gravitates toward equal highs/lows, old highs/lows, and institutional reference points where orders are known to rest.',
    metadata: {
      category: 'algorithmic_theory',
      abbreviation: 'PAIR',
      detection_rules: 'Observe price gravitating toward obvious liquidity pools (equal highs/lows, swing points). After pairing occurs (liquidity sweep), watch for displacement in the opposite direction confirming the algorithm has filled its orders and is now delivering price to the next target.',
      entry_rules: ['Identify the liquidity pool the algorithm is targeting for pairing', 'Wait for the sweep of that liquidity to confirm pairing has occurred', 'Enter on the displacement or first PD array retracement after the pairing event'],
      invalidation: 'If price sweeps a liquidity pool but continues through it with sustained momentum and no reversal, the pairing may be part of a larger delivery program rather than a reversal point.',
      related_concepts: ['ipda', 'liquidity', 'bsl', 'buy-program', 'delivery', 'draw-on-liquidity'],
      confluence_weight: 1.5,
      timeframes: ['M1', 'M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — IPDA / Algorithmic Theory'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['algorithmic-pairing', 'ipda', 'order-pairing', 'liquidity', 'smart-money', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-asia-range',
    type: 'concept',
    domain: 'concepts',
    name: 'Asia Range',
    description: 'The Asia Range is defined as the price range formed between 8:00 PM and 12:00 AM Eastern Time, representing the consolidation that occurs during the Asian trading session. ICT considers the Asia Range more significant than the CBDR because it encompasses the full Asian session activity, and standard deviation projections from this range reliably predict the expansion targets for the London and New York sessions.',
    content: 'The Asia Range establishes the initial framework for the trading day by creating a defined consolidation zone. Standard deviation levels (typically 1.0, 1.5, 2.0, and 2.5 SD) projected from the Asia Range high and low provide high-probability expansion targets. When combined with daily bias, traders can anticipate which side of the Asia Range will be swept (manipulation) and which SD level price will target during distribution. The Asia Range is particularly powerful when it aligns with higher timeframe PD arrays or liquidity pools at the projected SD levels.',
    metadata: {
      category: 'time',
      abbreviation: 'AR',
      detection_rules: 'Mark the high and low of price action between 8:00 PM and 12:00 AM ET on the M5 or M15 chart. Calculate the range in pips and project standard deviation levels above and below. Look for equal highs or lows forming within the range as liquidity targets.',
      entry_rules: ['Wait for Asia Range to complete at midnight ET before projecting SD levels', 'Combine SD projections with HTF PD arrays for confluence targets', 'Expect manipulation of one side of the Asia Range during London open killzone'],
      invalidation: 'Asia Range projections are less reliable when a major news event occurs during the Asian session itself, causing abnormally wide ranges. Also invalidated when daily ADR has already been largely consumed.',
      related_concepts: ['cbdr', 'asia-session', 'killzones', 'adr', 'daily-bias', 'accumulation'],
      confluence_weight: 1.3,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md — Session Ranges / Asia Range'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['asia-range', 'session-range', 'standard-deviation', 'expansion', 'time-based', 'projections'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-asia-session',
    type: 'concept',
    domain: 'concepts',
    name: 'Asia Session',
    description: 'The Asia Session runs from 8:00 PM to 12:00 AM Eastern Time and represents the accumulation phase of the daily trading cycle. During this session, price typically consolidates in a narrow range as Asian market participants trade with lower volume compared to London and New York, setting the stage for the higher-volatility sessions that follow.',
    content: 'The Asia Session is the quiet phase where smart money accumulates positions before the London and New York sessions deliver the manipulation and distribution phases. Traders should use this session to analyze the developing range, identify equal highs and lows forming as liquidity targets, and establish their daily bias using higher timeframe analysis. Trading during the Asia Session itself is generally discouraged unless specific setups align with macro times. The session range becomes a critical reference point for the remainder of the trading day.',
    metadata: {
      category: 'time',
      abbreviation: 'ASIA',
      detection_rules: 'Observe price action between 8:00 PM and 12:00 AM ET. Identify the consolidation range, noting any equal highs or lows. Mark the session high and low as key reference levels for London and New York session trading.',
      entry_rules: ['Generally avoid trading during Asia Session unless macro time setups present', 'Use Asia Session for analysis and bias formation', 'Mark Asia Session high and low for London/NY session reference'],
      invalidation: 'Asia Session analysis is invalidated when significant news events occur during the session or when price has already made a large directional move before the session begins, leaving no room for accumulation.',
      related_concepts: ['asia-range', 'killzones', 'accumulation', 'power-of-three', 'daily-bias', 'macro-times'],
      confluence_weight: 1.0,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md — Sessions / Asia Session'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['asia-session', 'session', 'accumulation', 'time-based', 'range-formation', 'daily-cycle'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-bisi',
    type: 'concept',
    domain: 'concepts',
    name: 'Buy Side Imbalance, Sell Side Inefficiency',
    description: 'A BISI is a bullish Fair Value Gap created when aggressive upward displacement leaves a gap between the high of the first candle and the low of the third candle in a three-candle formation. The name describes the imbalance: buy-side pressure dominated (Buy Side Imbalance) while the sell side was unable to participate efficiently (Sell Side Inefficiency), creating a void that the algorithm may revisit.',
    content: 'BISI gaps form during bullish displacement and represent areas where institutional buy orders overwhelmed available sell orders, leaving an inefficiency in price delivery. When price retraces into a BISI, it provides a discount entry opportunity within the context of a bullish delivery. The 50% midpoint of a BISI (Consequent Encroachment) serves as a precision entry level. In a bullish order flow environment, BISI gaps are expected to hold as support. A BISI that is completely filled and traded through to the downside signals a potential shift in market structure or delivery direction.',
    metadata: {
      category: 'pd_array',
      abbreviation: 'BISI',
      detection_rules: 'Identify a three-candle formation where the middle candle shows strong bullish displacement. The gap between the high of candle 1 and the low of candle 3 defines the BISI. The wider the gap relative to average candle size, the more significant the imbalance.',
      entry_rules: ['Enter long when price retraces into the BISI gap during bullish order flow', 'Use Consequent Encroachment (50% of BISI) as a precision entry level', 'Place stop loss below the low of the BISI gap (candle 1 high)'],
      invalidation: 'A BISI is invalidated when price trades completely through it to the downside with displacement, closing below the low of the gap. This suggests a change in delivery direction or market structure shift.',
      related_concepts: ['fvg', 'ce', 'displacement', 'order-block', 'pd-array', 'premium-discount'],
      confluence_weight: 1.4,
      timeframes: ['M1', 'M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — FVG / BISI-SIBI'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['bisi', 'fair-value-gap', 'bullish', 'imbalance', 'inefficiency', 'pd-array'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-bond-yield-correlation',
    type: 'concept',
    domain: 'concepts',
    name: 'Bond Yield Correlation',
    description: 'Bond yield correlation refers to the intermarket relationship between US Treasury yields (particularly the 2-year and 10-year) and currency pair movements. Rising US Treasury yields generally strengthen the US Dollar, creating a positive correlation with USD/JPY and an inverse correlation with EUR/USD and GBP/USD. ICT uses these relationships as a macro-level confluence filter for daily bias.',
    content: 'When US Treasury yields are rising, capital flows into US-denominated assets for higher returns, strengthening the dollar. This creates bullish conditions for USD/JPY and bearish conditions for EUR/USD and GBP/USD. ICT traders monitor the ZN (10-Year Treasury Note futures) and ZB (30-Year Treasury Bond futures) for divergences with the Dollar Index. When yields and the dollar diverge from their normal correlation, it signals potential reversals or trend changes. Bond yield analysis is a higher timeframe filter that should align with technical setups before taking trades.',
    metadata: {
      category: 'intermarket',
      abbreviation: 'BYC',
      detection_rules: 'Compare daily charts of US 10-Year Treasury yield (or ZN futures inverted) with DXY and key USD pairs. Look for correlation alignment on higher timeframes. Divergences between yields and USD strength signal potential turning points.',
      entry_rules: ['Confirm daily bias aligns with bond yield direction before trading USD pairs', 'Use yield divergences as early warning for potential trend reversals', 'Monitor FOMC and Treasury auction dates for potential yield shifts'],
      invalidation: 'Bond yield correlations can break down during risk-off events, flight-to-safety scenarios, or when central bank policy divergences override normal yield-currency dynamics.',
      related_concepts: ['dxy-correlation', 'smt', 'daily-bias', 'institutional-order-flow'],
      confluence_weight: 1.0,
      timeframes: ['H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — Intermarket Analysis / Bond Yields'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['bond-yields', 'intermarket', 'correlation', 'treasury', 'macro-analysis', 'usd'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-bsl',
    type: 'concept',
    domain: 'concepts',
    name: 'Buy-Side Liquidity',
    description: 'Buy-Side Liquidity (BSL) represents the pool of resting buy stop orders clustered above swing highs, equal highs, and range highs. These orders include stop-losses from short sellers and breakout buy orders from retail traders anticipating upside continuation. Institutional sell programs target BSL to pair their large sell orders against this resting buy-side liquidity.',
    content: 'BSL forms at predictable levels: above obvious swing highs, above equal highs that have been tested multiple times, above session highs, and above significant range highs. The more visible and obvious the level, the larger the liquidity pool. When the IPDA needs to execute a sell program, it will drive price up into BSL to pair sell orders against the resting buy stops. After BSL is swept, watch for bearish displacement, market structure shift, and delivery toward discount PD arrays or sell-side liquidity. BSL on higher timeframes represents more significant draw on liquidity targets.',
    metadata: {
      category: 'liquidity_type',
      abbreviation: 'BSL',
      detection_rules: 'Identify swing highs, equal highs, session highs, and range highs on the chart. The more times a high has been tested without being broken, the more liquidity has accumulated above it. Mark these levels as BSL targets. Triple or more equal highs represent the highest concentration of BSL.',
      entry_rules: ['Use BSL as a draw on liquidity target for long trades in bullish conditions', 'After BSL sweep in bearish conditions, look for sell setups on bearish displacement', 'Combine BSL identification with HTF bearish order flow for short entries after sweep'],
      invalidation: 'BSL targets are consumed once price trades through them. If price sweeps BSL and continues higher with strong bullish displacement, the level has been used for continuation rather than reversal.',
      related_concepts: ['liquidity', 'draw-on-liquidity', 'buy-program', 'algorithmic-pairing', 'market-structure', 'smt'],
      confluence_weight: 1.6,
      timeframes: ['M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — Liquidity / Buy-Side Liquidity'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['bsl', 'buy-side-liquidity', 'liquidity', 'stop-hunt', 'swing-highs', 'equal-highs'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-buy-program',
    type: 'concept',
    domain: 'concepts',
    name: 'Buy Program',
    description: 'A Buy Program is an institutional algorithmic buying phase where the IPDA drives price into discount PD arrays and sell-side liquidity to pair buy orders, then displaces price upward targeting buy-side liquidity. This represents the mechanism by which smart money accumulates long positions at favorable prices before engineering an upward delivery of price.',
    content: 'During a buy program, the algorithm first seeks sell-side liquidity to pair against — driving price into stops below swing lows, equal lows, and support levels. Once sufficient orders are paired, the algorithm shifts to upward delivery, creating bullish displacement, leaving BISI (bullish FVG) gaps, and breaking market structure to the upside. The delivery targets buy-side liquidity pools above swing highs. Traders can identify active buy programs by observing bullish order flow on higher timeframes, sweeps of SSL followed by bullish displacement, and price respecting discount PD arrays as support.',
    metadata: {
      category: 'algorithmic_theory',
      abbreviation: 'BP',
      detection_rules: 'Identify HTF bullish market structure and order flow. Watch for price sweeping sell-side liquidity (lows) then immediately displacing upward with strong momentum. Bullish FVGs forming after the sweep confirm the buy program is active. Price should respect discount PD arrays on retracements.',
      entry_rules: ['Enter after SSL sweep followed by bullish displacement and market structure shift', 'Buy at discount PD arrays (bullish OB, BISI, bullish breaker) during active buy program', 'Target buy-side liquidity above recent swing highs as profit objective'],
      invalidation: 'A buy program is invalidated when price fails to displace upward after sweeping SSL, or when price breaks below the low that initiated the displacement, indicating the delivery direction has changed to bearish.',
      related_concepts: ['algorithmic-pairing', 'bsl', 'displacement', 'bisi', 'discount-array', 'institutional-order-flow'],
      confluence_weight: 1.7,
      timeframes: ['M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — Algorithmic Theory / Buy & Sell Programs'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['buy-program', 'institutional', 'algorithmic', 'bullish', 'smart-money', 'delivery'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-candle-theory',
    type: 'concept',
    domain: 'concepts',
    name: 'Candle Theory',
    description: 'ICT Candle Theory is the fractal principle that each candle on any timeframe follows the Power of Three (PO3) framework — open, high, low, close — and that higher timeframe candles predict the behavior of their lower timeframe sub-candles. A monthly candle predicts the weekly, the weekly predicts the daily, and the daily predicts the intraday candles.',
    content: 'Every candle tells a story of accumulation, manipulation, and distribution within its timeframe. A bullish monthly candle opens near its low (accumulation), wicks below (manipulation/stop hunt), then rallies to close near its high (distribution). The weekly candles within that month will follow the same narrative arc. This fractal relationship allows traders to use higher timeframe candle structure to anticipate lower timeframe behavior. By analyzing where the current HTF candle is in its PO3 cycle, traders can predict whether the LTF should be seeking lows (manipulation in a bullish candle) or expanding higher (distribution phase).',
    metadata: {
      category: 'analysis',
      abbreviation: 'CT',
      detection_rules: 'Analyze the current HTF candle (monthly, weekly, daily) to determine its PO3 phase. If a bullish monthly candle is forming, identify whether price is still in the accumulation/manipulation phase (first half of the month) or distribution phase (second half). Compare LTF candle formations against expected HTF candle behavior.',
      entry_rules: ['Use HTF candle phase to determine LTF trade direction', 'In a bullish HTF candle manipulation phase, look for discount longs on LTF', 'In a bearish HTF candle distribution phase, look for premium shorts on LTF'],
      invalidation: 'Candle theory predictions are invalidated when the current HTF candle fails to follow the expected PO3 pattern, such as when a projected bullish monthly candle loses its opening price decisively, signaling a shift in monthly order flow.',
      related_concepts: ['power-of-three', 'daily-bias', 'market-structure', 'institutional-order-flow', 'premium-discount'],
      confluence_weight: 1.3,
      timeframes: ['M15', 'H1', 'H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — Candle Theory / Power of Three'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['candle-theory', 'fractal', 'power-of-three', 'htf-ltf', 'multi-timeframe', 'analysis'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-cbdr',
    type: 'concept',
    domain: 'concepts',
    name: 'Central Bank Dealers Range',
    description: 'The Central Bank Dealers Range (CBDR) is the price range formed between 2:00 PM and 8:00 PM New York time, representing the period when central bank dealers and institutional players establish their initial positioning for the next trading day. Standard deviation projections from this range provide statistical expansion targets for the London and New York sessions.',
    content: 'The CBDR captures the transition period between the New York close and the Asian session open. Standard deviation levels (0.5, 1.0, 1.5, 2.0, 2.5, and 3.0 SD) are projected from the CBDR high and low to create a statistical framework for expected price expansion. Historically, price reaches at least 2.0 SD from the CBDR in one direction on most trading days. While ICT considers the Asia Range more important, CBDR provides an additional layer of statistical confirmation. The CBDR is most useful when combined with daily bias to determine which direction the SD expansion will target.',
    metadata: {
      category: 'time',
      abbreviation: 'CBDR',
      detection_rules: 'Mark the high and low of price action between 2:00 PM and 8:00 PM ET on M5 or M15 charts. Calculate the range in pips. Project standard deviation levels above and below the range. Compare CBDR width with ADR to assess relative volatility.',
      entry_rules: ['Use CBDR SD projections as profit targets aligned with daily bias', 'If bearish bias, target negative SD levels; if bullish, target positive SD levels', 'Combine CBDR SD levels with Asia Range SD levels for high-confluence targets'],
      invalidation: 'CBDR projections lose reliability when the CBDR itself is abnormally wide (exceeding 50% of ADR) due to late NY session volatility, or when major economic releases occur during the CBDR formation window.',
      related_concepts: ['asia-range', 'adr', 'killzones', 'daily-bias', 'asia-session'],
      confluence_weight: 1.1,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md — Session Ranges / CBDR'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['cbdr', 'central-bank-dealers-range', 'session-range', 'standard-deviation', 'time-based', 'expansion'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-ce',
    type: 'concept',
    domain: 'concepts',
    name: 'Consequent Encroachment',
    description: 'Consequent Encroachment (CE) is the precise 50% midpoint of a Fair Value Gap (FVG), representing the equilibrium level within the imbalance. ICT teaches that the algorithm often delivers price to the CE of a FVG rather than filling the entire gap, making it a high-precision entry and reaction point for institutional order flow.',
    content: 'CE provides a sniper-level entry technique within FVGs. Instead of entering at the full extent of a FVG, traders can use the CE level as a more precise entry point where the algorithm is most likely to react. In a bullish scenario, the CE of a BISI serves as a buy entry, while in a bearish scenario, the CE of a SIBI serves as a sell entry. The CE level also functions as an important reference — if price trades through the CE of a FVG, the probability increases that the entire gap will be filled and potentially invalidated. CE can be applied to FVGs on any timeframe, with higher timeframe CE levels carrying more significance.',
    metadata: {
      category: 'entry',
      abbreviation: 'CE',
      detection_rules: 'Identify a Fair Value Gap on any timeframe. Calculate the exact 50% midpoint between the high and low boundaries of the FVG. Mark this level as Consequent Encroachment. Monitor for price reaction at the CE level during retracements.',
      entry_rules: ['Place limit orders at CE of HTF FVGs aligned with daily bias', 'Use CE as entry with stop loss beyond the full FVG boundary', 'If price closes through CE, reassess — full gap fill and invalidation become more likely'],
      invalidation: 'CE as an entry is invalidated when price displaces through the CE level with momentum and closes beyond it, indicating the FVG is being fully filled rather than providing a reaction point.',
      related_concepts: ['fvg', 'bisi', 'pd-array', 'ote', 'premium-discount', 'displacement'],
      confluence_weight: 1.5,
      timeframes: ['M1', 'M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — FVG / Consequent Encroachment'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['ce', 'consequent-encroachment', 'fvg-midpoint', 'precision-entry', 'pd-array', 'sniper'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-cisd',
    type: 'concept',
    domain: 'concepts',
    name: 'Change in State of Delivery',
    description: 'A Change in State of Delivery (CISD) occurs when a candle that was previously delivering price in one direction shifts to deliver in the opposite direction, signaling a change in the IPDA delivery algorithm. This is identified by a candle that trades through the body of the previous candle in the opposite direction, indicating institutional order flow has shifted.',
    content: 'CISD is a more nuanced concept than a simple market structure shift — it identifies the exact candle where the delivery state changes from bullish to bearish or vice versa. A bearish CISD occurs when a down-close candle trades below the open of the prior up-close candle, showing sell-side delivery has overtaken buy-side delivery. This candle becomes a reference point similar to an order block. CISD is particularly powerful when it occurs at a significant PD array or after a liquidity sweep, as it confirms the algorithm has shifted its delivery program. Traders use the CISD candle as an entry reference on retracements.',
    metadata: {
      category: 'structure',
      abbreviation: 'CISD',
      detection_rules: 'Look for a candle that closes in the opposite direction of the prior delivery, with its close trading beyond the open of the prior candle. The CISD candle body becomes the key reference level. Most significant when occurring at PD arrays, liquidity sweeps, or during killzone times.',
      entry_rules: ['Enter on retracement to the CISD candle body after it confirms delivery change', 'Use the CISD candle high/low as stop loss reference', 'Combine CISD with FVG or OB formed at the same level for higher confluence'],
      invalidation: 'CISD is invalidated if price retraces back through the CISD candle body and closes beyond it in the original delivery direction, indicating the delivery change was a false signal.',
      related_concepts: ['choch', 'sms-mss', 'order-block', 'displacement', 'market-structure', 'institutional-order-flow'],
      confluence_weight: 1.4,
      timeframes: ['M1', 'M5', 'M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md — Market Structure / CISD'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['cisd', 'change-in-state-of-delivery', 'delivery', 'structure-shift', 'algorithmic', 'reversal'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-cme-open',
    type: 'concept',
    domain: 'concepts',
    name: 'CME Open',
    description: 'The CME (Chicago Mercantile Exchange) futures open at 8:30 AM Eastern Time is a critical IPDA reference point where the algorithm recalibrates and establishes the opening price for the regular US trading session. This time often marks the beginning of significant price displacement and serves as a key reference for intraday order flow analysis.',
    content: 'The 8:30 AM ET CME open coincides with the release of major US economic data (NFP, CPI, GDP) and represents a high-probability inflection point in intraday price action. The opening price at 8:30 AM serves as an equilibrium reference — if the daily bias is bullish, the algorithm will seek to deliver price above the CME open; if bearish, below it. The first 30 minutes after the CME open (8:30-9:00 AM) often produce the manipulation phase of the New York AM session, with the true directional move following. Traders should note the CME opening price and use it as a bias filter throughout the NY session.',
    metadata: {
      category: 'key_level',
      abbreviation: 'CME',
      detection_rules: 'Mark the exact price at 8:30 AM ET on your intraday chart. This level becomes a dynamic support/resistance for the remainder of the trading day. Note whether price is trading above or below the CME open to confirm or deny daily bias.',
      entry_rules: ['Use CME open as a reference for intraday bias — bullish above, bearish below', 'Wait for initial manipulation (8:30-9:00 AM) before entering directional trades', 'Combine CME open with NY AM killzone analysis for optimal entries'],
      invalidation: 'The CME open reference loses significance late in the NY session (after 2:00 PM ET) as the trading day closes. Also less significant on half-days or when futures markets close early.',
      related_concepts: ['killzones', 'macro-times', 'daily-bias', 'ipda', 'power-of-three'],
      confluence_weight: 1.3,
      timeframes: ['M1', 'M5', 'M15'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md — Key Levels / CME Open'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['cme-open', 'key-level', 'opening-price', 'new-york', 'reference-point', 'ipda'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-consolidation',
    type: 'concept',
    domain: 'concepts',
    name: 'Consolidation',
    description: 'Consolidation is a period of sideways price action where the market ranges between defined support and resistance levels, building liquidity on both sides. In ICT methodology, consolidation represents the accumulation phase of the AMD cycle where smart money is building positions and the IPDA is gathering orders for the next delivery phase.',
    content: 'Consolidation occurs when price repeatedly tests defined boundaries without breaking through decisively, creating equal or near-equal highs and lows. Each touch of these boundaries adds more resting orders — buy stops above the highs and sell stops below the lows — building the liquidity pools that the algorithm will eventually target. The longer consolidation persists, the larger the accumulated liquidity and the more powerful the eventual breakout. Traders should identify consolidation ranges and anticipate that one side will be swept (manipulation/false breakout) before the true move occurs in the opposite direction, consistent with the Power of Three framework.',
    metadata: {
      category: 'price_action',
      abbreviation: 'CONS',
      detection_rules: 'Identify price ranges where highs and lows are relatively equal and have been tested 3 or more times. Volume should be decreasing or average. The range should persist for a meaningful period relative to the timeframe being analyzed. Mark the range boundaries as liquidity levels.',
      entry_rules: ['Do not trade within consolidation — wait for the manipulation sweep', 'Identify which side has more liquidity buildup to anticipate the sweep direction', 'After the sweep of one side, enter in the opposite direction targeting the other side and beyond'],
      invalidation: 'Consolidation analysis is invalidated if price breaks through a boundary with strong displacement and sustained follow-through without returning to the range, indicating the breakout is genuine distribution rather than manipulation.',
      related_concepts: ['accumulation', 'liquidity', 'power-of-three', 'bsl', 'dealing-range'],
      confluence_weight: 1.0,
      timeframes: ['M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: false,
      source_reference: 'ICT_MASTER_LIBRARY.md — Price Action / Consolidation'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['consolidation', 'range', 'accumulation', 'liquidity-building', 'sideways', 'price-action'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-dealing-range',
    type: 'concept',
    domain: 'concepts',
    name: 'Dealing Range',
    description: 'A Dealing Range is the current operative price range defined by a recent significant swing high and swing low within which the IPDA is actively delivering price. The dealing range provides the framework for identifying premium and discount zones, PD arrays, and the equilibrium level that governs current price action.',
    content: 'The dealing range is established by the most recent expansion leg — the swing high and swing low created by the last significant displacement move. The 50% level of this range is equilibrium (also known as the 50% retracement or fair value). Price above equilibrium is in premium territory (favorable for sells), and price below is in discount territory (favorable for buys). All PD arrays within the dealing range are contextualized by their position relative to premium and discount. When price breaks out of the current dealing range, a new dealing range is established. Nested dealing ranges on multiple timeframes create a fractal map of institutional delivery.',
    metadata: {
      category: 'structure',
      abbreviation: 'DR',
      detection_rules: 'Identify the most recent significant swing high and swing low on the timeframe being analyzed. The range between these points is the dealing range. Calculate the 50% equilibrium level. Map premium zone (above 50%) and discount zone (below 50%). Identify all PD arrays within the range.',
      entry_rules: ['Buy in the discount zone of the dealing range during bullish order flow', 'Sell in the premium zone of the dealing range during bearish order flow', 'Use equilibrium (50%) as a confirmation level — price reclaiming it confirms directional bias'],
      invalidation: 'A dealing range is invalidated when price breaks beyond its swing high or swing low with displacement, establishing a new dealing range. The old range levels may still hold significance as PD arrays within the new range.',
      related_concepts: ['premium-discount', 'market-structure', 'pd-array', 'ote', 'fvg', 'order-block'],
      confluence_weight: 1.4,
      timeframes: ['M15', 'H1', 'H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — Market Structure / Dealing Range'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['dealing-range', 'swing-range', 'premium-discount', 'equilibrium', 'structure', 'framework'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-delivery',
    type: 'concept',
    domain: 'concepts',
    name: 'Price Delivery',
    description: 'Price Delivery describes how the IPDA moves price from one PD array to another, from Internal Range Liquidity (IRL) to External Range Liquidity (ERL) and vice versa. This concept explains that price does not move randomly but is algorithmically delivered between specific institutional reference points in a structured, purposeful manner.',
    content: 'The IPDA delivers price in a predictable cycle: from IRL (PD arrays like FVGs, order blocks, and breakers within a range) to ERL (liquidity pools beyond the range such as swing highs/lows, equal highs/lows). When price reaches an IRL level, it reacts and is delivered toward ERL. After sweeping ERL, price reverses and seeks the next IRL level. This IRL-to-ERL-to-IRL cycle creates the fractal market structure ICT traders exploit. Understanding delivery means knowing that every retracement to a PD array (IRL) is the setup, and the subsequent expansion to a liquidity target (ERL) is the payoff.',
    metadata: {
      category: 'algorithmic_theory',
      abbreviation: 'DEL',
      detection_rules: 'Map IRL levels (FVGs, OBs, breakers, mitigation blocks within the current range) and ERL levels (BSL and SSL beyond the range). Observe price reacting at IRL levels and being delivered toward ERL targets. Track the IRL→ERL→IRL cycle on your trading timeframe.',
      entry_rules: ['Enter at IRL levels (PD arrays) targeting ERL levels (liquidity pools)', 'After ERL is swept, anticipate reversal back to the next IRL level', 'Use HTF delivery direction to filter LTF entries — only trade IRL→ERL in the HTF direction'],
      invalidation: 'Delivery expectations are invalidated when price fails to react at an IRL level and continues through it, indicating the delivery program may have changed or the PD array has been consumed. A new IRL reference must then be identified.',
      related_concepts: ['ipda', 'pd-array', 'liquidity', 'draw-on-liquidity', 'fvg', 'order-block'],
      confluence_weight: 1.8,
      timeframes: ['M1', 'M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — IPDA / Price Delivery'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['delivery', 'irl', 'erl', 'ipda', 'price-delivery', 'algorithmic', 'pd-array-to-liquidity'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-discount-array',
    type: 'concept',
    domain: 'concepts',
    name: 'Discount PD Arrays',
    description: 'Discount PD Arrays are the specific institutional reference points located below the equilibrium (50%) level of a dealing range, representing areas where price is trading at a relative discount. These include bullish order blocks, BISI (bullish FVGs), bullish breaker blocks, and mitigation blocks positioned in the discount zone, making them favorable areas for institutional buy entries.',
    content: 'In ICT methodology, the concept of value is paramount — smart money buys at a discount and sells at a premium. Discount PD arrays combine this valuation framework with specific institutional reference points. When price retraces into the discount zone and reaches a bullish order block, BISI gap, or bullish breaker, it represents an area where institutional buy orders are positioned. The deeper into discount territory (closer to the dealing range low), the more favorable the entry. Traders should focus on discount PD arrays that align with higher timeframe bullish order flow and the overall draw on liquidity direction.',
    metadata: {
      category: 'valuation',
      abbreviation: 'DPA',
      detection_rules: 'Calculate the dealing range equilibrium (50% of swing high to swing low). Identify all PD arrays below this level: bullish order blocks, BISI gaps, bullish breaker blocks, and mitigation blocks. Rank them by depth in the discount zone — deeper = more favorable.',
      entry_rules: ['Enter long at discount PD arrays when HTF order flow is bullish', 'Prioritize the deepest discount PD array that aligns with OTE zone (62-79% retracement)', 'Use the PD array boundary as stop loss reference'],
      invalidation: 'Discount PD arrays are invalidated when price trades through them with bearish displacement and closes below, indicating the bullish PD array has been consumed and the dealing range low may be targeted.',
      related_concepts: ['premium-discount', 'pd-array', 'order-block', 'bisi', 'breaker-block', 'dealing-range', 'ote'],
      confluence_weight: 1.5,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — PD Arrays / Premium & Discount'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['discount-array', 'pd-array', 'discount', 'bullish', 'valuation', 'institutional-entry'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-distribution',
    type: 'concept',
    domain: 'concepts',
    name: 'Distribution',
    description: 'Distribution is the third and final phase of the AMD (Accumulation, Manipulation, Distribution) cycle where smart money delivers price in its intended direction toward the ultimate target. This phase is characterized by strong displacement, Fair Value Gaps, and sustained directional movement as institutional order flow drives price to the draw on liquidity.',
    content: 'Distribution represents the payoff phase of the AMD cycle. After accumulation builds the position and manipulation sweeps liquidity to complete order pairing, distribution is the aggressive directional move that delivers price to the target — typically the opposing liquidity pool or a significant PD array. During distribution, traders should observe strong displacement candles, the creation of FVGs that hold on retracement, and market structure breaks in the direction of delivery. The distribution phase often aligns with killzone times (London open, NY AM session) and creates the most profitable trading opportunities. Entries during distribution target continuation, using newly formed FVGs and order blocks as entry points on pullbacks.',
    metadata: {
      category: 'market_phase',
      abbreviation: 'DIST',
      detection_rules: 'Identify strong directional displacement following a liquidity sweep (manipulation phase). Look for FVGs forming in the direction of the move, market structure breaks confirming the delivery direction, and price expanding toward the draw on liquidity. Distribution typically occurs during high-volume killzone times.',
      entry_rules: ['Enter on pullbacks to FVGs or order blocks created during the distribution displacement', 'Target the draw on liquidity identified before the AMD cycle began', 'Trail stop loss below/above each new PD array formed during distribution'],
      invalidation: 'Distribution is invalidated if price reverses back through the manipulation low/high (the level where the AMD cycle originated), indicating the entire move was a larger-scale manipulation rather than genuine distribution.',
      related_concepts: ['accumulation', 'power-of-three', 'displacement', 'fvg', 'draw-on-liquidity', 'killzones'],
      confluence_weight: 1.6,
      timeframes: ['M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — AMD Cycle / Distribution'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['distribution', 'amd', 'expansion', 'displacement', 'delivery', 'smart-money'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-draw-on-liquidity',
    type: 'concept',
    domain: 'concepts',
    name: 'Draw on Liquidity',
    description: 'Draw on Liquidity (DOL) is the specific liquidity pool or PD array that the IPDA is currently delivering price toward. Identifying the DOL is the single most important determination an ICT trader makes, as it defines the directional bias, trade direction, and ultimate profit target for every setup.',
    content: 'The IPDA always has a destination — a pool of resting orders it is seeking to pair against. This destination is the Draw on Liquidity. It could be buy-side liquidity above a swing high, sell-side liquidity below a swing low, a higher timeframe FVG, or any significant institutional reference point where orders are known to rest. Determining the DOL requires higher timeframe analysis: examining where the largest liquidity pools exist relative to current price, which direction the HTF order flow supports, and which PD arrays remain unmitigated. Once the DOL is identified, all lower timeframe analysis is filtered through this lens — only taking trades that align with the draw. The DOL can shift when price reaches its target or when a significant market structure break changes the delivery direction.',
    metadata: {
      category: 'target',
      abbreviation: 'DOL',
      detection_rules: 'On higher timeframes (H4, D1, W1), identify the nearest significant liquidity pools and unmitigated PD arrays in both directions. Determine which pool the current market structure and order flow supports price being delivered toward. The most obvious, untouched liquidity pool in the direction of HTF bias is likely the DOL.',
      entry_rules: ['Only take trades in the direction of the identified DOL', 'Use DOL as the profit target for all setups', 'Re-evaluate DOL when price reaches the target or when HTF structure shifts'],
      invalidation: 'The current DOL is invalidated when price reaches it (target achieved) or when a higher timeframe market structure shift redirects delivery toward a different liquidity pool. A failed attempt to reach DOL followed by a structure break signals DOL has changed.',
      related_concepts: ['liquidity', 'bsl', 'ipda', 'daily-bias', 'delivery', 'pd-array', 'institutional-order-flow'],
      confluence_weight: 2.0,
      timeframes: ['H1', 'H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — Draw on Liquidity / Bias Determination'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['draw-on-liquidity', 'dol', 'target', 'bias', 'liquidity-target', 'ipda', 'critical'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-dxy-correlation',
    type: 'concept',
    domain: 'concepts',
    name: 'DXY Correlation',
    description: 'DXY Correlation refers to the inverse relationship between the US Dollar Index (DXY) and major USD-denominated currency pairs like EUR/USD and GBP/USD. When DXY rises (dollar strengthens), EUR/USD and GBP/USD fall, and vice versa. ICT uses this correlation as a macro confirmation tool and identifies divergences between DXY and these pairs as powerful trade signals.',
    content: 'The US Dollar Index measures the dollar against a basket of currencies weighted heavily toward the Euro. This creates a near-mirror inverse relationship with EUR/USD. GBP/USD also maintains a strong inverse correlation. ICT traders use DXY as a leading indicator — if DXY is breaking structure bullish and approaching a key resistance level, EUR/USD should be approaching support. Divergences between DXY and its correlated pairs (such as DXY making a higher high while EUR/USD fails to make a corresponding lower low) signal potential reversals and are a form of Smart Money Technique (SMT) divergence. Always check DXY before trading EUR/USD or GBP/USD to ensure your directional bias is supported by dollar flow.',
    metadata: {
      category: 'intermarket',
      abbreviation: 'DXY',
      detection_rules: 'Compare DXY chart structure with EUR/USD and GBP/USD on the same timeframe. In normal conditions, they should mirror each other inversely. Look for divergences: DXY making new highs while EUR/USD fails to make corresponding new lows (or vice versa). Check DXY at key PD arrays for reaction confluence.',
      entry_rules: ['Confirm EUR/USD and GBP/USD trade direction aligns with DXY inverse movement', 'Use DXY/EUR divergence as an SMT signal for potential reversals', 'Monitor DXY at HTF PD arrays before entering correlated pair trades'],
      invalidation: 'DXY correlation temporarily breaks down when specific non-USD economic events dominate (e.g., ECB decisions affecting EUR specifically, or BoE decisions affecting GBP without broad USD impact). Also weakens during extreme risk events.',
      related_concepts: ['smt', 'bond-yield-correlation', 'daily-bias', 'institutional-order-flow', 'market-structure'],
      confluence_weight: 1.2,
      timeframes: ['H1', 'H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'ICT_MASTER_LIBRARY.md — Intermarket Analysis / DXY Correlation'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['dxy', 'dollar-index', 'correlation', 'intermarket', 'inverse', 'eur-usd', 'gbp-usd'],
    createdAt: timestamp,
    updatedAt: timestamp
  },

  // ===== EXPANDED ICT CONCEPTS - Liquidity & Entry =====
  {
    id: 'concept-equal-highs',
    type: 'concept',
    domain: 'concepts',
    name: 'Equal Highs',
    description: 'Double or triple tops forming at the same price level, creating a visible cluster of highs that retail traders misidentify as resistance. In ICT methodology, equal highs represent a liquidity pool of buy stops resting above, engineered by the algorithm to be swept before a true directional move.',
    content: 'Equal highs are one of the most reliable liquidity signatures on a chart. When price forms two or more swing highs at nearly identical levels, sell-side participants place stop losses and breakout orders just above, creating a dense pool of buy-side liquidity. The IPDA will drive price above these equal highs to pair with resting orders before reversing. Traders should anticipate the sweep and look for bearish displacement immediately after the equal highs are taken as confirmation of a reversal setup.',
    metadata: {
      category: 'liquidity_pool',
      abbreviation: 'EQH',
      detection_rules: 'Identify two or more swing highs within a tight price range (within a few pips/points of each other). The more times price touches the same level, the more liquidity accumulates above. Look for equal highs on HTF (4H, Daily) for highest probability sweeps.',
      entry_rules: ['Wait for price to sweep above equal highs and observe displacement candle closing back below', 'Look for a bearish FVG or order block forming after the sweep for entry', 'Confirm with HTF bearish bias — equal highs swept into premium are highest probability'],
      invalidation: 'Invalidated if price sweeps equal highs and continues with strong bullish displacement, holding above the level with follow-through candles and no immediate rejection.',
      related_concepts: ['liquidity', 'bsl', 'stop-hunt'],
      confluence_weight: 1.5,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['liquidity', 'equal-highs', 'buy-stops', 'liquidity-pool', 'sweep'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-equal-lows',
    type: 'concept',
    domain: 'concepts',
    name: 'Equal Lows',
    description: 'Double or triple bottoms forming at the same price level, which retail traders interpret as support. In ICT methodology, equal lows represent a sell-side liquidity pool of stop losses resting below, deliberately engineered to be raided before the algorithm drives price in its intended direction.',
    content: 'Equal lows function as magnets for algorithmic price delivery. When two or more swing lows print at nearly the same level, buy-side participants place their protective stops just below, creating a dense pool of sell-side liquidity the IPDA must pair with. The algorithm will drive price below these equal lows to fill institutional orders before reversing. After the sweep, traders should look for bullish displacement — a strong rejection candle or FVG forming below the equal lows — as the entry signal for long positions targeting internal range liquidity above.',
    metadata: {
      category: 'liquidity_pool',
      abbreviation: 'EQL',
      detection_rules: 'Identify two or more swing lows within a tight price range of each other. The cleaner and more obvious the equal lows appear, the more retail stops accumulate below. Prioritize equal lows on H4 and Daily charts for the most significant liquidity pools.',
      entry_rules: ['Wait for price to wick below equal lows and display bullish displacement', 'Enter on the bullish FVG or order block that forms after the sweep', 'Confirm with HTF bullish bias — equal lows swept into discount offer the highest probability'],
      invalidation: 'Invalidated if price breaks below equal lows with sustained bearish displacement and continuation, showing no immediate rejection or reversal pattern.',
      related_concepts: ['liquidity', 'ssl', 'stop-hunt'],
      confluence_weight: 1.5,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['liquidity', 'equal-lows', 'sell-stops', 'liquidity-pool', 'sweep'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-equilibrium',
    type: 'concept',
    domain: 'concepts',
    name: 'Equilibrium',
    description: 'The 50% level of any defined range, serving as the dividing line between premium and discount pricing. Equilibrium represents fair value within a dealing range where neither buyers nor sellers have a distinct advantage, and price frequently reacts at this level during retracements.',
    content: 'Equilibrium is calculated as the exact midpoint between any swing high and swing low. Above equilibrium is premium territory where smart money sells, and below is discount territory where smart money buys. Price often stalls, consolidates, or reverses at equilibrium because it represents the balance point of the range. When seeking long entries, traders should require price to retrace to or below equilibrium into discount; for short entries, price should retrace to or above equilibrium into premium. This simple filter dramatically improves trade quality.',
    metadata: {
      category: 'valuation',
      abbreviation: 'EQ',
      detection_rules: 'Calculate the midpoint (50%) of any clearly defined swing high to swing low range. Draw a horizontal line at this level. Observe how price respects this level on retracements — it often acts as a decision point where price either continues through into the opposite zone or reverses.',
      entry_rules: ['Only take long entries at or below equilibrium (in discount)', 'Only take short entries at or above equilibrium (in premium)', 'Use equilibrium as a filter — if price has not retraced to at least EQ, the entry lacks sufficient displacement'],
      invalidation: 'Equilibrium itself is not invalidated as it is a mathematical level. However, the range it references is invalidated if price breaks the swing high or swing low defining the range.',
      related_concepts: ['premium-discount', 'dealing-range'],
      confluence_weight: 1.2,
      timeframes: ['M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['equilibrium', 'midpoint', 'premium-discount', 'valuation', 'range'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-erl',
    type: 'concept',
    domain: 'concepts',
    name: 'External Range Liquidity',
    description: 'Liquidity residing OUTSIDE the current dealing range, including old swing highs, old swing lows, equal highs, and equal lows. External range liquidity represents the targets — the draw on liquidity — that price is being delivered toward by the IPDA algorithm.',
    content: 'External range liquidity is where price is heading, not where you enter. It consists of buy stops above old highs and sell stops below old lows that exist beyond the boundaries of the current consolidation or dealing range. The IPDA delivers price from internal range liquidity (where entries occur) to external range liquidity (where targets reside). Understanding ERL allows traders to identify where price is likely headed next, set appropriate take-profit levels, and recognize when a dealing range expansion is imminent. ERL is the destination; IRL is the origin of trades.',
    metadata: {
      category: 'liquidity_type',
      abbreviation: 'ERL',
      detection_rules: 'Identify the boundaries of the current dealing range or consolidation. Any liquidity pool (swing highs, swing lows, equal highs/lows) that exists OUTSIDE these boundaries constitutes external range liquidity. Mark old highs and lows on HTF that have not yet been swept.',
      entry_rules: ['Use ERL as your target/take-profit zone, not as an entry zone', 'After price taps IRL (FVG, OB) for entry, target the nearest ERL', 'When ERL is swept, expect price to reverse back toward IRL — this is the IRL-to-ERL delivery cycle'],
      invalidation: 'ERL targets are invalidated if the dealing range shifts and new structure forms, redefining which liquidity pools are external versus internal to the new range.',
      related_concepts: ['liquidity', 'bsl', 'ssl', 'dealing-range'],
      confluence_weight: 1.6,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['erl', 'external-liquidity', 'targets', 'draw-on-liquidity', 'dealing-range'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-expansion',
    type: 'concept',
    domain: 'concepts',
    name: 'Expansion',
    description: 'A directional price move out of consolidation or range, representing the distribution phase of the AMD (Accumulation-Manipulation-Distribution) cycle. Expansion is where the real move occurs — displacement candles driving price rapidly away from the manipulation zone toward the draw on liquidity.',
    content: 'Expansion is the payoff phase of the power of three. After accumulation builds orders and manipulation sweeps liquidity, expansion delivers price aggressively in the intended direction. Expansion is characterized by displacement candles with large real bodies and minimal wicks, creating FVGs in their wake. This phase should align with HTF bias and occur during a killzone for highest probability. Traders should already be positioned before expansion begins — chasing expansion candles leads to poor risk-to-reward. Instead, enter during manipulation and ride the expansion to your ERL target.',
    metadata: {
      category: 'price_action',
      abbreviation: 'EXP',
      detection_rules: 'Look for large-bodied candles breaking out of a consolidation range with increasing momentum. Expansion candles leave FVGs, break structure (BOS/MSS), and show little to no retracement. Volume typically increases during expansion. The move should be directional and sustained over multiple candles.',
      entry_rules: ['Do not chase expansion — be positioned before it begins via manipulation entry', 'If missed, wait for price to retrace to an FVG created during expansion', 'Use expansion candles to confirm bias direction and trail stops behind FVGs created'],
      invalidation: 'Expansion is invalidated if the move fails to sustain and price reverses back into the consolidation range, suggesting the breakout was a false expansion or extended manipulation.',
      related_concepts: ['displacement', 'distribution', 'power-of-three'],
      confluence_weight: 1.4,
      timeframes: ['M1', 'M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['expansion', 'distribution', 'amd', 'displacement', 'breakout'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-fair-value',
    type: 'concept',
    domain: 'concepts',
    name: 'Fair Value',
    description: 'The price level where the algorithm considers value to be balanced between buyers and sellers. Fair Value Gaps exist precisely because price departed from fair value too quickly during displacement, leaving an inefficiency that the algorithm is programmed to revisit and rebalance.',
    content: 'Fair value is the foundational concept behind all ICT gap theory. When price moves efficiently, every price level is traded through on both sides — this is fair value delivery. When displacement occurs, price moves so aggressively that it skips levels, creating FVGs. The algorithm treats these skipped levels as incomplete transactions that must eventually be revisited. Understanding fair value explains why FVGs get filled — it is not random; it is the algorithm returning to complete unfinished business. Price oscillates between premium and discount relative to fair value, and institutional positioning occurs when price deviates significantly from fair value.',
    metadata: {
      category: 'valuation',
      abbreviation: 'FV',
      detection_rules: 'Fair value is conceptual rather than a single line on the chart. It manifests through FVGs (areas where fair value was not delivered), equilibrium levels, and VWAP-like mean prices. When large FVGs form, they indicate price left fair value aggressively and will return.',
      entry_rules: ['Enter when price returns to areas of unfair pricing (FVGs in discount for longs, FVGs in premium for shorts)', 'Use the consequent encroachment (50%) of FVGs as the optimal fair value entry point', 'Avoid entering during fair value — wait for displacement away from and return to fair value'],
      invalidation: 'Fair value as a concept is never invalidated, but specific fair value gaps can be invalidated if price trades completely through them without any reaction, suggesting the algorithm has moved on to new PD arrays.',
      related_concepts: ['fvg', 'market-efficiency-paradigm'],
      confluence_weight: 1.3,
      timeframes: ['M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['fair-value', 'valuation', 'efficiency', 'fvg', 'algorithm'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-htf-bias',
    type: 'concept',
    domain: 'concepts',
    name: 'Higher Timeframe Bias',
    description: 'The directional bias derived from Daily and 4-Hour chart structure, which serves as the non-negotiable filter for all lower timeframe trade execution. HTF bias is the compass — you NEVER trade against it. Every LTF setup must promote and align with the HTF directional narrative.',
    content: 'Higher timeframe bias is established by analyzing Daily and 4H market structure: the direction of the most recent break of structure, the location of unmitigated PD arrays, and the draw on liquidity. If the Daily chart shows bullish structure with price in discount, the HTF bias is bullish — only long setups on LTF are valid. HTF bias prevents the most common ICT mistake: taking technically valid LTF setups that fight the dominant trend. Establishing HTF bias should be the FIRST step in any analysis session, performed before even looking at execution timeframes. When HTF bias is unclear or conflicting, the correct action is to stand aside.',
    metadata: {
      category: 'analysis',
      abbreviation: 'HTF',
      detection_rules: 'On the Daily chart, identify the most recent BOS or MSS direction. Determine if price is in premium or discount relative to the HTF dealing range. Identify the draw on liquidity (unswept highs/lows). On the 4H, confirm alignment with Daily structure. If Daily and 4H disagree, defer to Daily.',
      entry_rules: ['Establish HTF bias BEFORE looking at any execution timeframe', 'Only take LTF setups that align with HTF bias direction', 'If HTF bias is unclear or conflicting between D1 and H4, do not trade'],
      invalidation: 'HTF bias shifts when the Daily chart prints a clear MSS (Market Structure Shift) in the opposite direction, confirmed by displacement and a close beyond the previous swing point.',
      related_concepts: ['daily-bias', 'market-structure'],
      confluence_weight: 2.0,
      timeframes: ['H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['htf-bias', 'daily-bias', 'directional-filter', 'top-down-analysis', 'structure'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-immediate-rebalance',
    type: 'concept',
    domain: 'concepts',
    name: 'Immediate Rebalance',
    description: 'A Fair Value Gap that is partially or fully filled on the very next candle after its creation. This pattern indicates the algorithm is aggressively seeking price efficiency and does not intend to leave the imbalance open for future retracement, signaling strong directional conviction.',
    content: 'When an FVG forms and the immediately following candle trades back into it, this is an immediate rebalance. It tells the trader that the algorithm considers the inefficiency urgent enough to address right away rather than leaving it for later. The portion of the FVG that remains unfilled after the immediate rebalance candle becomes a refined entry zone — this is often the highest probability section of the original FVG. Immediate rebalances often occur during the strongest displacement legs and suggest the move will continue aggressively in the original displacement direction after the brief rebalance.',
    metadata: {
      category: 'pd_array',
      abbreviation: 'IR',
      detection_rules: 'After a displacement candle creates an FVG, observe if the very next candle trades back into the gap. If it does, mark the unfilled portion of the original FVG as the refined immediate rebalance zone. The key is that rebalancing happens on the NEXT candle, not two or three candles later.',
      entry_rules: ['Enter at the unfilled portion of the FVG after the immediate rebalance candle', 'Place stop loss beyond the full extent of the original FVG', 'Expect continuation in the displacement direction — immediate rebalances signal strong conviction'],
      invalidation: 'Invalidated if the candle following the immediate rebalance continues to fill the entire FVG and price reverses through the displacement candle, showing the move lacked genuine institutional sponsorship.',
      related_concepts: ['fvg', 'displacement'],
      confluence_weight: 1.3,
      timeframes: ['M1', 'M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['immediate-rebalance', 'fvg', 'efficiency', 'displacement', 'pd-array'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-institutional-sponsorship',
    type: 'concept',
    domain: 'concepts',
    name: 'Institutional Sponsorship',
    description: 'The presence of institutional order flow behind a price move, confirmed by displacement candles, volume expansion, and sustained follow-through. Without institutional sponsorship, a move lacks the backing needed to reach its target — no sponsorship means no trade.',
    content: 'Institutional sponsorship is what separates genuine algorithmic moves from noise and retail stop hunts that go nowhere. A sponsored move will show displacement (large-bodied candles with minimal wicks), create FVGs, break structure cleanly, and maintain directional follow-through without excessive retracement. When evaluating any setup, ask: is there evidence that institutions are behind this move? If the FVG is small, displacement is weak, and the move stalls immediately, there is no sponsorship. The highest probability trades occur when multiple signs of institutional sponsorship converge — displacement, volume, clean structure breaks, and alignment with HTF bias.',
    metadata: {
      category: 'order_flow',
      abbreviation: 'IS',
      detection_rules: 'Look for displacement candles with bodies comprising 70%+ of the total range. Check for FVGs created during the move. Observe if price breaks structure (BOS) cleanly without hesitation. Volume should expand during the move. Follow-through on subsequent candles should maintain direction without deep pullbacks.',
      entry_rules: ['Only trade setups that show clear institutional sponsorship via displacement', 'If a liquidity sweep occurs but lacks displacement afterward, stand aside — no sponsorship', 'Use the FVGs and OBs created by sponsored moves as entry points on pullbacks'],
      invalidation: 'Sponsorship is questioned if the displacement move is immediately and fully retraced, FVGs are filled completely without continuation, or the structure break fails to hold.',
      related_concepts: ['displacement', 'order-flow'],
      confluence_weight: 1.7,
      timeframes: ['M5', 'M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['institutional-sponsorship', 'order-flow', 'displacement', 'confirmation', 'volume'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-intermarket-analysis',
    type: 'concept',
    domain: 'concepts',
    name: 'Intermarket Analysis',
    description: 'The study of correlations and divergences between related markets — DXY (US Dollar Index), bond yields, equity indices, and commodities — to confirm or deny directional bias. Divergences between correlated markets often signal impending reversals and provide an edge unavailable from single-chart analysis.',
    content: 'Intermarket analysis is one of ICTs higher-level frameworks for establishing directional bias with confidence. Key relationships include: DXY inversely correlated with EUR/USD and GBP/USD; rising bond yields pressuring equities; gold inversely correlated with DXY. When these correlations hold, they confirm the move. When they diverge — for example, DXY rising while EUR/USD also rises — it signals something is about to break. SMT (Smart Money Technique) divergences between correlated pairs like ES and NQ, or EUR/USD and GBP/USD, are among the most powerful reversal signals in the ICT toolkit. Always check intermarket alignment before committing to a bias.',
    metadata: {
      category: 'intermarket',
      abbreviation: 'IMA',
      detection_rules: 'Compare price action across correlated markets on the same timeframe. Look for divergences where one market makes a new high/low while its correlated counterpart fails to do so. Check DXY direction against forex pairs. Compare ES and NQ for SMT divergences. Monitor bond yields versus equity indices.',
      entry_rules: ['Confirm forex bias with DXY direction — if DXY is bearish, favor EUR/USD and GBP/USD longs', 'Use SMT divergences between correlated pairs as reversal confirmation', 'When intermarket relationships break down (divergence), anticipate the lagging market to catch up'],
      invalidation: 'Intermarket analysis signals are invalidated when the divergence resolves with both markets realigning in the same direction without the expected reversal occurring in the target market.',
      related_concepts: ['dxy-correlation', 'bond-yield-correlation', 'smt'],
      confluence_weight: 1.6,
      timeframes: ['H1', 'H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['intermarket', 'correlation', 'divergence', 'dxy', 'smt', 'bonds'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-ipda-data-ranges',
    type: 'concept',
    domain: 'concepts',
    name: 'IPDA Data Ranges',
    description: 'The 20-day, 40-day, and 60-day lookback periods that the Interbank Price Delivery Algorithm uses to identify relevant PD arrays and determine the Draw on Liquidity. These ranges define the algorithmic memory — which price levels the IPDA is currently referencing for its delivery objectives.',
    content: 'The IPDA does not look at the entire price history. It operates on specific data ranges: the most recent 20 trading days (short-term), 40 trading days (medium-term), and 60 trading days (long-term). Within these windows, the algorithm identifies unmitigated PD arrays (FVGs, order blocks, breakers) and unswept liquidity pools that serve as potential targets. Marking the high and low of each IPDA data range reveals the algorithmic boundaries. PD arrays within the 20-day range are most immediately relevant, while the 60-day range provides the macro draw on liquidity. When price exits one IPDA data range, the next range becomes the active reference.',
    metadata: {
      category: 'algorithmic_theory',
      abbreviation: 'IDR',
      detection_rules: 'Count back 20, 40, and 60 trading days from the current date and mark the high and low of each range. Identify all unmitigated PD arrays within each range. The 20-day range highs and lows are the most immediate liquidity targets. Overlap between data ranges amplifies the significance of PD arrays found at those levels.',
      entry_rules: ['Use IPDA data ranges to identify which PD arrays the algorithm is currently referencing', 'Target liquidity at the extremes of the 20-day range as the primary draw on liquidity', 'When the 20-day range is exhausted, look to 40-day and 60-day ranges for next objectives'],
      invalidation: 'IPDA data ranges shift daily as new trading days are added and old ones fall off. A PD array that was within the 20-day range last week may no longer be referenced if it has fallen outside the current 20-day window.',
      related_concepts: ['ipda', 'dealing-range', 'pd-array'],
      confluence_weight: 1.8,
      timeframes: ['D1', 'W1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ipda_data_ranges.md'
    },
    sources: [{
      filePath: 'knowledge_base/ipda_data_ranges.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['ipda', 'data-ranges', '20-40-60', 'algorithmic', 'draw-on-liquidity'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-ipda-true-day',
    type: 'concept',
    domain: 'concepts',
    name: 'IPDA True Day',
    description: 'The algorithmic trading day that runs from midnight New York time to 3:00 PM ET, rather than the conventional calendar day. After 3:00 PM ET, the next day\'s CBDR (Central Bank Dealers Range) begins, effectively starting the new algorithmic day before the calendar rolls over.',
    content: 'The IPDA True Day is a critical time concept that redefines when a trading day actually begins and ends from the algorithm\'s perspective. The true day opens at midnight ET and the primary delivery window closes at 3:00 PM ET. Between 3:00 PM and midnight, the algorithm transitions into the next day\'s setup phase — this is when the CBDR begins forming. Understanding the true day explains why significant moves often complete by early afternoon and why late-session price action belongs to the following day\'s narrative. Traders who use the true day framework avoid the confusion of late-day reversals that are actually the next day\'s accumulation beginning.',
    metadata: {
      category: 'time',
      abbreviation: 'ITD',
      detection_rules: 'Mark midnight ET as the true day open. Mark 3:00 PM ET as the effective close of the algorithmic day. Observe that major moves typically initiate and complete within this window. After 3:00 PM ET, treat price action as belonging to the next day\'s setup phase (CBDR formation).',
      entry_rules: ['Frame all daily analysis using midnight ET open to 3:00 PM ET close', 'Do not initiate new trades after 3:00 PM ET based on current day bias — the day is over', 'Use the midnight open as a key reference level for the true day session bias'],
      invalidation: 'The true day framework is a time structure and is not invalidated per se. However, on high-impact news days or FOMC releases after 2:00 PM ET, the algorithmic day may extend slightly beyond the normal 3:00 PM ET boundary.',
      related_concepts: ['cbdr', 'macro-times', 'midnight-open'],
      confluence_weight: 1.4,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_core_month8_02_defining_range.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_core_month8_02_defining_range.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['ipda', 'true-day', 'midnight-open', 'time', 'cbdr', 'session'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-irl',
    type: 'concept',
    domain: 'concepts',
    name: 'Internal Range Liquidity',
    description: 'Liquidity residing INSIDE the current dealing range, including Fair Value Gaps, order blocks, breaker blocks, and liquidity voids. Internal range liquidity is where entries happen — the PD arrays within the range that price returns to for rebalancing before continuing to external range liquidity targets.',
    content: 'Internal range liquidity is the origin of trades, while external range liquidity is the destination. IRL consists of all the PD arrays (FVGs, OBs, breakers, mitigation blocks) that exist between the current dealing range high and low. When price sweeps ERL (takes out a swing high or low), it then retraces back into IRL to rebalance before delivering to the opposite ERL. This IRL-to-ERL delivery cycle is the fundamental rhythm of algorithmic price delivery. For entry, traders wait for price to return to IRL PD arrays in discount (for longs) or premium (for shorts), then target the ERL on the opposite side of the range.',
    metadata: {
      category: 'liquidity_type',
      abbreviation: 'IRL',
      detection_rules: 'Within the current dealing range, identify all unmitigated FVGs, order blocks, breaker blocks, and liquidity voids. These collectively form the internal range liquidity. Prioritize PD arrays that sit at or below equilibrium (for longs) or at or above equilibrium (for shorts) as highest probability IRL entry zones.',
      entry_rules: ['Use IRL PD arrays as your entry zones — this is where the trade begins', 'After ERL is swept, wait for price to return to IRL for the next setup', 'Stack multiple IRL PD arrays at the same level for highest confluence entries'],
      invalidation: 'IRL zones are invalidated when the dealing range itself is broken — a new swing high or low redefines the range, and previously internal liquidity may become external or irrelevant.',
      related_concepts: ['fvg', 'order-block', 'dealing-range'],
      confluence_weight: 1.6,
      timeframes: ['M5', 'M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['irl', 'internal-liquidity', 'entry-zone', 'pd-array', 'dealing-range'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-liquidity-sweep',
    type: 'concept',
    domain: 'concepts',
    name: 'Liquidity Sweep',
    description: 'A price move that takes out a liquidity pool (stop losses above highs or below lows) and then reverses. This is the fluid destined process by which the algorithm pairs orders — engineering a move into resting liquidity to fill institutional positions before delivering price in the intended direction.',
    content: 'A liquidity sweep is the mechanical process at the heart of ICT methodology. The algorithm identifies where stop losses cluster (above highs, below lows, at equal levels), drives price into these pools to trigger the stops and fill institutional orders, then reverses. The sweep is confirmed when price takes out a defined level (swing high/low, equal highs/lows) and produces displacement in the opposite direction. The quality of the sweep matters: a wick through the level with immediate rejection is a clean sweep, while a full candle close beyond suggests continuation rather than reversal. Liquidity sweeps during killzone hours with HTF bias alignment are the highest probability setups in the ICT framework.',
    metadata: {
      category: 'price_action',
      abbreviation: 'LS',
      detection_rules: 'Watch for price to pierce a defined liquidity level (swing high, swing low, equal highs/lows) and immediately reverse. The sweep should produce a wick beyond the level with the candle body closing back inside. Look for displacement candles following the sweep as confirmation. The sweep should occur during an active killzone for highest probability.',
      entry_rules: ['Enter after the sweep produces displacement — the displacement candle IS the confirmation', 'Place stop loss beyond the sweep wick high/low', 'Target the opposite side liquidity or nearest unmitigated PD array in the displacement direction'],
      invalidation: 'A liquidity sweep is invalidated if price sweeps the level and continues with displacement in the sweep direction (candle body closes beyond), indicating the sweep was actually a legitimate breakout with institutional sponsorship.',
      related_concepts: ['liquidity', 'stop-hunt', 'displacement'],
      confluence_weight: 1.7,
      timeframes: ['M1', 'M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['liquidity-sweep', 'stop-hunt', 'reversal', 'displacement', 'entry-signal'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-london-close-killzone',
    type: 'concept',
    domain: 'concepts',
    name: 'London Close Killzone',
    description: 'The trading window from 10:00 AM to 12:00 PM ET when the London session winds down. This killzone often produces reversals of the London and New York AM directional move as institutional profit-taking occurs and the algorithm rebalances the day\'s displacement.',
    content: 'The London Close killzone is the profit-taking window of the trading day. After the London and New York AM sessions have produced directional expansion, the London Close often sees price retrace or reverse as institutions book profits and the algorithm begins rebalancing. This is NOT a primary setup window — it is better suited for trade management (taking profits, tightening stops) than initiating new positions. However, experienced traders can use London Close reversals to enter counter-trend scalps targeting FVGs created during the AM session. The key is recognizing that the London Close move is typically corrective, not impulsive, and will be contained within the day\'s range.',
    metadata: {
      category: 'time',
      abbreviation: 'LC',
      detection_rules: 'Mark the 10:00 AM to 12:00 PM ET window on your chart. Observe whether price has already made a significant directional move during London and NY AM sessions. If the day\'s range has expanded significantly, expect the London Close to produce a retracement. Look for reversal patterns (sweeps, SMT divergences) forming within this window.',
      entry_rules: ['Use London Close primarily for profit-taking on positions entered during London or NY AM', 'If entering during London Close, trade counter to the AM session direction with tight targets', 'Only trade London Close if AM session produced a clear expansion that needs rebalancing'],
      invalidation: 'London Close reversal setups are invalidated if price continues trending through the window with displacement, indicating the daily move is not yet complete and institutional profit-taking has not begun.',
      related_concepts: ['killzones', 'london-killzone'],
      confluence_weight: 0.9,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['london-close', 'killzone', 'profit-taking', 'reversal', 'session'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-london-killzone',
    type: 'concept',
    domain: 'concepts',
    name: 'London Killzone',
    description: 'The 2:00 AM to 5:00 AM ET trading window when the London session opens and delivers the first significant directional move of the day. London typically breaks the Asian session range, often via a Judas swing (false breakout in one direction before reversing), and establishes the day\'s trend.',
    content: 'The London killzone is where the day truly begins for ICT traders. During the Asian session, the algorithm accumulates orders within a tight range. At London open, the manipulation phase begins — price often breaks one side of the Asia range (the Judas swing) to grab liquidity before reversing and expanding in the true daily direction. This is one of the highest probability windows for entries, especially for forex pairs involving EUR, GBP, and CHF. The setup framework is straightforward: identify Asia range, determine HTF bias, wait for the Judas swing to sweep one side of Asia range against bias, then enter on displacement in the bias direction. London killzone setups should target the New York session highs/lows or the daily draw on liquidity.',
    metadata: {
      category: 'time',
      abbreviation: 'LKZ',
      detection_rules: 'Mark the 2:00 AM to 5:00 AM ET window. Draw the Asian session range (7:00 PM to 12:00 AM ET or regional variant). Watch for price to break one side of the Asia range during the London killzone. The break against HTF bias is the Judas swing — the manipulation before true expansion.',
      entry_rules: ['Identify Asia range and HTF bias before London opens', 'Wait for the Judas swing to sweep one side of the Asia range against HTF bias', 'Enter on displacement following the Judas swing, targeting opposite side of range and beyond'],
      invalidation: 'London killzone setups are invalidated if price breaks the Asia range in the HTF bias direction immediately without a Judas swing, or if no clear displacement occurs after the range break by 5:00 AM ET.',
      related_concepts: ['killzones', 'asia-range'],
      confluence_weight: 1.6,
      timeframes: ['M1', 'M5', 'M15'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['london', 'killzone', 'judas-swing', 'asia-range', 'session-open'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-ltf-execution',
    type: 'concept',
    domain: 'concepts',
    name: 'Lower Timeframe Execution',
    description: 'The use of 5-minute and 1-minute charts for precise trade entry timing, employed ONLY when the medium and higher timeframes are fully aligned. LTF execution provides surgical entries with tight stop losses, but is only valid as the final step of top-down analysis — never in isolation.',
    content: 'Lower timeframe execution is the last piece of the top-down analysis chain: HTF establishes bias, MTF identifies the setup zone (PD array), and LTF provides the precise entry trigger. On the 5M or 1M chart, traders look for micro market structure shifts, FVGs, and displacement that confirm the MTF setup is activating. The benefit of LTF execution is dramatically tighter stop losses — instead of placing a stop beyond an H1 order block, you place it beyond the M5 displacement candle, often achieving 5:1 or better risk-to-reward. The danger is that LTF noise can cause premature entries or stop-outs, which is why MTF/HTF alignment is non-negotiable before dropping to execution timeframes.',
    metadata: {
      category: 'analysis',
      abbreviation: 'LTF',
      detection_rules: 'Once HTF bias is confirmed and MTF has identified a PD array entry zone, drop to 5M or 1M as price enters the zone. Look for a market structure shift on LTF (MSS on M5), a displacement candle in the bias direction, and an FVG forming within the MTF PD array. These LTF signals confirm the higher timeframe setup is activating.',
      entry_rules: ['Only use LTF execution after HTF and MTF are aligned and a PD array is being tested', 'Enter on M5/M1 MSS or displacement within the MTF PD array zone', 'Place stop loss beyond the LTF displacement candle or micro swing point for tight risk'],
      invalidation: 'LTF execution is invalidated if the MTF PD array fails (price trades through the zone without LTF displacement), or if the LTF entry is stopped out indicating the MTF level did not hold.',
      related_concepts: ['mtf-bridge', 'htf-bias'],
      confluence_weight: 1.3,
      timeframes: ['M1', 'M5'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['ltf', 'execution', 'entry-timing', 'top-down', 'precision'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-manipulation',
    type: 'concept',
    domain: 'concepts',
    name: 'Manipulation',
    description: 'The engineered false move designed to grab liquidity before the true directional move begins. Manipulation is the Judas swing — a deliberate price thrust into resting stop losses that traps retail traders on the wrong side. In ICT methodology, manipulation IS the entry signal, not something to avoid.',
    content: 'Manipulation is the second phase of the AMD (Accumulation-Manipulation-Distribution) cycle and represents the highest probability entry window. After accumulation builds a range, the algorithm drives price aggressively into the liquidity resting on one side — this is the manipulation or Judas swing. It sweeps stops, triggers breakout orders in the wrong direction, and fills institutional positions. The key insight is that manipulation ALWAYS precedes the real move. When you see price sweep a defined liquidity level during a killzone and immediately produce displacement in the opposite direction, you are witnessing manipulation — and that displacement is your entry signal. Trading the manipulation phase means you enter exactly where institutions are positioning.',
    metadata: {
      category: 'market_phase',
      abbreviation: 'MANIP',
      detection_rules: 'Look for a sharp, fast move into a known liquidity pool (swing high/low, equal highs/lows) that occurs during a killzone, especially within the first 30 minutes of London or NY open. The move should be against HTF bias. Immediately following the liquidity grab, look for displacement candles in the opposite direction — this confirms the manipulation is complete.',
      entry_rules: ['Wait for the manipulation move to sweep a defined liquidity level', 'Enter only after displacement confirms the manipulation is reversing', 'The manipulation low/high becomes your stop loss level — place stops beyond the sweep'],
      invalidation: 'Manipulation is invalidated if the sweep produces follow-through instead of reversal — meaning displacement continues in the sweep direction with candle bodies closing beyond. This suggests it was not manipulation but genuine expansion.',
      related_concepts: ['accumulation', 'distribution', 'power-of-three'],
      confluence_weight: 1.8,
      timeframes: ['M1', 'M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['manipulation', 'judas-swing', 'amd', 'liquidity-grab', 'entry-signal'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-market-efficiency-paradigm',
    type: 'concept',
    domain: 'concepts',
    name: 'Market Efficiency Paradigm',
    description: 'The ICT principle that price must deliver efficiently between PD arrays, filling Fair Value Gaps, sweeping liquidity, and leaving nothing wasted. The algorithm ensures that every inefficiency created by displacement is eventually rebalanced — this is the fundamental law governing all price delivery.',
    content: 'The Market Efficiency Paradigm is the overarching principle that explains WHY ICT concepts work. The IPDA is programmed to deliver price efficiently: FVGs must be filled, liquidity pools must be swept, and order blocks must be tested. Nothing is random — every price move serves the purpose of either creating or resolving an inefficiency. When a displacement move creates FVGs, the algorithm will return price to fill them. When stop losses accumulate above equal highs, the algorithm will deliver price to sweep them. Understanding MEP transforms chart reading from pattern recognition to understanding the algorithm\'s to-do list. Traders who grasp MEP can anticipate where price MUST go next, because the algorithm\'s obligations are visible on the chart as unresolved inefficiencies.',
    metadata: {
      category: 'algorithmic_theory',
      abbreviation: 'MEP',
      detection_rules: 'Identify all unresolved inefficiencies on the chart: unfilled FVGs, unswept liquidity pools, untested order blocks. These represent the algorithm\'s pending tasks. The nearest unresolved inefficiency in the bias direction is the most probable next target. When all nearby inefficiencies are resolved in one direction, the algorithm shifts to resolve inefficiencies in the other direction.',
      entry_rules: ['Trade in the direction of unresolved inefficiencies — price will seek to resolve them', 'Enter at PD arrays (resolved inefficiencies used as entry) targeting unresolved inefficiencies', 'When an FVG is filled and liquidity is swept in the same zone, expect the algorithm to shift to the next unresolved target'],
      invalidation: 'MEP as a paradigm is never fully invalidated, but specific inefficiencies may be bypassed temporarily during extreme volatility or news events. The algorithm will typically return to resolve them eventually.',
      related_concepts: ['ipda', 'fvg', 'delivery'],
      confluence_weight: 1.9,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['mep', 'efficiency', 'algorithmic', 'ipda', 'price-delivery'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-market-maker-profile',
    type: 'concept',
    domain: 'concepts',
    name: 'Market Maker Profile',
    description: 'The intraday behavioral model of how market makers operate across sessions: accumulating positions during Asia, manipulating price at London open, and distributing during New York. This is the daily Power of Three expressed through the lens of institutional market making.',
    content: 'The Market Maker Profile maps the daily AMD cycle to specific trading sessions. During the Asian session (7 PM - 12 AM ET), market makers accumulate positions within a tight range, building inventory without moving price significantly. At London open (2-5 AM ET), they manipulate price by running stops on one side of the Asia range (the Judas swing) to fill remaining orders at favorable prices. During New York (8:30 AM - 12 PM ET), they distribute — delivering price aggressively in the true direction to offload positions at profit. Understanding this profile allows traders to anticipate what phase the market is in at any time of day and trade accordingly: never trade during accumulation, enter during manipulation, and ride the distribution.',
    metadata: {
      category: 'algorithmic_theory',
      abbreviation: 'MMP',
      detection_rules: 'Observe the Asia session range for tight consolidation (accumulation). Watch London open for a break of Asia range in one direction followed by reversal (manipulation). Monitor NY session for directional expansion (distribution). The profile is most clean on trending days that respect the daily bias.',
      entry_rules: ['Do not trade during Asia — this is accumulation, not an opportunity', 'Enter during London manipulation phase after the Judas swing and displacement', 'Use NY session for distribution continuation or profit-taking, not fresh entries against the trend'],
      invalidation: 'The Market Maker Profile is invalidated on days when Asia produces a wide range (no clear accumulation), or when London fails to manipulate and instead immediately expands, or on high-impact news days that disrupt the normal session flow.',
      related_concepts: ['power-of-three', 'asia-session', 'killzones'],
      confluence_weight: 1.5,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['market-maker', 'profile', 'amd', 'sessions', 'power-of-three'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-mean-threshold',
    type: 'concept',
    domain: 'concepts',
    name: 'Mean Threshold',
    description: 'The 50% level of an order block\'s candle body, serving as the key reaction level within the OB. Mean threshold functions for order blocks the same way consequent encroachment functions for FVGs — it is the optimal entry point within the PD array where institutional orders are most concentrated.',
    content: 'The mean threshold is calculated by taking the midpoint of the order block candle\'s open and close (the body, excluding wicks). This level represents where the densest concentration of institutional orders was executed within the OB. While the full OB range (high to low) is valid for reaction, the mean threshold is the sniper entry level that provides the tightest stop loss and best risk-to-reward. When price retraces to an order block, traders should watch for reaction specifically at the mean threshold. A rejection from MT with displacement confirms the OB is active. If price trades through the MT and closes beyond the full OB range, the order block is likely invalidated.',
    metadata: {
      category: 'entry',
      abbreviation: 'MT',
      detection_rules: 'Identify a valid order block and calculate the 50% level of the candle body (midpoint between open and close, ignoring wicks). Draw this level as a distinct line within the order block zone. When price returns to the OB, observe reaction at the mean threshold specifically — look for wicks, rejection candles, or displacement from this level.',
      entry_rules: ['Use mean threshold as the limit order entry level within an order block', 'Place stop loss beyond the full order block range (beyond the wick)', 'Enter at MT only when HTF bias aligns and price is in the correct premium/discount zone'],
      invalidation: 'Mean threshold is invalidated if price trades cleanly through the 50% body level and closes beyond the full order block range on a displacement candle, indicating the institutional orders have been absorbed.',
      related_concepts: ['order-block', 'ce'],
      confluence_weight: 1.4,
      timeframes: ['M5', 'M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'knowledge_base/concept_graph.json'
    },
    sources: [{
      filePath: 'knowledge_base/concept_graph.json',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['mean-threshold', 'order-block', 'entry', 'midpoint', 'precision'],
    createdAt: timestamp,
    updatedAt: timestamp
  },

  // ===== EXPANDED ICT CONCEPTS - Time & Key Levels =====
  {
    id: 'concept-midnight-open',
    type: 'concept',
    domain: 'concepts',
    name: 'Midnight Open',
    description: 'The price level at midnight New York time (00:00 EST) marks the true beginning of the algorithmic trading day. This level serves as a critical equilibrium reference that the interbank price delivery algorithm uses to gauge directional bias and mean reversion throughout the session.',
    content: 'Midnight Open is plotted as a horizontal line at the exact price when the New York midnight candle opens. Price tends to trade away from and return to this level, making it a magnet for intraday price action. When price is above the Midnight Open, bullish intraday bias is supported; when below, bearish bias is favored. Traders use it as a reference for judging whether the daily range expansion is bullish or bearish relative to this equilibrium.',
    metadata: {
      category: 'time',
      abbreviation: 'MN Open',
      detection_rules: 'Mark the opening price of the 00:00 EST candle on M15 or H1 chart. Draw a horizontal line extending through the trading day. Observe how price interacts with this level during London and New York sessions.',
      entry_rules: ['Price trading above Midnight Open supports long entries on pullbacks', 'Price trading below Midnight Open supports short entries on retracements', 'Use Midnight Open as a reference for stop placement — invalidation if price crosses and holds opposite side'],
      invalidation: 'Midnight Open loses relevance once the following midnight establishes a new reference. Also invalidated if price consolidates directly on the level with no clear directional commitment during both London and NY sessions.',
      related_concepts: ['true-day', 'ipda-true-day'],
      confluence_weight: 1.0,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_time_concepts.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_time_concepts.md',
      lineStart: 1,
      lineEnd: 40,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['midnight', 'open', 'equilibrium', 'new-york-time', 'daily-reference'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-monthly-profile',
    type: 'concept',
    domain: 'concepts',
    name: 'Monthly Profile',
    description: 'The Monthly Profile describes the characteristic way a trading month unfolds in terms of price delivery. The first week typically establishes the monthly range boundaries, the middle of the month delivers the real directional move, and the final week acts as a distribution or consolidation phase.',
    content: 'Understanding the Monthly Profile allows traders to align expectations with the algorithmic delivery cycle. The first week of the month often produces a fake move or range expansion that sets the high or low of the month. Weeks two and three deliver the primary directional displacement aligned with HTF institutional order flow. The last week tends to slow down as institutions distribute positions ahead of the new month. Traders should be most aggressive during the mid-month phase and cautious during the first and last weeks.',
    metadata: {
      category: 'time_profile',
      abbreviation: 'MP',
      detection_rules: 'Observe how the first 5 trading days establish range extremes on D1 chart. Track the directional move during days 6-15 for the main monthly displacement. Note reduced volatility and consolidation behavior in the final 5-7 trading days of the month.',
      entry_rules: ['Avoid heavy positioning during the first week — wait for range to establish', 'Take directional trades aligned with HTF bias during weeks 2-3 for maximum probability', 'Reduce position sizing and avoid new trades in the final week as distribution occurs'],
      invalidation: 'Monthly profile is disrupted by major news events (NFP, FOMC, central bank decisions) that override normal algorithmic delivery. Also invalidated during holiday-shortened months or months with extreme geopolitical events.',
      related_concepts: ['weekly-profile', 'quarterly-theory'],
      confluence_weight: 1.2,
      timeframes: ['D1', 'W1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_time_profiles.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_time_profiles.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['monthly', 'profile', 'time-cycle', 'distribution', 'accumulation'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-mtf-bridge',
    type: 'concept',
    domain: 'concepts',
    name: 'Multi-Timeframe Bridge',
    description: 'The Multi-Timeframe Bridge refers to the 1-hour and 15-minute timeframes that serve as the critical link between higher timeframe directional bias and lower timeframe trade execution. These intermediate timeframes refine HTF PD arrays into precise, tradeable zones where entries can be staged.',
    content: 'The MTF Bridge solves the gap between knowing where price should go (HTF analysis on D1/H4) and executing a trade (LTF entries on M5/M1). On the H1, traders identify which HTF PD array is currently in play and narrow down the specific zone. On M15, they refine that zone further and begin watching for entry models. Without this bridge, traders either enter too early from HTF alone or take LTF trades with no directional context. The bridge ensures every LTF entry is backed by a clear HTF narrative.',
    metadata: {
      category: 'analysis',
      abbreviation: 'MTF',
      detection_rules: 'On H1, locate the HTF PD array that price is approaching and mark the specific candles that form the zone. Drop to M15 to identify sub-structure within that zone — look for M15 order blocks, FVGs, or breaker blocks nested inside the H1 area of interest.',
      entry_rules: ['Identify HTF bias and draw on liquidity on D1/H4 first', 'Use H1 to narrow which PD array is active and define the zone boundaries', 'Drop to M15 to find the specific entry PD array within the H1 zone before going to LTF for execution'],
      invalidation: 'The bridge fails when H1/M15 structure contradicts HTF bias — for example, if H1 shows strong bullish displacement while D1 bias is bearish. Also invalidated when price skips through the bridge timeframes with violent displacement, leaving no structure to trade from.',
      related_concepts: ['htf-bias', 'ltf-execution'],
      confluence_weight: 1.3,
      timeframes: ['M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_multi_timeframe_analysis.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_multi_timeframe_analysis.md',
      lineStart: 1,
      lineEnd: 45,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['multi-timeframe', 'bridge', 'htf-to-ltf', 'execution', 'analysis'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-narrative',
    type: 'concept',
    domain: 'concepts',
    name: 'Narrative',
    description: 'The Narrative is the coherent story that price action tells about smart money intent and algorithmic delivery. It answers the critical questions: why is price here, why is it moving now, and what conditions would invalidate this thesis. Every trade must have a narrative or it is gambling.',
    content: 'Building a narrative requires synthesizing multiple layers of analysis into a logical story. Start with the HTF draw on liquidity — where is price likely headed this week or month? Then identify the daily bias — is today a buy day or sell day? Next, determine the specific session setup — which killzone will deliver the move, and from which PD array? Finally, define the kill switch — what would prove your narrative wrong? A complete narrative sounds like: "Weekly bias is bullish targeting PWH, today is a retracement day, I expect London to sweep Asian lows into a bullish OB before NY drives higher. If price closes below the H4 bullish OB, narrative is dead."',
    metadata: {
      category: 'analysis',
      abbreviation: 'NAR',
      detection_rules: 'Before any trade, articulate the HTF draw on liquidity, the daily bias, the session expectation, and the invalidation level. If you cannot clearly state all four components, you do not have a narrative and should not trade.',
      entry_rules: ['Define the weekly/monthly draw on liquidity before the session begins', 'Establish daily bias using HTF displacement and PD arrays', 'Identify which killzone and PD array will deliver the setup', 'State the explicit invalidation level — the kill switch for the narrative'],
      invalidation: 'A narrative is invalidated when its kill switch is triggered — typically when price displaces through and closes beyond the key HTF PD array that the entire thesis was built upon. Also invalidated when a higher-impact news event fundamentally changes the institutional order flow.',
      related_concepts: ['daily-bias', 'htf-bias', 'institutional-order-flow'],
      confluence_weight: 2.0,
      timeframes: ['H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_narrative_building.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_narrative_building.md',
      lineStart: 1,
      lineEnd: 55,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['narrative', 'smart-money', 'trade-plan', 'bias', 'institutional-intent'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-ndog',
    type: 'concept',
    domain: 'concepts',
    name: 'New Day Opening Gap',
    description: 'The New Day Opening Gap (NDOG) is the price gap between yesterday\'s closing price and today\'s opening price. This gap represents an imbalance in price delivery that the algorithm often seeks to fill early in the trading day, serving as a daily equilibrium reference point.',
    content: 'NDOG is measured from the final tick of the previous day\'s trading (typically 5:00 PM EST for forex) to the first tick of the new day\'s trading. This gap, even if only a few pips, creates a void in price delivery that acts as a magnet. The algorithm frequently returns to fill or test the NDOG within the first few hours of trading. Traders use it as a reference level similar to the Midnight Open — when price is above the NDOG, intraday bullish bias is supported, and vice versa. NDOG is most relevant on M15 and H1 for intraday execution.',
    metadata: {
      category: 'opening_gap',
      abbreviation: 'NDOG',
      detection_rules: 'Identify the exact closing price of the previous trading day and the opening price of the current day. The gap between these two prices is the NDOG. Mark both levels and the gap zone on M15 or H1 chart. Observe early session price action for interaction with this zone.',
      entry_rules: ['Use NDOG as a reference level — price above supports longs, price below supports shorts', 'Look for price to fill the NDOG gap early in the session as a potential scalp or confirmation', 'Combine NDOG with killzone timing for higher probability setups'],
      invalidation: 'NDOG becomes less relevant once price has filled the gap and moved decisively away from it. Also loses significance in low-volatility environments where the gap is negligibly small (less than 2-3 pips on major pairs).',
      related_concepts: ['nwog', 'opening-gap'],
      confluence_weight: 0.8,
      timeframes: ['M15', 'H1', 'D1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_opening_gaps.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_opening_gaps.md',
      lineStart: 1,
      lineEnd: 40,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['ndog', 'opening-gap', 'daily-gap', 'equilibrium', 'imbalance'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-ninety-minute-cycle',
    type: 'concept',
    domain: 'concepts',
    name: '90-Minute Delivery Cycle',
    description: 'Markets operate in 90-minute price delivery cycles, each containing its own micro Accumulation-Manipulation-Distribution (AMD) pattern. During the New York session, these cycles align to specific windows: 9:30-11:00, 11:00-12:30, 12:30-2:00, and 2:00-3:30 ET.',
    content: 'The 90-minute cycle is the heartbeat of intraday price delivery. Each cycle begins with a micro accumulation (consolidation), followed by manipulation (a false move to grab liquidity), and then distribution (the real move delivering price to its intended target). The first NY cycle (9:30-11:00) is typically the most volatile and sets the directional tone. The second cycle (11:00-12:30) often consolidates or retraces. The third and fourth cycles deliver the afternoon continuation or reversal. Traders should identify which phase of the 90-minute cycle they are in before executing, as entering during manipulation will lead to stop-outs.',
    metadata: {
      category: 'time',
      abbreviation: '90MC',
      detection_rules: 'Divide the NY session into 90-minute blocks starting at 9:30 AM ET. Within each block, identify the accumulation (first 20-30 minutes of tight range), manipulation (false breakout of the range), and distribution (displacement move to the real target). Use M5 or M1 charts to see the micro structure clearly.',
      entry_rules: ['Wait for the manipulation phase to complete before entering in the distribution direction', 'The first 90-minute cycle (9:30-11:00) offers the highest probability setups', 'Avoid entering during the 11:00-12:30 cycle unless there is clear continuation structure', 'Use the 2:00-3:30 cycle for PM session setups aligned with the Silver Bullet window'],
      invalidation: 'The 90-minute cycle is disrupted during major news releases (FOMC, NFP) that compress or eliminate normal time-based delivery. Also less reliable on Fridays and during holiday-thinned markets where institutional participation drops significantly.',
      related_concepts: ['macro-times', 'killzones'],
      confluence_weight: 1.2,
      timeframes: ['M1', 'M5', 'M15'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_macros_detailed.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_macros_detailed.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['90-minute', 'cycle', 'amd', 'intraday', 'time-delivery'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-nmog',
    type: 'concept',
    domain: 'concepts',
    name: 'New Month Opening Gap',
    description: 'The New Month Opening Gap (NMOG) is the price gap between the prior month\'s closing price and the new month\'s opening price. As a higher timeframe opening gap, it serves as a significant equilibrium reference that can influence price delivery throughout the entire month.',
    content: 'NMOG carries substantial weight because it represents the institutional repositioning that occurs between monthly closes and opens. This gap often acts as a magnet during the first week of the new month, with the algorithm seeking to fill or test it before committing to a directional move. When price is trading well above NMOG, the monthly bias leans bullish; when trading well below, bearish. The midpoint of the NMOG (CE — consequent encroachment) is particularly significant as a precision reference level. Traders should mark NMOG on D1 charts at the start of each month and monitor how the first week interacts with it.',
    metadata: {
      category: 'opening_gap',
      abbreviation: 'NMOG',
      detection_rules: 'At the start of a new month, identify the exact closing price of the final trading day of the prior month and the opening price of the first trading day of the new month. The gap between these levels is the NMOG. Mark the high, low, and midpoint (CE) on D1 and H4 charts.',
      entry_rules: ['Use NMOG as a monthly directional reference — sustained trading above favors longs, below favors shorts', 'Watch for price to fill the NMOG during the first week as a potential turning point or continuation signal', 'The consequent encroachment (50%) of the NMOG is a precision level for entries and exits'],
      invalidation: 'NMOG loses relevance once price has decisively cleared and retested the gap zone without returning. Also diminished during months with exceptionally small gaps where the distance is insignificant relative to average monthly range.',
      related_concepts: ['nwog', 'ndog'],
      confluence_weight: 1.3,
      timeframes: ['D1', 'W1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_opening_gaps.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_opening_gaps.md',
      lineStart: 40,
      lineEnd: 80,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['nmog', 'opening-gap', 'monthly-gap', 'htf-reference', 'equilibrium'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-nwog',
    type: 'concept',
    domain: 'concepts',
    name: 'New Week Opening Gap',
    description: 'The New Week Opening Gap (NWOG) is the price gap between Friday\'s closing price and Sunday\'s opening price. This gap acts as a powerful magnet and equilibrium level for the entire trading week, with the algorithm frequently drawing price back to fill or test it.',
    content: 'NWOG is one of the most important weekly reference levels in ICT methodology. The gap forms during the weekend when retail forex markets are closed but institutional positioning still occurs. Sunday\'s open often gaps from Friday\'s close, creating a void the algorithm targets. Price frequently returns to fill the NWOG within the first few days of the week, and the midpoint (CE) of the NWOG acts as a precision equilibrium. Traders should mark the NWOG at Sunday open and use it as a directional filter — trading above it supports bullish weekly bias, below it supports bearish. The NWOG also serves as a potential reversal zone when price returns to it after an initial directional move.',
    metadata: {
      category: 'opening_gap',
      abbreviation: 'NWOG',
      detection_rules: 'At Sunday market open, identify Friday\'s final closing price and Sunday\'s opening price. The space between these two levels is the NWOG. Draw both boundaries and the 50% midpoint (consequent encroachment) on H1 and H4 charts. Track price interaction throughout the week.',
      entry_rules: ['Mark NWOG at Sunday open and establish weekly directional bias relative to it', 'Look for price to fill or test the NWOG early in the week as a potential setup zone', 'Use the CE (50%) of the NWOG as a precision entry or target level', 'Combine with weekly profile expectations — Monday/Tuesday setups that interact with NWOG are highest probability'],
      invalidation: 'NWOG loses significance if the gap is extremely small (under 5 pips on majors) or if a major news event on Monday completely overrides normal algorithmic delivery. The gap reference expires at the end of the trading week when a new NWOG forms.',
      related_concepts: ['ndog', 'sunday-open-gap'],
      confluence_weight: 1.4,
      timeframes: ['H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_opening_gaps.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_opening_gaps.md',
      lineStart: 80,
      lineEnd: 130,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['nwog', 'opening-gap', 'weekly-gap', 'equilibrium', 'sunday-open'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-ny-am-killzone',
    type: 'concept',
    domain: 'concepts',
    name: 'New York AM Killzone',
    description: 'The New York AM Killzone spans 7:00-10:00 AM ET and represents the highest volume, highest probability trading window in the ICT framework. This is the primary execution session where institutional order flow peaks as US equity and bond markets open, creating the most reliable displacement and liquidity sweeps.',
    content: 'The NY AM Killzone is where the majority of ICT-based trades should be executed. The session begins at 7:00 AM ET with the overlap of late London activity and early US pre-market flow. Between 8:30-9:30 AM, major US economic data releases create volatility that the algorithm uses for manipulation. The 9:30 AM equity open introduces massive order flow, and the period from 9:30-10:00 AM often produces the daily high or low. The Silver Bullet window from 10:00-11:00 AM extends the AM session for precision entries. Traders should have their narrative and bias established before this killzone begins and be ready to execute when their model presents.',
    metadata: {
      category: 'time',
      abbreviation: 'NY AM KZ',
      detection_rules: 'Mark 7:00-10:00 AM ET on your chart using vertical lines or session highlighting. Focus on M1 and M5 charts during this window. Watch for liquidity sweeps of Asia and London session highs/lows, displacement candles following 8:30 AM news releases, and the 9:30 AM equity open reaction.',
      entry_rules: ['Have daily bias and narrative established before 7:00 AM ET', 'Watch for Judas Swing between 7:00-8:30 AM that creates the manipulation leg', 'Monitor 8:30 AM economic releases for displacement setups', 'Execute precision entries between 9:30-10:00 AM when equity market opens', 'Use the 10:00-11:00 AM Silver Bullet window for late AM entries'],
      invalidation: 'The NY AM Killzone is less reliable on days with no significant US economic data and low pre-market volume. Avoid this window on the Friday before long weekends and during US bank holidays when institutional participation is minimal.',
      related_concepts: ['killzones', 'ny-pm-killzone'],
      confluence_weight: 1.8,
      timeframes: ['M1', 'M5', 'M15'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_killzones.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_killzones.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['killzone', 'new-york', 'am-session', 'high-probability', 'execution-window'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-ny-pm-killzone',
    type: 'concept',
    domain: 'concepts',
    name: 'New York PM Killzone',
    description: 'The New York PM Killzone spans 1:30-4:00 PM ET and represents the afternoon institutional delivery window. This session either continues the AM move with a second push toward the draw on liquidity or produces a reversal, particularly around the 2:00-3:00 PM Silver Bullet window.',
    content: 'The NY PM Killzone serves as the second major opportunity of the US trading day. After the midday consolidation (11:00 AM-1:30 PM ET), institutional algorithms re-engage for the afternoon push. The PM session often targets liquidity that the AM session left untouched. The PM Silver Bullet from 2:00-3:00 PM ET is a high-probability window for entries, particularly when price has consolidated during lunch and has a clear remaining draw on liquidity. The final hour (3:00-4:00 PM) produces the daily close positioning and can see aggressive moves as institutions finalize daily allocations. Traders should only take PM setups when the AM session has established a clear direction.',
    metadata: {
      category: 'time',
      abbreviation: 'NY PM KZ',
      detection_rules: 'Mark 1:30-4:00 PM ET on your chart. Look for price breaking out of the midday consolidation range after 1:30 PM. The PM Silver Bullet window (2:00-3:00 PM) should show displacement from a PD array. Watch for FVG formation on M5 as the delivery mechanism for the PM move.',
      entry_rules: ['Only trade the PM session if AM established a clear directional bias', 'Watch for breakout of the 11:00 AM-1:30 PM consolidation range as the PM trigger', 'Execute entries during the 2:00-3:00 PM Silver Bullet window on M5 or M1', 'Use the remaining draw on liquidity from the AM session as the PM target'],
      invalidation: 'PM Killzone setups are invalidated when the AM session was choppy and indecisive, providing no clear directional reference. Also avoid PM trades on Fridays as institutional activity drops significantly after 2:00 PM ahead of the weekend.',
      related_concepts: ['killzones', 'ny-am-killzone'],
      confluence_weight: 1.3,
      timeframes: ['M1', 'M5', 'M15'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_killzones.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_killzones.md',
      lineStart: 50,
      lineEnd: 100,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['killzone', 'new-york', 'pm-session', 'silver-bullet', 'afternoon'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-old-high',
    type: 'concept',
    domain: 'concepts',
    name: 'Old High',
    description: 'An Old High refers to a previous swing high on higher timeframes that represents a pool of buy-side liquidity resting above it. These levels are targets where the algorithm draws price to fill resting buy stops and trigger breakout orders before potentially reversing.',
    content: 'Old Highs are among the most important HTF liquidity targets in ICT methodology. Every swing high that has not been traded through contains resting buy stops from traders who placed stops above resistance and breakout orders from traders anticipating continuation. The algorithm is programmed to seek these pools of liquidity as part of its delivery mandate. When price approaches an Old High, traders should determine whether it is being used as an intermediate target (to fuel further downside) or as a real breakout level (to continue higher). The key distinction is whether there is a higher timeframe bullish narrative supporting continuation or a bearish narrative suggesting the sweep is a trap.',
    metadata: {
      category: 'key_level',
      abbreviation: 'OH',
      detection_rules: 'Identify prominent swing highs on H4, D1, and W1 charts that have not been traded through. Mark these levels with horizontal lines. Look for equal highs or double tops that create obvious liquidity pools. The more times a high has been tested without breaking, the more liquidity rests above it.',
      entry_rules: ['In a bearish narrative, look for price to sweep the Old High and then show bearish displacement — enter short on the retracement', 'In a bullish narrative, use the Old High as a draw on liquidity target for long positions', 'After a sweep of an Old High, watch for a bearish FVG or order block to form for short entry confirmation'],
      invalidation: 'An Old High is no longer a liquidity target once price has traded through it and closed above convincingly on the same timeframe or higher. If price sweeps it and immediately continues higher with strong displacement, the bearish reversal thesis is invalidated.',
      related_concepts: ['bsl', 'liquidity', 'swing-high'],
      confluence_weight: 1.4,
      timeframes: ['H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_liquidity_concepts.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_liquidity_concepts.md',
      lineStart: 1,
      lineEnd: 45,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['old-high', 'buy-side-liquidity', 'swing-high', 'htf-target', 'liquidity-pool'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-old-low',
    type: 'concept',
    domain: 'concepts',
    name: 'Old Low',
    description: 'An Old Low refers to a previous swing low on higher timeframes that represents a pool of sell-side liquidity resting below it. These levels are targets where the algorithm draws price to fill resting sell stops and trigger breakdown orders before potentially reversing higher.',
    content: 'Old Lows mirror Old Highs as critical HTF liquidity targets on the sell-side. Every unbroken swing low contains resting sell stops from long positions and breakdown orders from traders expecting continuation lower. The interbank delivery algorithm targets these pools as part of its liquidity-seeking mandate. When price approaches an Old Low, the context determines interpretation: in a bullish narrative, the sweep of the Old Low is a manipulation to accumulate long positions at a discount; in a bearish narrative, the Old Low break is genuine continuation. Traders should combine Old Low analysis with the HTF PD array context to determine whether the sweep is a reversal opportunity or a continuation signal.',
    metadata: {
      category: 'key_level',
      abbreviation: 'OL',
      detection_rules: 'Identify prominent swing lows on H4, D1, and W1 charts that remain unbroken. Mark these levels with horizontal lines. Equal lows or double bottoms create the most obvious liquidity pools. The duration since the low was formed and the number of tests increase the liquidity resting below.',
      entry_rules: ['In a bullish narrative, wait for price to sweep the Old Low and show bullish displacement — enter long on the retracement', 'In a bearish narrative, use the Old Low as a draw on liquidity target for short positions', 'After a sweep of an Old Low, watch for a bullish FVG or order block to form for long entry confirmation'],
      invalidation: 'An Old Low is no longer a liquidity target once price has traded through it and closed below on the same timeframe or higher with sustained momentum. If price sweeps the Old Low and immediately continues lower with displacement, the bullish reversal thesis is dead.',
      related_concepts: ['ssl', 'liquidity', 'swing-low'],
      confluence_weight: 1.4,
      timeframes: ['H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_liquidity_concepts.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_liquidity_concepts.md',
      lineStart: 45,
      lineEnd: 90,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['old-low', 'sell-side-liquidity', 'swing-low', 'htf-target', 'liquidity-pool'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-opening-gap',
    type: 'concept',
    domain: 'concepts',
    name: 'Opening Gap',
    description: 'An Opening Gap is the price gap between a prior session\'s close and the current session\'s open. The algorithm frequently targets opening gaps early in the session to fill the delivery void. CME and NYSE opening gaps are particularly significant due to the volume of institutional activity at those exchanges.',
    content: 'Opening Gaps represent inefficiencies in price delivery that the algorithm is mandated to address. When a market opens at a different price than it closed, there is a void in the continuous auction process that needs to be reconciled. The algorithm often fills these gaps within the first 30-90 minutes of the session. CME gaps (futures market) and NYSE gaps (equity market) carry the most weight because they reflect institutional repositioning. Forex opening gaps at the Sunday open or after holidays are similarly important. Traders can use the tendency to fill opening gaps as a high-probability early-session trade or as a directional filter — if the gap fills quickly and price continues, the direction of the gap fill often indicates the session bias.',
    metadata: {
      category: 'key_level',
      abbreviation: 'OG',
      detection_rules: 'Compare the prior session closing price with the current session opening price on M15 or H1 chart. Any visible gap between these prices is an opening gap. Mark the gap boundaries (prior close and current open) and the midpoint. Monitor the first 30-90 minutes of the session for gap fill behavior.',
      entry_rules: ['Expect the algorithm to target the opening gap early in the session as a potential trade opportunity', 'If price fills the gap and reverses from the prior close level, trade in the reversal direction', 'If price fills the gap and continues through, the direction of continuation often signals session bias', 'Use CME and NYSE opening gaps as the highest priority — they represent the most institutional activity'],
      invalidation: 'Opening gaps lose relevance once they have been completely filled and price has moved away. Gaps that persist unfilled through an entire session may indicate extreme directional conviction and should not be faded. Tiny gaps (under 2-3 ticks on futures) may not have enough significance to trade.',
      related_concepts: ['ndog', 'nwog', 'cme-open'],
      confluence_weight: 1.1,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_macros_detailed.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_macros_detailed.md',
      lineStart: 50,
      lineEnd: 100,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['opening-gap', 'gap-fill', 'cme', 'nyse', 'session-open'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-optimal-trade-days',
    type: 'concept',
    domain: 'concepts',
    name: 'Optimal Trade Days',
    description: 'Optimal Trade Days are Tuesday and Wednesday, which historically deliver the highest probability setups in the ICT framework. Monday and Thursday are acceptable but secondary, while Friday afternoon should generally be avoided due to reduced institutional participation and weekend positioning.',
    content: 'The weekly rhythm of institutional trading creates predictable patterns in which days offer the best opportunities. Monday is often used for accumulation and establishing the weekly range — it can provide setups but often involves more manipulation. Tuesday is the first optimal day, frequently delivering the week\'s directional move away from Monday\'s range. Wednesday continues Tuesday\'s momentum or provides the week\'s reversal, making it equally high probability. Thursday can deliver continuation but also carries the risk of late-week profit-taking. Friday is the worst day to initiate new positions, particularly after noon ET, as institutions reduce exposure ahead of the weekend. Traders should concentrate their highest-conviction trades on Tuesday and Wednesday.',
    metadata: {
      category: 'time',
      abbreviation: 'OTD',
      detection_rules: 'Track your trading results by day of the week to validate this pattern in your own data. On the weekly chart, observe how Monday establishes the range, Tuesday/Wednesday deliver the move, and Thursday/Friday wind down. Focus analysis and trade planning around Tuesday and Wednesday sessions.',
      entry_rules: ['Prioritize Tuesday and Wednesday for trade execution — these are your A+ days', 'Monday trades are acceptable if the weekly bias is clear and a strong setup presents', 'Thursday trades should be taken only if Tuesday/Wednesday established a clear trend with remaining draw on liquidity', 'Avoid initiating new positions on Friday afternoon — close or manage existing trades only'],
      invalidation: 'Optimal trade days can be shifted by holiday schedules (if Monday is a holiday, Tuesday becomes the accumulation day and Wednesday/Thursday become optimal). Also disrupted by mid-week major news events (FOMC on Wednesday) that override normal weekly delivery patterns.',
      related_concepts: ['weekly-profile', 'daily-bias'],
      confluence_weight: 1.0,
      timeframes: ['D1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_time_concepts.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_time_concepts.md',
      lineStart: 40,
      lineEnd: 80,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['optimal-days', 'tuesday', 'wednesday', 'weekly-cycle', 'probability'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-order-flow',
    type: 'concept',
    domain: 'concepts',
    name: 'Order Flow',
    description: 'Order Flow in the ICT context refers to the visible footprint of institutional buying and selling as expressed through price action on lower timeframes. It is identified through displacement candles, fair value gaps, and specific candle structures that reveal whether smart money is aggressively buying or selling.',
    content: 'ICT Order Flow analysis does not rely on traditional order flow tools like footprint charts or DOM. Instead, it reads the algorithm\'s intent through price action signatures on M1 and M5 charts. A series of bullish displacement candles leaving FVGs in their wake signals aggressive institutional buying — bullish order flow. Conversely, bearish displacement candles with sell-side FVGs signal institutional selling. The key is the quality of the displacement: large-bodied candles with minimal wicks that create gaps indicate genuine institutional sponsorship. Order flow also manifests in how price respects or violates PD arrays — when price taps an order block and immediately displaces, it confirms the order flow direction. Traders use order flow to validate their HTF narrative in real-time execution.',
    metadata: {
      category: 'order_flow',
      abbreviation: 'OF',
      detection_rules: 'On M1 or M5 charts, observe the character of directional candles. Bullish order flow: consecutive bullish candles with large bodies, small wicks, and FVGs left behind. Bearish order flow: consecutive bearish candles with the same characteristics. Look for displacement away from PD arrays as confirmation of institutional commitment.',
      entry_rules: ['Confirm HTF bias with LTF order flow before entering — both must align', 'Enter in the direction of order flow when price pulls back to a FVG or order block created by the displacement', 'If order flow contradicts HTF bias, stand aside — do not fight institutional commitment', 'Use the first FVG created by a displacement move as the highest probability entry point'],
      invalidation: 'Order flow direction is invalidated when price breaks the low of the displacement sequence (for bullish OF) or the high (for bearish OF). Also invalidated when subsequent candles fail to maintain the displacement character — shrinking bodies, growing wicks, and overlapping candles indicate order flow is weakening.',
      related_concepts: ['displacement', 'fvg', 'institutional-sponsorship'],
      confluence_weight: 1.5,
      timeframes: ['M1', 'M5', 'M15'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_order_flow.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_order_flow.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['order-flow', 'institutional', 'displacement', 'smart-money', 'price-action'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-pdh-pdl',
    type: 'concept',
    domain: 'concepts',
    name: 'Previous Day High / Previous Day Low',
    description: 'Previous Day High (PDH) and Previous Day Low (PDL) are the high and low of the prior trading day, representing the most immediate and actively targeted liquidity pools. PDH holds buy-side liquidity (resting buy stops) and PDL holds sell-side liquidity (resting sell stops), making them primary targets for the daily algorithm.',
    content: 'PDH and PDL are the most frequently referenced liquidity levels in intraday ICT trading. Every trading day, the algorithm seeks to engage the liquidity resting beyond the previous day\'s range. A sweep of PDH raids buy-side liquidity — if the daily bias is bearish, this sweep becomes the manipulation phase before price drives lower. A sweep of PDL raids sell-side liquidity — if daily bias is bullish, the sweep fuels the reversal higher. The key question each session is: which side will be swept first, and is the sweep a manipulation or a continuation? Traders should mark PDH and PDL before each session begins and use them as primary reference levels for intraday setups. The relationship between price and PDH/PDL often defines whether the day is a trending day or a reversal day.',
    metadata: {
      category: 'key_level',
      abbreviation: 'PDH/PDL',
      detection_rules: 'At the start of each trading day, mark the high and low of the previous completed trading day on M15 or H1 chart. These are your PDH and PDL. Monitor price interaction with these levels during London and NY killzones. A wick through PDH or PDL followed by displacement in the opposite direction signals a liquidity sweep.',
      entry_rules: ['In bearish daily bias, look for price to sweep PDH during London or NY AM and enter short on the rejection', 'In bullish daily bias, look for price to sweep PDL and enter long on the reversal', 'If price sweeps PDH and holds above with displacement, daily bias shifts to bullish continuation', 'Use the midpoint between PDH and PDL as an intraday equilibrium reference'],
      invalidation: 'PDH/PDL levels expire when the current day completes and new PDH/PDL levels are established. A PDH sweep is invalidated as a reversal signal if price closes above it on H1 or higher with strong bullish structure. The same applies inversely for PDL.',
      related_concepts: ['bsl', 'ssl', 'liquidity'],
      confluence_weight: 1.5,
      timeframes: ['M15', 'H1', 'D1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_key_levels.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_key_levels.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['pdh', 'pdl', 'previous-day', 'liquidity', 'daily-range'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-pmh-pml',
    type: 'concept',
    domain: 'concepts',
    name: 'Previous Month High / Previous Month Low',
    description: 'Previous Month High (PMH) and Previous Month Low (PML) represent the range extremes of the prior calendar month. These are major higher timeframe liquidity pools that significantly influence monthly and weekly directional bias, as the algorithm often targets one side or the other to fuel the current month\'s primary move.',
    content: 'PMH and PML are among the most powerful HTF reference levels available. The monthly range contains enormous resting liquidity — buy stops above PMH from monthly short positions and sell stops below PML from monthly long positions. The current month\'s directional bias is frequently determined by which side the algorithm targets first. If price sweeps PML early in the month and reverses, it signals a bullish month targeting PMH or higher. If PMH is swept and rejected, a bearish month targeting PML or lower is indicated. Traders should mark PMH and PML at the start of each month on D1 and W1 charts. These levels also provide context for weekly and daily setups — any intraday trade should ultimately be aligned with the monthly draw toward PMH or PML.',
    metadata: {
      category: 'key_level',
      abbreviation: 'PMH/PML',
      detection_rules: 'At the start of each new month, mark the high and low of the previous completed calendar month on D1 and W1 charts. These are PMH and PML. Track how the current month\'s first week interacts with these levels. A clear rejection from one level often establishes the monthly bias toward the opposite level.',
      entry_rules: ['Use PMH/PML to establish monthly directional bias — which side is the algorithm targeting?', 'In weekly setups, align your draw on liquidity with the monthly target (PMH or PML)', 'A sweep of PML with bullish displacement on D1 is a high-probability long entry for targeting PMH', 'A sweep of PMH with bearish displacement on D1 is a high-probability short entry for targeting PML'],
      invalidation: 'PMH/PML levels expire when the current month completes and new levels are established. A sweep of PMH is invalidated as a reversal signal if the monthly candle closes above PMH, indicating genuine breakout rather than liquidity grab. Same logic applies inversely for PML.',
      related_concepts: ['bsl', 'ssl', 'liquidity'],
      confluence_weight: 1.7,
      timeframes: ['D1', 'W1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_key_levels.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_key_levels.md',
      lineStart: 50,
      lineEnd: 100,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['pmh', 'pml', 'previous-month', 'htf-liquidity', 'monthly-bias'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-premium-array',
    type: 'concept',
    domain: 'concepts',
    name: 'Premium Array',
    description: 'Premium Arrays are PD (Price Delivery) arrays located in the premium zone — above the 50% equilibrium of the current dealing range. These include bearish order blocks, SIBIs (Sell-Side Imbalance Buy-Side Inefficiency), and bearish breaker blocks. In a bearish bias, these are the zones from which to sell.',
    content: 'Premium Arrays are where smart money distributes (sells) positions at a premium price. When the dealing range equilibrium is calculated (50% of the swing from low to high), any PD array above that midpoint is considered a premium array. The hierarchy of premium arrays from most to least significant is: bearish order block, bearish breaker block, SIBI (fair value gap), and mitigation block. In a bearish narrative, traders look for price to retrace up into a premium array and then show displacement lower for a short entry. The deeper into premium territory the array sits, the better the value for a short entry. Combining a premium array with specific Fibonacci levels (0.705 or 0.79 OTE zone) creates an optimal entry point with favorable risk-to-reward.',
    metadata: {
      category: 'valuation',
      abbreviation: 'PA',
      detection_rules: 'Calculate the 50% level of the current dealing range (the swing from a significant low to a significant high). Any PD array above this midpoint is a premium array. Identify bearish order blocks, SIBIs, and bearish breakers above the equilibrium. The best premium arrays coincide with the 0.705-0.79 Fibonacci retracement zone.',
      entry_rules: ['In bearish bias, wait for price to retrace into a premium array before looking for short entries', 'Prioritize bearish order blocks over other premium array types for entries', 'Enter short when price reaches a premium array and shows M1/M5 bearish displacement', 'The optimal entry is a premium array that overlaps with the OTE (Optimal Trade Entry) Fibonacci zone'],
      invalidation: 'A premium array is invalidated when price trades through it with strong bullish displacement and closes above it on the timeframe it was formed. If the entire dealing range is broken to the upside with a new higher high, all premium arrays from the old range are voided.',
      related_concepts: ['premium-discount', 'sibi', 'order-block', 'breaker-block'],
      confluence_weight: 1.5,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_premium_discount.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_premium_discount.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['premium', 'pd-array', 'sell-zone', 'bearish', 'valuation'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-propulsion-block',
    type: 'concept',
    domain: 'concepts',
    name: 'Propulsion Block',
    description: 'A Propulsion Block is a compound PD array where an order block contains a fair value gap (FVG) embedded within it. This overlap of two powerful PD arrays creates an amplified zone that launches price with extra momentum, as both the order block\'s institutional interest and the FVG\'s inefficiency converge.',
    content: 'The Propulsion Block is one of the most powerful single-candle or multi-candle formations in the ICT framework. When an order block forms and within its range there exists a fair value gap, the two PD arrays compound their effect. The order block provides the institutional footprint (this is where smart money placed orders), while the FVG provides the delivery void (the algorithm must return to fill this inefficiency). When price returns to a propulsion block, it encounters both the magnetic pull of the FVG and the institutional defense of the order block simultaneously. This creates an explosive reaction — hence the name "propulsion." Traders should look for propulsion blocks on M5 and M15 for precision entries, as they offer the tightest stop placement with the most explosive price reactions.',
    metadata: {
      category: 'pd_array',
      abbreviation: 'PB',
      detection_rules: 'Identify an order block on M5 or M15. Within the body of that order block, look for a fair value gap (three-candle formation where the wicks of candles 1 and 3 do not overlap). If the FVG exists within the order block\'s range, you have a propulsion block. Mark the overlapping zone as the entry area.',
      entry_rules: ['Enter when price returns to the propulsion block zone — the overlap of OB and FVG', 'Place stops beyond the order block boundary for the tightest risk', 'Expect an aggressive displacement reaction from the propulsion block', 'Higher timeframe propulsion blocks (H1) are more significant but less common — prioritize these when they appear'],
      invalidation: 'A propulsion block is invalidated when price trades completely through it and closes beyond the order block boundary on the formation timeframe. If price enters the propulsion block and fails to produce displacement within 2-3 candles, the setup is weakening and may fail.',
      related_concepts: ['order-block', 'fvg'],
      confluence_weight: 1.6,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_pd_arrays.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_pd_arrays.md',
      lineStart: 1,
      lineEnd: 45,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['propulsion-block', 'compound-pd-array', 'order-block', 'fvg', 'momentum'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-pwh-pwl',
    type: 'concept',
    domain: 'concepts',
    name: 'Previous Week High / Previous Week Low',
    description: 'Previous Week High (PWH) and Previous Week Low (PWL) are the range extremes of the prior trading week. These are significant HTF liquidity pools that frequently serve as the draw on liquidity for the current week, with the algorithm targeting one or both sides to fuel the weekly directional move.',
    content: 'PWH and PWL sit in the sweet spot between daily and monthly reference levels, making them the most actionable HTF liquidity targets for swing and intraday traders alike. The previous week\'s range accumulates substantial resting liquidity — buy stops above PWH and sell stops below PWL. The current week\'s primary objective is often to raid one of these levels. A common weekly pattern is for Monday to consolidate near the prior week\'s range, Tuesday to sweep one side (PWH or PWL) as manipulation, and Wednesday/Thursday to drive toward the opposite side as the real move. Traders should mark PWH and PWL at the start of each week on H4 and D1 charts. The weekly bias is largely determined by which level the algorithm targets first and whether the sweep leads to reversal or continuation.',
    metadata: {
      category: 'key_level',
      abbreviation: 'PWH/PWL',
      detection_rules: 'At the start of each new trading week (Sunday open), mark the high and low of the previous completed trading week on H4 and D1 charts. These are PWH and PWL. Monitor how Monday and Tuesday interact with these levels. A sweep followed by displacement in the opposite direction reveals the weekly draw on liquidity.',
      entry_rules: ['Use PWH/PWL to frame the weekly draw on liquidity — which side is the target?', 'In bullish weekly bias, look for early-week sweep of PWL as a long entry opportunity', 'In bearish weekly bias, look for early-week sweep of PWH as a short entry opportunity', 'Target the opposite level after a confirmed sweep — e.g., short from PWH sweep targeting PWL', 'Combine with optimal trade days — Tuesday/Wednesday sweeps of PWH/PWL are highest probability'],
      invalidation: 'PWH/PWL expire when the current week completes and new levels are established. A PWH sweep is invalidated as a reversal if the weekly candle closes above PWH with strong bullish structure. If both PWH and PWL are swept within the same week, the market is in expansion mode and standard weekly profile expectations are disrupted.',
      related_concepts: ['bsl', 'ssl', 'liquidity', 'draw-on-liquidity'],
      confluence_weight: 1.6,
      timeframes: ['H4', 'D1', 'W1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_key_levels.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_key_levels.md',
      lineStart: 100,
      lineEnd: 150,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['pwh', 'pwl', 'previous-week', 'htf-liquidity', 'weekly-range', 'draw-on-liquidity'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-quarterly-theory',
    type: 'concept',
    domain: 'concepts',
    name: 'Quarterly Theory',
    description: 'ICT Quarterly Theory describes how markets undergo significant directional shifts at calendar quarter boundaries. Each quarter — Q1 (Jan-Mar), Q2 (Apr-Jun), Q3 (Jul-Sep), Q4 (Oct-Dec) — has its own character and tendency, with major reversals and trend initiations occurring at or near these transitions.',
    content: 'Quarterly Theory provides the highest timeframe context for understanding market cycles. Each quarter operates as a macro AMD (Accumulation-Manipulation-Distribution) cycle. Q1 often sets the annual direction with institutions deploying new capital allocations. Q2 typically continues Q1\'s trend or produces the year\'s first major correction. Q3 (summer months) tends to be more volatile and less directional, often producing false moves. Q4 is the year\'s final push, with institutions closing annual books and producing strong trending moves. The transition between quarters is when the most significant shifts occur — the last two weeks of one quarter and the first two weeks of the next are critical windows for trend reversals. Traders should use quarterly context to frame their monthly and weekly expectations, understanding that fighting the quarterly trend is extremely difficult.',
    metadata: {
      category: 'time_profile',
      abbreviation: 'QT',
      detection_rules: 'Mark quarter boundaries on W1 and MN charts: January 1, April 1, July 1, October 1. Observe price behavior in the two weeks before and after each boundary for signs of directional shifts. Compare the current quarter\'s trend to the previous quarter\'s to identify continuation or reversal patterns. Track how each quarter\'s first month establishes the directional bias.',
      entry_rules: ['Align monthly and weekly bias with the current quarterly direction for highest probability trades', 'Watch for major reversals during the quarter transition windows (last 2 weeks of prior quarter, first 2 weeks of new quarter)', 'Q1 and Q4 tend to produce the strongest trends — be most aggressive during these quarters', 'Q3 requires more caution due to lower institutional participation (summer) and increased choppiness'],
      invalidation: 'Quarterly Theory is a directional guideline, not a rigid rule — exceptional events (central bank policy shifts, geopolitical crises, pandemics) can override quarterly tendencies at any time. If the first month of a quarter produces behavior contradicting the expected quarterly character, re-evaluate the thesis rather than forcing a narrative.',
      related_concepts: ['seasonal-tendencies', 'monthly-profile'],
      confluence_weight: 1.5,
      timeframes: ['W1', 'MN'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_quarterly_theory.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_quarterly_theory.md',
      lineStart: 1,
      lineEnd: 60,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['quarterly', 'seasonal', 'macro-cycle', 'q1', 'q2', 'q3', 'q4', 'annual-bias'],
    createdAt: timestamp,
    updatedAt: timestamp
  },

  // ===== EXPANDED ICT CONCEPTS - Advanced & Intermarket =====
  {
    id: 'concept-re-accumulation',
    type: 'concept',
    domain: 'concepts',
    name: 'Re-Accumulation',
    description: 'A continuation pattern that occurs within an established uptrend where price pauses and consolidates before launching another expansion leg higher. During re-accumulation, smart money adds to existing long positions while building fresh liquidity pools above and below the consolidation range. This phase often mimics a distribution pattern to trap shorts before the next bullish displacement.',
    content: 'Re-accumulation forms as a mid-trend pause where institutions absorb selling pressure and build additional long inventory without disrupting the prevailing bullish structure. The consolidation range creates equal highs (BSL) and equal lows (SSL) that will be swept before continuation. Traders should identify re-accumulation by observing a series of higher lows maintained within the consolidation while bullish order flow remains intact on higher timeframes. The breakout from re-accumulation typically features strong displacement with FVG creation, confirming the continuation of the original uptrend.',
    metadata: {
      category: 'market_phase',
      abbreviation: 'RA',
      detection_rules: 'Identify a consolidation range forming after a clear bullish expansion leg. Price should maintain higher lows or equal lows within the range while the HTF trend remains bullish. Volume often decreases during the consolidation phase. Look for liquidity pools forming at range extremes before the next expansion.',
      entry_rules: ['Wait for SSL sweep within the consolidation range followed by bullish displacement', 'Enter on the first pullback into a bullish FVG or OB created by the displacement out of the range', 'Confirm HTF PD array support beneath the consolidation before entering'],
      invalidation: 'Invalidated when price breaks below the consolidation range low with displacement and closes below the original expansion starting point, indicating the trend has reversed rather than pausing.',
      related_concepts: ['accumulation', 'expansion'],
      confluence_weight: 1.2,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_core_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_core_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['market-phase', 'continuation', 'accumulation', 'consolidation'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-re-distribution',
    type: 'concept',
    domain: 'concepts',
    name: 'Re-Distribution',
    description: 'A continuation pattern within a downtrend where price pauses and consolidates before displacing into another bearish expansion leg. Smart money uses re-distribution to add to short positions and build fresh liquidity above and below the range. This phase often mimics accumulation to trap longs before the next sell-off.',
    content: 'Re-distribution forms when institutions need to build additional short inventory during a prevailing downtrend without reversing the overall bearish structure. The consolidation creates BSL and SSL pools at the range extremes that will be engineered before continuation lower. Traders should look for lower highs being maintained within the consolidation while bearish order flow persists on higher timeframes. The breakdown from re-distribution is marked by aggressive bearish displacement with FVG creation, signaling the next leg of selling has begun.',
    metadata: {
      category: 'market_phase',
      abbreviation: 'RD',
      detection_rules: 'Spot a consolidation range forming after a clear bearish expansion leg. Price should maintain lower highs or equal highs within the range while the HTF trend remains bearish. Look for liquidity building at both extremes of the consolidation. A BSL sweep followed by bearish displacement confirms the re-distribution is complete.',
      entry_rules: ['Wait for BSL sweep within the consolidation followed by bearish displacement', 'Enter on the first pullback into a bearish FVG or OB created by the displacement out of the range', 'Confirm HTF PD array resistance above the consolidation before entering short'],
      invalidation: 'Invalidated when price breaks above the consolidation range high with displacement and closes above the original bearish expansion starting point, signaling trend reversal rather than continuation.',
      related_concepts: ['distribution', 'expansion'],
      confluence_weight: 1.2,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_core_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_core_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['market-phase', 'continuation', 'distribution', 'consolidation'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-reclaimed-order-block',
    type: 'concept',
    domain: 'concepts',
    name: 'Reclaimed Order Block',
    description: 'An order block that was initially violated (becoming a breaker block) but then reclaimed by price returning through it with displacement in the original direction. This reclamation restores the OB validity and often represents an even stronger institutional level because the violation swept liquidity from traders who faded the original OB. The reclaimed OB carries renewed institutional significance.',
    content: 'A reclaimed order block forms through a three-phase process: first, an OB is established; second, price violates the OB turning it into a breaker; third, price aggressively reclaims the level with displacement, restoring its original directional bias. The reclamation is significant because the initial violation triggered stops from traders who relied on the OB, creating a liquidity event that institutions exploit. When price returns to the reclaimed OB for a retest, it becomes a high-probability entry because the weak hands have already been flushed. Traders should look for displacement candles and FVG creation during the reclamation phase as confirmation of renewed institutional commitment.',
    metadata: {
      category: 'pd_array',
      abbreviation: 'ROB',
      detection_rules: 'Identify a previous order block that was broken through with displacement, turning it into a breaker. Then observe price reversing back through the same zone with strong displacement in the original OB direction. The zone is now a reclaimed OB. Confirmation comes from FVG creation during the reclamation move and price respecting the level on subsequent retests.',
      entry_rules: ['Wait for the reclamation displacement to complete with candle body closure beyond the original OB', 'Enter on the first pullback to the reclaimed OB zone after displacement', 'Use the midpoint of the reclaimed OB as the optimal entry with stop beyond the OB extreme'],
      invalidation: 'Invalidated if price violates the reclaimed OB a second time with displacement, as this indicates the level has lost institutional backing and the original trend reversal is dominant.',
      related_concepts: ['order-block', 'breaker-block'],
      confluence_weight: 1.6,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_advanced_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_advanced_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['pd-array', 'order-block', 'breaker', 'reclaimed', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-retracement',
    type: 'concept',
    domain: 'concepts',
    name: 'Retracement',
    description: 'A pullback within an established trend where price returns to a premium or discount PD array before continuing in the direction of the prevailing trend. Retracements are where ICT traders find their entries, as they represent institutional re-entry points where smart money adds to positions at favorable prices. The depth and quality of the retracement determines the probability of continuation.',
    content: 'Retracements are the heartbeat of ICT trading methodology — they represent the return to value within a trending market where institutional orders are waiting. In a bullish trend, price retraces into discount PD arrays (OBs, FVGs, breakers) between the 62-79% Fibonacci zone known as the Optimal Trade Entry. In a bearish trend, price retraces into premium PD arrays. The quality of a retracement is measured by whether it reaches a significant PD array, occurs during a killzone, and respects the higher timeframe directional bias. Shallow retracements that fail to reach the OTE zone often signal exhaustion, while deep retracements that sweep previous swing points create the highest probability setups.',
    metadata: {
      category: 'price_action',
      abbreviation: 'RET',
      detection_rules: 'After an impulsive displacement move, wait for price to retrace against the direction of the move. Measure the retracement depth using Fibonacci from the swing low to swing high (bullish) or swing high to swing low (bearish). Look for the retracement to reach the 50-79% zone where PD arrays like FVGs, OBs, or breakers are located. Confirm with a shift in lower timeframe structure before entering.',
      entry_rules: ['Enter at OTE zone (62-79%) when a PD array aligns at that level', 'Wait for LTF market structure shift confirming the retracement is complete', 'Use the PD array within the retracement zone as the specific entry trigger'],
      invalidation: 'Invalidated when the retracement exceeds the origin of the impulsive move, breaking the swing structure and indicating a potential reversal rather than a pullback.',
      related_concepts: ['ote', 'fvg', 'order-block'],
      confluence_weight: 1.3,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_core_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_core_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['price-action', 'entry', 'pullback', 'ote', 'fibonacci'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-reversal',
    type: 'concept',
    domain: 'concepts',
    name: 'Reversal',
    description: 'A confirmed change in trend direction that occurs after a liquidity sweep of a key high or low followed by a Market Structure Shift (MSS) or Change of Character (CHoCH). ICT reversals are not random — they are engineered events where smart money sweeps liquidity, fills institutional orders, and then displaces price in the new direction. True reversals require both liquidity purge and structural confirmation.',
    content: 'An ICT reversal is a deliberate institutional process that unfolds in three stages: first, price sweeps a significant liquidity pool (BSL for bearish reversal, SSL for bullish reversal); second, displacement occurs in the opposite direction creating FVGs and breaking short-term structure; third, an MSS or CHoCH confirms the new directional bias. The strength of a reversal is determined by the significance of the liquidity swept, the violence of the displacement, and the timeframe on which the structure shift occurs. Higher timeframe reversals (H4, D1) carry more weight and often begin with lower timeframe reversals (M5, M15) that cascade upward. Traders should align reversal entries with HTF PD arrays and killzone timing for maximum probability.',
    metadata: {
      category: 'price_action',
      abbreviation: 'REV',
      detection_rules: 'Look for price sweeping a significant high or low (BSL/SSL) followed immediately by strong displacement in the opposite direction. Confirm with a break of the most recent swing structure (MSS) or a shift in the character of price delivery (CHoCH). The displacement should create at least one FVG and ideally form a new order block at the reversal point.',
      entry_rules: ['Wait for liquidity sweep + displacement + MSS/CHoCH confirmation before entering', 'Enter on the first retracement into a PD array (FVG or OB) created by the displacement', 'Ensure the reversal aligns with HTF bias and occurs during a killzone for maximum probability'],
      invalidation: 'Invalidated if price reclaims the swept liquidity level with displacement and re-establishes the prior trend structure, indicating the sweep was a continuation pattern rather than a reversal.',
      related_concepts: ['sms-mss', 'choch', 'liquidity-sweep'],
      confluence_weight: 1.8,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_core_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_core_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['price-action', 'reversal', 'structure-shift', 'liquidity-sweep', 'trend-change'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-risk-on-risk-off',
    type: 'concept',
    domain: 'concepts',
    name: 'Risk-On / Risk-Off',
    description: 'A macro intermarket framework describing how capital flows shift between risk assets and safe havens based on institutional sentiment. Risk-on environments see money flowing into equities, commodities, and high-yield currencies (AUD, NZD, CAD) while risk-off sees flows into bonds, USD, CHF, JPY, and gold. Understanding the current regime is critical for pair selection and directional bias.',
    content: 'Risk-on/risk-off dynamics are the macro backdrop that ICT traders use to filter which pairs and directions to trade. In risk-on conditions, equities rally, bond yields rise, the VIX drops, and commodity currencies strengthen against safe havens — this favors buying AUDJPY, NZDUSD, and selling USDCAD. In risk-off conditions, equities sell off, bonds rally (yields drop), VIX spikes, and safe haven currencies strengthen — this favors selling AUDJPY, buying USDJPY, and gold longs. Traders should assess the risk regime on the daily and weekly timeframes before the trading week begins, as fighting the macro flow significantly reduces win rates. The transition between regimes often occurs at HTF PD arrays on equity indices and bond charts.',
    metadata: {
      category: 'intermarket',
      abbreviation: 'RORO',
      detection_rules: 'Monitor S&P 500/Nasdaq direction, US 10Y yield direction, VIX levels, DXY direction, and safe haven currency strength. Risk-on: equities up, yields up, VIX low/falling, USD mixed, commodity currencies strong. Risk-off: equities down, yields down, VIX high/rising, USD strong, JPY/CHF strong. Use daily correlation checks across these instruments.',
      entry_rules: ['Identify the current risk regime before selecting trading pairs for the week', 'In risk-on, favor long commodity currencies and short safe havens', 'In risk-off, favor long safe havens and short commodity/high-beta currencies'],
      invalidation: 'The regime assessment is invalidated when correlations break down significantly — for example, equities rallying while safe havens also strengthen, indicating mixed institutional positioning and uncertainty.',
      related_concepts: ['intermarket-analysis', 'bond-yield-correlation'],
      confluence_weight: 1.0,
      timeframes: ['D1', 'W1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_intermarket_analysis'
    },
    sources: [{
      filePath: 'knowledge_base/ict_intermarket_analysis',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['intermarket', 'macro', 'risk-sentiment', 'pair-selection', 'correlation'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-seasonal-tendencies',
    type: 'concept',
    domain: 'concepts',
    name: 'Seasonal Tendencies',
    description: 'Recurring seasonal patterns in financial markets driven by institutional fund flows, fiscal calendars, and portfolio rebalancing cycles. The US Dollar Index tends to weaken in January as new fiscal year flows begin, strengthen through Q3, and weaken again into year-end. Gold typically rallies in Q1 and Q4. Equities show strength November through April (sell in May). These tendencies provide a macro directional filter.',
    content: 'Seasonal tendencies are institutional fingerprints left by recurring capital allocation cycles that repeat year after year. ICT teaches that understanding these macro rhythms gives traders an edge in anticipating which direction the quarterly and monthly draws are likely to target. Key seasonal patterns include: DXY weakness in January (new year flows), equity strength January-April, Dollar strength July-September (Q3 repatriation), gold weakness in Q2-Q3, and year-end portfolio rebalancing creating volatility in December. These tendencies should be combined with IPDA quarterly shifts and monthly profiles to build a comprehensive macro outlook. Seasonal analysis is not a standalone signal but a powerful confluence filter that tilts probabilities in the direction of historical institutional behavior.',
    metadata: {
      category: 'time_profile',
      abbreviation: 'SEAS',
      detection_rules: 'Compare current price positioning against historical seasonal averages for the instrument being traded. Identify which quarter and month the market is in and reference the typical seasonal bias. Check if current price action aligns with or diverges from the seasonal tendency. Divergence from seasonal norms often indicates an exceptionally strong counter-trend institutional narrative.',
      entry_rules: ['Use seasonal bias as a macro filter — trade in the seasonal direction when other confluences align', 'Increase position sizing when seasonal tendency, IPDA quarterly shift, and HTF PD arrays all agree', 'Be cautious taking trades against the prevailing seasonal tendency without exceptional confluence'],
      invalidation: 'Seasonal tendencies are probabilistic, not deterministic — they are invalidated in individual instances when central bank policy shifts, geopolitical events, or extreme risk regime changes override normal institutional flow patterns.',
      related_concepts: ['quarterly-theory', 'monthly-profile'],
      confluence_weight: 0.7,
      timeframes: ['W1', 'MN'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_time_and_price'
    },
    sources: [{
      filePath: 'knowledge_base/ict_time_and_price',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['time-profile', 'seasonal', 'macro', 'quarterly', 'institutional-flows'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-sell-program',
    type: 'concept',
    domain: 'concepts',
    name: 'Sell Program',
    description: 'An institutional selling algorithm that drives price lower through a coordinated sequence of seeking premium PD arrays, sweeping buy-side liquidity, and displacing price downward toward sell-side liquidity targets. Sell programs are the bearish counterpart to buy programs and represent how institutional algorithms systematically deliver price from premium to discount levels within the IPDA framework.',
    content: 'A sell program is the algorithmic engine behind bearish price delivery. When the IPDA has determined that a lower price target must be reached, the sell program executes by: first, allowing price to retrace into premium PD arrays (bearish OBs, bearish FVGs, breakers) to accumulate short orders; second, engineering sweeps of BSL to trigger buy stops and fill sell orders against that liquidity; third, displacing price aggressively downward creating bearish FVGs (SIBIs) and targeting SSL pools below. Traders can identify an active sell program by observing consistent rejection from premium arrays, bearish displacement creating SIBIs, and a pattern of BSL sweeps followed by new lows. Trading in alignment with a sell program means selling retracements into premium PD arrays during killzones and targeting the next SSL pool.',
    metadata: {
      category: 'algorithmic_theory',
      abbreviation: 'SP',
      detection_rules: 'Identify consistent bearish displacement candles creating SIBIs (bearish FVGs). Observe price repeatedly failing at premium PD arrays and making new lows. Look for a pattern of BSL sweeps followed by aggressive selling. The HTF bias should be bearish with D1 or H4 structure showing lower highs and lower lows. Check that price is being delivered from a premium PD array toward a discount SSL target.',
      entry_rules: ['Sell retracements into premium PD arrays (bearish OBs, SIBIs) during London or NY killzones', 'Enter after BSL sweep followed by bearish displacement and LTF MSS', 'Target the next significant SSL pool identified on the HTF'],
      invalidation: 'The sell program is invalidated when price breaks above the most recent swing high that initiated the current bearish leg with displacement, or when an HTF bullish MSS occurs indicating the IPDA has shifted to a buy program.',
      related_concepts: ['buy-program', 'ipda', 'bsl', 'ssl'],
      confluence_weight: 1.5,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_algorithmic_theory'
    },
    sources: [{
      filePath: 'knowledge_base/ict_algorithmic_theory',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['algorithmic', 'institutional', 'bearish', 'ipda', 'price-delivery'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-sibi',
    type: 'concept',
    domain: 'concepts',
    name: 'Sell Side Imbalance, Buy Side Inefficiency (SIBI)',
    description: 'A bearish fair value gap created by aggressive downward displacement where the low of candle 1 and the high of candle 3 do not overlap, leaving a gap filled only by the body of candle 2. SIBI represents sell-side imbalance (heavy selling) and buy-side inefficiency (insufficient buying), creating a premium PD array that acts as resistance when price retraces to it in bearish conditions.',
    content: 'SIBI is the formal ICT term for a bearish FVG and describes the precise market microstructure behind the gap: sell-side orders overwhelmed buy-side liquidity so aggressively that price displaced without allowing fair two-sided price discovery. The gap between candle 1 low and candle 3 high represents the inefficiency zone. When price retraces into a SIBI, it encounters the remaining unfilled institutional sell orders, causing rejection and continuation lower. The most effective SIBIs form during killzones with strong displacement (large candle 2 body), align with HTF bearish PD arrays, and sit within the premium zone of the current dealing range. Traders should mark the SIBI from candle 1 low to candle 3 high, with the midpoint (consequent encroachment) serving as the decision level — price closing above CE suggests the SIBI is failing.',
    metadata: {
      category: 'pd_array',
      abbreviation: 'SIBI',
      detection_rules: 'Identify three consecutive candles where the low of candle 1 is higher than the high of candle 3, creating a visible gap. Candle 2 should be a strong bearish displacement candle with a large body. The gap zone runs from candle 1 low (top) to candle 3 high (bottom). Strongest SIBIs form in premium pricing during active killzones with institutional sponsorship confirmed by volume and displacement magnitude.',
      entry_rules: ['Enter short when price retraces into the SIBI zone and shows LTF bearish rejection', 'Use the midpoint (consequent encroachment) as the optimal entry level within the SIBI', 'Place stop loss above candle 1 low (top of SIBI) with target at the next SSL pool'],
      invalidation: 'Invalidated when price trades through and closes above the full SIBI range (above candle 1 low) with displacement, or when price closes above the consequent encroachment on the timeframe of formation, indicating buyers have overcome the sell-side imbalance.',
      related_concepts: ['fvg', 'bisi', 'displacement'],
      confluence_weight: 1.4,
      timeframes: ['M1', 'M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_pd_arrays'
    },
    sources: [{
      filePath: 'knowledge_base/ict_pd_arrays',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['pd-array', 'fvg', 'bearish', 'imbalance', 'inefficiency'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-smart-money',
    type: 'concept',
    domain: 'concepts',
    name: 'Smart Money',
    description: 'The institutional participants — central banks, hedge funds, investment banks, and market makers — who possess the capital, information, and algorithmic infrastructure to move price and engineer liquidity events. Smart money is the driving force behind displacement, structure breaks, and liquidity sweeps. Understanding smart money behavior is the foundational principle of ICT methodology.',
    content: 'Smart money refers to the institutional entities whose large order flow creates the observable patterns that ICT methodology is built upon. These participants do not chase price — they engineer it. They accumulate positions during consolidation by building liquidity pools, sweep those pools to fill orders at optimal prices, and then displace price toward their profit objectives. Every ICT concept — from order blocks to FVGs to market structure shifts — is a footprint of smart money activity. The key insight is that retail traders consistently provide the liquidity that smart money requires: retail stops become smart money entries, retail breakout entries become smart money exits. By learning to read smart money footprints through PD arrays, displacement, and time-based patterns, traders can align with institutional order flow rather than providing liquidity to it.',
    metadata: {
      category: 'foundation',
      abbreviation: 'SM',
      detection_rules: 'Smart money activity is detected through its footprints: displacement candles with large bodies and minimal wicks, fair value gaps created by aggressive order flow, order blocks at swing points where accumulation/distribution occurred, liquidity sweeps engineered to trigger retail stops, and price delivery that respects PD arrays on higher timeframes. Look for the narrative: accumulation, manipulation (liquidity sweep), then distribution (displacement).',
      entry_rules: ['Never trade against confirmed smart money direction — align with the institutional order flow', 'Enter where smart money is entering: at PD arrays after liquidity sweeps during killzones', 'Use LTF smart money footprints (displacement, FVGs, MSS) to time entries aligned with HTF smart money bias'],
      invalidation: 'Smart money concepts are invalidated on individual setups when the expected institutional behavior fails to materialize — for example, when a PD array fails to hold and displacement occurs against the expected direction, indicating smart money has shifted its program.',
      related_concepts: ['institutional-sponsorship', 'order-flow'],
      confluence_weight: 1.0,
      timeframes: ['M1', 'M5', 'M15', 'H1', 'H4', 'D1', 'W1', 'MN'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_core_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_core_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['foundation', 'institutional', 'smart-money', 'market-maker', 'order-flow'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-standard-deviation',
    type: 'concept',
    domain: 'concepts',
    name: 'Standard Deviation',
    description: 'A measurement tool used to project price expansion targets from defined ranges such as the Central Bank Dealer Range (CBDR) or Asian range. Standard deviation levels at ±1, ±2, and ±2.5 SD from the range midpoint or boundary provide institutional price targets for killzone expansions. These levels act as draw-on-liquidity objectives during London and New York sessions.',
    content: 'Standard deviation projections translate consolidation range data into actionable expansion targets. The calculation takes the CBDR or Asian range height and projects multiples of that range above and below. A ±1 SD move is considered a normal expansion, ±2 SD represents an extended move typically seen during high-impact news or strong trend days, and ±2.5 SD marks extreme expansion usually reserved for FOMC, NFP, or major catalytic events. Traders use SD levels as profit targets: for example, if the CBDR is 30 pips and London expands bullish, the +1 SD target is 30 pips above CBDR high, +2 SD is 60 pips above. The most common approach is to take partial profits at ±1 SD and let runners target ±2 SD. These levels often align with HTF PD arrays, providing confluence for where price is likely to reverse or stall.',
    metadata: {
      category: 'measurement',
      abbreviation: 'SD',
      detection_rules: 'Calculate the CBDR or Asian range height in pips. Project ±1, ±2, and ±2.5 multiples of this range from the range high and low. Mark these levels on the chart before the London or New York killzone begins. Observe which SD level aligns with HTF PD arrays or liquidity pools for the highest probability target. Use the initial directional move in London to determine which side (positive or negative SD) to focus on.',
      entry_rules: ['Use SD levels as profit targets rather than entry triggers', 'Take partial profits at ±1 SD and trail remaining position toward ±2 SD', 'If a ±1 SD level aligns with an HTF PD array, expect a reaction and consider full profit-taking'],
      invalidation: 'SD projections are invalidated when the underlying range (CBDR/Asia) is abnormally large or small compared to the 20-day average, or when a major news event distorts normal range-based expansion patterns.',
      related_concepts: ['cbdr', 'asia-range'],
      confluence_weight: 1.1,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_measurement_tools'
    },
    sources: [{
      filePath: 'knowledge_base/ict_measurement_tools',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['measurement', 'projection', 'cbdr', 'targets', 'range-expansion'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-stop-hunt',
    type: 'concept',
    domain: 'concepts',
    name: 'Stop Hunt',
    description: 'A deliberate institutional price manipulation where smart money drives price into clusters of retail stop-loss orders to trigger them, providing the liquidity needed to fill large institutional positions at favorable prices. Stop hunts are the mechanism behind liquidity sweeps and are a core component of the manipulation phase in ICT market models. They occur at predictable levels where retail traders place stops — above swing highs, below swing lows, and around obvious support/resistance.',
    content: 'Stop hunts are the engine that powers institutional order filling. When a bank needs to buy a massive position, it cannot simply place a market order without moving price against itself. Instead, it engineers price to sweep below a swing low where sell stops are clustered — those sell stops become market sell orders that the institution buys against, filling their position with minimal slippage. The same process works in reverse for institutional selling. Traders can anticipate stop hunts by identifying where retail traders are likely placing stops: just below double bottoms, below trendlines, below round numbers, and below recent swing lows for longs (inverse for shorts). The key insight is that the stop hunt IS the setup — once stops are swept and price displaces in the opposite direction, the institutional position has been filled and the real move begins.',
    metadata: {
      category: 'price_action',
      abbreviation: 'SH',
      detection_rules: 'Identify obvious levels where retail stops are clustered: below swing lows, above swing highs, below trendlines, around equal highs/lows, and near round numbers. Watch for price probing these levels quickly with wicks rather than sustained breaks. The stop hunt is confirmed when price sweeps the level and immediately reverses with displacement, leaving a long wick and forming an OB at the sweep point.',
      entry_rules: ['Wait for the stop hunt to complete — never try to front-run the sweep', 'Enter after the sweep produces displacement and a LTF market structure shift in the anticipated direction', 'Use the sweep candle extreme as the stop loss level, as price should not return there if the stop hunt was genuine'],
      invalidation: 'Invalidated when the apparent stop hunt leads to sustained price movement beyond the swept level with closing candles, indicating a genuine breakout rather than a liquidity sweep. If price does not displace back within 1-3 candles, the sweep may be continuation.',
      related_concepts: ['liquidity-sweep', 'manipulation', 'liquidity'],
      confluence_weight: 1.5,
      timeframes: ['M5', 'M15', 'H1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_core_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_core_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['price-action', 'manipulation', 'liquidity', 'institutional', 'stop-loss'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-sunday-open-filter',
    type: 'concept',
    domain: 'concepts',
    name: 'Sunday Open Filter',
    description: 'A weekly bias filter that compares the Sunday market open price to the previous Friday close price to establish an initial directional lean for the first trading days of the new week. If Sunday opens above Friday close, there is an initial bullish bias; if below, an initial bearish bias. This filter helps traders anticipate whether the early-week price action will seek to fill the gap or continue in the gap direction.',
    content: 'The Sunday Open Filter is a simple but effective first step in ICT weekly analysis. By observing whether price gaps up or down at the Sunday open relative to Friday close, traders gain insight into institutional weekend positioning. A gap higher suggests institutions placed buy orders over the weekend, creating an initial bullish bias; a gap lower suggests sell orders were placed. The filter is most useful when combined with the New Week Opening Gap (NWOG) concept and the weekly profile expectations. If the Sunday open gap aligns with the HTF bias, it increases conviction for early-week directional trades. If it contradicts the HTF bias, traders should be cautious and wait for the gap to fill before committing to direction. The filter is particularly powerful on the first two trading days when gap dynamics are most active.',
    metadata: {
      category: 'analysis',
      abbreviation: 'SOF',
      detection_rules: 'At the Sunday 5PM ET market open, compare the opening price to the Friday 5PM ET closing price. Note the direction and size of the gap. A gap larger than the average daily range suggests strong institutional positioning. Cross-reference the gap direction with the HTF weekly and daily bias. Check if the gap aligns with or opposes the previous week trend and the monthly candle direction.',
      entry_rules: ['Use the Sunday open direction as a bias filter for Monday and Tuesday trades', 'If Sunday opens above Friday close and HTF is bullish, look for long setups early in the week', 'If the gap contradicts HTF bias, wait for gap fill before trading in the HTF direction'],
      invalidation: 'The filter loses relevance after Tuesday as the weekly profile typically transitions from range development to directional expansion. Also invalidated when a major fundamental event on Monday overrides the weekend gap dynamics.',
      related_concepts: ['sunday-open-gap', 'nwog', 'weekly-profile'],
      confluence_weight: 0.6,
      timeframes: ['H1', 'H4', 'D1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_core_month8_01_essentials.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_core_month8_01_essentials.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['analysis', 'weekly-bias', 'gap', 'filter', 'sunday-open'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-sunday-open-gap',
    type: 'concept',
    domain: 'concepts',
    name: 'Sunday Open Gap',
    description: 'The price gap that forms between the Friday close and the Sunday market open at 5PM ET. This gap represents institutional weekend order flow and often acts as a magnet for early-week price action. Like all gaps in ICT methodology, the Sunday open gap is an inefficiency that the algorithm seeks to fill, making it a probable early-week draw on liquidity.',
    content: 'The Sunday Open Gap forms because the forex market closes Friday at 5PM ET and reopens Sunday at 5PM ET, but institutional orders placed over the weekend create a displacement between the two prices. This gap is closely related to the New Week Opening Gap (NWOG) concept and serves as a key reference point for the first two days of trading. ICT teaches that these gaps are frequently filled during Monday and Tuesday as part of the normal weekly profile of range establishment. Traders should mark the Sunday open gap boundaries and use the midpoint as a key decision level. If price fills the gap and then displaces away from it, the gap has served its purpose and the weekly direction is likely established. Unfilled Sunday gaps that persist into Wednesday often indicate strong institutional conviction in the gap direction.',
    metadata: {
      category: 'opening_gap',
      abbreviation: 'SOG',
      detection_rules: 'Mark the Friday 5PM ET closing price and the Sunday 5PM ET opening price. The space between these two prices is the Sunday Open Gap. Note the midpoint of the gap as the consequent encroachment level. Monitor whether price fills into this gap during Monday and Tuesday trading. Pay attention to how price reacts at the gap boundaries and midpoint — these are institutional decision levels.',
      entry_rules: ['Use the gap boundaries as short-term draw-on-liquidity targets for early-week trades', 'If gap aligns with HTF bias, trade in the gap direction expecting it to act as support/resistance after fill', 'Enter on LTF setups when price reaches the gap midpoint or far boundary during a killzone'],
      invalidation: 'The gap as a trading reference is invalidated after it has been completely filled and price has displaced away from both boundaries. Also loses relevance after Wednesday if the weekly profile has clearly established its directional leg.',
      related_concepts: ['nwog', 'sunday-open-filter'],
      confluence_weight: 0.8,
      timeframes: ['H1', 'H4', 'D1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_opening_gaps'
    },
    sources: [{
      filePath: 'knowledge_base/ict_opening_gaps',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['opening-gap', 'weekly', 'sunday', 'inefficiency', 'gap-fill'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-suspension-block',
    type: 'concept',
    domain: 'concepts',
    name: 'Suspension Block',
    description: 'An advanced PD array where price suspends or pauses at an institutional settlement level before continuing its current delivery program. Suspension blocks represent levels where the algorithm temporarily halts price to allow institutional order matching before resuming the trend. This is a real-time tape reading concept that requires observation of how price behaves at specific levels rather than static chart markup.',
    content: 'Suspension blocks are among ICT advanced concepts and represent the algorithm pausing price delivery at a predetermined settlement level. Unlike traditional PD arrays that are identified after formation, suspension blocks are observed in real-time as price stalls, consolidates briefly with tight-range candles, and then continues in the prior direction. The suspension occurs because the algorithm must match a specific set of orders at that price level before proceeding — similar to how a train stops at a station briefly before continuing its route. Traders can use suspension blocks as confirmation that the current price delivery program is intact: if price suspends and continues, the trend is healthy. If price suspends and then reverses, the delivery program may be shifting. Suspension blocks are best observed on M1-M5 timeframes during active killzones where institutional order flow is most visible.',
    metadata: {
      category: 'pd_array',
      abbreviation: 'SUSB',
      detection_rules: 'During an active displacement move, observe price suddenly stalling with 2-4 tight-range candles at a specific level before continuing in the same direction. The suspension level often aligns with a previous session high/low, a round number, or a minor PD array. The candles during suspension have small bodies and wicks, indicating balanced order matching. The breakout from the suspension should occur with renewed displacement.',
      entry_rules: ['Identify the suspension in real-time during an active killzone move', 'Enter on the breakout from the suspension range in the direction of the prevailing displacement', 'Use the suspension range low (bullish) or high (bearish) as a tight stop loss'],
      invalidation: 'Invalidated when price breaks the suspension range in the opposite direction of the prior displacement, indicating the delivery program has shifted and the algorithm is now running a new sequence.',
      related_concepts: ['order-block', 'pd-array'],
      confluence_weight: 0.9,
      timeframes: ['M1', 'M5', 'M15'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_2026_smart_money_jan_06.md'
    },
    sources: [{
      filePath: 'knowledge_base/ict_2026_smart_money_jan_06.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['pd-array', 'advanced', 'tape-reading', 'real-time', 'settlement'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-swing-failure-pattern',
    type: 'concept',
    domain: 'concepts',
    name: 'Swing Failure Pattern',
    description: 'A price pattern where price sweeps beyond a significant swing high or swing low but fails to close beyond it on the timeframe of observation, trapping breakout traders and signaling a strong reversal. The SFP is essentially a liquidity sweep confirmed by a close back inside the range, providing immediate evidence that the breakout was false and institutional players are positioning in the opposite direction.',
    content: 'The Swing Failure Pattern is one of the most reliable reversal signals in ICT methodology because it combines liquidity engineering with immediate structural failure. When price wicks above a swing high but closes below it, all the buy stops above that high have been triggered (providing sell-side liquidity to institutions) and the failed close proves that buyers could not sustain the breakout. The same logic applies in reverse for swing lows. SFPs are most powerful when they occur at HTF PD arrays, during killzones, and at the extremes of dealing ranges. The entry is straightforward: after the SFP candle closes, enter in the reversal direction with a stop beyond the wick. SFPs on higher timeframes (H4, D1) carry more significance and can define the high or low of the week. On lower timeframes (M5, M15), they provide precise entries for trades aligned with HTF bias.',
    metadata: {
      category: 'structure',
      abbreviation: 'SFP',
      detection_rules: 'Identify a candle that trades beyond a significant swing high or swing low but closes back inside the prior range. The wick should visibly exceed the swing point while the body closes below (for bearish SFP above swing high) or above (for bullish SFP below swing low). The more significant the swing point that was swept, the more powerful the SFP. Strongest SFPs occur at HTF levels during killzones.',
      entry_rules: ['Enter on the close of the SFP candle in the reversal direction', 'Place stop loss beyond the SFP wick with a few pips buffer', 'Target the opposite end of the dealing range or the next significant PD array'],
      invalidation: 'Invalidated if price returns and closes beyond the SFP wick, indicating the initial sweep was not a failure but a genuine breakout that needed a retest before continuation.',
      related_concepts: ['swing-high', 'swing-low', 'liquidity-sweep'],
      confluence_weight: 1.5,
      timeframes: ['M5', 'M15', 'H1', 'H4'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_structure_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_structure_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['structure', 'reversal', 'liquidity-sweep', 'failure', 'swing-point'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-swing-high',
    type: 'concept',
    domain: 'concepts',
    name: 'Swing High',
    description: 'A local price peak identified by having lower highs on both sides, forming a visible pivot point on the chart. Swing highs are critical structural reference points in ICT methodology because they represent previous buy-side liquidity (BSL) targets where buy stops accumulate above. Every swing high is both a structural marker and a liquidity pool that the algorithm may target for engineering.',
    content: 'Swing highs define the upper boundary of price swings and are fundamental to reading market structure, identifying liquidity pools, and establishing dealing ranges. In ICT methodology, swing highs serve dual purposes: structurally, they define the peaks that must be broken for bullish continuation (higher highs) or defended for bearish structure (lower highs); as liquidity, they represent clusters of buy stops from traders who are short with stops above the high and breakout traders with buy orders above. The significance of a swing high is determined by the timeframe on which it formed, how many times it has been tested, and whether it aligns with HTF PD arrays. Higher timeframe swing highs (H4, D1) are primary targets for weekly price delivery, while lower timeframe swing highs (M5, M15) provide intermediate targets within a session.',
    metadata: {
      category: 'structure',
      abbreviation: 'SH',
      detection_rules: 'Identify a candle with a high that is higher than the highs of the candles immediately to its left and right, creating a visible peak or pivot. For a more significant swing high, require 2-3 lower highs on each side. The swing high should be clearly visible on the timeframe being analyzed. Mark the exact high price as the BSL level. Multiple touches of the same high level create equal highs, which represent even stronger BSL.',
      entry_rules: ['Use swing highs as BSL targets for long trades — price is drawn to sweep them', 'After a swing high is swept, look for bearish setups if HTF bias is bearish', 'In a confirmed uptrend, breaking above a swing high with displacement confirms continuation'],
      invalidation: 'A swing high loses its structural significance once it has been swept and price has closed above it with displacement, at which point it becomes a broken structure level and the focus shifts to the next swing high above.',
      related_concepts: ['bsl', 'market-structure'],
      confluence_weight: 0.8,
      timeframes: ['M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_core_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_core_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['structure', 'swing-point', 'bsl', 'liquidity', 'pivot'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-swing-low',
    type: 'concept',
    domain: 'concepts',
    name: 'Swing Low',
    description: 'A local price trough identified by having higher lows on both sides, forming a visible pivot point on the chart. Swing lows are critical structural reference points in ICT methodology because they represent previous sell-side liquidity (SSL) targets where sell stops accumulate below. Every swing low serves as both a structural marker and a liquidity pool that the algorithm may target.',
    content: 'Swing lows define the lower boundary of price swings and are essential for market structure analysis, liquidity mapping, and dealing range identification. In ICT methodology, swing lows function dually: structurally, they define the troughs that must be broken for bearish continuation (lower lows) or defended for bullish structure (higher lows); as liquidity, they represent clusters of sell stops from long traders with stops below the low and breakout sellers with sell orders below. The significance of a swing low depends on its formation timeframe, the number of tests it has received, and its alignment with HTF PD arrays. Higher timeframe swing lows (H4, D1) serve as primary draw-on-liquidity targets for weekly price delivery, while lower timeframe swing lows (M5, M15) provide intraday session targets. Equal lows at the same price level represent concentrated SSL and are high-priority targets for the algorithm.',
    metadata: {
      category: 'structure',
      abbreviation: 'SL',
      detection_rules: 'Identify a candle with a low that is lower than the lows of the candles immediately to its left and right, creating a visible trough or pivot. For a more significant swing low, require 2-3 higher lows on each side. The swing low should be clearly visible on the timeframe being analyzed. Mark the exact low price as the SSL level. Multiple touches of the same low level create equal lows, which represent even stronger SSL.',
      entry_rules: ['Use swing lows as SSL targets for short trades — price is drawn to sweep them', 'After a swing low is swept, look for bullish setups if HTF bias is bullish', 'In a confirmed downtrend, breaking below a swing low with displacement confirms continuation'],
      invalidation: 'A swing low loses its structural significance once it has been swept and price has closed below it with displacement, at which point it becomes a broken structure level and the focus shifts to the next swing low below.',
      related_concepts: ['ssl', 'market-structure'],
      confluence_weight: 0.8,
      timeframes: ['M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_core_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_core_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['structure', 'swing-point', 'ssl', 'liquidity', 'pivot'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-terminus',
    type: 'concept',
    domain: 'concepts',
    name: 'Terminus',
    description: 'The final predetermined objective of a market maker model — the price level that was targeted before the delivery sequence even began. Terminus represents the ultimate draw on liquidity where the algorithm completes its current program. It is located at significant discount or premium PD arrays on higher timeframes and is the destination, not a discovery.',
    content: 'Terminus is the endpoint of institutional price delivery — the level where the current buy or sell program exhausts itself and either reverses or enters a new accumulation/distribution phase. ICT teaches that terminus levels are predetermined by the IPDA algorithm before price begins its journey, meaning the market maker knows where price is going before it starts moving. Terminus is typically found at HTF PD arrays (weekly/daily OBs, FVGs, or liquidity pools) that sit at premium or discount extremes of the current dealing range. Identifying terminus requires understanding the current market maker model phase, the HTF PD arrays in play, and where the maximum liquidity exists. Standard deviation projections from CBDR can also point to terminus when SD levels align with HTF PD arrays. When price reaches terminus, expect consolidation, reversal, or a significant change in price delivery character.',
    metadata: {
      category: 'structure',
      abbreviation: 'TERM',
      detection_rules: 'Identify the current dealing range and determine whether price is in a buy or sell program. Locate the highest probability PD array at the premium extreme (for sell program terminus) or discount extreme (for buy program terminus) of the dealing range. Cross-reference with CBDR standard deviation projections. Terminus often aligns with HTF swing points where maximum liquidity is resting. The strongest terminus levels have multiple PD arrays stacking at the same zone.',
      entry_rules: ['Use terminus as the ultimate profit target for swing trades aligned with the market maker model', 'Begin scaling out of positions as price approaches terminus levels', 'Look for reversal setups at terminus when multiple HTF PD arrays converge and LTF structure shifts'],
      invalidation: 'The identified terminus is invalidated if price reaches the level without showing any reaction or change in delivery character, suggesting the actual terminus is at a deeper PD array. Also invalidated if the market maker model itself is negated by an opposing HTF displacement.',
      related_concepts: ['dealing-range', 'cbdr', 'standard-deviation'],
      confluence_weight: 1.7,
      timeframes: ['M15', 'H1', 'H4'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_market_maker_models'
    },
    sources: [{
      filePath: 'knowledge_base/ict_market_maker_models',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['structure', 'market-maker', 'objective', 'terminus', 'pd-array'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-time-price-theory',
    type: 'concept',
    domain: 'concepts',
    name: 'Time & Price Theory',
    description: 'The foundational ICT principle that time is more important than price — the right setup at the wrong time is a wrong trade. Markets operate on precise institutional time schedules: killzones define when to trade, macros define when algorithms execute, and session transitions create predictable volatility windows. Without the correct time element, even the best PD array alignment will fail.',
    content: 'Time & Price Theory is the philosophical backbone of ICT methodology. While most traders obsess over price levels and chart patterns, ICT teaches that the temporal dimension is the primary filter. Institutions operate on strict schedules: London open at 2AM ET delivers the first real moves, New York at 7AM ET brings the highest probability setups, and macro times at :33-:00 and :03-:10 past specific hours are when the algorithm executes its program. A beautiful bearish order block in premium is meaningless if price reaches it at 11AM ET when no institutional program is running. Traders must first qualify time — is this a killzone? Is today an optimal trade day (Tuesday-Thursday)? Is this week optimal within the monthly profile? — before qualifying price. The marriage of correct time and correct price at a PD array is what creates high-probability trades. This is why ICT emphasizes backtesting specific killzones rather than random chart patterns.',
    metadata: {
      category: 'analysis',
      abbreviation: 'TPT',
      detection_rules: 'Before analyzing any price setup, confirm the time element: Is the current session a killzone (London 2-5AM ET, NY 7-10AM ET, PM session 1:30-4PM ET)? Is today an optimal trade day (Tue-Thu preferred, Mon acceptable, Fri caution)? Is this week within the optimal trading window of the monthly profile? Is the current time within a macro window? Only proceed with price analysis if the time qualifies.',
      entry_rules: ['Never enter a trade outside of a defined killzone unless there is extraordinary HTF confluence', 'Prioritize Tuesday through Thursday for the highest probability trade days', 'Use macro times (:33-:00, :03-:10) as precision timing for entries within killzones'],
      invalidation: 'Time & Price Theory is not invalidated per se — it is a framework. However, individual time-based expectations are invalidated on major news days (FOMC, NFP) when the algorithm runs outside normal killzone parameters, or during holiday-affected weeks with reduced institutional participation.',
      related_concepts: ['killzones', 'macro-times', 'optimal-trade-days'],
      confluence_weight: 2.0,
      timeframes: ['M5', 'M15', 'H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_time_and_price'
    },
    sources: [{
      filePath: 'knowledge_base/ict_time_and_price',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['analysis', 'time', 'killzones', 'foundation', 'time-price'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-trendline-liquidity',
    type: 'concept',
    domain: 'concepts',
    name: 'Trendline Liquidity',
    description: 'Stop-loss orders and pending orders that cluster along trendlines drawn by retail traders, creating a predictable pool of liquidity that institutions target for sweeping. When retail traders draw ascending or descending trendlines, they place stops just beyond the trendline — these stop clusters form a diagonal liquidity pool that smart money is aware of and engineers price to sweep before the real move begins.',
    content: 'Trendline liquidity exploits one of the most common retail trading habits: drawing trendlines and placing stops just below ascending trendlines (for longs) or above descending trendlines (for shorts). ICT teaches that these trendlines are not support or resistance — they are liquidity pools. The more obvious the trendline, the more stops cluster along it, and the more attractive it becomes for institutional sweep. A typical trendline liquidity sweep occurs when price breaks below an ascending trendline, triggering all the sell stops, only to immediately reverse and displace higher. This is why ICT traders view trendline breaks as buying opportunities (in bullish conditions) rather than sell signals. The key is waiting for the sweep to complete and then entering on the displacement back in the original trend direction. Trendline liquidity sweeps often coincide with killzone timing and HTF PD array alignment.',
    metadata: {
      category: 'liquidity_pool',
      abbreviation: 'TLL',
      detection_rules: 'Identify obvious trendlines that retail traders would draw connecting 2-3 swing points. The more touches a trendline has, the more stops are accumulated along it. Mark the area just beyond the trendline as the liquidity zone. Watch for price approaching the trendline during a killzone — the sweep typically occurs with a quick wick beyond the trendline followed by immediate displacement back in the trend direction.',
      entry_rules: ['Wait for price to sweep the trendline liquidity and then displace back in the original direction', 'Enter on the first pullback into a PD array (FVG or OB) created by the post-sweep displacement', 'Confirm the sweep with a LTF market structure shift back in the trend direction before entering'],
      invalidation: 'Invalidated when the trendline break is followed by sustained displacement and closing candles beyond the trendline zone, indicating a genuine trend break rather than a liquidity sweep. If price does not reclaim the trendline zone within 2-3 candles, treat it as a structural break.',
      related_concepts: ['liquidity', 'stop-hunt'],
      confluence_weight: 1.2,
      timeframes: ['M15', 'H1', 'H4', 'D1'],
      htf_priority: false,
      source_reference: 'knowledge_base/ict_liquidity_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_liquidity_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['liquidity', 'trendline', 'stop-hunt', 'retail-trap', 'sweep'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-true-day',
    type: 'concept',
    domain: 'concepts',
    name: 'True Day',
    description: 'ICT defines the true trading day as running from midnight to midnight Eastern Time, not the broker server day which often starts at 5PM ET or varies by platform. Using the true day ensures that daily opens, closes, highs, and lows are measured against the institutional settlement clock rather than arbitrary broker timestamps. This distinction is critical for accurate PD array marking and daily bias analysis.',
    content: 'The True Day concept corrects a fundamental error most traders make: using broker-defined daily candles that do not reflect institutional reality. Banks and institutions settle on a midnight-to-midnight ET cycle, meaning the daily open that matters is the midnight ET price, and the daily range is measured from that point. This affects every daily-timeframe concept in ICT methodology: the true daily open is where price is at midnight ET (not 5PM ET), the true daily high/low are measured from midnight to midnight, and PD arrays identified on the daily chart must use true day candles. The difference between broker days and true days can be significant — what a broker shows as a bullish daily candle might be bearish on a true day basis. ICT traders should configure their charts to midnight ET opens or mentally adjust their analysis to account for the true day framework, especially when identifying daily FVGs, OBs, and opening prices.',
    metadata: {
      category: 'time',
      abbreviation: 'TD',
      detection_rules: 'Set chart time to Eastern Time and use midnight (00:00 ET) as the daily candle open. Compare the midnight open to the current price to determine the true daily direction. Mark the midnight open as a key reference level for intraday trading. Note that the true day open often aligns with the start of Asian session price delivery and sets the stage for London and New York killzone expansions.',
      entry_rules: ['Use the midnight ET open as the true daily open for bias determination — above it is bullish intraday, below is bearish', 'Mark the true day open on intraday charts as a reference level for retracement entries', 'Calculate daily range statistics using true day measurements for accurate CBDR and standard deviation analysis'],
      invalidation: 'The true day framework is a measurement standard rather than a tradeable concept, so it is not invalidated per se. However, on days with extreme overnight news events, the midnight open may be less relevant as the institutional day effectively resets at the event.',
      related_concepts: ['ipda-true-day', 'midnight-open'],
      confluence_weight: 0.7,
      timeframes: ['H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_time_concepts'
    },
    sources: [{
      filePath: 'knowledge_base/ict_time_concepts',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['time', 'daily', 'midnight-open', 'institutional', 'settlement'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-vacuum-block',
    type: 'concept',
    domain: 'concepts',
    name: 'Vacuum Block',
    description: 'The most extreme form of price inefficiency — an area on the chart where virtually no trading occurred, representing an even more severe imbalance than a liquidity void. Vacuum blocks are created during the most violent institutional displacements where price teleported through a zone with essentially zero volume. The algorithm treats these as mandatory fill zones that price must eventually return to.',
    content: 'Vacuum blocks represent the pinnacle of price inefficiency in ICT methodology. While fair value gaps show moderate inefficiency and liquidity voids show significant inefficiency, vacuum blocks show near-total absence of trading activity in a price zone. They form during extreme displacement events — think flash crashes, major news releases, or gap opens — where the bid-ask spread widened so dramatically that no meaningful order matching occurred. Because the market algorithm requires fair two-sided price discovery at all price levels, vacuum blocks exert the strongest gravitational pull of any inefficiency type. Price will inevitably return to fill a vacuum block, though the timeline may range from hours to weeks depending on the timeframe and market conditions. Traders should mark vacuum blocks as high-priority PD arrays and expect price to magnetize toward them. When price enters a vacuum block, it often moves through the zone quickly as there is minimal resistance within the vacuum.',
    metadata: {
      category: 'pd_array',
      abbreviation: 'VB',
      detection_rules: 'Look for zones where price moved so rapidly that there are literally no or almost no candle bodies within the zone on the formation timeframe. The zone should be wider than a typical FVG and show characteristics of extreme displacement — often multiple consecutive large-body candles with no overlap. On lower timeframes, the zone appears as a near-vertical price move with massive gaps between candles. Vacuum blocks are rarer than FVGs or liquidity voids and only form during the most extreme institutional events.',
      entry_rules: ['Mark vacuum blocks as high-priority draw-on-liquidity zones', 'When price returns to fill a vacuum block, expect rapid price movement through the zone', 'Use the far edge of the vacuum block as a profit target when trading toward it, not as an entry zone within it'],
      invalidation: 'A vacuum block is invalidated once price has fully traded through the zone with normal two-sided price action on the formation timeframe, indicating the inefficiency has been resolved and fair value has been established.',
      related_concepts: ['liquidity-void', 'fvg'],
      confluence_weight: 1.8,
      timeframes: ['M5', 'M15', 'H1', 'H4'],
      htf_priority: true,
      source_reference: 'knowledge_base/ICT_ADVANCED_CONCEPTS.md'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_ADVANCED_CONCEPTS.md',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['pd-array', 'inefficiency', 'extreme', 'vacuum', 'mandatory-fill'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-weekly-profile',
    type: 'concept',
    domain: 'concepts',
    name: 'Weekly Profile',
    description: 'The characteristic pattern of how a trading week unfolds in institutional markets. Monday establishes the range and often provides manipulation. Tuesday and Wednesday deliver the real directional moves and highest probability setups. Thursday may continue or begin reversal. Friday is typically profit-taking and position squaring. Understanding this weekly rhythm allows traders to allocate risk and attention optimally across the week.',
    content: 'The weekly profile is ICT framework for understanding when during the week the highest probability trading opportunities occur. Monday is the range-building day where the NWOG may fill and liquidity pools begin forming — it is generally not an ideal day for initiating swing positions. Tuesday is often the day when the week directional move begins, especially during London and New York killzones, making it one of the two optimal trade days. Wednesday continues Tuesday momentum and often delivers the week most significant expansion — the other optimal trade day. Thursday can either continue the mid-week move or begin the weekly reversal, requiring careful observation of whether the week draw-on-liquidity has been reached. Friday is characterized by profit-taking, reduced institutional participation, and position squaring ahead of the weekend — it is the least reliable day for new trade entries. This profile is not rigid but represents the statistical tendency that traders should use as a baseline for weekly planning.',
    metadata: {
      category: 'time_profile',
      abbreviation: 'WP',
      detection_rules: 'At the start of each week, establish the weekly profile expectations: Monday for range and gap fill, Tuesday for directional initiation, Wednesday for expansion, Thursday for continuation or reversal, Friday for reduction. Compare actual price action against these expectations as the week progresses. Deviations from the profile (e.g., Monday producing the week high/low) provide information about institutional urgency.',
      entry_rules: ['Focus primary trading activity on Tuesday and Wednesday when institutional participation is highest', 'Use Monday price action to establish the week range and identify liquidity pools for the mid-week move', 'Reduce position sizing or avoid new entries on Friday unless there is exceptional HTF setup completing'],
      invalidation: 'The weekly profile deviates significantly during weeks with major central bank decisions (FOMC on Wednesday shifts the profile), NFP Fridays (Friday becomes the expansion day), and holiday-shortened weeks where the entire profile compresses.',
      related_concepts: ['optimal-trade-days', 'monthly-profile'],
      confluence_weight: 1.0,
      timeframes: ['D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_time_and_price'
    },
    sources: [{
      filePath: 'knowledge_base/ict_time_and_price',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['time-profile', 'weekly', 'optimal-days', 'session-planning', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-wyckoff-accumulation',
    type: 'concept',
    domain: 'concepts',
    name: 'Wyckoff Accumulation (ICT-Adapted)',
    description: 'The classic Wyckoff accumulation schematic adapted through the ICT lens, where institutional phases translate to ICT concepts. Preliminary Support (PS) and Selling Climax (SC) establish the range. Automatic Rally (AR) sets the resistance. Secondary Test (ST) confirms the low. The Spring is the SSL sweep that triggers sell stops. Sign of Strength (SOS) is the displacement above the range. Last Point of Support (LPS) is the retracement to a PD array before the markup begins.',
    content: 'ICT-adapted Wyckoff accumulation bridges classical market theory with modern institutional concepts. The accumulation phase begins with a Selling Climax that establishes the bottom of the range — in ICT terms, this is where smart money begins absorbing sell-side liquidity. The range then builds with tests of support and resistance, creating equal lows (SSL) and equal highs (BSL). The critical moment is the Spring: Wyckoff Spring = ICT SSL sweep below the range low. This sweep triggers all the sell stops built up during the range, giving institutions the final liquidity needed to complete their long accumulation. The Spring is followed by Sign of Strength — a powerful bullish displacement with FVGs that breaks above the range, confirming the accumulation is complete and the markup phase has begun. The Last Point of Support is the pullback to a bullish PD array (OB or FVG) created during the SOS displacement. Traders should enter at the LPS with stops below the Spring low, targeting the next significant BSL pool above.',
    metadata: {
      category: 'market_phase',
      abbreviation: 'WACC',
      detection_rules: 'Identify a prolonged sideways range after a downtrend. Look for the SC (aggressive sell-off to range bottom), AR (bounce to range top), and ST (retest of SC area). The key signal is the Spring: a wick or brief break below the range low (SSL sweep) followed by immediate bullish displacement back into the range. Confirm SOS with displacement above the AR level with FVG creation. The LPS forms as a pullback to a PD array before the final markup.',
      entry_rules: ['Enter at the LPS (pullback to FVG or OB) after confirming the SOS displacement above the range', 'Aggressive entry: buy immediately after the Spring SSL sweep when LTF MSS confirms bullish reversal', 'Place stops below the Spring low with targets at the next HTF BSL pool'],
      invalidation: 'Invalidated if the Spring (SSL sweep) fails to produce displacement back into the range and instead price continues lower with sustained selling, indicating the range was distribution rather than accumulation.',
      related_concepts: ['accumulation', 'wyckoff-distribution'],
      confluence_weight: 1.6,
      timeframes: ['H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_market_phases'
    },
    sources: [{
      filePath: 'knowledge_base/ict_market_phases',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['market-phase', 'wyckoff', 'accumulation', 'spring', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'concept-wyckoff-distribution',
    type: 'concept',
    domain: 'concepts',
    name: 'Wyckoff Distribution (ICT-Adapted)',
    description: 'The classic Wyckoff distribution schematic adapted through the ICT lens, where institutional phases translate to ICT concepts. Preliminary Supply (PSY) and Buying Climax (BC) establish the range top. Automatic Reaction (AR) sets the support. Secondary Test (ST) confirms the high. The UTAD (Upthrust After Distribution) is the BSL sweep above the range. Sign of Weakness (SOW) is the bearish displacement below the range. Last Point of Supply (LPSY) is the retracement to a PD array before the markdown begins.',
    content: 'ICT-adapted Wyckoff distribution is the bearish mirror of accumulation, describing how institutions distribute long positions and build shorts. The distribution phase begins with a Buying Climax that establishes the top of the range — in ICT terms, where smart money begins offloading longs into retail buying enthusiasm. The range builds BSL above (equal highs) and SSL below (equal lows). The critical event is the UTAD (Upthrust After Distribution): this is the ICT BSL sweep above the range high that triggers all the buy stops, giving institutions the final liquidity to fill their short positions. Following the UTAD, the Sign of Weakness produces bearish displacement with SIBIs (bearish FVGs) that breaks below the range, confirming distribution is complete and markdown has begun. The Last Point of Supply is the bearish retracement into a premium PD array (bearish OB or SIBI) created during the SOW displacement. Traders enter short at the LPSY with stops above the UTAD high, targeting the next significant SSL pool below.',
    metadata: {
      category: 'market_phase',
      abbreviation: 'WDIST',
      detection_rules: 'Identify a prolonged sideways range after an uptrend. Look for the BC (aggressive rally to range top), AR (selloff to range bottom), and ST (retest of BC area). The key signal is the UTAD: a wick or brief break above the range high (BSL sweep) followed by immediate bearish displacement back into the range. Confirm SOW with displacement below the AR level with SIBI creation. The LPSY forms as a pullback to a premium PD array before the final markdown.',
      entry_rules: ['Enter short at the LPSY (pullback to bearish FVG or OB) after confirming the SOW displacement below the range', 'Aggressive entry: sell immediately after the UTAD BSL sweep when LTF MSS confirms bearish reversal', 'Place stops above the UTAD high with targets at the next HTF SSL pool'],
      invalidation: 'Invalidated if the UTAD (BSL sweep) fails to produce displacement back into the range and instead price continues higher with sustained buying, indicating the range was re-accumulation rather than distribution.',
      related_concepts: ['distribution', 'wyckoff-accumulation'],
      confluence_weight: 1.6,
      timeframes: ['H1', 'H4', 'D1'],
      htf_priority: true,
      source_reference: 'knowledge_base/ict_market_phases'
    },
    sources: [{
      filePath: 'knowledge_base/ict_market_phases',
      lineStart: 1,
      lineEnd: 50,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['market-phase', 'wyckoff', 'distribution', 'utad', 'institutional'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
];
