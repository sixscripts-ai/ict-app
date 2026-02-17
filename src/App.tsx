import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Database, Tree, Upload, ChatsCircle } from '@phosphor-icons/react';
import { DashboardView } from '@/components/DashboardView';
import { ExplorerView } from '@/components/ExplorerView';
import { UploadView } from '@/components/UploadView';
import { ChatView } from '@/components/ChatView';
import { EntityDetailDialog } from '@/components/EntityDetailDialog';
import { processFile } from '@/lib/ai-processor';
import type { Entity, Relationship, Upload as UploadType, FileProcessingLog, DatabaseStats, DomainType, EntityType } from '@/lib/types';

function App() {
  const [entities, setEntities] = useKV<Entity[]>('ict-entities', []);
  const [relationships, setRelationships] = useKV<Relationship[]>('ict-relationships', []);
  const [uploads, setUploads] = useKV<UploadType[]>('ict-uploads', []);
  const [logs, setLogs] = useKV<FileProcessingLog[]>('ict-logs', []);
  
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const safeEntities = entities || [];
  const safeRelationships = relationships || [];
  const safeUploads = uploads || [];
  const safeLogs = logs || [];

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

  const handleEntitySelect = (entity: Entity) => {
    setSelectedEntity(entity);
    setDetailDialogOpen(true);
  };

  const handleAskQuestion = async (question: string): Promise<{ answer: string; sources: Entity[] }> => {
    const prompt = window.spark.llmPrompt`You are an ICT (Inner Circle Trader) trading methodology expert assistant. Answer the following question based on the knowledge base of entities provided.

Question: ${question}

Available entities in the knowledge base:
${JSON.stringify(safeEntities.slice(0, 20).map(e => ({
  name: e.name,
  type: e.type,
  description: e.description
})), null, 2)}

Provide a clear, concise answer. If you find relevant entities, mention them by name.`;

    const answer = await window.spark.llm(prompt, 'gpt-4o');

    const relevantSources = safeEntities.filter(e => 
      answer.toLowerCase().includes(e.name.toLowerCase())
    ).slice(0, 3);

    return { answer, sources: relevantSources };
  };

  const stats: DatabaseStats = {
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
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Database size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">ICT Knowledge Engine</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Structured Database</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard" className="gap-2">
              <Database size={16} />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="explorer" className="gap-2">
              <Tree size={16} />
              Explorer
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload size={16} />
              Upload
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <ChatsCircle size={16} />
              Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardView stats={stats} />
          </TabsContent>

          <TabsContent value="explorer">
            <ExplorerView 
              entities={safeEntities} 
              onEntitySelect={handleEntitySelect}
            />
          </TabsContent>

          <TabsContent value="upload">
            <UploadView
              uploads={safeUploads}
              logs={safeLogs}
              onFileUpload={handleFileUpload}
              onRepoUpload={handleRepoUpload}
            />
          </TabsContent>

          <TabsContent value="chat">
            <ChatView
              entities={safeEntities}
              onAskQuestion={handleAskQuestion}
            />
          </TabsContent>
        </Tabs>
      </main>

      <EntityDetailDialog
        entity={selectedEntity}
        relationships={safeRelationships}
        allEntities={safeEntities}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        onEntityClick={handleEntitySelect}
      />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;