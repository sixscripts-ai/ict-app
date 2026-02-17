import type { Entity, EntityType, DomainType, FileProcessingLog, Relationship, RelationshipType } from './types';

export async function processFile(
  file: File | { name: string; content: string; path: string },
  uploadId: string
): Promise<{ entities: Entity[]; relationships: Relationship[]; log: FileProcessingLog }> {
  const timestamp = new Date().toISOString();
  const filePath = 'path' in file ? file.path : file.name;
  const fileExt = filePath.split('.').pop()?.toLowerCase() || '';
  
  let content: string;
  if (file instanceof File) {
    content = await file.text();
  } else {
    content = file.content;
  }

  const log: FileProcessingLog = {
    id: `log-${Date.now()}-${Math.random()}`,
    uploadId,
    filePath,
    fileType: fileExt,
    status: 'processing',
    message: `Processing ${filePath}...`,
    entitiesCreated: 0,
    timestamp
  };

  try {
    const { entities, relationships } = await parseFileContent(content, fileExt, filePath, uploadId);
    
    log.status = 'completed';
    log.message = `✅ Parsed ${filePath} → ${entities.length} entities extracted`;
    log.entitiesCreated = entities.length;

    return { entities, relationships, log };
  } catch (error) {
    log.status = 'error';
    log.message = `❌ Failed to parse ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`;
    return { entities: [], relationships: [], log };
  }
}

async function parseFileContent(
  content: string,
  fileType: string,
  filePath: string,
  uploadId: string
): Promise<{ entities: Entity[]; relationships: Relationship[] }> {
  const entities: Entity[] = [];
  const relationships: Relationship[] = [];
  const timestamp = new Date().toISOString();

  const sourceRef = {
    filePath,
    uploadId,
    uploadedAt: timestamp
  };

  switch (fileType) {
    case 'md':
    case 'markdown':
      return parseMarkdown(content, sourceRef);
    
    case 'json':
      return parseJSON(content, sourceRef, filePath);
    
    case 'yaml':
    case 'yml':
      return parseYAML(content, sourceRef);
    
    case 'py':
      return parsePython(content, sourceRef);
    
    case 'csv':
      return parseCSV(content, sourceRef);
    
    case 'txt':
      return parseText(content, sourceRef);
    
    default:
      return { entities: [], relationships: [] };
  }
}

async function parseMarkdown(content: string, sourceRef: any): Promise<{ entities: Entity[]; relationships: Relationship[] }> {
  const entities: Entity[] = [];
  const relationships: Relationship[] = [];
  const timestamp = new Date().toISOString();

  const prompt = spark.llmPrompt`Analyze this ICT trading methodology Markdown document and extract structured entities.

Document content:
${content}

Extract:
1. **Concepts** - ICT trading concepts (FVG, Order Block, BOS, CHoCH, Displacement, etc.)
2. **Models** - Trading models/strategies (Silver Bullet, Turtle Soup, etc.)
3. **Relationships** - Which concepts are used in which models, which concepts are related

For each concept, extract:
- name (concept name)
- definition (clear definition)
- category (e.g., "price_action", "structure", "liquidity", "time_based")
- detection_rules (how to identify it on a chart)
- related_concepts (array of related concept names)

For each model, extract:
- name (model name)
- description (what the model does)
- entry_rules (when to enter)
- concepts_used (array of concept names this model uses)

Return a JSON object with this structure:
{
  "concepts": [{"name": "Fair Value Gap", "definition": "...", "category": "...", "detection_rules": "...", "related_concepts": ["..."]}],
  "models": [{"name": "Silver Bullet", "description": "...", "entry_rules": "...", "concepts_used": ["..."]}]
}

Only extract information that is explicitly stated in the document. Do not invent or hallucinate data.`;

  const response = await spark.llm(prompt, 'gpt-4o', true);
  const parsed = JSON.parse(response);

  if (parsed.concepts) {
    for (const concept of parsed.concepts) {
      const entity: Entity = {
        id: `concept-${slugify(concept.name)}-${Date.now()}`,
        type: 'concept',
        domain: 'concepts',
        name: concept.name,
        description: concept.definition,
        content: JSON.stringify(concept, null, 2),
        metadata: {
          category: concept.category,
          detection_rules: concept.detection_rules,
          related_concepts: concept.related_concepts || []
        },
        sources: [sourceRef],
        tags: [concept.category],
        createdAt: timestamp,
        updatedAt: timestamp
      };
      entities.push(entity);

      if (concept.related_concepts) {
        for (const related of concept.related_concepts) {
          relationships.push({
            id: `rel-${Date.now()}-${Math.random()}`,
            type: 'CONCEPT_RELATED_TO',
            sourceId: entity.id,
            targetId: `concept-${slugify(related)}`,
            createdAt: timestamp
          });
        }
      }
    }
  }

  if (parsed.models) {
    for (const model of parsed.models) {
      const entity: Entity = {
        id: `model-${slugify(model.name)}-${Date.now()}`,
        type: 'model',
        domain: 'models',
        name: model.name,
        description: model.description,
        content: JSON.stringify(model, null, 2),
        metadata: {
          entry_rules: model.entry_rules,
          concepts_used: model.concepts_used || []
        },
        sources: [sourceRef],
        tags: ['trading_model'],
        createdAt: timestamp,
        updatedAt: timestamp
      };
      entities.push(entity);

      if (model.concepts_used) {
        for (const conceptName of model.concepts_used) {
          relationships.push({
            id: `rel-${Date.now()}-${Math.random()}`,
            type: 'CONCEPT_USED_IN_MODEL',
            sourceId: `concept-${slugify(conceptName)}`,
            targetId: entity.id,
            createdAt: timestamp
          });
        }
      }
    }
  }

  return { entities, relationships };
}

async function parseJSON(content: string, sourceRef: any, filePath: string): Promise<{ entities: Entity[]; relationships: Relationship[] }> {
  const entities: Entity[] = [];
  const relationships: Relationship[] = [];
  const timestamp = new Date().toISOString();

  try {
    const data = JSON.parse(content);

    if (filePath.includes('schema') || filePath.includes('template')) {
      const entity: Entity = {
        id: `schema-${Date.now()}`,
        type: 'schema',
        domain: 'schemas',
        name: filePath.split('/').pop() || 'schema',
        description: data.description || 'JSON Schema definition',
        content: JSON.stringify(data, null, 2),
        metadata: data,
        sources: [sourceRef],
        tags: ['schema', 'validation'],
        createdAt: timestamp,
        updatedAt: timestamp
      };
      entities.push(entity);
    } else if (data.meta || data.setup || data.execution) {
      const tradeName = data.meta?.trade_id || filePath.split('/').pop()?.replace('.json', '') || 'trade';
      
      const entity: Entity = {
        id: `trade-${tradeName}-${Date.now()}`,
        type: 'trade',
        domain: 'trades',
        name: tradeName,
        description: `Trade: ${data.market?.pair || 'Unknown'} ${data.market?.direction || ''}`,
        content: JSON.stringify(data, null, 2),
        metadata: data,
        sources: [sourceRef],
        validationStatus: 'unknown',
        tags: [
          data.market?.direction?.toLowerCase(),
          data.setup?.model,
          data.meta?.example_type
        ].filter(Boolean),
        createdAt: timestamp,
        updatedAt: timestamp
      };
      entities.push(entity);

      if (data.setup?.concepts_used) {
        for (const concept of data.setup.concepts_used) {
          relationships.push({
            id: `rel-${Date.now()}-${Math.random()}`,
            type: 'TRADE_USES_CONCEPT',
            sourceId: entity.id,
            targetId: `concept-${slugify(concept)}`,
            createdAt: timestamp
          });
        }
      }

      if (data.setup?.model) {
        relationships.push({
          id: `rel-${Date.now()}-${Math.random()}`,
          type: 'MODEL_PRODUCES_TRADE',
          sourceId: `model-${slugify(data.setup.model)}`,
          targetId: entity.id,
          createdAt: timestamp
        });
      }
    } else {
      const entity: Entity = {
        id: `document-${Date.now()}`,
        type: 'document',
        domain: 'knowledge_base',
        name: filePath.split('/').pop() || 'document',
        description: 'JSON document',
        content: JSON.stringify(data, null, 2),
        metadata: data,
        sources: [sourceRef],
        tags: ['json'],
        createdAt: timestamp,
        updatedAt: timestamp
      };
      entities.push(entity);
    }

    return { entities, relationships };
  } catch (error) {
    throw new Error(`Invalid JSON: ${error instanceof Error ? error.message : 'Parse error'}`);
  }
}

async function parseYAML(content: string, sourceRef: any): Promise<{ entities: Entity[]; relationships: Relationship[] }> {
  const entities: Entity[] = [];
  const timestamp = new Date().toISOString();

  const entity: Entity = {
    id: `schema-${Date.now()}`,
    type: 'schema',
    domain: 'schemas',
    name: 'ICT Ontology',
    description: 'YAML ontology definition',
    content,
    metadata: { format: 'yaml' },
    sources: [sourceRef],
    tags: ['ontology', 'vocabulary'],
    createdAt: timestamp,
    updatedAt: timestamp
  };
  entities.push(entity);

  return { entities, relationships: [] };
}

async function parsePython(content: string, sourceRef: any): Promise<{ entities: Entity[]; relationships: Relationship[] }> {
  const entities: Entity[] = [];
  const relationships: Relationship[] = [];
  const timestamp = new Date().toISOString();

  const classMatches = content.matchAll(/class\s+(\w+)/g);
  const functionMatches = content.matchAll(/def\s+(\w+)/g);

  const classes = Array.from(classMatches).map(m => m[1]);
  const functions = Array.from(functionMatches).map(m => m[1]);

  if (classes.length > 0 || functions.length > 0) {
    const fileName = sourceRef.filePath.split('/').pop() || 'module';
    const entity: Entity = {
      id: `code-${slugify(fileName)}-${Date.now()}`,
      type: 'code_module',
      domain: 'code',
      name: fileName,
      description: `Python module with ${classes.length} classes and ${functions.length} functions`,
      content,
      metadata: {
        language: 'python',
        classes,
        functions
      },
      sources: [sourceRef],
      tags: ['python', 'code'],
      createdAt: timestamp,
      updatedAt: timestamp
    };
    entities.push(entity);

    for (const className of classes) {
      if (className.includes('Detector')) {
        const conceptName = className.replace('Detector', '').replace(/([A-Z])/g, ' $1').trim();
        relationships.push({
          id: `rel-${Date.now()}-${Math.random()}`,
          type: 'CONCEPT_DETECTED_BY',
          sourceId: `concept-${slugify(conceptName)}`,
          targetId: entity.id,
          createdAt: timestamp
        });
      }
    }
  }

  return { entities, relationships };
}

async function parseCSV(content: string, sourceRef: any): Promise<{ entities: Entity[]; relationships: Relationship[] }> {
  const entities: Entity[] = [];
  const timestamp = new Date().toISOString();

  const lines = content.split('\n').filter(l => l.trim());
  const headers = lines[0]?.split(',').map(h => h.trim()) || [];
  const rowCount = lines.length - 1;

  const entity: Entity = {
    id: `document-${Date.now()}`,
    type: 'document',
    domain: 'knowledge_base',
    name: sourceRef.filePath.split('/').pop() || 'csv-data',
    description: `CSV file with ${rowCount} rows and ${headers.length} columns`,
    content,
    metadata: {
      format: 'csv',
      headers,
      rowCount
    },
    sources: [sourceRef],
    tags: ['csv', 'data'],
    createdAt: timestamp,
    updatedAt: timestamp
  };
  entities.push(entity);

  return { entities, relationships: [] };
}

async function parseText(content: string, sourceRef: any): Promise<{ entities: Entity[]; relationships: Relationship[] }> {
  const entities: Entity[] = [];
  const timestamp = new Date().toISOString();

  const entity: Entity = {
    id: `document-${Date.now()}`,
    type: 'document',
    domain: 'knowledge_base',
    name: sourceRef.filePath.split('/').pop() || 'document',
    description: 'Text document',
    content,
    metadata: { format: 'text' },
    sources: [sourceRef],
    tags: ['text'],
    createdAt: timestamp,
    updatedAt: timestamp
  };
  entities.push(entity);

  return { entities, relationships: [] };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getEntityTypeIcon(type: EntityType): string {
  const icons: Record<EntityType, string> = {
    concept: '📚',
    model: '🎯',
    trade: '📈',
    schema: '📐',
    code_module: '💻',
    document: '📄',
    journal: '📓',
    training_data: '🏋️',
    chart: '📸'
  };
  return icons[type] || '📄';
}

export function getDomainColor(domain: DomainType): string {
  const colors: Record<DomainType, string> = {
    concepts: 'rgb(99 102 241)',
    models: 'rgb(168 85 247)',
    trades: 'rgb(34 197 94)',
    schemas: 'rgb(249 115 22)',
    training_data: 'rgb(236 72 153)',
    knowledge_base: 'rgb(59 130 246)',
    code: 'rgb(132 204 22)',
    journal: 'rgb(251 191 36)',
    charts: 'rgb(244 63 94)',
    rag_data: 'rgb(148 163 184)',
    relationships: 'rgb(100 116 139)'
  };
  return colors[domain] || 'rgb(148 163 184)';
}
