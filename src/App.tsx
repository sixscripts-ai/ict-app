import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useKV } from '@/hooks/use-kv';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Database, Tree, Upload, ChatsCircle, Graph, Brain, GraduationCap, MagicWand, Lightning, ChartLine, BookOpenText, BookOpen, GithubLogo, ArrowSquareOut, GearSix, Warning, Flask, MagnifyingGlass, DownloadSimple, ShieldCheck, Cards } from '@phosphor-icons/react';
import { DashboardView } from '@/components/DashboardView';
import { ExplorerView } from '@/components/ExplorerView';
import { UploadView } from '@/components/UploadView';
import { ChatView } from '@/components/ChatView';
import { GraphView } from '@/components/GraphView';
import { PatternsView } from '@/components/PatternsView';
import { TrainingView } from '@/components/TrainingView';
import { SemanticSearchView } from '@/components/SemanticSearchView';
import { RecommendationsView } from '@/components/RecommendationsView';
import { SkillsView } from '@/components/SkillsView';
import { AnalyticsView } from '@/components/AnalyticsView';
import { KnowledgeGapView } from '@/components/KnowledgeGapView';
import { QuizView } from '@/components/QuizView';
import { ResearchView } from '@/components/ResearchView';
import { KnowledgeBaseView } from '@/components/KnowledgeBaseView';
import { EntityDetailDialog } from '@/components/EntityDetailDialog';
import { SettingsDialog } from '@/components/SettingsDialog';
import { CommandPalette } from '@/components/CommandPalette';
import { processFile } from '@/lib/ai-processor';
import { generateDemoData } from '@/lib/demo-data';
import { createAIGraphInternal } from '@/lib/schema';
import { isLLMConfigured } from '@/lib/llm-client';
import type { Entity, Relationship, Upload as UploadType, FileProcessingLog, DatabaseStats, DomainType, EntityType } from '@/lib/types';

function App() {
  const [entities, setEntities] = useKV<Entity[]>('ict-entities', []);
  const [relationships, setRelationships] = useKV<Relationship[]>('ict-relationships', []);
  const [uploads, setUploads] = useKV<UploadType[]>('ict-uploads', []);
  const [logs, setLogs] = useKV<FileProcessingLog[]>('ict-logs', []);
  const [chatMessages, setChatMessages] = useKV<import('@/lib/types').ChatMessage[]>('chat-history', []);
  const [favorites, setFavorites] = useKV<string[]>('favorites', []);
  
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [exploreTab, setExploreTab] = useState('explorer');
  const [analyticsTab, setAnalyticsTab] = useState('analytics');
  const [researchTab, setResearchTab] = useState('research');

  const aiGraphRef = useRef(createAIGraphInternal());
  const sessionIdRef = useRef(`session-${Date.now()}`);

  const safeEntities = entities || [];
  const safeRelationships = relationships || [];
  const safeUploads = uploads || [];
  const safeLogs = logs || [];
  const safeChatMessages = chatMessages || [];
  const safeFavorites = favorites || [];

  // Auto-load ICT knowledge base on first visit
  const [hasAutoLoaded, setHasAutoLoaded] = useKV<boolean>('auto-loaded-v2', false);
  
  useEffect(() => {
    if (!hasAutoLoaded && safeEntities.length === 0) {
      const { entities: demoEntities, relationships: demoRelationships } = generateDemoData();
      setEntities(demoEntities);
      setRelationships(demoRelationships);
      setHasAutoLoaded(true);
      
      const uploadId = `auto-load-${Date.now()}`;
      const upload: UploadType = {
        id: uploadId,
        type: 'folder',
        name: 'ICT Knowledge Base (Auto-loaded)',
        source: 'built-in',
        fileCount: 36,
        processedCount: 36,
        status: 'completed',
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        errors: []
      };
      setUploads((currentUploads) => [upload, ...(currentUploads || [])]);
    }
  }, [hasAutoLoaded, safeEntities.length]);

  useEffect(() => {
    if (safeEntities.length > 0 || safeRelationships.length > 0) {
      aiGraphRef.current.buildFromEntities(safeEntities, safeRelationships).catch(console.error);
    }
  }, [safeEntities, safeRelationships]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const cleared = aiGraphRef.current.clearExpiredSessions();
      if (cleared > 0) {
        console.log(`Cleared ${cleared} expired AI session(s)`);
      }
    }, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFileUpload = async (files: FileList) => {
    const uploadId = `upload-${Date.now()}`;
    const fileArray = Array.from(files);
    
    const upload: UploadType = {
      id: uploadId,
      type: 'file',
      name: `${fileArray.length} file${fileArray.length > 1 ? 's' : ''}`,
      source: 'local',
      fileCount: fileArray.length,
      processedCount: 0,
      status: 'processing',
      startedAt: new Date().toISOString(),
      errors: []
    };

    setUploads((currentUploads) => [upload, ...(currentUploads || [])]);
    toast.success(`Processing ${fileArray.length} files...`);

    const allNewEntities: Entity[] = [];
    const allNewRelationships: Relationship[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      
      try {
        const result = await processFile(file, uploadId);
        
        setLogs((currentLogs) => [result.log, ...(currentLogs || [])]);
        
        allNewEntities.push(...result.entities);
        allNewRelationships.push(...result.relationships);

        setUploads((currentUploads) => 
          (currentUploads || []).map(u => 
            u.id === uploadId 
              ? { ...u, processedCount: i + 1 }
              : u
          )
        );
      } catch (error) {
        setLogs((currentLogs) => [{
          id: `log-${Date.now()}-${Math.random()}`,
          uploadId,
          filePath: file.name,
          fileType: file.name.split('.').pop() || '',
          status: 'error',
          message: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          entitiesCreated: 0,
          timestamp: new Date().toISOString()
        }, ...(currentLogs || [])]);
      }
    }

    setEntities((currentEntities) => [...allNewEntities, ...(currentEntities || [])]);
    setRelationships((currentRelationships) => [...allNewRelationships, ...(currentRelationships || [])]);

    setUploads((currentUploads) => 
      (currentUploads || []).map(u => 
        u.id === uploadId 
          ? { ...u, status: 'completed' as const, completedAt: new Date().toISOString() }
          : u
      )
    );

    toast.success(`Successfully processed ${fileArray.length} files`, {
      description: `Extracted ${allNewEntities.length} entities and ${allNewRelationships.length} relationships`
    });
  };

  const handleRepoUpload = async (url: string) => {
    toast.info('GitHub repository ingestion is a demo feature', {
      description: 'In a full implementation, this would clone and process the entire repo.'
    });

    const uploadId = `upload-${Date.now()}`;
    const upload: UploadType = {
      id: uploadId,
      type: 'repo',
      name: url.split('/').pop() || 'repository',
      source: url,
      fileCount: 0,
      processedCount: 0,
      status: 'completed',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      errors: []
    };

    setUploads((currentUploads) => [upload, ...(currentUploads || [])]);
  };

  const handleDemoLoad = () => {
    const { entities: demoEntities, relationships: demoRelationships } = generateDemoData();
    
    setEntities((currentEntities) => [...demoEntities, ...(currentEntities || [])]);
    setRelationships((currentRelationships) => [...demoRelationships, ...(currentRelationships || [])]);

    const uploadId = `demo-upload-${Date.now()}`;
    const upload: UploadType = {
      id: uploadId,
      type: 'folder',
      name: 'ICT Demo Dataset',
      source: 'demo',
      fileCount: 36,
      processedCount: 36,
      status: 'completed',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      errors: []
    };

    setUploads((currentUploads) => [upload, ...(currentUploads || [])]);

    const demoLogs: FileProcessingLog[] = [
      {
        id: `log-${Date.now()}-1`,
        uploadId,
        filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
        fileType: 'md',
        status: 'completed',
        message: '✅ Parsed ICT_MASTER_LIBRARY.md → 1 entities extracted',
        entitiesCreated: 1,
        timestamp: new Date().toISOString()
      },
      {
        id: `log-${Date.now()}-2`,
        uploadId,
        filePath: 'knowledge_base/concepts/fair_value_gap.md',
        fileType: 'md',
        status: 'completed',
        message: '✅ Parsed fair_value_gap.md → 1 entities extracted',
        entitiesCreated: 1,
        timestamp: new Date().toISOString()
      },
      {
        id: `log-${Date.now()}-3`,
        uploadId,
        filePath: 'knowledge_base/models/silver_bullet.md',
        fileType: 'md',
        status: 'completed',
        message: '✅ Parsed silver_bullet.md → 1 entities extracted',
        entitiesCreated: 1,
        timestamp: new Date().toISOString()
      },
      {
        id: `log-${Date.now()}-4`,
        uploadId,
        filePath: 'data/training/positive/2026-01-20_LON_EURUSD_OBFVG_001.json',
        fileType: 'json',
        status: 'completed',
        message: '✅ Parsed 2026-01-20_LON_EURUSD_OBFVG_001.json → 1 entities extracted',
        entitiesCreated: 1,
        timestamp: new Date().toISOString()
      },
      {
        id: `log-${Date.now()}-5`,
        uploadId,
        filePath: 'data/training/negative/2026-01-18_NY_GBPUSD_FAIL_001.json',
        fileType: 'json',
        status: 'completed',
        message: '✅ Parsed 2026-01-18_NY_GBPUSD_FAIL_001.json → 1 entities extracted',
        entitiesCreated: 1,
        timestamp: new Date().toISOString()
      },
      {
        id: `log-${Date.now()}-6`,
        uploadId,
        filePath: 'src/ict_agent/detectors/fvg.py',
        fileType: 'py',
        status: 'completed',
        message: '✅ Parsed fvg.py → 1 entities extracted',
        entitiesCreated: 1,
        timestamp: new Date().toISOString()
      }
    ];

    setLogs((currentLogs) => [...demoLogs, ...(currentLogs || [])]);

    toast.success('Demo ICT data loaded successfully!', {
      description: `Loaded ${demoEntities.length} entities and ${demoRelationships.length} relationships`
    });

    setActiveTab('dashboard');
  };

  const handleEntitySelect = useCallback((entity: Entity) => {
    setSelectedEntity(entity);
    setDetailDialogOpen(true);
  }, []);

  const handleEntityUpdate = useCallback((id: string, updates: Partial<Pick<Entity, 'name' | 'description' | 'tags'>>) => {
    setEntities((current) =>
      (current || []).map(e =>
        e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
      )
    );
    // Keep dialog in sync
    setSelectedEntity(prev => prev && prev.id === id ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : prev);
    toast.success('Entity updated');
  }, []);

  const handleToggleFavorite = useCallback((entityId: string) => {
    setFavorites((current) => {
      const cur = current || [];
      return cur.includes(entityId) ? cur.filter(id => id !== entityId) : [...cur, entityId];
    });
  }, []);

  const handleExportKnowledgeBase = useCallback(() => {
    const payload = {
      exportedAt: new Date().toISOString(),
      entities: safeEntities,
      relationships: safeRelationships,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ict-knowledge-base-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Knowledge base exported', { description: `${safeEntities.length} entities · ${safeRelationships.length} relationships` });
  }, [safeEntities, safeRelationships]);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen(open => !open);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleNavigate = useCallback((tab: string) => {
    switch (tab) {
      case 'graph':
        setActiveTab('explore');
        setExploreTab('graph');
        break;
      case 'search':
        setActiveTab('explore');
        setExploreTab('search');
        break;
      case 'explorer':
        setActiveTab('explore');
        setExploreTab('explorer');
        break;
      case 'patterns':
        setActiveTab('analytics');
        setAnalyticsTab('patterns');
        break;
      case 'training':
        setActiveTab('analytics');
        setAnalyticsTab('training');
        break;
      case 'recommendations':
        setActiveTab('analytics');
        setAnalyticsTab('recommendations');
        break;
      case 'skills':
        setActiveTab('analytics');
        setAnalyticsTab('skills');
        break;
      case 'gaps':
        setActiveTab('analytics');
        setAnalyticsTab('gaps');
        break;
      case 'quiz':
        setActiveTab('analytics');
        setAnalyticsTab('quiz');
        break;
      default:
        setActiveTab(tab);
    }
  }, []);

  const handleBatchReclassify = (entitiesToReclassify: Entity[], newDomain: DomainType, newType: EntityType) => {
    const entityIds = new Set(entitiesToReclassify.map(e => e.id));
    
    setEntities((currentEntities) => 
      (currentEntities || []).map(entity => {
        if (entityIds.has(entity.id)) {
          return {
            ...entity,
            domain: newDomain,
            type: newType,
            updatedAt: new Date().toISOString()
          };
        }
        return entity;
      })
    );

    toast.success(`Reclassified ${entitiesToReclassify.length} entities`, {
      description: `Updated to ${newDomain} / ${newType}`
    });
  };

  const handleBatchDelete = (entitiesToDelete: Entity[]) => {
    const entityIds = new Set(entitiesToDelete.map(e => e.id));
    
    setEntities((currentEntities) => 
      (currentEntities || []).filter(entity => !entityIds.has(entity.id))
    );

    setRelationships((currentRelationships) =>
      (currentRelationships || []).filter(rel => 
        !entityIds.has(rel.sourceId) && !entityIds.has(rel.targetId)
      )
    );

    toast.success(`Deleted ${entitiesToDelete.length} entities`, {
      description: 'All associated relationships removed'
    });
  };

  const handleAskQuestion = async (question: string): Promise<{ answer: string; sources: Entity[] }> => {
    const sessionId = sessionIdRef.current;
    const aiGraph = aiGraphRef.current;
    
    aiGraph.createOrUpdateSession(sessionId, safeChatMessages, safeEntities);
    const session = aiGraph.getSession(sessionId);
    
    if (session) {
      const logicFlow = aiGraph.buildLogicFlow(question, session);
      console.log('Logic Flow:', logicFlow);
    }

    const semanticResults = await aiGraph.semanticSearch(question, 20);
    console.log('Semantic Search Results:', semanticResults.map(r => ({ name: r.node.name, similarity: r.similarity })));

    const conceptEntities = semanticResults
      .filter(r => r.node.type === 'concept' && r.similarity > 0.5)
      .slice(0, 15)
      .map(r => safeEntities.find(e => e.id === r.node.id))
      .filter((e): e is Entity => e !== undefined);
    
    const modelEntities = semanticResults
      .filter(r => r.node.type === 'model' && r.similarity > 0.5)
      .slice(0, 10)
      .map(r => safeEntities.find(e => e.id === r.node.id))
      .filter((e): e is Entity => e !== undefined);
    
    const tradeEntities = semanticResults
      .filter(r => r.node.type === 'trade' && r.similarity > 0.5)
      .slice(0, 10)
      .map(r => safeEntities.find(e => e.id === r.node.id))
      .filter((e): e is Entity => e !== undefined);
    
    const enrichmentContext = Array.from({ length: Math.min(3, safeEntities.length) }, (_, i) => {
      const entity = safeEntities[i];
      if (entity.content && entity.type === 'document') {
        const enrichment = aiGraph.enrichFromMarkdown(entity.name, entity.content);
        return {
          concepts: enrichment.extractedConcepts,
          relationships: enrichment.extractedRelationships.length,
          complexity: enrichment.metadata.technicalComplexity
        };
      }
      return null;
    }).filter(Boolean);

    const prompt = window.spark.llmPrompt`You are an ICT (Inner Circle Trader) methodology expert. Answer technical questions with precision and depth using semantic search results.

Question: ${question}

Semantically Relevant Knowledge (sorted by similarity):

Most Relevant Concepts (similarity > 0.5):
${JSON.stringify(conceptEntities.map(e => ({
  name: e.name,
  description: e.description,
  domain: e.domain
})), null, 2)}

Most Relevant Models:
${JSON.stringify(modelEntities.map(e => ({
  name: e.name,
  description: e.description,
  domain: e.domain
})), null, 2)}

Most Relevant Trades:
${JSON.stringify(tradeEntities.map(e => ({
  name: e.name,
  description: e.description,
  metadata: e.metadata
})), null, 2)}

Relevant Relationships:
${JSON.stringify(safeRelationships.slice(0, 30).map(r => ({
  type: r.type,
  from: safeEntities.find(e => e.id === r.sourceId)?.name,
  to: safeEntities.find(e => e.id === r.targetId)?.name
})), null, 2)}

${session ? `
Session Context:
- Conversation Topic: ${session.context.conversationTopic || 'general'}
- Intent: ${session.reasoning.lastInference || 'unknown'}
- Referenced Concepts: ${Array.from(session.context.referencedConcepts.keys()).join(', ')}
- Confidence: ${(session.reasoning.confidenceScore * 100).toFixed(0)}%
` : ''}

${enrichmentContext.length > 0 ? `
Document Enrichment:
${JSON.stringify(enrichmentContext, null, 2)}
` : ''}

Instructions:
- Prioritize information from entities with high semantic similarity to the question
- For concept definitions: Provide precise ICT terminology with bearish/bullish context
- For trade filters: Query the actual trade data and provide specific results with metrics
- For model questions: Detail entry criteria, time windows, confluence requirements
- For pattern analysis: Reference specific relationships and training data
- Always cite entity names when referencing knowledge base items
- Use technical ICT language (displacement, liquidity sweep, OTE, killzones, etc.)`;

    const answer = await window.spark.llm(prompt, 'gpt-4o');

    const relevantSources = semanticResults
      .slice(0, 10)
      .map(r => safeEntities.find(e => e.id === r.node.id))
      .filter((e): e is Entity => e !== undefined)
      .filter(e => 
        answer.toLowerCase().includes(e.name.toLowerCase()) ||
        (e.description && answer.toLowerCase().includes(e.description.toLowerCase().slice(0, 20)))
      )
      .slice(0, 5);

    return { answer, sources: relevantSources };
  };

  const stats: DatabaseStats = useMemo(() => ({
    totalEntities: safeEntities.length,
    totalRelationships: safeRelationships.length,
    totalUploads: safeUploads.length,
    entitiesByType: safeEntities.reduce((acc, e) => {
      acc[e.type] = (acc[e.type] || 0) + 1;
      return acc;
    }, {} as Record<EntityType, number>),
    entitiesByDomain: safeEntities.reduce((acc, e) => {
      acc[e.domain] = (acc[e.domain] || 0) + 1;
      return acc;
    }, {} as Record<DomainType, number>),
    recentActivity: safeLogs.slice(0, 10)
  }), [safeEntities, safeRelationships, safeUploads, safeLogs]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
                <Database size={24} className="text-primary" weight="duotone" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">ICT Knowledge Engine</h1>
                <p className="text-[11px] text-muted-foreground">AI-Powered Knowledge Graph</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {safeEntities.length > 0 && (
                <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">{safeEntities.length} entities</span>
                  <span className="px-2 py-1 rounded-md bg-accent/10 text-accent font-medium">{safeRelationships.length} relationships</span>
                </div>
              )}
              <button
                onClick={() => setCmdPaletteOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground bg-secondary/40 hover:bg-secondary/70 border border-border/50 transition-colors"
                title="Command Palette (⌘K)"
              >
                <MagnifyingGlass size={14} />
                <span>Search…</span>
                <kbd className="ml-1 px-1.5 py-0.5 bg-secondary/70 rounded font-mono text-[10px]">⌘K</kbd>
              </button>
              {safeEntities.length > 0 && (
                <button
                  onClick={handleExportKnowledgeBase}
                  className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                  title="Export knowledge base as JSON"
                >
                  <DownloadSimple size={20} weight="duotone" />
                </button>
              )}
              <a
                href="https://github.com/sixscripts-ai/ict-app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                title="View on GitHub"
              >
                <GithubLogo size={20} weight="duotone" />
              </a>
              <button
                onClick={() => setSettingsOpen(true)}
                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                title="Settings"
              >
                <GearSix size={20} weight="duotone" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {!isLLMConfigured() && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-6 py-2">
          <div className="container mx-auto flex items-center gap-2 text-xs text-yellow-400">
            <Warning size={14} weight="fill" />
            <span>AI features require an API key.</span>
            <button
              onClick={() => setSettingsOpen(true)}
              className="underline hover:text-yellow-300 transition-colors"
            >
              Configure in Settings
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-6 py-6 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto -mx-6 px-6 pb-2">
            <TabsList className="mb-6 inline-flex w-max">
              <TabsTrigger value="dashboard" className="gap-2">
                <Database size={16} />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="gap-2">
                <BookOpen size={16} />
                Knowledge Base
              </TabsTrigger>
              <TabsTrigger value="explore" className="gap-2">
                <Graph size={16} />
                Explore
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <ChartLine size={16} />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="research" className="gap-2">
                <Flask size={16} />
                Research
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-2">
                <ChatsCircle size={16} />
                Chat
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            <DashboardView stats={stats} onNavigate={handleNavigate} entities={safeEntities} relationships={safeRelationships} favorites={safeFavorites} onToggleFavorite={handleToggleFavorite} onEntitySelect={handleEntitySelect} />
          </TabsContent>

          <TabsContent value="knowledge">
            <KnowledgeBaseView />
          </TabsContent>

          <TabsContent value="explore">
            <Tabs value={exploreTab} onValueChange={setExploreTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="explorer" className="gap-2">
                  <Tree size={14} />
                  Explorer
                </TabsTrigger>
                <TabsTrigger value="graph" className="gap-2">
                  <Graph size={14} />
                  Graph
                </TabsTrigger>
                <TabsTrigger value="search" className="gap-2">
                  <MagnifyingGlass size={14} />
                  Search
                </TabsTrigger>
              </TabsList>
              <TabsContent value="explorer">
                <ExplorerView 
                  entities={safeEntities} 
                  relationships={safeRelationships}
                  onEntitySelect={handleEntitySelect}
                  onBatchReclassify={handleBatchReclassify}
                  onBatchDelete={handleBatchDelete}
                  favorites={safeFavorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              </TabsContent>
              <TabsContent value="graph">
                <GraphView 
                  entities={safeEntities}
                  relationships={safeRelationships}
                  onEntitySelect={handleEntitySelect}
                />
              </TabsContent>
              <TabsContent value="search">
                <SemanticSearchView
                  entities={safeEntities}
                  aiGraph={aiGraphRef.current}
                  onEntitySelect={handleEntitySelect}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="analytics">
            <Tabs value={analyticsTab} onValueChange={setAnalyticsTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="analytics" className="gap-2">
                  <ChartLine size={14} />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="training" className="gap-2">
                  <GraduationCap size={14} />
                  Training
                </TabsTrigger>
                <TabsTrigger value="patterns" className="gap-2">
                  <Brain size={14} />
                  Patterns
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="gap-2">
                  <MagicWand size={14} />
                  Recs
                </TabsTrigger>
                <TabsTrigger value="skills" className="gap-2">
                  <Lightning size={14} />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="gaps" className="gap-2">
                  <ShieldCheck size={14} />
                  Gaps
                </TabsTrigger>
                <TabsTrigger value="quiz" className="gap-2">
                  <Cards size={14} />
                  Quiz
                </TabsTrigger>
              </TabsList>
              <TabsContent value="analytics">
                <AnalyticsView entities={safeEntities} />
              </TabsContent>
              <TabsContent value="training">
                <TrainingView
                  entities={safeEntities}
                  relationships={safeRelationships}
                  onEntitySelect={handleEntitySelect}
                />
              </TabsContent>
              <TabsContent value="patterns">
                <PatternsView
                  entities={safeEntities}
                  relationships={safeRelationships}
                  onEntitySelect={handleEntitySelect}
                />
              </TabsContent>
              <TabsContent value="recommendations">
                <RecommendationsView
                  entities={safeEntities}
                  relationships={safeRelationships}
                  aiGraph={aiGraphRef.current}
                  onEntitySelect={handleEntitySelect}
                />
              </TabsContent>
              <TabsContent value="skills">
                <SkillsView
                  entities={safeEntities}
                  relationships={safeRelationships}
                  aiGraph={aiGraphRef.current}
                  onEntitySelect={handleEntitySelect}
                />
              </TabsContent>
              <TabsContent value="gaps">
                <KnowledgeGapView
                  entities={safeEntities}
                  relationships={safeRelationships}
                  onEntitySelect={handleEntitySelect}
                />
              </TabsContent>
              <TabsContent value="quiz">
                <QuizView entities={safeEntities} />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="research">
            <Tabs value={researchTab} onValueChange={setResearchTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="research" className="gap-2">
                  <BookOpenText size={14} />
                  Research
                </TabsTrigger>
                <TabsTrigger value="upload" className="gap-2">
                  <Upload size={14} />
                  Upload
                </TabsTrigger>
              </TabsList>
              <TabsContent value="research">
                <ResearchView />
              </TabsContent>
              <TabsContent value="upload">
                <UploadView
                  uploads={safeUploads}
                  logs={safeLogs}
                  onFileUpload={handleFileUpload}
                  onRepoUpload={handleRepoUpload}
                  onDemoLoad={handleDemoLoad}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="chat">
            <ChatView
              entities={safeEntities}
              onAskQuestion={handleAskQuestion}
            />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border/50 bg-card/20 backdrop-blur mt-auto">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground/70">ICT Knowledge Engine</span>
              <span>v2.0</span>
              <span className="text-border">|</span>
              <span>Built by <a href="https://github.com/sixscriptssoftware" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SixScripts Software</a></span>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://notebooklm.google.com/notebook/0c01de2c-bd21-4331-9caa-367bfa77a992"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <BookOpenText size={14} />
                NotebookLM Research
                <ArrowSquareOut size={12} />
              </a>
              <a 
                href="https://github.com/sixscripts-ai/ict-app"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <GithubLogo size={14} />
                Source Code
                <ArrowSquareOut size={12} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <EntityDetailDialog
        entity={selectedEntity}
        relationships={safeRelationships}
        allEntities={safeEntities}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        onEntityClick={handleEntitySelect}
        onEntityUpdate={handleEntityUpdate}
        isFavorite={!!selectedEntity && safeFavorites.includes(selectedEntity.id)}
        onToggleFavorite={handleToggleFavorite}
      />

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />

      <CommandPalette
        open={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        entities={safeEntities}
        onEntitySelect={(entity) => { handleEntitySelect(entity); setCmdPaletteOpen(false); }}
        onNavigate={(tab) => { handleNavigate(tab); setCmdPaletteOpen(false); }}
        onOpenSettings={() => { setSettingsOpen(true); setCmdPaletteOpen(false); }}
        onExport={handleExportKnowledgeBase}
      />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;