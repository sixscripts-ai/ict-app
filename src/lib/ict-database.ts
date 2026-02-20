/**
 * ICT Knowledge Database
 * 
 * Complete production-grade ICT (Inner Circle Trader) knowledge database
 * sourced directly from sixscripts-ai/train-ict repository.
 * 
 * Sources:
 * - knowledge_base/ICT_MASTER_LIBRARY.md (826 lines, 10 parts)
 * - knowledge_base/concept_relationships.yaml (713 lines, 13 sections)
 * - knowledge_base/ICT_KNOWLEDGE_SOURCES.md
 * - knowledge_base/ICT_LEARNING_SYSTEM.md
 * - Collected_ICT_Data/journal.md (real trade journal)
 * - Collected_ICT_Data/connected_trades.csv (real trade data)
 * 
 * Database includes:
 * - 25 Concept entities (core + advanced + time-based)
 * - 8 Model entities (execution frameworks)
 * - 7 Trade entities (real examples from journal)
 * - 3 Schema entities (data validation)
 * - 2 Code Module entities (detection algorithms)
 * - 3 Document entities (source references)
 * - 144+ Relationship entities (concept graph)
 * - Confluence scoring system
 * - Time rules (killzones, macros, avoid times)
 * - Anti-patterns (10 common mistakes)
 * - Causal chains (reversal, AMD, HTF→LTF)
 * - Pre-trade validation checklist
 */

import type { Entity, Relationship } from '../lib/types';

// Import all data modules
import {
  ICT_CONCEPTS,
  ICT_MODELS,
  ICT_TRADES,
  ICT_SCHEMAS,
  ICT_CODE_MODULES,
  ICT_DOCUMENTS,
  ICT_RELATIONSHIPS,
  ICT_CONFLUENCE_WEIGHTS,
  ICT_TIME_RULES,
  ICT_ANTI_PATTERNS,
  ICT_CAUSAL_CHAINS,
  ICT_PRE_TRADE_CHECKLIST
} from '../data/ict';

// Export individual arrays
export {
  ICT_CONCEPTS,
  ICT_MODELS,
  ICT_TRADES,
  ICT_SCHEMAS,
  ICT_CODE_MODULES,
  ICT_DOCUMENTS,
  ICT_RELATIONSHIPS,
  ICT_CONFLUENCE_WEIGHTS,
  ICT_TIME_RULES,
  ICT_ANTI_PATTERNS,
  ICT_CAUSAL_CHAINS,
  ICT_PRE_TRADE_CHECKLIST
};

// Re-export helper functions
export {
  calculateConfluenceScore,
  getScoreGrade,
  isInKillzone,
  shouldAvoidTime,
  isInSilverBulletWindow,
  checkAntiPatterns,
  getAntiPatternDetails,
  validateCausalChain,
  getNextStep,
  validatePreTrade,
  formatValidationReport
} from '../data/ict';

// Export types
export type { PreTradeValidationInput, PreTradeValidationResult } from '../data/ict';

/**
 * Complete ICT Database Export
 * 
 * All entities and relationships combined into a single database object.
 * This is the main export that applications should use.
 */
export const ICT_FULL_DATABASE = {
  entities: [
    ...ICT_CONCEPTS,
    ...ICT_MODELS,
    ...ICT_TRADES,
    ...ICT_SCHEMAS,
    ...ICT_CODE_MODULES,
    ...ICT_DOCUMENTS
  ] as Entity[],
  relationships: ICT_RELATIONSHIPS as Relationship[],
  confluence_weights: ICT_CONFLUENCE_WEIGHTS,
  time_rules: ICT_TIME_RULES,
  anti_patterns: ICT_ANTI_PATTERNS,
  causal_chains: ICT_CAUSAL_CHAINS,
  pre_trade_checklist: ICT_PRE_TRADE_CHECKLIST,
  metadata: {
    version: '2.0',
    created: '2026-02-18',
    source_repo: 'sixscripts-ai/train-ict',
    total_entities: 0, // Will be calculated
    total_relationships: 0, // Will be calculated
    entity_counts: {
      concepts: 0,
      models: 0,
      trades: 0,
      schemas: 0,
      code_modules: 0,
      documents: 0
    }
  }
};

// Calculate metadata counts
ICT_FULL_DATABASE.metadata.total_entities = ICT_FULL_DATABASE.entities.length;
ICT_FULL_DATABASE.metadata.total_relationships = ICT_FULL_DATABASE.relationships.length;
ICT_FULL_DATABASE.metadata.entity_counts.concepts = ICT_CONCEPTS.length;
ICT_FULL_DATABASE.metadata.entity_counts.models = ICT_MODELS.length;
ICT_FULL_DATABASE.metadata.entity_counts.trades = ICT_TRADES.length;
ICT_FULL_DATABASE.metadata.entity_counts.schemas = ICT_SCHEMAS.length;
ICT_FULL_DATABASE.metadata.entity_counts.code_modules = ICT_CODE_MODULES.length;
ICT_FULL_DATABASE.metadata.entity_counts.documents = ICT_DOCUMENTS.length;

// Functions removed (unused)
// getDatabaseStats, getEntityById, getEntitiesByType, getEntitiesByDomain, getEntitiesByTag, getRelationshipsForEntity, getRelatedEntities

