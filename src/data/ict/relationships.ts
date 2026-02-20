import type { Relationship } from '../../lib/types';

const timestamp = new Date().toISOString();

export const ICT_RELATIONSHIPS: Relationship[] = [
  // ===== CONCEPT_PREREQUISITE (11 edges) =====
  {
    id: 'rel-prereq-displacement-fvg',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-displacement',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement must be understood before identifying fair value gaps',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-prereq-displacement-orderblock',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-displacement',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement is prerequisite to understanding order blocks',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-prereq-displacement-mss',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-displacement',
    targetId: 'concept-market-structure',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement precedes market structure shifts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-prereq-liquidity-displacement',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-liquidity',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Understanding liquidity is prerequisite to displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-prereq-marketstructure-bos',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-market-structure',
    targetId: 'concept-bos',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure understanding precedes break of structure',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-prereq-marketstructure-smsmss',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-market-structure',
    targetId: 'concept-sms-mss',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure is prerequisite to understanding shifts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-prereq-fvg-inversionfvg',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-fvg',
    targetId: 'concept-inversion-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'FVG understanding precedes inversion FVG',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-prereq-fvg-pdarray',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-fvg',
    targetId: 'concept-pd-array',
    createdAt: timestamp,
    metadata: {
      description: 'FVG is prerequisite to PD array understanding',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-prereq-orderblock-breakerblock',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-order-block',
    targetId: 'concept-breaker-block',
    createdAt: timestamp,
    metadata: {
      description: 'Order block understanding precedes breaker blocks',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-prereq-orderblock-pdarray',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-order-block',
    targetId: 'concept-pd-array',
    createdAt: timestamp,
    metadata: {
      description: 'Order blocks are prerequisite to PD array',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-prereq-liquidityvoid-displacement',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-liquidity-void',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity void understanding precedes displacement',
      updatedAt: timestamp
    }
  },

  // ===== CONCEPT_RELATED_TO (30 edges - bidirectional) =====
  {
    id: 'rel-related-fvg-orderblock-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-fvg',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'FVG and order blocks often occur together in price action',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-orderblock-fvg-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-order-block',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Order blocks and FVG are closely related concepts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-bos-smsmss-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bos',
    targetId: 'concept-sms-mss',
    createdAt: timestamp,
    metadata: {
      description: 'BOS and SMS/MSS are related market structure concepts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-smsmss-bos-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-sms-mss',
    targetId: 'concept-bos',
    createdAt: timestamp,
    metadata: {
      description: 'SMS/MSS and BOS are complementary concepts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-smsmss-choch-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-sms-mss',
    targetId: 'concept-choch',
    createdAt: timestamp,
    metadata: {
      description: 'SMS/MSS and CHOCH represent similar market shifts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-choch-smsmss-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-choch',
    targetId: 'concept-sms-mss',
    createdAt: timestamp,
    metadata: {
      description: 'CHOCH and SMS/MSS are interrelated concepts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-bos-choch-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bos',
    targetId: 'concept-choch',
    createdAt: timestamp,
    metadata: {
      description: 'BOS and CHOCH represent different types of structure breaks',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-choch-bos-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-choch',
    targetId: 'concept-bos',
    createdAt: timestamp,
    metadata: {
      description: 'CHOCH and BOS are complementary structure concepts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-ote-fvg-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ote',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'OTE zones often contain FVGs',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-fvg-ote-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-fvg',
    targetId: 'concept-ote',
    createdAt: timestamp,
    metadata: {
      description: 'FVGs are often found in OTE zones',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-ote-orderblock-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ote',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'OTE zones align with order blocks',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-orderblock-ote-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-order-block',
    targetId: 'concept-ote',
    createdAt: timestamp,
    metadata: {
      description: 'Order blocks often fall within OTE zones',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-killzones-macrotimes-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-killzones',
    targetId: 'concept-macro-times',
    createdAt: timestamp,
    metadata: {
      description: 'Killzones and macro times define trading windows',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-macrotimes-killzones-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-macro-times',
    targetId: 'concept-killzones',
    createdAt: timestamp,
    metadata: {
      description: 'Macro times are specific periods within killzones',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-smt-liquidity-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-smt',
    targetId: 'concept-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'SMT divergences indicate liquidity manipulation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-liquidity-smt-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity',
    targetId: 'concept-smt',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity concepts relate to SMT analysis',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-premiumdiscount-ote-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-premium-discount',
    targetId: 'concept-ote',
    createdAt: timestamp,
    metadata: {
      description: 'Premium/discount zones define OTE levels',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-ote-premiumdiscount-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ote',
    targetId: 'concept-premium-discount',
    createdAt: timestamp,
    metadata: {
      description: 'OTE is based on premium/discount analysis',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-ipda-killzones-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda',
    targetId: 'concept-killzones',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA analysis uses killzone timing',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-killzones-ipda-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-killzones',
    targetId: 'concept-ipda',
    createdAt: timestamp,
    metadata: {
      description: 'Killzones are part of IPDA framework',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-ipda-macrotimes-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda',
    targetId: 'concept-macro-times',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA framework includes macro timing',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-macrotimes-ipda-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-macro-times',
    targetId: 'concept-ipda',
    createdAt: timestamp,
    metadata: {
      description: 'Macro times are part of IPDA analysis',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-bpr-liquidityvoid-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bpr',
    targetId: 'concept-liquidity-void',
    createdAt: timestamp,
    metadata: {
      description: 'BPR and liquidity voids represent similar concepts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-liquidityvoid-bpr-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity-void',
    targetId: 'concept-bpr',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity voids relate to balanced price ranges',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-liquidityvoid-mitigationblock-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity-void',
    targetId: 'concept-mitigation-block',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity voids are filled by mitigation blocks',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-mitigationblock-liquidityvoid-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-mitigation-block',
    targetId: 'concept-liquidity-void',
    createdAt: timestamp,
    metadata: {
      description: 'Mitigation blocks address liquidity voids',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-bpr-mitigationblock-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bpr',
    targetId: 'concept-mitigation-block',
    createdAt: timestamp,
    metadata: {
      description: 'BPR and mitigation blocks are related concepts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-mitigationblock-bpr-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-mitigation-block',
    targetId: 'concept-bpr',
    createdAt: timestamp,
    metadata: {
      description: 'Mitigation blocks relate to balanced price ranges',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-powerofthree-dailybias-1',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-power-of-three',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'Power of Three unfolds according to daily bias',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-related-dailybias-powerofthree-2',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-daily-bias',
    targetId: 'concept-power-of-three',
    createdAt: timestamp,
    metadata: {
      description: 'Daily bias guides Power of Three execution',
      updatedAt: timestamp
    }
  },

  // ===== CONCEPT_USED_IN_MODEL (27 edges) =====
  {
    id: 'rel-used-displacement-silverbullet',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-displacement',
    targetId: 'model-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement is key component of Silver Bullet',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-fvg-silverbullet',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-fvg',
    targetId: 'model-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'FVG is used in Silver Bullet identification',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-liquidity-silverbullet',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-liquidity',
    targetId: 'model-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity sweep is part of Silver Bullet',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-mss-silverbullet',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-market-structure',
    targetId: 'model-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure shift validates Silver Bullet',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-killzones-silverbullet',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-killzones',
    targetId: 'model-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'Killzones define Silver Bullet timing',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-displacement-judasswing',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-displacement',
    targetId: 'model-judas-swing',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement occurs in Judas Swing reversal',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-liquidity-judasswing',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-liquidity',
    targetId: 'model-judas-swing',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity grab is part of Judas Swing',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-powerofthree-judasswing',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-power-of-three',
    targetId: 'model-judas-swing',
    createdAt: timestamp,
    metadata: {
      description: 'Judas Swing follows Power of Three structure',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-powerofthree-ict2022',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-power-of-three',
    targetId: 'model-ict-2022',
    createdAt: timestamp,
    metadata: {
      description: 'Power of Three is core to ICT 2022 model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-displacement-ict2022',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-displacement',
    targetId: 'model-ict-2022',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement validates ICT 2022 moves',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-fvg-ict2022',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-fvg',
    targetId: 'model-ict-2022',
    createdAt: timestamp,
    metadata: {
      description: 'FVG is used in ICT 2022 framework',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-liquidity-ict2022',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-liquidity',
    targetId: 'model-ict-2022',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity concepts are central to ICT 2022',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-orderblock-unicorn',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-order-block',
    targetId: 'model-unicorn',
    createdAt: timestamp,
    metadata: {
      description: 'Order blocks define Unicorn entry zones',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-fvg-unicorn',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-fvg',
    targetId: 'model-unicorn',
    createdAt: timestamp,
    metadata: {
      description: 'FVG is part of Unicorn setup',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-dailybias-unicorn',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-daily-bias',
    targetId: 'model-unicorn',
    createdAt: timestamp,
    metadata: {
      description: 'Daily bias directs Unicorn trades',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-liquidity-turtlesoup',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-liquidity',
    targetId: 'model-turtle-soup',
    createdAt: timestamp,
    metadata: {
      description: 'Turtle Soup exploits liquidity traps',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-displacement-oteretracement',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-displacement',
    targetId: 'model-ote-retracement',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement precedes OTE retracement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-fvg-oteretracement',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-fvg',
    targetId: 'model-ote-retracement',
    createdAt: timestamp,
    metadata: {
      description: 'FVG appears in OTE retracement zones',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-ote-oteretracement',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ote',
    targetId: 'model-ote-retracement',
    createdAt: timestamp,
    metadata: {
      description: 'OTE defines the retracement levels',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-liquidity-breakerblockreversal',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-liquidity',
    targetId: 'model-breaker-block-reversal',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity grab triggers breaker block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-displacement-breakerblockreversal',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-displacement',
    targetId: 'model-breaker-block-reversal',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement confirms breaker block reversal',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-breakerblock-breakerblockreversal',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-breaker-block',
    targetId: 'model-breaker-block-reversal',
    createdAt: timestamp,
    metadata: {
      description: 'Breaker block is core to the reversal model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-marketstructure-htfltfprocess',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-market-structure',
    targetId: 'model-htf-ltf-process',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure analyzed across timeframes',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-killzones-htfltfprocess',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-killzones',
    targetId: 'model-htf-ltf-process',
    createdAt: timestamp,
    metadata: {
      description: 'Killzones used in HTF/LTF alignment',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-displacement-htfltfprocess',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-displacement',
    targetId: 'model-htf-ltf-process',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement validates HTF/LTF alignment',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-ote-htfltfprocess',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ote',
    targetId: 'model-htf-ltf-process',
    createdAt: timestamp,
    metadata: {
      description: 'OTE zones guide HTF/LTF entries',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-used-ipda-htfltfprocess',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ipda',
    targetId: 'model-htf-ltf-process',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA framework spans HTF/LTF analysis',
      updatedAt: timestamp
    }
  },

  // ===== MODEL_PRODUCES_TRADE (6 edges) =====
  {
    id: 'rel-produces-silverbullet-gbpusd1',
    type: 'MODEL_PRODUCES_TRADE',
    sourceId: 'model-silver-bullet',
    targetId: 'trade-gbpusd-2025-09-26-1',
    createdAt: timestamp,
    metadata: {
      description: 'Silver Bullet model produced GBPUSD trade 1',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-produces-silverbullet-gbpusd2',
    type: 'MODEL_PRODUCES_TRADE',
    sourceId: 'model-silver-bullet',
    targetId: 'trade-gbpusd-2025-09-26-2',
    createdAt: timestamp,
    metadata: {
      description: 'Silver Bullet model produced GBPUSD trade 2',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-produces-silverbullet-gbpusd3',
    type: 'MODEL_PRODUCES_TRADE',
    sourceId: 'model-silver-bullet',
    targetId: 'trade-gbpusd-2025-09-26-3',
    createdAt: timestamp,
    metadata: {
      description: 'Silver Bullet model produced GBPUSD trade 3',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-produces-silverbullet-gbpusd4',
    type: 'MODEL_PRODUCES_TRADE',
    sourceId: 'model-silver-bullet',
    targetId: 'trade-gbpusd-2025-09-26-4',
    createdAt: timestamp,
    metadata: {
      description: 'Silver Bullet model produced GBPUSD trade 4',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-produces-silverbullet-eurusd1',
    type: 'MODEL_PRODUCES_TRADE',
    sourceId: 'model-silver-bullet',
    targetId: 'trade-eurusd-2025-09-26-1',
    createdAt: timestamp,
    metadata: {
      description: 'Silver Bullet model produced EURUSD trade',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-produces-ict2022-eurusd2',
    type: 'MODEL_PRODUCES_TRADE',
    sourceId: 'model-ict-2022',
    targetId: 'trade-eurusd-2025-09-30-1',
    createdAt: timestamp,
    metadata: {
      description: 'ICT 2022 model produced EURUSD trade',
      updatedAt: timestamp
    }
  },

  // ===== TRADE_USES_CONCEPT (28 edges) =====
  // GBPUSD trades use: fvg, order-block, liquidity, displacement
  {
    id: 'rel-tradeuses-gbpusd1-fvg',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-1',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Trade identified FVG entry zone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd1-orderblock',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-1',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Trade used order block for entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd1-liquidity',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-1',
    targetId: 'concept-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Trade exploited liquidity sweep',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd1-displacement',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-1',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Trade validated by displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd2-fvg',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-2',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Trade identified FVG entry zone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd2-orderblock',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-2',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Trade used order block for entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd2-liquidity',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-2',
    targetId: 'concept-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Trade exploited liquidity sweep',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd2-displacement',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-2',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Trade validated by displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd3-fvg',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-3',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Trade identified FVG entry zone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd3-orderblock',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-3',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Trade used order block for entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd3-liquidity',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-3',
    targetId: 'concept-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Trade exploited liquidity sweep',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd3-displacement',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-3',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Trade validated by displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd4-fvg',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-4',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Trade identified FVG entry zone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd4-orderblock',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-4',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Trade used order block for entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd4-liquidity',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-4',
    targetId: 'concept-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Trade exploited liquidity sweep',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-gbpusd4-displacement',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-gbpusd-2025-09-26-4',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Trade validated by displacement',
      updatedAt: timestamp
    }
  },
  // EURUSD trades use: fvg, displacement
  {
    id: 'rel-tradeuses-eurusd1-fvg',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-26-1',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Trade identified FVG entry zone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusd1-displacement',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-26-1',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Trade validated by displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusd2-fvg',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-30-1',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Trade identified FVG entry zone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusd2-displacement',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-30-1',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Trade validated by displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusdearly-fvg',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-26-early',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Trade identified FVG entry zone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusdearly-displacement',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-26-early',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Trade validated by displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusdearly-liquidity',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-26-early',
    targetId: 'concept-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Trade exploited liquidity sweep',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusdearly-orderblock',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-26-early',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Trade used order block for entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusdearly-killzones',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-26-early',
    targetId: 'concept-killzones',
    createdAt: timestamp,
    metadata: {
      description: 'Trade executed during London killzone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusdearly-ote',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-26-early',
    targetId: 'concept-ote',
    createdAt: timestamp,
    metadata: {
      description: 'Trade entered at OTE level',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusdearly-marketstructure',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-26-early',
    targetId: 'concept-market-structure',
    createdAt: timestamp,
    metadata: {
      description: 'Trade aligned with market structure',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-tradeuses-eurusdearly-bos',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-eurusd-2025-09-26-early',
    targetId: 'concept-bos',
    createdAt: timestamp,
    metadata: {
      description: 'Trade confirmed by break of structure',
      updatedAt: timestamp
    }
  },

  // ===== SCHEMA_VALIDATES (3 edges) =====
  {
    id: 'rel-validates-schema-tradesignal-gbpusd1',
    type: 'SCHEMA_VALIDATES',
    sourceId: 'schema-trade-signal',
    targetId: 'trade-gbpusd-2025-09-26-1',
    createdAt: timestamp,
    metadata: {
      description: 'Trade signal schema validates GBPUSD trade structure',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-validates-schema-conceptencoding-fvg',
    type: 'SCHEMA_VALIDATES',
    sourceId: 'schema-concept-encoding',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Schema validates FVG concept encoding',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-validates-schema-conceptencoding-orderblock',
    type: 'SCHEMA_VALIDATES',
    sourceId: 'schema-concept-encoding',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Schema validates order block concept encoding',
      updatedAt: timestamp
    }
  },

  // ===== DOCUMENT_DEFINES (35 edges) =====
  // document-ict-master-library → all core concepts
  {
    id: 'rel-defines-masterlibrary-marketstructure',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-market-structure',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines market structure concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-bos',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-bos',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines BOS concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-smsmss',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-sms-mss',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines SMS/MSS concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-choch',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-choch',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines CHOCH concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-fvg',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines FVG concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-orderblock',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines order block concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-displacement',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines displacement concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-liquidity',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines liquidity concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-ote',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-ote',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines OTE concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-premiumdiscount',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-premium-discount',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines premium/discount concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-breakerblock',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-breaker-block',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines breaker block concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-mitigationblock',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-mitigation-block',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines mitigation block concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-bpr',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-bpr',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines BPR concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-liquidityvoid',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-liquidity-void',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines liquidity void concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-pdarray',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-pd-array',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines PD array concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-inversionfvg',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-inversion-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines inversion FVG concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-smt',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-smt',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines SMT concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-ipda',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-ipda',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines IPDA concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-killzones',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-killzones',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines killzones concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-macrotimes',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-macro-times',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines macro times concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-dailybias',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines daily bias concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-powerofthree',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-power-of-three',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines power of three concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-volumeimbalance',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-volume-imbalance',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines volume imbalance concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-rejectionblock',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-rejection-block',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines rejection block concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-masterlibrary-institutionalorderflow',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-institutional-order-flow',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines institutional order flow concept',
      updatedAt: timestamp
    }
  },
  // document-concept-relationships → all models
  {
    id: 'rel-defines-conceptrelationships-silverbullet',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concept-relationships',
    targetId: 'model-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'Relationships document defines Silver Bullet model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-conceptrelationships-judasswing',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concept-relationships',
    targetId: 'model-judas-swing',
    createdAt: timestamp,
    metadata: {
      description: 'Relationships document defines Judas Swing model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-conceptrelationships-ict2022',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concept-relationships',
    targetId: 'model-ict-2022',
    createdAt: timestamp,
    metadata: {
      description: 'Relationships document defines ICT 2022 model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-conceptrelationships-unicorn',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concept-relationships',
    targetId: 'model-unicorn',
    createdAt: timestamp,
    metadata: {
      description: 'Relationships document defines Unicorn model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-conceptrelationships-turtlesoup',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concept-relationships',
    targetId: 'model-turtle-soup',
    createdAt: timestamp,
    metadata: {
      description: 'Relationships document defines Turtle Soup model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-conceptrelationships-oteretracement',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concept-relationships',
    targetId: 'model-ote-retracement',
    createdAt: timestamp,
    metadata: {
      description: 'Relationships document defines OTE Retracement model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-conceptrelationships-breakerblockreversal',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concept-relationships',
    targetId: 'model-breaker-block-reversal',
    createdAt: timestamp,
    metadata: {
      description: 'Relationships document defines Breaker Block Reversal model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-conceptrelationships-htfltfprocess',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concept-relationships',
    targetId: 'model-htf-ltf-process',
    createdAt: timestamp,
    metadata: {
      description: 'Relationships document defines HTF/LTF Process model',
      updatedAt: timestamp
    }
  },
  // document-ict-learning-system → code modules
  {
    id: 'rel-defines-learningsystem-fvgdetection',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-learning-system',
    targetId: 'code-fvg-detection',
    createdAt: timestamp,
    metadata: {
      description: 'Learning system document defines FVG detection code',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-defines-learningsystem-swingdetection',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-learning-system',
    targetId: 'code-swing-detection',
    createdAt: timestamp,
    metadata: {
      description: 'Learning system document defines swing detection code',
      updatedAt: timestamp
    }
  },

  // ===== CONCEPT_DETECTED_BY (4 edges) =====
  {
    id: 'rel-detected-fvg-fvgdetection',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-fvg',
    targetId: 'code-fvg-detection',
    createdAt: timestamp,
    metadata: {
      description: 'FVG concept detected by FVG detection algorithm',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-detected-marketstructure-swingdetection',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-market-structure',
    targetId: 'code-swing-detection',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure detected by swing detection algorithm',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-detected-bos-swingdetection',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-bos',
    targetId: 'code-swing-detection',
    createdAt: timestamp,
    metadata: {
      description: 'BOS detected by swing detection algorithm',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-detected-smsmss-swingdetection',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-sms-mss',
    targetId: 'code-swing-detection',
    createdAt: timestamp,
    metadata: {
      description: 'SMS/MSS detected by swing detection algorithm',
      updatedAt: timestamp
    }
  },

  // =========================================================================
  // NEW RELATIONSHIPS (rel-200+) — Added to expand knowledge graph
  // =========================================================================

  // ===== CONCEPT GRAPH EDGES: IPDA framework =====
  {
    id: 'rel-200',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda',
    targetId: 'concept-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA seeks liquidity as its primary function',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-201',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda',
    targetId: 'concept-delivery',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA controls price delivery',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-202',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda',
    targetId: 'concept-ipda-data-ranges',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA uses data ranges for reference framing',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-203',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda',
    targetId: 'concept-algorithmic-pairing',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA executes algorithmic pairing of orders',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-204',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda',
    targetId: 'concept-market-efficiency-paradigm',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA enforces market efficiency paradigm',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-205',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda-data-ranges',
    targetId: 'concept-draw-on-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA data ranges identify draw on liquidity targets',
      updatedAt: timestamp
    }
  },

  // ===== Liquidity types =====
  {
    id: 'rel-206',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity',
    targetId: 'concept-bsl',
    createdAt: timestamp,
    metadata: {
      description: 'BSL is a type of liquidity (buy-side)',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-207',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity',
    targetId: 'concept-ssl',
    createdAt: timestamp,
    metadata: {
      description: 'SSL is a type of liquidity (sell-side)',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-208',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity',
    targetId: 'concept-irl',
    createdAt: timestamp,
    metadata: {
      description: 'IRL is a type of internal range liquidity',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-209',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity',
    targetId: 'concept-erl',
    createdAt: timestamp,
    metadata: {
      description: 'ERL is a type of external range liquidity',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-210',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity',
    targetId: 'concept-trendline-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Trendline liquidity is a type of liquidity pool',
      updatedAt: timestamp
    }
  },

  // ===== BSL located at =====
  {
    id: 'rel-211',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bsl',
    targetId: 'concept-equal-highs',
    createdAt: timestamp,
    metadata: {
      description: 'BSL is located at equal highs',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-212',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bsl',
    targetId: 'concept-swing-high',
    createdAt: timestamp,
    metadata: {
      description: 'BSL is located at swing highs',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-213',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bsl',
    targetId: 'concept-old-high',
    createdAt: timestamp,
    metadata: {
      description: 'BSL is located at old highs',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-214',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bsl',
    targetId: 'concept-pdh-pdl',
    createdAt: timestamp,
    metadata: {
      description: 'BSL is located at previous day high',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-215',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bsl',
    targetId: 'concept-pwh-pwl',
    createdAt: timestamp,
    metadata: {
      description: 'BSL is located at previous week high',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-216',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bsl',
    targetId: 'concept-pmh-pml',
    createdAt: timestamp,
    metadata: {
      description: 'BSL is located at previous month high',
      updatedAt: timestamp
    }
  },

  // ===== SSL located at =====
  {
    id: 'rel-217',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ssl',
    targetId: 'concept-equal-lows',
    createdAt: timestamp,
    metadata: {
      description: 'SSL is located at equal lows',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-218',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ssl',
    targetId: 'concept-swing-low',
    createdAt: timestamp,
    metadata: {
      description: 'SSL is located at swing lows',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-219',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ssl',
    targetId: 'concept-old-low',
    createdAt: timestamp,
    metadata: {
      description: 'SSL is located at old lows',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-220',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ssl',
    targetId: 'concept-pdh-pdl',
    createdAt: timestamp,
    metadata: {
      description: 'SSL is located at previous day low',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-221',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ssl',
    targetId: 'concept-pwh-pwl',
    createdAt: timestamp,
    metadata: {
      description: 'SSL is located at previous week low',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-222',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ssl',
    targetId: 'concept-pmh-pml',
    createdAt: timestamp,
    metadata: {
      description: 'SSL is located at previous month low',
      updatedAt: timestamp
    }
  },

  // ===== Liquidity sweep chain =====
  {
    id: 'rel-223',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity',
    targetId: 'concept-liquidity-sweep',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity pools trigger liquidity sweeps',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-224',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity-sweep',
    targetId: 'concept-stop-hunt',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity sweep involves stop hunting',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-225',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity-sweep',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity sweep is followed by displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-226',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity',
    targetId: 'concept-draw-on-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity pools identify draw on liquidity targets',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-227',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-draw-on-liquidity',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'Draw on liquidity confirms daily bias direction',
      updatedAt: timestamp
    }
  },

  // ===== IRL / ERL contents =====
  {
    id: 'rel-228',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-irl',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Internal range liquidity contains FVGs',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-229',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-irl',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Internal range liquidity contains order blocks',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-230',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-irl',
    targetId: 'concept-liquidity-void',
    createdAt: timestamp,
    metadata: {
      description: 'Internal range liquidity contains liquidity voids',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-231',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-erl',
    targetId: 'concept-equal-highs',
    createdAt: timestamp,
    metadata: {
      description: 'External range liquidity contains equal highs',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-232',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-erl',
    targetId: 'concept-equal-lows',
    createdAt: timestamp,
    metadata: {
      description: 'External range liquidity contains equal lows',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-233',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-erl',
    targetId: 'concept-old-high',
    createdAt: timestamp,
    metadata: {
      description: 'External range liquidity contains old highs',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-234',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-erl',
    targetId: 'concept-old-low',
    createdAt: timestamp,
    metadata: {
      description: 'External range liquidity contains old lows',
      updatedAt: timestamp
    }
  },

  // ===== Displacement relationships =====
  {
    id: 'rel-235',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-displacement',
    targetId: 'concept-expansion',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement is a type of expansion',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-236',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-displacement',
    targetId: 'concept-institutional-sponsorship',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement confirms institutional sponsorship',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-237',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-displacement',
    targetId: 'concept-order-flow',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement reveals institutional order flow',
      updatedAt: timestamp
    }
  },

  // ===== Market structure =====
  {
    id: 'rel-238',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-market-structure',
    targetId: 'concept-swing-high',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure is defined by swing highs',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-239',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-market-structure',
    targetId: 'concept-swing-low',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure is defined by swing lows',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-240',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-market-structure',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure determines daily bias',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-241',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-market-structure',
    targetId: 'concept-dealing-range',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure contains dealing ranges',
      updatedAt: timestamp
    }
  },

  // ===== Structure shift chain =====
  {
    id: 'rel-242',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-choch',
    targetId: 'concept-sms-mss',
    createdAt: timestamp,
    metadata: {
      description: 'CHOCH precedes SMS/MSS confirmation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-243',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-sms-mss',
    targetId: 'concept-cisd',
    createdAt: timestamp,
    metadata: {
      description: 'SMS/MSS is confirmed by CISD',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-244',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-swing-failure-pattern',
    targetId: 'concept-reversal',
    createdAt: timestamp,
    metadata: {
      description: 'Swing failure pattern signals reversal',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-245',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-swing-failure-pattern',
    targetId: 'concept-liquidity-sweep',
    createdAt: timestamp,
    metadata: {
      description: 'Swing failure pattern is a type of liquidity sweep',
      updatedAt: timestamp
    }
  },

  // ===== FVG types and relationships =====
  {
    id: 'rel-246',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-fvg',
    targetId: 'concept-bisi',
    createdAt: timestamp,
    metadata: {
      description: 'BISI is a bullish type of FVG',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-247',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-fvg',
    targetId: 'concept-sibi',
    createdAt: timestamp,
    metadata: {
      description: 'SIBI is a bearish type of FVG',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-248',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-fvg',
    targetId: 'concept-ce',
    createdAt: timestamp,
    metadata: {
      description: 'FVG has a consequent encroachment level',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-249',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-fvg',
    targetId: 'concept-liquidity-void',
    createdAt: timestamp,
    metadata: {
      description: 'FVG is related to liquidity voids',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-250',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-bisi',
    targetId: 'concept-bpr',
    createdAt: timestamp,
    metadata: {
      description: 'BISI is a component of balanced price range',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-251',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-sibi',
    targetId: 'concept-bpr',
    createdAt: timestamp,
    metadata: {
      description: 'SIBI is a component of balanced price range',
      updatedAt: timestamp
    }
  },

  // ===== Order block evolutions =====
  {
    id: 'rel-252',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-order-block',
    targetId: 'concept-breaker-block',
    createdAt: timestamp,
    metadata: {
      description: 'Order block becomes breaker block when violated',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-253',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-order-block',
    targetId: 'concept-mean-threshold',
    createdAt: timestamp,
    metadata: {
      description: 'Order block has a mean threshold level',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-254',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-order-block',
    targetId: 'concept-propulsion-block',
    createdAt: timestamp,
    metadata: {
      description: 'Order block becomes propulsion block with FVG',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-255',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-order-block',
    targetId: 'concept-reclaimed-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Order block becomes reclaimed order block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-256',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-order-block',
    targetId: 'concept-volume-imbalance',
    createdAt: timestamp,
    metadata: {
      description: 'Order blocks are related to volume imbalances',
      updatedAt: timestamp
    }
  },

  // ===== Breaker/Unicorn =====
  {
    id: 'rel-257',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-breaker-block',
    targetId: 'concept-unicorn',
    createdAt: timestamp,
    metadata: {
      description: 'Breaker block is a component of unicorn model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-258',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-fvg',
    targetId: 'concept-unicorn',
    createdAt: timestamp,
    metadata: {
      description: 'FVG is a component of unicorn model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-259',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-rejection-block',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Rejection block is related to order blocks',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-260',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-mitigation-block',
    targetId: 'concept-order-flow',
    createdAt: timestamp,
    metadata: {
      description: 'Mitigation block is related to order flow',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-261',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-liquidity-sweep',
    targetId: 'concept-breaker-block',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity sweep precedes breaker block formation',
      updatedAt: timestamp
    }
  },

  // ===== Premium/Discount =====
  {
    id: 'rel-262',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-premium-discount',
    targetId: 'concept-equilibrium',
    createdAt: timestamp,
    metadata: {
      description: 'Premium/discount is divided by equilibrium',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-263',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-premium-discount',
    targetId: 'concept-premium-array',
    createdAt: timestamp,
    metadata: {
      description: 'Premium zone contains premium arrays',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-264',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-premium-discount',
    targetId: 'concept-discount-array',
    createdAt: timestamp,
    metadata: {
      description: 'Discount zone contains discount arrays',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-265',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-premium-array',
    targetId: 'concept-sibi',
    createdAt: timestamp,
    metadata: {
      description: 'Premium arrays contain SIBI (bearish FVGs)',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-266',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-discount-array',
    targetId: 'concept-bisi',
    createdAt: timestamp,
    metadata: {
      description: 'Discount arrays contain BISI (bullish FVGs)',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-267',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-fair-value',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Fair value concept explains FVG formation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-268',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-fair-value',
    targetId: 'concept-equilibrium',
    createdAt: timestamp,
    metadata: {
      description: 'Fair value is related to equilibrium',
      updatedAt: timestamp
    }
  },

  // ===== Delivery =====
  {
    id: 'rel-269',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-delivery',
    targetId: 'concept-irl',
    createdAt: timestamp,
    metadata: {
      description: 'Price delivery uses internal range liquidity',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-270',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-delivery',
    targetId: 'concept-erl',
    createdAt: timestamp,
    metadata: {
      description: 'Price delivery targets external range liquidity',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-271',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-delivery',
    targetId: 'concept-cisd',
    createdAt: timestamp,
    metadata: {
      description: 'Delivery changes state via CISD',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-272',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-delivery',
    targetId: 'concept-market-efficiency-paradigm',
    createdAt: timestamp,
    metadata: {
      description: 'Price delivery is governed by market efficiency paradigm',
      updatedAt: timestamp
    }
  },

  // ===== Killzones and time =====
  {
    id: 'rel-273',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-killzones',
    targetId: 'concept-london-killzone',
    createdAt: timestamp,
    metadata: {
      description: 'London killzone is a type of killzone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-274',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-killzones',
    targetId: 'concept-ny-am-killzone',
    createdAt: timestamp,
    metadata: {
      description: 'NY AM killzone is a type of killzone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-275',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-killzones',
    targetId: 'concept-ny-pm-killzone',
    createdAt: timestamp,
    metadata: {
      description: 'NY PM killzone is a type of killzone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-276',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-killzones',
    targetId: 'concept-london-close-killzone',
    createdAt: timestamp,
    metadata: {
      description: 'London close killzone is a type of killzone',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-277',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ny-am-killzone',
    targetId: 'concept-am-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'NY AM killzone contains AM silver bullet window',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-278',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ny-pm-killzone',
    targetId: 'concept-pm-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'NY PM killzone contains PM silver bullet window',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-279',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-london-killzone',
    targetId: 'concept-london-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'London killzone contains London silver bullet window',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-280',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-london-close-killzone',
    targetId: 'concept-london-close-model',
    createdAt: timestamp,
    metadata: {
      description: 'London close killzone enables London close model',
      updatedAt: timestamp
    }
  },

  // ===== Asia/CBDR =====
  {
    id: 'rel-281',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-asia-session',
    targetId: 'concept-asia-range',
    createdAt: timestamp,
    metadata: {
      description: 'Asia session defines the Asia range',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-282',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-asia-session',
    targetId: 'concept-cbdr',
    createdAt: timestamp,
    metadata: {
      description: 'CBDR follows the Asia session',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-283',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-cbdr',
    targetId: 'concept-standard-deviation',
    createdAt: timestamp,
    metadata: {
      description: 'CBDR projects standard deviation levels',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-284',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-asia-range',
    targetId: 'concept-standard-deviation',
    createdAt: timestamp,
    metadata: {
      description: 'Asia range projects standard deviation levels',
      updatedAt: timestamp
    }
  },

  // ===== True day / Midnight open =====
  {
    id: 'rel-285',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-true-day',
    targetId: 'concept-midnight-open',
    createdAt: timestamp,
    metadata: {
      description: 'True day starts at midnight open',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-286',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-midnight-open',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'Midnight open is a reference for daily bias',
      updatedAt: timestamp
    }
  },

  // ===== Time-price theory =====
  {
    id: 'rel-287',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-time-price-theory',
    targetId: 'concept-killzones',
    createdAt: timestamp,
    metadata: {
      description: 'Time-price theory prioritizes killzone timing',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-288',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-time-price-theory',
    targetId: 'concept-macro-times',
    createdAt: timestamp,
    metadata: {
      description: 'Time-price theory prioritizes macro time windows',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-289',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-time-price-theory',
    targetId: 'concept-optimal-trade-days',
    createdAt: timestamp,
    metadata: {
      description: 'Time-price theory determines optimal trade days',
      updatedAt: timestamp
    }
  },

  // ===== NWOG/NDOG =====
  {
    id: 'rel-290',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-nwog',
    targetId: 'concept-weekly-profile',
    createdAt: timestamp,
    metadata: {
      description: 'NWOG is a reference for weekly profile',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-291',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ndog',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'NDOG is a reference for daily bias',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-292',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-sunday-open-gap',
    targetId: 'concept-nwog',
    createdAt: timestamp,
    metadata: {
      description: 'Sunday open gap is related to NWOG',
      updatedAt: timestamp
    }
  },

  // ===== Smart money / order flow =====
  {
    id: 'rel-293',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-smart-money',
    targetId: 'concept-institutional-sponsorship',
    createdAt: timestamp,
    metadata: {
      description: 'Smart money provides institutional sponsorship',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-294',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-smart-money',
    targetId: 'concept-order-flow',
    createdAt: timestamp,
    metadata: {
      description: 'Smart money creates order flow',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-295',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-smart-money',
    targetId: 'concept-stop-hunt',
    createdAt: timestamp,
    metadata: {
      description: 'Smart money executes stop hunts',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-296',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-order-flow',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Order flow is visible as displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-297',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-order-flow',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Order flow is visible as FVG formation',
      updatedAt: timestamp
    }
  },

  // ===== AMD / Wyckoff =====
  {
    id: 'rel-298',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-accumulation',
    targetId: 'concept-consolidation',
    createdAt: timestamp,
    metadata: {
      description: 'Accumulation appears as consolidation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-299',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-accumulation',
    targetId: 'concept-re-accumulation',
    createdAt: timestamp,
    metadata: {
      description: 'Accumulation repeats as re-accumulation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-300',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-distribution',
    targetId: 'concept-expansion',
    createdAt: timestamp,
    metadata: {
      description: 'Distribution appears as expansion move',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-301',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-distribution',
    targetId: 'concept-re-distribution',
    createdAt: timestamp,
    metadata: {
      description: 'Distribution repeats as re-distribution',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-302',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-manipulation',
    targetId: 'concept-stop-hunt',
    createdAt: timestamp,
    metadata: {
      description: 'Manipulation appears as stop hunt',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-303',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-wyckoff-accumulation',
    targetId: 'concept-accumulation',
    createdAt: timestamp,
    metadata: {
      description: 'Wyckoff accumulation is a systematic form of accumulation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-304',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-wyckoff-accumulation',
    targetId: 'concept-liquidity-sweep',
    createdAt: timestamp,
    metadata: {
      description: 'Wyckoff spring equals liquidity sweep',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-305',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-wyckoff-distribution',
    targetId: 'concept-distribution',
    createdAt: timestamp,
    metadata: {
      description: 'Wyckoff distribution is a systematic form of distribution',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-306',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-wyckoff-distribution',
    targetId: 'concept-liquidity-sweep',
    createdAt: timestamp,
    metadata: {
      description: 'Wyckoff UTAD equals liquidity sweep',
      updatedAt: timestamp
    }
  },

  // ===== Market maker profile =====
  {
    id: 'rel-307',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-market-maker-profile',
    targetId: 'concept-accumulation',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker profile Asia phase is accumulation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-308',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-market-maker-profile',
    targetId: 'concept-manipulation',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker profile London phase is manipulation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-309',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-market-maker-profile',
    targetId: 'concept-distribution',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker profile NY phase is distribution',
      updatedAt: timestamp
    }
  },

  // ===== HTF/MTF/LTF =====
  {
    id: 'rel-310',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-htf-bias',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'HTF bias determines daily bias',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-311',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-htf-bias',
    targetId: 'concept-draw-on-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'HTF bias uses draw on liquidity for targets',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-312',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-htf-bias',
    targetId: 'concept-mtf-bridge',
    createdAt: timestamp,
    metadata: {
      description: 'HTF bias refines to MTF bridge',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-313',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-mtf-bridge',
    targetId: 'concept-ltf-execution',
    createdAt: timestamp,
    metadata: {
      description: 'MTF bridge refines to LTF execution',
      updatedAt: timestamp
    }
  },

  // ===== Candle/Quarterly theory =====
  {
    id: 'rel-314',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-candle-theory',
    targetId: 'concept-monthly-profile',
    createdAt: timestamp,
    metadata: {
      description: 'Candle theory predicts monthly profile',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-315',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-candle-theory',
    targetId: 'concept-weekly-profile',
    createdAt: timestamp,
    metadata: {
      description: 'Candle theory predicts weekly profile',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-316',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-quarterly-theory',
    targetId: 'concept-seasonal-tendencies',
    createdAt: timestamp,
    metadata: {
      description: 'Quarterly theory is related to seasonal tendencies',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-317',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-weekly-profile',
    targetId: 'concept-optimal-trade-days',
    createdAt: timestamp,
    metadata: {
      description: 'Weekly profile contains optimal trade days',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-318',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-monthly-profile',
    targetId: 'concept-quarterly-theory',
    createdAt: timestamp,
    metadata: {
      description: 'Monthly profile nests within quarterly theory',
      updatedAt: timestamp
    }
  },

  // ===== ADR / Retracement =====
  {
    id: 'rel-319',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-adr',
    targetId: 'concept-standard-deviation',
    createdAt: timestamp,
    metadata: {
      description: 'ADR is related to standard deviation projections',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-320',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-adr',
    targetId: 'concept-dealing-range',
    createdAt: timestamp,
    metadata: {
      description: 'ADR estimates dealing range size',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-321',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-retracement',
    targetId: 'concept-ote',
    createdAt: timestamp,
    metadata: {
      description: 'Retracement is measured by OTE levels',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-322',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-retracement',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Retracement targets FVG levels',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-323',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-expansion',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Expansion is powered by displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-324',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-consolidation',
    targetId: 'concept-accumulation',
    createdAt: timestamp,
    metadata: {
      description: 'Consolidation can be seen as accumulation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-325',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-reversal',
    targetId: 'concept-sms-mss',
    createdAt: timestamp,
    metadata: {
      description: 'Reversal is confirmed by SMS/MSS',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-326',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-reversal',
    targetId: 'concept-liquidity-sweep',
    createdAt: timestamp,
    metadata: {
      description: 'Reversal is preceded by liquidity sweep',
      updatedAt: timestamp
    }
  },

  // ===== Narrative =====
  {
    id: 'rel-327',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-narrative',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'Narrative supports daily bias determination',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-328',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-narrative',
    targetId: 'concept-draw-on-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Narrative identifies draw on liquidity targets',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-329',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-narrative',
    targetId: 'concept-time-price-theory',
    createdAt: timestamp,
    metadata: {
      description: 'Narrative integrates time-price theory',
      updatedAt: timestamp
    }
  },

  // ===== Advanced PD arrays =====
  {
    id: 'rel-330',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-suspension-block',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Suspension block is related to order blocks',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-331',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-immediate-rebalance',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Immediate rebalance is a type of FVG',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-332',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-immediate-rebalance',
    targetId: 'concept-delivery',
    createdAt: timestamp,
    metadata: {
      description: 'Immediate rebalance indicates efficient delivery',
      updatedAt: timestamp
    }
  },

  // ===== 90-min cycle / Vacuum block =====
  {
    id: 'rel-333',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ninety-minute-cycle',
    targetId: 'concept-macro-times',
    createdAt: timestamp,
    metadata: {
      description: 'Ninety-minute cycle structures macro time windows',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-334',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ninety-minute-cycle',
    targetId: 'concept-killzones',
    createdAt: timestamp,
    metadata: {
      description: 'Ninety-minute cycles are contained in killzones',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-335',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-vacuum-block',
    targetId: 'concept-liquidity-void',
    createdAt: timestamp,
    metadata: {
      description: 'Vacuum block is a type of liquidity void',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-336',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-vacuum-block',
    targetId: 'concept-delivery',
    createdAt: timestamp,
    metadata: {
      description: 'Vacuum block requires price delivery to fill',
      updatedAt: timestamp
    }
  },

  // ===== Opening gap / CME =====
  {
    id: 'rel-337',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-opening-gap',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'Opening gap is a reference for daily bias',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-338',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-opening-gap',
    targetId: 'concept-cme-open',
    createdAt: timestamp,
    metadata: {
      description: 'Opening gap is defined at CME open',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-339',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-cme-open',
    targetId: 'concept-ipda-true-day',
    createdAt: timestamp,
    metadata: {
      description: 'CME open is a component of IPDA true day',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-340',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-cme-open',
    targetId: 'concept-macro-times',
    createdAt: timestamp,
    metadata: {
      description: 'CME open precedes macro time windows',
      updatedAt: timestamp
    }
  },

  // ===== IPDA true day =====
  {
    id: 'rel-341',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda-true-day',
    targetId: 'concept-midnight-open',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA true day starts at midnight open',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-342',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda-true-day',
    targetId: 'concept-cbdr',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA true day follows CBDR formation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-343',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-ipda-true-day',
    targetId: 'concept-killzones',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA true day contains killzone windows',
      updatedAt: timestamp
    }
  },

  // ===== Sunday open filter =====
  {
    id: 'rel-344',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-sunday-open-filter',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'Sunday open filter filters daily bias',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-345',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-sunday-open-filter',
    targetId: 'concept-sunday-open-gap',
    createdAt: timestamp,
    metadata: {
      description: 'Sunday open filter uses Sunday open gap',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-346',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-sunday-open-filter',
    targetId: 'concept-weekly-profile',
    createdAt: timestamp,
    metadata: {
      description: 'Sunday open filter informs weekly profile',
      updatedAt: timestamp
    }
  },

  // ===== MODEL-CONCEPT RELATIONSHIPS (CONCEPT_USED_IN_MODEL) =====

  // Silver Bullet (add missing)
  {
    id: 'rel-347',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-liquidity-sweep',
    targetId: 'model-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity sweep is a key trigger in Silver Bullet',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-348',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-sms-mss',
    targetId: 'model-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'SMS/MSS confirms Silver Bullet entry',
      updatedAt: timestamp
    }
  },

  // Judas Swing (add missing)
  {
    id: 'rel-349',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-liquidity-sweep',
    targetId: 'model-judas-swing',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity sweep triggers Judas Swing reversal',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-350',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-order-block',
    targetId: 'model-judas-swing',
    createdAt: timestamp,
    metadata: {
      description: 'Order block provides Judas Swing entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-351',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-fvg',
    targetId: 'model-judas-swing',
    createdAt: timestamp,
    metadata: {
      description: 'FVG is used as entry in Judas Swing',
      updatedAt: timestamp
    }
  },

  // ICT 2022 (add missing)
  {
    id: 'rel-352',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-accumulation',
    targetId: 'model-ict-2022',
    createdAt: timestamp,
    metadata: {
      description: 'Accumulation is core phase of ICT 2022 model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-353',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-manipulation',
    targetId: 'model-ict-2022',
    createdAt: timestamp,
    metadata: {
      description: 'Manipulation is the trap phase in ICT 2022',
      updatedAt: timestamp
    }
  },

  // Unicorn (add missing)
  {
    id: 'rel-354',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-breaker-block',
    targetId: 'model-unicorn',
    createdAt: timestamp,
    metadata: {
      description: 'Breaker block is a key component of Unicorn setup',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-355',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-htf-bias',
    targetId: 'model-unicorn',
    createdAt: timestamp,
    metadata: {
      description: 'HTF bias directs Unicorn trade direction',
      updatedAt: timestamp
    }
  },

  // Turtle Soup (add missing)
  {
    id: 'rel-356',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-liquidity-sweep',
    targetId: 'model-turtle-soup',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity sweep is the core trigger of Turtle Soup',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-357',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-reversal',
    targetId: 'model-turtle-soup',
    createdAt: timestamp,
    metadata: {
      description: 'Reversal is the expected outcome of Turtle Soup',
      updatedAt: timestamp
    }
  },

  // Power of Three
  {
    id: 'rel-358',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-accumulation',
    targetId: 'model-power-of-three',
    createdAt: timestamp,
    metadata: {
      description: 'Accumulation is the first phase of Power of Three',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-359',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-manipulation',
    targetId: 'model-power-of-three',
    createdAt: timestamp,
    metadata: {
      description: 'Manipulation is the second phase of Power of Three',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-360',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-distribution',
    targetId: 'model-power-of-three',
    createdAt: timestamp,
    metadata: {
      description: 'Distribution is the third phase of Power of Three',
      updatedAt: timestamp
    }
  },

  // CBDR/Asia SD
  {
    id: 'rel-361',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-cbdr',
    targetId: 'model-cbdr-asia-sd-model',
    createdAt: timestamp,
    metadata: {
      description: 'CBDR defines the central range in the model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-362',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-asia-range',
    targetId: 'model-cbdr-asia-sd-model',
    createdAt: timestamp,
    metadata: {
      description: 'Asia range provides the session range',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-363',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-standard-deviation',
    targetId: 'model-cbdr-asia-sd-model',
    createdAt: timestamp,
    metadata: {
      description: 'Standard deviation projects target levels',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-364',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-terminus',
    targetId: 'model-cbdr-asia-sd-model',
    createdAt: timestamp,
    metadata: {
      description: 'Terminus defines the extreme projection level',
      updatedAt: timestamp
    }
  },

  // IOFED
  {
    id: 'rel-365',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-fvg',
    targetId: 'model-iofed',
    createdAt: timestamp,
    metadata: {
      description: 'FVG is the entry mechanism in IOFED',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-366',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-displacement',
    targetId: 'model-iofed',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement confirms IOFED entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-367',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ltf-execution',
    targetId: 'model-iofed',
    createdAt: timestamp,
    metadata: {
      description: 'LTF execution is used in IOFED timing',
      updatedAt: timestamp
    }
  },

  // ICT Stinger
  {
    id: 'rel-368',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ote',
    targetId: 'model-ict-stinger',
    createdAt: timestamp,
    metadata: {
      description: 'OTE defines entry zone in ICT Stinger',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-369',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-smt',
    targetId: 'model-ict-stinger',
    createdAt: timestamp,
    metadata: {
      description: 'SMT divergence confirms ICT Stinger setup',
      updatedAt: timestamp
    }
  },

  // London Close
  {
    id: 'rel-370',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-reversal',
    targetId: 'model-london-close',
    createdAt: timestamp,
    metadata: {
      description: 'Reversal is the expected move in London Close model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-371',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-london-close-killzone',
    targetId: 'model-london-close',
    createdAt: timestamp,
    metadata: {
      description: 'London close killzone defines the timing window',
      updatedAt: timestamp
    }
  },

  // ICT Model 12
  {
    id: 'rel-372',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-order-block',
    targetId: 'model-ict-model-12',
    createdAt: timestamp,
    metadata: {
      description: 'Order block is a key entry point in Model 12',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-373',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-fvg',
    targetId: 'model-ict-model-12',
    createdAt: timestamp,
    metadata: {
      description: 'FVG confirms entry in Model 12',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-374',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-displacement',
    targetId: 'model-ict-model-12',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement validates Model 12 moves',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-375',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-htf-bias',
    targetId: 'model-ict-model-12',
    createdAt: timestamp,
    metadata: {
      description: 'HTF bias guides Model 12 direction',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-376',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-killzones',
    targetId: 'model-ict-model-12',
    createdAt: timestamp,
    metadata: {
      description: 'Killzones define Model 12 execution windows',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-377',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ltf-execution',
    targetId: 'model-ict-model-12',
    createdAt: timestamp,
    metadata: {
      description: 'LTF execution refines Model 12 entries',
      updatedAt: timestamp
    }
  },

  // ICT Model 7
  {
    id: 'rel-378',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ipda',
    targetId: 'model-ict-model-7',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA is the core framework of Model 7',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-379',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ipda-data-ranges',
    targetId: 'model-ict-model-7',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA data ranges provide Model 7 reference frames',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-380',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-premium-discount',
    targetId: 'model-ict-model-7',
    createdAt: timestamp,
    metadata: {
      description: 'Premium/discount contextualizes Model 7 entries',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-381',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-dealing-range',
    targetId: 'model-ict-model-7',
    createdAt: timestamp,
    metadata: {
      description: 'Dealing range defines Model 7 boundaries',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-382',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-market-maker-profile',
    targetId: 'model-ict-model-7',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker profile informs Model 7 phase analysis',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-383',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-htf-bias',
    targetId: 'model-ict-model-7',
    createdAt: timestamp,
    metadata: {
      description: 'HTF bias determines Model 7 directional alignment',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-384',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-draw-on-liquidity',
    targetId: 'model-ict-model-7',
    createdAt: timestamp,
    metadata: {
      description: 'Draw on liquidity identifies Model 7 targets',
      updatedAt: timestamp
    }
  },

  // ICT Model 9
  {
    id: 'rel-385',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ipda-data-ranges',
    targetId: 'model-ict-model-9',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA data ranges frame Model 9 analysis',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-386',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-draw-on-liquidity',
    targetId: 'model-ict-model-9',
    createdAt: timestamp,
    metadata: {
      description: 'Draw on liquidity defines Model 9 targets',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-387',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-irl',
    targetId: 'model-ict-model-9',
    createdAt: timestamp,
    metadata: {
      description: 'IRL provides Model 9 entry mechanics',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-388',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-erl',
    targetId: 'model-ict-model-9',
    createdAt: timestamp,
    metadata: {
      description: 'ERL provides Model 9 target mechanics',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-389',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-manipulation',
    targetId: 'model-ict-model-9',
    createdAt: timestamp,
    metadata: {
      description: 'Manipulation defines Model 9 trap phase',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-390',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-optimal-trade-days',
    targetId: 'model-ict-model-9',
    createdAt: timestamp,
    metadata: {
      description: 'Optimal trade days filter Model 9 execution',
      updatedAt: timestamp
    }
  },

  // MMBM
  {
    id: 'rel-391',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ssl',
    targetId: 'model-mmbm',
    createdAt: timestamp,
    metadata: {
      description: 'SSL is swept in MMBM accumulation phase',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-392',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-displacement',
    targetId: 'model-mmbm',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement confirms MMBM direction',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-393',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-bsl',
    targetId: 'model-mmbm',
    createdAt: timestamp,
    metadata: {
      description: 'BSL is the MMBM target',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-394',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-buy-program',
    targetId: 'model-mmbm',
    createdAt: timestamp,
    metadata: {
      description: 'Buy program drives MMBM expansion',
      updatedAt: timestamp
    }
  },

  // MMSM
  {
    id: 'rel-395',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-bsl',
    targetId: 'model-mmsm',
    createdAt: timestamp,
    metadata: {
      description: 'BSL is swept in MMSM distribution phase',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-396',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-displacement',
    targetId: 'model-mmsm',
    createdAt: timestamp,
    metadata: {
      description: 'Displacement confirms MMSM direction',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-397',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-ssl',
    targetId: 'model-mmsm',
    createdAt: timestamp,
    metadata: {
      description: 'SSL is the MMSM target',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-398',
    type: 'CONCEPT_USED_IN_MODEL',
    sourceId: 'concept-sell-program',
    targetId: 'model-mmsm',
    createdAt: timestamp,
    metadata: {
      description: 'Sell program drives MMSM expansion',
      updatedAt: timestamp
    }
  },

  // ===== SCHEMA_VALIDATES =====
  {
    id: 'rel-399',
    type: 'SCHEMA_VALIDATES',
    sourceId: 'schema-trade-setup',
    targetId: 'trade-journal-1-eurusd',
    createdAt: timestamp,
    metadata: {
      description: 'Trade setup schema validates EURUSD journal entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-400',
    type: 'SCHEMA_VALIDATES',
    sourceId: 'schema-trade-setup',
    targetId: 'trade-journal-2-gbpusd',
    createdAt: timestamp,
    metadata: {
      description: 'Trade setup schema validates GBPUSD journal entry',
      updatedAt: timestamp
    }
  },

  // ===== DOCUMENT_DEFINES — document-ict-master-library (missing ones) =====
  {
    id: 'rel-401',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-master-library',
    targetId: 'concept-liquidity-sweep',
    createdAt: timestamp,
    metadata: {
      description: 'Master library defines liquidity sweep concept',
      updatedAt: timestamp
    }
  },

  // ===== DOCUMENT_DEFINES — document-terminology =====
  {
    id: 'rel-402',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines FVG concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-403',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines order block concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-404',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-breaker-block',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines breaker block concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-405',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines displacement concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-406',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-sms-mss',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines SMS/MSS concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-407',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-bos',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines BOS concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-408',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-choch',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines CHOCH concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-409',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-bsl',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines BSL concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-410',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-ssl',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines SSL concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-411',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-ote',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines OTE concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-412',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-equilibrium',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines equilibrium concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-413',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'concept-smt',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines SMT concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-414',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'model-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines Silver Bullet model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-415',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'model-judas-swing',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines Judas Swing model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-416',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'model-power-of-three',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines Power of Three model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-417',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'model-turtle-soup',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines Turtle Soup model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-418',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'model-mmbm',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines MMBM model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-419',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-terminology',
    targetId: 'model-mmsm',
    createdAt: timestamp,
    metadata: {
      description: 'Terminology document defines MMSM model',
      updatedAt: timestamp
    }
  },

  // ===== document-ict-advanced-concepts =====
  {
    id: 'rel-420',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-advanced-concepts',
    targetId: 'concept-inversion-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced concepts document defines inversion FVG',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-421',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-advanced-concepts',
    targetId: 'concept-propulsion-block',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced concepts document defines propulsion block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-422',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-advanced-concepts',
    targetId: 'concept-rejection-block',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced concepts document defines rejection block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-423',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-advanced-concepts',
    targetId: 'concept-vacuum-block',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced concepts document defines vacuum block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-424',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ict-advanced-concepts',
    targetId: 'concept-immediate-rebalance',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced concepts document defines immediate rebalance',
      updatedAt: timestamp
    }
  },

  // ===== document-a-plus-setup =====
  {
    id: 'rel-425',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-a-plus-setup',
    targetId: 'concept-cbdr',
    createdAt: timestamp,
    metadata: {
      description: 'A+ setup document defines CBDR concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-426',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-a-plus-setup',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'A+ setup document defines FVG in context',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-427',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-a-plus-setup',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'A+ setup document defines order block in context',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-428',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-a-plus-setup',
    targetId: 'model-cbdr-asia-sd-model',
    createdAt: timestamp,
    metadata: {
      description: 'A+ setup document defines CBDR/Asia SD model',
      updatedAt: timestamp
    }
  },

  // ===== document-advanced-inversion =====
  {
    id: 'rel-429',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-advanced-inversion',
    targetId: 'concept-inversion-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced inversion document defines inversion FVG',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-430',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-advanced-inversion',
    targetId: 'concept-bpr',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced inversion document defines BPR concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-431',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-advanced-inversion',
    targetId: 'concept-reclaimed-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced inversion document defines reclaimed order block',
      updatedAt: timestamp
    }
  },

  // ===== document-advanced-pd-arrays =====
  {
    id: 'rel-432',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-advanced-pd-arrays',
    targetId: 'concept-volume-imbalance',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced PD arrays document defines volume imbalance',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-433',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-advanced-pd-arrays',
    targetId: 'concept-rejection-block',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced PD arrays document defines rejection block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-434',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-advanced-pd-arrays',
    targetId: 'concept-propulsion-block',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced PD arrays document defines propulsion block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-435',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-advanced-pd-arrays',
    targetId: 'concept-suspension-block',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced PD arrays document defines suspension block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-436',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-advanced-pd-arrays',
    targetId: 'concept-vacuum-block',
    createdAt: timestamp,
    metadata: {
      description: 'Advanced PD arrays document defines vacuum block',
      updatedAt: timestamp
    }
  },

  // ===== document-cbdr-concept =====
  {
    id: 'rel-437',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-cbdr-concept',
    targetId: 'concept-cbdr',
    createdAt: timestamp,
    metadata: {
      description: 'CBDR concept document defines CBDR',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-438',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-cbdr-concept',
    targetId: 'concept-standard-deviation',
    createdAt: timestamp,
    metadata: {
      description: 'CBDR concept document defines standard deviation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-439',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-cbdr-concept',
    targetId: 'concept-asia-range',
    createdAt: timestamp,
    metadata: {
      description: 'CBDR concept document defines Asia range',
      updatedAt: timestamp
    }
  },

  // ===== document-concepts-models-processed =====
  {
    id: 'rel-440',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concepts-models-processed',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Concepts/models processed document defines FVG',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-441',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concepts-models-processed',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Concepts/models processed document defines order block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-442',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concepts-models-processed',
    targetId: 'concept-breaker-block',
    createdAt: timestamp,
    metadata: {
      description: 'Concepts/models processed document defines breaker block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-443',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concepts-models-processed',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Concepts/models processed document defines displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-444',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concepts-models-processed',
    targetId: 'concept-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Concepts/models processed document defines liquidity',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-445',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concepts-models-processed',
    targetId: 'concept-premium-discount',
    createdAt: timestamp,
    metadata: {
      description: 'Concepts/models processed document defines premium/discount',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-446',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concepts-models-processed',
    targetId: 'concept-killzones',
    createdAt: timestamp,
    metadata: {
      description: 'Concepts/models processed document defines killzones',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-447',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concepts-models-processed',
    targetId: 'concept-market-structure',
    createdAt: timestamp,
    metadata: {
      description: 'Concepts/models processed document defines market structure',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-448',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-concepts-models-processed',
    targetId: 'concept-ipda',
    createdAt: timestamp,
    metadata: {
      description: 'Concepts/models processed document defines IPDA',
      updatedAt: timestamp
    }
  },

  // ===== document-macros-detailed =====
  {
    id: 'rel-449',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-macros-detailed',
    targetId: 'concept-macro-times',
    createdAt: timestamp,
    metadata: {
      description: 'Macros detailed document defines macro times',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-450',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-macros-detailed',
    targetId: 'concept-ninety-minute-cycle',
    createdAt: timestamp,
    metadata: {
      description: 'Macros detailed document defines 90-minute cycle',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-451',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-macros-detailed',
    targetId: 'concept-opening-gap',
    createdAt: timestamp,
    metadata: {
      description: 'Macros detailed document defines opening gap',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-452',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-macros-detailed',
    targetId: 'concept-killzones',
    createdAt: timestamp,
    metadata: {
      description: 'Macros detailed document defines killzones in context',
      updatedAt: timestamp
    }
  },

  // ===== document-market-structure-breaks =====
  {
    id: 'rel-453',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-structure-breaks',
    targetId: 'concept-market-structure',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure breaks document defines market structure',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-454',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-structure-breaks',
    targetId: 'concept-bos',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure breaks document defines BOS',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-455',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-structure-breaks',
    targetId: 'concept-choch',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure breaks document defines CHOCH',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-456',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-structure-breaks',
    targetId: 'concept-sms-mss',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure breaks document defines SMS/MSS',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-457',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-structure-breaks',
    targetId: 'concept-cisd',
    createdAt: timestamp,
    metadata: {
      description: 'Market structure breaks document defines CISD',
      updatedAt: timestamp
    }
  },

  // ===== document-intermarket =====
  {
    id: 'rel-458',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-intermarket',
    targetId: 'concept-smt',
    createdAt: timestamp,
    metadata: {
      description: 'Intermarket document defines SMT concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-459',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-intermarket',
    targetId: 'concept-dxy-correlation',
    createdAt: timestamp,
    metadata: {
      description: 'Intermarket document defines DXY correlation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-460',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-intermarket',
    targetId: 'concept-bond-yield-correlation',
    createdAt: timestamp,
    metadata: {
      description: 'Intermarket document defines bond yield correlation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-461',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-intermarket',
    targetId: 'concept-intermarket-analysis',
    createdAt: timestamp,
    metadata: {
      description: 'Intermarket document defines intermarket analysis',
      updatedAt: timestamp
    }
  },

  // ===== document-ifvg =====
  {
    id: 'rel-462',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ifvg',
    targetId: 'concept-inversion-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'IFVG document defines inversion FVG',
      updatedAt: timestamp
    }
  },

  // ===== document-ipda =====
  {
    id: 'rel-463',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ipda',
    targetId: 'concept-ipda',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA document defines IPDA concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-464',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ipda',
    targetId: 'concept-delivery',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA document defines delivery concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-465',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ipda',
    targetId: 'concept-algorithmic-pairing',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA document defines algorithmic pairing',
      updatedAt: timestamp
    }
  },

  // ===== document-ipda-data-ranges =====
  {
    id: 'rel-466',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ipda-data-ranges',
    targetId: 'concept-ipda-data-ranges',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA data ranges document defines IPDA data ranges',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-467',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ipda-data-ranges',
    targetId: 'concept-draw-on-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA data ranges document defines draw on liquidity',
      updatedAt: timestamp
    }
  },

  // ===== document-ipda-theory =====
  {
    id: 'rel-468',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ipda-theory',
    targetId: 'concept-ipda',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA theory document defines IPDA concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-469',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ipda-theory',
    targetId: 'concept-market-efficiency-paradigm',
    createdAt: timestamp,
    metadata: {
      description: 'IPDA theory document defines market efficiency paradigm',
      updatedAt: timestamp
    }
  },

  // ===== document-market-maker-concepts =====
  {
    id: 'rel-470',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-maker-concepts',
    targetId: 'model-mmbm',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker concepts document defines MMBM',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-471',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-maker-concepts',
    targetId: 'model-mmsm',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker concepts document defines MMSM',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-472',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-maker-concepts',
    targetId: 'concept-market-maker-profile',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker concepts document defines market maker profile',
      updatedAt: timestamp
    }
  },

  // ===== document-sibi-bisi =====
  {
    id: 'rel-473',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-sibi-bisi',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'SIBI/BISI document defines FVG in context',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-474',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-sibi-bisi',
    targetId: 'concept-bisi',
    createdAt: timestamp,
    metadata: {
      description: 'SIBI/BISI document defines BISI concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-475',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-sibi-bisi',
    targetId: 'concept-sibi',
    createdAt: timestamp,
    metadata: {
      description: 'SIBI/BISI document defines SIBI concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-476',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-sibi-bisi',
    targetId: 'concept-ce',
    createdAt: timestamp,
    metadata: {
      description: 'SIBI/BISI document defines consequent encroachment',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-477',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-sibi-bisi',
    targetId: 'concept-bpr',
    createdAt: timestamp,
    metadata: {
      description: 'SIBI/BISI document defines BPR concept',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-478',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-sibi-bisi',
    targetId: 'concept-inversion-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'SIBI/BISI document defines inversion FVG',
      updatedAt: timestamp
    }
  },

  // ===== document-ashton-cbdr-asia =====
  {
    id: 'rel-479',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ashton-cbdr-asia',
    targetId: 'model-cbdr-asia-sd-model',
    createdAt: timestamp,
    metadata: {
      description: 'Ashton CBDR/Asia document defines CBDR/Asia SD model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-480',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ashton-cbdr-asia',
    targetId: 'concept-cbdr',
    createdAt: timestamp,
    metadata: {
      description: 'Ashton CBDR/Asia document defines CBDR',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-481',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ashton-cbdr-asia',
    targetId: 'concept-asia-range',
    createdAt: timestamp,
    metadata: {
      description: 'Ashton CBDR/Asia document defines Asia range',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-482',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ashton-cbdr-asia',
    targetId: 'concept-standard-deviation',
    createdAt: timestamp,
    metadata: {
      description: 'Ashton CBDR/Asia document defines standard deviation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-483',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-ashton-cbdr-asia',
    targetId: 'concept-terminus',
    createdAt: timestamp,
    metadata: {
      description: 'Ashton CBDR/Asia document defines terminus',
      updatedAt: timestamp
    }
  },

  // ===== document-2022-mentorship =====
  {
    id: 'rel-484',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-2022-mentorship',
    targetId: 'model-ict-2022',
    createdAt: timestamp,
    metadata: {
      description: '2022 mentorship document defines ICT 2022 model',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-485',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-2022-mentorship',
    targetId: 'concept-accumulation',
    createdAt: timestamp,
    metadata: {
      description: '2022 mentorship document defines accumulation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-486',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-2022-mentorship',
    targetId: 'concept-manipulation',
    createdAt: timestamp,
    metadata: {
      description: '2022 mentorship document defines manipulation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-487',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-2022-mentorship',
    targetId: 'concept-distribution',
    createdAt: timestamp,
    metadata: {
      description: '2022 mentorship document defines distribution',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-488',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-2022-mentorship',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: '2022 mentorship document defines displacement',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-489',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-2022-mentorship',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: '2022 mentorship document defines FVG',
      updatedAt: timestamp
    }
  },

  // ===== document-2026-smart-money =====
  {
    id: 'rel-490',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-2026-smart-money',
    targetId: 'concept-suspension-block',
    createdAt: timestamp,
    metadata: {
      description: '2026 smart money document defines suspension block',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-491',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-2026-smart-money',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: '2026 smart money document defines order block',
      updatedAt: timestamp
    }
  },

  // ===== document-model-12-transcript / processed =====
  {
    id: 'rel-492',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-12-transcript',
    targetId: 'model-ict-model-12',
    createdAt: timestamp,
    metadata: {
      description: 'Model 12 transcript defines ICT Model 12',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-493',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-12-processed',
    targetId: 'model-ict-model-12',
    createdAt: timestamp,
    metadata: {
      description: 'Model 12 processed document defines ICT Model 12',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-494',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-12-processed',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'Model 12 processed document defines order block usage',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-495',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-12-processed',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Model 12 processed document defines FVG usage',
      updatedAt: timestamp
    }
  },

  // ===== document-model-7 =====
  {
    id: 'rel-496',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-7-tape',
    targetId: 'model-ict-model-7',
    createdAt: timestamp,
    metadata: {
      description: 'Model 7 tape document defines ICT Model 7',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-497',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-7-trade-plan',
    targetId: 'model-ict-model-7',
    createdAt: timestamp,
    metadata: {
      description: 'Model 7 trade plan document defines ICT Model 7',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-498',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-7-universal',
    targetId: 'model-ict-model-7',
    createdAt: timestamp,
    metadata: {
      description: 'Model 7 universal document defines ICT Model 7',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-499',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-7-universal',
    targetId: 'concept-ipda',
    createdAt: timestamp,
    metadata: {
      description: 'Model 7 universal document defines IPDA',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-500',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-7-universal',
    targetId: 'concept-ipda-data-ranges',
    createdAt: timestamp,
    metadata: {
      description: 'Model 7 universal document defines IPDA data ranges',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-501',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-7-universal',
    targetId: 'concept-premium-discount',
    createdAt: timestamp,
    metadata: {
      description: 'Model 7 universal document defines premium/discount',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-502',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-7-universal',
    targetId: 'concept-market-maker-profile',
    createdAt: timestamp,
    metadata: {
      description: 'Model 7 universal document defines market maker profile',
      updatedAt: timestamp
    }
  },

  // ===== document-month8 =====
  {
    id: 'rel-503',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-month8-essentials',
    targetId: 'concept-sunday-open-filter',
    createdAt: timestamp,
    metadata: {
      description: 'Month 8 essentials document defines Sunday open filter',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-504',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-month8-essentials',
    targetId: 'concept-daily-bias',
    createdAt: timestamp,
    metadata: {
      description: 'Month 8 essentials document defines daily bias',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-505',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-month8-defining-range',
    targetId: 'concept-cme-open',
    createdAt: timestamp,
    metadata: {
      description: 'Month 8 defining range document defines CME open',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-506',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-month8-defining-range',
    targetId: 'concept-ipda-true-day',
    createdAt: timestamp,
    metadata: {
      description: 'Month 8 defining range document defines IPDA true day',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-507',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-month8-defining-range',
    targetId: 'concept-midnight-open',
    createdAt: timestamp,
    metadata: {
      description: 'Month 8 defining range document defines midnight open',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-508',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-month8-cbdr',
    targetId: 'concept-cbdr',
    createdAt: timestamp,
    metadata: {
      description: 'Month 8 CBDR document defines CBDR',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-509',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-month8-cbdr',
    targetId: 'concept-standard-deviation',
    createdAt: timestamp,
    metadata: {
      description: 'Month 8 CBDR document defines standard deviation',
      updatedAt: timestamp
    }
  },

  // ===== document-model-9 =====
  {
    id: 'rel-510',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-9',
    targetId: 'model-ict-model-9',
    createdAt: timestamp,
    metadata: {
      description: 'Model 9 document defines ICT Model 9',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-511',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-9',
    targetId: 'concept-draw-on-liquidity',
    createdAt: timestamp,
    metadata: {
      description: 'Model 9 document defines draw on liquidity',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-512',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-9',
    targetId: 'concept-irl',
    createdAt: timestamp,
    metadata: {
      description: 'Model 9 document defines IRL',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-513',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-9',
    targetId: 'concept-erl',
    createdAt: timestamp,
    metadata: {
      description: 'Model 9 document defines ERL',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-514',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-model-9',
    targetId: 'concept-manipulation',
    createdAt: timestamp,
    metadata: {
      description: 'Model 9 document defines manipulation',
      updatedAt: timestamp
    }
  },

  // ===== document-models-processed =====
  {
    id: 'rel-515',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-models-processed',
    targetId: 'model-silver-bullet',
    createdAt: timestamp,
    metadata: {
      description: 'Models processed document defines Silver Bullet',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-516',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-models-processed',
    targetId: 'model-judas-swing',
    createdAt: timestamp,
    metadata: {
      description: 'Models processed document defines Judas Swing',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-517',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-models-processed',
    targetId: 'model-power-of-three',
    createdAt: timestamp,
    metadata: {
      description: 'Models processed document defines Power of Three',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-518',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-models-processed',
    targetId: 'model-mmbm',
    createdAt: timestamp,
    metadata: {
      description: 'Models processed document defines MMBM',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-519',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-models-processed',
    targetId: 'model-mmsm',
    createdAt: timestamp,
    metadata: {
      description: 'Models processed document defines MMSM',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-520',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-models-processed',
    targetId: 'model-turtle-soup',
    createdAt: timestamp,
    metadata: {
      description: 'Models processed document defines Turtle Soup',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-521',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-models-processed',
    targetId: 'model-unicorn',
    createdAt: timestamp,
    metadata: {
      description: 'Models processed document defines Unicorn',
      updatedAt: timestamp
    }
  },

  // ===== document-market-maker-model =====
  {
    id: 'rel-522',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-maker-model',
    targetId: 'model-mmbm',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker model document defines MMBM',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-523',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-maker-model',
    targetId: 'model-mmsm',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker model document defines MMSM',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-524',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-maker-model',
    targetId: 'concept-accumulation',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker model document defines accumulation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-525',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-maker-model',
    targetId: 'concept-manipulation',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker model document defines manipulation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-526',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-maker-model',
    targetId: 'concept-distribution',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker model document defines distribution',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-527',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-maker-model',
    targetId: 'concept-bsl',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker model document defines BSL',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-528',
    type: 'DOCUMENT_DEFINES',
    sourceId: 'document-market-maker-model',
    targetId: 'concept-ssl',
    createdAt: timestamp,
    metadata: {
      description: 'Market maker model document defines SSL',
      updatedAt: timestamp
    }
  },

  // ===== CONCEPT_DETECTED_BY (new detectors) =====
  {
    id: 'rel-529',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-bisi',
    targetId: 'code-fvg-detection',
    createdAt: timestamp,
    metadata: {
      description: 'BISI detected by FVG detection algorithm',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-530',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-sibi',
    targetId: 'code-fvg-detection',
    createdAt: timestamp,
    metadata: {
      description: 'SIBI detected by FVG detection algorithm',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-531',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-inversion-fvg',
    targetId: 'code-fvg-detection',
    createdAt: timestamp,
    metadata: {
      description: 'Inversion FVG detected by FVG detection algorithm',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-532',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-order-block',
    targetId: 'code-ob-detector',
    createdAt: timestamp,
    metadata: {
      description: 'Order block detected by OB detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-533',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-breaker-block',
    targetId: 'code-ob-detector',
    createdAt: timestamp,
    metadata: {
      description: 'Breaker block detected by OB detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-534',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-mitigation-block',
    targetId: 'code-ob-detector',
    createdAt: timestamp,
    metadata: {
      description: 'Mitigation block detected by OB detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-535',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-choch',
    targetId: 'code-structure-detector',
    createdAt: timestamp,
    metadata: {
      description: 'CHOCH detected by structure detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-536',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-swing-high',
    targetId: 'code-structure-detector',
    createdAt: timestamp,
    metadata: {
      description: 'Swing high detected by structure detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-537',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-swing-low',
    targetId: 'code-structure-detector',
    createdAt: timestamp,
    metadata: {
      description: 'Swing low detected by structure detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-538',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-bsl',
    targetId: 'code-liquidity-detector',
    createdAt: timestamp,
    metadata: {
      description: 'BSL detected by liquidity detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-539',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-ssl',
    targetId: 'code-liquidity-detector',
    createdAt: timestamp,
    metadata: {
      description: 'SSL detected by liquidity detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-540',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-equal-highs',
    targetId: 'code-liquidity-detector',
    createdAt: timestamp,
    metadata: {
      description: 'Equal highs detected by liquidity detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-541',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-equal-lows',
    targetId: 'code-liquidity-detector',
    createdAt: timestamp,
    metadata: {
      description: 'Equal lows detected by liquidity detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-542',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'concept-liquidity-sweep',
    targetId: 'code-liquidity-detector',
    createdAt: timestamp,
    metadata: {
      description: 'Liquidity sweep detected by liquidity detector',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-543',
    type: 'CONCEPT_DETECTED_BY',
    sourceId: 'model-silver-bullet',
    targetId: 'code-silver-bullet-model',
    createdAt: timestamp,
    metadata: {
      description: 'Silver Bullet model detected by silver bullet code',
      updatedAt: timestamp
    }
  },

  // ===== TRADE_USES_CONCEPT (journal trades) =====
  // trade-journal-1-eurusd
  {
    id: 'rel-544',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-journal-1-eurusd',
    targetId: 'concept-bsl',
    createdAt: timestamp,
    metadata: {
      description: 'EURUSD journal trade used BSL analysis',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-545',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-journal-1-eurusd',
    targetId: 'concept-ssl',
    createdAt: timestamp,
    metadata: {
      description: 'EURUSD journal trade used SSL analysis',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-546',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-journal-1-eurusd',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'EURUSD journal trade used order block entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-547',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-journal-1-eurusd',
    targetId: 'concept-premium-discount',
    createdAt: timestamp,
    metadata: {
      description: 'EURUSD journal trade used premium/discount analysis',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-548',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-journal-1-eurusd',
    targetId: 'concept-dxy-correlation',
    createdAt: timestamp,
    metadata: {
      description: 'EURUSD journal trade used DXY correlation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-549',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-journal-1-eurusd',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'EURUSD journal trade confirmed by displacement',
      updatedAt: timestamp
    }
  },

  // trade-journal-2-gbpusd
  {
    id: 'rel-550',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-journal-2-gbpusd',
    targetId: 'concept-htf-bias',
    createdAt: timestamp,
    metadata: {
      description: 'GBPUSD journal trade used HTF bias',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-551',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-journal-2-gbpusd',
    targetId: 'concept-order-block',
    createdAt: timestamp,
    metadata: {
      description: 'GBPUSD journal trade used order block entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-552',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-journal-2-gbpusd',
    targetId: 'concept-bos',
    createdAt: timestamp,
    metadata: {
      description: 'GBPUSD journal trade confirmed by BOS',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-553',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-journal-2-gbpusd',
    targetId: 'concept-dxy-correlation',
    createdAt: timestamp,
    metadata: {
      description: 'GBPUSD journal trade used DXY correlation',
      updatedAt: timestamp
    }
  },

  // trade-broker-58
  {
    id: 'rel-554',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-broker-58',
    targetId: 'concept-displacement',
    createdAt: timestamp,
    metadata: {
      description: 'Broker trade 58 used displacement confirmation',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-555',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-broker-58',
    targetId: 'concept-fvg',
    createdAt: timestamp,
    metadata: {
      description: 'Broker trade 58 used FVG entry',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-556',
    type: 'TRADE_USES_CONCEPT',
    sourceId: 'trade-broker-58',
    targetId: 'concept-killzones',
    createdAt: timestamp,
    metadata: {
      description: 'Broker trade 58 executed during killzone',
      updatedAt: timestamp
    }
  },

  // ===== ORPHAN FIX: concept-nmog =====
  {
    id: 'rel-557',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-nmog',
    targetId: 'concept-nwog',
    createdAt: timestamp,
    metadata: {
      description: 'New Month Opening Gap is a higher-timeframe variant of the same opening-gap principle as NWOG',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-558',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-nmog',
    targetId: 'concept-ndog',
    createdAt: timestamp,
    metadata: {
      description: 'NMOG and NDOG are both opening gaps across different timeframes',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-559',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-nmog',
    targetId: 'concept-opening-gap',
    createdAt: timestamp,
    metadata: {
      description: 'NMOG is a monthly-timeframe opening gap',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-560',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-nmog',
    targetId: 'concept-monthly-profile',
    createdAt: timestamp,
    metadata: {
      description: 'NMOG serves as a key reference point within the monthly profile',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-561',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-equilibrium',
    targetId: 'concept-nmog',
    createdAt: timestamp,
    metadata: {
      description: 'Understanding equilibrium is prerequisite to using NMOG as a balance reference',
      updatedAt: timestamp
    }
  },

  // ===== ORPHAN FIX: concept-risk-on-risk-off =====
  {
    id: 'rel-562',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-risk-on-risk-off',
    targetId: 'concept-intermarket-analysis',
    createdAt: timestamp,
    metadata: {
      description: 'Risk-on/risk-off is a core intermarket analysis framework',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-563',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-risk-on-risk-off',
    targetId: 'concept-dxy-correlation',
    createdAt: timestamp,
    metadata: {
      description: 'DXY correlation shifts based on risk-on vs risk-off regime',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-564',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-risk-on-risk-off',
    targetId: 'concept-bond-yield-correlation',
    createdAt: timestamp,
    metadata: {
      description: 'Bond yields are primary signals for risk-on/risk-off regime identification',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-565',
    type: 'CONCEPT_RELATED_TO',
    sourceId: 'concept-risk-on-risk-off',
    targetId: 'concept-institutional-sponsorship',
    createdAt: timestamp,
    metadata: {
      description: 'Institutional sponsorship flows reflect the prevailing risk sentiment regime',
      updatedAt: timestamp
    }
  },
  {
    id: 'rel-566',
    type: 'CONCEPT_PREREQUISITE',
    sourceId: 'concept-risk-on-risk-off',
    targetId: 'concept-narrative',
    createdAt: timestamp,
    metadata: {
      description: 'Risk-on/risk-off regime informs the broader trading narrative',
      updatedAt: timestamp
    }
  }
];
