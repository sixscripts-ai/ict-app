import type { Entity } from '../../lib/types';

const timestamp = new Date().toISOString();
const uploadId = 'ict-master-database-2026-02-18';

export const ICT_TRADES: Entity[] = [
  {
    id: 'trade-gbpusd-2025-09-26-1',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD Buy - 2025-09-26 - Silver Bullet Winner',
    description: 'GBPUSD long trade during NY PM session. Perfect Silver Bullet execution with FVG, OB, and liquidity sweep confluence. Part of 4/4 winning GBPUSD session.',
    content: JSON.stringify({
      ticket: 6668541,
      trade_id: '20250926-GBPUSD-001',
      timestamp: '2025-09-26T15:16:54Z'
    }, null, 2),
    metadata: {
      market: {
        pair: 'GBPUSD',
        direction: 'buy',
        entry: 1.33574,
        stop_loss: 1.3359,
        target: 1.34000,
        exit: 1.33824
      },
      setup: {
        setup_type: 'silver_bullet',
        direction: 'buy',
        model: 'Silver Bullet'
      },
      execution: {
        result: 'WIN',
        entry_price: 1.33574,
        stop_loss: 1.3359,
        target: 1.34000,
        exit_price: 1.33824,
        pnl: 62.50,
        pips: 25.0,
        risk_reward_ratio: 2.5,
        lot_size: 0.25,
        duration_seconds: 3936
      },
      context: {
        killzone: 'NY_PM',
        session: 'NY',
        date: '2025-09-26',
        time: '15:16:54',
        confluences: ['FVG', 'OB', 'liquidity_sweep', 'OTE'],
        confluence_count: 4
      },
      meta: {
        example_type: 'positive',
        grade: 'A+',
        notes: '4/4 GBPUSD winners session. Perfect setup with all confluences aligned.'
      }
    },
    sources: [
      {
        filePath: 'Collected_ICT_Data/connected_trades.csv',
        lineStart: 8,
        lineEnd: 8,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    validationStatus: 'valid',
    tags: ['long', 'win', 'silver_bullet', 'gbpusd', 'ny_pm', 'high_quality'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-gbpusd-2025-09-26-2',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD Buy - 2025-09-26 - Cycle 2',
    description: 'GBPUSD long trade, second cycle entry. FVG and liquidity sweep confluence. Winner as part of systematic position cycling.',
    content: JSON.stringify({
      ticket: 66685415109704,
      trade_id: '20250926-GBPUSD-002',
      timestamp: '2025-09-26T15:16:54Z'
    }, null, 2),
    metadata: {
      market: {
        pair: 'GBPUSD',
        direction: 'buy',
        entry: 1.33743670,
        stop_loss: 1.3364,
        target: 1.34000,
        exit: 1.33820
      },
      setup: {
        setup_type: 'silver_bullet',
        direction: 'buy',
        model: 'Silver Bullet',
        cycle: 2
      },
      execution: {
        result: 'WIN',
        entry_price: 1.33743670,
        stop_loss: 1.3364,
        target: 1.34000,
        exit_price: 1.33820,
        pnl: 19.08,
        pips: 7.6,
        risk_reward_ratio: 1.5,
        lot_size: 0.25,
        duration_seconds: 5820
      },
      context: {
        killzone: 'NY_PM',
        session: 'NY',
        date: '2025-09-26',
        time: '15:16:54',
        confluences: ['FVG', 'liquidity_sweep'],
        confluence_count: 2
      },
      meta: {
        example_type: 'positive',
        grade: 'A',
        notes: 'Position cycling - re-entry after FVG formation'
      }
    },
    sources: [
      {
        filePath: 'Collected_ICT_Data/connected_trades.csv',
        lineStart: 7,
        lineEnd: 7,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    validationStatus: 'valid',
    tags: ['long', 'win', 'silver_bullet', 'gbpusd', 'ny_pm', 'position_cycle'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-gbpusd-2025-09-26-3',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD Buy - 2025-09-26 - Cycle 3',
    description: 'GBPUSD long trade, third cycle entry. Continued winning streak in GBPUSD during NY PM.',
    content: JSON.stringify({
      ticket: 66685415112978,
      trade_id: '20250926-GBPUSD-003',
      timestamp: '2025-09-26T15:16:54Z'
    }, null, 2),
    metadata: {
      market: {
        pair: 'GBPUSD',
        direction: 'buy',
        entry: 1.33743670,
        stop_loss: 1.3377,
        target: 1.34100,
        exit: 1.33936
      },
      setup: {
        setup_type: 'silver_bullet',
        direction: 'buy',
        model: 'Silver Bullet',
        cycle: 3
      },
      execution: {
        result: 'WIN',
        entry_price: 1.33743670,
        stop_loss: 1.3377,
        target: 1.34100,
        exit_price: 1.33936,
        pnl: 48.08,
        pips: 19.2,
        risk_reward_ratio: 2.4,
        lot_size: 0.25,
        duration_seconds: 7310
      },
      context: {
        killzone: 'NY_PM',
        session: 'NY',
        date: '2025-09-26',
        time: '15:16:54',
        confluences: ['FVG', 'OB'],
        confluence_count: 2
      },
      meta: {
        example_type: 'positive',
        grade: 'A',
        notes: '3rd position cycle, maintaining winning streak'
      }
    },
    sources: [
      {
        filePath: 'Collected_ICT_Data/connected_trades.csv',
        lineStart: 6,
        lineEnd: 6,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    validationStatus: 'valid',
    tags: ['long', 'win', 'silver_bullet', 'gbpusd', 'ny_pm', 'position_cycle'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-gbpusd-2025-09-26-4',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD Buy - 2025-09-26 - Cycle 4',
    description: 'GBPUSD long trade, fourth and final cycle. Best R:R of the session completing 4/4 winning streak.',
    content: JSON.stringify({
      ticket: 66685415116113,
      trade_id: '20250926-GBPUSD-004',
      timestamp: '2025-09-26T15:16:54Z'
    }, null, 2),
    metadata: {
      market: {
        pair: 'GBPUSD',
        direction: 'buy',
        entry: 1.33743670,
        stop_loss: 1.3375,
        target: 1.34100,
        exit: 1.33983
      },
      setup: {
        setup_type: 'silver_bullet',
        direction: 'buy',
        model: 'Silver Bullet',
        cycle: 4
      },
      execution: {
        result: 'WIN',
        entry_price: 1.33743670,
        stop_loss: 1.3375,
        target: 1.34100,
        exit_price: 1.33983,
        pnl: 59.83,
        pips: 23.9,
        risk_reward_ratio: 3.1,
        lot_size: 0.25,
        duration_seconds: 9019
      },
      context: {
        killzone: 'NY_PM',
        session: 'NY',
        date: '2025-09-26',
        time: '15:16:54',
        confluences: ['FVG', 'OB', 'displacement'],
        confluence_count: 3
      },
      meta: {
        example_type: 'positive',
        grade: 'A+',
        notes: 'Final cycle completing 4/4 winners. Total session: +$189.49'
      }
    },
    sources: [
      {
        filePath: 'Collected_ICT_Data/connected_trades.csv',
        lineStart: 5,
        lineEnd: 5,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    validationStatus: 'valid',
    tags: ['long', 'win', 'silver_bullet', 'gbpusd', 'ny_pm', 'position_cycle', 'best_rr'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-eurusd-2025-09-26-1',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD Buy - 2025-09-26 - NY PM Winner',
    description: 'EURUSD long trade during NY PM session. FVG and displacement confluence. Winner completing successful Friday trading session.',
    content: JSON.stringify({
      ticket: 6680195,
      trade_id: '20250926-EURUSD-001',
      timestamp: '2025-09-26T16:59:43Z'
    }, null, 2),
    metadata: {
      market: {
        pair: 'EURUSD',
        direction: 'buy',
        entry: 1.16891,
        stop_loss: 1.1689,
        target: 1.17200,
        exit: 1.16946
      },
      setup: {
        setup_type: 'silver_bullet',
        direction: 'buy',
        model: 'Silver Bullet'
      },
      execution: {
        result: 'WIN',
        entry_price: 1.16891,
        stop_loss: 1.1689,
        target: 1.17200,
        exit_price: 1.16946,
        pnl: 27.50,
        pips: 5.5,
        risk_reward_ratio: 2.5,
        lot_size: 0.5,
        duration_seconds: 5981
      },
      context: {
        killzone: 'NY_PM',
        session: 'NY',
        date: '2025-09-26',
        time: '16:59:43',
        confluences: ['FVG', 'displacement'],
        confluence_count: 2
      },
      meta: {
        example_type: 'positive',
        grade: 'A',
        notes: 'Clean execution on EURUSD after successful GBPUSD session'
      }
    },
    sources: [
      {
        filePath: 'Collected_ICT_Data/connected_trades.csv',
        lineStart: 4,
        lineEnd: 4,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    validationStatus: 'valid',
    tags: ['long', 'win', 'silver_bullet', 'eurusd', 'ny_pm'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-eurusd-2025-09-30-1',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD Sell - 2025-09-30 - Loss',
    description: 'EURUSD short trade stopped out at SL. Example of proper risk management - loss contained to predetermined level. Learning opportunity for setup validation.',
    content: JSON.stringify({
      ticket: 6947376,
      trade_id: '20250930-EURUSD-001',
      timestamp: '2025-09-30T15:48:11Z'
    }, null, 2),
    metadata: {
      market: {
        pair: 'EURUSD',
        direction: 'sell',
        entry: 1.17383,
        stop_loss: 1.175,
        target: 1.15745,
        exit: 1.17500
      },
      setup: {
        setup_type: 'ict_2022',
        direction: 'sell',
        model: 'ICT 2022 Model'
      },
      execution: {
        result: 'LOSS',
        entry_price: 1.17383,
        stop_loss: 1.175,
        target: 1.15745,
        exit_price: 1.17500,
        pnl: -29.25,
        pips: -11.7,
        risk_reward_ratio: 1.4,
        lot_size: 0.25,
        duration_seconds: 6699
      },
      context: {
        killzone: 'NY_PM',
        session: 'NY',
        date: '2025-09-30',
        time: '15:48:11',
        confluences: ['FVG'],
        confluence_count: 1
      },
      meta: {
        example_type: 'negative',
        grade: 'C',
        notes: 'Stopped out at SL. Setup may have lacked sufficient confluence. Proper risk management demonstrated.',
        lessons: [
          'Verify minimum 3 confluences before entry',
          'HTF bias alignment critical',
          'Loss contained properly - good risk management'
        ]
      }
    },
    sources: [
      {
        filePath: 'Collected_ICT_Data/connected_trades.csv',
        lineStart: 1,
        lineEnd: 1,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    validationStatus: 'valid',
    tags: ['short', 'loss', 'ict_2022', 'eurusd', 'ny_pm', 'learning_opportunity'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-eurusd-2025-09-26-early',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD Buy - 2025-09-26 - Morning Loss',
    description: 'EURUSD long trade during morning session. Example of importance of proper timing and confluence. Stopped out for loss showing importance of Killzone trading.',
    content: JSON.stringify({
      ticket: 6649836,
      trade_id: '20250926-EURUSD-MORNING',
      timestamp: '2025-09-26T09:15:00Z'
    }, null, 2),
    metadata: {
      market: {
        pair: 'EURUSD',
        direction: 'buy',
        entry: 1.16813,
        stop_loss: 1.16666,
        target: 1.17200,
        exit: 1.16664
      },
      setup: {
        setup_type: 'early_entry',
        direction: 'buy',
        model: 'Premature Entry'
      },
      execution: {
        result: 'LOSS',
        entry_price: 1.16813,
        stop_loss: 1.16666,
        target: 1.17200,
        exit_price: 1.16664,
        pnl: -74.50,
        pips: -14.9,
        risk_reward_ratio: 2.6,
        lot_size: 0.5,
        duration_seconds: 16322
      },
      context: {
        killzone: 'NONE',
        session: 'PRE_NY',
        date: '2025-09-26',
        time: '09:15:00',
        confluences: ['FVG'],
        confluence_count: 1
      },
      meta: {
        example_type: 'negative',
        grade: 'D',
        notes: 'Entry outside Killzone. Demonstrates importance of time-based trading rules.',
        lessons: [
          'Never trade outside Killzones',
          'Wait for proper session timing',
          'Insufficient confluence (only 1)',
          'Early entries have lower probability'
        ]
      }
    },
    sources: [
      {
        filePath: 'Collected_ICT_Data/connected_trades.csv',
        lineStart: 10,
        lineEnd: 10,
        uploadId,
        uploadedAt: timestamp
      },
      {
        filePath: 'Collected_ICT_Data/journal.md',
        lineStart: 50,
        lineEnd: 100,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    validationStatus: 'valid',
    tags: ['long', 'loss', 'eurusd', 'timing_error', 'learning_opportunity', 'anti_pattern'],
    createdAt: timestamp,
    updatedAt: timestamp
  },

  // ============================================================
  // JOURNAL TRADES (2)
  // ============================================================
  {
    id: 'trade-journal-1-eurusd',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD SHORT — Weekly Sell Model, Pre-London',
    description: 'EURUSD SHORT, Weekly Sell Model, Pre-London session. 1.25 lots, Risk $250 (2.5%), Confidence HIGH. 6 confluences aligned for high-probability short.',
    content: JSON.stringify({
      trade_type: 'journal',
      model: 'Weekly Sell Model',
      session: 'Pre-London',
      confidence: 'HIGH',
      risk_percent: 2.5,
      risk_dollars: 250
    }, null, 2),
    metadata: {
      market: {
        pair: 'EURUSD',
        direction: 'sell',
        entry: 1.1650,
        stop_loss: 1.1670,
        target1: 1.1625,
        target2: 1.1560
      },
      setup: {
        setup_type: 'weekly_sell_model',
        direction: 'sell',
        model: 'Weekly Sell Model',
        session: 'Pre-London'
      },
      execution: {
        position_size: 1.25,
        risk_dollars: 250,
        risk_percent: 2.5,
        confidence: 'HIGH'
      },
      context: {
        session: 'Pre-London',
        confluences: [
          'Weekly high likely in (Tuesday)',
          'Equal lows/SSL below',
          'Failed OB retest',
          'Premium zone',
          '-0.5 fib extension target',
          'DXY equal highs correlation'
        ],
        confluence_count: 6
      },
      meta: {
        example_type: 'journal_plan',
        notes: 'High confluence short setup with weekly model alignment. DXY correlation supports directional bias.'
      }
    },
    sources: [
      {
        filePath: 'Collected_ICT_Data/journal.md',
        lineStart: 1,
        lineEnd: 50,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    validationStatus: 'valid',
    tags: ['short', 'eurusd', 'journal_trade', 'weekly_sell_model', 'pre_london', 'high_confidence', 'dxy_correlation'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-journal-2-gbpusd',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD SHORT — LTF Structure Breakdown + Correlation, Pre-London',
    description: 'GBPUSD SHORT, LTF Structure Breakdown + Correlation, Pre-London session. 0.75 lots, Risk $7.50 (0.075%), Confidence MEDIUM-HIGH. 5 confluences. Lesson: Account for spread on tight stops.',
    content: JSON.stringify({
      trade_type: 'journal',
      model: 'LTF Structure Breakdown + Correlation',
      session: 'Pre-London',
      confidence: 'MEDIUM-HIGH',
      risk_percent: 0.075,
      risk_dollars: 7.50,
      lesson: 'Account for spread on tight stops'
    }, null, 2),
    metadata: {
      market: {
        pair: 'GBPUSD',
        direction: 'sell',
        entry: 1.34310,
        stop_loss: 1.3431,
        target1: 1.3385,
        target2: 1.3220
      },
      setup: {
        setup_type: 'ltf_structure_breakdown',
        direction: 'sell',
        model: 'LTF Structure Breakdown + Correlation',
        session: 'Pre-London'
      },
      execution: {
        position_size: 0.75,
        risk_dollars: 7.50,
        risk_percent: 0.075,
        confidence: 'MEDIUM-HIGH'
      },
      context: {
        session: 'Pre-London',
        confluences: [
          'HTF bearish structure',
          '1H bearish OB holding',
          'LTF structure break',
          'DXY correlation',
          'EU correlation'
        ],
        confluence_count: 5
      },
      meta: {
        example_type: 'journal_plan',
        notes: 'Correlation-based short with multi-timeframe alignment. Lesson learned: Account for spread on tight stops.',
        lessons: [
          'Account for spread on tight stops'
        ]
      }
    },
    sources: [
      {
        filePath: 'Collected_ICT_Data/journal.md',
        lineStart: 51,
        lineEnd: 100,
        uploadId,
        uploadedAt: timestamp
      }
    ],
    validationStatus: 'valid',
    tags: ['short', 'gbpusd', 'journal_trade', 'ltf_structure_breakdown', 'pre_london', 'medium_high_confidence', 'dxy_correlation', 'eu_correlation'],
    createdAt: timestamp,
    updatedAt: timestamp
  },

  // ============================================================
  // BROKER TRADES (58)
  // ============================================================
  {
    id: 'trade-broker-2',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-29',
    description: 'EURUSD BUY, 0.35 lots, WIN $8.75, 0.00025 pips, 3min',
    metadata: {
      ticket: '6795641',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.35,
      entry_price: 1.1735,
      close_price: 1.17375,
      stop_loss: 1.1718,
      take_profit: 1.1778,
      profit: 8.75,
      pips: 0.00025,
      duration_seconds: 191,
      outcome: 'WIN',
      open_time: '2025-09-29 15:43:51',
      close_time: '2025-09-29 15:47:02'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 2, lineEnd: 2, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-3',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-29',
    description: 'GBPUSD BUY, 0.35 lots, WIN $8.05, 0.00023 pips, 5min',
    metadata: {
      ticket: '6795505',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.35,
      entry_price: 1.34439,
      close_price: 1.34462,
      stop_loss: 1.3434,
      take_profit: 0,
      profit: 8.05,
      pips: 0.00023,
      duration_seconds: 276,
      outcome: 'WIN',
      open_time: '2025-09-29 15:42:21',
      close_time: '2025-09-29 15:46:57'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 3, lineEnd: 3, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-4',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-26',
    description: 'EURUSD BUY, 0.50 lots, WIN $27.50, 0.00055 pips, 100min',
    metadata: {
      ticket: '6680195',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.16891,
      close_price: 1.16946,
      stop_loss: 1.1689,
      take_profit: 1.172,
      profit: 27.50,
      pips: 0.00055,
      duration_seconds: 5981,
      outcome: 'WIN',
      open_time: '2025-09-26 16:59:43',
      close_time: '2025-09-26 18:39:24'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 4, lineEnd: 4, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-5',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-26',
    description: 'GBPUSD BUY, 0.25 lots, WIN $59.83, 0.00239 pips, 150min',
    metadata: {
      ticket: '66685415116113',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.33744,
      close_price: 1.33983,
      stop_loss: 1.3375,
      take_profit: 1.341,
      profit: 59.83,
      pips: 0.00239,
      duration_seconds: 9019,
      outcome: 'WIN',
      open_time: '2025-09-26 15:16:54',
      close_time: '2025-09-26 17:47:13'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 5, lineEnd: 5, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-6',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-26',
    description: 'GBPUSD BUY, 0.25 lots, WIN $48.08, 0.00192 pips, 122min',
    metadata: {
      ticket: '66685415112978',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.33744,
      close_price: 1.33936,
      stop_loss: 1.3377,
      take_profit: 1.341,
      profit: 48.08,
      pips: 0.00192,
      duration_seconds: 7310,
      outcome: 'WIN',
      open_time: '2025-09-26 15:16:54',
      close_time: '2025-09-26 17:18:44'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 6, lineEnd: 6, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-7',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-26',
    description: 'GBPUSD BUY, 0.25 lots, WIN $19.08, 0.00076 pips, 97min',
    metadata: {
      ticket: '66685415109704',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.33744,
      close_price: 1.3382,
      stop_loss: 1.3364,
      take_profit: 1.34,
      profit: 19.08,
      pips: 0.00076,
      duration_seconds: 5820,
      outcome: 'WIN',
      open_time: '2025-09-26 15:16:54',
      close_time: '2025-09-26 16:53:54'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 7, lineEnd: 7, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-8',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-26',
    description: 'GBPUSD BUY, 0.25 lots, WIN $62.50, 0.00250 pips, 66min',
    metadata: {
      ticket: '6668541',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.33574,
      close_price: 1.33824,
      stop_loss: 1.3359,
      take_profit: 1.34,
      profit: 62.50,
      pips: 0.0025,
      duration_seconds: 3936,
      outcome: 'WIN',
      open_time: '2025-09-26 15:16:54',
      close_time: '2025-09-26 16:22:30'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 8, lineEnd: 8, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-9',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-26',
    description: 'EURUSD BUY, 0.50 lots, WIN $37.00, 0.00074 pips, 64min',
    metadata: {
      ticket: '6668592',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.16789,
      close_price: 1.16863,
      stop_loss: 1.1674,
      take_profit: 1.172,
      profit: 37.00,
      pips: 0.00074,
      duration_seconds: 3817,
      outcome: 'WIN',
      open_time: '2025-09-26 15:18:43',
      close_time: '2025-09-26 16:22:20'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 9, lineEnd: 9, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-11',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-24',
    description: 'GBPUSD BUY, 0.50 lots, LOSS -$30.00, -0.00060 pips, 57min',
    metadata: {
      ticket: '6550143',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.34475,
      close_price: 1.34415,
      stop_loss: 1.344,
      take_profit: 0,
      profit: -30.00,
      pips: -0.0006,
      duration_seconds: 3395,
      outcome: 'LOSS',
      open_time: '2025-09-24 18:52:58',
      close_time: '2025-09-24 19:49:33'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 11, lineEnd: 11, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-12',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-24',
    description: 'EURUSD BUY, 0.50 lots, LOSS -$7.00, -0.00014 pips, 11min',
    metadata: {
      ticket: '6553021',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.17339,
      close_price: 1.17325,
      stop_loss: 1.17325,
      take_profit: 0,
      profit: -7.00,
      pips: -0.00014,
      duration_seconds: 635,
      outcome: 'LOSS',
      open_time: '2025-09-24 19:38:15',
      close_time: '2025-09-24 19:48:50'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 12, lineEnd: 12, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-13',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-24',
    description: 'EURUSD BUY, 0.75 lots, LOSS -$61.63, -0.00082 pips, 52min',
    metadata: {
      ticket: '65496314989679',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.75,
      entry_price: 1.17416,
      close_price: 1.17334,
      stop_loss: 1.173,
      take_profit: 0,
      profit: -61.63,
      pips: -0.00082,
      duration_seconds: 3094,
      outcome: 'LOSS',
      open_time: '2025-09-24 18:44:28',
      close_time: '2025-09-24 19:36:02'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 13, lineEnd: 13, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-14',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-24',
    description: 'EURUSD BUY, 0.50 lots, LOSS -$14.88, -0.00030 pips, 27min',
    metadata: {
      ticket: '6549631',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.1743,
      close_price: 1.174,
      stop_loss: 1.17315,
      take_profit: 0,
      profit: -14.88,
      pips: -0.0003,
      duration_seconds: 1593,
      outcome: 'LOSS',
      open_time: '2025-09-24 18:44:28',
      close_time: '2025-09-24 19:11:01'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 14, lineEnd: 14, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-15',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-24',
    description: 'EURUSD BUY, 1.00 lots, LOSS -$10.50, -0.00011 pips, 20min',
    metadata: {
      ticket: '6547373',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 1.00,
      entry_price: 1.17417,
      close_price: 1.17406,
      stop_loss: 1.1731,
      take_profit: 0,
      profit: -10.50,
      pips: -0.00011,
      duration_seconds: 1177,
      outcome: 'LOSS',
      open_time: '2025-09-24 18:19:22',
      close_time: '2025-09-24 18:38:59'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 15, lineEnd: 15, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-16',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-24',
    description: 'GBPUSD BUY, 0.75 lots, LOSS -$60.20, -0.00080 pips, 14min',
    metadata: {
      ticket: '6547451',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.75,
      entry_price: 1.34551,
      close_price: 1.34471,
      stop_loss: 1.3444,
      take_profit: 0,
      profit: -60.20,
      pips: -0.0008,
      duration_seconds: 853,
      outcome: 'LOSS',
      open_time: '2025-09-24 18:21:23',
      close_time: '2025-09-24 18:35:36'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 16, lineEnd: 16, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-17',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD SELL — 2025-09-24',
    description: 'EURUSD SELL, 0.50 lots, LOSS -$12.50, -0.00025 pips, 4min',
    metadata: {
      ticket: '6547111',
      pair: 'EURUSD',
      direction: 'SELL',
      volume: 0.50,
      entry_price: 1.17395,
      close_price: 1.1742,
      stop_loss: 1.1747,
      take_profit: 0,
      profit: -12.50,
      pips: -0.00025,
      duration_seconds: 244,
      outcome: 'LOSS',
      open_time: '2025-09-24 18:15:07',
      close_time: '2025-09-24 18:19:11'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 17, lineEnd: 17, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'sell', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-18',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-24',
    description: 'EURUSD BUY, 1.00 lots, LOSS -$90.00, -0.00090 pips, 11min',
    metadata: {
      ticket: '6528648',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 1.00,
      entry_price: 1.17567,
      close_price: 1.17477,
      stop_loss: 1.17475,
      take_profit: 1.17775,
      profit: -90.00,
      pips: -0.0009,
      duration_seconds: 684,
      outcome: 'LOSS',
      open_time: '2025-09-24 15:19:57',
      close_time: '2025-09-24 15:31:21'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 18, lineEnd: 18, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-19',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-24',
    description: 'GBPUSD BUY, 0.25 lots, LOSS -$8.75, -0.00035 pips, 3min',
    metadata: {
      ticket: '6507288',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.35105,
      close_price: 1.3507,
      stop_loss: 1.3506,
      take_profit: 0,
      profit: -8.75,
      pips: -0.00035,
      duration_seconds: 191,
      outcome: 'LOSS',
      open_time: '2025-09-24 08:29:45',
      close_time: '2025-09-24 08:32:56'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 19, lineEnd: 19, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-20',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 1.00 lots, LOSS -$7.22, -0.00007 pips, 309min',
    metadata: {
      ticket: '64856544931088',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 1.00,
      entry_price: 1.18107,
      close_price: 1.181,
      stop_loss: 1.181,
      take_profit: 1.189,
      profit: -7.22,
      pips: -0.00007,
      duration_seconds: 18557,
      outcome: 'LOSS',
      open_time: '2025-09-23 21:55:59',
      close_time: '2025-09-24 03:05:16'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 20, lineEnd: 20, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-21',
    type: 'trade',
    domain: 'trades',
    name: 'EURGBP BUY — 2025-09-23',
    description: 'EURGBP BUY, 1.00 lots, LOSS -$1.35, -0.00001 pips, 6min',
    metadata: {
      ticket: '6488218',
      pair: 'EURGBP',
      direction: 'BUY',
      volume: 1.00,
      entry_price: 0.87361,
      close_price: 0.8736,
      stop_loss: 0.873,
      take_profit: 0,
      profit: -1.35,
      pips: -0.00001,
      duration_seconds: 386,
      outcome: 'LOSS',
      open_time: '2025-09-23 23:35:53',
      close_time: '2025-09-23 23:42:19'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 21, lineEnd: 21, uploadId, uploadedAt: timestamp }],
    tags: ['eurgbp', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-22',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.50 lots, WIN $31.89, 0.00064 pips, 64min',
    metadata: {
      ticket: '64856544928185',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.18107,
      close_price: 1.18171,
      stop_loss: 1.181,
      take_profit: 0,
      profit: 31.89,
      pips: 0.00064,
      duration_seconds: 3857,
      outcome: 'WIN',
      open_time: '2025-09-23 21:55:59',
      close_time: '2025-09-23 23:00:16'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 22, lineEnd: 22, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-23',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.50 lots, WIN $0.50, 0.00001 pips, 4min',
    metadata: {
      ticket: '6487619',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.35249,
      close_price: 1.3525,
      stop_loss: 1.3518,
      take_profit: 0,
      profit: 0.50,
      pips: 0.00001,
      duration_seconds: 218,
      outcome: 'WIN',
      open_time: '2025-09-23 22:47:01',
      close_time: '2025-09-23 22:50:39'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 23, lineEnd: 23, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-24',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.50 lots, WIN $1.33, 0.00003 pips, 9min',
    metadata: {
      ticket: '6485654',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.1812,
      close_price: 1.18123,
      stop_loss: 1.1804,
      take_profit: 0,
      profit: 1.33,
      pips: 0.00003,
      duration_seconds: 518,
      outcome: 'WIN',
      open_time: '2025-09-23 21:55:59',
      close_time: '2025-09-23 22:04:37'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 24, lineEnd: 24, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-25',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 1.50 lots, LOSS -$26.24, -0.00017 pips, 294min',
    metadata: {
      ticket: '64686234925874',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 1.50,
      entry_price: 1.18138,
      close_price: 1.18121,
      stop_loss: 1.1812,
      take_profit: 1.186,
      profit: -26.24,
      pips: -0.00017,
      duration_seconds: 17655,
      outcome: 'LOSS',
      open_time: '2025-09-23 16:58:46',
      close_time: '2025-09-23 21:53:01'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 25, lineEnd: 25, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-26',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.50 lots, LOSS -$17.50, -0.00035 pips, 4min',
    metadata: {
      ticket: '6485185',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.35205,
      close_price: 1.3517,
      stop_loss: 1.3517,
      take_profit: 0,
      profit: -17.50,
      pips: -0.00035,
      duration_seconds: 227,
      outcome: 'LOSS',
      open_time: '2025-09-23 21:48:24',
      close_time: '2025-09-23 21:52:11'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 26, lineEnd: 26, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-27',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.50 lots, WIN $19.76, 0.00040 pips, 283min',
    metadata: {
      ticket: '64686234925540',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.18087,
      close_price: 1.18127,
      stop_loss: 1.1804,
      take_profit: 1.183,
      profit: 19.76,
      pips: 0.0004,
      duration_seconds: 16971,
      outcome: 'WIN',
      open_time: '2025-09-23 16:58:46',
      close_time: '2025-09-23 21:41:37'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 27, lineEnd: 27, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-28',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 1.00 lots, WIN $34.52, 0.00035 pips, 279min',
    metadata: {
      ticket: '64686234925474',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 1.00,
      entry_price: 1.18087,
      close_price: 1.18122,
      stop_loss: 1.1806,
      take_profit: 1.183,
      profit: 34.52,
      pips: 0.00035,
      duration_seconds: 16719,
      outcome: 'WIN',
      open_time: '2025-09-23 16:58:46',
      close_time: '2025-09-23 21:37:25'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 28, lineEnd: 28, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-29',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.25 lots, WIN $18.76, 0.00075 pips, 266min',
    metadata: {
      ticket: '64686234925279',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.18041,
      close_price: 1.18116,
      stop_loss: 1.1804,
      take_profit: 1.183,
      profit: 18.76,
      pips: 0.00075,
      duration_seconds: 15978,
      outcome: 'WIN',
      open_time: '2025-09-23 16:58:46',
      close_time: '2025-09-23 21:25:04'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 29, lineEnd: 29, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-30',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.50 lots, LOSS -$14.00, -0.00028 pips, 19min',
    metadata: {
      ticket: '6484234',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.35168,
      close_price: 1.3514,
      stop_loss: 1.3514,
      take_profit: 0,
      profit: -14.00,
      pips: -0.00028,
      duration_seconds: 1116,
      outcome: 'LOSS',
      open_time: '2025-09-23 21:05:02',
      close_time: '2025-09-23 21:23:38'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 30, lineEnd: 30, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-31',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.50 lots, LOSS -$16.50, -0.00033 pips, 16min',
    metadata: {
      ticket: '6481684',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.35225,
      close_price: 1.35192,
      stop_loss: 1.3519,
      take_profit: 0,
      profit: -16.50,
      pips: -0.00033,
      duration_seconds: 956,
      outcome: 'LOSS',
      open_time: '2025-09-23 20:04:02',
      close_time: '2025-09-23 20:19:58'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 31, lineEnd: 31, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-32',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.75 lots, LOSS -$17.88, -0.00024 pips, 27min',
    metadata: {
      ticket: '64798244922207',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.75,
      entry_price: 1.35212,
      close_price: 1.35188,
      stop_loss: 1.3514,
      take_profit: 0,
      profit: -17.88,
      pips: -0.00024,
      duration_seconds: 1621,
      outcome: 'LOSS',
      open_time: '2025-09-23 19:35:13',
      close_time: '2025-09-23 20:02:14'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 32, lineEnd: 32, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-33',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.25 lots, WIN $13.78, 0.00055 pips, 172min',
    metadata: {
      ticket: '64686234921686',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.18008,
      close_price: 1.18063,
      stop_loss: 1.1789,
      take_profit: 0,
      profit: 13.78,
      pips: 0.00055,
      duration_seconds: 10335,
      outcome: 'WIN',
      open_time: '2025-09-23 16:58:46',
      close_time: '2025-09-23 19:51:01'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 33, lineEnd: 33, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-34',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.25 lots, WIN $4.83, 0.00019 pips, 159min',
    metadata: {
      ticket: '64686234920863',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.17962,
      close_price: 1.17981,
      stop_loss: 1.179,
      take_profit: 0,
      profit: 4.83,
      pips: 0.00019,
      duration_seconds: 9526,
      outcome: 'WIN',
      open_time: '2025-09-23 16:58:46',
      close_time: '2025-09-23 19:37:32'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 34, lineEnd: 34, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-35',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.25 lots, LOSS -$24.13, -0.00097 pips, 2min',
    metadata: {
      ticket: '6479824',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.35178,
      close_price: 1.35081,
      stop_loss: 1.35,
      take_profit: 0,
      profit: -24.13,
      pips: -0.00097,
      duration_seconds: 96,
      outcome: 'LOSS',
      open_time: '2025-09-23 19:35:13',
      close_time: '2025-09-23 19:36:49'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 35, lineEnd: 35, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-36',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.50 lots, LOSS -$30.00, -0.00060 pips, 8min',
    metadata: {
      ticket: '6479480',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.3521,
      close_price: 1.3515,
      stop_loss: 1.3515,
      take_profit: 0,
      profit: -30.00,
      pips: -0.0006,
      duration_seconds: 509,
      outcome: 'LOSS',
      open_time: '2025-09-23 19:26:35',
      close_time: '2025-09-23 19:35:04'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 36, lineEnd: 36, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-37',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.25 lots, WIN $6.08, 0.00024 pips, 121min',
    metadata: {
      ticket: '64686234918753',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.17962,
      close_price: 1.17986,
      stop_loss: 1.179,
      take_profit: 0,
      profit: 6.08,
      pips: 0.00024,
      duration_seconds: 7240,
      outcome: 'WIN',
      open_time: '2025-09-23 16:58:46',
      close_time: '2025-09-23 18:59:26'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 37, lineEnd: 37, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-38',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.50 lots, LOSS -$7.50, -0.00015 pips, 89min',
    metadata: {
      ticket: '64721384918397',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.35157,
      close_price: 1.35142,
      stop_loss: 1.3508,
      take_profit: 0,
      profit: -7.50,
      pips: -0.00015,
      duration_seconds: 5368,
      outcome: 'LOSS',
      open_time: '2025-09-23 17:21:51',
      close_time: '2025-09-23 18:51:19'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 38, lineEnd: 38, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-39',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.25 lots, LOSS -$1.25, -0.00005 pips, 60min',
    metadata: {
      ticket: '64721384916981',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.35189,
      close_price: 1.35184,
      stop_loss: 1.3506,
      take_profit: 0,
      profit: -1.25,
      pips: -0.00005,
      duration_seconds: 3578,
      outcome: 'LOSS',
      open_time: '2025-09-23 17:21:51',
      close_time: '2025-09-23 18:21:29'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 39, lineEnd: 39, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-40',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.50 lots, LOSS -$9.00, -0.00018 pips, 56min',
    metadata: {
      ticket: '64686234915483',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.17983,
      close_price: 1.17965,
      stop_loss: 1.1785,
      take_profit: 0,
      profit: -9.00,
      pips: -0.00018,
      duration_seconds: 3334,
      outcome: 'LOSS',
      open_time: '2025-09-23 16:58:46',
      close_time: '2025-09-23 17:54:20'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 40, lineEnd: 40, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-41',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.25 lots, WIN $0.50, 0.00002 pips, 28min',
    metadata: {
      ticket: '6472138',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.35172,
      close_price: 1.35174,
      stop_loss: 1.3512,
      take_profit: 0,
      profit: 0.50,
      pips: 0.00002,
      duration_seconds: 1679,
      outcome: 'WIN',
      open_time: '2025-09-23 17:21:51',
      close_time: '2025-09-23 17:49:50'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 41, lineEnd: 41, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-42',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.75 lots, LOSS -$22.88, -0.00031 pips, 22min',
    metadata: {
      ticket: '64686864913094',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.75,
      entry_price: 1.35208,
      close_price: 1.35177,
      stop_loss: 1.3518,
      take_profit: 0,
      profit: -22.88,
      pips: -0.00031,
      duration_seconds: 1327,
      outcome: 'LOSS',
      open_time: '2025-09-23 16:59:10',
      close_time: '2025-09-23 17:21:17'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 42, lineEnd: 42, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-43',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.25 lots, WIN $8.12, 0.00033 pips, 11min',
    metadata: {
      ticket: '6468686',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.35151,
      close_price: 1.35183,
      stop_loss: 1.3507,
      take_profit: 0,
      profit: 8.12,
      pips: 0.00033,
      duration_seconds: 682,
      outcome: 'WIN',
      open_time: '2025-09-23 16:59:10',
      close_time: '2025-09-23 17:10:32'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 43, lineEnd: 43, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-44',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.50 lots, LOSS -$11.50, -0.00023 pips, 5min',
    metadata: {
      ticket: '6468623',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.18,
      close_price: 1.17977,
      stop_loss: 1.1785,
      take_profit: 0,
      profit: -11.50,
      pips: -0.00023,
      duration_seconds: 278,
      outcome: 'LOSS',
      open_time: '2025-09-23 16:58:46',
      close_time: '2025-09-23 17:03:24'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 44, lineEnd: 44, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-45',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 1.00 lots, LOSS -$5.00, -0.00005 pips, 41min',
    metadata: {
      ticket: '64612174904891',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 1.00,
      entry_price: 1.17971,
      close_price: 1.17966,
      stop_loss: 1.179,
      take_profit: 0,
      profit: -5.00,
      pips: -0.00005,
      duration_seconds: 2444,
      outcome: 'LOSS',
      open_time: '2025-09-23 15:30:29',
      close_time: '2025-09-23 16:11:13'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 45, lineEnd: 45, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-46',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.50 lots, WIN $40.50, 0.00081 pips, 36min',
    metadata: {
      ticket: '64612174904658',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.17951,
      close_price: 1.18032,
      stop_loss: 1.1795,
      take_profit: 0,
      profit: 40.50,
      pips: 0.00081,
      duration_seconds: 2158,
      outcome: 'WIN',
      open_time: '2025-09-23 15:30:29',
      close_time: '2025-09-23 16:06:27'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 46, lineEnd: 46, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-47',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.50 lots, WIN $12.00, 0.00024 pips, 5min',
    metadata: {
      ticket: '6462760',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.3531,
      close_price: 1.35334,
      stop_loss: 1.3523,
      take_profit: 0,
      profit: 12.00,
      pips: 0.00024,
      duration_seconds: 270,
      outcome: 'WIN',
      open_time: '2025-09-23 16:01:23',
      close_time: '2025-09-23 16:05:53'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 47, lineEnd: 47, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-48',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.50 lots, WIN $10.50, 0.00021 pips, 4min',
    metadata: {
      ticket: '6461217',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.17892,
      close_price: 1.17913,
      stop_loss: 1.1785,
      take_profit: 0,
      profit: 10.50,
      pips: 0.00021,
      duration_seconds: 262,
      outcome: 'WIN',
      open_time: '2025-09-23 15:30:29',
      close_time: '2025-09-23 15:34:51'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 48, lineEnd: 48, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-49',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.75 lots, LOSS -$9.50, -0.00013 pips, 45min',
    metadata: {
      ticket: '64555524898818',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.75,
      entry_price: 1.17965,
      close_price: 1.17952,
      stop_loss: 1.179,
      take_profit: 0,
      profit: -9.50,
      pips: -0.00013,
      duration_seconds: 2693,
      outcome: 'LOSS',
      open_time: '2025-09-23 13:30:28',
      close_time: '2025-09-23 14:15:21'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 49, lineEnd: 49, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-50',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.50 lots, WIN $3.50, 0.00007 pips, 10min',
    metadata: {
      ticket: '6456581',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.35139,
      close_price: 1.35146,
      stop_loss: 1.3512,
      take_profit: 0,
      profit: 3.50,
      pips: 0.00007,
      duration_seconds: 621,
      outcome: 'WIN',
      open_time: '2025-09-23 14:03:28',
      close_time: '2025-09-23 14:13:49'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 50, lineEnd: 50, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-51',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.75 lots, WIN $19.00, 0.00025 pips, 41min',
    metadata: {
      ticket: '6455552',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.75,
      entry_price: 1.17965,
      close_price: 1.1799,
      stop_loss: 1.17845,
      take_profit: 0,
      profit: 19.00,
      pips: 0.00025,
      duration_seconds: 2443,
      outcome: 'WIN',
      open_time: '2025-09-23 13:30:28',
      close_time: '2025-09-23 14:11:11'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 51, lineEnd: 51, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-52',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-23',
    description: 'GBPUSD BUY, 0.50 lots, LOSS -$8.50, -0.00017 pips, 40min',
    metadata: {
      ticket: '6454742',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.3513,
      close_price: 1.35113,
      stop_loss: 1.3498,
      take_profit: 1.359,
      profit: -8.50,
      pips: -0.00017,
      duration_seconds: 2418,
      outcome: 'LOSS',
      open_time: '2025-09-23 13:16:00',
      close_time: '2025-09-23 13:56:18'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 52, lineEnd: 52, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-53',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 1.50 lots, LOSS -$129.00, -0.00086 pips, 49min',
    metadata: {
      ticket: '6452731',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 1.50,
      entry_price: 1.18046,
      close_price: 1.1796,
      stop_loss: 1.1784,
      take_profit: 1.2,
      profit: -129.00,
      pips: -0.00086,
      duration_seconds: 2929,
      outcome: 'LOSS',
      open_time: '2025-09-23 12:36:49',
      close_time: '2025-09-23 13:25:38'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 53, lineEnd: 53, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-54',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-23',
    description: 'EURUSD BUY, 0.75 lots, WIN $45.00, 0.00060 pips, 1min',
    metadata: {
      ticket: '6444228',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.75,
      entry_price: 1.17873,
      close_price: 1.17933,
      stop_loss: 1.178,
      take_profit: 0,
      profit: 45.00,
      pips: 0.0006,
      duration_seconds: 60,
      outcome: 'WIN',
      open_time: '2025-09-23 10:29:38',
      close_time: '2025-09-23 10:30:38'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 54, lineEnd: 54, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-55',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-19',
    description: 'EURUSD BUY, 0.50 lots, LOSS -$20.50, -0.00041 pips, 8min',
    metadata: {
      ticket: '6346089',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.17517,
      close_price: 1.17476,
      stop_loss: 1.1744,
      take_profit: 0,
      profit: -20.50,
      pips: -0.00041,
      duration_seconds: 480,
      outcome: 'LOSS',
      open_time: '2025-09-19 18:58:21',
      close_time: '2025-09-19 19:06:21'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 55, lineEnd: 55, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-56',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-19',
    description: 'GBPUSD BUY, 0.40 lots, LOSS -$30.40, -0.00076 pips, 6min',
    metadata: {
      ticket: '6346192',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.40,
      entry_price: 1.34848,
      close_price: 1.34772,
      stop_loss: 1.3474,
      take_profit: 0,
      profit: -30.40,
      pips: -0.00076,
      duration_seconds: 337,
      outcome: 'LOSS',
      open_time: '2025-09-19 19:00:39',
      close_time: '2025-09-19 19:06:16'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 56, lineEnd: 56, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-57',
    type: 'trade',
    domain: 'trades',
    name: 'GBPUSD BUY — 2025-09-19',
    description: 'GBPUSD BUY, 0.20 lots, LOSS -$16.00, -0.00080 pips, 44min',
    metadata: {
      ticket: '6342343',
      pair: 'GBPUSD',
      direction: 'BUY',
      volume: 0.20,
      entry_price: 1.34822,
      close_price: 1.34742,
      stop_loss: 1.3463,
      take_profit: 1.358,
      profit: -16.00,
      pips: -0.0008,
      duration_seconds: 2634,
      outcome: 'LOSS',
      open_time: '2025-09-19 17:57:51',
      close_time: '2025-09-19 18:41:45'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 57, lineEnd: 57, uploadId, uploadedAt: timestamp }],
    tags: ['gbpusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-58',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-19',
    description: 'EURUSD BUY, 0.75 lots, LOSS -$44.00, -0.00059 pips, 43min',
    metadata: {
      ticket: '6342403',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.75,
      entry_price: 1.17482,
      close_price: 1.17423,
      stop_loss: 1.173,
      take_profit: 0,
      profit: -44.00,
      pips: -0.00059,
      duration_seconds: 2577,
      outcome: 'LOSS',
      open_time: '2025-09-19 17:58:43',
      close_time: '2025-09-19 18:41:40'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 58, lineEnd: 58, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-59',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-19',
    description: 'EURUSD BUY, 0.25 lots, LOSS -$17.25, -0.00069 pips, 10min',
    metadata: {
      ticket: '6313624',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.25,
      entry_price: 1.17744,
      close_price: 1.17675,
      stop_loss: 1.1748,
      take_profit: 1.188,
      profit: -17.25,
      pips: -0.00069,
      duration_seconds: 618,
      outcome: 'LOSS',
      open_time: '2025-09-19 09:42:18',
      close_time: '2025-09-19 09:52:36'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 59, lineEnd: 59, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'loss', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'trade-broker-60',
    type: 'trade',
    domain: 'trades',
    name: 'EURUSD BUY — 2025-09-17',
    description: 'EURUSD BUY, 0.50 lots, WIN $375.00, 0.00750 pips, 474min',
    metadata: {
      ticket: '6169511',
      pair: 'EURUSD',
      direction: 'BUY',
      volume: 0.50,
      entry_price: 1.18354,
      close_price: 1.19104,
      stop_loss: 1.1835,
      take_profit: 1.191,
      profit: 375.00,
      pips: 0.0075,
      duration_seconds: 28416,
      outcome: 'WIN',
      open_time: '2025-09-17 13:15:21',
      close_time: '2025-09-17 21:08:57'
    },
    sources: [{ filePath: 'Collected_ICT_Data/connected_trades.csv', lineStart: 60, lineEnd: 60, uploadId, uploadedAt: timestamp }],
    tags: ['eurusd', 'buy', 'win', 'broker_trade', 'september_2025'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
];
