export type EntityType = 
  | 'concept' 
  | 'model' 
  | 'trade' 
  | 'schema' 
  | 'code_module' 
  | 'document' 
  | 'journal' 
  | 'training_data'
  | 'chart';

export type DomainType = 
  | 'concepts' 
  | 'models' 
  | 'trades' 
  | 'schemas' 
  | 'training_data' 
  | 'knowledge_base' 
  | 'code' 
  | 'journal' 
  | 'charts'
  | 'rag_data'
  | 'relationships';

export type RelationshipType =
  | 'CONCEPT_USED_IN_MODEL'
  | 'MODEL_PRODUCES_TRADE'
  | 'CONCEPT_RELATED_TO'
  | 'CONCEPT_DETECTED_BY'
  | 'TRADE_USES_CONCEPT'
  | 'SCHEMA_VALIDATES'
  | 'DOCUMENT_DEFINES'
  | 'CONCEPT_PREREQUISITE';

export type FileStatus = 'pending' | 'processing' | 'completed' | 'error';
export type ValidationStatus = 'valid' | 'invalid' | 'unknown';

export interface Entity {
  id: string;
  type: EntityType;
  domain: DomainType;
  name: string;
  description?: string;
  content?: string;
  metadata: Record<string, unknown>;
  sources: SourceReference[];
  validationStatus?: ValidationStatus;
  validationErrors?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SourceReference {
  filePath: string;
  lineStart?: number;
  lineEnd?: number;
  uploadId: string;
  uploadedAt: string;
}

export interface Relationship {
  id: string;
  type: RelationshipType;
  sourceId: string;
  targetId: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Upload {
  id: string;
  type: 'file' | 'repo' | 'folder';
  name: string;
  source: string;
  fileCount: number;
  processedCount: number;
  status: FileStatus;
  startedAt: string;
  completedAt?: string;
  errors: string[];
}

export interface FileProcessingLog {
  id: string;
  uploadId: string;
  filePath: string;
  fileType: string;
  status: FileStatus;
  message: string;
  entitiesCreated: number;
  timestamp: string;
}

export interface GraphNode {
  id: string;
  type: EntityType;
  name: string;
  domain: DomainType;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface DatabaseStats {
  totalEntities: number;
  totalRelationships: number;
  totalUploads: number;
  entitiesByType: Record<EntityType, number>;
  entitiesByDomain: Record<DomainType, number>;
  recentActivity: FileProcessingLog[];
}

export interface SearchResult {
  entity: Entity;
  score: number;
  highlights: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Entity[];
  timestamp: string;
}

export interface ChatSession {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface QuizCard {
  id: string;
  entityId: string;
  front: string;
  back: string;
  ease: number;        // 2.5 default, SM-2 ease factor
  interval: number;    // days until next review
  repetitions: number; // consecutive correct answers
  nextReview: string;  // ISO date
  lastReview?: string;
}

export interface KnowledgeGap {
  type: 'orphan' | 'weak_link' | 'missing_relationship' | 'underdocumented';
  severity: 'high' | 'medium' | 'low';
  entityId?: string;
  entityName?: string;
  description: string;
  suggestion: string;
}
